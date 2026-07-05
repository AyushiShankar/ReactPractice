import React, { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaRedditAlien,
  FaEnvelope,
  FaDiscord,
  FaLink,
} from "react-icons/fa";
import "./styles.css";

const SocialMediaButtons = () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check this out!");
  const [copy, setCopy] = useState(false);
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${shareText}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${shareText}`,
    email: `mailto:?subject=${shareText}&body=${pageUrl}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    });

  };

  const handleNavigation = (url) => {
    window.open(url, "_blank", "Width=600, height=400");
}

  return (
    <div className="social-share">
      <div className="buttons">
        <button
          className="social-btn linkedin"
          aria-label="LinkedIn"
          onClick={() => handleNavigation(shareUrls.linkedin)}>
          <FaLinkedinIn />
        </button>
        <button
          className="social-btn telegram"
          aria-label="Telegram"
          onClick={() => handleNavigation(shareUrls.telegram)}>
          <FaTelegramPlane />
        </button>
        <button
          className="social-btn reddit"
          aria-label="Reddit"
          onClick={() => handleNavigation(shareUrls.reddit)}>
          <FaRedditAlien />
        </button>
        <button
          className="social-btn email"
          aria-label="Email"
          onClick={() => handleNavigation(shareUrls.email)}>
          <FaEnvelope />
        </button>
        <button
          className="social-btn discord"
          aria-label="Discord"
          onClick={() => handleNavigation(shareUrls.email)}
        >
          <FaDiscord />
        </button>
        <button
          className="social-btn facebook"
          aria-label="Facebook"
          onClick={() => handleNavigation(shareUrls.facebook)}>
          <FaFacebookF />
        </button>
        <button
          className="social-btn whatsapp"
          aria-label="WhatsApp"
          onClick={() => handleNavigation(shareUrls.whatsapp)}>
          <FaWhatsapp />
        </button>
      </div>

      <div className="copy-link-container">
        <p className="copy-label">Or copy link:</p>
        <div className="copy-link-box">
          <FaLink className="link-icon" />
          <input type="text" value={window.location.href} readOnly />
          <button onClick={handleCopy}>
            {!copy ? "Copy Link" : "Copied!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaButtons;
