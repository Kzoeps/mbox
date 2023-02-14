import type {VercelRequest, VercelResponse} from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.send(`Hello ${req.body.name}`);
}
