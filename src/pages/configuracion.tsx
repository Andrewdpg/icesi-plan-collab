import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  Settings,
  Calendar,
  Link,
  Shield,
  Clock,
  Mail,
  Users,
  Bell,
  ExternalLink,
  Trash2,
  Plus,
  Save,
  RotateCcw
} from "lucide-react";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'nacional' | 'institucional';
}

interface ICSLink {
  id: string;
  user: string;
  token: string;
  created: string;
  lastAccess: string;
}

const holidays: Holiday[] = [
  { id: '1', name: 'Día de Año Nuevo', date: '2024-01-01', type: 'nacional' },
  { id: '2', name: 'Día de los Reyes Magos', date: '2024-01-08', type: 'nacional' },
  { id: '3', name: 'Día de San José', date: '2024-03-25', type: 'nacional' },
  { id: '4', name: 'Jueves Santo', date: '2024-03-28', type: 'nacional' },
  { id: '5', name: 'Viernes Santo', date: '2024-03-29', type: 'nacional' },
  { id: '6', name: 'Día del Trabajo', date: '2024-05-01', type: 'nacional' },
  { id: '7', name: 'Ascensión del Señor', date: '2024-05-13', type: 'nacional' },
  { id: '8', name: 'Corpus Christi', date: '2024-06-03', type: 'nacional' },
  { id: '9', name: 'Sagrado Corazón de Jesús', date: '2024-06-10', type: 'nacional' },
  { id: '10', name: 'San Pedro y San Pablo', date: '2024-07-01', type: 'nacional' },
  { id: '11', name: 'Día de la Independencia', date: '2024-07-20', type: 'nacional' },
  { id: '12', name: 'Batalla de Boyacá', date: '2024-08-07', type: 'nacional' },
  { id: '13', name: 'Asunción de la Virgen', date: '2024-08-19', type: 'nacional' },
  { id: '14', name: 'Día de la Raza', date: '2024-10-14', type: 'nacional' },
  { id: '15', name: 'Todos los Santos', date: '2024-11-04', type: 'nacional' },
  { id: '16', name: 'Independencia de Cartagena', date: '2024-11-11', type: 'nacional' },
  { id: '17', name: 'Inmaculada Concepción', date: '2024-12-08', type: 'nacional' },
  { id: '18', name: 'Navidad', date: '2024-12-25', type: 'nacional' },
  { id: '19', name: 'Semana de Receso Institucional', date: '2024-06-17', type: 'institucional' },
  { id: '20', name: 'Clausura Primer Período', date: '2024-11-30', type: 'institucional' }
];

const icsLinks: ICSLink[] = [
  {
    id: '1',
    user: 'María García',
    token: 'ics_mg_2024_abc123',
    created: '2024-01-15',
    lastAccess: '2024-01-20 14:30'
  },
  {
    id: '2',
    user: 'Carlos Ruiz',
    token: 'ics_cr_2024_def456',
    created: '2024-01-10',
    lastAccess: '2024-01-18 09:15'
  },
  {
    id: '3',
    user: 'Ana López',
    token: 'ics_al_2024_ghi789',
    created: '2024-01-08',
    lastAccess: 'Nunca'
  }
];

export default function ConfiguracionPage() {
  const [newHoliday, setNewHoliday] = useState<{ name: string; date: string; type: 'nacional' | 'institucional' }>({ name: '', date: '', type: 'nacional' });
  const [settings, setSettings] = useState({
    allowedDomains: '@icesi.edu.co, @posgrados.icesi.edu.co',
    sessionTimeout: '120',
    maxConcurrentSessions: '3',
    autoLogout: true,
    maintenanceMode: false,
    emailNotifications: true,
    systemAlerts: true
  });

  const saveSettings = () => {
    toast({
      title: "Configuración Guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    });
  };

  const addHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      toast({
        title: "Festivo Agregado",
        description: `${newHoliday.name} ha sido agregado al calendario.`,
      });
      setNewHoliday({ name: '', date: '', type: 'nacional' });
    }
  };

  const revokeICSLink = (token: string, user: string) => {
    toast({
      title: "Enlace Revocado",
      description: `Se ha revocado el acceso ICS para ${user}.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Configuración del Sistema
        </h1>
        <p className="text-muted-foreground">
          Parámetros generales y configuraciones administrativas
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-soft hover:shadow-elegant transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <a href="/usuarios" className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Roles & Permisos</h3>
                <p className="text-sm text-muted-foreground">
                  Gestionar usuarios y permisos del sistema
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </a>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elegant transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <a href="/notificaciones" className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Plantillas de Notificación</h3>
                <p className="text-sm text-muted-foreground">
                  Configurar plantillas y canales de comunicación
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </a>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="holidays">Festivos</TabsTrigger>
          <TabsTrigger value="ics">Enlaces ICS</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          {/* General Settings */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración General
              </CardTitle>
              <CardDescription>
                Parámetros básicos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domains">Dominios Permitidos</Label>
                  <Input
                    id="domains"
                    value={settings.allowedDomains}
                    onChange={(e) => setSettings({...settings, allowedDomains: e.target.value})}
                    placeholder="@icesi.edu.co, @example.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Dominios de correo autorizados, separados por comas
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessions">Sesiones Concurrentes Máx.</Label>
                    <Input
                      id="sessions"
                      type="number"
                      value={settings.maxConcurrentSessions}
                      onChange={(e) => setSettings({...settings, maxConcurrentSessions: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* System Toggles */}
              <div className="space-y-4">
                <h4 className="font-medium">Opciones del Sistema</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cierre Automático de Sesión</Label>
                    <p className="text-xs text-muted-foreground">
                      Cerrar sesión automáticamente por inactividad
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoLogout}
                    onCheckedChange={(checked) => setSettings({...settings, autoLogout: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Mantenimiento</Label>
                    <p className="text-xs text-muted-foreground">
                      Activar para mantenimientos programados
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-xs text-muted-foreground">
                      Enviar notificaciones administrativas por email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas del Sistema</Label>
                    <p className="text-xs text-muted-foreground">
                      Mostrar alertas de sistema en la interfaz
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, systemAlerts: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Revertir
                </Button>
                <Button onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays" className="space-y-4">
          {/* Holidays Management */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Gestión de Festivos
              </CardTitle>
              <CardDescription>
                Configurar días festivos nacionales e institucionales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Holiday Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="holidayName">Nombre del Festivo</Label>
                  <Input
                    id="holidayName"
                    placeholder="Ej: Día de la Independencia"
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holidayDate">Fecha</Label>
                  <Input
                    id="holidayDate"
                    type="date"
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={newHoliday.type === 'nacional' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewHoliday({...newHoliday, type: 'nacional' as const})}
                    >
                      Nacional
                    </Button>
                    <Button
                      variant={newHoliday.type === 'institucional' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewHoliday({...newHoliday, type: 'institucional' as const})}
                    >
                      Institucional
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={addHoliday} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>

              {/* Holidays List */}
              <div className="space-y-2">
                {holidays.map((holiday) => (
                  <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{holiday.name}</p>
                        <p className="text-sm text-muted-foreground">{holiday.date}</p>
                      </div>
                      <Badge variant={holiday.type === 'nacional' ? 'default' : 'secondary'}>
                        {holiday.type === 'nacional' ? 'Nacional' : 'Institucional'}
                      </Badge>
                    </div>
                    {holiday.type === 'institucional' && (
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ics" className="space-y-4">
          {/* ICS Links Management */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Enlaces ICS
              </CardTitle>
              <CardDescription>
                Gestionar enlaces de calendario para usuarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {icsLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{link.user}</p>
                        <Badge variant="outline" className="text-xs font-mono">
                          {link.token}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Creado: {link.created}</span>
                        <span>Último acceso: {link.lastAccess}</span>
                      </div>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Revocar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Revocar enlace ICS?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción revocará permanentemente el acceso al calendario para {link.user}.
                            El usuario deberá solicitar un nuevo enlace.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => revokeICSLink(link.token, link.user)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Revocar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Información sobre enlaces ICS:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Los enlaces ICS permiten sincronizar calendarios con aplicaciones externas</li>
                  <li>• Cada usuario puede tener máximo un enlace activo</li>
                  <li>• Los enlaces se generan automáticamente al solicitar sincronización</li>
                  <li>• Se pueden revocar en cualquier momento por motivos de seguridad</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {/* Security Settings */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>
                Políticas de seguridad y acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Política de Contraseñas</Label>
                  <Textarea
                    id="passwordPolicy"
                    placeholder="Descripción de la política de contraseñas..."
                    className="h-20"
                    defaultValue="Mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos especiales. Renovación cada 90 días."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Intentos de Login Máx.</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      defaultValue="5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockoutTime">Tiempo de Bloqueo (minutos)</Label>
                    <Input
                      id="lockoutTime"
                      type="number"
                      defaultValue="15"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IPs Permitidas (Administración)</Label>
                  <Textarea
                    id="ipWhitelist"
                    placeholder="Lista de IPs permitidas para funciones administrativas..."
                    className="h-16"
                    defaultValue="192.168.1.0/24, 10.0.0.0/8"
                  />
                  <p className="text-xs text-muted-foreground">
                    Dejar vacío para permitir todas las IPs
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Configuraciones de Seguridad</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-xs text-muted-foreground">
                      Requerir 2FA para usuarios administrativos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registro de Actividad</Label>
                    <p className="text-xs text-muted-foreground">
                      Registrar todas las acciones del sistema
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Seguridad</Label>
                    <p className="text-xs text-muted-foreground">
                      Notificar intentos de acceso sospechosos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}