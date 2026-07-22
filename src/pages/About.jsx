import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <h1>About WeberTech Solutions KE</h1>

      <p>
        WeberTech Solutions KE is a Kenyan technology company focused on
        providing affordable digital solutions, connectivity services,
        electronics, software development, and digital skills training.
      </p>

      <p>
        Our mission is to empower individuals, businesses, and organizations
        through innovative technology solutions that improve productivity,
        connectivity, and business growth.
      </p>

      <h2>Our Services</h2>

      <ul>
        <li>Safaricom Bundles & Digital Services</li>
        <li>Website & Software Development</li>
        <li>Cyber Services</li>
        <li>Electronics & Accessories</li>
        <li>Digital Skills Training & Academy</li>
        <li>Business Automation Solutions</li>
      </ul>

      <h2>Contact Us</h2>

      <p><strong>Phone:</strong> +254 722 508 904</p>
      <p><strong>Email:</strong> webertechdevs@gmail.com</p>
      <p><strong>Website:</strong> https://webertech.co.ke</p>

      <p>
        We are committed to delivering reliable, secure, and customer-focused
        technology services across Kenya and beyond.
      </p>
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
