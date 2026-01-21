type SelectionCardProps = {
  title: string;
  subtitle?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function SelectionCard({
  title,
  subtitle,
  disabled,
  onClick,
}: SelectionCardProps) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        padding: 24,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.02)",
        color: disabled ? "#666" : "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = "#2ecc71";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {subtitle && (
        <p style={{ opacity: 0.7, fontSize: 14 }}>{subtitle}</p>
      )}
      {disabled && (
        <p style={{ marginTop: 12, fontSize: 12, color: "#888" }}>
          Bald verfügbar
        </p>
      )}
    </div>
  );
}