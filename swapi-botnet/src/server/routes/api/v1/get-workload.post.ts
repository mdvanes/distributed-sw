import { defineEventHandler, readBody } from "h3";
import { createLog } from "../../../../util/log";
import { clients } from "./events";

const FIBONACCI_END = 11;
const WORKLOAD1 = `function fibonacci(n){let a=0,b=1,temp;for(let i=1;i<n;i++){temp=a+b;a=b;b=temp}return b};console.log('fibonacci ${FIBONACCI_END}', fibonacci(${FIBONACCI_END}))`;

const log = createLog("get-workload POST ");

export default defineEventHandler(async (event) => {
  log("start");

  const body = await readBody(event);

  console.log("body", body, typeof body);

  const { id, brands } = JSON.parse(body);

  if (!id) {
    clients.push({ id: 1, response: undefined, brands });
  }

  log(body);

  return {
    workload: WORKLOAD1,
  };
});
