import { ImageAnnotatorClient } from "@google-cloud/vision"

const client = new ImageAnnotatorClient();

export default async (req, res) => {
  res.send(`Hello ${req.body.name}`)
}
