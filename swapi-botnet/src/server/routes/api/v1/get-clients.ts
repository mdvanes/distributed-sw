import { clients, overwriteClients } from "./events";
import { defineEventHandler } from "h3";
import { createLog } from "../../../../util/log";

const log = createLog("get-clients  ");

const STALE_RANGE = 1000 * 60 * 5; // 5 minutes

export default defineEventHandler(() => {
  log(`start clients=${JSON.stringify(clients)} now=${Date.now()}`);

  const now = Date.now();

  // Remove stale clients
  const newClients = clients.filter((client) => {
    return now - (client.timestamp ?? 0) <= STALE_RANGE;
  });

  overwriteClients(newClients);

  return {
    clients: newClients,
  };
});
