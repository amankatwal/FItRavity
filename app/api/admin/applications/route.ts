import { NextResponse } from "next/server";
import { fetchAllApplications, selfAssign } from "@/app/dashboard/onboarding/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let result;

    switch (body.action) {
      case "list": result = await fetchAllApplications(body.userId, body.email); break;
      case "assign": result = await selfAssign(body.appId); break;
      default: return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result ?? { success: false, message: "Invalid request" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 500 });
  }
}
