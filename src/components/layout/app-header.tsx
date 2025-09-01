import { Bell, User, CheckCircle, AlertTriangle, Clock, X, MessageSquare, Calendar, FileText } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const breadcrumbMap: Record<string, string> = {
  "/app": "Inicio",
  "/app/planeacion": "Planeación de Cursos",
  "/app/datos": "Importar/Exportar Datos",
  "/app/calendario": "Calendario Personal",
  "/app/configuracion": "Configuración",
  "/app/recursos": "Recursos",
  "/app/perfil": "Perfil",
  "/app/restricciones-profesores": "Restricciones de Profesores",
  "/app/busqueda-avanzada": "Búsqueda Avanzada",
  "/app/notificaciones": "Notificaciones"
};

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  timestamp: string;
  read: boolean;
  action?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Planeación publicada",
    message: "La planeación del MBA ha sido publicada exitosamente",
    type: "success",
    timestamp: "Hace 5 minutos",
    read: false,
    action: "Ver planeación"
  },
  {
    id: "2",
    title: "Conflicto detectado",
    message: "Se encontró un conflicto de horario en Gestión Estratégica",
    type: "warning",
    timestamp: "Hace 15 minutos",
    read: false,
    action: "Revisar conflicto"
  },
  {
    id: "3",
    title: "Sugerencia aprobada",
    message: "Tu sugerencia para Marketing Digital fue aprobada",
    type: "info",
    timestamp: "Hace 1 hora",
    read: false,
    action: "Ver cambios"
  },
  {
    id: "4",
    title: "Recordatorio de sesión",
    message: "Tienes una sesión de planeación programada para mañana",
    type: "info",
    timestamp: "Hace 2 horas",
    read: true
  },
  {
    id: "5",
    title: "Nuevo docente asignado",
    message: "Dr. Roberto Silva ha sido asignado a Finanzas Corporativas",
    type: "info",
    timestamp: "Hace 3 horas",
    read: false,
    action: "Ver detalles"
  },
  {
    id: "6",
    title: "Exportación completada",
    message: "La exportación a Banner se completó exitosamente",
    type: "success",
    timestamp: "Hace 4 horas",
    read: true
  }
];

export function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  // Función para obtener el breadcrumb, incluyendo rutas dinámicas
  const getBreadcrumb = (path: string) => {
    // Rutas dinámicas de planeación
    if (path.startsWith('/app/planeacion/') && path !== '/app/planeacion') {
      return "Planeación de Cursos";
    }
    return breadcrumbMap[path] || "Icesi Posgrados";
  };
  
  const breadcrumb = getBreadcrumb(currentPath);

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.slice(0, 3); // Solo mostrar las 3 más recientes

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleViewAllNotifications = () => {
    navigate('/app/notificaciones');
  };

  return (
    <header className="h-16 border-b border-[#4444cc] bg-[#5555ea] flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm rounded-br-lg">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      {/* Center breadcrumb - hidden on mobile */}
      <div className="hidden md:block">
        <h1 className="text-lg font-medium text-white">{breadcrumb}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="relative hover:bg-[#4444cc] text-white hover:text-white rounded-lg">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#e9683b] text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-80 border-[#e3e4ec] bg-white rounded-lg" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-[#3f4159]">Notificaciones</p>
                  <p className="text-xs leading-none text-[#596b88]">
                    {unreadCount} sin leer
                  </p>
                </div>
                {unreadCount > 0 && (
                                     <Button 
                     variant="ghost" 
                     size="sm" 
                     onClick={markAllAsRead}
                     className="text-xs text-[#5555ea] hover:text-[#4444cc] hover:bg-[#e4e9ff] rounded-lg"
                   >
                    Marcar todas como leídas
                  </Button>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            
            {recentNotifications.length === 0 ? (
              <div className="p-4 text-center text-[#596b88]">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No hay notificaciones</p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentNotifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    className={`p-3 hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159] ${!notification.read ? 'bg-[#f7f8fe]' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-[#3f4159]' : 'text-[#596b88]'}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-[#596b88] ml-2">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-[#596b88] mt-1">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <button className="text-xs text-[#5555ea] hover:text-[#4444cc] mt-2 font-medium">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
            
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            <DropdownMenuItem 
              className="hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159] justify-center cursor-pointer"
              onClick={handleViewAllNotifications}
            >
              <span className="text-sm text-[#5555ea]">Ver todas las notificaciones</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-9 w-9 hover:bg-[#4444cc] text-white hover:text-white rounded-lg">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/user.jpg" alt="Usuario" />
                <AvatarFallback className="bg-white text-[#5555ea]">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56 border-[#e3e4ec] bg-white rounded-lg" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-[#3f4159]">María García</p>
                <p className="text-xs leading-none text-[#596b88]">
                  coordinadora@icesi.edu.co
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            <DropdownMenuItem 
              className="hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159]"
              onClick={() => navigate('/app/perfil')}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159]">
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            <DropdownMenuItem className="text-[#e9683b] hover:bg-[#fdecec] focus:bg-[#fdecec]">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}