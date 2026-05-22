// frontend/src/App.jsx
import React from 'react';
import { LangProvider } from './i18n.jsx';
import AhdatiExplainer from './components/AhdatiExplainer';

function App() {
  return (
    <LangProvider>
      <AhdatiExplainer />
    </LangProvider>
  );
}

export default App;
