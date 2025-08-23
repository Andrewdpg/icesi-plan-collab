import { useState } from "react";
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

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    titulo: "Gestión Estratégica",
    codigo: "GES001",
    grupo: "01",
    fecha: "2024-10-25",
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
    fecha: "2024-10-25",
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
    fecha: "2024-10-26",
    horaInicio: "09:00",
    horaFin: "12:00",
    docente: "Dr. Roberto Silva",
    aula: "Sala Híbrida A",
    modalidad: "hibrida",
    estado: "publicado",
    estudiantes: 28,
    adjuntos: 1
  }
];

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
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
    rol: "ambos"
  });
  const [showFilters, setShowFilters] = useState(false);

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

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.fecha === dateString);
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                <div>
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

                <div>
                  <Label className="text-sm font-medium mb-2 block text-[#3f4159]">Vista de Rol</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="docente"
                        checked={filters.rol === 'docente' || filters.rol === 'ambos'}
                        onCheckedChange={(checked) => {
                          const newRol = checked ? 'docente' : 'estudiante';
                          setFilters(prev => ({ ...prev, rol: newRol }));
                        }}
                      />
                      <Label htmlFor="docente" className="text-sm text-[#3f4159]">Docente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="estudiante"
                        checked={filters.rol === 'estudiante' || filters.rol === 'ambos'}
                        onCheckedChange={(checked) => {
                          const newRol = checked ? 'estudiante' : 'docente';
                          setFilters(prev => ({ ...prev, rol: newRol }));
                        }}
                      />
                      <Label htmlFor="estudiante" className="text-sm text-[#3f4159]">Estudiante</Label>
                    </div>
                  </div>
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
                          onClick={() => {
                            // Mostrar detalles del evento
                            console.log('Mostrar detalles:', event);
                          }}
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
            // Vista semanal simplificada
            <div className="p-6">
              <div className="text-center text-[#596b88]">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Vista semanal - Próximamente</p>
                <p className="text-sm">Esta funcionalidad estará disponible en la siguiente versión</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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