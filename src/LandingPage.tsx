import React, { useEffect, useState } from "react";
import "./App.css";

const LandingPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="landing-root">
      <div className={`hero ${visible ? "hero-visible" : ""}`}>
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
