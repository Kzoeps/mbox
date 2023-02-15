import { ImageAnnotatorClient } from "@google-cloud/vision"
import { Buffer } from "buffer";

const client = new ImageAnnotatorClient();

export default async (req, res) => {
  const fileBuffer = Buffer.from(req.body.image, 'base64url');
  res.send(`Hello ${req.body.name}`)
}
