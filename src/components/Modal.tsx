type Props = {
  title: string;
  onClose: () => void;
};

export default function Modal({ title, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #0b0f1a, #020409)",
          borderRadius: 18,
          padding: 36,
          minWidth: 420,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h3 style={{ marginBottom: 20 }}>{title}</h3>

        <p style={{ opacity: 0.75, marginBottom: 28 }}>
          Dieses Modul kann später aktiviert oder erweitert werden.
        </p>

        <button
          onClick={onClose}
          style={{
            padding: "12px 18px",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}