import React from "react";
import PromptList from "./components/prompt-list";

export default function Prompts() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Prompts</h1>
      <PromptList />
    </div>
  );
}
