import { getFunctions, httpsCallable } from "firebase/functions";
import { useFirebaseApp } from "vuefire";
import emailjs from "@emailjs/browser";
import { useErrorMessage } from "./utilities";

export function useSendEmail(subject, name, email, message) {
  emailjs
    .send(
      "service_5qx9jsg",
      "template_lnd6gc5",
      {
        subject: subject,
        name: name,
        email: email,
        message: message,
      },
      {
        publicKey: "uoh9gjRJ6Yri6wLZN",
      }
    )
    .then(() => {
      console.log("email sent!");
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function useEmailSend() {
  const functions = getFunctions(useFirebaseApp());

  const sendMail = httpsCallable(functions, "helloWorld");
  try {
    const result = await sendMail({});
    console.log(result);
  } catch (error) {
    console.error(error);
    useErrorMessage("Oops", "Failed sending email.", "top-right")
  }
}
