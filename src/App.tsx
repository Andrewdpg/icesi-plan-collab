import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Planeacion from "./pages/planeacion";
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
            <Route path="planeacion" element={<Planeacion />} />
            <Route path="calendario" element={<div className="p-8 text-center text-muted-foreground">Calendario - Próximamente</div>} />
            <Route path="datos" element={<div className="p-8 text-center text-muted-foreground">Importar/Exportar Datos - Próximamente</div>} />
            <Route path="aprobacion" element={<div className="p-8 text-center text-muted-foreground">Aprobación & Publicación - Próximamente</div>} />
            <Route path="auditoria" element={<div className="p-8 text-center text-muted-foreground">Auditoría - Próximamente</div>} />
            <Route path="configuracion" element={<div className="p-8 text-center text-muted-foreground">Configuración - Próximamente</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
