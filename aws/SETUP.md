# AWS Migration Setup (CodePipeline + CodeBuild + CodeDeploy + Lambda)

One-time setup to move deploys off GitHub Actions. After this, every push to
`main` triggers: **CodePipeline → CodeBuild (test + build + publish Lambda
version) → CodeDeploy (shift the `live` alias to the new version)**.

**Run all commands from the repo root** (the checkout that contains
`lambda/handler.mjs`). First, put your account ID in a shell variable — the
commands below reference it as `$ACCOUNT_ID`:

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

Region examples use `us-east-1`; replace with yours. Names used throughout:

| Thing              | Name                      |
| ------------------ | ------------------------- |
| Lambda function    | `portfolio-site`          |
| Lambda alias       | `live`                    |
| CodeDeploy app     | `portfolio-site`          |
| Deployment group   | `portfolio-site-dg`       |
| CodeBuild project  | `portfolio-site-build`    |
| Pipeline           | `portfolio-site-pipeline` |
| SSM parameter      | `/portfolio/web3forms-access-key` |

## 1. Store the Web3Forms key in SSM Parameter Store (free)

```bash
aws ssm put-parameter \
  --name /portfolio/web3forms-access-key \
  --type SecureString \
  --value "YOUR_WEB3FORMS_ACCESS_KEY"
```

(Replaces the `WEB3FORMS_ACCESS_KEY` GitHub Actions secret. Note it's a
`VITE_` var, so it ends up in the client bundle either way.)

## 2. Create the Lambda function + alias + Function URL

```bash
# Execution role
aws iam create-role --role-name portfolio-lambda-role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws iam attach-role-policy --role-name portfolio-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Placeholder first deployment (real code comes from the pipeline)
mkdir -p bundle && cp lambda/handler.mjs bundle/ && mkdir -p bundle/dist \
  && echo '<h1>placeholder</h1>' > bundle/dist/index.html \
  && (cd bundle && zip -rq ../function.zip .)

aws lambda create-function \
  --function-name portfolio-site \
  --runtime nodejs22.x \
  --handler handler.handler \
  --role arn:aws:iam::$ACCOUNT_ID:role/portfolio-lambda-role \
  --zip-file fileb://function.zip \
  --memory-size 256 --timeout 10

# Publish v1 and point the alias at it (the alias is what CodeDeploy shifts)
aws lambda publish-version --function-name portfolio-site
aws lambda create-alias --function-name portfolio-site \
  --name live --function-version 1

# Public Function URL on the ALIAS (so traffic shifting affects the URL)
aws lambda create-function-url-config \
  --function-name portfolio-site --qualifier live --auth-type NONE
aws lambda add-permission \
  --function-name portfolio-site --qualifier live \
  --statement-id public-url --action lambda:InvokeFunctionUrl \
  --principal '*' --function-url-auth-type NONE
```

The command prints your site URL (`https://<id>.lambda-url.<region>.on.aws/`).
You can point a custom domain at it later via CloudFront or Route 53.

## 3. CodeDeploy application + deployment group

```bash
aws iam create-role --role-name portfolio-codedeploy-role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"codedeploy.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws iam attach-role-policy --role-name portfolio-codedeploy-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSCodeDeployRoleForLambda

aws deploy create-application \
  --application-name portfolio-site --compute-platform Lambda

aws deploy create-deployment-group \
  --application-name portfolio-site \
  --deployment-group-name portfolio-site-dg \
  --service-role-arn arn:aws:iam::$ACCOUNT_ID:role/portfolio-codedeploy-role \
  --deployment-config-name CodeDeployDefault.LambdaAllAtOnce
```

Swap `LambdaAllAtOnce` for `LambdaCanary10Percent5Minutes` if you want real
canary traffic shifting between versions.

## 4. Connect AWS to GitHub (CodeConnections)

Console is easiest: **Developer Tools → Settings → Connections → Create
connection → GitHub**, authorize the `JMReynoso/MyDevPortfolio` repo, and note
the connection ARN. (A connection stays `PENDING` until you complete the
browser handshake — this step can't be done purely from the CLI.)

## 5. CodeBuild project

Console: **CodeBuild → Create project**

- Source: GitHub via the connection from step 4, repo `JMReynoso/MyDevPortfolio`
- Environment: Managed image, Ubuntu `aws/codebuild/standard:7.0`, `BUILD_GENERAL1_SMALL`
  (small = the free-tier size; Playwright needs the Ubuntu image for `--with-deps`)
- Buildspec: "Use a buildspec file" (it reads `buildspec.yml` from the repo)
- Let it create a service role, then attach this inline policy to that role so
  the build can read the SSM param and publish Lambda versions (this JSON is
  pasted into the IAM console, so replace `$ACCOUNT_ID` with your literal
  12-digit account ID):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter", "ssm:GetParameters"],
      "Resource": "arn:aws:ssm:*:$ACCOUNT_ID:parameter/portfolio/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion",
        "lambda:GetAlias",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration"
      ],
      "Resource": "arn:aws:lambda:*:$ACCOUNT_ID:function:portfolio-site*"
    }
  ]
}
```

## 6. CodePipeline

Console: **CodePipeline → Create pipeline** (the wizard creates the service
role and artifact S3 bucket for you):

1. **Source**: GitHub (via CodeConnections), repo `JMReynoso/MyDevPortfolio`,
   branch `main`, trigger on push.
2. **Build**: AWS CodeBuild → `portfolio-site-build`.
3. **Deploy**: AWS CodeDeploy → application `portfolio-site`, deployment group
   `portfolio-site-dg`. Input artifact = the build output (it contains
   `appspec.yaml`).

Release the pipeline once manually and verify the Function URL serves the real
site, then check `aws lambda get-alias --function-name portfolio-site --name live`
shows the new version.

## 7. Decommission the old path

- GitHub Actions `deploy` job — removed (PR-only CI kept in
  `.github/workflows/deploy.yml`; delete the file entirely if you want zero
  GitHub Actions).
- Self-hosted runner: no longer needed for deploys.
- `Dockerfile.prod`, `docker-compose.prod.yml`, `nginx.conf`: unused once the
  Lambda deploy is live — remove when comfortable.

## Free-tier notes

| Service        | Free tier                                              | Fit |
| -------------- | ------------------------------------------------------ | --- |
| Lambda         | 1M requests + 400K GB-s/month, always free             | A portfolio site won't dent this |
| Function URL   | Free (this is why we skip API Gateway)                 | ✔ |
| CodeDeploy     | Free for Lambda deployments                            | ✔ |
| CodeBuild      | 100 build-min/month on `BUILD_GENERAL1_SMALL`          | Playwright install + tests ≈ 5–8 min/build → ~12–20 free deploys/month |
| CodePipeline   | V2: 100 free action-execution min/month                | Plenty for this pipeline |
| S3 (artifacts) | 5 GB free                                              | Artifacts are tiny; add a lifecycle rule to expire old ones |
| CloudWatch     | 5 GB logs free                                         | ✔ |

Caveats:

- **Accounts created after July 15, 2025** are on AWS's newer credits-based
  free plan ($100 signup credits, 6-month free period) instead of the classic
  12-month/always-free structure. Lambda's always-free tier survives either
  way; check which plan your account is on.
- Function URL responses are capped at ~6 MB; base64 encoding inflates
  binaries ~33%. Keep individual images under ~4 MB (compress to WebP) or move
  large media to S3 later.
- The biggest free-tier risk is CodeBuild minutes: pushing to `main` many
  times a day will burn through 100 min/month. PR CI stays on GitHub Actions
  (free) so only merges consume AWS build minutes.
