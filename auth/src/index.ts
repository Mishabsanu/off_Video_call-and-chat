import express from "express";
import mongoose from "mongoose";
import http from "http";
import getConfigs from "./config/config";
import expressConfig from "./frameworks/webserver/express";
import serverConfig from "./frameworks/webserver/index";
import GetMongo from "./frameworks/database/mongoDb/connection";
import routes from "./frameworks/webserver/routes";

const app = express();

const server = http.createServer(app);

new GetMongo(mongoose, getConfigs).connectToMongodb();

expressConfig(app, getConfigs);

routes(app, express, getConfigs);

serverConfig(server, getConfigs).startServer();
