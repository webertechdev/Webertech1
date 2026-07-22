import React from "react";

export default function Privacy() {
  return (
    <div style={styles.container}>
      <h1>Privacy Policy</h1>

      <p>Last Updated: June 2026</p>

      <p>
        WeberTech Solutions KE respects your privacy and is committed to
        protecting your personal information.
      </p>

      <h2>Information We Collect</h2>

      <ul>
        <li>Name and contact information.</li>
        <li>Email address.</li>
        <li>Phone number.</li>
        <li>Usage information and analytics.</li>
        <li>Transaction information where applicable.</li>
      </ul>

      <h2>How We Use Information</h2>

      <ul>
        <li>Provide requested services.</li>
        <li>Improve website performance.</li>
        <li>Respond to customer inquiries.</li>
        <li>Process transactions and orders.</li>
        <li>Enhance security and prevent fraud.</li>
      </ul>

      <h2>Cookies</h2>

      <p>
        Our website may use cookies and similar technologies to improve user
        experience and analyze website performance.
      </p>

      <h2>Third-Party Services</h2>

      <p>
        We may use trusted third-party services including Google Analytics,
        Google AdSense, Firebase, and payment providers to deliver our services.
      </p>

      <h2>Data Security</h2>

      <p>
        We take reasonable measures to protect your personal information against
        unauthorized access, disclosure, or misuse.
      </p>

      <h2>Contact</h2>

      <p>
        If you have questions regarding this Privacy Policy, contact us at:
      </p>

      <p>Email: webertechdevs@gmail.com</p>
      <p>Phone: +254 722 508 904</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    lineHeight: "1.8",
  },
};
