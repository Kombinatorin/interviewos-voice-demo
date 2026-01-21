import PageFadeIn from "../components/PageFadeIn";
import SelectionCard from "../components/SelectionCard";

type Props = {
  onSelectTopic: () => void;
  onBack: () => void;
};

export default function TopicSelectionPage({
  onSelectTopic,
  onBack,
}: Props) {
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
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <h2 style={{ fontSize: 42, marginBottom: 48 }}>
          Wähle ein Thema
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
          {/* AKTIVES THEMA */}
          <SelectionCard
            title="Tierschutzpartei"
            subtitle="Politisches Onboarding"
            onClick={onSelectTopic}
          />

          {/* INAKTIVE THEMEN */}
          <SelectionCard
            title="Agent 2"
            subtitle="Demnächst verfügbar"
            disabled
          />
          <SelectionCard
            title="Agent 3"
            subtitle="Demnächst verfügbar"
            disabled
          />
          <SelectionCard
            title="Agent 4"
            subtitle="Demnächst verfügbar"
            disabled
          />
          <SelectionCard
            title="Agent 5"
            subtitle="Demnächst verfügbar"
            disabled
          />
          <SelectionCard
            title="Agent 6"
            subtitle="Demnächst verfügbar"
            disabled
          />
        </div>

        <button
          onClick={onBack}
          style={{
            marginTop: 48,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 10,
            cursor: "pointer",
            opacity: 0.7,
          }}
        >
          ← Zurück
        </button>
      </div>
    </PageFadeIn>
  );
}