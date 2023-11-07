import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config = {

  app: {
    port: process.env.PORT || 4001
  }
  //-------------------------------------------------------------

}

export default config;
