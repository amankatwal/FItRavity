import {create} from "zustand"
import {toast} from "sonner"
import { fetchInterestAction, fetchInterestRecomendationAction, fetchRecomendationAction, submitIntrestAction } from "./action"

type RecommendedPlan = {
  id: string;
  name: string;
  offerPrice: number;
  currency: string;

  organization: {
    id: string;
    name: string;
    logo: string | null;

    members: {
      profileImage: string | null;
    }[];
  };
}


type PlanRenderStore = {
    recomendations : string[],
    interests: string[],
    recomendedPlans: RecommendedPlan[],
    setIntrest: (interest:string)=>void,
    removeInterest: (value:string)=>void,
    fetchInterestRecomendation: (keyword:string) => void,
    submitIntrest: (interests:string[])=>void,
    fetchPlanRecomendation: (userId: string)=>void,
    fetchInterest: ()=>void,
    recomendationLoader:Boolean,
    fetchInterestLoader: Boolean,
    submitIntersetLoader:Boolean,
    recomendedPlanLoader: Boolean,
}

export const usePlansRenderStore = create<PlanRenderStore>((set, get)=>({
recomendations : [],
interests: [],
recomendationLoader:false,
fetchInterestLoader:false,
submitIntersetLoader: false,
recomendedPlanLoader: false,
recomendedPlans: [],
fetchInterestRecomendation: async(keyword)=>{
  set({ recomendationLoader: true });
    if (!keyword.trim()) {
    set({
      recomendations: [],
      recomendationLoader: false,
    });

    return;
  }
try {
    const res = await fetchInterestRecomendationAction(keyword);
  console.log(res)
    const data =
      res?.data
        ?.flatMap((key) => [
          ...key.achievements,
          key.equipment,
          key.focusArea,
          key.goal,
          key.name,
          key.programType,
        ])
        .filter(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(keyword.toLowerCase())
        ) ?? [];

    set({ recomendations: data });
  } catch (err) {
    console.log(err);
    set({ recomendations: [] });
  } finally {
    set({ recomendationLoader: false });
  }
},
submitIntrest: async(interest)=>{
  set({submitIntersetLoader:true})
if(interest.length === 0){
  toast.error("Empty values cannot be submitted")
}
try {
  const res = await submitIntrestAction(interest)
  if(res.success === false){
    toast.error(res.message)
     return
  }
  if(res.success === true){
    toast.success("Interests updated Successfully")
  }
} catch (err) {
  console.log(err)
}finally{
  set({submitIntersetLoader:false})
}
},
fetchInterest : async()=>{
  try {
    set({fetchInterestLoader:true})
    const res = await fetchInterestAction()
    set({interests:res?.data?.interests})
  } catch (err) {
    console.log(err)
  }finally{
    set({fetchInterestLoader:false})
  }
},
setIntrest:(value)=>{
  const interest = get().interests
  if(interest.length <5){
set((state)=>({interests:[...state.interests, value]}))
  }
  else{
    toast.error("You can add maximum 5 interests")
  }
},
removeInterest: (value)=>{
set((state)=>({interests: state.interests.filter((key)=> key !== value)}))
},

fetchPlanRecomendation: async(userId)=>{
set({recomendedPlanLoader: true})
try {
  const res = await fetchRecomendationAction(userId)
  if(res.data){
    set({recomendedPlans: res.data})
  }
} catch (err) {
  
}finally{
  set({recomendedPlanLoader: false})
}
}
}))