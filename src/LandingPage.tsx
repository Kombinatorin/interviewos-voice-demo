import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <main className="landing-root">
      <section className="hero">
        <h1 className="hero-title">InterviewOS</h1>

        <p className="hero-subline">
          Ein Betriebssystem für Interviews, KI-Agenten und intelligente
          Entscheidungsprozesse.
        </p>

        <p className="hero-claim">
          Ruhig. Intelligent. Menschlich.
        </p>

        <button className="hero-button">
          Entdecke InterviewOS
        </button>
      </section>
    </main>
  );
};

export default LandingPage;
