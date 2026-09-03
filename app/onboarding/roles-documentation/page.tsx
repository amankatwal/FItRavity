import Dumbell from "@/public/Dumbell.png"
import Image from 'next/image'
export default function RolesDocumentation() {
  return (
    <div>
<div className='relative h-[30vh] overflow-hidden'>
   <Image src={Dumbell} alt='Herogirl' className='w-full h-[30vh] object-cover absolute top-0' /> 
  <div className='w-full h-full bg-black/60 absolute top-0 z-10 flex flex-col justify-center'>
<h1 className="mb-2 text-4xl text-chart-1 font-bold mx-10">
        FitRavity – Roles, Reporting & Payout Structure
      </h1>
  </div>
      </div>
    
<div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 text-4xl font-bold">
        FitRavity – Roles, Reporting & Subscription Structure
      </h1>

      <p className="mb-8 text-muted-foreground">
        This document defines the operational roles within the FitRavity
        platform, their responsibilities, reporting relationships, payout
        structure, and subscription management policies.
      </p>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">1. Owner</h2>

        <h3 className="mb-2 text-lg font-semibold">Overview</h3>
        <p className="mb-4">
          An <strong>Owner</strong> is an{" "}
          <strong>Independent Contractor</strong> who partners with FitRavity to
          build and manage their own team of Trainers.
        </p>

        <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Recruit and manage Trainers.</li>
          <li>Monitor Trainer performance.</li>
          <li>Provide guidance and operational support.</li>
          <li>Manage Trainer payouts.</li>
          <li>Maintain the quality of services provided by their team.</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Reporting Structure</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Operates independently.</li>
          <li>Does not report to another Owner or Trainer.</li>
          <li>Must comply with FitRavity platform policies and standards.</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Payout</h3>
        <p className="mb-4">
          Owners receive payouts directly from FitRavity.
        </p>

        <h3 className="mb-2 text-lg font-semibold">
          Subscription & Pricing
        </h3>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            Owners have full control over creating and managing subscription
            plans for their business.
          </li>
          <li>
            Owners may customize plan names, features, duration, and pricing.
          </li>
          <li>
            Owners are responsible for defining the value offered within each
            subscription plan.
          </li>
          <li>
            FitRavity reserves the right to review or restrict any subscription
            plan that violates platform policies or applicable laws.
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">2. Trainer</h2>

        <h3 className="mb-2 text-lg font-semibold">Overview</h3>
        <p className="mb-4">
          A Trainer works under an Owner and is responsible for providing
          coaching and support to assigned users.
        </p>

        <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Coach and guide assigned users.</li>
          <li>Follow operational guidelines established by the Owner.</li>
          <li>Track user progress.</li>
          <li>Maintain professional conduct and service quality.</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Reporting Structure</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Reports directly to the Owner.</li>
          <li>
            All operational and performance communication flows through the
            Owner.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Payout</h3>
        <p>Trainer payouts are managed and processed by the Owner.</p>
      </section>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          3. FitRavity Trainer
        </h2>

        <h3 className="mb-2 text-lg font-semibold">Overview</h3>
        <p className="mb-4">
          A <strong>FitRavity Trainer</strong> is an{" "}
          <strong>Independent Contractor</strong> who works directly with the
          FitRavity platform and is not associated with any Owner.
        </p>

        <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Coach users assigned directly by FitRavity.</li>
          <li>Maintain FitRavity coaching standards.</li>
          <li>Provide professional support.</li>
          <li>Deliver a high-quality user experience.</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Reporting Structure</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Does not report to any Owner.</li>
          <li>Works directly with the FitRavity platform.</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold">Payout</h3>
        <p className="mb-4">
          FitRavity Trainers are paid directly by FitRavity.
        </p>

        <h3 className="mb-2 text-lg font-semibold">
          Subscription & Pricing
        </h3>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            FitRavity Trainers can only offer subscription plans officially
            created and managed by FitRavity.
          </li>
          <li>
            They cannot create custom subscription plans or modify pricing.
          </li>
          <li>
            Plan names, pricing, features, and duration are determined solely by
            FitRavity.
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Organizational Hierarchy
        </h2>

        <div className="whitespace-pre rounded-lg border bg-muted/20 p-6 font-mono">
{`FitRavity Platform
│
├── Owner (Independent Contractor)
│      └── Trainer
│
└── FitRavity Trainer (Independent Contractor)`}
        </div>
      </section>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Payout Structure</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-muted">
                <th className="border p-3 text-left">Role</th>
                <th className="border p-3 text-left">Reports To</th>
                <th className="border p-3 text-left">Payout Processed By</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-3">Owner</td>
                <td className="border p-3">FitRavity Platform</td>
                <td className="border p-3">FitRavity Platform</td>
              </tr>

              <tr>
                <td className="border p-3">Trainer</td>
                <td className="border p-3">Owner</td>
                <td className="border p-3">Owner</td>
              </tr>

              <tr>
                <td className="border p-3">FitRavity Trainer</td>
                <td className="border p-3">FitRavity Platform</td>
                <td className="border p-3">FitRavity Platform</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Subscription Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-muted">
                <th className="border p-3 text-left">Role</th>
                <th className="border p-3 text-left">
                  Can Customize Plans
                </th>
                <th className="border p-3 text-left">
                  Can Set Pricing
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-3">Owner</td>
                <td className="border p-3">✅ Yes</td>
                <td className="border p-3">✅ Yes</td>
              </tr>

              <tr>
                <td className="border p-3">Trainer</td>
                <td className="border p-3">❌ No</td>
                <td className="border p-3">❌ No</td>
              </tr>

              <tr>
                <td className="border p-3">FitRavity Trainer</td>
                <td className="border p-3">❌ No</td>
                <td className="border p-3">❌ No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Key Points</h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Owner is an Independent Contractor.</li>
          <li>FitRavity Trainer is an Independent Contractor.</li>
          <li>Trainer works under an Owner and reports directly to them.</li>
          <li>Trainer payouts are processed by the Owner.</li>
          <li>FitRavity Trainer payouts are processed directly by FitRavity.</li>
          <li>
            Owners have complete flexibility to customize subscription plans,
            pricing, and included features.
          </li>
          <li>
            FitRavity Trainers may only offer plans officially defined by
            FitRavity and cannot modify pricing or plan features.
          </li>
          <li>
            All roles must comply with FitRavity's policies, quality standards,
            and code of conduct.
          </li>
        </ul>
      </section>
    </div></div>
  );
}