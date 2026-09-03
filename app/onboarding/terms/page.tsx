import Dumbell from "@/public/Dumbell.png"
import Image from 'next/image'
export default function TrainerTermsAndConditions() {
  return (
    <div>
        <div className='relative h-[30vh] overflow-hidden'>
   <Image src={Dumbell} alt='Herogirl' className='w-full h-[30vh] object-cover absolute top-0' /> 
  <div className='w-full h-full bg-black/60 absolute top-0 z-10 flex flex-col justify-center'>
<h1 className="mb-2 text-4xl text-chart-1 font-bold mx-10">
        ONBOARDING TERMS & CONDITIONS
      </h1>
  </div>
      </div>
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 text-4xl font-bold">
        FitRavity Trainer Application Terms & Conditions
      </h1>

      <p className="mb-8 text-muted-foreground">
        By submitting an application to become a Trainer on the FitRavity
        platform, you acknowledge that you have read, understood, and agree to
        the following Terms & Conditions.
      </p>

      {/* 1. Independent Contractor */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          1. Independent Contractor
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            Approved Trainers will work as <strong>Independent Contractors</strong>{" "}
            and not as employees of FitRavity.
          </li>
          <li>
            Nothing in the application process creates an employer-employee,
            partnership, joint venture, or agency relationship.
          </li>
        </ul>
      </section>

      {/* 2. Eligibility */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">2. Eligibility</h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>You must be at least 18 years of age.</li>
          <li>
            All information provided in your application must be true,
            complete, and accurate.
          </li>
          <li>
            You must possess the qualifications or certifications necessary to
            provide professional fitness coaching.
          </li>
          <li>
            You must be legally permitted to work as an Independent Contractor
            in your country or region.
          </li>
        </ul>
      </section>

      {/* 3. Application Review */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          3. Application Review
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Submitting an application does not guarantee approval.</li>
          <li>
            FitRavity reserves the right to approve, reject, or request
            additional information.
          </li>
          <li>
            FitRavity may verify the authenticity of any information or
            documents submitted.
          </li>
        </ul>
      </section>

      {/* 4. Certificate Verification */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          4. Certificate Verification
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            Certificates uploaded during the application process are used solely
            for verification purposes.
          </li>
          <li>
            After the verification process is completed, all uploaded
            certificates will be permanently deleted from FitRavity's systems.
          </li>
          <li>
            Certificates will not be retained unless required by applicable
            law.
          </li>
          <li>
            Applicants are responsible for ensuring that all uploaded
            certificates are genuine and belong to them.
          </li>
        </ul>
      </section>

      {/* 5. PAN Card */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          5. PAN Card Information
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            A valid PAN Card may be required for identity verification and
            payout processing.
          </li>
          <li>
            If your application is approved, your PAN Card information will be
            securely stored using industry-standard <strong>encryption</strong>.
          </li>
          <li>
            PAN Card information will only be used for identity verification,
            taxation, legal compliance, and payout processing.
          </li>
          <li>
            Access to PAN Card information is restricted to authorized systems
            and personnel only.
          </li>
        </ul>
      </section>

      {/* 6. Professional Conduct */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          6. Professional Conduct
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Treat all users professionally and respectfully.</li>
          <li>
            Do not engage in harassment, discrimination, abusive language, or
            inappropriate conduct.
          </li>
          <li>
            Maintain a safe, supportive, and professional coaching environment.
          </li>
          <li>
            Represent FitRavity professionally while using the platform.
          </li>
        </ul>
      </section>

      {/* 7. Accuracy */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          7. Accuracy of Information
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            All submitted information, documents, and certifications must be
            genuine.
          </li>
          <li>
            Providing false, misleading, or fraudulent information may result
            in immediate rejection or permanent removal from FitRavity.
          </li>
        </ul>
      </section>

      {/* 8. Privacy */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          8. Privacy & Confidentiality
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Protect the privacy of all users.</li>
          <li>
            Do not disclose confidential business information or user data.
          </li>
          <li>
            Confidentiality obligations continue even after leaving the
            platform.
          </li>
        </ul>
      </section>

      {/* 9. Platform Policies */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          9. Platform Policies
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Follow all FitRavity Terms of Service.</li>
          <li>Follow the Privacy Policy.</li>
          <li>Follow Community Guidelines.</li>
          <li>Comply with future policy updates.</li>
        </ul>
      </section>

      {/* 10. Intellectual Property */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          10. Intellectual Property
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            All FitRavity trademarks, software, branding, and platform content
            remain the exclusive property of FitRavity.
          </li>
          <li>
            No content may be copied, reproduced, or distributed without
            written permission.
          </li>
        </ul>
      </section>

      {/* 11. Suspension */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          11. Suspension or Termination
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>Violation of these Terms.</li>
          <li>Submission of fraudulent information.</li>
          <li>Illegal or unethical conduct.</li>
          <li>Violation of FitRavity policies.</li>
          <li>Any activity that harms users or the platform.</li>
        </ul>
      </section>

      {/* 12. Payments */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">12. Payments</h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            Payment terms will be communicated separately upon approval.
          </li>
          <li>
            Payments are subject to applicable taxes and platform policies.
          </li>
          <li>
            FitRavity may withhold payments where fraud or policy violations are
            suspected.
          </li>
        </ul>
      </section>

      {/* 13. Changes */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">
          13. Changes to These Terms
        </h2>

        <p>
          FitRavity reserves the right to update these Terms & Conditions at any
          time. Continued use of the platform constitutes acceptance of the
          revised Terms.
        </p>
      </section>

      {/* 14. Acceptance */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">14. Acceptance</h2>

        <p className="mb-4">
          By submitting your Trainer Application, you acknowledge and agree
          that:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>You have read and understood these Terms & Conditions.</li>
          <li>
            You consent to the verification of your submitted information and
            documents.
          </li>
          <li>
            Your uploaded certificates will be permanently deleted after the
            review and verification process is completed.
          </li>
          <li>
            If approved, your PAN Card information will be securely stored in an
            encrypted format for legal compliance and payout processing.
          </li>
          <li>Submitting an application does not guarantee approval.</li>
          <li>
            You agree to comply with all FitRavity policies if your application
            is approved.
          </li>
        </ul>
      </section>
    </div></div>
  );
}