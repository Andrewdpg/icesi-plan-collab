import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  Link,
  Printer,
  Clock,
  MapPin,
  User,
  Video,
  Eye,
  EyeOff,
  Settings
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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

const pad2 = (n: number) => String(n).padStart(2, '0');

function generateMockEvents(baseDate: Date): CalendarEvent[] {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const d1 = new Date(year, month, Math.min(baseDate.getDate(), 25));
  const d2 = new Date(year, month, Math.min(baseDate.getDate() + 1, 28));
  const d3 = new Date(year, month, Math.min(baseDate.getDate() + 2, 28));

  const toISO = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  return [
    {
      id: "1",
      titulo: "Gestión Estratégica",
      codigo: "GES001",
      grupo: "01",
      fecha: toISO(d1),
      horaInicio: "08:00",
      horaFin: "10:00",
      docente: "Dr. Carlos Mendoza",
      aula: "Aula 204",
      modalidad: "presencial",
      estado: "publicado",
      estudiantes: 25,
      adjuntos: 2
    },
    {
      id: "2",
      titulo: "Marketing Digital",
      codigo: "MKT001",
      grupo: "01",
      fecha: toISO(d1),
      horaInicio: "14:00",
      horaFin: "17:00",
      docente: "Dra. Ana García",
      aula: "Virtual",
      modalidad: "virtual",
      estado: "actualizado",
      estudiantes: 30
    },
    {
      id: "3",
      titulo: "Finanzas Corporativas",
      codigo: "FIN001",
      grupo: "02",
      fecha: toISO(d2),
      horaInicio: "09:00",
      horaFin: "12:00",
      docente: "Dr. Roberto Silva",
      aula: "Sala Híbrida A",
      modalidad: "hibrida",
      estado: "publicado",
      estudiantes: 28,
      adjuntos: 1
    },
    {
      id: "4",
      titulo: "Análisis de Datos",
      codigo: "DAT001",
      grupo: "01",
      fecha: toISO(d3),
      horaInicio: "18:00",
      horaFin: "20:00",
      docente: "Dra. Laura Torres",
      aula: "Aula 101",
      modalidad: "presencial",
      estado: "publicado",
    }
  ];
}

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const longDaysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
const timeSlots = [
  '08:00','09:00','10:00','11:00','12:00','13:00','14:00',
  '15:00','16:00','17:00','18:00','19:00','20:00','21:00'
];
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function CalendarioPersonal() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [filters, setFilters] = useState({
    programa: "todos",
    curso: "todos",
    modalidad: "todas",
    rol: "ambos",
    vista: "mis" as "mis" | "curso",
  });
  const [showFilters, setShowFilters] = useState(false);
  const mockEvents = useMemo(() => generateMockEvents(currentDate), [currentDate]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [actionType, setActionType] = useState<"reprogramar" | "cambiar-aula" | "cancelar" | "">("");
  const [changes, setChanges] = useState({
    nuevaFecha: "",
    nuevaHora: "",
    nuevaAula: "",
    motivo: "",
    urgencia: "normal",
    programarEnvio: false,
    fechaEnvio: "",
  });

  const getModalidadColor = (modalidad: string) => {
    switch (modalidad) {
      case 'presencial': return 'bg-primary/10 border-primary/20 text-primary';
      case 'virtual': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'hibrida': return 'bg-purple-50 border-purple-200 text-purple-700';
      default: return 'bg-muted border-border text-foreground';
    }
  };

  const getEstadoIndicator = (estado: string) => {
    switch (estado) {
      case 'actualizado': return 'border-l-4 border-l-orange-400';
      case 'cancelado': return 'opacity-60 line-through';
      default: return '';
    }
  };

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = (d.getDay() + 6) % 7; // 0 = Monday
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const getWeekDates = (date: Date) => {
    const start = getStartOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getEventsForWeek = (weekDates: Date[]) => {
    const byDate: Record<string, Record<string, CalendarEvent | null>> = {};
    weekDates.forEach(d => {
      const key = d.toISOString().split('T')[0];
      byDate[key] = {};
      timeSlots.forEach(t => {
        byDate[key][t] = null;
      });
    });

    getFilteredEvents(mockEvents).forEach(evt => {
      if (byDate[evt.fecha] && evt.horaInicio in byDate[evt.fecha]) {
        byDate[evt.fecha][evt.horaInicio] = evt;
      }
    });

    return byDate;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleExportICS = () => {
    // Simular descarga de archivo ICS
    console.log("Exportando calendario a ICS...");
  };

  const handleCopyICSLink = () => {
    // Simular copia de enlace ICS
    console.log("Copiando enlace ICS...");
  };

  const handlePrint = () => {
    window.print();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getFilteredEvents = useMemo(() => {
    return (events: CalendarEvent[]) => {
      let filtered = events;
      if (filters.vista === 'curso' && filters.curso !== 'todos') {
        filtered = filtered.filter(ev => ev.codigo.toLowerCase() === filters.curso);
      }
      if (filters.modalidad !== 'todas') {
        filtered = filtered.filter(ev => ev.modalidad === filters.modalidad);
      }
      return filtered;
    };
  }, [filters.vista, filters.curso, filters.modalidad]);

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return getFilteredEvents(mockEvents).filter(event => event.fecha === dateString);
  };

  const openEventDialog = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setWizardStep(1);
    setActionType("");
    setChanges({
      nuevaFecha: "",
      nuevaHora: "",
      nuevaAula: "",
      motivo: "",
      urgencia: "normal",
      programarEnvio: false,
      fechaEnvio: "",
    });
    setIsDialogOpen(true);
  };

  const handleConfirmChange = () => {
    alert("Cambio aplicado exitosamente. Notificaciones enviadas.");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendario Personal</h1>
          <p className="text-muted-foreground">
            Vista personalizada de tu agenda académica
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportICS} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
            <Download className="h-4 w-4 mr-2" />
            Descargar ICS
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyICSLink} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
            <Link className="h-4 w-4 mr-2" />
            Copiar enlace
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  Hoy
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <h2 className="text-xl font-semibold text-[#3f4159]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className={viewMode === 'month' ? 'bg-[#5555ea] hover:bg-[#4a4ad9] text-white' : 'border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]'}
                >
                  Mes
                </Button>
                <Button
                  variant={viewMode === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className={viewMode === 'week' ? 'bg-[#5555ea] hover:bg-[#4a4ad9] text-white' : 'border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]'}
                >
                  Semana
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[#e3e4ec] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label className="text-sm font-medium text-[#3f4159]">Vista</Label>
                  <Select value={filters.vista} onValueChange={(value: "mis" | "curso") => 
                    setFilters(prev => ({ ...prev, vista: value }))
                  }>
                    <SelectTrigger className="border-[#e3e4ec] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#e3e4ec] bg-white">
                      <SelectItem value="mis">Mis clases</SelectItem>
                      <SelectItem value="curso">Curso/Materia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#3f4159]">Programa</Label>
                  <Select value={filters.programa} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, programa: value }))
                  }>
                    <SelectTrigger className="border-[#e3e4ec] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#e3e4ec] bg-white">
                      <SelectItem value="todos">Todos los programas</SelectItem>
                      <SelectItem value="maestria">Maestría en Gestión</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="doctorado">Doctorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={filters.vista === 'curso' ? '' : 'opacity-60 pointer-events-none'}>
                  <Label className="text-sm font-medium text-[#3f4159]">Curso</Label>
                  <Select value={filters.curso} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, curso: value }))
                  }>
                    <SelectTrigger className="border-[#e3e4ec] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#e3e4ec] bg-white">
                      <SelectItem value="todos">Todos los cursos</SelectItem>
                      <SelectItem value="ges001">Gestión Estratégica</SelectItem>
                      <SelectItem value="mkt001">Marketing Digital</SelectItem>
                      <SelectItem value="fin001">Finanzas Corporativas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-[#3f4159]">Modalidad</Label>
                  <Select value={filters.modalidad} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, modalidad: value }))
                  }>
                    <SelectTrigger className="border-[#e3e4ec] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#e3e4ec] bg-white">
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="hibrida">Híbrida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                  
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardContent className="p-0">
          {viewMode === 'month' ? (
            <div className="grid grid-cols-7 gap-0 border-b border-[#e3e4ec]">
              {/* Header */}
              {daysOfWeek.map(day => (
                <div key={day} className="p-4 text-center font-medium border-r border-[#e3e4ec] last:border-r-0 bg-[#f7f8fe] text-[#3f4159]">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {generateCalendarDays().map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();
                const events = getEventsForDate(date);
                
                return (
                  <div
                    key={index}
                    className={`min-h-32 p-2 border-r border-b border-[#e3e4ec] last:border-r-0 ${
                      !isCurrentMonth ? 'bg-[#f7f8fe] text-[#596b88]' : ''
                    } ${isToday ? 'bg-[#e4e9ff]' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-[#5555ea]' : 'text-[#3f4159]'}`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {events.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 border cursor-pointer hover:opacity-80 ${
                            getModalidadColor(event.modalidad)
                          } ${getEstadoIndicator(event.estado)}`}
                          onClick={() => openEventDialog(event)}
                        >
                          <div className="font-medium truncate">
                            {event.codigo}-{event.grupo}
                          </div>
                          <div className="truncate">
                            {event.horaInicio}-{event.horaFin}
                          </div>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-[#596b88]">
                          +{events.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4">
              {(() => {
                const weekDates = getWeekDates(currentDate);
                const weekData = getEventsForWeek(weekDates);
                return (
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-8 gap-1 min-w-[900px]">
                      {/* Columna vacía para horas */}
                      <div className="p-2 font-medium text-sm text-muted-foreground"></div>
                      {weekDates.map(d => (
                        <div key={d.toDateString()} className="p-2 font-medium text-sm text-center border-b">
                          {longDaysOfWeek[(d.getDay() + 6) % 7]} {d.getDate()}
                        </div>
                      ))}

                      {/* Filas de horarios */}
                      {timeSlots.map(time => (
                        <>
                          <div key={`hour-${time}`} className="p-2 text-sm text-muted-foreground font-medium border-r">
                            {time}
                          </div>
                          {weekDates.map(d => {
                            const dateKey = d.toISOString().split('T')[0];
                            const evt = weekData[dateKey]?.[time] ?? null;
                            const isToday = d.toDateString() === new Date().toDateString();
                            return (
                              <div key={`${dateKey}-${time}`} className={`p-1 border border-border min-h-[60px] ${isToday ? 'bg-[#e4e9ff]/40' : ''}`}>
                                {evt && (
                                  <div className={`bg-white border rounded p-2 h-full ${getEstadoIndicator(evt.estado)}`}>
                                    <div className="text-xs font-medium truncate">
                                      {evt.codigo}-{evt.grupo}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {evt.aula}
                                    </div>
                                    <Badge variant="secondary" className={`text-[10px] mt-1 ${getModalidadColor(evt.modalidad)}`}>
                                      {evt.modalidad}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogo Cambios Urgentes (pasos 2 y 3) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {wizardStep === 1 && 'Detalles del evento'}
              {wizardStep === 2 && 'Seleccionar acción'}
              {wizardStep === 3 && 'Confirmar & Notificar'}
            </DialogTitle>
          </DialogHeader>

          {/* Resumen breve de la sesión seleccionada */}
          {selectedEvent && (
            <div className="p-3 bg-muted/50 rounded mb-4 text-sm">
              <div className="font-medium">[{selectedEvent.codigo}] {selectedEvent.titulo} – Grupo {selectedEvent.grupo}</div>
              <div className="text-muted-foreground">
                {new Date(selectedEvent.fecha).toLocaleDateString('es-CO')} • {selectedEvent.horaInicio}-{selectedEvent.horaFin} • {selectedEvent.aula} • {selectedEvent.docente}
              </div>
            </div>
          )}

          {wizardStep === 1 && (
            <div className="space-y-6">
              {/* Información detallada del evento */}
              {selectedEvent && (
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="font-medium">Información</div>
                      <div className="text-muted-foreground">Código: {selectedEvent.codigo} • Grupo {selectedEvent.grupo}</div>
                      <div className="text-muted-foreground">Docente: {selectedEvent.docente}</div>
                      <div className="text-muted-foreground">Fecha: {new Date(selectedEvent.fecha).toLocaleDateString('es-CO')}</div>
                      <div className="text-muted-foreground">Hora: {selectedEvent.horaInicio} - {selectedEvent.horaFin}</div>
                      <div className="text-muted-foreground">Aula: {selectedEvent.aula}</div>
                      <div>
                        <Badge className={`${getModalidadColor(selectedEvent.modalidad)} text-xs`}>{selectedEvent.modalidad}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="font-medium">Estado</div>
                      <div className="text-muted-foreground capitalize">{selectedEvent.estado}</div>
                      {typeof selectedEvent.estudiantes === 'number' && (
                        <div className="text-muted-foreground">Estudiantes: {selectedEvent.estudiantes}</div>
                      )}
                      {typeof selectedEvent.adjuntos === 'number' && (
                        <div className="text-muted-foreground">Adjuntos: {selectedEvent.adjuntos}</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Acciones rápidas y modificar */}
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setWizardStep(2)}>Modificar</Button>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="font-medium">¿Qué tipo de cambio necesitas hacer?</div>
                <div className="grid md:grid-cols-3 gap-3">
                  <Card 
                    className={`cursor-pointer transition-all ${actionType === 'reprogramar' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActionType('reprogramar')}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Reprogramar</div>
                      <div className="text-sm text-muted-foreground">Cambiar fecha y/u hora</div>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${actionType === 'cambiar-aula' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActionType('cambiar-aula')}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Cambiar aula</div>
                      <div className="text-sm text-muted-foreground">Asignar nueva aula</div>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${actionType === 'cancelar' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActionType('cancelar')}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Cancelar</div>
                      <div className="text-sm text-muted-foreground">Cancelar la sesión</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setWizardStep(1)}>← Volver</Button>
                <Button disabled={!actionType} onClick={() => setWizardStep(3)}>Continuar →</Button>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-6">
              {/* Detalles del cambio */}
              <div className="space-y-4">
                {actionType === 'reprogramar' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nueva fecha</Label>
                      <Input type="date" value={changes.nuevaFecha} onChange={(e) => setChanges(prev => ({ ...prev, nuevaFecha: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Nueva hora</Label>
                      <Input placeholder="08:00-10:00" value={changes.nuevaHora} onChange={(e) => setChanges(prev => ({ ...prev, nuevaHora: e.target.value }))} />
                    </div>
                  </div>
                )}
                {actionType === 'cambiar-aula' && (
                  <div className="space-y-2">
                    <Label>Nueva aula</Label>
                    <Select value={changes.nuevaAula} onValueChange={(value) => setChanges(prev => ({ ...prev, nuevaAula: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar aula" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aula 301">Aula 301</SelectItem>
                        <SelectItem value="Aula 302">Aula 302</SelectItem>
                        <SelectItem value="Laboratorio 1">Laboratorio 1</SelectItem>
                        <SelectItem value="Auditorio">Auditorio Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Motivo del cambio</Label>
                  <Textarea
                    placeholder={actionType === 'cancelar' ? 'Motivo de la cancelación (requerido)' : 'Breve explicación del cambio'}
                    value={changes.motivo}
                    onChange={(e) => setChanges(prev => ({ ...prev, motivo: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              {/* Configuración de notificación */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Urgencia</Label>
                  <Select value={changes.urgencia} onValueChange={(value) => setChanges(prev => ({ ...prev, urgencia: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {changes.programarEnvio && (
                  <div className="grid md:grid-cols-2 gap-4 ml-6">
                    <div className="space-y-2">
                      <Label>Fecha de envío</Label>
                      <Input type="date" value={changes.fechaEnvio} onChange={(e) => setChanges(prev => ({ ...prev, fechaEnvio: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Hora de envío</Label>
                      <Input type="time" onChange={(e) => setChanges(prev => ({ ...prev, fechaEnvio: e.target.value }))} />
                    </div>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-2 justify-between">
                <Button variant="outline" onClick={() => setWizardStep(2)}>← Volver</Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleConfirmChange}>Aplicar cambio & Notificar</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Legend */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#3f4159]">Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#5555ea] bg-[#e4e9ff]"></div>
              <span className="text-sm text-[#3f4159]">Presencial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#4fb37b] bg-[#e6f7ef]"></div>
              <span className="text-sm text-[#3f4159]">Virtual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#b8860b] bg-[#fff8e6]"></div>
              <span className="text-sm text-[#3f4159]">Híbrida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#e9683b] border-l-4 border-l-[#e9683b]"></div>
              <span className="text-sm text-[#3f4159]">Actualizado recientemente</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}