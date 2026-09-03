import {create} from "zustand";
import {toast} from "sonner";
import { adminName, approveApplicantAction, dryRunAction, fetchApplicationByID, rejectApplicationAction, replaceComment } from "./actions";

export type Application={
    id: string;
  userId: string;

  fullName: string;
  gender: string | null;
  dob: Date | null;

  specialization: string;
  experience: string | null;
  certifications: string[];
  dryRunMessage: string |null;
  bio: string;
  panNumber: string;
  notes : string | null
  brand: string;
  designation: string;
  social: string | null;
  profileImage: string;
  dryRun : Boolean
  city: string;
  country: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  adminId: string | null;
  adminComment: string | null;

  createdAt: Date;
  updatedAt: Date;
}

type ApplicationController ={
  data: Application | null,
  adminName: string,
  getApplicationById : (appId:string)=> void,
  applicationLoader: boolean,
  dryRun : (panId:string)=> void,
  dryRunLoader: boolean,
  setAdminComment : (data: string) => void,
  adminCommentLoader : boolean,
  createPartner: (notes:string) => void,
  rejectApplication : (notes:string) =>void
}

export const useApplicationReviewStore = create<ApplicationController>((set, get) =>({
  dryRunLoader: false,
  adminName: "",
    data: null,
    applicationLoader: false,
    adminCommentLoader: false,
getApplicationById : async(appId) =>{
    set({applicationLoader: true})
    try {
        const res = await fetchApplicationByID(appId);
       
        if(res?.success === false){
        return    toast.error(res.message)
        }
              
          set({data: res?.data})
          const {data} = get();
          if(data?.adminId){
          const  nameRes = await adminName(data?.adminId);
          set({adminName: nameRes.data?.name})
          }else{
            set({adminName: "N/A"})
          }
          
    } catch (err) {
        toast.error("Invalid Request")
    }finally{
        set({applicationLoader: false})
    }
},
 dryRun : async(panId)=>{
  set({dryRunLoader: true})
     if(!panId){
     return toast.error("Invalid Request")
     }
    try {
      const res = await dryRunAction(panId);
      if(res.success === false && res.data){
        set((state)=>({
          data: state.data ? {
            ...state.data,
            panNumber: res.data?.panNumber,
            dryRun: true,
            dryRunMessage: res.data?.dryRunMessage
          }
          : null
        }))
      }else if(res.success === true && res.data){
          set((state)=>({
          data: state.data ? {
            ...state.data,
            panNumber: res.data?.panNumber,
            dryRun: true,
            dryRunMessage: res.data?.dryRunMessage
          }
          : null
        }))
      }

    } catch (error) {
      
    }
    finally{
      set({dryRunLoader: false})
    }
 },
  setAdminComment : async(data) =>{
    const appId = get().data?.id
    set({adminCommentLoader: true})
    if(!appId || !data){
      toast.error("Invalid Request")
    }else
    try {
      const res = await replaceComment(appId, data)
      if(res.success){
        
        if(res.data)
        set((state)=>({
          data : state.data ? {
            ...state.data,
             adminComment : res.data?.adminComment,
          } : null
        }))
     
     return toast.success("Admin comment replaced Successfully")
      }
    } catch (err) {
      toast.error("Invalid Request")
    }finally{
       set({adminCommentLoader: true})
    }
  },

  createPartner : async(notes)=>{
    const {data} = get()
    try {
      const res = await approveApplicantAction(data, notes)
      if(res?.success === true){
        set((state)=> ({
          data: state.data ? {
            ...state.data,
             notes: notes,
              status: "APPROVED"
          }:null
        }))
    return  toast.success(res?.message)}
    
      else{
        toast.error(res?.message)
      }
    } catch (err) {
     console.log(err)
    }
  },
  rejectApplication : async(notes)=>{
 const {data} = get()
    try {
      const res = await rejectApplicationAction(data, notes)
      if(res?.success === true){
        set((state)=> ({
          data: state.data ? {
            ...state.data,
             notes: notes,
              status: "REJECTED"
          }:null
        }))
    return  toast.success(res?.message)}
    
      else{
        toast.error(res?.message)
      }
    } catch (err) {
     console.log(err)
    }
  }

}))