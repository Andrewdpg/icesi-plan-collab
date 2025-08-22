import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ChevronRight
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
}

const mockSugerencias: Suggestion[] = [
  {
    id: 1,
    tipo: "propuesta_docente",
    curso: "Gestión Estratégica",
    grupo: "01",
    fechaAfectada: "2024-10-25",
    solicitante: "Dr. Carlos Mendoza",
    resumen: "Cambio de horario por conferencia internacional",
    estado: "pendiente",
    descripcion: "Solicito cambiar la clase del viernes 25 de octubre de 8:00-10:00 AM a 2:00-4:00 PM debido a mi participación en la conferencia internacional de gestión.",
    fechaCreacion: "2024-10-20",
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
    fechaAfectada: "2024-11-02",
    solicitante: "Dra. Ana García",
    resumen: "Ajuste de modalidad para mejor cobertura",
    estado: "en_revision",
    descripcion: "Sugiero cambiar la modalidad de esta sesión a híbrida para permitir la participación de estudiantes que estarán en práctica empresarial.",
    fechaCreacion: "2024-10-18",
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
    fechaAfectada: "2024-10-30",
    solicitante: "Dr. Roberto Silva",
    resumen: "Sesión adicional para recuperar clase perdida",
    estado: "aprobada",
    descripcion: "Propongo agregar una sesión de recuperación el miércoles 30 de octubre para compensar la clase cancelada por el paro de transporte.",
    fechaCreacion: "2024-10-15",
    cambiosPropuestos: {
      actual: "Sin sesión programada",
      propuesto: "Miércoles 30 Oct, 6:00-9:00 PM, Virtual"
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-status-draft text-muted-foreground';
      case 'en_revision': return 'bg-secondary text-secondary-foreground';
      case 'aprobada': return 'bg-status-approved text-success-foreground';
      case 'rechazada': return 'bg-status-conflict text-destructive-foreground';
      case 'aplicada': return 'bg-status-published text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'propuesta_docente' ? User : AlertTriangle;
  };

  const filteredSugerencias = mockSugerencias.filter(s => {
    const matchesEstado = filterEstado === 'todas' || s.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || s.tipo === filterTipo;
    const matchesSearch = searchTerm === '' || 
      s.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.resumen.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesEstado && matchesTipo && matchesSearch;
  });

  const handleApprove = (id: number) => {
    // Implementar lógica de aprobación
    console.log(`Aprobar sugerencia ${id}`);
  };

  const handleReject = (id: number, motivo: string) => {
    // Implementar lógica de rechazo
    console.log(`Rechazar sugerencia ${id} - Motivo: ${motivo}`);
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
          </SheetHeader>

          {!selectedSuggestion ? (
            <div className="flex-1 flex flex-col p-6 space-y-4">
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
                      <SelectItem value="aprobada">Aprobada</SelectItem>
                      <SelectItem value="rechazada">Rechazada</SelectItem>
                      <SelectItem value="aplicada">Aplicada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Lista de sugerencias */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {filteredSugerencias.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay sugerencias que coincidan con los filtros</p>
                  </div>
                ) : (
                  filteredSugerencias.map((sugerencia) => {
                    const TipoIcon = getTipoIcon(sugerencia.tipo);
                    return (
                      <Card 
                        key={sugerencia.id}
                        className="cursor-pointer hover:shadow-soft transition-all"
                        onClick={() => setSelectedSuggestion(sugerencia)}
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
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
            </div>
          ) : (
            // Vista de detalle
            <div className="flex-1 flex flex-col p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSuggestion(null)}
                >
                  ← Volver
                </Button>
                <Badge className={getEstadoColor(selectedSuggestion.estado)}>
                  {selectedSuggestion.estado.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedSuggestion.curso} - Grupo {selectedSuggestion.grupo}
                  </h3>
                  <p className="text-muted-foreground">{selectedSuggestion.resumen}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Solicitante:</span>
                    <p className="font-medium">{selectedSuggestion.solicitante}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha afectada:</span>
                    <p className="font-medium">
                      {new Date(selectedSuggestion.fechaAfectada).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>
                    <p className="font-medium">
                      {selectedSuggestion.tipo === 'propuesta_docente' ? 'Propuesta Docente' : 'Sugerencia Director'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Creado:</span>
                    <p className="font-medium">
                      {new Date(selectedSuggestion.fechaCreacion).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Descripción</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {selectedSuggestion.descripcion}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Comparación de Cambios</h4>
                  <div className="space-y-3">
                    <div className="bg-status-conflict p-3 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground mb-1">ACTUAL</div>
                      <div className="text-sm">{selectedSuggestion.cambiosPropuestos.actual}</div>
                    </div>
                    <div className="bg-status-approved p-3 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground mb-1">PROPUESTO</div>
                      <div className="text-sm">{selectedSuggestion.cambiosPropuestos.propuesto}</div>
                    </div>
                  </div>
                </div>

                {selectedSuggestion.adjuntos && selectedSuggestion.adjuntos > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Adjuntos ({selectedSuggestion.adjuntos})</h4>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver adjuntos
                    </Button>
                  </div>
                )}

                {selectedSuggestion.estado === 'pendiente' && (
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <h4 className="font-medium">Acciones</h4>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleApprove(selectedSuggestion.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprobar
                      </Button>
                      <Button 
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleReject(selectedSuggestion.id, '')}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Rechazar
                      </Button>
                    </div>
                    <Textarea 
                      placeholder="Comentarios adicionales (opcional para aprobación, requerido para rechazo)..."
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}