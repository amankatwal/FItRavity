import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { LoginForm } from './__components/LoginForm'
import { redirect } from 'next/navigation';



export default async function LoginPage() {
 const session = await auth.api.getSession({
    headers: await headers(),
});
    console.log(session?.user)
if(session){
  return redirect("/")
}
return <LoginForm />
}
