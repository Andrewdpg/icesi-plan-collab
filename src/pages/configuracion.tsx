import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Edit,
  Send,
  MessageSquare,
  XCircle,
  Eye,
  Download,
  Search,
  Filter,
  User,
  Activity,
  UserX,
  RefreshCw,
  MoreHorizontal,
  UsersIcon,
  Upload,
} from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { SelectItem } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "nacional" | "institucional";
}

interface ICSLink {
  id: string;
  user: string;
  token: string;
  created: string;
  lastAccess: string;
}

const holidays: Holiday[] = [
  { id: "1", name: "Día de Año Nuevo", date: "2024-01-01", type: "nacional" },
  {
    id: "2",
    name: "Día de los Reyes Magos",
    date: "2024-01-08",
    type: "nacional",
  },
  { id: "3", name: "Día de San José", date: "2024-03-25", type: "nacional" },
  { id: "4", name: "Jueves Santo", date: "2024-03-28", type: "nacional" },
  { id: "5", name: "Viernes Santo", date: "2024-03-29", type: "nacional" },
  { id: "6", name: "Día del Trabajo", date: "2024-05-01", type: "nacional" },
  {
    id: "7",
    name: "Ascensión del Señor",
    date: "2024-05-13",
    type: "nacional",
  },
  { id: "8", name: "Corpus Christi", date: "2024-06-03", type: "nacional" },
  {
    id: "9",
    name: "Sagrado Corazón de Jesús",
    date: "2024-06-10",
    type: "nacional",
  },
  {
    id: "10",
    name: "San Pedro y San Pablo",
    date: "2024-07-01",
    type: "nacional",
  },
  {
    id: "11",
    name: "Día de la Independencia",
    date: "2024-07-20",
    type: "nacional",
  },
  { id: "12", name: "Batalla de Boyacá", date: "2024-08-07", type: "nacional" },
  {
    id: "13",
    name: "Asunción de la Virgen",
    date: "2024-08-19",
    type: "nacional",
  },
  { id: "14", name: "Día de la Raza", date: "2025-10-14", type: "nacional" },
  { id: "15", name: "Todos los Santos", date: "2025-11-04", type: "nacional" },
  {
    id: "16",
    name: "Independencia de Cartagena",
    date: "2025-11-11",
    type: "nacional",
  },
  {
    id: "17",
    name: "Inmaculada Concepción",
    date: "2025-12-08",
    type: "nacional",
  },
  { id: "18", name: "Navidad", date: "2025-12-25", type: "nacional" },
  {
    id: "19",
    name: "Semana de Receso Institucional",
    date: "2024-06-17",
    type: "institucional",
  },
  {
    id: "20",
    name: "Clausura Primer Período",
    date: "2025-11-30",
    type: "institucional",
  },
];

const icsLinks: ICSLink[] = [
  {
    id: "1",
    user: "María García",
    token: "ics_mg_2024_abc123",
    created: "2024-01-15",
    lastAccess: "2024-01-20 14:30",
  },
  {
    id: "2",
    user: "Carlos Ruiz",
    token: "ics_cr_2024_def456",
    created: "2024-01-10",
    lastAccess: "2024-01-18 09:15",
  },
  {
    id: "3",
    user: "Ana López",
    token: "ics_al_2024_ghi789",
    created: "2024-01-08",
    lastAccess: "Nunca",
  },
];

const plantillas = [
  {
    id: 1,
    evento: "Publicación de planeación",
    canal: "Email",
    asunto: "📅 Planeación académica publicada - {programa} {periodo}",
    ultimaEdicion: "2024-01-10",
  },
  {
    id: 2,
    evento: "Cambio aprobado",
    canal: "Email",
    asunto: "✅ Cambio aprobado en tu horario - {curso}",
    ultimaEdicion: "2024-01-08",
  },
  {
    id: 3,
    evento: "Reprogramación urgente",
    canal: "WhatsApp",
    asunto: "🚨 Cambio urgente de horario - {curso} {fecha}",
    ultimaEdicion: "2024-01-05",
  },
];

// Mock data for envíos
const envios = [
  {
    id: 1,
    destinatarios: "MBA Cohorte 3 (45 personas)",
    asunto: "📅 Planeación académica publicada - MBA 2026-01",
    estado: "enviado",
    aperturas: "42/45",
    fecha: "2024-01-15 10:30",
    urgencia: "normal",
  },
  {
    id: 2,
    destinatarios: "Docentes Finanzas (8 personas)",
    asunto: "🚨 Cambio urgente - Finanzas Corporativas",
    estado: "programado",
    aperturas: "-",
    fecha: "2024-01-16 08:00",
    urgencia: "urgente",
  },
];



const usuarios = [
  {
    id: 1,
    nombre: "María González",
    correo: "mgonzalez@icesi.edu.co",
    roles: ["Director"],
    ambito: "MBA, Esp. Finanzas",
    estado: "activo",
    ultimoAcceso: "2024-01-15 09:30"
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    correo: "cmendoza@icesi.edu.co",
    roles: ["Docente"],
    ambito: "Todos los programas",
    estado: "activo",
    ultimoAcceso: "2024-01-14 16:45"
  },
  {
    id: 3,
    nombre: "Ana Patricia Ruiz",
    correo: "apruiz@icesi.edu.co",
    roles: ["Oficina de Posgrados"],
    ambito: "Todos los programas",
    estado: "activo",
    ultimoAcceso: "2024-01-15 11:20"
  }
];

// Mock data for roles and permissions
const rolesPermisos = [
  {
    rol: "Estudiante",
    descripcion: "Acceso de solo lectura al calendario personal",
    permisos: {
      planeacion: { ver: true, editar: false, publicar: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false },
      datos: { importar: false, exportar: false }
    }
  },
  {
    rol: "Docente", 
    descripcion: "Puede proponer cambios y ver su calendario",
    permisos: {
      planeacion: { ver: true, editar: false, publicar: false },
      sugerencias: { ver: true, proponer: true, decidir: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false }
    }
  },
  {
    rol: "Director",
    descripcion: "Gestiona planeación de sus programas asignados",
    permisos: {
      planeacion: { ver: true, editar: true, publicar: false },
      sugerencias: { ver: true, proponer: true, decidir: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false }
    }
  },
  {
    rol: "Oficina de Posgrados",
    descripcion: "Control completo de planeación y publicación",
    permisos: {
      planeacion: { ver: true, editar: true, publicar: true },
      sugerencias: { ver: true, proponer: true, decidir: true },
      datos: { importar: true, exportar: true },
      usuarios: { ver: true, editar: true },
      notificaciones: { ver: true, plantillas: true, enviar: true },
      auditoria: { ver: true }
    }
  }
];



export default function ConfiguracionPage() {
  const [newHoliday, setNewHoliday] = useState<{
    name: string;
    date: string;
    type: "nacional" | "institucional";
  }>({ name: "", date: "", type: "nacional" });
  const [settings, setSettings] = useState({
    allowedDomains: "@icesi.edu.co, @posgrados.icesi.edu.co",
    sessionTimeout: "120",
    maxConcurrentSessions: "3",
    autoLogout: true,
    maintenanceMode: false,
    emailNotifications: true,
    systemAlerts: true,
    hourFormat: "24h",
  });

  const [modalPlantilla, setModalPlantilla] = useState(false);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<any>(null);

  const [configuracion, setConfiguracion] = useState({
    notificarPublicacion: true,
    notificarCambios72h: true,
    habilitarWhatsApp: false,
    nombreRemitente: "Oficina de Posgrados Icesi",
    correoReplyTo: "posgrados@icesi.edu.co",
    pieInstitucional: "Universidad Icesi - Calle 18 No 122-135, Cali, Colombia",
  });




  const [filtros, setFiltros] = useState({
    busqueda: "",
    rol: "all",
    estado: "all"
  });
  const [modalNuevo, setModalNuevo] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    roles: [] as string[],
    programas: [] as string[]
  });

  const usuariosFiltrados = usuarios.filter(usuario => {
    return (
      usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(filtros.busqueda.toLowerCase())
    ) &&
    (filtros.rol === "all" || filtros.rol === "" || usuario.roles.includes(filtros.rol)) &&
    (filtros.estado === "all" || filtros.estado === "" || usuario.estado === filtros.estado);
  });



  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "enviado":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "programado":
        return <Clock className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "WhatsApp":
        return <Smartphone className="h-4 w-4" />;
      case "In-app":
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

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
      setNewHoliday({ name: "", date: "", type: "nacional" });
    }
  };

  const revokeICSLink = (token: string, user: string) => {
    toast({
      title: "Enlace Revocado",
      description: `Se ha revocado el acceso ICS para ${user}.`,
      variant: "destructive",
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

      <Tabs defaultValue="notificaciones" className="space-y-4">
        <TabsList className="rounded-lg">
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="holidays">Festivos</TabsTrigger>
                  <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        <TabsTrigger value="roles">Roles & Permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="notificaciones" className="space-y-6">
           <div className="space-y-2">
          <Label>Formato de hora</Label>
          <Select
            value={settings.hourFormat}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, hourFormat: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 horas (13:00)</SelectItem>
              <SelectItem value="12h">12 horas (1:00 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones
              </CardTitle>
              <CardDescription>
                Gestiona plantillas, envíos y preferencias de notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="rounded-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Plantillas de Notificación
                    </CardTitle>
                    <Button onClick={() => setModalPlantilla(true)} className="rounded-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva plantilla
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evento</TableHead>
                        <TableHead>Canal</TableHead>
                        <TableHead>Asunto</TableHead>
                        <TableHead>Última edición</TableHead>
                        <TableHead className="w-[100px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plantillas.map((plantilla) => (
                        <TableRow key={plantilla.id}>
                          <TableCell className="font-medium">
                            {plantilla.evento}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCanalIcon(plantilla.canal)}
                              {plantilla.canal}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md truncate text-sm">
                            {plantilla.asunto}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {plantilla.ultimaEdicion}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setPlantillaSeleccionada(plantilla);
                                  setModalPlantilla(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Remitente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre del remitente</Label>
                      <Input
                        value={configuracion.nombreRemitente}
                        onChange={(e) =>
                          setConfiguracion((prev) => ({
                            ...prev,
                            nombreRemitente: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Correo reply-to</Label>
                      <Input
                        type="email"
                        value={configuracion.correoReplyTo}
                        onChange={(e) =>
                          setConfiguracion((prev) => ({
                            ...prev,
                            correoReplyTo: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Pie institucional</Label>
                    <Textarea
                      rows={3}
                      value={configuracion.pieInstitucional}
                      onChange={(e) =>
                        setConfiguracion((prev) => ({
                          ...prev,
                          pieInstitucional: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button>Guardar configuración</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Historial de Envíos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Estado</TableHead>
                        <TableHead>Destinatarios</TableHead>
                        <TableHead>Asunto</TableHead>
                        <TableHead>Aperturas</TableHead>
                        <TableHead>Fecha/Hora</TableHead>
                        <TableHead>Urgencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {envios.map((envio) => (
                        <TableRow key={envio.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getEstadoIcon(envio.estado)}
                              <span className="capitalize">{envio.estado}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {envio.destinatarios}
                          </TableCell>
                          <TableCell className="max-w-md truncate text-sm">
                            {envio.asunto}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{envio.aperturas}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {envio.fecha}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                envio.urgencia === "urgente"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {envio.urgencia}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Modal de plantilla */}
              <Dialog open={modalPlantilla} onOpenChange={setModalPlantilla}>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>
                      {plantillaSeleccionada
                        ? "Editar plantilla"
                        : "Nueva plantilla"}
                    </DialogTitle>
                    <DialogDescription>
                      Define el contenido de las notificaciones automáticas del
                      sistema.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Evento</Label>
                        <Select
                          defaultValue={plantillaSeleccionada?.evento || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar evento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="publicacion">
                              Publicación de planeación
                            </SelectItem>
                            <SelectItem value="cambio-aprobado">
                              Cambio aprobado
                            </SelectItem>
                            <SelectItem value="cambio-rechazado">
                              Cambio rechazado
                            </SelectItem>
                            <SelectItem value="cambio-aula">
                              Cambio de aula
                            </SelectItem>
                            <SelectItem value="reprogramacion">
                              Reprogramación
                            </SelectItem>
                            <SelectItem value="cancelacion">
                              Cancelación
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Canal</Label>
                        <Select
                          defaultValue={plantillaSeleccionada?.canal || "Email"}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                            <SelectItem value="In-app">In-app</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Asunto</Label>
                      <Input
                        placeholder="📅 {programa} - Planeación actualizada"
                        defaultValue={plantillaSeleccionada?.asunto || ""}
                      />
                      <p className="text-xs text-muted-foreground">
                        Variables disponibles: {"{programa}"}, {"{cohorte}"},{" "}
                        {"{curso}"}, {"{docente}"}, {"{fecha}"}, {"{hora}"},{" "}
                        {"{aula}"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Cuerpo del mensaje</Label>
                      <Textarea
                        rows={8}
                        placeholder="Estimado/a estudiante,&#10;&#10;Te informamos que la planeación académica del programa {programa} ha sido actualizada.&#10;&#10;Puedes consultar tu calendario actualizado en: {link_calendario}"
                        className="resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Vista previa - Desktop
                        </Label>
                        <div className="mt-2 p-4 border rounded-lg bg-card text-sm">
                          <div className="font-semibold mb-2">
                            📅 MBA - Planeación actualizada
                          </div>
                          <p>Estimado/a estudiante,</p>
                          <p>
                            Te informamos que la planeación académica del
                            programa MBA ha sido actualizada...
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Vista previa - Móvil
                        </Label>
                        <div className="mt-2 p-3 border rounded-lg bg-card text-xs max-w-[200px]">
                          <div className="font-semibold mb-1">
                            📅 MBA - Planeación...
                          </div>
                          <p>Estimado/a estudiante, Te informamos que la...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar prueba
                      </Button>
                      {plantillaSeleccionada && (
                        <Button variant="outline">Restaurar por defecto</Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setModalPlantilla(false)}
                      >
                        Cancelar
                      </Button>
                      <Button>Guardar plantilla</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                    onChange={(e) =>
                      setNewHoliday({ ...newHoliday, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holidayDate">Fecha</Label>
                  <Input
                    id="holidayDate"
                    type="date"
                    value={newHoliday.date}
                    onChange={(e) =>
                      setNewHoliday({ ...newHoliday, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        newHoliday.type === "nacional" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setNewHoliday({
                          ...newHoliday,
                          type: "nacional" as const,
                        })
                      }
                    >
                      Nacional
                    </Button>
                    <Button
                      variant={
                        newHoliday.type === "institucional"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setNewHoliday({
                          ...newHoliday,
                          type: "institucional" as const,
                        })
                      }
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
              {/* Holidays List as Table */}
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="w-[150px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holidays.map((holiday) => (
                        <TableRow key={holiday.id}>
                          <TableCell className="font-medium">{holiday.name}</TableCell>
                          <TableCell>{holiday.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={holiday.type === "nacional" ? "default" : "secondary"}
                            >
                              {holiday.type === "nacional"
                                ? "Festivo Nacional"
                                : "Fecha Especial"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Gestión de Usuarios
              </CardTitle>
              <CardDescription>
                Agregar, editar y desactivar usuarios
              </CardDescription>
            </CardHeader>
            <CardContent>

            <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="busqueda">Buscar usuarios</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="busqueda"
                      placeholder="Buscar por nombre o correo..."
                      className="pl-10"
                      value={filtros.busqueda}
                      onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="w-40">
                  <Label>Rol</Label>
                  <Select value={filtros.rol} onValueChange={(value) => 
                    setFiltros(prev => ({ ...prev, rol: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Docente">Docente</SelectItem>
                      <SelectItem value="Oficina de Posgrados">Oficina de Posgrados</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Label>Estado</Label>
                  <Select value={filtros.estado} onValueChange={(value) => 
                    setFiltros(prev => ({ ...prev, estado: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Dialog open={modalNuevo} onOpenChange={setModalNuevo}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Nuevo usuario</DialogTitle>
                        <DialogDescription>
                          Agrega un nuevo usuario al sistema con los roles y permisos correspondientes.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre completo</Label>
                            <Input
                              placeholder="María González Pérez"
                              value={nuevoUsuario.nombre}
                              onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="correo">Correo institucional</Label>
                            <Input
                              type="email"
                              placeholder="mgonzalez@icesi.edu.co"
                              value={nuevoUsuario.correo}
                              onChange={(e) => setNuevoUsuario(prev => ({ ...prev, correo: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono (opcional)</Label>
                          <Input
                            placeholder="+57 300 123 4567"
                            value={nuevoUsuario.telefono}
                            onChange={(e) => setNuevoUsuario(prev => ({ ...prev, telefono: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Roles</Label>
                          <div className="space-y-2">
                            {["Estudiante", "Docente", "Director", "Oficina de Posgrados"].map(rol => (
                              <div key={rol} className="flex items-center space-x-2">
                                <Checkbox
                                  id={rol}
                                  checked={nuevoUsuario.roles.includes(rol)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNuevoUsuario(prev => ({ ...prev, roles: [...prev.roles, rol] }));
                                    } else {
                                      setNuevoUsuario(prev => ({ ...prev, roles: prev.roles.filter(r => r !== rol) }));
                                    }
                                  }}
                                />
                                <Label htmlFor={rol}>{rol}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {nuevoUsuario.roles.includes("Director") && (
                          <div className="space-y-2">
                            <Label>Programas asignados</Label>
                            <div className="space-y-2">
                              {["MBA", "Especialización en Finanzas", "Maestría en Mercadeo"].map(programa => (
                                <div key={programa} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={programa}
                                    checked={nuevoUsuario.programas.includes(programa)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNuevoUsuario(prev => ({ ...prev, programas: [...prev.programas, programa] }));
                                      } else {
                                        setNuevoUsuario(prev => ({ ...prev, programas: prev.programas.filter(p => p !== programa) }));
                                      }
                                    }}
                                  />
                                  <Label htmlFor={programa}>{programa}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalNuevo(false)}>
                          Cancelar
                        </Button>
                        <Button>
                          Guardar usuario
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de usuarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Usuarios ({usuariosFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Ámbito</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último acceso</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nombre}</TableCell>
                      <TableCell>{usuario.correo}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {usuario.roles.map(rol => (
                            <Badge key={rol} variant="outline" className="text-xs">
                              {rol}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {usuario.ambito}
                      </TableCell>
                      <TableCell>
                        <Badge variant={usuario.estado === 'activo' ? 'default' : 'secondary'}>
                          {usuario.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {usuario.ultimoAcceso}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reset enlace ICS
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver historial
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Desactivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            </CardContent>
          </Card>
          {/* Panel de acciones usuarios */}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">

                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Matriz de Roles & Permisos
                </CardTitle>
                <CardDescription>
                  Configura los roles y permisos para los usuarios
                </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Revertir permisos</Button>
                  <Button>Guardar cambios</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rolesPermisos.map((rolData) => (
                  <div key={rolData.rol} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{rolData.rol}</h3>
                        <p className="text-sm text-muted-foreground">{rolData.descripcion}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(rolData.permisos).map(([modulo, permisos]) => (
                        <div key={modulo} className="space-y-2">
                          <h4 className="font-medium text-sm capitalize">{modulo}</h4>
                          <div className="space-y-1">
                            {Object.entries(permisos).map(([permiso, value]) => (
                              <div key={permiso} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={Boolean(value)}
                                  className="text-xs"
                                />
                                <span className="text-xs capitalize">{permiso}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
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
