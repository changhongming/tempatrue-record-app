import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from './components/Hello.vue';
import Home from './components/Home.vue';

import axios from './plugins/axios';

import './css/main.css';

import store from './store';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
const vapidPublicKey = urlBase64ToUint8Array(
  "BIhkiNM1U1xyGKU8JRRO8okL_4zemo2B_lL87W4eS1bfytF0YfOAI61dIyE6DkMX-jpAtK5m0_oOVMVn4A4dYqg"
);

function requestNotification() {
  if (!("Notification" in window)) {
    return "notSupport";
  }
  Notification.requestPermission(function (status) {
    console.log("Notification Permission status:", status);
  });

  if (Notification.permission === "denied") {
    return "denied";
  }
  return true;
}

function serviceWorkerRegister() {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.register("/service-worker.js");
  }
  return null;
}

const sw = serviceWorkerRegister();
const notifyState = requestNotification();
if (notifyState === "noSupport") {
  alert("This browser does not support push notification.");
  document.getElementById("welcome-msg").innerHTML =
    "This browser does not support push notification.";
} else if (notifyState === "denied") {
  document.getElementById("welcome-msg").innerHTML =
    "You've denied notification on a notification Demo!";
} else if (notifyState === true) {
  if (sw) {
    const ctx = {};
    sw.then(function (registration) {
      ctx.registration = registration;
      return registration.pushManager.getSubscription();
    }).then(function (subscription) {
      console.log("subscription:", subscription);
      if (!subscription) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: vapidPublicKey,
        };
        ctx.registration.pushManager
          .subscribe(subscribeOptions)
          .then(function (pushSubscription) {
            PostSubscriptionDetails(pushSubscription);
          });
      } else {
        document.getElementById("welcome-msg").innerHTML =
          "Ready for Notifications!";
      }
    });
  }
}

function PostSubscriptionDetails(Subscription) {
  let sub = JSON.parse(JSON.stringify(Subscription));

  let token = sub.keys.p256dh;
  let auth = sub.keys.auth;
  let fields = { endpoint: sub.endpoint, token: token, auth: auth };
  axios.post('/newbrowser', undefined, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (data) {
    console.log("returned from server:");
    console.log(data);
    document.getElementById("welcome-msg").innerHTML =
      "Ready for Notifications!";
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}


Vue.use(VueRouter);

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

const NotFound = {
  template: '<div><h1>Not Found</h1></div>'
};

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User },
    { path: '/hello', component: Hello, meta: { keepAlive: true } },
    { path: '*', component: NotFound },
  ]
});
router.replace('/hello');


import vuetify from './plugins/vuetify';

new Vue({
  router,
  vuetify,
  store,
  components: {
    Home
  }
}).$mount('#app');
