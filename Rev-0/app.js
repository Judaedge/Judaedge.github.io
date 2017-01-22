'use strict';
var config = {
    apiKey: "AIzaSyAlhe9cUgL1WrNEViwaqFAPYZ2oQ_U1MXc",
    authDomain: "ebialarmnotification.firebaseapp.com",
    databaseURL: "https://ebialarmnotification.firebaseio.com",
    storageBucket: "ebialarmnotification.appspot.com",
    messagingSenderId: "192007174133"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();


messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        return messaging.getToken();
    })

.then(function(token) {
        console.log("Firebase token ◕‿◕ :", token);

        //var data = { client: token }
        var database = firebase.database();
        var ref = database.ref('Tokens').child(token);

        ref.once("value")
            .then(function(snapshot) {
                if (snapshot.exists()) {} else {
                    ref.push(token)
                }
            });
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify. ', err);
    })
    // -----------
var database = firebase.database();
var ref = database.ref('Tokens')
ref.once("value")
    .then(function(snapshot) {
        var keyy = Object.keys(snapshot.val());
        var uz = keyy.length;
        var first = keyy[0];

        console.log(keyy);
        console.log(uz);
    });

// -----------

function FCMCourier(apiKey) {
    this.apiKey = "AIzaSyAlhe9cUgL1WrNEViwaqFAPYZ2oQ_U1MXc";
    this.push = function(notification, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    var output = xhttp.responseText;
                    callback && callback(true, output);
                } else {
                    callback && callback(false, xhttp.responseText, xhttp.status);
                }
            }
        }
        xhttp.open('POST', 'https://fcm.googleapis.com/fcm/send', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.setRequestHeader('Authorization', 'key=AIzaSyAlhe9cUgL1WrNEViwaqFAPYZ2oQ_U1MXc');
        xhttp.send(JSON.stringify(notification));
    };
};
var database = firebase.database();
var Refobject = database.ref('PushEvents/LastEvent').child('0');

Refobject.on('value', function(snapshot) {
    var sourcecode = snapshot.child("source").val();
    var descriptioncode = snapshot.child("description").val();
    var datimecode = snapshot.child("datimeF").val();
    var courier = new FCMCourier();
    // find and import clients tokens into payload
    var database = firebase.database();
    var ref = database.ref('Tokens')
    ref.once("value")
        .then(function(snapshot) {
            var keys = Object.keys(snapshot.val());
            //var first = keys[0];
            var keylengths = keys.length;
            for (var i = 0; i < keylengths; i++) {
                var k = keys[i]
                console.log(k);
            }




            var payload = {
                to: k,
                content_available: true, // for iOS
                priority: 'high',



                notification: {
                    title: sourcecode,
                    body: descriptioncode + ' - - ' + datimecode,
                    icon: 'firebase-logo.png',
                    //click_action : "https://judaedge.github.io"
                }

            }

            courier.push(payload, console.log.bind(console));
            messaging.onMessage(function(payload) {
                console.log('Message Received', payload);
            });
        });
});