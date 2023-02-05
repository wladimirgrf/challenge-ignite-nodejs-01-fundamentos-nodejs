import http from "node:http";
import { json } from "./middlewares/json.js";
import { multipart } from "./middlewares/multipart.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const content_type = req.headers['content-type'];

  if (content_type && content_type.startsWith('multipart/form-data')) {
    await multipart(req, res)
  } else {
    await json(req, res)
  }

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups;

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
});

server.listen(3333);

