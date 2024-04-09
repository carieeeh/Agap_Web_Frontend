import {
  onDocumentCreated,
} from "firebase-functions/v2/firestore";

const {getFirestore} = require("firebase-admin/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = onRequest(
    {cors: true},
    (request, response) => {
      response.status(200).send({
        data: "Hello from Firebase!",
      });
    },
);

exports.sendNotification = onRequest(
    {cors: true},
    (req, res) => {
      const reqBody = req.body;

      const message = {
        token: reqBody.fcm_token,
        notification: {
          title: reqBody.title,
          body: reqBody.body,
        },
        data: reqBody.data,
      };

      admin.messaging().send(message)
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

exports.onReportCreation = onDocumentCreated("emergencies/{docId}", (event) => {
  const db = getFirestore();
  const usersRef = db.collection("/agap_collection/staging/users");
  const adminSnapshots = usersRef.where("role", "==", "admin").get();

  if (adminSnapshots.empty) {
    console.log("No matching documents.");
    return;
  }

  adminSnapshots.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const data = snapshot.data();
});
