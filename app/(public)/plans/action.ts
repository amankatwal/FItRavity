import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { standardProtection } from "@/lib/security"
import { headers } from "next/headers"
import { success } from "zod"

export const fetchInterestRecomendationAction = async (keyword: string) => {
  const result = await prisma.plan.findMany({
    where: {
      isActive: true,
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive"
          }
        },
        {
          goal: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          programType: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          focusArea: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          recomendedFor: {
            contains: keyword,
            mode: "insensitive",
          },
        },

      ]
    },
    take: 10,

    select: {
      name: true,
      goal: true,
      programType: true,
      focusArea: true,
      equipment: true,
      achievements: true,
    },
  })
  if (result.length > 0) {
    return { success: true, data: result }
  }
}
export const fetchInterestAction = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return { success: false, message: "Session expired" }
  }
  const decision = await standardProtection(session.user.id)
  if (decision.isDenied()) {
    return { success: false, message: "Request Blocked, Please try again later" }
  }
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: session.user.id
      },
      select: {
        interests: true,
      }
    })
    if (res) {
      return { success: true, data: res }
    }
  } catch (err) {

  }
}
export const submitIntrestAction = async (intrests: string[]) => {
  if (intrests.length === 0) {
    return { success: false, message: "Interests cannot be empty" }
  }
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return { success: false, message: "Session expired" }
  }
  const decision = await standardProtection(session.user.id)
  if (decision.isDenied()) {
    return { success: false, message: "Request Blocked, Please try again later" }
  }
  try {
    const res = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        interests: intrests
      }
    })
    return { success: true, data: res }
  } catch (err) {
    return { success: false, message: "Invalid request" }
  }
}

export const fetchRecomendationAction = async (userId: string) => {
  const decision = await standardProtection(userId)
  if (decision.isDenied()) {
    return { success: false, message: "Request Blocked, Please try again later" }
  }
  try {
    const interests = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        interests: true,
      }
    })
    if (!interests) {
      return { success: false, message: "No interets added", data: [] }
    }
    const plans = await prisma.plan.findMany({
      where: {
        isActive: true,
        OR: interests.interests.flatMap((interest) => [
          {
            name: {
              contains: interest,
              mode: "insensitive",
            },
          },
          {
            goal: {
              contains: interest,
              mode: "insensitive",
            },
          },
          {
            programType: {
              contains: interest,
              mode: "insensitive",
            },
          },
          {
            focusArea: {
              contains: interest,
              mode: "insensitive",
            },
          },
          {
            equipment: {
              contains: interest,
              mode: "insensitive",
            },
          },
          {
            achievements: {
              has: interest,
            },
          },
          {
            recomendedFor: {
              contains: interest,
              mode: "insensitive",
            },
          },
        ]),
      },
      select: {
        id: true,
        name: true,
        offerPrice: true,
        currency:true,
        organization: {
          include: {
            members: {
              where: {
                role: "Owner",
              },
              select: {
                profileImage: true,
              }
            }
          },
          select: {
            id: true,
            name: true,
            logo: true,
          }
        }
      },
    })
    if (plans.length === 0) {
      return { success: false, message: "No plans found based on interest", data: [] }
    }
    return { success: true, message: "Plans found", data: plans }
  } catch (err) {
    console.log(err)
    return { success: false, message: "Invalid Request", data: [] }
  }
}