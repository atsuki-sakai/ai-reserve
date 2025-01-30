import { NextResponse } from "next/server";
import { firestore } from "@/services/firestore/FirestoreService";

export async function POST(request: Request) {
  try {
    const { userId, displayName, pictureUrl, phoneNumber } = await request.json();
    
    if (!userId || !displayName || !phoneNumber) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
        data: null
      }, { status: 400 });
    }

    const user = await firestore.user.set({lineId: userId, displayName, pictureUrl, phoneNumber});
    return NextResponse.json({
      success: true,
      data: user,
      error: null
    });

  } catch (error) {
    console.error("[API] Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
      data: null
    }, { status: 500 });
  }
}