"use client"
import { toast } from "sonner";
import axios from "axios";
import { create } from "zustand";
import { trainerSchemaType } from "@/lib/formSchema";
import { persist, createJSONStorage } from 'zustand/middleware'

type OnboardingStatusResponse = {
  success: boolean | null;
  checkLoader: boolean;
  status: string;
  applicationId: string;
  pending : boolean;
  message? : string;
  applicationStatus : string,
  submitLoader: boolean,
  getUserApplication : (userId: string) => void,
  submitApplication : (data: trainerSchemaType, userId: string) => void
  checkBrand : (brand: string) => Promise<{success: boolean, message: string} | undefined>,
  checkRef: (code:string)=> Promise<{success: boolean, message: string} | undefined>,
   draft: Partial<trainerSchemaType>,
    setDraft: (draft: Partial<trainerSchemaType>) => void;
     clearDraft: () => void;
     removeCertificate : (key: string) => void,
      removeProfile : () => void
};
export const useApplicationStore = create<OnboardingStatusResponse>()(persist((set) =>({
    success: null,
    checkLoader: false,
  status: "",
  applicationId : "",
  pending : false,
  message: "",
  applicationStatus: "",
  submitLoader: false,
  draft: {},
   setDraft: (draft) => set({ draft }),
   clearDraft: () => set({ draft: {} }),
    getUserApplication : async(userId)=>{
        set({pending: true})
        try {
          const { data: res } = await axios.post<any>("/api/onboarding", { action: "status", userId });
          if(res?.success === true) {
            set({success: true, applicationId: res.applicationId, applicationStatus: res.status})
          }else{
            toast.error(res?.message)
          }
        } catch (err) {
             toast.error("Invalid Request")
        }finally{
            set({pending: false})
        }
    },
    submitApplication: async(data,userId)=>{
      set({submitLoader: true})
      try {
        const { data: res } = await axios.post<any>("/api/onboarding", { action: "submit", data, userId })
        if(res?.success === false){
          toast.error("Something went wrong")
        }
        if(res?.success === true){
          set({applicationId: res.application?.id.slice(-8)})
           set({
                draft: {},
              });
          toast.success(res.message)
        }
      } catch (err) {
        toast.error("Something went wrong")
        console.log(err)
      }finally{
        set({submitLoader: false})
      }
    },
    checkBrand : async(brand) =>{
      if (!brand.length){
        return {success: false, message: "This feild cannot be empty"}
      }
      set({checkLoader: true, success:null, message: ""})
      try {
        const { data: res } = await axios.post<any>("/api/onboarding", { action: "availability", brand })
      if(res?.success === true){
        set({success: true, message: ""})
        console.log(res)
      }else{
         set({success:false, message: res?.message})
      }
      return res
      } catch (err) {
       console.log(err) ;
       set({
      success: false,
      message: "Unable to check brand availability",
    });

    return {
      success: false,
      message: "Unable to check brand availability",
    };
      }finally{
        set({checkLoader: false})
      }
      
    },
    checkRef : async(code)=>{
      set({checkLoader: true})
      try {
       
         const { data: res } = await axios.post<any>("/api/onboarding", { action: "verify-code", code })
        if(res?.success === false){
           set({success:false, message: res?.message})
        }else{
          set({success: true, message: ""})
        }
         return res
      } catch (error) {
        return {success: false, message: "Something went wrong"}
      }finally{
        set({checkLoader: false})
      }
          
    },
    removeProfile: () =>{
             set((state) => ({
    draft: {
      ...state.draft,
      picture: undefined
    },
  }))
    },
    removeCertificate: (key: string) =>
  set((state) => ({
    draft: {
      ...state.draft,
      certificates: state.draft.certificates?.filter(
        (certificate) => certificate !== key
      ),
    },
  })),
}),
  {

       
        name: "fitravity-application",


       
        storage: createJSONStorage(
          () => localStorage
        ),


     
        partialize: (state) => ({

          draft: state.draft,

        }),

      }
))