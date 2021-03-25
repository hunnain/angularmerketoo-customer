'use strict';

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.',event);
    var data = event.data.json();
    console.log("notification data on sw--",data)

    const title = formatType(data.Type);
    const options = {
        body: data.Text,
        icon: 'assets/push.png',
        badge: 'assets/push.png',
        data: data.Url
    };

    const promiseChain = self.registration.showNotification(title, options);

    event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function (event) {
    const urlToOpen = new URL(event.notification.data, self.location.origin).href;

    event.notification.close();

    event.waitUntil(clients.openWindow(urlToOpen));
});

const formatType = (type) => {
    let formattedType = type ? type.match(/[A-Z][a-z]+|[0-9]+/g).join(" "): "";
    return formattedType;
  }