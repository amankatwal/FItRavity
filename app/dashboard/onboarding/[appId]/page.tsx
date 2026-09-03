import React from "react"
import { useApplicationReviewStore } from "./clientStore";
import ApplicationFormat from "./__components/ApplicationFormat";

export default async function Page({
  params,
}: {
  params: Promise<{ appId: string }>
}) {
  const { appId } = await params;
 
  return (
    <div>
      <ApplicationFormat appId={appId}/>
    </div>
  )
}