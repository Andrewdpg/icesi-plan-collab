import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import PlaneacionIndex from "./pages/planeacion-index";
import Planeacion from "./pages/planeacion";
import Datos from "./pages/datos";
import CambiosUrgentes from "./pages/cambios-urgentes";
import CalendarioPersonal from "./pages/calendario";
import ConfiguracionPage from "./pages/configuracion";
import MiHorario from "./pages/mi-horario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="planeacion" element={<PlaneacionIndex />} />
            <Route path="planeacion/:id" element={<Planeacion />} />
            <Route path="calendario" element={<CalendarioPersonal />} />
            <Route path="mi-horario" element={<MiHorario />} />
            <Route path="datos" element={<Datos />} />
            <Route path="cambios-urgentes" element={<CambiosUrgentes />} />
            <Route path="configuracion" element={<ConfiguracionPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
