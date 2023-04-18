"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_typescript_crud_service_private_key_json_1 = __importDefault(require("../express-typescript-crud-service-private-key.json"));
const service_account = express_typescript_crud_service_private_key_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(service_account),
});
const db = firebase_admin_1.default.firestore();
exports.default = db;
