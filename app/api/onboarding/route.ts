import { NextResponse } from "next/server";
import {
  checkAvailability,
  onboardingStatus,
  submitApplication,
  verifyCode,
} from "@/app/onboarding/onbording-form/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let result;

    switch (body.action) {
      case "status":
        result = await onboardingStatus(body.userId);
        break;
      case "submit":
        result = await submitApplication(body.data, body.userId);
        break;
      case "availability":
        result = await checkAvailability(body.brand);
        break;
      case "verify-code":
        result = await verifyCode(body.code);
        break;
      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result ?? { success: false, message: "Invalid request" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 500 });
  }
}
