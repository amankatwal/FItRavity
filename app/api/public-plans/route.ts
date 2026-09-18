import { NextResponse } from "next/server";
import {
  fetchInterestAction,
  fetchInterestRecomendationAction,
  fetchRecomendationAction,
  submitIntrestAction,
} from "@/app/(public)/plans/action";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let result;

    switch (body.action) {
      case "interest-recommendations": result = await fetchInterestRecomendationAction(body.keyword); break;
      case "interests": result = await fetchInterestAction(); break;
      case "save-interests": result = await submitIntrestAction(body.interests); break;
      case "recommendations": result = await fetchRecomendationAction(body.userId); break;
      default: return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result ?? { success: false, message: "Invalid request" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 500 });
  }
}
