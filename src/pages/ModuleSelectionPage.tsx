import PageFadeIn from "../components/PageFadeIn";
import SelectionCard from "../components/SelectionCard";

type Props = {
  onBack: () => void;
};

export default function ModuleSelectionPage({ onBack }: Props) {
  return (
    <PageFadeIn>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #0b0f1a 0%, #020409 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        <h2 style={{ fontSize: 42, marginBottom: 40 }}>
          Module auswählen
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            width: "100%",
            maxWidth: 1100,
          }}
        >
          <SelectionCard
            title="FAQ-Agent"
            subtitle="Fragen beantworten, Wissen bereitstellen"
            onClick={() => alert("Modul später aktivierbar")}
          />

          <SelectionCard
            title="Onboarding-Interview"
            subtitle="Demnächst verfügbar"
            disabled
          />
          <SelectionCard title="Analyse-Agent" subtitle="Demnächst" disabled />
          <SelectionCard title="Matching-Agent" subtitle="Demnächst" disabled />
          <SelectionCard title="Feedback-Agent" subtitle="Demnächst" disabled />
          <SelectionCard title="Export-Agent" subtitle="Demnächst" disabled />
        </div>

        {/* NAVIGATION */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 20,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 10,
              cursor: "pointer",
              opacity: 0.8,
            }}
          >
            ← Zurück
          </button>
        </div>
      </div>
    </PageFadeIn>
  );
}