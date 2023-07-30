export default function notFoundMiddleware(_: any, res: any) {
  res.status(404);
  res.send({
    code: 404,
    status: "The service you are looking for is not on this server",
    message: "Not found",
  });
}
