import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-12  min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        Terms and Conditions
      </h1>
      <p className="text-center text-gray-500 text-sm mb-12">
        Last updated: April 7, 2025
      </p>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          1. Welcome
        </h2>console.log('Terms and Conditions component rendered');
        <p className="text-gray-600 leading-relaxed">
          Hello and welcome to RentEasy! By using our website or app, you agree to follow these rules. If you don’t agree, please don’t use our service.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          2. Your Responsibilities
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Please use RentEasy only for legal purposes. Ensure all information you provide is accurate, and keep your account password secure.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3. About Property Listings
        </h2>
        <p className="text-gray-600 leading-relaxed">
          RentEasy helps people list and find rental properties. We don’t own or verify the properties ourselves, so we’re not responsible for them.
        </p>
      </section>

      {/* Section 4 - Updated Payments */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          4. Payments
        </h2>
        <p className="text-gray-600 leading-relaxed">
          When you pay through RentEasy, we use third-party payment processors to handle transactions. We don’t store your payment details. For each booking, RentEasy deducts a 5% commission from the payment, and the remaining amount is sent to the landlord.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          5. Account Termination
        </h2>
        <p className="text-gray-600 leading-relaxed">
          If you break these rules or misuse RentEasy, we may suspend or terminate your access to our service.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          6. Changes to These Terms
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We may update these terms periodically. Continued use of RentEasy after changes indicates your acceptance of the updated terms.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          7. Get in Touch
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Have questions? Email us at{' '}
          <a
            href="mailto:support@renteasy.com"
            className="text-blue-600 hover:underline"
          >
renteasye@gmail.com
</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;