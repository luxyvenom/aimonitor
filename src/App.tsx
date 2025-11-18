import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Teams } from "./pages/Teams";
import { Monitoring } from "./pages/Monitoring";
import { Reports } from "./pages/Reports";
import { ImmutableLog } from "./pages/ImmutableLog";
import { MoreOptions } from "./pages/MoreOptions";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/immutable-log" element={<ImmutableLog />} />
          <Route path="/more-options" element={<MoreOptions />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
