import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
  ChevronLeft,
  FileText,
  Download,
  Upload
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SuggestionsDrawer } from "@/components/planeacion/suggestions-drawer";
import { VersionHistoryDrawer } from "@/components/planeacion/version-history-drawer";
import { PublishDrawer } from "@/components/planeacion/publish-drawer";
import { SessionSuggestionModal } from "@/components/planeacion/session-suggestion-modal";
import { GeneratePlanningModal } from "@/components/planeacion/generate-planning-modal";

// Datos de programas y materias
const programas = [
  {
    id: 1,
    nombre: "MBA - Maestría en Administración",
    materias: [
      { id: 1, nombre: "Gestión Estratégica", codigo: "GES001", semestre: 1 },
      { id: 2, nombre: "Marketing Digital", codigo: "MKT001", semestre: 1 },
      { id: 3, nombre: "Liderazgo y Equipos", codigo: "LID001", semestre: 2 },
    ]
  },
  {
    id: 2,
    nombre: "Especialización en Finanzas",
    materias: [
      { id: 4, nombre: "Finanzas Corporativas", codigo: "FIN001", semestre: 1 },
    ]
  },
  {
    id: 3,
    nombre: "Doctorado en Administración",
    materias: [
      { id: 5, nombre: "Metodología de Investigación", codigo: "MET001", semestre: 1 },
    ]
  }
];

// Datos de cursos/grupos
const cursos = [
  {
    id: 1,
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    sesiones: "8/10",
    modalidad: "Presencial",
    estado: "planeada",
    conflictos: 0,
    festivos: 1,
    adjuntos: 2
  },
  {
    id: 2,
    grupo: "02",
    docente: "Dra. Ana García",
    sesiones: "6/10",
    modalidad: "Híbrida",
    estado: "conflicto",
    conflictos: 2,
    festivos: 0,
    adjuntos: 1
  }
];

// Datos de sesiones del curso seleccionado
const sessionData: SessionData[] = [
  {
    id: "1",
    curso: "Gestión Estratégica",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-02",
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
    fecha: "2024-09-09",
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
    fecha: "2024-09-16",
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
    fecha: "2024-09-23",
    horaInicio: "08:00",
    horaFin: "10:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "5",
    curso: "Marketing Digital",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-03",
    horaInicio: "14:00",
    horaFin: "16:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "6",
    curso: "Marketing Digital",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-10",
    horaInicio: "14:00",
    horaFin: "16:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "7",
    curso: "Marketing Digital",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-17",
    horaInicio: "14:00",
    horaFin: "16:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "8",
    curso: "Marketing Digital",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-24",
    horaInicio: "14:00",
    horaFin: "16:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "9",
    curso: "Finanzas Corporativas",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-05",
    horaInicio: "10:00",
    horaFin: "12:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "10",
    curso: "Finanzas Corporativas",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-12",
    horaInicio: "10:00",
    horaFin: "12:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "11",
    curso: "Finanzas Corporativas",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-19",
    horaInicio: "10:00",
    horaFin: "12:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "12",
    curso: "Finanzas Corporativas",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-26",
    horaInicio: "10:00",
    horaFin: "12:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  }
];

interface SessionData {
  id: string;
  curso: string;
  grupo: string;
  docente: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  modalidad: "Presencial" | "Híbrida" | "Virtual";
  estado?: string;
}

export default function Planeacion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8, 1)); // Septiembre 2024
  const [cursoActivo, setCursoActivo] = useState(1);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const [publicarAbierto, setPublicarAbierto] = useState(false);
  const [modalPlaneacion, setModalPlaneacion] = useState(false);
  const [modalSugerencia, setModalSugerencia] = useState(false);
  const [sessionSeleccionada, setSessionSeleccionada] = useState<SessionData | null>(null);
  const [programasExpandidos, setProgramasExpandidos] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true
  });

  // Encontrar la materia actual
  const materiaActual = programas
    .flatMap(p => p.materias)
    .find(m => m.id === cursoActivo);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generar días del mes
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Agregar días del mes anterior para completar la primera semana
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }
    
    // Agregar días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Agregar días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Filtrar programas basado en búsqueda
  const filteredProgramas = programas.filter(programa =>
    programa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    programa.materias.some(materia =>
      materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Obtener sesiones para una fecha específica
  const getSessionsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return sessionData.filter(session => session.fecha === dateString);
  };

  const getSessionStyle = (estado?: string, curso?: string) => {
    // Primero verificar el estado
    switch (estado) {
      case 'conflicto':
        return 'bg-[#fdecec] border border-[#e9683b] hover:bg-[#fdecec]';
      case 'festivo':
        return 'bg-[#fff8e6] border border-[#f4a460] hover:bg-[#fff8e6]';
      default:
        // Si no hay conflicto, usar colores por tipo de curso
        switch (curso) {
          case 'Gestión Estratégica':
            return 'bg-[#e4e9ff] border border-[#5555ea] hover:bg-[#e4e9ff]';
          case 'Marketing Digital':
            return 'bg-[#e6f7ef] border border-[#4fb37b] hover:bg-[#e6f7ef]';
          case 'Finanzas Corporativas':
            return 'bg-[#fff2e6] border border-[#ff8c42] hover:bg-[#fff2e6]';
          default:
            return 'bg-[#e4e9ff] border border-[#5555ea] hover:bg-[#e4e9ff]';
        }
    }
  };

  const handleSessionClick = (session: SessionData) => {
    setSessionSeleccionada(session);
    setModalSugerencia(true);
  };

  const togglePrograma = (programaId: number) => {
    setProgramasExpandidos(prev => ({
      ...prev,
      [programaId]: !prev[programaId]
    }));
  };

  return (
    <div className="flex h-screen bg-[#f7f8fe]">
      {/* Sidebar Izquierdo - Programas */}
      <div className="w-1/4 bg-white border-r border-[#e3e4ec] p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#3f4159]">Programas</h2>
                          <Button variant="outline" size="sm" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#596b88]" />
            <Input
              placeholder="Buscar programa o materia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e3e4ec] focus:border-[#5555ea] bg-white"
            />
          </div>

          <div className="space-y-3">
            {/* MBA - Maestría en Administración */}
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between p-3 bg-[#f7f8fe] rounded-lg cursor-pointer"
                onClick={() => setProgramasExpandidos(prev => ({ ...prev, 1: !prev[1] }))}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">MBA - Maestría en Administración</h3>
                    <p className="text-xs text-[#596b88]">MBA</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[1] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[1] && (
              
              <div className="ml-4 space-y-2">
                {/* PRIMER SEMESTRE */}
                <div className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 bg-[#5555ea] rounded-sm"></div>
                  <span className="text-xs font-medium text-[#596b88] uppercase">PRIMER SEMESTRE</span>
                </div>
                
                {/* Gestión Estratégica */}
                <Card className="border-l-4 border-[#5555ea] bg-white shadow-sm rounded-lg">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Gestión Estratégica</h4>
                        <p className="text-xs text-[#596b88]">GES001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#5555ea] text-white text-xs px-2 py-1 h-6"
                        >
                          G01
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#e9683b] text-[#e9683b] text-xs px-2 py-1 h-6 hover:bg-[#fdecec]"
                        >
                          G02
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                                 {/* Marketing Digital */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Marketing Digital</h4>
                        <p className="text-xs text-[#596b88]">MKT001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#b8860b] text-[#b8860b] text-xs px-2 py-1 h-6 hover:bg-[#fff8e6]"
                        >
                          G01
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* SEGUNDO SEMESTRE */}
                <div className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 bg-[#5555ea] rounded-sm"></div>
                  <span className="text-xs font-medium text-[#596b88] uppercase">SEGUNDO SEMESTRE</span>
                </div>
                
                                 {/* Liderazgo y Equipos */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Liderazgo y Equipos</h4>
                        <p className="text-xs text-[#596b88]">LID001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#5555ea] text-[#5555ea] text-xs px-2 py-1 h-6 hover:bg-[#e4e9ff]"
                        >
                          G01
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              )}
            </div>
            
            {/* Especialización en Finanzas */}
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between p-3 hover:bg-[#f7f8fe] rounded-lg cursor-pointer"
                onClick={() => setProgramasExpandidos(prev => ({ ...prev, 2: !prev[2] }))}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">Especialización en Finanzas</h3>
                    <p className="text-xs text-[#596b88]">EFI</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[2] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[2] && (
                <div className="ml-4 space-y-2">
                {/* PRIMER SEMESTRE */}
                <div className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 bg-[#5555ea] rounded-sm"></div>
                  <span className="text-xs font-medium text-[#596b88] uppercase">PRIMER SEMESTRE</span>
                </div>
                
                                 {/* Finanzas Corporativas */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Finanzas Corporativas</h4>
                        <p className="text-xs text-[#596b88]">FIN001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#4fb37b] text-[#4fb37b] text-xs px-2 py-1 h-6 hover:bg-[#e6f7ef]"
                        >
                          G01
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#e9683b] text-[#e9683b] text-xs px-2 py-1 h-6 hover:bg-[#fdecec]"
                        >
                          G02
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                                 {/* Análisis de Inversiones */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Análisis de Inversiones</h4>
                        <p className="text-xs text-[#596b88]">INV001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#5555ea] text-[#5555ea] text-xs px-2 py-1 h-6 hover:bg-[#e4e9ff]"
                        >
                          G01
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              )}
            </div>
            
            {/* Doctorado en Administración */}
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between p-3 hover:bg-[#f7f8fe] rounded-lg cursor-pointer"
                onClick={() => setProgramasExpandidos(prev => ({ ...prev, 3: !prev[3] }))}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">Doctorado en Administración</h3>
                    <p className="text-xs text-[#596b88]">DOC</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[3] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[3] && (
                <div className="ml-4 space-y-2">
                {/* PRIMER SEMESTRE */}
                <div className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 bg-[#5555ea] rounded-sm"></div>
                  <span className="text-xs font-medium text-[#596b88] uppercase">PRIMER SEMESTRE</span>
                </div>
                
                                 {/* Metodología de Investigación */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Metodología de Investigación</h4>
                        <p className="text-xs text-[#596b88]">MET001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#b8860b] text-[#b8860b] text-xs px-2 py-1 h-6 hover:bg-[#fff8e6]"
                        >
                          G01
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                                 {/* Seminario de Investigación */}
                 <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-lg">
                   <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-[#3f4159]">Seminario de Investigación</h4>
                        <p className="text-xs text-[#596b88]">SEM001</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#e9683b] text-[#e9683b] text-xs px-2 py-1 h-6 hover:bg-[#fdecec]"
                        >
                          G01
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-[#e3e4ec] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3f4159]">Planeación de Cursos</h1>
              <p className="text-[#596b88]">
                {materiaActual?.nombre} - {materiaActual?.codigo}
              </p>
            </div>
            <Button 
              onClick={() => setModalPlaneacion(true)}
              className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Generar planeación
            </Button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 space-y-6 p-6">
                  {/* Cursos/Grupos */}
        <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
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
                  className={`border-[#e3e4ec] bg-white shadow-sm ${
                    curso.id === cursoActivo ? 'border-[#5555ea]' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-[#3f4159]">Grupo {curso.grupo}</h3>
                          <Badge className={
                            curso.estado === 'planeada' ? 'bg-[#e6f7ef] text-[#4fb37b]' :
                            curso.estado === 'conflicto' ? 'bg-[#fdecec] text-[#e9683b]' :
                            'bg-[#fff8e6] text-[#b8860b]'
                          }>
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
                            <Badge className="bg-[#fdecec] text-[#e9683b]">
                              {curso.conflictos} conflictos
                            </Badge>
                          )}
                          {curso.festivos > 0 && (
                            <Badge className="bg-[#fff8e6] text-[#b8860b]">
                              {curso.festivos} festivos
                            </Badge>
                          )}
                          {curso.adjuntos > 0 && (
                            <Badge className="bg-[#e4e9ff] text-[#5555ea]">
                              {curso.adjuntos} adjuntos
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-[#e4e9ff] text-[#3f4159] rounded-lg">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-[#e4e9ff] text-[#3f4159] rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="border-[#e3e4ec] bg-white rounded-xl">
                            <DropdownMenuItem className="text-[#3f4159] hover:bg-[#e4e9ff]">
                              <Calendar className="h-4 w-4 mr-2" />
                              Ver calendario
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#3f4159] hover:bg-[#e4e9ff]">
                              <User className="h-4 w-4 mr-2" />
                              Cambiar docente
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#3f4159] hover:bg-[#e4e9ff]">
                              <Settings className="h-4 w-4 mr-2" />
                              Editar configuración
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                <Plus className="h-4 w-4 mr-2" />
                Agregar nuevo grupo
              </Button>
            </CardContent>
          </Card>

          {/* Calendario de Planeación */}
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
                  <Button variant="outline" size="sm" onClick={handlePrevMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium text-[#3f4159]">
                    {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleNextMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    <ChevronRight className="h-4 w-4" />
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
                          className={`mt-1 p-1 text-xs cursor-pointer transition-colors ${getSessionStyle(session.estado, session.curso)}`}
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
      </div>

      {/* Panel Derecho - Contextual */}
      <div className="w-1/5 space-y-4 p-6">
        <Card className="border-[#e3e4ec] bg-white shadow-sm rounded-xl">
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
            
            <div className="pt-3 border-t border-[#e3e4ec]">
              <div className="text-base font-medium text-[#3f4159] mb-3">Validaciones</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#4fb37b]">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Horas cumplidas</span>
                </div>
                <div className="flex items-center gap-2 text-[#e9683b]">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Cruce de horario</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                className="w-full bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
              >
                Confirmar cambios
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
              >
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Flotante de Acciones */}
             <div className="fixed bottom-6 right-6 w-64">
         <Card className="border-[#e3e4ec] bg-white shadow-lg rounded-xl">
          <CardContent className="p-4 space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-[#3f4159] hover:bg-[#e4e9ff]"
              onClick={() => setDrawerAbierto(true)}
            >
              <MessageSquare className="h-4 w-4 mr-3" />
              Sugerencias/Cambios
              <Badge className="ml-auto bg-[#e9683b] text-white text-xs">3</Badge>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-[#3f4159] hover:bg-[#e4e9ff]"
              onClick={() => setHistorialAbierto(true)}
            >
              <History className="h-4 w-4 mr-3" />
              Historial de versiones
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-[#3f4159] hover:bg-[#e4e9ff]"
              onClick={() => setPublicarAbierto(true)}
            >
              <Send className="h-4 w-4 mr-3" />
              Publicar
            </Button>
          </CardContent>
        </Card>
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