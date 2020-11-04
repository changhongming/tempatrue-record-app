import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();


precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', event => {
  const randVal = Math.random();
  let title = (event.data && event.data.text()) || 'a default message if nothing was passed to us';
  let body = 'Hi, Just a Test. ' + randVal;
  let tag = 'push-simple-demo-notification-tag-' + randVal;
  let icon = '/icon-512x512.png';

  event.waitUntil(
    self.registration.showNotification(title, { body, icon, tag })
  );
});

