import ExpressApp, { Express } from "express";
import getConfigs from "../../../config/config";
import errorHandlingMiddleWare from "../middlewares/errorHandlingMiddleware";
import notFoundMiddleware from "../middlewares/notfoundMiddleware";
import userRouter from "./user";

export default function routes(
  app: Express,
  express: typeof ExpressApp,
  configs: typeof getConfigs
) {
  const config = configs();

  app.use(`${config.server.appBaseUrl}/api/v1`, userRouter(express));

  app.all("*", notFoundMiddleware);
  app.use(errorHandlingMiddleWare);
}
