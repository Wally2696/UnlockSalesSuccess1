import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from dist/public
app.use(express.static("dist/public"));

// Fallback for React Router routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`[express] serving on port ${PORT}`);
});
