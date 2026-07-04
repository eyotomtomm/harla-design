import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
const base = "/Users/designs/Downloads/Independency day/indochine/indochine-nextjs/src";
function w(rel, b64) { const fp = join(base, rel); mkdirSync(dirname(fp), { recursive: true }); writeFileSync(fp, Buffer.from(b64, "base64").toString()); console.log("Written: " + rel); }
