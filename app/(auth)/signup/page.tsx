import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import SignUpForm from "./__components/SignUpForm"


export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers : await headers()
  })
 if(session){
  return redirect("/")
 }
return <SignUpForm />
}
