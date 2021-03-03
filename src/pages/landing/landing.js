import React from "react";
import "./landing.css";
import iphoneImg from "../../assets/devices.png";

export default function LandingPage() {
  return (
    <section>
      <div className="landing-container">
        <div className="titles-container">
          <strong className="title-text">
            Share your thoughts with everyone...
          </strong>
          <p className="subtitle-paragraph">
            ... wherever you want, whenever you want
          </p>
        </div>
        <div className="app-mobile-presentation">
          <img
            src={iphoneImg}
            alt="iphone displaying the app mobile version"
            className="img"
          />
          <div className="buttons-container">
            <button className="app-mobile-buttons">
              <i style={{ marginRight: "6px" }} className="fab fa-apple"></i>
              for iOS{" "}
            </button>
            <button className="app-mobile-buttons">
              <i style={{ marginRight: "6px" }} className="fab fa-android"></i>
              for Android{" "}
            </button>
            <button className="app-mobile-buttons">
              <i style={{ marginRight: "6px" }} className="fab fa-chrome"></i>
              for browsers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
