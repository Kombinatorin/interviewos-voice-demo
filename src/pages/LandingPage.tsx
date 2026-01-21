import AnimatedButton from "../components/AnimatedButton";

type Props = {
  onDiscover: () => void;
};

export default function LandingPage({ onDiscover }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b0f1a 0%, #020409 100%)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 900, padding: 40 }}>
        <h1 style={{ fontSize: 64, marginBottom: 24 }}>InterviewOS</h1>

        <p style={{ fontSize: 20, opacity: 0.8, marginBottom: 40 }}>
          Das Betriebssystem für Interviews, KI-Agenten und Cockpits.
          <br />
          Ruhig. Intelligent. Menschlich.
        </p>

        <AnimatedButton
          label="Entdecke InterviewOS"
          onClick={onDiscover}
        />
      </div>
    </div>
  );
}