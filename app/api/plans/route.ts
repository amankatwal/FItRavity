import { NextResponse } from "next/server";
import {
  createPlanVectorAction,
  deactivatePlanAction,
  deleteFileAction,
  deletePlanFileAction,
  fetchPlansByOrgIdAction,
  getPlanByIdAction,
  submitPlanAction,
  updatePlanDurationBreakdownAction,
  updatePlanFeaturesAction,
  updatePlanInfoAction,
  updatePlanNameAction,
  updatePlanOverviewAction,
  uploadFileAction,
  uploadPlanFileAction,
} from "@/app/dashboard/plans/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let result;

    switch (body.action) {
      case "fetch-by-owner": result = await fetchPlansByOrgIdAction(body.userId); break;
      case "upload-logo": result = await uploadFileAction(body.key, body.userId); break;
      case "upload-plan-file": result = await uploadPlanFileAction(body.key, body.planId); break;
      case "delete-logo": result = await deleteFileAction(body.key); break;
      case "delete-plan-file": result = await deletePlanFileAction(body.key); break;
      case "create": result = await submitPlanAction(body.data, body.userId); break;
      case "get": result = await getPlanByIdAction(body.planId); break;
      case "update-name": result = await updatePlanNameAction(body.userId, body.planId, body.data); break;
      case "update-info": result = await updatePlanInfoAction(body.userId, body.planId, body.data); break;
      case "update-features": result = await updatePlanFeaturesAction(body.userId, body.planId, body.feature, body.value); break;
      case "update-overview": result = await updatePlanOverviewAction(body.userId, body.planId, body.data); break;
      case "update-duration": result = await updatePlanDurationBreakdownAction(body.userId, body.planId, body.data); break;
      case "deactivate": result = await deactivatePlanAction(body.userId, body.planId); break;
      case "publish": result = await createPlanVectorAction(body.userId, body.planId); break;
      default: return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result ?? { success: false, message: "Invalid request" });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 500 });
  }
}
