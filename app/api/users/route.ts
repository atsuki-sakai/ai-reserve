import { NextResponse } from "next/server";
import { firestore } from "@/services/firestore/FirestoreService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, displayName, pictureUrl, phoneNumber } = body;

    if (!userId || !displayName || !phoneNumber) {
      return NextResponse.json({
        success: false,
        data: null,
        error: "Missing required fields"
      }, { status: 400 });
    }

    try {
      const userData = await firestore.user.create({
        lineId: userId,
        displayName,
        pictureUrl,
        phoneNumber,
      });

      return NextResponse.json({
        success: true,
        data: userData,
        error: null
      });

    } catch (dbError) {
      console.error("[API] Database error:", dbError);
      return NextResponse.json({
        success: false,
        data: null,
        error: "Database operation failed"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("[API] Error:", error);
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Internal Server Error"
    }, { status: 500 });
  }
}