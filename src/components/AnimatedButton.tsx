type AnimatedButtonProps = {
    label: string;
    onClick?: () => void;
  };
  
  export default function AnimatedButton({
    label,
    onClick,
  }: AnimatedButtonProps) {
    return (
      <button
        onClick={onClick}
        style={{
          padding: "14px 32px",
          borderRadius: 999,
          border: "1.5px solid rgba(255,255,255,0.25)",
          background: "transparent",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#2ecc71";
          e.currentTarget.style.color = "#2ecc71";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          e.currentTarget.style.color = "#fff";
        }}
      >
        {label}
      </button>
    );
  }