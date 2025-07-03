import React from "react";
import PromptList from "./components/prompt-list";

export default function Prompts() {
  return (
    <div className="max-w-7x my-10 mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Промпты</h1>
      <PromptList />
    </div>
  );
}
