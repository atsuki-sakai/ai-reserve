import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { UserRepository } from "./repository/UserRepository";


import serviceAccount from "../../ai-reserve.json";


class FirestoreService {
  private static instance: FirestoreService | null = null;
  private readonly db;
  public readonly user: UserRepository;

  private constructor() {
    try {
      const apps = getApps();
      const app = apps.length ? apps[0] : initializeApp({
        credential: cert(serviceAccount as any),
        projectId: serviceAccount.project_id,
      });
      this.db = getFirestore(app);
      this.user = new UserRepository(this.db);

    } catch (error) {
      console.error("[FirestoreService] Initialization error:", {
        error,
        type: error?.constructor?.name,
        message: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  }

  public static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      console.log("[FirestoreService] Creating new instance");
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }
}
export const firestore = FirestoreService.getInstance();