export default function errorHandlingMiddleWare(err: any, _: any, res: any) {
  const code = Number(err.code) || 500;
  res.status(code);
  res.send({ code, error: err?.error, message: err?.message });
}
