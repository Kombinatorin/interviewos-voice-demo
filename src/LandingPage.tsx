import AnimatedButton from "../components/AnimatedButton";


export default function LandingPage({ onDiscover }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0b0f1a 0%, #020409 100%)",
        color: "#fff",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: 64, marginBottom: 24 }}>InterviewOS</h1>
        <p style={{ fontSize: 20, opacity: 0.8, marginBottom: 32 }}>
          Das Betriebssystem für Interviews, KI-Agenten und Cockpits.  
          Ruhig. Intelligent. Menschlich.
        </p>
        <AnimatedButton label="Entdecke InterviewOS" onClick={onDiscover} />
      </div>
    </div>
  );
}
