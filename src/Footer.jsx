import React from 'react';
import './Footer.css'; 

function Footer() {
  return (
    <div className="footer-container">

      <div className="contact-footer">
        <div class="contcat-new-info">
        <h2>Stay Up to Date About Our Latest Auctions</h2>
        </div>
    <div className="newsletter">
  <input type="email" placeholder="Enter your email address" />
  <button>Subscribe to Newsletter</button>
</div>

      </div>

      <div className="footer-links">
        <div className="brand-info">
          <h3>Bidbuy</h3>
          <p>
            Join online auctions and find unique items to buy and sell with
            excitement!
          </p>
          <div className="social-media">
            <span>Twitter</span>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>GitHub</span>
          </div>
        </div>

        <div className="footer-columns">
          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Features</p>
            <p>Works</p>
            <p>Career</p>
          </div>
          <div>
            <h4>Help</h4>
            <p>Customer Support</p>
            <p>Delivery Details</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <h4>FAQ</h4>
            <p>Account</p>
            <p>Manage Deliveries</p>
            <p>Orders</p>
            <p>Payments</p>
          </div>
          <div>
            <h4>Resources</h4>
            <p>Ipl Auction</p>
            <p>Development Tutorial</p>
            <p>Blog</p>
            <p>YouTube Playlist</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Bidbetter © 2025-2026, All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
