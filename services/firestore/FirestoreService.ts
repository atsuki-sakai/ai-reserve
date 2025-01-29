import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { UserRepository } from "./repository/UserRepository";

import serviceAccount from "../../ai-reserve-service-account.json";

class FirestoreService {
  private static instance: FirestoreService;
  private readonly db;
  public readonly user: UserRepository;

  private constructor() {
    // Firebase Adminの初期化
    const app = !getApps().length 
      ? initializeApp({
          credential: cert(serviceAccount as any),
          projectId: serviceAccount.project_id,
        })
      : getApps()[0];

    this.db = getFirestore(app);
    this.user = new UserRepository(this.db);
  }
  

  public static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }
}

// シングルトン
export const firestore = FirestoreService.getInstance();