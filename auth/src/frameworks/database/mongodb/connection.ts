/**
 * This class gives you connection methords for mongodb using mongoose
 */
export default class GetMongo {
  private mongoose: any;
  private serverConfigs: any;

  constructor(mongoose: any, serverConfigs: any) {
    this.mongoose = mongoose;
    this.serverConfigs = serverConfigs();

    const onConnected = () => {
      console.info(
        `[${this.serverConfigs?.server?.serverId}] DB Connected to db`
      );
    };

    const onReConnected = () => {
      console.info(
        `[${this.serverConfigs?.server?.serverId}] MongoDB reconnected!`
      );
    };

    const onError = (error: any) => {
      console.error(
        `[${this.serverConfigs?.server?.serverId}] Error in MongoDb connection: `,
        error
      );
      mongoose.disconnect();
    };

    const onDisconnect = () => {
      if (this.serverConfigs?.mongo?.autoReconnect) {
        console.error(
          `[${
            this.serverConfigs?.server?.serverId
          }] MongoDB disconnected! Reconnecting in ${
            this.serverConfigs?.mongo?.reconnectInterval / 1000
          }s...`
        );
        setTimeout(
          () => this.connectToMongodb(mongoose, this.serverConfigs),
          this.serverConfigs?.mongo?.reconnectInterval
        );
      }
    };

    // setting up event handlers and listeners
    mongoose.connection.on("connected", onConnected);
    mongoose.connection.on("reconnected", onReConnected);
    mongoose.connection.on("error", onError);
    mongoose.connection.on("disconnected", onDisconnect);
  }

  /**
   * Connect mongose to mongodb
   */
  connectToMongodb(mongoose?: any, serverConfigs?: any) {
    const mong = this?.mongoose ?? mongoose;
    const conf = this?.serverConfigs ?? serverConfigs;
    mong
      .connect(conf?.mongo?.url)
      .then(
        () => {},
        (err: any) => {
          console.info("Mongodb error", err);
        }
      )
      .catch((err: any) => {
        console.log("ERROR AT MONGO:", err);
      });
  }
}
