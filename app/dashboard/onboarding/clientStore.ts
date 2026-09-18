import {create} from "zustand";
import { toast } from "sonner";
import axios from "axios";

type Application={
    id: string;
  userId: string;

  fullName: string;
  gender: string | null;
  dob: Date | null;

  specialization: string;
  experience: string | null;
  certifications: string[];

  bio: string;
  panNumber: string;

  brand: string;
  designation: string;

  social: string | null;
  profileImage: string;

  city: string;
  country: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  adminId: string | null;
  adminComment: string | null;

  createdAt: Date;
  updatedAt: Date;
}

type ApplicationController ={
  data: Application[] | null,
  fetchApplication: (userId:string, email? : string)=> void,
  acceptAssignment:(appId:string) =>void,
  acceptLoader : boolean
}

export const useAdminApplicationStore = create<ApplicationController>((set, get)=>({
       data: null,
       acceptLoader: false,
    fetchApplication : async(userId, email) =>{
        const { data: res } = await axios.post<any>("/api/admin/applications", { action: "list", userId, email })
        if(res){
             set({data: res.data})
             
        }else(
            set({data: null})
        )
        
    },
    acceptAssignment : async(appId) =>{
      set({acceptLoader:true})
      try {
        const { data: res } = await axios.post<any>("/api/admin/applications", { action: "assign", appId })
        if(res.success){
          toast.success(res.message)
        }else{
          toast.error(res.message)
        }
      } catch (err) {
        toast.error("Something went wrong")
      }finally{
           set({acceptLoader: false})
      }
         
    }
}))