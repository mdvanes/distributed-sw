import { defineEventHandler, readBody } from "h3";
import { createLog } from "../../../../util/log";
import { clients } from "./events";

const FIBONACCI_END = 11;
const WORKLOAD1 = `function fibonacci(n){let a=0,b=1,temp;for(let i=1;i<n;i++){temp=a+b;a=b;b=temp}return b};console.log('fibonacci ${FIBONACCI_END}', fibonacci(${FIBONACCI_END}))`;

const log = createLog("get-workload POST ");

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  log(`body id=${body.id} brands=${body.brands}`);

  const { id, brands } = JSON.parse(body);

  let newId = 0;

  if (!id) {
    newId = clients.fill({} as any).length;
    clients.push({
      id: newId,
      response: undefined,
      brands,
      timestamp: Date.now(),
    });
  } else {
    clients[id] = {
      ...clients[id],
      timestamp: Date.now(),
    };
  }

  log(body);

  return {
    id: id ?? newId,
    workload: WORKLOAD1,
  };
});
