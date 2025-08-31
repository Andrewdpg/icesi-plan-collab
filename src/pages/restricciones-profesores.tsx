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
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Building,
  GraduationCap,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Professor {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  departamento: string;
  programa: string;
  tipoContrato: string;
  estado: "activo" | "inactivo";
}

interface TimeSlot {
  id: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  tipo: "disponible" | "preferido" | "restriccion";
}

interface Restriction {
  id: string;
  tipo: "dia" | "hora" | "aula" | "curso";
  descripcion: string;
  activa: boolean;
}

export default function RestriccionesProfesores() {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [newTimeSlot, setNewTimeSlot] = useState({
    dia: "",
    horaInicio: "",
    horaFin: "",
    tipo: "disponible" as const
  });

  const professors: Professor[] = [
    {
      id: "1",
      nombre: "Dr. Carlos Mendoza",
      correo: "cmendoza@icesi.edu.co",
      telefono: "+57 300 123 4567",
      departamento: "Administración",
      programa: "MBA",
      tipoContrato: "Tiempo Completo",
      estado: "activo"
    },
    {
      id: "2",
      nombre: "Dra. Ana Rodríguez",
      correo: "arodriguez@icesi.edu.co",
      telefono: "+57 300 234 5678",
      departamento: "Finanzas",
      programa: "MBA",
      tipoContrato: "Cátedra",
      estado: "activo"
    },
    {
      id: "3",
      nombre: "Dr. Luis Pérez",
      correo: "lperez@icesi.edu.co",
      telefono: "+57 300 345 6789",
      departamento: "Marketing",
      programa: "MBA",
      tipoContrato: "Tiempo Completo",
      estado: "inactivo"
    }
  ];

  const diasSemana = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ];

  const horasDisponibles = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const handleProfessorSelect = (professor: Professor) => {
    setSelectedProfessor(professor);
    setIsEditing(false);
    // Simular carga de datos del profesor
    setTimeSlots([
      {
        id: "1",
        dia: "Lunes",
        horaInicio: "08:00",
        horaFin: "12:00",
        tipo: "disponible"
      },
      {
        id: "2",
        dia: "Martes",
        horaInicio: "14:00",
        horaFin: "18:00",
        tipo: "preferido"
      },
      {
        id: "3",
        dia: "Viernes",
        horaInicio: "18:00",
        horaFin: "22:00",
        tipo: "restriccion"
      }
    ]);
    setRestrictions([
      {
        id: "1",
        tipo: "dia",
        descripcion: "No disponible los sábados",
        activa: true
      },
      {
        id: "2",
        tipo: "hora",
        descripcion: "No disponible antes de las 8:00 AM",
        activa: true
      },
      {
        id: "3",
        tipo: "aula",
        descripcion: "Preferencia por aulas con proyector",
        activa: false
      }
    ]);
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.dia || !newTimeSlot.horaInicio || !newTimeSlot.horaFin) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos del horario",
        variant: "destructive"
      });
      return;
    }

    const slot: TimeSlot = {
      id: Date.now().toString(),
      ...newTimeSlot
    };

    setTimeSlots([...timeSlots, slot]);
    setNewTimeSlot({
      dia: "",
      horaInicio: "",
      horaFin: "",
      tipo: "disponible"
    });

    toast({
      title: "Horario agregado",
      description: "El horario ha sido agregado exitosamente",
    });
  };

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const handleAddRestriction = () => {
    const restriction: Restriction = {
      id: Date.now().toString(),
      tipo: "dia",
      descripcion: "Nueva restricción",
      activa: true
    };
    setRestrictions([...restrictions, restriction]);
  };

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Las restricciones y preferencias han sido guardadas exitosamente",
    });
    setIsEditing(false);
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "disponible":
        return "bg-green-100 text-green-800";
      case "preferido":
        return "bg-blue-100 text-blue-800";
      case "restriccion":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "disponible":
        return <CheckCircle className="h-4 w-4" />;
      case "preferido":
        return <Clock className="h-4 w-4" />;
      case "restriccion":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3f4159]">Restricciones y Preferencias</h1>
        <p className="text-[#596b88] mt-2">
          Gestiona las restricciones y preferencias de horarios de los profesores
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de profesores */}
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#3f4159]">Profesores</CardTitle>
            <CardDescription className="text-[#596b88]">
              Selecciona un profesor para gestionar sus restricciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  onClick={() => handleProfessorSelect(professor)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProfessor?.id === professor.id
                      ? "border-[#5555ea] bg-[#e4e9ff]"
                      : "border-[#e3e4ec] hover:border-[#5555ea] hover:bg-[#f7f8fe]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#596b88]" />
                        <span className="font-medium text-[#3f4159]">{professor.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-[#596b88]" />
                        <span className="text-sm text-[#596b88]">{professor.correo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-[#596b88]" />
                        <span className="text-sm text-[#596b88]">{professor.departamento}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={professor.estado === "activo" ? "default" : "secondary"}
                      className={professor.estado === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {professor.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuración del profesor seleccionado */}
        {selectedProfessor && (
          <div className="lg:col-span-2 space-y-6">
            {/* Información del profesor */}
            <Card className="border-[#e3e4ec] bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#3f4159]">{selectedProfessor.nombre}</CardTitle>
                    <CardDescription className="text-[#596b88]">
                      {selectedProfessor.departamento} - {selectedProfessor.programa}
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
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#596b88]" />
                    <span className="text-sm text-[#596b88]">{selectedProfessor.correo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#596b88]" />
                    <span className="text-sm text-[#596b88]">{selectedProfessor.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#596b88]" />
                    <span className="text-sm text-[#596b88]">{selectedProfessor.tipoContrato}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-[#596b88]" />
                    <span className="text-sm text-[#596b88]">{selectedProfessor.programa}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="horarios" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white border-[#e3e4ec]">
                <TabsTrigger value="horarios" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
                  <Clock className="h-4 w-4 mr-2" />
                  Horarios
                </TabsTrigger>
                <TabsTrigger value="restricciones" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Restricciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="horarios" className="space-y-6">
                <Card className="border-[#e3e4ec] bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-[#3f4159]">Horarios Disponibles</CardTitle>
                    <CardDescription className="text-[#596b88]">
                      Define los horarios disponibles, preferidos y restricciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Agregar nuevo horario */}
                    {isEditing && (
                      <div className="border border-[#e3e4ec] rounded-lg p-4 space-y-4">
                        <h4 className="font-medium text-[#3f4159]">Agregar Horario</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label>Día</Label>
                            <select
                              value={newTimeSlot.dia}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, dia: e.target.value }))}
                              className="w-full p-2 border border-[#e3e4ec] rounded-md bg-[#f7f8fe]"
                            >
                              <option value="">Seleccionar día</option>
                              {diasSemana.map(dia => (
                                <option key={dia} value={dia}>{dia}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Hora inicio</Label>
                            <select
                              value={newTimeSlot.horaInicio}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, horaInicio: e.target.value }))}
                              className="w-full p-2 border border-[#e3e4ec] rounded-md bg-[#f7f8fe]"
                            >
                              <option value="">Inicio</option>
                              {horasDisponibles.map(hora => (
                                <option key={hora} value={hora}>{hora}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Hora fin</Label>
                            <select
                              value={newTimeSlot.horaFin}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, horaFin: e.target.value }))}
                              className="w-full p-2 border border-[#e3e4ec] rounded-md bg-[#f7f8fe]"
                            >
                              <option value="">Fin</option>
                              {horasDisponibles.map(hora => (
                                <option key={hora} value={hora}>{hora}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Tipo</Label>
                            <select
                              value={newTimeSlot.tipo}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, tipo: e.target.value as any }))}
                              className="w-full p-2 border border-[#e3e4ec] rounded-md bg-[#f7f8fe]"
                            >
                              <option value="disponible">Disponible</option>
                              <option value="preferido">Preferido</option>
                              <option value="restriccion">Restricción</option>
                            </select>
                          </div>
                        </div>
                        <Button onClick={handleAddTimeSlot} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Horario
                        </Button>
                      </div>
                    )}

                    {/* Lista de horarios */}
                    <div className="space-y-3">
                      {timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-3 border border-[#e3e4ec] rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getTipoColor(slot.tipo)}`}>
                              {getTipoIcon(slot.tipo)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-[#3f4159]">{slot.dia}</span>
                                <span className="text-[#596b88]">
                                  {slot.horaInicio} - {slot.horaFin}
                                </span>
                              </div>
                              <Badge className={`text-xs ${getTipoColor(slot.tipo)}`}>
                                {slot.tipo.charAt(0).toUpperCase() + slot.tipo.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTimeSlot(slot.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="restricciones" className="space-y-6">
                <Card className="border-[#e3e4ec] bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-[#3f4159]">Restricciones Generales</CardTitle>
                    <CardDescription className="text-[#596b88]">
                      Define restricciones específicas para este profesor
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing && (
                      <Button onClick={handleAddRestriction} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Restricción
                      </Button>
                    )}

                    <div className="space-y-3">
                      {restrictions.map((restriction) => (
                        <div key={restriction.id} className="flex items-center justify-between p-3 border border-[#e3e4ec] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={restriction.activa}
                              onCheckedChange={(checked) => {
                                setRestrictions(prev =>
                                  prev.map(r =>
                                    r.id === restriction.id ? { ...r, activa: checked } : r
                                  )
                                );
                              }}
                              disabled={!isEditing}
                            />
                            <div>
                              <span className="font-medium text-[#3f4159]">{restriction.descripcion}</span>
                              <Badge variant="outline" className="ml-2 text-xs border-[#e3e4ec] text-[#596b88]">
                                {restriction.tipo}
                              </Badge>
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRestrictions(prev => prev.filter(r => r.id !== restriction.id));
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {isEditing && (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
