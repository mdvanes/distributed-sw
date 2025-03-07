import { clients } from "./events";
import { defineEventHandler } from "h3";
import { createLog } from "../../../../util/log";

const log = createLog("get-clients  ");

export default defineEventHandler(() => {
  log("start");

  return {
    clients,
  };
});
