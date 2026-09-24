import {create} from "zustand"
import {toast} from "sonner"
import { fetchAllPlansActions, fetchInterestAction, fetchInterestRecomendationAction, fetchRecomendationAction, submitIntrestAction } from "./action"

export type RecommendedPlan = {
  id: string;
  name: string;
  offerPrice: number;
  currency: string;
  level: string;
  duration: number;
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
    allPlans:RecommendedPlan[],
    cursor: string | null,
    cursorAll : string | null,
    setIntrest: (interest:string)=>void,
    removeInterest: (value:string)=>void,
    fetchInterestRecomendation: (keyword:string) => void,
    submitIntrest: (interests:string[])=>void,
    fetchPlanRecomendation: (userId: string)=>void,
    fetchMoreRecomendedPlan:(userId:string)=>void,
    fetchAllPlans: ()=> void,
    fetchInterest: ()=>void,
    recomendationLoader:Boolean,
    fetchInterestLoader: Boolean,
    submitIntersetLoader:Boolean,
    recomendedPlanLoader: Boolean,
    haveMoreAll : boolean,
    haveMore: Boolean,
    fetchMoreRecomendedPlanLoader: boolean
    allPlanLoader: boolean
}

export const usePlansRenderStore = create<PlanRenderStore>((set, get)=>({
recomendations : [],
interests: [],
recomendationLoader:false,
fetchInterestLoader:false,
submitIntersetLoader: false,
recomendedPlanLoader: false,
recomendedPlans: [],
allPlans: [],
cursor : null,
cursorAll: null,
haveMore: false,
haveMoreAll: false,
allPlanLoader: false,
fetchMoreRecomendedPlanLoader: false,
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
    const data = [
  ...new Set(
    res?.data
      ?.flatMap((plan) => [
        ...(plan.achievements ?? []),
        plan.equipment,
        plan.focusArea,
        plan.goal,
        plan.name,
        plan.programType,
      ])
      .filter(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(keyword.toLowerCase())
      ) ?? []
  ),
];

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
  const res = await fetchRecomendationAction(userId, null)
  if(res.data && res.data.length > 0){
    console.log(res.data)
    set({recomendedPlans: res.data, haveMore: res.hasMore ?? false, cursor:res.nextCusror ?? null})
  }
} catch (err) {
  
}finally{
  set({recomendedPlanLoader: false})
}
},
fetchMoreRecomendedPlan : async(userId)=>{
  const {haveMore, cursor,fetchMoreRecomendedPlanLoader } = get()
  if(!haveMore){
    return
  }
   if (!cursor) {
    return
  }
   if (fetchMoreRecomendedPlanLoader) {
    return
  }
  set({fetchMoreRecomendedPlanLoader: true})
  try {
    const res = await fetchRecomendationAction(userId, cursor ?? null)
    if(res.success && res.data){
      set((state) => ({recomendedPlans: [...state.recomendedPlans, ...res.data], haveMore:res.hasMore ?? false, cursor:res.nextCusror}))
    }
  } catch (err) {
    
  }finally{
    set({fetchMoreRecomendedPlanLoader: false})
  }
},
fetchAllPlans : async()=>{
  set({allPlanLoader: true})
try {
  const res = await fetchAllPlansActions(null)
  if(res.data && res.data.length > 0){
    console.log(res.data)
    set({allPlans: res.data, haveMoreAll: res.hasMore ?? false, cursorAll:res.nextCusror ?? null})
  }
} catch (err) {
  
}finally{
  set({allPlanLoader: false})
}
}

}))