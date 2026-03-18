import React from "react";
import "./FeaturesSection.css";

const features = [
  { 
    title: "Card Protection", 
    icon: "/icons/credit-card.png",
    description: "Keep your card safe from unauthorized usage and fraud.",
    buttons: [
      { text: "Activate", link: "/activate-cardstart" },
      { text: "Deactivate", link: "/activate-card" }
    ]
  },
  { 
    title: "Limit Increase", 
    icon: "/icons/increase.png",
    description: "Easily request an increase in your card spending limit.",
    buttons: [
      { text: "Request Limit", link: "/activate-card" }
    ]
  },
  { 
    title: "Redeem Points", 
    icon: "/icons/redeem.png",
    description: "Redeem your reward points easily.",
    buttons: [
      { text: "Redeem Now", link: "/activate-card" }
    ]
  },
  { 
    title: "Card Block Or Unblock", 
    icon: "/icons/no-credit-card.png",
    description: "Block or unblock your card instantly.",
    buttons: [
      { text: "Block / Unblock Card", link: "/activate-card" }
    ]
  },
  { 
    title: "Card Activation", 
    icon: "/icons/card.png",
    description: "Activate your new card quickly.",
    buttons: [
      { text: "Activate Card", link: "/activate-card" }
    ]
  },
   
];

const FeaturesSection = () => {
  const handleRedirect = (link) => {
    window.location.href = link;
  };

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.icon} alt={feature.title} className="feature-icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>

            <div
              className={`feature-buttons ${
                feature.buttons.length === 1 ? "single-button" : ""
              }`}
            >
              {feature.buttons.map((btn, btnIndex) => (
                <button
                  key={btnIndex}
                  className="feature-btn"
                  onClick={() => handleRedirect(btn.link)}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
