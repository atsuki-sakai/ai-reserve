import { Firestore } from "firebase-admin/firestore";
import { IUser } from "../types/User";

export class UserRepository {
  private readonly db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async get(userId: string): Promise<IUser | null> {
    try {
      console.log("[Repository] Getting user:", userId);
      
      const userDocRef = this.db.collection("users").doc(userId);
      console.log("[Repository] Document reference:", userDocRef.path);

      const userDoc = await userDocRef.get();
      console.log("[Repository] Document exists:", userDoc.exists);
      
      if (!userDoc.exists) {
        console.log("[Repository] User not found");
        return null;
      }

      const userData = userDoc.data();
      console.log("[Repository] Raw Firestore data:", userData);

      if (!userData) {
        console.log("[Repository] User data is null");
        return null;
      }

      const user: IUser = {
        lineId: userId,
        displayName: userData.displayName || "",
        pictureUrl: userData.pictureUrl || "",
        phoneNumber: userData.phoneNumber || ""
      };

      console.log("[Repository] Returning user:", user);
      return user;

    } catch (error) {
      console.error("[Repository] Get user error:", error);
      // エラーの詳細をログ出力
      if (error instanceof Error) {
        console.error("[Repository] Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }

  async set(user: IUser): Promise<void> {
    try {
      await this.db
        .collection("users")
        .doc(user.lineId)
        .set(user);
    } catch (error) {
      console.error("[Repository] Create user error:", error);
      throw error;
    }
  }

  async update(userId: string, data: Partial<IUser>): Promise<void> {
    try {
      await this.db
        .collection("users")
        .doc(userId)
        .update(data);
    } catch (error) {
      console.error("[Repository] Update user error:", error);
      throw error;
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const docSnap = await this.db.collection("users").get();
      return docSnap.docs.map((doc) => doc.data() as IUser);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    console.error("Firestore error:", error);
    return new Error(
      error instanceof Error ? error.message : "Firestore operation failed"
    );
  }
}
