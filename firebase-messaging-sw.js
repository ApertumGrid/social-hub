importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey:            "AIzaSyANZhaAodV4TvfLk84dzwscI7cSSiwyyv4",
    authDomain:        "socialhub-33014.firebaseapp.com",
    projectId:         "socialhub-33014",
    storageBucket:     "socialhub-33014.firebasestorage.app",
    messagingSenderId: "864088350104",
    appId:             "1:864088350104:web:9a5044bd40c6621fa7dfed"
});

const messaging = firebase.messaging();

// Background messages (app closed / tab not focused)
messaging.onBackgroundMessage(function(payload) {
    const title   = payload.notification?.title || 'SocialHub';
    const options = {
        body:  payload.notification?.body  || '',
        icon:  'https://socialhubglobal.com/favicon.ico',
        badge: 'https://socialhubglobal.com/favicon.ico',
        data:  payload.data || {}
    };
    self.registration.showNotification(title, options);
});

// Tap notification → open app
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('https://socialhubglobal.com'));
});
