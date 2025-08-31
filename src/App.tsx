import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import LoginInicial from "./pages/login-inicial";
import RecuperarContrasena from "./pages/recuperar-contrasena";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import PlaneacionIndex from "./pages/planeacion-index";
import Planeacion from "./pages/planeacion";
import Datos from "./pages/datos";
import CalendarioPersonal from "./pages/calendario";
import ConfiguracionPage from "./pages/configuracion";
import Espacios from "./pages/espacios";
import Perfil from "./pages/perfil";
import RestriccionesProfesores from "./pages/restricciones-profesores";
import BusquedaAvanzada from "./pages/busqueda-avanzada";
import Notificaciones from "./pages/notificaciones";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rutas de autenticación - FUERA del AppLayout */}
          <Route path="/" element={<LoginInicial />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas de la aplicación - DENTRO del AppLayout */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="planeacion" element={<PlaneacionIndex />} />
            <Route path="planeacion/:id" element={<Planeacion />} />
            <Route path="calendario" element={<CalendarioPersonal />} />
            <Route path="datos" element={<Datos />} />
            <Route path="configuracion" element={<ConfiguracionPage />} />
            <Route path="recursos" element={<Espacios />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="restricciones-profesores" element={<RestriccionesProfesores />} />
            <Route path="busqueda-avanzada" element={<BusquedaAvanzada />} />
            <Route path="notificaciones" element={<Notificaciones />} />
          </Route>
          
          {/* Ruta de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
