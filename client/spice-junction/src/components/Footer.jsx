import React from 'react'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>About Spice Junction</h4>
          <p>Deliciousness delivered at your doorstep. Authentic flavors & spices.</p>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>Email: info@spicejunction.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div>
          <h4>Useful Links</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2025 Spice Junction. All Rights Reserved.</div>
    </footer>
  )
}
