import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { create } from "zustand";


interface AuthStore {
   googleLoader : boolean,
   signUpLoader : boolean,
   signInLoader : boolean,
   verificationLoader : boolean,
   verificationSuccess : boolean,
   signInWithGoogle : Function,
   signOut : Function,
   route : string,
   signUp : Function,
   signInWithEmail: Function,
   verificationEmail : Function,
   passwordLink : Function,
   passwordReset : Function,
}

export const useAuthStore = create<AuthStore>((set,get) =>({
    verificationSuccess : false,
    googleLoader : false,
    route : "",
    signUpLoader : false,
    email : "",
    signInLoader: false,
    verificationLoader: false,
    signInWithGoogle : async()=>{
        set({googleLoader : true})
        try {
            await authClient.signIn.social({
                provider : "google",
                callbackURL: "/",
                fetchOptions : {
                 onSuccess : ()=>{
                    toast.success('Redirecting to google',{position:"top-center"});
                 },
                 onError : ()=>{
                    toast.error('Invalid Request',{position:"top-center"});
                }
                }
            })
        } catch (err) {
             toast.error('Invalid Request');
        }finally{
            set({googleLoader : false})
        }
    },

    signOut : async() =>{
         try {
           await authClient.signOut({
             fetchOptions:{
                    onSuccess : () =>{
                        toast.success("Signed Out SuccessFully", {position : "top-center"})

                    }
             }
           }) 
         } catch (err) {
            toast.error("Invalid Request");
         }
    },
    signUp : async(email : string, password : string, name : string, confirmPassword : string)=>{
        set({signUpLoader: true})
        try {
            if(password !== confirmPassword){
              toast.error("Password Feild failed to match")
            }else{
const {error} = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL : "/email-verified"
            } )
             if(error){
                toast.error(error.message);
               set({route : "/email-verified"})
        }else{
  toast.success("Signed up Successfully")
            set({route : "/"})
        }}
        } catch (err) {
            console.log(err)
        }finally{
            set({signUpLoader : false})
        }
    },

    signInWithEmail: async(email:string, password: string, rememberMe: boolean)=>{
            set({signInLoader : true})
            try {
          const {error} = await authClient.signIn.email({
                  email,
                  password,
                  rememberMe,
                  callbackURL:  "/verify"
                });
                if(error){
                    set({route: "/login"});
                    toast.error(error.message)
                }
            } catch (err) {
                console.log(err)
            }   finally{
                set({signInLoader : false})
            }    
    },

  verificationEmail : async(email : string)=>{
    set({verificationLoader : true})
    try {
    const result =   await authClient.sendVerificationEmail({
           email, 
           callbackURL : "/email-verified"
       }) 
 set({verificationLoader : false})
 if(result.error){
    toast.error(result.error.message)
 }else{
    console.log(result)
    toast.success("Verification email sent to " +email)
    set({verificationSuccess : true})
 }
    } catch (err) {
        toast.error("Invalid Request")
    }
  },
  passwordLink : async(email : string)=>{
    set({verificationLoader : true})
    set({verificationSuccess: false})
    try {
        const {error} = await authClient.requestPasswordReset({
            email,
            redirectTo : "/password-reset"
        })
        if(error){
            toast.error(error.message)
        }else{
            toast.success("Password reset link sent to " +email)
            set({verificationSuccess : true})
        }
    } catch (err) {
        toast.error("Invalid Request")
    }finally{
        set({verificationLoader : false})
    }
    
  },
  passwordReset : async(password: string, confirmPassword : string, token: string)=>{
    set({verificationLoader : true  });
    set({verificationSuccess : false});
    try {
        if(password !== confirmPassword){
          return  toast.error("Password Feild failed to match")
        }
        const {error} = await authClient.resetPassword({
            newPassword : password,
            token,
        })
        if(error){
            toast.error(error.message)
            set({route : `/password-reset?token=${token}` })
        }else{
        toast.success("Password reset successfully")
        set({route : "/login"})}
    } catch (err) {
        toast.error("Invalid Request")
    }
    finally{
        set({verificationLoader : false  });
    }
  }
}))