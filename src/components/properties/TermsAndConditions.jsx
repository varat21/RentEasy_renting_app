import React from 'react';

const TermsAndConditions = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      {/* Header */}
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Terms and Conditions
      </h1>
      
      <p style={{
        textAlign: 'center',
        color: '#666',
        fontSize: '14px',
        marginBottom: '40px'
      }}>
        Last updated: April 7, 2025
      </p>

      {/* Section 1 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          1. Welcome
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          Hello and welcome to RentEasy! By using our website or app, you agree to follow these rules. If you don’t agree, please don’t use our service.
        </p>
      </div>

      {/* Section 2 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          2. Your Responsibilities
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          Please use RentEasy only for legal things. Make sure all information you give us is true, and keep your account password safe.
        </p>
      </div>

      {/* Section 3 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          3. About Property Listings
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          RentEasy helps people list and find rental properties. We don’t own or check the properties ourselves, so we’re not responsible for them.
        </p>
      </div>

      {/* Section 4 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          4. Payments
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          When you pay through RentEasy, we use other companies to handle the money. We don’t keep your payment details.
        </p>
      </div>

      {/* Section 5 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          5. Account Termination
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          If you break these rules or misuse RentEasy, we can stop you from using our service.
        </p>
      </div>

      {/* Section 6 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          6. Changes to These Terms
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          We might change these rules sometimes. If you keep using RentEasy after changes, it means you’re okay with them.
        </p>
      </div>

      {/* Section 7 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          7. Get in Touch
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          Have questions? Email us at{' '}
          <a 
            href="mailto:renteasye@gmail.com"
            style={{ color: '#0066cc', textDecoration: 'underline' }}
          >
           renteasye@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;