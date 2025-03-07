# swapi-botnet

Proof of concept to explore edge cases of practical browser protection against using the Service Worker API on multiple clients to receive and run remote code via server sent events.

This could theoretically turn the service workers on clients into a botnet.

## Usage

- Start server: ...
- Start a cloudflared tunnel: cloudflared tunnel --url http://localhost:3000
- Open multiple browsers sessions / different browsers with `cloudflare-url`/ and one with the admin dashboard `cloudflare-url`/dashboard
- Use the dashboard to monitor the connected clients, and send a workload.
- Observe the workload executed by all the connected clients.
