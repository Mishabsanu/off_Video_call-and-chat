import bodyParser from "body-parser";
import { Express } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import getConfigs from "../../config/config";

export default function expressConfig(
  app: Express,
  configs: typeof getConfigs
) {
  const config = configs();
  app.use(helmet());
  app.use(logger(config.morgan.logStyle));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(cookieParser());
  app.use(cors(config.cors));
}
