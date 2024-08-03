import app from "./app";
import logger from "./utils/logger";
import config from "./config/config";

const PORT = config.app.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //   logger.info(`Listening on port ${config.app.port}`);
});
