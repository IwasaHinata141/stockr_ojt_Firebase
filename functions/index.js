// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");

const onCreatedScore = require("./onCreatedScore");
initializeApp();

exports.onCreatedScore = onCreatedScore;
