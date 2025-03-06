import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const FIBONACCI_END = 11;
const WORKLOAD1 = `function fibonacci(n){let a=0,b=1,temp;for(let i=1;i<n;i++){temp=a+b;a=b;b=temp}return b};console.log('fibonacci ${FIBONACCI_END}', fibonacci(${FIBONACCI_END}))`;

app.get("/api/get-workload", (req, res) => {
  console.log('call to /api/get-workload');
  res.send({
    workload: WORKLOAD1,
  });
});

let clients = [];
let facts = [];

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)} clients: ${JSON.stringify(clients.map(client => client.id))} \n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

app.get('/events', eventsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
