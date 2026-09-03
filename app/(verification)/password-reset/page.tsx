"use client"

import { Suspense, useEffect, useState } from "react"
import { useAuthStore } from "@/app/store/authStore"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SuccessButton } from "@/components/ui/SuccessButton"
import { CheckCheck, KeyRound, Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PasswordReset() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      }
    >
      <PasswordResetContent />
    </Suspense>
  )
}

function PasswordResetContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const router = useRouter()

  const [formdata, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const {
    passwordReset,
    verificationLoader,
    verificationSuccess,
    route,
  } = useAuthStore()

  useEffect(() => {
    if (!token || token === "EXPIRED") {
      router.replace("/login")
    }
  }, [token, router])

  if (!token || token === "EXPIRED") {
    return null
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    await passwordReset(
      formdata.password,
      formdata.confirmPassword,
      token
    )

    setTimeout(() => {
      if (route) {
        router.push(route)
      }
    }, 2000)
  }

  return (
    <div>
      <div className="w-full bg-card h-[7vh] flex font-bold lg:text-4xl text-2xl items-center py-5 px-10">
        <h1>FIT</h1>

        <h1 className="text-lime-500">
          RAVITY
        </h1>
      </div>

      <div className="flex items-center justify-center h-[90vh]">
        <div className="max-w-[70vh] px-10">

          <div className="py-10 flex gap-2 lg:text-3xl items-center justify-center text-lg">
            <h1 className="text-accent-foreground font-bold">
              PASSWORD
            </h1>

            <h1 className="text-primary font-bold">
              RESET
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="py-20 flex flex-col gap-10 items-center justify-center">

              <label className="text-muted-foreground lg:font-semibold text-center">
                Please enter new password and confirm it to reset your password.
              </label>

              <Input
                type="password"
                placeholder="Enter new password"
                value={formdata.password}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    password: e.target.value,
                  })
                }
                className="bg-card-foreground text-card text-sm px-5 py-2 w-full"
              />

              <Input
                type="password"
                placeholder="Confirm new password"
                value={formdata.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    confirmPassword: e.target.value,
                  })
                }
                className="bg-card-foreground text-card text-sm px-5 py-2 w-full"
              />

              {verificationSuccess ? (
                <SuccessButton type="button">
                  <CheckCheck />
                  Password Reset
                </SuccessButton>
              ) : verificationLoader ? (
                <Button
                  disabled
                  type="button"
                  className="bg-primary text-primary-foreground text-sm px-5 py-2 w-full"
                >
                  <Loader className="animate-spin size-4" />
                </Button>
              ) : (
                <AnimatedButton type="submit">
                  <KeyRound
                    className="transition-transform duration-300 ease-in-out group-hover:rotate-225"
                  />
                  Reset Password
                </AnimatedButton>
              )}

            </div>
          </form>

        </div>
      </div>
    </div>
  )
}