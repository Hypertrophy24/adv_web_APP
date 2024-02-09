/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {randomUUID} = require("crypto");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "wombat-1e0bc",
    "private_key_id": "9bc5d3d7e019c3d5b7b8f2889964a64d71ba0b26",
    "private_key": "-----BEGIN PRIVATE KEY-----\n"+
      "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDOdnpmkmJjSXkx\n"+
      "zM7Yz/DqHtzQgYX3ROfttKNL2tx6RSe395rCxAgAqq1BEAS3JBPr/CwztfnxIxJ1\n"+
      "dip/7DHd2hLXUUWaB2K+LM2J1ZuaT2sAR5DOAqXl7FtAh5aXYQV427oBy8iB+Ybs\n"+
      "MFPzijxVMJSOy91fIXaYJPybtnqcYSVuTtqF5smSrqvZj1t5XYNqAUBsHMo5Y5ok\n"+
      "t7yefUqAhjCl0jNPUKQoAW2J6iCBeK55v4k7lW1o4/C6ytQ8QoUVtOl/D1KC2YOI\n"+
      "XfHtXn2O961gnv4BJZHjMnkcrSgyjt1/ENYvHHjy+UdXhJhFmUaFpXWMZWJax68c\n"+
      "OMd0EJh5AgMBAAECggEAAS8K75FWHNx4qJO63cf9GkTOv4WZIGVohPwHJgaqsd5G\n"+
      "J53qQp5mxGDPvgI3INbajsEY/p2bXYSJDZEkIttYmzcN3cjC4dNTzHMf7cyTsa0U\n"+
      "E9Hw9S3TUxBqpyg0qQIVtXBYnEjPHxsOYGi4KQnIvWwzvfw4zHNLCs4o4lH43Xro\n"+
      "xg8jEOi6KU+M2eWbHvj4vg4//ACf6K6IJOXCqCxcwY218W5inmFCLaPEAr1yL1q+\n"+
      "7rEfsf/Pm8H3wL5vq2fco1usKKBmw/Mw0Of+mi6kQwny8xrA0NpYrPUWCLw5PpyU\n"+
      "K3Mw0toznjib+FQlKRFjTQ25oBKaFhxC72tnbfbQcQKBgQDuRAk7z6bVH6paZwX7\n"+
      "OYViLDWV/GkqDEoITLB9V9sg3xnzjj3DsUIPcOiRmNO5gf1YDCEJkV00rhaiuzxh\n"+
      "nd6xcTteLavkX/NlE1b4+ddjld/ND2J/W70/Yon3ebz8prTrj2rp/lXohp/eduOX\n"+
      "FaKAPGGQUrwu9yMmjqne/DxUSQKBgQDd1HZH6abpfpLo1PA0ULMncIXSyiux9BUS\n"+
      "lPJYekpY4OP13m3EbADhpTNK+gNzfly6cbD4aFzy/iQQtsvoadRuU68H7pbD3rKd\n"+
      "LdHU8aiIuWEw1m0nPP9Q8zhpadosK2SvasRX1sKZSYXAJb2zMwIZddfuYPVeTVOH\n"+
      "+ELWTKPCsQKBgHx7j1dwZflzUc1phfZ7VvSzpEt4VHljckpjxtG11QaXiTd2WU6k\n"+
      "jZ8Dnn5zGisRfwtBSwF0sP2U9r6OlD1r/a03O404z1XBy6hDMm1iGuYsp4C7SPrB\n"+
      "M16qXOqu784QSvXHOFSITNnvfBb+hmmpI/1bjp2YnDjtZa//WUDnB54BAoGAFPt+\n"+
      "wKiaMCXX0YwquFgVyho7nkefQHLc92f9UF8o3yVOirgiW9z3bGCK7IGfh/Ig5UXR\n"+
      "vn1opVdio+4WdYJlJJZnzPFFc3uCG5n06hZ9oYkfZ1Yw9vAvGkIXSOlJSLpGCM2p\n"+
      "isF2oLcyno0zV1rwzOW3qgWjz+qyhv71m32eU9ECgYBVJVAb1P6UfCzl/Qr+b4rZ\n"+
      "By4c/VanBO31Z4qafWdCOcAG/2BuxsRsI2eSPqxv1vu7ILFD60j+TATwaO4Fuoe+\n"+
      "BPLBRvQSa54537xhim7ngyflpRlviZqRczBD88dwMeXdgtrUqds1YwRC46Y3DvEO\n"+
      "PUTEckNKQfW1q9I+qyeC2Q==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-uoyvz@wombat-1e0bc.iam.gservicea"+
      "ccount.com",
    "client_id": "116995497430117696253",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata",
  }),
});


const db = admin.firestore();
const docRef = db.collection("weather").doc("montana");
docRef.set({
  name: "Montana",
  temp: 50,
  sky: "Sunny",
  wind: "30 mph",
  hi: 50,
  lo: "-450",
});
const doc = db.collection("weather").doc("texas");
doc.set({
  name: "Texas",
  temp: 50,
  sky: "Sunny",
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.flachBriefing = onRequest(
    {timeoutSeconds: 15, cor: true, maxInstances: 10},
    (request, response) => {
      logger.info("Flash Briefing Requested!", {StructuredData: true});
      response.set("Content-type", "application/json").json(
          [

            {
              "uid": randomUUID(),
              "updateDate": new Date().toISOString(),
              "titleText": "What kind of test will I do today?",
              "mainText": "The quick brown fox jumped.",
              "streamUrl": null,
              "redirectionUrl": "https://example.com",
            },
          ],
      );
    },
);
