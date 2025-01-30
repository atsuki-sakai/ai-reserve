import { NextResponse } from "next/server";
import { firestore } from "@/services/firestore/FirestoreService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  
  try {
    
    const { userId } = await params;
    
    if (!userId) {
      const errorResponse = {
        success: false,
        error: "Missing required fields",
        data: null
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const user = await firestore.user.get(userId);
    
    if (!user) {
      const notFoundResponse = {
        success: false,
        error: "User not found",
        data: null
      };
      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    const successResponse = {
      success: true,
      data: user,
      error: null
    };

    const response = NextResponse.json(successResponse);
    return response;

  } catch (error) {
    const serverErrorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
      data: null
    };
    return NextResponse.json(serverErrorResponse, { status: 500 });
  }
} 