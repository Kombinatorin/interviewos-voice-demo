console.log("App booted");
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import ModuleSelectionPage from "./pages/ModuleSelectionPage";

type Page = "landing" | "topics" | "modules";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  if (page === "landing") {
    return (
      <LandingPage
        onDiscover={() => setPage("topics")}
      />
    );
  }

  if (page === "topics") {
    return (
      <TopicSelectionPage
        onSelectTopic={() => setPage("modules")}
        onBack={() => setPage("landing")}
      />
    );
  }

  if (page === "modules") {
    return (
      <ModuleSelectionPage
        onBack={() => setPage("topics")}
      />
    );
  }

  return null;
}