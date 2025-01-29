import { NextResponse } from "next/server";
import { firestore } from "@/services/firestore/FirestoreService";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params?.userId;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const userData = await firestore.user.get(userId);

    if (!userData) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userData
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Internal Server Error"
    }, { status: 500 });
  }
} 

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // バリデーション
    if (!params?.userId) {
      return NextResponse.json({
        success: false,
        data: null,
        error: "User ID is required"
      }, { status: 400 });
    }

    const body = await request.json();
    const { displayName, pictureUrl, phoneNumber } = body;

    try {
      const result = await firestore.user.update(params.userId, {
        displayName,
        pictureUrl,
        phoneNumber,
        updatedAt: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        data: result.user,
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