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
  Settings,
  List,
  Grid3X3,
  CalendarDays
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  programa?: string;
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
      titulo: "MBA - Estrategia",
      codigo: "MBA001",
      grupo: "01",
      fecha: toISO(d1),
      horaInicio: "10:00",
      horaFin: "12:00",
      docente: "Dr. Carlos Mendoza",
      aula: "Aula 204",
      modalidad: "presencial",
      estado: "publicado",
      estudiantes: 25,
      adjuntos: 2,
      programa: "MBA"
    },
    {
      id: "2",
      titulo: "Finanzas Corp.",
      codigo: "FIN001",
      grupo: "02",
      fecha: toISO(d2),
      horaInicio: "12:00",
      horaFin: "14:00",
      docente: "Dra. Ana García",
      aula: "Sala Virtual",
      modalidad: "virtual",
      estado: "actualizado",
      estudiantes: 30,
      programa: "Maestría"
    },
    {
      id: "3",
      titulo: "Mercadeo Digital",
      codigo: "MKT001",
      grupo: "01",
      fecha: toISO(d3),
      horaInicio: "14:00",
      horaFin: "16:00",
      docente: "Dr. Roberto Silva",
      aula: "Sala Híbrida A",
      modalidad: "hibrida",
      estado: "publicado",
      estudiantes: 28,
      adjuntos: 1,
      programa: "MBA"
    },
    {
      id: "4",
      titulo: "Análisis de Datos",
      codigo: "DAT001",
      grupo: "01",
      fecha: toISO(d1),
      horaInicio: "18:00",
      horaFin: "20:00",
      docente: "Dra. Laura Torres",
      aula: "Aula 101",
      modalidad: "presencial",
      estado: "publicado",
      programa: "Doctorado"
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
  const [viewMode, setViewMode] = useState<"semana" | "mes" | "lista">("semana");
  const [selectedProgram, setSelectedProgram] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const mockEvents = useMemo(() => generateMockEvents(currentDate), [currentDate]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [actionType, setActionType] = useState<"cancelar" | "cambiarAula" | "reprogramar" | null>(null);
  const [motivo, setMotivo] = useState("");
  const [nuevoAula, setNuevoAula] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHoraInicio, setNuevaHoraInicio] = useState("");
  const [nuevaHoraFin, setNuevaHoraFin] = useState("");

  const getModalidadColor = (modalidad: string) => {
    switch (modalidad) {
      case 'presencial': return 'bg-[#5555ea] text-white';
      case 'virtual': return 'bg-gray-500 text-white';
      case 'hibrida': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-400 text-white';
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

  const getWeekRange = (date: Date) => {
    const weekDates = getWeekDates(date);
    const start = weekDates[0];
    const end = weekDates[6];
    return `${monthNames[start.getMonth()]} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
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

    mockEvents.forEach(evt => {
      if (byDate[evt.fecha] && evt.horaInicio in byDate[evt.fecha]) {
        byDate[evt.fecha][evt.horaInicio] = evt;
      }
    });

    return byDate;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
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

  const handleExportPDF = () => {
    console.log("Exportando calendario a PDF...");
  };

  const handleSyncOutlook = () => {
    console.log("Sincronizando con Outlook...");
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

  const getFilteredEvents = (events: CalendarEvent[]) => {
    if (selectedProgram === "todos") return events;
    return events.filter(event => event.programa?.toLowerCase() === selectedProgram);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return getFilteredEvents(mockEvents).filter(event => event.fecha === dateString);
  };

  const openEventDialog = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const getFilteredEventsForList = () => {
    return getFilteredEvents(mockEvents).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  };

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3f4159]">Calendario Personal</h1>
          <p className="text-[#596b88] mt-2">
            Vista personalizada de tu agenda académica
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
            <Download className="h-4 w-4 mr-2" />
            Descargar ICS
          </Button>
          <Button variant="outline" size="sm" onClick={handleSyncOutlook} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
            <Link className="h-4 w-4 mr-2" />
            Copiar enlace
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => viewMode === 'semana' ? navigateWeek('prev') : navigateMonth('prev')}
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToToday}
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg"
                >
                  Hoy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => viewMode === 'semana' ? navigateWeek('next') : navigateMonth('next')}
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <h2 className="text-xl font-semibold text-[#3f4159]">
                {viewMode === 'semana' 
                  ? getWeekRange(currentDate)
                  : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                }
              </h2>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'mes' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('mes')}
                  className={viewMode === 'mes' ? 'bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-lg' : 'border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg'}
                >
                  Mes
                </Button>
                <Button
                  variant={viewMode === 'semana' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('semana')}
                  className={viewMode === 'semana' ? 'bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-lg' : 'border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg'}
                >
                  Semana
                </Button>
                <Button
                  variant={viewMode === 'lista' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('lista')}
                  className={viewMode === 'lista' ? 'bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-lg' : 'border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg'}
                >
                  Lista
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[#e3e4ec] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium text-[#3f4159]">Vista</Label>
                  <Select value="mis" onValueChange={() => {}}>
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
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger className="border-[#e3e4ec] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#e3e4ec] bg-white">
                      <SelectItem value="todos">Todos los programas</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="maestría">Maestría en Gestión</SelectItem>
                      <SelectItem value="doctorado">Doctorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#3f4159]">Curso</Label>
                  <Select value="todos" onValueChange={() => {}}>
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
                  <Select value="todas" onValueChange={() => {}}>
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

      {/* Calendar Content */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardContent className="p-0">
          {viewMode === 'semana' && (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-0 min-w-[900px]">
                {/* Time column */}
                <div className="bg-[#f7f8fe] border-r border-[#e3e4ec]">
                  <div className="h-12 border-b border-[#e3e4ec] flex items-center justify-center font-medium text-[#3f4159]">
                    Hora
                  </div>
                  {timeSlots.map(time => (
                    <div key={time} className="h-16 border-b border-[#e3e4ec] flex items-center justify-center text-sm text-[#596b88] font-medium">
                      {time}
                    </div>
                  ))}
                </div>

                {/* Days columns */}
                {getWeekDates(currentDate).map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayName = longDaysOfWeek[(date.getDay() + 6) % 7];
                  const dateKey = date.toISOString().split('T')[0];
                  const weekData = getEventsForWeek(getWeekDates(currentDate));
                  
                  return (
                    <div key={index} className="border-r border-[#e3e4ec] last:border-r-0">
                      {/* Day header */}
                      <div className={`h-12 border-b border-[#e3e4ec] flex items-center justify-center font-medium text-[#3f4159] ${isToday ? 'bg-[#e4e9ff]' : 'bg-[#f7f8fe]'}`}>
                        <div className="text-center">
                          <div className="text-sm">{dayName}</div>
                          <div className="text-lg">{date.getDate()}</div>
                        </div>
                      </div>

                      {/* Time slots */}
                      {timeSlots.map(time => {
                        const event = weekData[dateKey]?.[time] || null;
                        return (
                          <div key={time} className={`h-16 border-b border-[#e3e4ec] p-1 ${isToday ? 'bg-[#e4e9ff]/20' : ''}`}>
                            {event && (
                              <div 
                                className={`h-full rounded p-2 cursor-pointer hover:opacity-80 ${getModalidadColor(event.modalidad)}`}
                                onClick={() => openEventDialog(event)}
                              >
                                <div className="text-xs font-medium truncate">
                                  {event.titulo}
                                </div>
                                <div className="text-xs opacity-90 truncate">
                                  {event.aula}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'mes' && (
            <div className="grid grid-cols-7 gap-0">
              {/* Header */}
              {daysOfWeek.map(day => (
                <div key={day} className="p-4 text-center font-medium border-r border-b border-[#e3e4ec] last:border-r-0 bg-[#f7f8fe] text-[#3f4159]">
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
                      {events.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 border rounded cursor-pointer hover:opacity-80 ${getModalidadColor(event.modalidad)}`}
                          onClick={() => openEventDialog(event)}
                        >
                          <div className="font-medium truncate">
                            {event.titulo}
                          </div>
                          <div className="truncate">
                            {event.horaInicio}-{event.horaFin}
                          </div>
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-[#596b88]">
                          +{events.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'lista' && (
            <div className="p-4">
              <div className="space-y-3">
                {getFilteredEventsForList().map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-[#e3e4ec] rounded-lg hover:bg-[#f7f8fe] cursor-pointer"
                    onClick={() => openEventDialog(event)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getModalidadColor(event.modalidad)}`}></div>
                      <div>
                        <div className="font-medium text-[#3f4159]">{event.titulo}</div>
                        <div className="text-sm text-[#596b88]">{event.codigo} - Grupo {event.grupo}</div>
                      </div>
                        </div>
                    
                    <div className="flex items-center gap-6 text-sm text-[#596b88]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.fecha).toLocaleDateString('es-CO')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.horaInicio} - {event.horaFin}
                          </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.aula}
                                    </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {event.docente}
                                    </div>
                      <Badge className={getModalidadColor(event.modalidad)}>
                        {event.modalidad}
                                    </Badge>
                                  </div>
                              </div>
                      ))}
                    </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Evento</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                    <div className="font-medium text-[#3f4159]">Información</div>
                    <div className="text-[#596b88]">Código: {selectedEvent.codigo} • Grupo {selectedEvent.grupo}</div>
                    <div className="text-[#596b88]">Docente: {selectedEvent.docente}</div>
                    <div className="text-[#596b88]">Fecha: {new Date(selectedEvent.fecha).toLocaleDateString('es-CO')}</div>
                    <div className="text-[#596b88]">Hora: {selectedEvent.horaInicio} - {selectedEvent.horaFin}</div>
                    <div className="text-[#596b88]">Aula: {selectedEvent.aula}</div>
                      <div>
                      <Badge className={`${getModalidadColor(selectedEvent.modalidad)} text-xs`}>
                        {selectedEvent.modalidad}
                      </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                    <div className="font-medium text-[#3f4159]">Estado</div>
                    <div className="text-[#596b88] capitalize">{selectedEvent.estado}</div>
                      {typeof selectedEvent.estudiantes === 'number' && (
                      <div className="text-[#596b88]">Estudiantes: {selectedEvent.estudiantes}</div>
                      )}
                      {typeof selectedEvent.adjuntos === 'number' && (
                      <div className="text-[#596b88]">Adjuntos: {selectedEvent.adjuntos}</div>
                      )}
                    </CardContent>
                  </Card>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setActionType("cancelar")}>
                  Cancelar clase
                </Button>
                <Button variant="outline" onClick={() => setActionType("cambiarAula")}>
                  Cambiar aula
                </Button>
                <Button variant="outline" onClick={() => setActionType("reprogramar")}>
                  Reprogramar
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cerrar
                </Button>
              </div>

              {/* Formulario de acción */}
              {actionType === "cancelar" && (
                <div className="space-y-2">
                  <Label>Motivo de cancelación</Label>
                  <Textarea
                    value={motivo}
                    onChange={e => setMotivo(e.target.value)}
                    placeholder="Escribe el motivo..."
                  />
                  <Button
                    className="bg-red-600 text-white"
                    onClick={() => {
                      // Aquí iría la lógica para cancelar la clase
                      setActionType(null);
                      setMotivo("");
                      setIsDialogOpen(false);
                    }}
                  >
                    Confirmar cancelación
                  </Button>
                </div>
              )}

              {actionType === "cambiarAula" && (
                <div className="space-y-2">
                  <Label>Nuevo espacio/aula</Label>
                  <Input
                    value={nuevoAula}
                    onChange={e => setNuevoAula(e.target.value)}
                    placeholder="Ej: Aula 305"
                  />
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => {
                      // Aquí iría la lógica para cambiar el aula
                      setActionType(null);
                      setNuevoAula("");
                      setIsDialogOpen(false);
                    }}
                  >
                    Confirmar cambio de aula
                  </Button>
                </div>
              )}

              {actionType === "reprogramar" && (
                <div className="space-y-2">
                  <Label>Nueva fecha</Label>
                  <Input
                    type="date"
                    value={nuevaFecha}
                    onChange={e => setNuevaFecha(e.target.value)}
                  />
                  <Label>Hora inicio</Label>
                  <Input
                    type="time"
                    value={nuevaHoraInicio}
                    onChange={e => setNuevaHoraInicio(e.target.value)}
                  />
                  <Label>Hora fin</Label>
                  <Input
                    type="time"
                    value={nuevaHoraFin}
                    onChange={e => setNuevaHoraFin(e.target.value)}
                  />
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      // Aquí iría la lógica para reprogramar la clase
                      setActionType(null);
                      setNuevaFecha("");
                      setNuevaHoraInicio("");
                      setNuevaHoraFin("");
                      setIsDialogOpen(false);
                    }}
                  >
                    Confirmar reprogramación
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}