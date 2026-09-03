import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldUser,
  User,
  UserIcon,
  UserStar,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useAuthStore } from "@/app/store/authStore"

export const ProfileDrowpDown =() => {
    const [signOutState, setSignOutState] = useState(false)
    const {data: session} = authClient.useSession();
    const {signOut} = useAuthStore();
    console.log(session?.user.role)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-lg" className="hover:cursor-pointer text-white">{session?.user.role === "Admin" ?<ShieldUser className="size-6"/>:session?.user.role === "Trainer" ? <UserStar />: <User />}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session?.user.role === "Admin" ? <DropdownMenuItem className="hover:cursor-pointer">
         <ShieldUser />
         Workday
        </DropdownMenuItem>: session?.user.role === "Trainer" ? <DropdownMenuItem className="hover:cursor-pointer">
          <UserStar />
         {session?.user.role}
        </DropdownMenuItem> : <DropdownMenuItem className="hover:cursor-pointer">
         <UserIcon />
         {session?.user.role}
        </DropdownMenuItem>}
        
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem  className="hover:cursor-pointer" onSelect={(e)=> e.preventDefault() }>
            {
                signOutState ? <div className="flex gap-2 justify-center">
                    <motion.div initial={{x:10, opacity:0}} transition={{duration:0.3}} animate={{x:0, opacity:1}}>
                 <Button size="sm" className="hover:cursor-pointer" variant="destructive" onClick={()=>signOut()}>Proceed</Button></motion.div>
                 <motion.div initial={{opacity:0}} transition={{duration:0.3}} animate={{opacity:1}}>
                 <Button size="icon-sm" variant="secondary" className="hover:cursor-pointer" onClick={()=>{setSignOutState(false)}}>X</Button></motion.div> 
                </div>: <motion.div initial={{opacity:0}} transition={{duration:0.3}} animate={{opacity:1}}  className="w-full flex justify-center">
            <Button size="sm" className="hover:cursor-pointer" variant="destructive" onClick={()=>{
            setSignOutState(true)
        }}>
          <LogOutIcon />
          Log out</Button></motion.div>
            }
            
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
