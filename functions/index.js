const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {getFirestore} = require("firebase-admin/firestore");
const {getMessaging} = require("firebase-admin/messaging");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// const {
//   log,
//   warn,
// } = require("firebase-functions/logger");

// const httpOptions = {cors: true};
admin.initializeApp();

exports.sendNotification = onRequest(
    {cors: true},
    (req, res) => {
      const reqBody = req.body;

      const message = {
        data: reqBody.data,
        token: reqBody.token,
      };

      admin.messaging().send(message.data)
          .then((response) => {
            console.log("Message sent:", response);
            res.status(200).send({
              success: true,
              data: response,
            });
          })
          .catch((error) => {
            console.error("Error sending message:", error);
            res.status(500).send({
              success: false,
              data: error,
            });
          });
    });

exports.onReportCreation =
  onDocumentCreated("/agap_collection/staging/emergencies/{docId}", (event) => {
    const snapshot = event.data;
    const emergencyData = snapshot.data();

    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }

    const db = getFirestore();
    const usersRef = db.collection("/agap_collection/staging/users");
    const adminSnapshots = usersRef.where("role", "==", "admin").get();
    console.log(adminSnapshots);
    if (adminSnapshots.empty) {
      console.log("No matching documents.");
      return;
    }

    const adminTokens = adminSnapshots.map((doc) => doc.data().fcm_token);
    const message = {
      notification: {
        title: "New emergency report!",
        body: "Please check the details and decide what action to take.",
      },
      data: emergencyData,
    };
    getMessaging().subscribeToTopic(adminTokens, snapshot.id)
        .then((response) => {
          console.log("Message sent:", response);
          admin.messaging().sendToTopic(snapshot.id, message);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
  });
/*
exports.sendMsgToTopic = onRequest(httpOptions, (req, res) => {
  // send message to a topic;
});

exports.onReportAccepted = onRequest(httpOptions, (req, res) => {
  // const data = req.body;
  // TODO: find closes rescuer with the given amount needed unit
});

exports.subscribeToEmergency = onRequest(httpOptions, (req, res) => {
  // TODO: when rescuer accepts a emergency they will be subscribe to the topic
  // and send a message to all subscribers
});

exports.unsubscribeToEmergency = onRequest(httpOptions, (req, res) => {
  // TODO: unsubscribe the users on finish emergency
  // const request = req.body;
  // getMessaging().unsubscribeFromTopic(registrationTokens, topic)
  //     .then((response) => {
  //       console.log("Message sent:", response);
  //       res.status(200).send({
  //         success: true,
  //         data: response,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error sending message:", error);
  //       res.status(500).send({
  //         success: false,
  //         data: error,
  //       });
  //     });
});
*/
