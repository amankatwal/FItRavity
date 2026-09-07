import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { addPlanType } from "./formSchema";

export async function generatePlanEmbedding(content: string) {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: content,
  });

  return embedding;
}

export async function createPlanChunks(planRes:any, planStatus:boolean, planId:string){
  const content = `
  Plan Id : ${planId}
  Plan Name: ${planRes.name},
  Plan Description: ${planRes.description},
  Plan Actual Price: ${planRes.actualPrice},
  Plan Offer Price: ${planRes.offerPrice},
  Plan Currency: ${planRes.currency},
  Plan Duration: ${planRes.duration},
  Plan Blogspot Access: ${planRes.blogspotAccess},
  Plan Training Schedule: ${planRes.trainingSchedule},
  Plan Chat Access: ${planRes.chatAccess},
    Plan Diet Instructions: ${planRes.dietInstructions},
    Plan Training Videos: ${planRes.trainingVideos},
    Plan Private Session: ${planRes.privateSession},
    Plan Short Info: ${planRes.shortInfo},
    Plan Achievements: ${planRes.achievements},
    Plan Duration 1: ${planRes.duration1},
    Plan Duration 1 Info: ${planRes.duration1Info},
    Plan Duration 2: ${planRes.duration2},
    Plan Duration 2 Info: ${planRes.duration2Info},
    Plan Duration 3: ${planRes.duration3},
    Plan Duration 3 Info: ${planRes.duration3Info},
    Plan Equipment: ${planRes.equipment},
    Plan Focus Area: ${planRes.focusArea},
    Plan Goal: ${planRes.goal},
    Plan Level: ${planRes.level},
    Plan Program Structure: ${planRes.programStructure},
    Plan Program Type: ${planRes.programType},
    Plan Recomended For: ${planRes.recomendedFor},
    Plan Rest Days: ${planRes.restDays},
    Plan Is Active: ${planStatus},`.trim()
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize:1200,
    chunkOverlap:120
  })
  return await textSplitter.splitText(content)
}
