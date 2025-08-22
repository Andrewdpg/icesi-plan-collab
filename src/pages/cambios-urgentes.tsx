import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  X,
  Edit,
  Send
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Mock data para sesiones
const sesiones = [
  {
    id: 1,
    codigo: "GES001",
    nombre: "Gestión Estratégica",
    grupo: "01",
    fecha: "2024-01-16",
    hora: "18:00-20:00",
    aula: "Aula 204",
    docente: "Dr. Carlos Mendoza",
    modalidad: "Presencial"
  },
  {
    id: 2,
    codigo: "MKT001", 
    nombre: "Marketing Digital",
    grupo: "01",
    fecha: "2024-01-17",
    hora: "19:00-21:00",
    aula: "Aula 301",
    docente: "Dra. Ana García",
    modalidad: "Híbrida"
  },
  {
    id: 3,
    codigo: "FIN001",
    nombre: "Finanzas Corporativas", 
    grupo: "02",
    fecha: "2024-01-18",
    hora: "18:30-20:30",
    aula: "Aula 205",
    docente: "Dr. Luis Pérez",
    modalidad: "Presencial"
  }
];

export default function CambiosUrgentes() {
  const [paso, setPaso] = useState(1);
  const [filtros, setFiltros] = useState({
    busqueda: "",
    programa: "",
    curso: "",
    docente: "",
    fecha: ""
  });
  const [sesionSeleccionada, setSesionSeleccionada] = useState<any>(null);
  const [tipoAccion, setTipoAccion] = useState("");
  const [cambios, setCambios] = useState({
    nuevaFecha: "",
    nuevaHora: "",
    nuevaAula: "",
    motivo: "",
    urgencia: "normal",
    plantilla: "",
    programarEnvio: false,
    fechaEnvio: ""
  });

  const sesionesFiltradas = sesiones.filter(sesion => {
    return (
      (sesion.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
       sesion.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase())) &&
      (filtros.docente === "" || sesion.docente.includes(filtros.docente)) &&
      (filtros.fecha === "" || sesion.fecha === filtros.fecha)
    );
  });

  const handleSeleccionarSesion = (sesion: any) => {
    setSesionSeleccionada(sesion);
    setPaso(2);
  };

  const handleSeleccionarAccion = (accion: string) => {
    setTipoAccion(accion);
    setPaso(3);
  };

  const handleConfirmarCambio = () => {
    // Simular aplicación del cambio y envío de notificaciones
    alert("Cambio aplicado exitosamente. Notificaciones enviadas.");
    // Reset wizard
    setPaso(1);
    setSesionSeleccionada(null);
    setTipoAccion("");
    setCambios({
      nuevaFecha: "",
      nuevaHora: "",
      nuevaAula: "",
      motivo: "",
      urgencia: "normal",
      plantilla: "",
      programarEnvio: false,
      fechaEnvio: ""
    });
  };

  const renderPaso1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Paso 1: Seleccionar sesión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Buscar curso</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Código o nombre..."
                className="pl-10"
                value={filtros.busqueda}
                onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Programa</Label>
            <Select value={filtros.programa} onValueChange={(value) => 
              setFiltros(prev => ({ ...prev, programa: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="mba">MBA</SelectItem>
                <SelectItem value="finanzas">Esp. Finanzas</SelectItem>
                <SelectItem value="mercadeo">Maestría Mercadeo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Docente</Label>
            <Select value={filtros.docente} onValueChange={(value) => 
              setFiltros(prev => ({ ...prev, docente: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Mendoza">Dr. Carlos Mendoza</SelectItem>
                <SelectItem value="García">Dra. Ana García</SelectItem>
                <SelectItem value="Pérez">Dr. Luis Pérez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fecha</Label>
            <Input
              type="date"
              value={filtros.fecha}
              onChange={(e) => setFiltros(prev => ({ ...prev, fecha: e.target.value }))}
            />
          </div>
        </div>

        {/* Lista de sesiones */}
        <div className="space-y-2">
          {sesionesFiltradas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron sesiones con estos filtros</p>
            </div>
          ) : (
            sesionesFiltradas.map((sesion) => (
              <Card 
                key={sesion.id} 
                className="cursor-pointer hover:shadow-soft transition-all"
                onClick={() => handleSeleccionarSesion(sesion)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">
                          [{sesion.codigo}] {sesion.nombre} – Grupo {sesion.grupo}
                        </h3>
                        <Badge variant="outline">{sesion.modalidad}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(sesion.fecha).toLocaleDateString('es-CO', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {sesion.hora}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {sesion.aula}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {sesion.docente}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPaso2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Paso 2: Seleccionar acción
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sesión seleccionada */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Sesión seleccionada:</h3>
          <div className="space-y-1 text-sm">
            <div><strong>[{sesionSeleccionada?.codigo}] {sesionSeleccionada?.nombre}</strong> – Grupo {sesionSeleccionada?.grupo}</div>
            <div className="text-muted-foreground">
              {new Date(sesionSeleccionada?.fecha || '').toLocaleDateString('es-CO')} • {sesionSeleccionada?.hora} • {sesionSeleccionada?.aula} • {sesionSeleccionada?.docente}
            </div>
          </div>
        </div>

        {/* Acciones disponibles */}
        <div className="space-y-3">
          <h4 className="font-medium">¿Qué tipo de cambio necesitas hacer?</h4>
          <div className="grid gap-3">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-soft ${
                tipoAccion === 'reprogramar' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSeleccionarAccion('reprogramar')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Reprogramar</div>
                    <div className="text-sm text-muted-foreground">Cambiar fecha y/u hora de la sesión</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-soft ${
                tipoAccion === 'cambiar-aula' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSeleccionarAccion('cambiar-aula')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Cambiar aula</div>
                    <div className="text-sm text-muted-foreground">Asignar nueva aula o espacio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-soft ${
                tipoAccion === 'cancelar' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSeleccionarAccion('cancelar')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-destructive" />
                  <div>
                    <div className="font-medium">Cancelar</div>
                    <div className="text-sm text-muted-foreground">Cancelar la sesión con justificación</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setPaso(1)}
          >
            ← Volver
          </Button>
          {tipoAccion && (
            <Button onClick={() => setPaso(3)}>
              Continuar →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPaso3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Paso 3: Confirmar & Notificar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detalles del cambio */}
        <div className="space-y-4">
          {tipoAccion === 'reprogramar' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nueva fecha</Label>
                <Input
                  type="date"
                  value={cambios.nuevaFecha}
                  onChange={(e) => setCambios(prev => ({ ...prev, nuevaFecha: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Nueva hora</Label>
                <Input
                  placeholder="18:00-20:00"
                  value={cambios.nuevaHora}
                  onChange={(e) => setCambios(prev => ({ ...prev, nuevaHora: e.target.value }))}
                />
              </div>
            </div>
          )}
          
          {tipoAccion === 'cambiar-aula' && (
            <div className="space-y-2">
              <Label>Nueva aula</Label>
              <Select value={cambios.nuevaAula} onValueChange={(value) => 
                setCambios(prev => ({ ...prev, nuevaAula: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar aula" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aula-301">Aula 301</SelectItem>
                  <SelectItem value="aula-302">Aula 302</SelectItem>
                  <SelectItem value="laboratorio-1">Laboratorio 1</SelectItem>
                  <SelectItem value="auditorio">Auditorio Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Motivo del cambio</Label>
            <Textarea
              placeholder={tipoAccion === 'cancelar' ? 'Motivo de la cancelación (requerido)' : 'Breve explicación del cambio'}
              value={cambios.motivo}
              onChange={(e) => setCambios(prev => ({ ...prev, motivo: e.target.value }))}
              rows={3}
            />
          </div>
        </div>

        {/* Configuración de notificación */}
        <div className="border-t pt-4 space-y-4">
          <h4 className="font-medium">Configuración de notificación</h4>
          
          <div className="space-y-2">
            <Label>Urgencia</Label>
            <Select value={cambios.urgencia} onValueChange={(value) => 
              setCambios(prev => ({ ...prev, urgencia: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgente">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    🚨 Urgente (banner rojo + prefijo)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Plantilla de notificación</Label>
            <Select value={cambios.plantilla} onValueChange={(value) => 
              setCambios(prev => ({ ...prev, plantilla: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plantilla" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reprogramacion">Reprogramación de sesión</SelectItem>
                <SelectItem value="cambio-aula">Cambio de aula</SelectItem>
                <SelectItem value="cancelacion">Cancelación de sesión</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="programar"
              checked={cambios.programarEnvio}
              onCheckedChange={(checked) => 
                setCambios(prev => ({ ...prev, programarEnvio: checked }))
              }
            />
            <Label htmlFor="programar">Programar envío</Label>
          </div>

          {cambios.programarEnvio && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div className="space-y-2">
                <Label>Fecha de envío</Label>
                <Input
                  type="date"
                  value={cambios.fechaEnvio}
                  onChange={(e) => setCambios(prev => ({ ...prev, fechaEnvio: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora de envío</Label>
                <Input
                  type="time"
                  onChange={(e) => setCambios(prev => ({ ...prev, fechaEnvio: e.target.value }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Vista previa del cambio */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Vista previa del cambio</h4>
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <h5 className="font-medium text-sm mb-2">Antes:</h5>
              <div className="text-sm space-y-1">
                <div>{sesionSeleccionada?.fecha} • {sesionSeleccionada?.hora}</div>
                <div>{sesionSeleccionada?.aula}</div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-sm mb-2">Después:</h5>
              <div className="text-sm space-y-1 text-primary">
                {tipoAccion === 'reprogramar' && (
                  <>
                    <div>{cambios.nuevaFecha || sesionSeleccionada?.fecha} • {cambios.nuevaHora || sesionSeleccionada?.hora}</div>
                    <div>{sesionSeleccionada?.aula}</div>
                  </>
                )}
                {tipoAccion === 'cambiar-aula' && (
                  <>
                    <div>{sesionSeleccionada?.fecha} • {sesionSeleccionada?.hora}</div>
                    <div>{cambios.nuevaAula || sesionSeleccionada?.aula}</div>
                  </>
                )}
                {tipoAccion === 'cancelar' && (
                  <div className="text-destructive">SESIÓN CANCELADA</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setPaso(2)}
          >
            ← Volver
          </Button>
          <Button onClick={handleConfirmarCambio}>
            {cambios.programarEnvio ? 'Aplicar cambio & Programar notificación' : 'Aplicar cambio & Notificar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cambios de Última Hora</h1>
          <p className="text-muted-foreground">
            Realiza cambios operativos en planeaciones ya publicadas
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-4 mb-6">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                paso >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {stepNum}
            </div>
            <span className={`text-sm ${paso >= stepNum ? 'text-foreground' : 'text-muted-foreground'}`}>
              {stepNum === 1 && 'Seleccionar'}
              {stepNum === 2 && 'Acción'}
              {stepNum === 3 && 'Confirmar'}
            </span>
            {stepNum < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>

      {/* Contenido del wizard */}
      {paso === 1 && renderPaso1()}
      {paso === 2 && renderPaso2()}
      {paso === 3 && renderPaso3()}
    </div>
  );
}