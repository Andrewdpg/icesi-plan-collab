import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
}

export function SessionChangeModal({ open, onOpenChange, event }: SessionChangeModalProps) {
  const [step, setStep] = useState(1);
  const [actionType, setActionType] = useState("");
  const [changes, setChanges] = useState({
    nuevaFecha: "",
    nuevaHora: "",
    nuevaAula: "",
    motivo: "",
    urgencia: "normal",
    plantilla: "",
    programarEnvio: false,
    fechaEnvio: ""
  });

  const resetModal = () => {
    setStep(1);
    setActionType("");
    setChanges({
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

  const handleClose = () => {
    resetModal();
    onOpenChange(false);
  };

  const handleActionSelect = (action: string) => {
    setActionType(action);
    setStep(2);
  };

  const handleConfirm = () => {
    // Simular aplicación del cambio
    alert("Cambio aplicado exitosamente. Notificaciones enviadas.");
    handleClose();
  };

  if (!event) return null;

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Información de la sesión */}
      <Card className="border-[#e3e4ec] bg-[#f7f8fe]">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 text-[#3f4159]">Sesión seleccionada:</h3>
          <div className="space-y-2 text-sm">
            <div className="font-medium text-[#3f4159]">
              [{event.codigo}] {event.titulo} – Grupo {event.grupo}
            </div>
            <div className="flex items-center gap-4 text-[#596b88]">
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
            </div>
            <div className="flex items-center gap-4 text-[#596b88]">
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
        </CardContent>
      </Card>

      {/* Opciones de acción */}
      <div className="space-y-3">
        <h4 className="font-medium text-[#3f4159]">¿Qué tipo de cambio necesitas hacer?</h4>
        <div className="grid gap-3">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-sm border-[#e3e4ec] ${
              actionType === 'reprogramar' ? 'ring-2 ring-[#5555ea] bg-[#e4e9ff]' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleActionSelect('reprogramar')}
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
              actionType === 'cambiar-aula' ? 'ring-2 ring-[#5555ea] bg-[#e4e9ff]' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleActionSelect('cambiar-aula')}
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
              actionType === 'cancelar' ? 'ring-2 ring-[#5555ea] bg-[#e4e9ff]' : 'hover:bg-[#f7f8fe]'
            }`}
            onClick={() => handleActionSelect('cancelar')}
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
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Detalles del cambio */}
      <div className="space-y-4">
        {actionType === 'reprogramar' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Nueva fecha</Label>
              <Input
                type="date"
                value={changes.nuevaFecha}
                onChange={(e) => setChanges(prev => ({ ...prev, nuevaFecha: e.target.value }))}
                className="border-[#e3e4ec]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Nueva hora</Label>
              <Input
                placeholder="18:00-20:00"
                value={changes.nuevaHora}
                onChange={(e) => setChanges(prev => ({ ...prev, nuevaHora: e.target.value }))}
                className="border-[#e3e4ec]"
              />
            </div>
          </div>
        )}
        
        {actionType === 'cambiar-aula' && (
          <div className="space-y-2">
            <Label className="text-[#3f4159]">Nueva aula</Label>
            <Select value={changes.nuevaAula} onValueChange={(value) => 
              setChanges(prev => ({ ...prev, nuevaAula: value }))}>
              <SelectTrigger className="border-[#e3e4ec]">
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
          <Label className="text-[#3f4159]">Motivo del cambio</Label>
          <Textarea
            placeholder={actionType === 'cancelar' ? 'Motivo de la cancelación (requerido)' : 'Breve explicación del cambio'}
            value={changes.motivo}
            onChange={(e) => setChanges(prev => ({ ...prev, motivo: e.target.value }))}
            rows={3}
            className="border-[#e3e4ec]"
          />
        </div>
      </div>

      {/* Configuración de notificación */}
      <div className="border-t border-[#e3e4ec] pt-4 space-y-4">
        <h4 className="font-medium text-[#3f4159]">Configuración de notificación</h4>
        
        <div className="space-y-2">
          <Label className="text-[#3f4159]">Urgencia</Label>
          <Select value={changes.urgencia} onValueChange={(value) => 
            setChanges(prev => ({ ...prev, urgencia: value }))}>
            <SelectTrigger className="border-[#e3e4ec]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

        <div className="flex items-center space-x-2">
          <Switch
            id="programar"
            checked={changes.programarEnvio}
            onCheckedChange={(checked) => 
              setChanges(prev => ({ ...prev, programarEnvio: checked }))
            }
          />
          <Label htmlFor="programar" className="text-[#3f4159]">Programar envío</Label>
        </div>

        {changes.programarEnvio && (
          <div className="grid grid-cols-2 gap-4 ml-6">
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Fecha de envío</Label>
              <Input
                type="date"
                value={changes.fechaEnvio}
                onChange={(e) => setChanges(prev => ({ ...prev, fechaEnvio: e.target.value }))}
                className="border-[#e3e4ec]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#3f4159]">Hora de envío</Label>
              <Input
                type="time"
                className="border-[#e3e4ec]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Vista previa del cambio */}
      <div className="border-t border-[#e3e4ec] pt-4">
        <h4 className="font-medium mb-3 text-[#3f4159]">Vista previa del cambio</h4>
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#f7f8fe] border border-[#e3e4ec] rounded-lg">
          <div>
            <h5 className="font-medium text-sm mb-2 text-[#3f4159]">Antes:</h5>
            <div className="text-sm space-y-1 text-[#596b88]">
              <div>{new Date(event.fecha).toLocaleDateString('es-CO')}</div>
              <div>{event.horaInicio}-{event.horaFin}</div>
              <div>{event.aula}</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-sm mb-2 text-[#3f4159]">Después:</h5>
            <div className="text-sm space-y-1 text-[#596b88]">
              {actionType === 'reprogramar' && (
                <>
                  <div>{changes.nuevaFecha ? new Date(changes.nuevaFecha).toLocaleDateString('es-CO') : 'Sin cambios'}</div>
                  <div>{changes.nuevaHora || 'Sin cambios'}</div>
                  <div>{event.aula}</div>
                </>
              )}
              {actionType === 'cambiar-aula' && (
                <>
                  <div>{new Date(event.fecha).toLocaleDateString('es-CO')}</div>
                  <div>{event.horaInicio}-{event.horaFin}</div>
                  <div>{changes.nuevaAula || 'Seleccionar aula'}</div>
                </>
              )}
              {actionType === 'cancelar' && (
                <div className="text-[#e9683b] font-medium">SESIÓN CANCELADA</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#e3e4ec]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#3f4159]">
            {step === 1 ? (
              <>
                <Edit className="h-5 w-5" />
                Gestionar sesión
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Confirmar cambios
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? renderStep1() : renderStep2()}

        <DialogFooter>
          <div className="flex gap-2 w-full">
            {step === 2 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#f7f8fe]"
              >
                ← Volver
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#f7f8fe]"
            >
              Cancelar
            </Button>
            {step === 1 && actionType && (
              <Button 
                onClick={() => setStep(2)}
                className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
              >
                Continuar →
              </Button>
            )}
            {step === 2 && (
              <Button 
                onClick={handleConfirm}
                className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Confirmar cambio
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}