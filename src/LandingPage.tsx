import React from "react";
import "./App.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-root">
      <div className="hero">
        <h1 className="hero-title">InterviewOS</h1>
        <p className="hero-subtitle">
          Ein neues Betriebssystem für Interviews, Dialoge und KI-Agenten.
          <br />
          Ruhig. Intelligent. Menschlich.
        </p>

        <button className="hero-button">
          Entdecke InterviewOS
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
