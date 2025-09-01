import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  X,
  Settings,
  AlertTriangle,
  Plus,
  Trash2,
  CalendarDays,
  Repeat,
  CalendarX
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

interface ProgrammingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  grupoData: {
    id: number;
    grupo: string;
    docente: string;
    modalidad: string;
    sesiones: number;
  } | null;
}

interface ProgrammingPattern {
  id: string;
  semanas: {
    inicio: number;
    fin: number;
  };
  dias: string[];
  horaInicio: string;
  horaFin: string;
  aula: string;
  modalidad: "Presencial" | "Virtual" | "Híbrida";
}

interface Exception {
  id: string;
  semana: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  modalidad: "Presencial" | "Virtual" | "Híbrida";
  motivo: string;
}

export function ProgrammingConfigModal({ open, onOpenChange, grupoData }: ProgrammingConfigModalProps) {
  const [metodologia, setMetodologia] = useState<"regular" | "modulos">("regular");
  const [duracionSemanas, setDuracionSemanas] = useState(16);
  const [patrones, setPatrones] = useState<ProgrammingPattern[]>([
    {
      id: "1",
      semanas: { inicio: 1, fin: 5 },
      dias: ["lunes", "miercoles"],
      horaInicio: "18:00",
      horaFin: "22:00",
      aula: "Aula 204",
      modalidad: "Presencial"
    },
    {
      id: "2", 
      semanas: { inicio: 6, fin: 16 },
      dias: ["jueves", "sabado"],
      horaInicio: "15:00",
      horaFin: "19:00",
      aula: "Aula 305",
      modalidad: "Presencial"
    }
  ]);
  const [excepciones, setExcepciones] = useState<Exception[]>([]);
  const [nuevoPatron, setNuevoPatron] = useState<Partial<ProgrammingPattern>>({});
  const [nuevaExcepcion, setNuevaExcepcion] = useState<Partial<Exception>>({});

  const diasSemana = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" }
  ];

  const modalidades = [
    { value: "Presencial", label: "Presencial" },
    { value: "Virtual", label: "Virtual" },
    { value: "Híbrida", label: "Híbrida" }
  ];

  const handleSave = () => {
    // Validación básica
    if (patrones.length === 0) {
      toast({
        title: "Patrones requeridos",
        description: "Debe configurar al menos un patrón de programación",
        variant: "destructive"
      });
      return;
    }

    // Aquí se guardaría la configuración
    toast({
      title: "Configuración guardada",
      description: "La programación del grupo ha sido configurada exitosamente",
    });

    onOpenChange(false);
  };

  const addPatron = () => {
    if (!nuevoPatron.semanas?.inicio || !nuevoPatron.semanas?.fin || 
        !nuevoPatron.dias || nuevoPatron.dias.length === 0 ||
        !nuevoPatron.horaInicio || !nuevoPatron.horaFin || !nuevoPatron.aula) {
      toast({
        title: "Campos requeridos",
        description: "Complete todos los campos del patrón",
        variant: "destructive"
      });
      return;
    }

    const patron: ProgrammingPattern = {
      id: Date.now().toString(),
      semanas: { inicio: nuevoPatron.semanas.inicio, fin: nuevoPatron.semanas.fin },
      dias: nuevoPatron.dias as string[],
      horaInicio: nuevoPatron.horaInicio as string,
      horaFin: nuevoPatron.horaFin as string,
      aula: nuevoPatron.aula as string,
      modalidad: nuevoPatron.modalidad as "Presencial" | "Virtual" | "Híbrida"
    };

    setPatrones([...patrones, patron]);
    setNuevoPatron({});
  };

  const removePatron = (id: string) => {
    setPatrones(patrones.filter(p => p.id !== id));
  };

  const addExcepcion = () => {
    if (!nuevaExcepcion.semana || !nuevaExcepcion.fecha || 
        !nuevaExcepcion.horaInicio || !nuevaExcepcion.horaFin || 
        !nuevaExcepcion.aula || !nuevaExcepcion.motivo) {
      toast({
        title: "Campos requeridos",
        description: "Complete todos los campos de la excepción",
        variant: "destructive"
      });
      return;
    }

    const excepcion: Exception = {
      id: Date.now().toString(),
      semana: nuevaExcepcion.semana as number,
      fecha: nuevaExcepcion.fecha as string,
      horaInicio: nuevaExcepcion.horaInicio as string,
      horaFin: nuevaExcepcion.horaFin as string,
      aula: nuevaExcepcion.aula as string,
      modalidad: nuevaExcepcion.modalidad as "Presencial" | "Virtual" | "Híbrida",
      motivo: nuevaExcepcion.motivo as string
    };

    setExcepciones([...excepciones, excepcion]);
    setNuevaExcepcion({});
  };

  const removeExcepcion = (id: string) => {
    setExcepciones(excepciones.filter(e => e.id !== id));
  };

  const getDiasLabel = (dias: string[]) => {
    return dias.map(dia => 
      diasSemana.find(d => d.value === dia)?.label
    ).join(", ");
  };

  if (!grupoData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Configurar Programación - Grupo {grupoData.grupo}
          </DialogTitle>
          <DialogDescription>
            Configura la metodología y patrones de programación para este grupo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del grupo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información del Grupo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Docente:</span>
                  <p className="font-medium">{grupoData.docente}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Modalidad actual:</span>
                  <Badge variant="outline">{grupoData.modalidad}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Sesiones:</span>
                  <p className="font-medium">{grupoData.sesiones} sesiones</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración:</span>
                  <p className="font-medium">{duracionSemanas} semanas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="configuracion" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="configuracion">Configuración</TabsTrigger>
              <TabsTrigger value="patrones">Patrones</TabsTrigger>
              <TabsTrigger value="excepciones">Excepciones</TabsTrigger>
            </TabsList>

            <TabsContent value="configuracion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Metodología del Programa</CardTitle>
                  <CardDescription>
                    Selecciona la metodología que determina cómo se programarán las sesiones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Metodología</Label>
                      <Select value={metodologia} onValueChange={(value: "regular" | "modulos") => setMetodologia(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular (Semanal)</SelectItem>
                          <SelectItem value="modulos">Por Módulos (Intercalado)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duración en semanas</Label>
                      <Input
                        type="number"
                        min="1"
                        max="52"
                        value={duracionSemanas}
                        onChange={(e) => setDuracionSemanas(parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <Alert>
                    <CalendarDays className="h-4 w-4" />
                    <AlertDescription>
                      {metodologia === "regular" 
                        ? "Programación semanal recurrente: Las clases se repiten cada semana en los mismos días y horarios."
                        : "Programación por módulos: Las clases se programan en días intercalados con patrones específicos por períodos."
                      }
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patrones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Patrones de Programación</CardTitle>
                  <CardDescription>
                    Define los patrones de programación para diferentes períodos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Patrones existentes */}
                  <div className="space-y-3">
                    {patrones.map((patron) => (
                      <Card key={patron.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  Semanas {patron.semanas.inicio}-{patron.semanas.fin}
                                </Badge>
                                <Badge variant="outline">{patron.modalidad}</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Días:</span>
                                  <p className="font-medium">{getDiasLabel(patron.dias)}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Horario:</span>
                                  <p className="font-medium">{patron.horaInicio} - {patron.horaFin}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Aula:</span>
                                  <p className="font-medium">{patron.aula}</p>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePatron(patron.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Agregar nuevo patrón */}
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Agregar Nuevo Patrón</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Semana inicio</Label>
                          <Input
                            type="number"
                            min="1"
                            max={duracionSemanas}
                            value={nuevoPatron.semanas?.inicio || ""}
                            onChange={(e) => setNuevoPatron(prev => ({
                              ...prev,
                              semanas: { ...prev.semanas, inicio: parseInt(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Semana fin</Label>
                          <Input
                            type="number"
                            min="1"
                            max={duracionSemanas}
                            value={nuevoPatron.semanas?.fin || ""}
                            onChange={(e) => setNuevoPatron(prev => ({
                              ...prev,
                              semanas: { ...prev.semanas, fin: parseInt(e.target.value) }
                            }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Días de la semana</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {diasSemana.map((dia) => (
                            <label key={dia.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={nuevoPatron.dias?.includes(dia.value) || false}
                                onChange={(e) => {
                                  const dias = nuevoPatron.dias || [];
                                  if (e.target.checked) {
                                    setNuevoPatron(prev => ({
                                      ...prev,
                                      dias: [...dias, dia.value]
                                    }));
                                  } else {
                                    setNuevoPatron(prev => ({
                                      ...prev,
                                      dias: dias.filter(d => d !== dia.value)
                                    }));
                                  }
                                }}
                              />
                              <span className="text-sm">{dia.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Hora inicio</Label>
                          <Input
                            type="time"
                            value={nuevoPatron.horaInicio || ""}
                            onChange={(e) => setNuevoPatron(prev => ({
                              ...prev,
                              horaInicio: e.target.value
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora fin</Label>
                          <Input
                            type="time"
                            value={nuevoPatron.horaFin || ""}
                            onChange={(e) => setNuevoPatron(prev => ({
                              ...prev,
                              horaFin: e.target.value
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Modalidad</Label>
                          <Select 
                            value={nuevoPatron.modalidad || ""} 
                            onValueChange={(value) => setNuevoPatron(prev => ({
                              ...prev,
                              modalidad: value as "Presencial" | "Virtual" | "Híbrida"
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {modalidades.map((mod) => (
                                <SelectItem key={mod.value} value={mod.value}>
                                  {mod.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Aula</Label>
                        <Input
                          placeholder="Ej: Aula 204, Laboratorio B"
                          value={nuevoPatron.aula || ""}
                          onChange={(e) => setNuevoPatron(prev => ({
                            ...prev,
                            aula: e.target.value
                          }))}
                        />
                      </div>

                      <Button onClick={addPatron} className="w-full rounded-lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Patrón
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="excepciones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Excepciones y Cambios</CardTitle>
                  <CardDescription>
                    Configura excepciones para semanas específicas (cambios de horario, aula, etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Excepciones existentes */}
                  <div className="space-y-3">
                    {excepciones.map((excepcion) => (
                      <Card key={excepcion.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  Semana {excepcion.semana}
                                </Badge>
                                <Badge variant="outline">{excepcion.modalidad}</Badge>
                                <Badge variant="outline">
                                  {new Date(excepcion.fecha).toLocaleDateString()}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Horario:</span>
                                  <p className="font-medium">{excepcion.horaInicio} - {excepcion.horaFin}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Aula:</span>
                                  <p className="font-medium">{excepcion.aula}</p>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Motivo:</span>
                                  <p className="font-medium">{excepcion.motivo}</p>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExcepcion(excepcion.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Agregar nueva excepción */}
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Agregar Nueva Excepción</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Semana</Label>
                          <Input
                            type="number"
                            min="1"
                            max={duracionSemanas}
                            value={nuevaExcepcion.semana || ""}
                            onChange={(e) => setNuevaExcepcion(prev => ({
                              ...prev,
                              semana: parseInt(e.target.value)
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha específica</Label>
                          <Input
                            type="date"
                            value={nuevaExcepcion.fecha || ""}
                            onChange={(e) => setNuevaExcepcion(prev => ({
                              ...prev,
                              fecha: e.target.value
                            }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Hora inicio</Label>
                          <Input
                            type="time"
                            value={nuevaExcepcion.horaInicio || ""}
                            onChange={(e) => setNuevaExcepcion(prev => ({
                              ...prev,
                              horaInicio: e.target.value
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora fin</Label>
                          <Input
                            type="time"
                            value={nuevaExcepcion.horaFin || ""}
                            onChange={(e) => setNuevaExcepcion(prev => ({
                              ...prev,
                              horaFin: e.target.value
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Modalidad</Label>
                          <Select 
                            value={nuevaExcepcion.modalidad || ""} 
                            onValueChange={(value) => setNuevaExcepcion(prev => ({
                              ...prev,
                              modalidad: value as "Presencial" | "Virtual" | "Híbrida"
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {modalidades.map((mod) => (
                                <SelectItem key={mod.value} value={mod.value}>
                                  {mod.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Aula</Label>
                        <Input
                          placeholder="Ej: Aula 204, Laboratorio B"
                          value={nuevaExcepcion.aula || ""}
                          onChange={(e) => setNuevaExcepcion(prev => ({
                            ...prev,
                            aula: e.target.value
                          }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Motivo del cambio</Label>
                        <Input
                          placeholder="Ej: Conferencia internacional, Cambio de docente"
                          value={nuevaExcepcion.motivo || ""}
                          onChange={(e) => setNuevaExcepcion(prev => ({
                            ...prev,
                            motivo: e.target.value
                          }))}
                        />
                      </div>

                      <Button onClick={addExcepcion} className="w-full rounded-lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Excepción
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Settings className="h-4 w-4 mr-2" />
            Guardar Configuración
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
