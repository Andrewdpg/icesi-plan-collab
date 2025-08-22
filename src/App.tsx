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
import Usuarios from "./pages/usuarios";
import Notificaciones from "./pages/notificaciones";
import CambiosUrgentes from "./pages/cambios-urgentes";
import CalendarioPersonal from "./pages/calendario";
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
            <Route path="datos" element={<Datos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="cambios-urgentes" element={<CambiosUrgentes />} />
            <Route path="aprobacion" element={<div className="p-8 text-center text-muted-foreground">Aprobación & Publicación - Próximamente</div>} />
            <Route path="auditoria" element={<div className="p-8 text-center text-muted-foreground">Auditoría - Próximamente</div>} />
            <Route path="configuracion" element={<div className="p-8 text-center text-muted-foreground">Configuración - Próximamente</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
