import React from "react";
import "./Footer.css";
import { Phone, Mail } from "@mui/icons-material";
import footer_logo from "../assets/logo_big.png";
import instagram_icon from "../assets/instagram_icon.png";
import linkdin from "../assets/linkdin.png";
import whatsapp from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>StyleNest</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <hr />

      <div className="footer-container">
        {/* section 1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" /> Phone : <span>+7808233110</span>
          </p>
          <p>
            <Mail fontSize="small" /> Mail :{" "}
            <span>gautamsiddharth2013@gmail.com</span>
          </p>
        </div>
        {/* section 2 */}

        <div className="footer-section social">
          <h3>SOCIAL MEDIA</h3>
          <div className="social-links">
            <a
              href="https://www.instagram.com/gautamsiddharth09/"

              target="_blank"
            >
              <img src={instagram_icon} />
            </a>

            <a
              href="https://www.linkedin.com/in/gautam-kumar-b4052b9b/"

              target="_blank"
            >
              <img className="linkdin" src={linkdin} />
            </a>

            <a
              href="https://wa.me/7808233110?text=Hello%20I%20visited%20your%20website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsapp} />
            </a>
          </div>
        </div>
        {/* section 3 */}
        {/* <div className="footer-section about">
          <h3>About</h3>
          <p>Your trusted online store for quality products, secure payments, and fast delivery. We strive to make your shopping experience simple and reliable.</p>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>Copyright @ 2025 - All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
