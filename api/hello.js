const vision = require('@google-cloud/vision');
const {GoogleAuth}= require('google-auth-library');

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const auth = new GoogleAuth({credentials 
})
const client = new vision.ImageAnnotatorClient({auth});
const getToken = async () => {
  return await auth.getClient()
}


const analyze = async (req, res) => {
  console.log(await getToken())
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
