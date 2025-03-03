const admin = require("firebase-admin");
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");

exports.onCreatedScore = onDocumentCreated("users/{uid}/stocks/{stockId}", async (event) => {
  console.log("New document added:", event.params.stockId);
  var uid = event.params.uid;
  const userRef = admin.firestore().doc(`users/${uid}`);

  try {
    const doc = await userRef.get();
    if (!doc.exists || doc.data() === undefined) {
      // ドキュメントがない場合、新規作成
      await userRef.set({
        score: 5, // 初期スコアの設定
      });
      console.log(`Created new user document for ${uid} with initial score.`);
    } else {
      const data = doc.data();
      if (data.hasOwnProperty("score")) {
        // `score` フィールドが存在する場合は更新
        data.score += 5; //５ポイント追加
        await userRef.update({ score: data.score });
        console.log(`Updated existing user document for ${uid} with new score.`);
      } else {
        // `score` がない場合、新規作成
        await userRef.set({score: 5});
        console.log(`Created new user document for ${uid} with initial score.`);
      }
    }
  } catch (error) {
    console.error("Error updating user document:", error);
  }
});

