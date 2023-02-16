import vision from '@google-cloud/vision';
import {GoogleAuth} from 'google-auth-library';

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const auth = new GoogleAuth({credentials })
const client = new vision.ImageAnnotatorClient({auth});

const analyze = async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.body.image, 'base64');
    const [result] = await client.textDetection(fileBuffer);
    const response = {
      detection: result.textAnnotations
    }
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
}


module.exports = {
  analyze,
  default: analyze
}
