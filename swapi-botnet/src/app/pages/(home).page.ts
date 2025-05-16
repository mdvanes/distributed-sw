import { Component, OnInit } from "@angular/core";

type NavigatorExtended =
  | {
      userAgentData?: {
        brands?: { brand: string; version: string }[];
      };
    }
  | undefined;

@Component({
  selector: "swapi-botnet-home",
  imports: [],
  template: ` <div><h1>home</h1></div> `,
  styles: [
    `
      div {
        color: lightgreen;
        padding: 3rem;
        font-family: Arial, sans-serif;
        font-size: 2rem;
      }
    `,
  ],
})
export default class HomeComponent implements OnInit {
  constructor() {
    console.log("HomeComponent constructor");

    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/serviceworker.js",
            {
              scope: "/",
            }
          );
          if (registration.installing) {
            console.log("Service worker installing");
          } else if (registration.waiting) {
            console.log("Service worker installed");
          } else if (registration.active) {
            console.log("Service worker active");
          }
        } catch (error) {
          console.error(`Registration failed with ${error}`);
        }
      }
    };

    registerServiceWorker();

    function notifyMe() {
      if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("Hi there!");
        // …
      } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            const notification = new Notification("Hi there!");
            // …
          }
        });

        // console.log('start notification');
        // const notification = new Notification("Hi there!");
      }

      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them anymore.
    }

    notifyMe();
  }

  ngOnInit() {
    console.log("HomeComponent ngOnInit");
  }
}
