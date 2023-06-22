import vision from "@google-cloud/vision";
import { GoogleAuth } from "google-auth-library";
import admin from "firebase-admin";
import dayjs from "dayjs";
import "dotenv/config";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const firebaseCreds = JSON.parse(process.env.MBOX_APPLICATION_CREDENTIALS);
const auth = new GoogleAuth({ credentials });
let firebaseAuth = undefined;
const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseCreds.project_id,
    clientEmail: firebaseCreds.client_email,
    privateKey: firebaseCreds.private_key.replace(/\\n/g, "\n"),
  }),
});
firebaseAuth = admin.auth(app);
const client = new vision.ImageAnnotatorClient({ auth });

const analyze = async (req, res) => {
  try {
    if(!req.body.token || !req.body.image){
      res.status(400).send("Bad Request");
      return;
    }
    const decodedToken = await firebaseAuth.verifyIdToken(req.body.token);
    if (decodedToken.uid && dayjs.unix(decodedToken.exp).isAfter(dayjs())) {
      const fileBuffer = Buffer.from(req.body.image, "base64");
      const [result] = await client.textDetection(fileBuffer);
      const response = {
        detection: result.textAnnotations,
      };
      res.send(response);
    } else{
      res.status(401).send("Unauthorized");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export default analyze;
