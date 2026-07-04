const fs = require("fs");
const path = require("path");
const data = require("./file-writer-data.json");
const base = path.join(__dirname, "src");
for (const [rel, b64] of Object.entries(data)) {
  const fp = path.join(base, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, Buffer.from(b64, "base64").toString("utf8"));
  console.log("Written: " + rel);
}
console.log("All files written!");