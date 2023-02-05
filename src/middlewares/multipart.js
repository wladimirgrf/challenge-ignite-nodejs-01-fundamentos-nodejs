export async function multipart(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = Buffer.concat(buffers).toString();
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}

