import axios from 'axios';
import { toast } from 'sonner';
import {create} from 'zustand';

export type FileType = {
    id : string | null,
    file: File | null,
  uploading : boolean,
  key?: string,
  isDeleting : boolean,
  error: boolean,
  objectURL?: string,
  uploadedURL?: string,
  }

  type FileTypes = {
    file : FileType,
    files : FileType[],
  uploadFile: (file: globalThis.File) => Promise<void>,
  uploadFiles : (file: globalThis.File) => Promise<void>,
  deleteFile: (key: string) => Promise<void>,
  setFile: (file: FileType) => void,
 setFiles: (
    updater: FileType[] | ((files: FileType[]) => FileType[])
  ) => void
  deleteFiles: (key: string) => Promise<void>
  }
  export const useImageStore = create<FileTypes>((set, get)=>({
    file : {
        id : null,
        file: null,
        uploading : false,
        isDeleting : false,
        error: false,
        objectURL: "",
    },
    files : [],

    setFile : (file) => set((state)=>({...state, file})),

    uploadFile : async (file: File) =>{
      set((state)=>({...state, file : {...state.file, uploading : true}}))
       const formData = new FormData();
    formData.append("file", file)
    try {
    const res =  await axios.post<any>("/api/cloudinary/upload", formData)
    set((state)=>({...state, file : {...state.file, key : res.data.public_id, uploading:false}}))
    } catch (err) {
     toast.error("Invalid Request")
    }
    },
    deleteFile : async (key) =>{
      set((state)=>({...state, file : {...state.file, isDeleting : true}})) 
     try {
      const res = await axios.delete<any>("/api/cloudinary/delete",{
     data: {publicId : key}
    })
    set((state)=>({...state, file : {...state.file, id : "", file: null, uploading :false, isDeleting : false, error: false}}))
   
   console.log(res)
    } catch (err) {
      toast.error("Invalid Request")
    }
    },

    uploadFiles : async (file)=>{
      set((state)=>({...state, files : state.files.map((f) => f.file === file ? {...f, uploading : true} : f)}));
       const formData = new FormData();
    formData.append("file", file)
    try {
    const res =  await axios.post<any>("/api/cloudinary/upload", formData)
     set((state)=>({...state, files : state.files.map((f) => f.file === file ? {...f, key : res.data.public_id, uploading:false} : f)}));
    } catch (err) {
     toast.error("Invalid Request")
    }
    },

   setFiles: (updater) =>
  set((state) => ({
    files:
      typeof updater === "function"
        ? updater(state.files)
        : updater,
  })),

  deleteFiles : async (key) =>{
     set((state)=>({...state, files : state.files.map((f) => f.key === key ? {...f, isDeleting : true} : f)}));
      try {
      const res = await axios.delete<any>("/api/cloudinary/delete",{
     data: {publicId : key}
    })
    set((state)=>({...state, files : state.files.filter((f)=> f.key !== key)}));
   console.log(res)   
    } catch (err) {
      toast.error("Invalid Request")  
    }
    },
    
  }))