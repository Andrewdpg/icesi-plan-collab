import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  MoreHorizontal,
  Settings,
  MessageSquare,
  History,
  Send,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  ChevronLeft
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SuggestionsDrawer } from "@/components/planeacion/suggestions-drawer";
import { VersionHistoryDrawer } from "@/components/planeacion/version-history-drawer";
import { PublishDrawer } from "@/components/planeacion/publish-drawer";
import { GeneratePlanningModal } from "@/components/planeacion/generate-planning-modal";
import { SessionSuggestionModal } from "@/components/planeacion/session-suggestion-modal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  cursos: {
    grupo: string;
    estado: "planeada" | "conflicto" | "borrador" | "aprobada" | "pendiente";
  }[];
}

interface Programa {
  id: number;
  nombre: string;
  codigo: string;
  semestres: {
    semestre: string;
    materias: Materia[];
  }[];
}

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
  estado?: "normal" | "conflicto" | "festivo";
}

const programasData: Programa[] = [
  {
    id: 1,
    nombre: "MBA - Maestría en Administración",
    codigo: "MBA",
    semestres: [
      {
        semestre: "Primer semestre",
        materias: [
          {
            id: 1,
            nombre: "Gestión Estratégica",
            codigo: "GES001",
            cursos: [
              { grupo: "01", estado: "planeada" },
              { grupo: "02", estado: "conflicto" }
            ]
          },
          {
            id: 2,
            nombre: "Marketing Digital",
            codigo: "MKT001", 
            cursos: [
              { grupo: "01", estado: "borrador" }
            ]
          }
        ]
      },
      {
        semestre: "Segundo semestre",
        materias: [
          {
            id: 6,
            nombre: "Liderazgo y Equipos",
            codigo: "LID001",
            cursos: [
              { grupo: "01", estado: "pendiente" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    nombre: "Especialización en Finanzas",
    codigo: "EFI",
    semestres: [
      {
        semestre: "Primer semestre",
        materias: [
          {
            id: 3,
            nombre: "Finanzas Corporativas",
            codigo: "FIN001",
            cursos: [
              { grupo: "01", estado: "aprobada" },
              { grupo: "02", estado: "pendiente" }
            ]
          },
          {
            id: 4,
            nombre: "Análisis de Inversiones",
            codigo: "INV001",
            cursos: [
              { grupo: "01", estado: "planeada" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: "Doctorado en Administración",
    codigo: "DOC",
    semestres: [
      {
        semestre: "Primer semestre",
        materias: [
          {
            id: 5,
            nombre: "Seminario de Investigación I",
            codigo: "SEM001",
            cursos: [
              { grupo: "01", estado: "conflicto" }
            ]
          }
        ]
      }
    ]
  }
];

// Datos de sesiones del curso seleccionado
const sessionData: SessionData[] = [
  {
    id: "1",
    curso: "Gestión Estratégica",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-11-08",
    horaInicio: "08:00",
    horaFin: "10:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "2",
    curso: "Gestión Estratégica",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-11-15",
    horaInicio: "08:00",
    horaFin: "10:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "3",
    curso: "Gestión Estratégica",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-11-22",
    horaInicio: "08:00",
    horaFin: "10:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "conflicto"
  },
  {
    id: "4",
    curso: "Gestión Estratégica",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-11-29",
    horaInicio: "08:00",
    horaFin: "10:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "festivo"
  }
];

const cursos = [
  {
    id: 1,
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    sesiones: "8/10",
    modalidad: "Presencial",
    conflictos: 0,
    festivos: 1,
    estado: "planeada",
    adjuntos: 2
  },
  {
    id: 2,
    grupo: "02",
    docente: "Dra. Ana García",
    sesiones: "6/10",
    modalidad: "Híbrida",
    conflictos: 2,
    festivos: 0,
    estado: "conflicto",
    adjuntos: 1
  }
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'planeada': return 'bg-[#e4e9ff] text-[#5555ea]';
    case 'aprobada': return 'bg-[#e6f7ef] text-[#4fb37b]';
    case 'conflicto': return 'bg-[#fdecec] text-[#e9683b]';
    case 'borrador': return 'bg-[#fff8e6] text-[#b8860b]';
    default: return 'bg-[#f7f8fe] text-[#596b88]';
  }
};

const getSessionStyle = (estado?: string) => {
  switch (estado) {
    case 'conflicto':
      return 'bg-[#fdecec] border border-[#e9683b] hover:bg-[#fdecec]';
    case 'festivo':
      return 'bg-[#fff8e6] border border-[#f4a460] hover:bg-[#fff8e6]';
    default:
      return 'bg-[#e4e9ff] border border-[#5555ea] hover:bg-[#e4e9ff]';
  }
};

export default function Planeacion() {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(1);
  const [cursoActivo, setCursoActivo] = useState(1);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const [publicarAbierto, setPublicarAbierto] = useState(false);
  const [modalPlaneacion, setModalPlaneacion] = useState(false);
  const [modalSugerencia, setModalSugerencia] = useState(false);
  const [sessionSeleccionada, setSessionSeleccionada] = useState<SessionData | null>(null);
  const [programasExpandidos, setProgramasExpandidos] = useState<Record<number, boolean>>({
    1: true, // MBA expandido por defecto
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10, 1)); // Noviembre 2024

  // Encontrar la materia actual
  const materiaActual = programasData
    .flatMap(p => p.semestres)
    .flatMap(s => s.materias)
    .find(m => m.id === materiaSeleccionada);

  const togglePrograma = (programaId: number) => {
    setProgramasExpandidos(prev => ({
      ...prev,
      [programaId]: !prev[programaId]
    }));
  };

  const handleSessionClick = (session: SessionData) => {
    setSessionSeleccionada(session);
    setModalSugerencia(true);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generar días del mes
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Empezar desde domingo

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) { // 6 semanas * 7 días
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const getDaysInMonth = () => generateCalendarDays();

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessionData.filter(session => session.fecha === dateStr);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Filtrar programas basado en búsqueda
  const programasFiltrados = programasData.map(programa => ({
    ...programa,
    semestres: programa.semestres.map(semestre => ({
      ...semestre,
      materias: semestre.materias.filter(materia =>
        searchTerm === '' || 
        materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materia.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        programa.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(semestre => semestre.materias.length > 0)
  })).filter(programa => programa.semestres.length > 0);

  return (
    <div className="h-full flex gap-6 relative bg-[#f7f8fe] p-6">
      {/* Panel Izquierdo - Materias por Programa */}
      <div className="w-1/4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#3f4159]">Programas</h2>
          <Button variant="outline" size="sm" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#596b88]" />
          <Input
            placeholder="Buscar programa o materia..."
            className="pl-10 border-[#e3e4ec] focus:border-[#5555ea] focus:ring-[#5555ea] bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {programasFiltrados.map((programa) => (
            <div key={programa.id} className="space-y-2">
              <Collapsible 
                open={programasExpandidos[programa.id]} 
                onOpenChange={() => togglePrograma(programa.id)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-all border-[#e3e4ec] bg-white">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                          <div>
                            <h3 className="font-medium text-sm text-[#3f4159]">{programa.nombre}</h3>
                            <p className="text-xs text-[#596b88]">{programa.codigo}</p>
                          </div>
                        </div>
                        {programasExpandidos[programa.id] ? (
                          <ChevronDown className="h-4 w-4 text-[#596b88]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#596b88]" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 ml-4">
                  {programa.semestres.map((semestre) => (
                    <div key={semestre.semestre} className="space-y-2">
                      <div className="flex items-center gap-2 py-1">
                        <div className="w-2 h-2 bg-[#5555ea]"></div>
                        <span className="text-xs font-medium text-[#596b88] uppercase">
                          {semestre.semestre}
                        </span>
                      </div>
                      
                      {semestre.materias.map((materia) => (
                        <Card 
                          key={materia.id}
                          className={`cursor-pointer transition-all hover:shadow-md ml-4 border-[#e3e4ec] bg-white ${
                            materiaSeleccionada === materia.id ? 'ring-2 ring-[#5555ea]' : ''
                          }`}
                          onClick={() => setMateriaSeleccionada(materia.id)}
                        >
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <div>
                                <h4 className="font-medium text-sm text-[#3f4159]">{materia.nombre}</h4>
                                <p className="text-xs text-[#596b88]">{materia.codigo}</p>
                              </div>
                              <div className="flex gap-1">
                                {materia.cursos.map((curso, index) => (
                                  <Badge 
                                    key={index}
                                    variant="outline"
                                    className={`text-xs ${getEstadoColor(curso.estado)}`}
                                  >
                                    G{curso.grupo}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Central */}
      <div className="flex-1 space-y-6">
        {/* Barra Superior */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#3f4159]">Planeación de Cursos</h1>
            <p className="text-[#596b88]">
              {materiaActual?.nombre} - {materiaActual?.codigo}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setModalPlaneacion(true)} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
              Generar planeación
            </Button>
          </div>
        </div>

        {/* Panel de Cursos */}
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-[#3f4159]">Cursos/Grupos</CardTitle>
            <CardDescription className="text-[#596b88]">
              Administra los grupos de la materia seleccionada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cursos.map((curso) => (
              <Card 
                key={curso.id}
                className={`cursor-pointer transition-all hover:shadow-md border-[#e3e4ec] bg-white ${
                  cursoActivo === curso.id ? 'ring-2 ring-[#5555ea]' : ''
                }`}
                onClick={() => setCursoActivo(curso.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-[#e3e4ec] text-[#3f4159]">Grupo {curso.grupo}</Badge>
                        <Badge className={getEstadoColor(curso.estado)}>
                          {curso.estado}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {curso.docente}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {curso.sesiones} sesiones
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {curso.modalidad}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {curso.conflictos > 0 && (
                          <Badge className="text-xs bg-[#fdecec] text-[#e9683b] border border-[#e9683b]">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {curso.conflictos} conflictos
                          </Badge>
                        )}
                        {curso.festivos > 0 && (
                          <Badge className="text-xs bg-[#fff8e6] text-[#b8860b] border border-[#f4a460]">
                            {curso.festivos} festivos
                          </Badge>
                        )}
                        {curso.adjuntos > 0 && (
                          <Badge variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                            {curso.adjuntos} adjuntos
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-[#e4e9ff] text-[#3f4159]">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-[#e4e9ff] text-[#3f4159]">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-[#e3e4ec] bg-white">
                          <DropdownMenuItem className="hover:bg-[#e4e9ff] text-[#3f4159]">Duplicar grupo</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#e4e9ff] text-[#3f4159]">Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-[#e9683b] hover:bg-[#fdecec]">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full h-12 border-dashed border-[#e3e4ec] text-[#596b88] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
              <Plus className="h-4 w-4 mr-2" />
              Agregar nuevo grupo
            </Button>
          </CardContent>
        </Card>

        {/* Calendario Mensual */}
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#3f4159]">Calendario de Planeación</CardTitle>
                <CardDescription className="text-[#596b88]">
                  {materiaActual?.nombre} - Grupo {cursos.find(c => c.id === cursoActivo)?.grupo || "01"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium min-w-[140px] text-center text-[#3f4159]">
                  {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </div>
                <Button variant="outline" size="sm" onClick={handleNextMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {/* Headers de días */}
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-[#596b88]">
                  {day}
                </div>
              ))}
              
              {/* Días del calendario */}
              {getDaysInMonth().map((date, index) => {
                const sessions = getSessionsForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                
                return (
                  <div 
                    key={index}
                    className={`min-h-[80px] p-2 border border-[#e3e4ec] ${
                      isCurrentMonthDay ? 'bg-white' : 'bg-[#f7f8fe]'
                    }`}
                  >
                    <div className={`text-sm ${
                      isCurrentMonthDay ? 'text-[#3f4159]' : 'text-[#596b88]'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`mt-1 p-1 text-xs cursor-pointer transition-colors ${getSessionStyle(session.estado)}`}
                        onClick={() => handleSessionClick(session)}
                      >
                        <div className="font-medium">{session.curso}</div>
                        <div className="flex items-center gap-1 text-[#596b88]">
                          <Clock className="h-3 w-3" />
                          {session.horaInicio}
                        </div>
                        <div className="text-[#596b88]">{session.aula}</div>
                        {session.estado === 'conflicto' && (
                          <div className="flex items-center gap-1 text-[#e9683b]">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Conflicto</span>
                          </div>
                        )}
                        {session.estado === 'festivo' && (
                          <div className="flex items-center gap-1 text-[#b8860b]">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Festivo</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Derecho - Acciones */}
      <div className="w-1/5 space-y-4">
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-[#3f4159]">Curso Activo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#596b88]">Grupo:</span>
                <span className="text-[#3f4159]">01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596b88]">Docente:</span>
                <span className="text-[#3f4159]">Dr. Mendoza</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596b88]">Sesiones:</span>
                <span className="text-[#3f4159]">8/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596b88]">Modalidad:</span>
                <span className="text-[#3f4159]">Presencial</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-[#e3e4ec]">
              <h4 className="font-medium text-sm text-[#3f4159]">Validaciones</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-[#4fb37b]">
                  <CheckCircle className="h-3 w-3" />
                  Horas cumplidas
                </div>
                <div className="flex items-center gap-2 text-[#e9683b]">
                  <AlertTriangle className="h-3 w-3" />
                  Cruce de horario
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Button size="sm" className="w-full bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                Confirmar cambios
              </Button>
              <Button variant="outline" size="sm" className="w-full border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sugerencias Drawer Trigger */}
      <div className="flex flex-col fixed right-0 top-3/4 transform -translate-y-full z-40">
        <Button
          variant="outline"
          className="shadow-lg bg-white border-[#e3e4ec] border-r-0 flex justify-start items-center gap-2 hover:bg-[#e4e9ff] hover:border-[#5555ea]"
          onClick={() => setDrawerAbierto(true)}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <div className="text-sm font-medium whitespace-nowrap text-[#3f4159]">
              Sugerencias/Cambios
            </div>
            <Badge className="bg-[#e9683b] text-white text-xs">3</Badge>
          </div>
        </Button>
        <Button
          variant="outline"
          className="shadow-lg bg-white border-[#e3e4ec] border-r-0 flex justify-start items-center gap-2 hover:bg-[#e4e9ff] hover:border-[#5555ea]"
          onClick={() => setHistorialAbierto(true)}
        >
            <History className="h-4 w-4" />
            <div className="text-sm font-medium whitespace-nowrap text-[#3f4159]">
              Historial de versiones
            </div>
            
        </Button>
        <Button
          variant="outline"
          className="shadow-lg bg-white border-[#e3e4ec] border-r-0 flex justify-start items-center gap-2 hover:bg-[#e4e9ff] hover:border-[#5555ea]"
          onClick={() => setPublicarAbierto(true)}
        >
          <div className="flex items-center justify-start gap-2">
            <Send className="h-4 w-4" />
            <div className="text-sm font-medium whitespace-nowrap text-[#3f4159]">
              Publicar
            </div>
            
          </div>
        </Button>
      </div>

      {/* Modales y Drawers */}
      <SuggestionsDrawer 
        open={drawerAbierto} 
        onOpenChange={setDrawerAbierto} 
      />
      
      <VersionHistoryDrawer
        open={historialAbierto}
        onOpenChange={setHistorialAbierto}
      />

      <PublishDrawer
        open={publicarAbierto}
        onOpenChange={setPublicarAbierto}
      />

      <SessionSuggestionModal
        open={modalSugerencia}
        onOpenChange={setModalSugerencia}
        sessionData={sessionSeleccionada}
      />
      
      <GeneratePlanningModal
        open={modalPlaneacion}
        onOpenChange={setModalPlaneacion}
        curso={materiaActual ? {
          nombre: materiaActual.nombre,
          codigo: materiaActual.codigo,
          grupo: "01"
        } : undefined}
      />
    </div>
  );
}