import admin from "firebase-admin";

import serviceAccount from "../express-typescript-crud-service-private-key.json";

const service_account: any = serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

const db = admin.firestore();

export default db;
