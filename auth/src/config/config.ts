import dotenv from "dotenv";
dotenv.config();

const getConfigs = () => {
  return {
    morgan: {
      logStyle: "dev",
    },
    cors: {
      origin: ["*", "http://127.0.0.1:5173"],
      credentials: true,
    },
    server: {
      name: "OFF authServer",
      port: process.env.PORT || 2000,
      baseURl: "/",
      serverId: "1",
      appBaseUrl: "/auth",
      adminBaseUrl: "/auth/su",
    },
    mongo: {
      url: process.env.MONGODB_URL,
      reconnectInterval: 10000,
      autoReconnect: true,
      options: {
        autoIndex: false,
        useNewUrlParser: true,
        keepAlive: true,
        connectTimeoutMS: 1000,
      },
    },
    jwt: {
      accessSecret: process.env.ACCESS_TOKEN_SECRET,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET,
      accessOptions: {
        expiresIn: "25m",
      },
      refreshOptions: {
        expiresIn: "365d",
      },
    },
    mail: {
      userMail: process.env.NODEMAIL_USER,
      userPass: process.env.NODEMAIL_PASS,
    },
    CLIENT_URL: {
      URL: 'http://127.0.0.1:5173/',
    },
  };
};

export default getConfigs;
