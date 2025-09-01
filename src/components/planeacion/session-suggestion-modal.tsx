import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  X,
  MessageSquare,
  AlertTriangle,
  FileText,
  Lock,
  Unlock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface SessionData {
  id: string;
  curso: string;
  grupo: string;
  docente: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  modalidad: "Presencial" | "Virtual" | "Híbrida";
}

interface SessionSuggestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionData: SessionData | null;
}

export function SessionSuggestionModal({ open, onOpenChange, sessionData }: SessionSuggestionModalProps) {
  const [tipoSugerencia, setTipoSugerencia] = useState<string>("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHoraInicio, setNuevaHoraInicio] = useState("");
  const [nuevaHoraFin, setNuevaHoraFin] = useState("");
  const [nuevaAula, setNuevaAula] = useState("");
  const [nuevaModalidad, setNuevaModalidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // NUEVO: Estado para fase de recomendaciones
  const [faseRecomendaciones, setFaseRecomendaciones] = useState({
    activa: true,
    fechaInicio: "2025-01-01", // Fecha pasada para que esté activa
    fechaFin: "2025-12-31", // Fecha futura para que esté activa
    bloqueada: false,
    forzarApertura: false // NUEVO: Para forzar apertura aunque haya pasado la fecha
  });

  // NUEVO: Función para verificar si la fase está activa
  const esFaseActiva = () => {
    const ahora = new Date();
    const inicio = new Date(faseRecomendaciones.fechaInicio + 'T00:00:00');
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const dentroDelPeriodo = ahora >= inicio && ahora <= fin;
    
    // Si está bloqueada manualmente, no está activa
    if (faseRecomendaciones.bloqueada) return false;
    
    // Si está dentro del período o se fuerza la apertura, está activa
    return dentroDelPeriodo || faseRecomendaciones.forzarApertura;
  };

  // NUEVO: Función para obtener el estado de la fase
  const getEstadoFase = () => {
    if (faseRecomendaciones.bloqueada) return "bloqueada";
    
    const ahora = new Date();
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const haPasadoLaFecha = ahora > fin;
    
    if (haPasadoLaFecha && !faseRecomendaciones.forzarApertura) {
      return "cerrada";
    }
    
    return "activa";
  };

  const resetForm = () => {
    setTipoSugerencia("");
    setNuevaFecha("");
    setNuevaHoraInicio("");
    setNuevaHoraFin("");
    setNuevaAula("");
    setNuevaModalidad("");
    setMotivo("");
    setDescripcion("");
  };

  const handleSubmit = () => {
    // NUEVO: Validación de fase de recomendaciones
    if (!esFaseActiva()) {
      toast({
        title: "Fase cerrada",
        description: getEstadoFase() === 'bloqueada' 
          ? "La fase de recomendaciones está bloqueada manualmente. No se pueden enviar nuevas sugerencias."
          : "La fase de recomendaciones está cerrada. No se pueden enviar nuevas sugerencias.",
        variant: "destructive"
      });
      return;
    }

    // Validación básica
    if (!tipoSugerencia || !motivo || !descripcion) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Aquí se enviaría la sugerencia
    toast({
      title: "Sugerencia enviada",
      description: "Tu sugerencia ha sido enviada para revisión",
    });

    resetForm();
    onOpenChange(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  if (!sessionData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Crear Sugerencia de Cambio
          </DialogTitle>
          <DialogDescription>
            Propón cambios para esta sesión. Tu sugerencia será revisada por la Oficina de Posgrados.
          </DialogDescription>
        </DialogHeader>

        {/* Banner de advertencia si la fase está cerrada */}
        {!esFaseActiva() && (
          <Alert className="mb-4 bg-[#fdecec] border-[#e9683b]">
            <Lock className="h-4 w-4 text-[#e9683b]" />
            <AlertDescription className="text-[#e9683b]">
              {getEstadoFase() === 'bloqueada' 
                ? "La fase de recomendaciones está bloqueada manualmente. Esta sugerencia no será procesada."
                : "La fase de recomendaciones está cerrada. Esta sugerencia no será procesada."
              }
            </AlertDescription>
          </Alert>
        )}
        
        {/* Banner de fase activa */}
        {esFaseActiva() && (
          <Alert className="mb-4 bg-[#e6f7ef] border-[#4fb37b]">
            <Unlock className="h-4 w-4 text-[#4fb37b]" />
            <AlertDescription className="text-[#4fb37b]">
              Fase de recomendaciones activa. Tu sugerencia será procesada normalmente.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Información de la sesión actual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sesión Actual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Curso:</span>
                  <p className="font-medium">{sessionData.curso} - Grupo {sessionData.grupo}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Docente:</span>
                  <p className="font-medium">{sessionData.docente}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fecha:</span>
                  <p className="font-medium">{new Date(sessionData.fecha).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Horario:</span>
                  <p className="font-medium">{sessionData.horaInicio} - {sessionData.horaFin}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Aula:</span>
                  <p className="font-medium">{sessionData.aula}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Modalidad:</span>
                  <Badge variant="outline">{sessionData.modalidad}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tipo de sugerencia */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Sugerencia *</Label>
            <Select value={tipoSugerencia} onValueChange={setTipoSugerencia}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de cambio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cambio_fecha">Cambio de Fecha</SelectItem>
                <SelectItem value="cambio_horario">Cambio de Horario</SelectItem>
                <SelectItem value="cambio_aula">Cambio de Aula</SelectItem>
                <SelectItem value="cambio_modalidad">Cambio de Modalidad</SelectItem>
                <SelectItem value="cancelacion">Cancelación de Sesión</SelectItem>
                <SelectItem value="sesion_adicional">Sesión Adicional</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos según el tipo */}
          {(tipoSugerencia === "cambio_fecha" || tipoSugerencia === "sesion_adicional") && (
            <div className="space-y-2">
              <Label htmlFor="nueva_fecha">Nueva Fecha</Label>
              <Input
                id="nueva_fecha"
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
              />
            </div>
          )}

          {(tipoSugerencia === "cambio_horario" || tipoSugerencia === "sesion_adicional") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nueva_hora_inicio">Nueva Hora Inicio</Label>
                <Input
                  id="nueva_hora_inicio"
                  type="time"
                  value={nuevaHoraInicio}
                  onChange={(e) => setNuevaHoraInicio(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nueva_hora_fin">Nueva Hora Fin</Label>
                <Input
                  id="nueva_hora_fin"
                  type="time"
                  value={nuevaHoraFin}
                  onChange={(e) => setNuevaHoraFin(e.target.value)}
                />
              </div>
            </div>
          )}

          {(tipoSugerencia === "cambio_aula" || tipoSugerencia === "sesion_adicional") && (
            <div className="space-y-2">
              <Label htmlFor="nueva_aula">Nueva Aula</Label>
              <Input
                id="nueva_aula"
                placeholder="Ej: Aula 305, Laboratorio B"
                value={nuevaAula}
                onChange={(e) => setNuevaAula(e.target.value)}
              />
            </div>
          )}

          {(tipoSugerencia === "cambio_modalidad" || tipoSugerencia === "sesion_adicional") && (
            <div className="space-y-2">
              <Label htmlFor="nueva_modalidad">Nueva Modalidad</Label>
              <Select value={nuevaModalidad} onValueChange={setNuevaModalidad}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                  <SelectItem value="Híbrida">Híbrida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Motivo */}
          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo del Cambio *</Label>
            <Input
              id="motivo"
              placeholder="Ej: Conferencia internacional, Compromiso académico"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>

          {/* Descripción detallada */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción Detallada *</Label>
            <Textarea
              id="descripcion"
              placeholder="Explica en detalle la razón del cambio y cualquier información adicional relevante..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Advertencia */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Importante</p>
                  <p className="text-amber-700">
                    Esta sugerencia será enviada a la Oficina de Posgrados para revisión. 
                    Recibirás una notificación cuando sea aprobada o rechazada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <FileText className="h-4 w-4 mr-2" />
            Enviar Sugerencia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 