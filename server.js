import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

// Check if dist directory exists
const distPath = path.join(__dirname, "dist");
if (!fs.existsSync(distPath)) {
  console.error(`Error: dist directory not found at ${distPath}`);
  console.log('Please run "npm run build" first to build your Vite app');
  process.exit(1);
}

// Serve static files
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
