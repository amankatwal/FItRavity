import axios from "axios";
import { create } from "zustand";
import { toast } from "sonner";
import {
  createPlanVectorAction,
  deactivatePlanAction,
  deleteFileAction,
  fetchPlansByOrgIdAction,
  getPlanByIdAction,
  submitPlanAction,
  updatePlanDurationBreakdownAction,
  updatePlanFeaturesAction,
  updatePlanInfoAction,
  updatePlanNameAction,
  updatePlanOverviewAction,
  uploadFileAction,
} from "./actions";
import { addPlanType } from "@/lib/formSchema";
import { MemberRole } from "@/lib/generated/prisma/enums";
import { editPlanDurationBreakdownSchemaType, editPlanInfoSchemaType, editPlanNameSchemaType, editPlanOverviewSchemaType } from "./[planId]/__components/editPlanSchema";

export type Plan = {
  id: string;
  name: string;
  duration: number;
  shortInfo:string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  actualPrice: number;
  offerPrice: number;
  currency: string;
  planLogo: string;
  blogspotAccess: boolean;
  trainingSchedule: boolean;
  progressTracking: boolean;
  chatAccess: boolean;
  dietInstructions: boolean;
  trainingVideos: boolean;
  privateSession: boolean;
  achievements: string[];
  duration1: string;
  duration1Info: string;
  duration2: string;
  duration2Info: string;
  duration3: string;
  duration3Info: string;
  equipment: string;
  focusArea:string;
  goal:string;
  level:string;
  programStructure:string;
  programType:string;
  recomendedFor:string;
  restDays:string;
  isActive: boolean;
};
export type member = {
  id: string;
  role: MemberRole;
  organizationId: string;
  userId: string;
  specialization: string;
  experience: string | null;
  certifications: string[];
  bio: string;
  profileImage: string;
};

export type Organization = {
  id: string;
  name: string;
  metadata: string | null;
  createdAt: Date;
  slug: string;
  logo: string | null;
  curatorName?: string
  ownerId: string;
  plans: Plan[];
  members: member[];
};

export type ThumbnailFile = {
  file: File | null;
  uploading: boolean;
  key?: string;
  isDeleting: boolean;
  objectURL?: string;
};

type ProgramForm = {
  data: Organization | null;
  plan : Plan | null
  thumbnail: ThumbnailFile;
  
  fetchPlanById : (planId: string) => void

  fetchPlansByOrgId: (userId: string) => Promise<void>;

  setThumbnail: (thumbnail: ThumbnailFile) => void;
updatePlanNameByID: (userId:string, planId:string, data: editPlanNameSchemaType) => Promise<void>
updatePlanInfoByID: (userId:string, planId:string, data: editPlanInfoSchemaType) => Promise<void>
 updatePlanFeatures: (userId:string, planId:string, feature:string, value:boolean) => Promise<void>
 updatePlanOverview: (userId:string, planId:string, data: editPlanOverviewSchemaType) => Promise<void>
 updatePlanDurationBreakdown: (userId:string, planId:string, data: editPlanDurationBreakdownSchemaType) => Promise<void>
 deactivatePlan : (userId:string,planId:string) => void
 createVectorPlan: (planId:string,userId:string) => void
  uploadThumbnail: (
    file: File,
    userId: string
  ) => Promise<string | null>;

  deleteThumbnail: (key: string) => Promise<boolean>;

  addThumbnail: (key: string) => void;
  submitPlan : (data: addPlanType, userId:string)=> void
  submitPlanLoader: boolean
  updatePlanLoader: boolean
  planActivationLoader:boolean
};

export const useProgramForm = create<ProgramForm>((set) => ({
  data: null,
  plan: null,
  thumbnail: {
    file: null,
    uploading: false,
    isDeleting: false,
    objectURL: "",
    
  },
submitPlanLoader: false, 
updatePlanLoader: false,
planActivationLoader: false,
  fetchPlansByOrgId: async (userId) => {
    try {
      const res = await fetchPlansByOrgIdAction(userId);
      set({
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },

  setThumbnail: (thumbnail) => {
    set({
      thumbnail,
    });
  },

  uploadThumbnail: async (file, userId) => {
    set((state) => ({
      thumbnail: {
        ...state.thumbnail,
        uploading: true,
      },
    }));

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await axios.post(
        "/api/cloudinary/upload",
        formData
      );

      const key = res.data.public_id;
      await uploadFileAction(key, userId);
      set((state) => ({
        thumbnail: {
          ...state.thumbnail,
          key,
          uploading: false,
        },

        data: state.data
          ? {
              ...state.data,
              logo: key,
            }
          : state.data,
      }));

      return key;

    } catch (error) {
      console.error(error);

      set((state) => ({
        thumbnail: {
          ...state.thumbnail,
          uploading: false,
        },
      }));

      toast.error("Invalid Request");

      return null;
    }
  },

  deleteThumbnail: async (key) => {
    set((state) => ({
      thumbnail: {
        ...state.thumbnail,
        isDeleting: true,
      },
    }));

    try {
      await axios.delete("/api/cloudinary/delete", {
        data: {
          publicId: key,
        },
      });
      const finalRes = await deleteFileAction(key);

      if (!finalRes.success) {
        set((state) => ({
          thumbnail: {
            ...state.thumbnail,
            isDeleting: false,
          },
        }));

        return false;
      }
      set({
        thumbnail: {
          file: null,
          uploading: false,
          isDeleting: false,
          objectURL: "",
          key: undefined,
        },

        data: useProgramForm.getState().data
          ? {
              ...useProgramForm.getState().data!,
              logo: null,
            }
          : null,
      });

      toast.success(finalRes.message);

      return true;

    } catch (error) {
      console.error(error);

      set((state) => ({
        thumbnail: {
          ...state.thumbnail,
          isDeleting: false,
        },
      }));

      toast.error("Invalid Request");

      return false;
    }
  },

  addThumbnail: (key) => {
    set((state) => ({
      data: state.data
        ? {
            ...state.data,
            logo: key,
          }
        : null,
    }));
  },
  submitPlan: async(data, userId ) =>{
    set({submitPlanLoader: true})
   if(!data || ! userId){
    toast.error("Client Invalid Request")
   }
   try {
       const res = await submitPlanAction(data, userId)
       if(res?.success === true){
        toast.success(res.message)
        if(res.data){
       set((state) => ({
        data: state.data
          ? {
              ...state.data,
              plans: [...state.data.plans, res.data],
            }
          : state.data,
      }))}
       }else{
        toast.error(res?.message)
       }
   } catch (err) {
    toast.error("Client Invalid Request")
   }finally{
    set({submitPlanLoader: false})
   }
  },
  fetchPlanById: async(planId)=>{
    if(!planId){
      toast.error("Somthing went wrong")
    }
    try {
      const res = await getPlanByIdAction(planId)
      if(res.data ){
        set({plan:res.data})
      }else{
      toast.error(res.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }
  },
  updatePlanNameByID: async(userId, planId, data)=>{
    set({updatePlanLoader: true})
    if(!userId || !planId || !data){
      toast.error("Invalid Input")
      return
    }
    if(data.offerPrice && data.actualPrice && Number(data.offerPrice) > Number(data.actualPrice)){
      toast.error("Offer price must be equal to or less than actual price")
      set({updatePlanLoader: false})
      return
    }
    try {
      const res = await updatePlanNameAction(userId, planId, data)
      if(res.success){
        toast.success(res.message)
        set((state)=>({plan: res.data
        }))
      }else{
        toast.error(res.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }finally{
      set({updatePlanLoader: false})
    }
  },
  updatePlanInfoByID: async(userId, planId, data)=>{
    set({updatePlanLoader: true})
    if(!userId || !planId || !data){
      toast.error("Invalid Input")
      return
    }
    try {
      const res = await updatePlanInfoAction(userId, planId, data)
      if(res.success){
        toast.success(res.message)
        set((state)=>({plan: res.data
        }))
      }else{
        toast.error(res.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }finally{
      set({updatePlanLoader: false})
    }
  },
  updatePlanFeatures: async(userId, planId,feature, data)=>{
       set({updatePlanLoader: true})
    try {
      const res = await updatePlanFeaturesAction(userId, planId, feature, data)
      if(res.success){
        toast.success(res.message)
        set((state)=>({plan: res.data
        }))
      }else{
        toast.error(res.message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }finally{
      set({updatePlanLoader: false})
    }
  },
  updatePlanOverview: async(userId, planId, data)=>{
    set({updatePlanLoader: true})
    if(!userId || !planId || !data){
      toast.error("Invalid Input")
      return
    }
    try {
      const res = await updatePlanOverviewAction(userId, planId, data)
      if(res.success){
        toast.success(res.message)
        set((state)=>({plan: res.data
        }))
      }else{
        toast.error(res.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }finally{
      set({updatePlanLoader: false})
    }
  },
  updatePlanDurationBreakdown: async(userId, planId, data)=>{
    set({updatePlanLoader: true})
    if(!userId || !planId || !data){
      toast.error("Invalid Input")
      return
    }
    try {
      const res = await updatePlanDurationBreakdownAction(userId, planId, data)
      if(res.success){
        toast.success(res.message)
        set((state)=>({plan: res.data
        }))
      }else{
        toast.error(res.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }finally{
      set({updatePlanLoader: false})
    }
  },
  deactivatePlan : async(userId,planId) =>{
    set({planActivationLoader:true})
  if(!planId || ! userId){
    toast.error("Invalid Request")
  }
  try {
  const res = await deactivatePlanAction(userId, planId)
         if(res?.success === false || res === undefined){
          toast.error(res?.message)
          return
         }
         if(res.data){
     toast.success(res.message)
    set((state)=>({plan: res.data
        }))
  }} catch (err) {
    console.log(err)
  }finally{
    set({planActivationLoader:false})
  }
  },
  createVectorPlan : async(userId, planId)=>{
     set({planActivationLoader:true})
  if(!planId || ! userId){
    toast.error("Invalid Request")
  }
  try {
  const res = await createPlanVectorAction(userId, planId)
         if(res?.success === false || res === undefined){
          toast.error(res?.message)
          return
         }
         if(res.data){
     toast.success(res.message)
    set((state)=>({plan: res.data
        }))
  }} catch (err) {
    console.log(err)
  }finally{
    set({planActivationLoader:false})
  }
  }
}));