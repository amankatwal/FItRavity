"use client"

import * as React from "react"

import {
  flexRender,
  useTable,
  tableFeatures,
  columnFilteringFeature,
  globalFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

import { useAdminApplicationStore } from "../clientStore"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { authClient } from "@/lib/auth-client"
import HomeLoader from "@/components/web/HomeLoader"
import { Loader, Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { applicationSearch, applicationSearchType } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"


type Application = {
  id: string
  status: string
  userId: string
  fullName: string
  email: string
  gender: string | null
  dob: Date | null
  specialization: string
  experience: string | null
  certifications: string[]
  bio: string
  panNumber: string
  brand: string
  designation: string
  social: string | null
  profileImage: string
  city: string
  country: string
  adminId: string | null
  adminComment: string | null
  createdAt: Date
  updatedAt: Date
}


const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,

  filteredRowModel: createFilteredRowModel(),

  filterFns: {
    includesString: filterFn_includesString,
  },
})
const getColumns = (
  acceptAssignment: (id: string) => void,
  acceptLoader : boolean
) => [
  {
    accessorKey: "fullName",

    header: "Name",

    cell: ({ row }: any) => (
      <span className="font-medium">
        {row.original.fullName}
      </span>
    ),
  },

  {
    accessorKey: "email",

    header: "Email",

    cell: ({ row }: any) => (
      <span className="text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },

  {
    accessorKey: "gender",

    header: "Gender",

    cell: ({ row }: any) => (
      <span>
        {row.original.gender ?? "—"}
      </span>
    ),
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }: any) => {
      const status = row.original.status

      return (
        <Badge
          variant={
            status === "APPROVED"
              ? "default"
              : status === "REJECTED"
                ? "destructive"
                : "secondary"
          }
        >
          {status}
        </Badge>
      )
    },
  },

  {
    accessorKey: "id",

    header: "Application ID",

    cell: ({ row }: any) => {
      const id = row.original.id

      return (
        <span className="font-mono text-sm">
          {id.slice(-8)}
        </span>
      )
    },
  },

  {
    id: "accept",

    header: "Action",

    cell: ({ row }: any) => {
      const application = row.original
          const isAccepted = !!application.adminId
      return (
        <div>
          {isAccepted ?<Link href={`/dashboard/onboarding/${application.id}`}> <AnimatedButton
          size="sm"        >
          Check
        </AnimatedButton> </Link>: <AnimatedButton
          disabled = {acceptLoader}
          size="sm"
          onClick={() => {
            !acceptLoader &&   acceptAssignment(application.id)
          }}
        >{acceptLoader ? <Loader /> : "Accept"}
        </AnimatedButton> }
        </div>
      )
    },
  },
]
export default function Onboarding() {
  const params = useSearchParams()
  const email = params.get("email");
  const {
    data,
    fetchApplication,
    acceptAssignment,
    acceptLoader
  } = useAdminApplicationStore()
   const columns = React.useMemo(
    () => getColumns(acceptAssignment, acceptLoader),
    [acceptAssignment]
  )

  const [globalFilter, setGlobalFilter] =
    React.useState("")
  const {data: session} = authClient.useSession();
const userId = session?.user.id;
  
  React.useEffect(() => {

    if(userId)
    fetchApplication(userId)
  }, [acceptLoader, fetchApplication])

  const table = useTable(
    {
      features,

      data: (data ?? []) as Application[],

      columns,

      state: {
        globalFilter,
      },

      onGlobalFilterChange: setGlobalFilter,

      globalFilterFn: "includesString",
    },

    (state) => state
  )
  const form = useForm<applicationSearchType>({
    resolver: zodResolver(applicationSearch),
    defaultValues: {
      email: "",
    },
  })

  const hasApplications =
    Array.isArray(data) &&
    data.length > 0


  const hasFilteredRows =
    table.getRowModel().rows.length > 0
if(!userId) return <HomeLoader />
function onSubmit(data: applicationSearchType) {
  if(userId)
    fetchApplication(userId, data.email)
  }
  return (
    <div className="w-full space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Applications
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage active onboarding applications
        </p>
      </div>
       <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                    className="max-w-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></FieldGroup>
            <AnimatedButton size="icon-sm" type="submit"><Search /></AnimatedButton>
            </form>
      <div className="rounded-md border">

        <Table>
          <TableHeader>

            {table
              .getHeaderGroups()
              .map((headerGroup) => (

                <TableRow
                  key={headerGroup.id}
                >

                  {headerGroup.headers.map(
                    (header) => (

                      <TableHead
                        key={header.id}
                      >

                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column
                                .columnDef.header,
                              header.getContext()
                            )}

                      </TableHead>

                    )
                  )}

                </TableRow>

              ))}

          </TableHeader>

          <TableBody>

            {!hasApplications ? (

              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No active applications
                </TableCell>

              </TableRow>

            ) : !hasFilteredRows ? (
              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No active applications
                </TableCell>

              </TableRow>

            ) : (
              table
                .getRowModel()
                .rows
                .map((row) => (

                  <TableRow
                    key={row.id}
                  >

                    {row.getAllCells().map((cell) => (

                        <TableCell
                          key={cell.id}
                        >

                          {flexRender(
                            cell.column
                              .columnDef.cell,
                            cell.getContext()
                          )}

                        </TableCell>

                      ))}

                  </TableRow>

                ))

            )}

          </TableBody>

        </Table>

      </div>

    </div>
  )
}