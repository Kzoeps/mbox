import { ImageAnnotatorClient } from "@google-cloud/vision"
import { Buffer } from "buffer";

const client = new ImageAnnotatorClient();

export default async (req, res) => {
  const fileBuffer = Buffer.from(req.body.image);
  res.send(`Hello ${req.body.name}`)
}
