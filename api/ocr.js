import vision from "@google-cloud/vision";
import { GoogleAuth } from "google-auth-library";
import { initializeApp, getAuth } from "firebase-admin";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const auth = new GoogleAuth({ credentials });
const app = initializeApp({ auth: auth });
const firebaseAuth = getAuth(app);
const client = new vision.ImageAnnotatorClient({ auth });

const analyze = async (req, res) => {
  try {
    const decodedToken = await firebaseAuth.verifyIdToken(req.body.token);
    console.log(decodedToken);
    if (decodedToken.uid) {
      const fileBuffer = Buffer.from(req.body.image, "base64");
      const [result] = await client.textDetection(fileBuffer);
      const response = {
        detection: result.textAnnotations,
      };
      res.send(response);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export default analyze;
