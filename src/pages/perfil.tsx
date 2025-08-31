import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Monitor,
  Bell,
  Shield,
  Save,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  MonitorSmartphone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AccessLog {
  id: string;
  fecha: string;
  hora: string;
  ip: string;
  dispositivo: string;
  ubicacion: string;
  estado: "exitoso" | "fallido";
}

interface NotificationPreference {
  id: string;
  tipo: string;
  email: boolean;
  inApp: boolean;
}

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "María González",
    correo: "mgonzalez@icesi.edu.co",
    rol: "Director",
    programa: "MBA",
    telefono: "+57 300 123 4567",
    zonaHoraria: "America/Bogota",
    idioma: "español"
  });

  const [preferences, setPreferences] = useState({
    notificarPublicacion: true,
    notificarCambios: true,
    notificarSugerencias: false,
    recordatorios: true,
    resumenSemanal: false
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationPreference[]>([
    {
      id: "1",
      tipo: "Publicación de planeación",
      email: true,
      inApp: true
    },
    {
      id: "2", 
      tipo: "Cambios en horarios",
      email: true,
      inApp: true
    },
    {
      id: "3",
      tipo: "Sugerencias aprobadas/rechazadas",
      email: true,
      inApp: true
    },
    {
      id: "4",
      tipo: "Recordatorios de clases",
      email: false,
      inApp: true
    }
  ]);

  const accessLogs: AccessLog[] = [
    {
      id: "1",
      fecha: "2024-01-15",
      hora: "11:20:34",
      ip: "192.168.1.100",
      dispositivo: "Chrome - Windows 10",
      ubicacion: "Cali, Colombia",
      estado: "exitoso"
    },
    {
      id: "2",
      fecha: "2024-01-14",
      hora: "16:45:22",
      ip: "192.168.1.100",
      dispositivo: "Chrome - Windows 10",
      ubicacion: "Cali, Colombia",
      estado: "exitoso"
    },
    {
      id: "3",
      fecha: "2024-01-13",
      hora: "09:15:10",
      ip: "10.0.0.50",
      dispositivo: "Safari - iPhone",
      ubicacion: "Bogotá, Colombia",
      estado: "exitoso"
    },
    {
      id: "4",
      fecha: "2024-01-12",
      hora: "14:30:45",
      ip: "192.168.1.100",
      dispositivo: "Chrome - Windows 10",
      ubicacion: "Cali, Colombia",
      estado: "fallido"
    }
  ];

  const handleSave = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tus configuraciones han sido guardadas exitosamente.",
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (id: string, channel: 'email' | 'inApp') => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, [channel]: !setting[channel] }
          : setting
      )
    );
  };

  const getEstadoColor = (estado: string) => {
    return estado === 'exitoso' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getEstadoIcon = (estado: string) => {
    return estado === 'exitoso' 
      ? <CheckCircle className="h-4 w-4" />
      : <AlertCircle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3f4159]">Mi Perfil</h1>
        <p className="text-[#596b88] mt-2">
          Gestiona tu información personal y preferencias del sistema
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border-[#e3e4ec]">
          <TabsTrigger value="perfil" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="accesos" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-2" />
            Accesos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6">
          <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#3f4159]">Información Personal</CardTitle>
                  <CardDescription className="text-[#596b88]">
                    Datos de tu cuenta y configuración básica
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <Input
                    value={userData.nombre}
                    onChange={(e) => setUserData(prev => ({ ...prev, nombre: e.target.value }))}
                    disabled={!isEditing}
                    className="bg-[#f7f8fe] rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Correo institucional</Label>
                  <Input
                    value={userData.correo}
                    disabled
                    className="bg-[#f7f8fe] text-[#596b88] rounded-lg"
                  />
                  <p className="text-xs text-[#596b88]">No editable</p>
                </div>
                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Input
                    value={userData.rol}
                    disabled
                    className="bg-[#f7f8fe] text-[#596b88] rounded-lg"
                  />
                  <p className="text-xs text-[#596b88]">No editable</p>
                </div>
                <div className="space-y-2">
                  <Label>Programa</Label>
                  <Input
                    value={userData.programa}
                    disabled
                    className="bg-[#f7f8fe] text-[#596b88] rounded-lg"
                  />
                  <p className="text-xs text-[#596b88]">No editable</p>
                </div>
                <div className="space-y-2">
                  <Label>Teléfono (opcional)</Label>
                  <Input
                    value={userData.telefono}
                    onChange={(e) => setUserData(prev => ({ ...prev, telefono: e.target.value }))}
                    disabled={!isEditing}
                    className="bg-[#f7f8fe] rounded-lg"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <select
                    value={userData.zonaHoraria}
                    onChange={(e) => setUserData(prev => ({ ...prev, zonaHoraria: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-2 border border-[#e3e4ec] rounded-lg bg-[#f7f8fe]"
                  >
                    <option value="America/Bogota">Colombia (Bogotá)</option>
                    <option value="America/New_York">Estados Unidos (Nueva York)</option>
                    <option value="Europe/Madrid">España (Madrid)</option>
                    <option value="America/Mexico_City">México (Ciudad de México)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <select
                    value={userData.idioma}
                    onChange={(e) => setUserData(prev => ({ ...prev, idioma: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-2 border border-[#e3e4ec] rounded-lg bg-[#f7f8fe]"
                  >
                    <option value="español">Español</option>
                    <option value="inglés">English</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-lg">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-6">
          <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Preferencias de Notificación</CardTitle>
              <CardDescription className="text-[#596b88]">
                Configura cómo recibir las notificaciones del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                  <h4 className="font-medium text-[#3f4159]">Tipos de Notificación</h4>
                  <div className="space-y-3">
                    {notificationSettings.map((setting) => (
                      <div key={setting.id} className="border border-[#e3e4ec] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-[#3f4159]">{setting.tipo}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={setting.email}
                              onCheckedChange={() => handleNotificationChange(setting.id, 'email')}
                            />
                            <Label className="text-sm flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={setting.inApp}
                              onCheckedChange={() => handleNotificationChange(setting.id, 'inApp')}
                            />
                            <Label className="text-sm flex items-center gap-1">
                              <Monitor className="h-3 w-3" />
                              En la app
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-6">
          <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Seguridad</CardTitle>
              <CardDescription className="text-[#596b88]">
                Gestiona la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-[#e3e4ec] rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Cambiar Contraseña</Label>
                    <p className="text-sm text-[#596b88]">
                      Última actualización: hace 30 días
                    </p>
                  </div>
                  <Button variant="outline" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Cambiar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-[#e3e4ec] rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Autenticación de dos factores</Label>
                    <p className="text-sm text-[#596b88]">
                      Añade una capa extra de seguridad a tu cuenta
                    </p>
                  </div>
                  <Button variant="outline" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    Configurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accesos" className="space-y-6">
          <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Historial de Accesos</CardTitle>
              <CardDescription className="text-[#596b88]">
                Registro de tus últimos accesos al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border border-[#e3e4ec] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getEstadoColor(log.estado)}`}>
                        {getEstadoIcon(log.estado)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#3f4159]">{log.fecha} {log.hora}</span>
                          <Badge variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88] rounded-lg">
                            {log.ip}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#596b88] flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MonitorSmartphone className="h-3 w-3" />
                            {log.dispositivo}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.ubicacion}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
