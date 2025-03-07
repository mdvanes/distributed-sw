import { defineEventHandler } from "h3";
import { createLog } from "../../../../util/log";

const FIBONACCI_END = 11;
const WORKLOAD1 = `function fibonacci(n){let a=0,b=1,temp;for(let i=1;i<n;i++){temp=a+b;a=b;b=temp}return b};console.log('fibonacci ${FIBONACCI_END}', fibonacci(${FIBONACCI_END}))`;

const log = createLog("get-workload  ");

export default defineEventHandler(() => {
  log("get-workload");

  return {
    workload: WORKLOAD1,
  };
});
