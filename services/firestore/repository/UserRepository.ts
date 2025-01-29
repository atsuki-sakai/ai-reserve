import { Firestore } from "firebase-admin/firestore";
import { IUser } from "../types/User";

export class UserRepository {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async create(user: Omit<IUser, 'createdAt' | 'updatedAt'>): Promise<IUser> {
    try {
      console.log("[Repository] Start create with:", JSON.stringify(user, null, 2));
      
      if (!user.lineId || !user.displayName || !user.phoneNumber) {
        throw new Error("Required fields(lineId, displayName, phoneNumber) are missing in repository");
      }

      const now = new Date().toISOString();
      const userData: IUser = {
        ...user,
        createdAt: now,
        updatedAt: now,
      };
      await this.db.collection("users").doc(user.lineId).set(userData);
      return userData;
    } catch (error) {
      console.error("[Repository] Create error:", {
        error,
        type: error?.constructor?.name,
        message: error instanceof Error ? error.message : "Unknown error"
      });
      throw this.handleError(error);
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

  async get(userId: string): Promise<IUser | null> {
    try {
      const docSnap = await this.db.collection("users").doc(userId).get();
      if (!docSnap.exists) {
        return null;
      }
      return docSnap.data() as IUser;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(userId: string, user: Partial<IUser>): Promise<{ success: boolean, user: IUser | null }> {
    try {
      console.log("[Repository] Updating user:", { userId, updates: user });

      // 1. まず現在のユーザーデータを取得
      const docRef = this.db.collection("users").doc(userId);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.log("[Repository] User not found:", userId);
        return { success: false, user: null };
      }

      // 2. 更新データの準備
      const currentData = docSnap.data() as IUser;
      const updatedData = {
        ...currentData,
        ...user,
        updatedAt: new Date().toISOString()
      };

      // 3. データ更新
      await docRef.update(updatedData);
      console.log("[Repository] User updated successfully");

      return { 
        success: true, 
        user: updatedData 
      };

    } catch (error) {
      console.error("[Repository] Update error:", {
        error,
        type: error?.constructor?.name,
        message: error instanceof Error ? error.message : "Unknown error"
      });
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
