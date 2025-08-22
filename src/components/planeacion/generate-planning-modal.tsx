import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  X,
  Settings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeneratePlanningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curso?: {
    nombre: string;
    codigo: string;
    grupo: string;
  };
}

interface SessionPreview {
  fecha: string;
  dia: string;
  hora: string;
  duracion: number;
  espacio: string;
  conflicto?: string;
  festivo?: boolean;
}

const mockDocentes = [
  { id: 1, nombre: "Dr. Carlos Mendoza", disponibilidad: "Lun-Vie 8-18h" },
  { id: 2, nombre: "Dra. Ana García", disponibilidad: "Mar-Sáb 9-17h" },
  { id: 3, nombre: "Dr. Roberto Silva", disponibilidad: "Lun-Vie 14-20h" },
];

const mockEspacios = [
  { id: 1, nombre: "Aula 204", tipo: "Presencial", capacidad: 30 },
  { id: 2, nombre: "Lab. Sistemas", tipo: "Laboratorio", capacidad: 25 },
  { id: 3, nombre: "Sala Híbrida A", tipo: "Híbrida", capacidad: 20 },
  { id: 4, nombre: "Virtual Zoom", tipo: "Virtual", capacidad: 100 },
];

export function GeneratePlanningModal({ open, onOpenChange, curso }: GeneratePlanningModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    diasSemana: [] as string[],
    horaInicio: "08:00",
    horaFin: "10:00",
    sesionesObjetivo: 10,
    docenteId: "",
    espacioId: "",
    modalidad: "presencial",
    saltoFestivos: true,
    frecuencia: "semanal",
    excepciones: [] as string[],
    notas: ""
  });

  const [previewSessions, setPreviewSessions] = useState<SessionPreview[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const diasSemana = [
    { value: "1", label: "Lunes" },
    { value: "2", label: "Martes" },
    { value: "3", label: "Miércoles" },
    { value: "4", label: "Jueves" },
    { value: "5", label: "Viernes" },
    { value: "6", label: "Sábado" },
    { value: "0", label: "Domingo" },
  ];

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.includes(day)
        ? prev.diasSemana.filter(d => d !== day)
        : [...prev.diasSemana, day]
    }));
  };

  const generatePreview = () => {
    // Mock preview generation
    const mockSessions: SessionPreview[] = [
      {
        fecha: "2024-10-25",
        dia: "Viernes",
        hora: "08:00-10:00",
        duracion: 2,
        espacio: "Aula 204",
        festivo: true
      },
      {
        fecha: "2024-11-01",
        dia: "Viernes", 
        hora: "08:00-10:00",
        duracion: 2,
        espacio: "Aula 204"
      },
      {
        fecha: "2024-11-08",
        dia: "Viernes",
        hora: "08:00-10:00", 
        duracion: 2,
        espacio: "Aula 204",
        conflicto: "Dr. Mendoza tiene clase en MBA"
      },
      // ... más sesiones
    ];
    
    setPreviewSessions(mockSessions);
    setShowPreview(true);
  };

  const handleCreate = () => {
    // Implementar lógica de creación
    console.log("Crear planeación:", formData);
    onOpenChange(false);
  };

  const resetModal = () => {
    setCurrentStep(1);
    setShowPreview(false);
    setPreviewSessions([]);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetModal();
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Generar Planeación {curso && `- ${curso.nombre} Grupo ${curso.grupo}`}
          </DialogTitle>
          <DialogDescription>
            Configura los parámetros para generar automáticamente la planeación del curso
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!showPreview ? (
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1">Calendario</TabsTrigger>
                <TabsTrigger value="2">Docente & Espacio</TabsTrigger>
                <TabsTrigger value="3">Excepciones</TabsTrigger>
              </TabsList>

              <TabsContent value="1" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Configuración de Calendario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                        <Input
                          id="fechaInicio"
                          type="date"
                          value={formData.fechaInicio}
                          onChange={(e) => setFormData(prev => ({ ...prev, fechaInicio: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fechaFin">Fecha de fin</Label>
                        <Input
                          id="fechaFin"
                          type="date"
                          value={formData.fechaFin}
                          onChange={(e) => setFormData(prev => ({ ...prev, fechaFin: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Días de la semana</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {diasSemana.map((dia) => (
                          <div key={dia.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={dia.value}
                              checked={formData.diasSemana.includes(dia.value)}
                              onCheckedChange={() => handleDayToggle(dia.value)}
                            />
                            <Label htmlFor={dia.value} className="text-sm">
                              {dia.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="horaInicio">Hora de inicio</Label>
                        <Input
                          id="horaInicio"
                          type="time"
                          value={formData.horaInicio}
                          onChange={(e) => setFormData(prev => ({ ...prev, horaInicio: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="horaFin">Hora de fin</Label>
                        <Input
                          id="horaFin"
                          type="time"
                          value={formData.horaFin}
                          onChange={(e) => setFormData(prev => ({ ...prev, horaFin: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sesiones">Sesiones objetivo</Label>
                        <Input
                          id="sesiones"
                          type="number"
                          min="1"
                          value={formData.sesionesObjetivo}
                          onChange={(e) => setFormData(prev => ({ ...prev, sesionesObjetivo: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Frecuencia</Label>
                      <Select value={formData.frecuencia} onValueChange={(value) => setFormData(prev => ({ ...prev, frecuencia: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semanal">Cada semana</SelectItem>
                          <SelectItem value="quincenal">Cada 2 semanas</SelectItem>
                          <SelectItem value="mensual">Cada mes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>
                    Siguiente: Docente & Espacio
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="2" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asignación de Recursos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Docente asignado</Label>
                      <Select value={formData.docenteId} onValueChange={(value) => setFormData(prev => ({ ...prev, docenteId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar docente" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDocentes.map((docente) => (
                            <SelectItem key={docente.id} value={docente.id.toString()}>
                              <div>
                                <div>{docente.nombre}</div>
                                <div className="text-xs text-muted-foreground">
                                  Disponible: {docente.disponibilidad}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Espacio preferido</Label>
                      <Select value={formData.espacioId} onValueChange={(value) => setFormData(prev => ({ ...prev, espacioId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar espacio" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEspacios.map((espacio) => (
                            <SelectItem key={espacio.id} value={espacio.id.toString()}>
                              <div>
                                <div>{espacio.nombre}</div>
                                <div className="text-xs text-muted-foreground">
                                  {espacio.tipo} - Capacidad: {espacio.capacidad}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Modalidad</Label>
                      <Select value={formData.modalidad} onValueChange={(value) => setFormData(prev => ({ ...prev, modalidad: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="hibrida">Híbrida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Siguiente: Excepciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="3" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Excepciones y Configuración Final</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saltoFestivos"
                        checked={formData.saltoFestivos}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saltoFestivos: checked as boolean }))}
                      />
                      <Label htmlFor="saltoFestivos">
                        Saltar días festivos automáticamente
                      </Label>
                    </div>

                    <div>
                      <Label>Fechas específicas a excluir</Label>
                      <div className="flex gap-2 mt-2">
                        <Input type="date" placeholder="Agregar fecha" />
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.excepciones.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {formData.excepciones.map((fecha, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="text-sm">{fecha}</span>
                              <Button variant="ghost" size="sm">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notas">Notas adicionales</Label>
                      <Textarea
                        id="notas"
                        placeholder="Comentarios o instrucciones especiales..."
                        value={formData.notas}
                        onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Anterior
                  </Button>
                  <Button onClick={generatePreview}>
                    Previsualizar Planeación
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            // Vista de previsualización
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Previsualización de Sesiones</h3>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Editar configuración
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {previewSessions.map((session, index) => (
                  <Card key={index} className={`${
                    session.conflicto ? 'border-destructive bg-status-conflict' :
                    session.festivo ? 'border-orange-400 bg-orange-50' :
                    'border-success bg-status-approved'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">
                              {session.dia} {new Date(session.fecha).toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Sesión {index + 1}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.hora}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.espacio}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {session.conflicto && (
                            <div className="flex items-center gap-1 text-destructive">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-xs">Conflicto</span>
                            </div>
                          )}
                          {session.festivo && (
                            <div className="flex items-center gap-1 text-orange-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-xs">Festivo</span>
                            </div>
                          )}
                          {!session.conflicto && !session.festivo && (
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs">OK</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {session.conflicto && (
                        <div className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded">
                          ⚠️ {session.conflicto}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total: {previewSessions.length} sesiones generadas
                  {previewSessions.filter(s => s.conflicto).length > 0 && (
                    <span className="text-destructive ml-2">
                      • {previewSessions.filter(s => s.conflicto).length} con conflictos
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreate}>
                    Crear como Borrador
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}