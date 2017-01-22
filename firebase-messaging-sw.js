// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
'use strict';
importScripts('https://www.gstatic.com/firebasejs/3.6.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.6/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyAlhe9cUgL1WrNEViwaqFAPYZ2oQ_U1MXc",
    authDomain: "ebialarmnotification.firebaseapp.com",
    databaseURL: "https://ebialarmnotification.firebaseio.com",
    storageBucket: "ebialarmnotification.appspot.com",
    messagingSenderId: "192007174133"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
//firebase.initializeApp({
//    'messagingSenderId': '192007174133'
//});