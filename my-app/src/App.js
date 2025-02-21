import { React } from "react";

import { LoginProvider } from "./useLoginStatus.js";
import AppContent from "./AppContent.js";

export default function App() {
  return (
    <LoginProvider>
      <AppContent />
    </LoginProvider>
  );
}
