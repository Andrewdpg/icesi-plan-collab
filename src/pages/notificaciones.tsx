import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell,
  Plus,
  Edit,
  Send,
  Eye,
  Download,
  Copy,
  Mail,
  MessageSquare,
  Smartphone,
  AlertTriangle,
  Clock,
  CheckCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for plantillas
const plantillas = [
  {
    id: 1,
    evento: "Publicación de planeación",
    canal: "Email",
    asunto: "📅 Planeación académica publicada - {programa} {periodo}",
    ultimaEdicion: "2024-01-10"
  },
  {
    id: 2,
    evento: "Cambio aprobado",
    canal: "Email",
    asunto: "✅ Cambio aprobado en tu horario - {curso}",
    ultimaEdicion: "2024-01-08"
  },
  {
    id: 3,
    evento: "Reprogramación urgente",
    canal: "WhatsApp",
    asunto: "🚨 Cambio urgente de horario - {curso} {fecha}",
    ultimaEdicion: "2024-01-05"
  }
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
    urgencia: "normal"
  },
  {
    id: 2,
    destinatarios: "Docentes Finanzas (8 personas)",
    asunto: "🚨 Cambio urgente - Finanzas Corporativas",
    estado: "programado",
    aperturas: "-",
    fecha: "2024-01-16 08:00",
    urgencia: "urgente"
  }
];

export default function Notificaciones() {
  const [modalEnvio, setModalEnvio] = useState(false);
  const [modalPlantilla, setModalPlantilla] = useState(false);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<any>(null);
  const [nuevoEnvio, setNuevoEnvio] = useState({
    destinatarios: "",
    tipo: "",
    urgencia: "normal",
    asunto: "",
    cuerpo: "",
    programar: false,
    fechaEnvio: ""
  });

  const [configuracion, setConfiguracion] = useState({
    notificarPublicacion: true,
    notificarCambios72h: true,
    habilitarWhatsApp: false,
    nombreRemitente: "Oficina de Posgrados Icesi",
    correoReplyTo: "posgrados@icesi.edu.co",
    pieInstitucional: "Universidad Icesi - Calle 18 No 122-135, Cali, Colombia"
  });

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'enviado': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'programado': return <Clock className="h-4 w-4 text-warning" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'WhatsApp': return <Smartphone className="h-4 w-4" />;
      case 'In-app': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notificaciones</h1>
          <p className="text-muted-foreground">
            Gestiona plantillas, envíos y preferencias de notificaciones
          </p>
        </div>
      </div>

      <Tabs defaultValue="plantillas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="envios">Envíos</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="plantillas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Plantillas de Notificación
                </CardTitle>
                <Button onClick={() => setModalPlantilla(true)}>
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
                      <TableCell className="font-medium">{plantilla.evento}</TableCell>
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

          {/* Modal de plantilla */}
          <Dialog open={modalPlantilla} onOpenChange={setModalPlantilla}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>
                  {plantillaSeleccionada ? 'Editar plantilla' : 'Nueva plantilla'}
                </DialogTitle>
                <DialogDescription>
                  Define el contenido de las notificaciones automáticas del sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Evento</Label>
                    <Select defaultValue={plantillaSeleccionada?.evento || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar evento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publicacion">Publicación de planeación</SelectItem>
                        <SelectItem value="cambio-aprobado">Cambio aprobado</SelectItem>
                        <SelectItem value="cambio-rechazado">Cambio rechazado</SelectItem>
                        <SelectItem value="cambio-aula">Cambio de aula</SelectItem>
                        <SelectItem value="reprogramacion">Reprogramación</SelectItem>
                        <SelectItem value="cancelacion">Cancelación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Canal</Label>
                    <Select defaultValue={plantillaSeleccionada?.canal || "Email"}>
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
                    Variables disponibles: {'{programa}'}, {'{cohorte}'}, {'{curso}'}, {'{docente}'}, {'{fecha}'}, {'{hora}'}, {'{aula}'}
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
                    <Label className="text-sm font-medium">Vista previa - Desktop</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-card text-sm">
                      <div className="font-semibold mb-2">📅 MBA - Planeación actualizada</div>
                      <p>Estimado/a estudiante,</p>
                      <p>Te informamos que la planeación académica del programa MBA ha sido actualizada...</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Vista previa - Móvil</Label>
                    <div className="mt-2 p-3 border rounded-lg bg-card text-xs max-w-[200px]">
                      <div className="font-semibold mb-1">📅 MBA - Planeación...</div>
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
                  <Button variant="outline" onClick={() => setModalPlantilla(false)}>
                    Cancelar
                  </Button>
                  <Button>Guardar plantilla</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="envios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Constructor de Envío
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Destinatarios</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar destinatarios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curso">Por curso específico</SelectItem>
                      <SelectItem value="programa">Por programa/cohorte</SelectItem>
                      <SelectItem value="rol">Por rol (Docentes, Estudiantes)</SelectItem>
                      <SelectItem value="manual">Selección manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Urgencia</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Normal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgente">
                        🚨 Urgente (banner rojo + prefijo)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Plantilla base</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publicacion">Publicación de planeación</SelectItem>
                    <SelectItem value="cambio">Cambio aprobado</SelectItem>
                    <SelectItem value="urgente">Reprogramación urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar ahora
                </Button>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Programar envío
                </Button>
                <Button variant="outline">Guardar borrador</Button>
              </div>
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
                      <TableCell className="text-sm">{envio.destinatarios}</TableCell>
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
                          variant={envio.urgencia === 'urgente' ? 'destructive' : 'secondary'}
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
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Reglas Automáticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Notificar automáticamente al publicar planeación</div>
                  <div className="text-sm text-muted-foreground">
                    Envía notificación a todos los involucrados cuando se publique una planeación
                  </div>
                </div>
                <Switch
                  checked={configuracion.notificarPublicacion}
                  onCheckedChange={(checked) => 
                    setConfiguracion(prev => ({ ...prev, notificarPublicacion: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Notificar cambios urgentes ≤ 72h</div>
                  <div className="text-sm text-muted-foreground">
                    Notificación automática para cambios que afecten sesiones en las próximas 72 horas
                  </div>
                </div>
                <Switch
                  checked={configuracion.notificarCambios72h}
                  onCheckedChange={(checked) => 
                    setConfiguracion(prev => ({ ...prev, notificarCambios72h: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Habilitar WhatsApp</div>
                  <div className="text-sm text-muted-foreground">
                    Permite envío por WhatsApp si hay número de teléfono registrado
                  </div>
                </div>
                <Switch
                  checked={configuracion.habilitarWhatsApp}
                  onCheckedChange={(checked) => 
                    setConfiguracion(prev => ({ ...prev, habilitarWhatsApp: checked }))
                  }
                />
              </div>
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
                      setConfiguracion(prev => ({ ...prev, nombreRemitente: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Correo reply-to</Label>
                  <Input
                    type="email"
                    value={configuracion.correoReplyTo}
                    onChange={(e) => 
                      setConfiguracion(prev => ({ ...prev, correoReplyTo: e.target.value }))
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
                    setConfiguracion(prev => ({ ...prev, pieInstitucional: e.target.value }))
                  }
                />
              </div>
              <Button>Guardar configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}