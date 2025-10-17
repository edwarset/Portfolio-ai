import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root and public directory
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

// Handle all routes by sending index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
