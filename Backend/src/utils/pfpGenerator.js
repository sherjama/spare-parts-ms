import { createCanvas } from "canvas";
import fs from "fs";

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 1);
}

function generateInitialsImage(name, filePath = "pfp.png") {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 100px sans-serif";
  ctx.fillStyle = "#ffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getInitials(name), canvas.width / 2, canvas.height / 2);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filePath, buffer);
  console.log(filePath);
  return filePath;
}

export { generateInitialsImage };
