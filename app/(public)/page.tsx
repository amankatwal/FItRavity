"use client";

import { authClient } from "@/lib/auth-client";
import { Features } from "./__component/Features";
import HomeHero from "./__component/HomeHero";
import HomeLoader from "@/components/web/HomeLoader";

export default function Home() {
  const {isPending} = authClient.useSession()
  return (
    <div>
      {isPending ? <HomeLoader /> : <div className="relative">
    <HomeHero />
    <Features />
    
    </div>
    } 
    
    </div>
  );
}
