import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

const distPath = path.join(__dirname, "dist");

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error(`Error: dist directory not found at ${distPath}`);
  process.exit(1);
}

// Serve static files with caching and performance optimizations
app.use(
  express.static(distPath, {
    maxAge: "1d", // Cache static files for 1 day
    etag: false, // Disable ETags
    lastModified: false, // Disable Last-Modified header
  }),
);

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

