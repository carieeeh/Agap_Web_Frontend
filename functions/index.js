const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {getFirestore} = require("firebase-admin/firestore");
const {getMessaging} = require("firebase-admin/messaging");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

const httpOptions = {cors: true};
admin.initializeApp();

exports.sendNotification = onRequest({cors: true}, (req, res) => {
  const reqBody = req.body;

  const message = {
    data: reqBody.data,
    token: reqBody.token,
  };

  admin
      .messaging()
      .send(message.data)
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

exports.findFreeRescuers = onRequest(httpOptions, async (req, res) => {
  try {
    const db = getFirestore();
    const data = req.body.data;

    const rescuerLocationsRef = db.collection(
        "/agap_collection/staging/rescuer_locations",
    );
    const rescuerSnapshots = await rescuerLocationsRef
        .where("status", "==", "free")
        .get();

    if (rescuerSnapshots.empty) {
      return res.status(200).send({
        success: true,
        data: {
          message: "No free rescuer at the moment.",
        },
      });
    }

    const rescuersUid = rescuerSnapshots.map((doc) => doc.data().uid);

    const tokens = [];
    rescuerSnapshots.forEach((rescuer) => {
      const usersRef = db.collection("/agap_collection/staging/users");
      const userSnapshots = usersRef.where("uid", "==", rescuer.data().uid)
          .get();
      if (!userSnapshots.empty) {
        tokens.push(userSnapshots[0].data().fcm_token);
      }
    });

    const message = {
      data: data,
      tokens: tokens,
    };

    admin
        .messaging()
        .send(message.data)
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

    return res.status(200).send({
      success: true,
      data: {
        rescuers_uid: JSON.stringify(rescuersUid),
        message: "successfully send request to rescuers",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

exports.onReportCreation = onDocumentCreated(
    "/agap_collection/staging/emergencies/{docId}",
    (event) => {
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
      getMessaging()
          .subscribeToTopic(adminTokens, snapshot.id)
          .then((response) => {
            console.log("Message sent:", response);
            admin.messaging().sendToTopic(snapshot.id, message);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
    },
);

// exports.subscribeToEmergency = onRequest(httpOptions, (req, res) => {
// TODO: when rescuer accepts a emergency they will be subscribe to the topic
// and send a message to all subscribers
// });

/*
exports.sendMsgToTopic = onRequest(httpOptions, (req, res) => {
  // send message to a topic;
});

exports.onReportAccepted = onRequest(httpOptions, (req, res) => {
  // const data = req.body;
  // TODO: find closes rescuer with the given amount needed unit
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
