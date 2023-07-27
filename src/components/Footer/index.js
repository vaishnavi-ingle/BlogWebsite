import React from 'react';
import './style.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer"> {/* Apply the "footer" class */}
      <div className="footer-content"> {/* Apply the "footer-content" class */}
        {/* Social Media Links */}
        <div className="social-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="gg-facebook"></i></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="gg-twitter"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="gg-instagram"></i></a>
        </div>

        <div className="footer-links"> {/* Apply the "footer-links" class */}
          {/* About */}
          <a href="/about">About</a>

          {/* Privacy Policy */}
          <a href="/privacy-policy">Privacy Policy</a>

          {/* Terms of Service */}
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
