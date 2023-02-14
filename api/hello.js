export default function test(req, res) {
  res.send(`Hello ${req.body.name}`)
}
