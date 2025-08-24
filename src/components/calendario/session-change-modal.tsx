import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  X,
  Edit,
  Send,
  AlertTriangle
} from "lucide-react";

interface CalendarEvent {
  id: string;
  titulo: string;
  codigo: string;
  grupo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  docente: string;
  aula: string;
  modalidad: "presencial" | "virtual" | "hibrida";
  estado: "publicado" | "actualizado" | "cancelado";
  estudiantes?: number;
  adjuntos?: number;
}

interface SessionChangeModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionChangeModal({ event, isOpen, onClose }: SessionChangeModalProps) {
  const [paso, setPaso] = useState(1);
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

  const handleClose = () => {
    setPaso(1);
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
    onClose();
  };

  const handleSeleccionarAccion = (accion: string) => {
    setTipoAccion(accion);
    setPaso(2);
  };

  const handleConfirmarCambio = () => {
    // Simular aplicación del cambio y envío de notificaciones
    alert("Cambio aplicado exitosamente. Notificaciones enviadas.");
    handleClose();
  };

  if (!event) return null;

  const renderPaso1 = () => (
    <div className="space-y-6">
      {/* Sesión seleccionada */}
      <div className="p-4 bg-[#f7f8fe] rounded-lg border border-[#e3e4ec]">
        <h3 className="font-semibold mb-2 text-[#3f4159]">Sesión seleccionada:</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h4 className="font-medium text-[#3f4159]">
              [{event.codigo}] {event.titulo} – Grupo {event.grupo}
            </h4>
            <Badge variant="outline" className="border-[#e3e4ec] text-[#3f4159]">
              {event.modalidad}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#596b88]">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(event.fecha).toLocaleDateString('es-CO', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.horaInicio}-{event.horaFin}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.aula}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {event.docente}
            </div>
          </div>
        </div>
      </div>

      {/* Acciones disponibles */}
      <div className="space-y-3">
        <h4 className="font-medium text-[#3f4159]">¿Qué tipo de cambio necesitas hacer?</h4>
        <div className="grid gap-3">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-sm border-[#e3e4ec] ${
              tipoAccion === 'reprogramar' ? 'ring-2 ring-[#5555ea] bg-[#e4e9ff]' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleSeleccionarAccion('reprogramar')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#5555ea]" />
                <div>
                  <div className="font-medium text-[#3f4159]">Reprogramar</div>
                  <div className="text-sm text-[#596b88]">Cambiar fecha y/u hora de la sesión</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-sm border-[#e3e4ec] ${
              tipoAccion === 'cambiar-aula' ? 'ring-2 ring-[#5555ea] bg-[#e4e9ff]' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleSeleccionarAccion('cambiar-aula')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#5555ea]" />
                <div>
                  <div className="font-medium text-[#3f4159]">Cambiar aula</div>
                  <div className="text-sm text-[#596b88]">Asignar nueva aula o espacio</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-sm border-[#e3e4ec] ${
              tipoAccion === 'cancelar' ? 'ring-2 ring-[#e9683b] bg-red-50' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleSeleccionarAccion('cancelar')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <X className="h-5 w-5 text-[#e9683b]" />
                <div>
                  <div className="font-medium text-[#3f4159]">Cancelar</div>
                  <div className="text-sm text-[#596b88]">Cancelar la sesión con justificación</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={handleClose} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
          Cancelar
        </Button>
        {tipoAccion && (
          <Button onClick={() => setPaso(2)} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
            Continuar →
          </Button>
        )}
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div className="space-y-6">
      {/* Detalles del cambio */}
      <div className="space-y-4">
        {tipoAccion === 'reprogramar' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Nueva fecha</Label>
              <Input
                type="date"
                value={cambios.nuevaFecha}
                onChange={(e) => setCambios(prev => ({ ...prev, nuevaFecha: e.target.value }))}
                className="border-[#e3e4ec] bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Nueva hora</Label>
              <Input
                placeholder="18:00-20:00"
                value={cambios.nuevaHora}
                onChange={(e) => setCambios(prev => ({ ...prev, nuevaHora: e.target.value }))}
                className="border-[#e3e4ec] bg-white"
              />
            </div>
          </div>
        )}
        
        {tipoAccion === 'cambiar-aula' && (
          <div className="space-y-2">
            <Label className="text-[#3f4159]">Nueva aula</Label>
            <Select value={cambios.nuevaAula} onValueChange={(value) => 
              setCambios(prev => ({ ...prev, nuevaAula: value }))}>
              <SelectTrigger className="border-[#e3e4ec] bg-white">
                <SelectValue placeholder="Seleccionar aula" />
              </SelectTrigger>
              <SelectContent className="border-[#e3e4ec] bg-white">
                <SelectItem value="aula-301">Aula 301</SelectItem>
                <SelectItem value="aula-302">Aula 302</SelectItem>
                <SelectItem value="laboratorio-1">Laboratorio 1</SelectItem>
                <SelectItem value="auditorio">Auditorio Principal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-[#3f4159]">Motivo del cambio</Label>
          <Textarea
            placeholder={tipoAccion === 'cancelar' ? 'Motivo de la cancelación (requerido)' : 'Breve explicación del cambio'}
            value={cambios.motivo}
            onChange={(e) => setCambios(prev => ({ ...prev, motivo: e.target.value }))}
            rows={3}
            className="border-[#e3e4ec] bg-white"
          />
        </div>
      </div>

      {/* Configuración de notificación */}
      <div className="border-t border-[#e3e4ec] pt-4 space-y-4">
        <h4 className="font-medium text-[#3f4159]">Configuración de notificación</h4>
        
        <div className="space-y-2">
          <Label className="text-[#3f4159]">Urgencia</Label>
          <Select value={cambios.urgencia} onValueChange={(value) => 
            setCambios(prev => ({ ...prev, urgencia: value }))}>
            <SelectTrigger className="border-[#e3e4ec] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#e3e4ec] bg-white">
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgente">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#e9683b]" />
                  🚨 Urgente (banner rojo + prefijo)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#3f4159]">Plantilla de notificación</Label>
          <Select value={cambios.plantilla} onValueChange={(value) => 
            setCambios(prev => ({ ...prev, plantilla: value }))}>
            <SelectTrigger className="border-[#e3e4ec] bg-white">
              <SelectValue placeholder="Seleccionar plantilla" />
            </SelectTrigger>
            <SelectContent className="border-[#e3e4ec] bg-white">
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
          <Label htmlFor="programar" className="text-[#3f4159]">Programar envío</Label>
        </div>

        {cambios.programarEnvio && (
          <div className="grid grid-cols-2 gap-4 ml-6">
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Fecha de envío</Label>
              <Input
                type="date"
                value={cambios.fechaEnvio}
                onChange={(e) => setCambios(prev => ({ ...prev, fechaEnvio: e.target.value }))}
                className="border-[#e3e4ec] bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Hora de envío</Label>
              <Input
                type="time"
                onChange={(e) => setCambios(prev => ({ ...prev, fechaEnvio: e.target.value }))}
                className="border-[#e3e4ec] bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Vista previa del cambio */}
      <div className="border-t border-[#e3e4ec] pt-4">
        <h4 className="font-medium mb-3 text-[#3f4159]">Vista previa del cambio</h4>
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#f7f8fe] rounded-lg border border-[#e3e4ec]">
          <div>
            <h5 className="font-medium text-sm mb-2 text-[#3f4159]">Antes:</h5>
            <div className="text-sm space-y-1 text-[#596b88]">
              <div>Fecha: {new Date(event.fecha).toLocaleDateString('es-CO')}</div>
              <div>Hora: {event.horaInicio}-{event.horaFin}</div>
              <div>Aula: {event.aula}</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-sm mb-2 text-[#3f4159]">Después:</h5>
            <div className="text-sm space-y-1 text-[#596b88]">
              {tipoAccion === 'reprogramar' && (
                <>
                  <div>Fecha: {cambios.nuevaFecha ? new Date(cambios.nuevaFecha).toLocaleDateString('es-CO') : 'Sin cambios'}</div>
                  <div>Hora: {cambios.nuevaHora || 'Sin cambios'}</div>
                  <div>Aula: {event.aula}</div>
                </>
              )}
              {tipoAccion === 'cambiar-aula' && (
                <>
                  <div>Fecha: {new Date(event.fecha).toLocaleDateString('es-CO')}</div>
                  <div>Hora: {event.horaInicio}-{event.horaFin}</div>
                  <div>Aula: {cambios.nuevaAula || 'Sin cambios'}</div>
                </>
              )}
              {tipoAccion === 'cancelar' && (
                <div className="text-[#e9683b] font-medium">❌ SESIÓN CANCELADA</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          variant="outline" 
          onClick={() => setPaso(1)}
          className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
        >
          ← Volver
        </Button>
        <Button 
          onClick={handleConfirmarCambio}
          className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          Confirmar y Notificar
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#3f4159]">
            <Edit className="h-5 w-5" />
            {paso === 1 ? 'Gestionar Sesión' : 'Confirmar & Notificar'}
          </DialogTitle>
          <DialogDescription className="text-[#596b88]">
            {paso === 1 
              ? 'Selecciona el tipo de cambio que necesitas hacer en esta sesión.'
              : 'Revisa los detalles del cambio y configura las notificaciones.'
            }
          </DialogDescription>
        </DialogHeader>
        
        {paso === 1 ? renderPaso1() : renderPaso2()}
      </DialogContent>
    </Dialog>
  );
}