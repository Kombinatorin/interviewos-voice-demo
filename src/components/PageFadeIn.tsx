import { ReactNode } from "react";

export default function PageFadeIn({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      {children}
    </div>
  );
}