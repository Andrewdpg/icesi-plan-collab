import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Copy,
  Archive,
  Download,
  History,
  AlertTriangle,
  CheckCircle,
  Clock,
  GraduationCap,
  BookOpen
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for planeaciones semestrales
const planeaciones = [
  {
    id: 1,
    nombre: "Planeación Académica 2024-2",
    periodo: "2024-2",
    fechaInicio: "2024-08-15",
    fechaFin: "2024-12-15",
    estado: "publicada",
    programasIncluidos: [
      { nombre: "MBA", cursosPlaneados: 8, cursosTotal: 10 },
      { nombre: "Especialización en Finanzas", cursosPlaneados: 6, cursosTotal: 8 },
      { nombre: "Maestría en Mercadeo", cursosPlaneados: 5, cursosTotal: 6 },
      { nombre: "Doctorado en Administración", cursosPlaneados: 3, cursosTotal: 4 }
    ],
    totalCursos: 22,
    totalCursosPlaneados: 28,
    conflictos: 2,
    version: "v3.1",
    actualizado: "2024-01-15",
    descripcion: "Planeación académica del segundo semestre de 2024"
  },
  {
    id: 2,
    nombre: "Planeación Académica 2025-1",
    periodo: "2025-1",
    fechaInicio: "2025-01-20",
    fechaFin: "2025-05-30",
    estado: "aprobada",
    programasIncluidos: [
      { nombre: "MBA", cursosPlaneados: 12, cursosTotal: 12 },
      { nombre: "Especialización en Finanzas", cursosPlaneados: 8, cursosTotal: 10 },
      { nombre: "Maestría en Mercadeo", cursosPlaneados: 4, cursosTotal: 8 },
      { nombre: "Doctorado en Administración", cursosPlaneados: 2, cursosTotal: 4 }
    ],
    totalCursos: 26,
    totalCursosPlaneados: 34,
    conflictos: 5,
    version: "v2.4",
    actualizado: "2024-01-12",
    descripcion: "Planeación académica del primer semestre de 2025"
  },
  {
    id: 3,
    nombre: "Planeación Académica 2025-2",
    periodo: "2025-2",
    fechaInicio: "2025-08-18",
    fechaFin: "2025-12-18",
    estado: "borrador",
    programasIncluidos: [
      { nombre: "MBA", cursosPlaneados: 3, cursosTotal: 12 },
      { nombre: "Especialización en Finanzas", cursosPlaneados: 2, cursosTotal: 8 },
      { nombre: "Maestría en Mercadeo", cursosPlaneados: 1, cursosTotal: 6 },
      { nombre: "Doctorado en Administración", cursosPlaneados: 0, cursosTotal: 4 }
    ],
    totalCursos: 6,
    totalCursosPlaneados: 30,
    conflictos: 0,
    version: "v1.0",
    actualizado: "2024-01-10",
    descripcion: "Planeación académica del segundo semestre de 2025 (en desarrollo)"
  }
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'publicada': return 'bg-status-published text-primary';
    case 'aprobada': return 'bg-status-approved text-success';
    case 'borrador': return 'bg-status-draft text-muted-foreground';
    case 'en-revision': return 'bg-status-review text-warning';
    case 'cerrada': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case 'publicada': return <CheckCircle className="h-4 w-4" />;
    case 'aprobada': return <CheckCircle className="h-4 w-4" />;
    case 'borrador': return <Clock className="h-4 w-4" />;
    case 'en-revision': return <AlertTriangle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

export default function PlaneacionIndex() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    busqueda: "",
    periodo: "all",
    estado: "all"
  });
  const [modalNueva, setModalNueva] = useState(false);
  const [nuevaPlaneacion, setNuevaPlaneacion] = useState({
    nombre: "",
    periodo: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  });

  const planeacionesFiltradas = planeaciones.filter(planeacion => {
    return (
      planeacion.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) &&
      (filtros.periodo === "all" || filtros.periodo === "" || planeacion.periodo === filtros.periodo) &&
      (filtros.estado === "all" || filtros.estado === "" || planeacion.estado === filtros.estado)
    );
  });

  const handleCrearPlaneacion = () => {
    // Simular creación y redirigir al constructor
    const nuevaId = Math.max(...planeaciones.map(p => p.id)) + 1;
    navigate(`/planeacion/${nuevaId}`);
    setModalNueva(false);
  };

  const handleAbrirPlaneacion = (id: number) => {
    navigate(`/planeacion/${id}`);
  };

  const getProgresoTotal = (planeacion: typeof planeaciones[0]) => {
    return Math.round((planeacion.totalCursos / planeacion.totalCursosPlaneados) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Planeación Académica</h1>
          <p className="text-muted-foreground">
            Gestiona las planeaciones académicas semestrales de todos los programas de posgrado
          </p>
        </div>
        <Dialog open={modalNueva} onOpenChange={setModalNueva}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva planeación semestral
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nueva planeación semestral</DialogTitle>
              <DialogDescription>
                Crea una nueva planeación académica para un semestre específico que incluirá todos los programas de posgrado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="periodo">Periodo Académico *</Label>
                <Select value={nuevaPlaneacion.periodo} onValueChange={(value) => 
                  setNuevaPlaneacion(prev => ({ ...prev, periodo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ej. 2025-1, 2025-2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-1">2025-1 (Primer semestre 2025)</SelectItem>
                    <SelectItem value="2025-2">2025-2 (Segundo semestre 2025)</SelectItem>
                    <SelectItem value="2025-3">2025-3 (Tercer semestre 2025)</SelectItem>
                    <SelectItem value="2026-1">2026-1 (Primer semestre 2026)</SelectItem>
                    <SelectItem value="2026-2">2026-2 (Segundo semestre 2026)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de inicio del semestre</Label>
                  <Input
                    type="date"
                    value={nuevaPlaneacion.fechaInicio}
                    onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, fechaInicio: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de fin del semestre</Label>
                  <Input
                    type="date"
                    value={nuevaPlaneacion.fechaFin}
                    onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, fechaFin: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la planeación (opcional)</Label>
                <Input
                  placeholder="Se generará automáticamente como 'Planeación Académica [Periodo]'"
                  value={nuevaPlaneacion.nombre}
                  onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, nombre: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Textarea
                  placeholder="Descripción o notas sobre esta planeación semestral..."
                  value={nuevaPlaneacion.descripcion}
                  onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              {/* Información sobre programas */}
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Programas incluidos</p>
                      <p className="text-muted-foreground">
                        Esta planeación incluirá automáticamente todos los programas de posgrado activos: 
                        MBA, Especialización en Finanzas, Maestría en Mercadeo, y Doctorado en Administración.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalNueva(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCrearPlaneacion}>
                Crear planeación
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busqueda"
                  placeholder="Buscar por nombre o periodo..."
                  className="pl-10"
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                />
              </div>
            </div>
            <div className="w-40">
              <Label>Periodo</Label>
              <Select value={filtros.periodo} onValueChange={(value) => 
                setFiltros(prev => ({ ...prev, periodo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="2024-2">2024-2</SelectItem>
                  <SelectItem value="2025-1">2025-1</SelectItem>
                  <SelectItem value="2025-2">2025-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Label>Estado</Label>
              <Select value={filtros.estado} onValueChange={(value) => 
                setFiltros(prev => ({ ...prev, estado: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="en-revision">En revisión</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="publicada">Publicada</SelectItem>
                  <SelectItem value="cerrada">Cerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla/Cards de planeaciones */}
      {planeacionesFiltradas.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">No hay planeaciones</h3>
                <p className="text-muted-foreground">
                  {filtros.busqueda || filtros.periodo || filtros.estado
                    ? "No hay resultados con estos filtros. Ajusta los criterios de búsqueda."
                    : "Aún no hay planeaciones semestrales creadas. Crea la primera planeación."}
                </p>
              </div>
              {!(filtros.busqueda || filtros.periodo || filtros.estado) && (
                <Button onClick={() => setModalNueva(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva planeación semestral
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {planeacionesFiltradas.map((planeacion) => (
            <Card key={planeacion.id} className="hover:shadow-soft transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header de la planeación */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{planeacion.nombre}</h3>
                      <Badge className={getEstadoColor(planeacion.estado)}>
                        <div className="flex items-center gap-1">
                          {getEstadoIcon(planeacion.estado)}
                          {planeacion.estado}
                        </div>
                      </Badge>
                      {planeacion.conflictos > 0 && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {planeacion.conflictos} conflictos
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleAbrirPlaneacion(planeacion.id)}
                        variant="default"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Abrir
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAbrirPlaneacion(planeacion.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Abrir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="h-4 w-4 mr-2" />
                            Ver historial
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Archive className="h-4 w-4 mr-2" />
                            Archivar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Información general */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Periodo:</span>
                      <p className="font-medium">{planeacion.periodo}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Progreso:</span>
                      <p className="font-medium">{planeacion.totalCursos}/{planeacion.totalCursosPlaneados} cursos ({getProgresoTotal(planeacion)}%)</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Versión:</span>
                      <p className="font-medium">{planeacion.version}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Actualizado:</span>
                      <p className="font-medium">{new Date(planeacion.actualizado).toLocaleDateString()}</p>
                    </div>
                  </div>


                  {/* Descripción si existe */}
                  {planeacion.descripcion && (
                    <div>
                      <p className="text-sm text-muted-foreground">{planeacion.descripcion}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}