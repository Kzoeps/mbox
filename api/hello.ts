export const config = {
  runtime: 'edge'
}

export default (req: Request) => {
  return new Response(`Hello from ${req.url}, is an edge function`)
}
