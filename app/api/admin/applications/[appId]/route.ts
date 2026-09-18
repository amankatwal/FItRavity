import { NextResponse } from "next/server";
import {
  adminName,
  approveApplicantAction,
  dryRunAction,
  fetchApplicationByID,
  rejectApplicationAction,
  replaceComment,
} from "@/app/dashboard/onboarding/[appId]/actions";

export async function POST(request: Request, { params }: { params: Promise<{ appId: string }> }) {
  try {
    const body = await request.json();
    const { appId } = await params;
    let result;

    switch (body.action) {
      case "get": result = await fetchApplicationByID(appId); break;
      case "admin-name": result = await adminName(body.adminId); break;
      case "dry-run": result = await dryRunAction(body.panId); break;
      case "comment": result = await replaceComment(appId, body.comment); break;
      case "approve": result = await approveApplicantAction(body.data, body.note); break;
      case "reject": result = await rejectApplicationAction(body.data, body.note); break;
      default: return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result ?? { success: false, message: "Invalid request" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 500 });
  }
}
