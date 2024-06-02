import { default as aaaa } from "axios";
import { URL_SERVER } from "../constants/enviroment";
// import * as env from "./../environment";
// const { API_URL_BUILD } = env[process.env.REACT_APP_ENV] || env["development"];

// import * as env from "./../environment";
// const { API_URL_BUILD } = env[process.env.REACT_APP_ENV] || env["development"];

const axios = aaaa.create({
  baseURL: URL_SERVER,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axios;
