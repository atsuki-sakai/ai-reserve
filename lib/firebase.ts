import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// サービスアカウントの認証情報をインポート
import serviceAccount from "../ai-reserve-service-account.json";

// 既存のアプリがあればそれを使用し、なければ新規作成
const app = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount as any),
    })
  : getApp();

export const db = getFirestore(app); 