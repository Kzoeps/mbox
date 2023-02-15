const vision = require('@google-cloud/vision');
const fs = require('fs');
const client = new vision.ImageAnnotatorClient();

const analyze = async (req, res) => {
  const fileBuffer = Buffer.from(req.body.image, 'base64');
  const [result] = await client.textDetection(fileBuffer);
  const response = {
    detection: result
  }
  res.send(response);
}


module.exports = {
  analyze,
  default: analyze
}
