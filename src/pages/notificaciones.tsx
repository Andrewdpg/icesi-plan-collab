import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Clock,
  Trash2,
  CheckSquare,
  Square,
  Bell,
  Archive,
  RefreshCw
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  timestamp: string;
  read: boolean;
  action?: string;
  category?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Planeación publicada",
    message: "La planeación del MBA ha sido publicada exitosamente",
    type: "success",
    timestamp: "Hace 5 minutos",
    read: false,
    action: "Ver planeación",
    category: "planeacion"
  },
  {
    id: "2",
    title: "Conflicto detectado",
    message: "Se encontró un conflicto de horario en Gestión Estratégica",
    type: "warning",
    timestamp: "Hace 15 minutos",
    read: false,
    action: "Revisar conflicto",
    category: "conflictos"
  },
  {
    id: "3",
    title: "Sugerencia aprobada",
    message: "Tu sugerencia para Marketing Digital fue aprobada",
    type: "info",
    timestamp: "Hace 1 hora",
    read: false,
    action: "Ver cambios",
    category: "sugerencias"
  },
  {
    id: "4",
    title: "Recordatorio de sesión",
    message: "Tienes una sesión de planeación programada para mañana",
    type: "info",
    timestamp: "Hace 2 horas",
    read: true,
    category: "recordatorios"
  },
  {
    id: "5",
    title: "Nuevo docente asignado",
    message: "Dr. Roberto Silva ha sido asignado a Finanzas Corporativas",
    type: "info",
    timestamp: "Hace 3 horas",
    read: false,
    action: "Ver detalles",
    category: "docentes"
  },
  {
    id: "6",
    title: "Exportación completada",
    message: "La exportación a Banner se completó exitosamente",
    type: "success",
    timestamp: "Hace 4 horas",
    read: true,
    category: "exportacion"
  },
  {
    id: "7",
    title: "Error en importación",
    message: "Error al importar datos de estudiantes - revisar formato",
    type: "error",
    timestamp: "Hace 5 horas",
    read: false,
    action: "Revisar archivo",
    category: "importacion"
  },
  {
    id: "8",
    title: "Cambio de horario",
    message: "Se cambió el horario de Finanzas Corporativas - Grupo 02",
    type: "warning",
    timestamp: "Hace 6 horas",
    read: true,
    action: "Ver cambios",
    category: "horarios"
  }
];

export default function Notificaciones() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [activeTab, setActiveTab] = useState("todas");

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Éxito</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast({
      title: "Notificación marcada como leída",
      description: "La notificación se ha marcado como leída",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Todas las notificaciones marcadas como leídas",
      description: "Se han marcado todas las notificaciones como leídas",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notificación eliminada",
      description: "La notificación se ha eliminado correctamente",
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "todos" || notification.type === selectedType;
    const matchesCategory = selectedCategory === "todos" || notification.category === selectedCategory;
    const matchesTab = activeTab === "todas" || 
                      (activeTab === "no-leidas" && !notification.read) ||
                      (activeTab === "leidas" && notification.read);

    return matchesSearch && matchesType && matchesCategory && matchesTab;
  });

  const categories = [
    { value: "todos", label: "Todas las categorías" },
    { value: "planeacion", label: "Planeación" },
    { value: "conflictos", label: "Conflictos" },
    { value: "sugerencias", label: "Sugerencias" },
    { value: "recordatorios", label: "Recordatorios" },
    { value: "docentes", label: "Docentes" },
    { value: "exportacion", label: "Exportación" },
    { value: "importacion", label: "Importación" },
    { value: "horarios", label: "Horarios" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600 mt-1">
            Gestiona todas tus notificaciones del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-[#e3e4ec] text-[#5555ea] hover:bg-[#e4e9ff]"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
          <Button 
            variant="outline"
            className="border-[#e3e4ec] text-[#5555ea] hover:bg-[#e4e9ff]"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#e3e4ec]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-[#5555ea]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e3e4ec]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No leídas</p>
                <p className="text-2xl font-bold text-[#5555ea]">{unreadCount}</p>
              </div>
              <Square className="h-8 w-8 text-[#5555ea]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e3e4ec]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leídas</p>
                <p className="text-2xl font-bold text-gray-500">{readCount}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-[#e3e4ec]">
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar notificaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#e3e4ec] focus:border-[#5555ea]"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-[#e3e4ec] focus:border-[#5555ea]">
                <SelectValue placeholder="Tipo de notificación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="success">Éxito</SelectItem>
                <SelectItem value="warning">Advertencia</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Información</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-[#e3e4ec] focus:border-[#5555ea]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="border-[#e3e4ec]">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="todas">Todas ({notifications.length})</TabsTrigger>
              <TabsTrigger value="no-leidas">No leídas ({unreadCount})</TabsTrigger>
              <TabsTrigger value="leidas">Leídas ({readCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay notificaciones</h3>
                  <p className="text-gray-600">No se encontraron notificaciones con los filtros aplicados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all ${
                        notification.read 
                          ? 'bg-white border-[#e3e4ec]' 
                          : 'bg-[#f7f8fe] border-[#e4e9ff]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-sm font-medium ${
                                notification.read ? 'text-gray-600' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              {getTypeBadge(notification.type)}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {notification.timestamp}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 ${
                            notification.read ? 'text-gray-500' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            {!notification.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs border-[#e3e4ec] text-[#5555ea] hover:bg-[#e4e9ff]"
                              >
                                <CheckSquare className="h-3 w-3 mr-1" />
                                Marcar como leída
                              </Button>
                            )}
                            {notification.action && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-[#5555ea] hover:text-[#4444cc] hover:bg-[#e4e9ff]"
                              >
                                {notification.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
