import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search,
  Filter,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  X,
  ChevronRight,
  Lock,
  Unlock,
  MessageSquare,
  History,
  Eye
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SuggestionReviewModal } from "./suggestion-review-modal";

interface Suggestion {
  id: number;
  tipo: "propuesta_docente" | "sugerencia_director";
  curso: string;
  grupo: string;
  fechaAfectada: string;
  solicitante: string;
  resumen: string;
  estado: "pendiente" | "en_revision" | "aprobada" | "rechazada" | "aplicada";
  descripcion: string;
  fechaCreacion: string;
  adjuntos?: number;
  cambiosPropuestos: {
    actual: string;
    propuesto: string;
  };
  comentarios?: {
    aprobacion?: string;
    rechazo?: string;
    fechaDecision?: string;
    revisor?: string;
  };
}

const mockSugerencias: Suggestion[] = [
  {
    id: 1,
    tipo: "propuesta_docente",
    curso: "Gestión Estratégica",
    grupo: "01",
    fechaAfectada: "2025-10-25",
    solicitante: "Dr. Carlos Mendoza",
    resumen: "Cambio de horario por conferencia internacional",
    estado: "pendiente",
    descripcion: "Solicito cambiar la clase del viernes 25 de octubre de 8:00-10:00 AM a 2:00-4:00 PM debido a mi participación en la conferencia internacional de gestión.",
    fechaCreacion: "2025-10-20",
    adjuntos: 1,
    cambiosPropuestos: {
      actual: "Viernes 25 Oct, 8:00-10:00 AM, Aula 204",
      propuesto: "Viernes 25 Oct, 2:00-4:00 PM, Aula 204"
    }
  },
  {
    id: 2,
    tipo: "sugerencia_director",
    curso: "Marketing Digital",
    grupo: "01",
    fechaAfectada: "2025-11-02",
    solicitante: "Dra. Ana García",
    resumen: "Ajuste de modalidad para mejor cobertura",
    estado: "en_revision",
    descripcion: "Sugiero cambiar la modalidad de esta sesión a híbrida para permitir la participación de estudiantes que estarán en práctica empresarial.",
    fechaCreacion: "2025-10-18",
    cambiosPropuestos: {
      actual: "Sábado 2 Nov, 9:00-12:00 AM, Presencial",
      propuesto: "Sábado 2 Nov, 9:00-12:00 AM, Híbrida"
    }
  },
  {
    id: 3,
    tipo: "propuesta_docente",
    curso: "Finanzas Corporativas",
    grupo: "02",
    fechaAfectada: "2025-10-30",
    solicitante: "Dr. Roberto Silva",
    resumen: "Sesión adicional para recuperar clase perdida",
    estado: "aprobada",
    descripcion: "Propongo agregar una sesión de recuperación el miércoles 30 de octubre para compensar la clase cancelada por el paro de transporte.",
    fechaCreacion: "2025-10-15",
    cambiosPropuestos: {
      actual: "Sin sesión programada",
      propuesto: "Miércoles 30 Oct, 6:00-9:00 PM, Virtual"
    },
    comentarios: {
      aprobacion: "Aprobado. La sesión de recuperación es necesaria para mantener el cronograma académico.",
      fechaDecision: "2025-10-16",
      revisor: "Dra. María López"
    }
  },
  {
    id: 4,
    tipo: "sugerencia_director",
    curso: "Análisis de Datos",
    grupo: "01",
    fechaAfectada: "2025-09-15",
    solicitante: "Dr. Luis Pérez",
    resumen: "Cambio de aula por mantenimiento",
    estado: "rechazada",
    descripcion: "Solicito cambiar el aula debido a trabajos de mantenimiento programados en el laboratorio de computación.",
    fechaCreacion: "2025-09-10",
    cambiosPropuestos: {
      actual: "Lunes 15 Sep, 2:00-5:00 PM, Lab 101",
      propuesto: "Lunes 15 Sep, 2:00-5:00 PM, Aula 205"
    },
    comentarios: {
      rechazo: "No se puede aprobar. El aula 205 no tiene la capacidad técnica requerida para el laboratorio de análisis de datos.",
      fechaDecision: "2025-09-12",
      revisor: "Ing. Carlos Ruiz"
    }
  },
  {
    id: 5,
    tipo: "propuesta_docente",
    curso: "Metodología de Investigación",
    grupo: "02",
    fechaAfectada: "2025-08-20",
    solicitante: "Dra. Patricia Vega",
    resumen: "Sesión virtual por viaje académico",
    estado: "aplicada",
    descripcion: "Solicito cambiar la sesión presencial a virtual debido a mi participación en un congreso internacional de metodología.",
    fechaCreacion: "2025-08-15",
    cambiosPropuestos: {
      actual: "Martes 20 Ago, 6:00-9:00 PM, Presencial",
      propuesto: "Martes 20 Ago, 6:00-9:00 PM, Virtual"
    },
    comentarios: {
      aprobacion: "Aprobado y aplicado. La sesión se realizó exitosamente en modalidad virtual.",
      fechaDecision: "2025-08-16",
      revisor: "Dr. Miguel Torres"
    }
  }
];

interface SuggestionsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuggestionsDrawer({ open, onOpenChange }: SuggestionsDrawerProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [filterEstado, setFilterEstado] = useState<string>("todas");
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pendientes");

  // Resetear filtros cuando cambie de tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchTerm("");
    setFilterEstado("todas");
    setFilterTipo("todos");
  };

  // NUEVO: Estado para fase de recomendaciones
  const [faseRecomendaciones, setFaseRecomendaciones] = useState({
    activa: true,
    fechaInicio: "2025-01-01", // Fecha pasada para que esté activa
    fechaFin: "2025-12-31", // Fecha futura para que esté activa
    bloqueada: false,
    forzarApertura: false // NUEVO: Para forzar apertura aunque haya pasado la fecha
  });

  // NUEVO: Función para verificar si la fase está activa
  const esFaseActiva = () => {
    const ahora = new Date();
    const inicio = new Date(faseRecomendaciones.fechaInicio + 'T00:00:00');
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const dentroDelPeriodo = ahora >= inicio && ahora <= fin;
    
    // Si está bloqueada manualmente, no está activa
    if (faseRecomendaciones.bloqueada) return false;
    
    // Si está dentro del período o se fuerza la apertura, está activa
    return dentroDelPeriodo || faseRecomendaciones.forzarApertura;
  };

  // NUEVO: Función para obtener el estado de la fase
  const getEstadoFase = () => {
    if (faseRecomendaciones.bloqueada) return "bloqueada";
    
    const ahora = new Date();
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const haPasadoLaFecha = ahora > fin;
    
    if (haPasadoLaFecha && !faseRecomendaciones.forzarApertura) {
      return "cerrada";
    }
    
    return "activa";
  };

  // NUEVO: Función para obtener el tiempo restante
  const getTiempoRestante = () => {
    const ahora = new Date();
    const fin = new Date(faseRecomendaciones.fechaFin);
    const diferencia = fin.getTime() - ahora.getTime();
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return dias > 0 ? `${dias} días` : "Finalizada";
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en_revision': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'aprobada': return 'bg-green-100 text-green-800 border-green-200';
      case 'rechazada': return 'bg-red-100 text-red-800 border-red-200';
      case 'aplicada': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'propuesta_docente' ? User : AlertTriangle;
  };

  // Separar sugerencias por estado
  const sugerenciasPendientes = mockSugerencias.filter(s => 
    s.estado === 'pendiente' || s.estado === 'en_revision'
  );
  
  const sugerenciasHistorial = mockSugerencias.filter(s => 
    s.estado === 'aprobada' || s.estado === 'rechazada' || s.estado === 'aplicada'
  );

  // Obtener sugerencias según el tab activo
  const currentSugerencias = activeTab === 'pendientes' ? sugerenciasPendientes : sugerenciasHistorial;
  
  const filteredSugerencias = currentSugerencias.filter(s => {
    const matchesEstado = filterEstado === 'todas' || s.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || s.tipo === filterTipo;
    const matchesSearch = searchTerm === '' || 
      s.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.resumen.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesEstado && matchesTipo && matchesSearch;
  });



  const handleApprove = (id: number, comentario: string) => {
    // Implementar lógica de aprobación
    console.log(`Aprobar sugerencia ${id} - Comentario: ${comentario}`);
    setReviewModalOpen(false);
    setSelectedSuggestion(null);
  };

  const handleReject = (id: number, comentario: string) => {
    // Implementar lógica de rechazo
    console.log(`Rechazar sugerencia ${id} - Comentario: ${comentario}`);
    setReviewModalOpen(false);
    setSelectedSuggestion(null);
  };

  const handleReviewSuggestion = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setReviewModalOpen(true);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl">Sugerencias y Cambios</SheetTitle>
                <SheetDescription>
                  Gestiona propuestas de docentes y sugerencias de directores
                </SheetDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Banner de estado de fase */}
            {!esFaseActiva() && (
              <Alert className="mt-4 bg-[#fdecec] border-[#e9683b]">
                <Lock className="h-4 w-4 text-[#e9683b]" />
                <AlertDescription className="text-[#e9683b]">
                  {getEstadoFase() === 'bloqueada' 
                    ? 'La fase de recomendaciones está bloqueada manualmente. No se pueden enviar nuevas sugerencias.'
                    : 'La fase de recomendaciones está cerrada. No se pueden enviar nuevas sugerencias.'
                  }
                </AlertDescription>
              </Alert>
            )}
            
            {/* Banner de fase activa */}
            {esFaseActiva() && (
              <Alert className="mt-4 bg-[#e6f7ef] border-[#4fb37b]">
                <Unlock className="h-4 w-4 text-[#4fb37b]" />
                <AlertDescription className="text-[#4fb37b]">
                  Fase de recomendaciones activa. Los directores pueden enviar sugerencias hasta el {faseRecomendaciones.fechaFin} ({getTiempoRestante()}).
                </AlertDescription>
              </Alert>
            )}
          </SheetHeader>

          <div className="flex-1 flex flex-col">
            {/* Tabs para separar pendientes e historial */}
            <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="pendientes" className="flex-1 flex flex-col">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pendientes" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Pendientes ({sugerenciasPendientes.length})
                  </TabsTrigger>
                  <TabsTrigger value="historial" className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Historial ({sugerenciasHistorial.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pendientes" className="flex-1 flex flex-col p-6 space-y-4">
                {/* Filtros y búsqueda */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por curso, docente o descripción..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Select value={filterTipo} onValueChange={setFilterTipo}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los tipos</SelectItem>
                        <SelectItem value="propuesta_docente">Propuesta Docente</SelectItem>
                        <SelectItem value="sugerencia_director">Sugerencia Director</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterEstado} onValueChange={setFilterEstado}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todos los estados</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_revision">En Revisión</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Lista de sugerencias */}
                <div className="flex-1 space-y-3 overflow-y-auto min-h-0">
                  {filteredSugerencias.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No hay sugerencias pendientes</p>
                    </div>
                  ) : (
                    filteredSugerencias.map((sugerencia) => {
                      const TipoIcon = getTipoIcon(sugerencia.tipo);
                      return (
                        <Card 
                          key={sugerencia.id}
                          className="cursor-pointer hover:shadow-soft transition-all"
                          onClick={() => handleReviewSuggestion(sugerencia)}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <TipoIcon className="h-4 w-4 text-muted-foreground" />
                                <Badge 
                                  variant="outline"
                                  className={getEstadoColor(sugerencia.estado)}
                                >
                                  {sugerencia.estado.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReviewSuggestion(sugerencia);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm">
                                {sugerencia.curso} - Grupo {sugerencia.grupo}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {sugerencia.resumen}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                {sugerencia.solicitante}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(sugerencia.fechaAfectada).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </TabsContent>

              <TabsContent value="historial" className="flex-1 flex flex-col p-6 space-y-4">
                {/* Filtros y búsqueda */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar en historial..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Select value={filterTipo} onValueChange={setFilterTipo}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los tipos</SelectItem>
                        <SelectItem value="propuesta_docente">Propuesta Docente</SelectItem>
                        <SelectItem value="sugerencia_director">Sugerencia Director</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterEstado} onValueChange={setFilterEstado}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todos los estados</SelectItem>
                        <SelectItem value="aprobada">Aprobada</SelectItem>
                        <SelectItem value="rechazada">Rechazada</SelectItem>
                        <SelectItem value="aplicada">Aplicada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Lista de sugerencias */}
                <div className="flex-1 space-y-3 overflow-y-auto min-h-0">
                  {filteredSugerencias.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No hay sugerencias en el historial</p>
                    </div>
                  ) : (
                    filteredSugerencias.map((sugerencia) => {
                      const TipoIcon = getTipoIcon(sugerencia.tipo);
                      return (
                        <Card 
                          key={sugerencia.id}
                          className="cursor-pointer hover:shadow-soft transition-all"
                          onClick={() => handleReviewSuggestion(sugerencia)}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <TipoIcon className="h-4 w-4 text-muted-foreground" />
                                <Badge 
                                  variant="outline"
                                  className={getEstadoColor(sugerencia.estado)}
                                >
                                  {sugerencia.estado.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReviewSuggestion(sugerencia);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm">
                                {sugerencia.curso} - Grupo {sugerencia.grupo}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {sugerencia.resumen}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                {sugerencia.solicitante}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(sugerencia.fechaAfectada).toLocaleDateString()}
                              </div>
                            </div>

                            {/* Mostrar comentarios si existen */}
                            {sugerencia.comentarios && (
                              <div className="pt-2 border-t">
                                <div className="text-xs text-muted-foreground">
                                  {sugerencia.comentarios.aprobacion && (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <CheckCircle className="h-3 w-3" />
                                      <span>Aprobado</span>
                                    </div>
                                  )}
                                  {sugerencia.comentarios.rechazo && (
                                    <div className="flex items-center gap-1 text-red-600">
                                      <XCircle className="h-3 w-3" />
                                      <span>Rechazado</span>
                                    </div>
                                  )}
                                  {sugerencia.comentarios.revisor && (
                                    <span className="text-muted-foreground">
                                      por {sugerencia.comentarios.revisor}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
      
      {/* Modal de revisión detallada */}
      <SuggestionReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        suggestion={selectedSuggestion}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </Sheet>
  );
}