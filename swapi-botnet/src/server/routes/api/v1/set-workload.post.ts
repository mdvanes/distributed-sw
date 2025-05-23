import { defineEventHandler, readBody } from "h3";
import { createLog } from "../../../../util/log";

const log = createLog("set-workload POST ");

export const workloads = {
  workload: "",
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  log(`body id=${body.id} brands=${body.brands}`);

  const newWorkload = JSON.parse(body);

  log(newWorkload);

  workloads.workload = newWorkload;

  // let newId = 0;

  // if (!id) {
  //   newId = clients.fill({} as any).length;
  //   clients.push({
  //     id: newId,
  //     response: undefined,
  //     brands,
  //     timestamp: Date.now(),
  //   });
  // } else {
  //   clients[id] = {
  //     ...clients[id],
  //     timestamp: Date.now(),
  //   };
  // }

  // log(body);

  // return {
  //   id: id ?? newId,
  //   workload: WORKLOAD1,
  // };

  return {};
});
