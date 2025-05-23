import { defineEventHandler, createEventStream, EventStreamMessage } from "h3";
import { createLog } from "../../../../util/log";
// import { getSmartEntities } from '../../../../util/smart-entities';

type Client = {
  id: number;
  response: unknown;
  brands?: string;
  timestamp?: number;
};

export let clients: Client[] = [];
let facts: string[] = [];

const log = createLog("events        ");

export const overwriteClients = (newClients: Client[]) => {
  clients = newClients;
};

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  log("start", JSON.stringify(event.context.clientAddress));

  //   const interval = setInterval(async () => {
  //     // const smartEntities = await getSmartEntities();
  //     // TODO data must be string, but it is possible to send different events over the same eventStream, e.g.:
  //     // import { defineEventHandler, createEventStream, EventStreamMessage } from 'h3';
  //     // eventStream.push({ event: 'foo', data: '' } as EventStreamMessage);
  //     // eventStream.push({ event: 'bar', data: '' } as EventStreamMessage);

  //     const clientId = Date.now();

  //     const data = `data: ${JSON.stringify(facts)} clients: ${JSON.stringify(
  //       clients.map((client) => client.id)
  //     )} \n\n`;

  //     //   response.write(data);

  //     const newClient = {
  //       id: clientId,
  //       response: event,
  //     };

  //     clients.push(newClient);

  //     await eventStream.push(JSON.stringify(data));
  //   }, 5_000);

  const clientId = Date.now();

  const data = `data: ${JSON.stringify(facts)} clients: ${JSON.stringify(
    clients.map((client) => client.id)
  )} \n\n`;

  //   response.write(data);

  const newClient = {
    id: clientId,
    response: event,
  };

  clients.push(newClient);

  log("data", data);

  setTimeout(async () => {
    // In timeout, because must be after eventStream.send() ?
    // await eventStream.push(JSON.stringify(data));
    await eventStream.push({
      event: "new-workload",
      data,
    } as EventStreamMessage);
  }, 1_000);

  //   eventStream.onClosed(async () => {
  //     clearInterval(interval);
  //     await eventStream.close();
  //   });

  return eventStream.send();
});
