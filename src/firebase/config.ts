import admin from "firebase-admin";

const serviceAccount = require("../express-typescript-crud-service-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
