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
  Clock
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

// Mock data for planeaciones
const planeaciones = [
  {
    id: 1,
    nombre: "MBA · 2026-01 · Cohorte 3",
    programa: "MBA",
    periodo: "2026-01",
    cohorte: "Cohorte 3",
    estado: "publicada",
    cursosPlaneados: 8,
    cursosTotal: 10,
    conflictos: 0,
    version: "v2.1",
    actualizado: "2024-01-15"
  },
  {
    id: 2,
    nombre: "Especialización en Finanzas · 2026-01",
    programa: "Esp. Finanzas",
    periodo: "2026-01",
    cohorte: "Única",
    estado: "aprobada",
    cursosPlaneados: 6,
    cursosTotal: 8,
    conflictos: 2,
    version: "v1.3",
    actualizado: "2024-01-12"
  },
  {
    id: 3,
    nombre: "Maestría en Mercadeo · 2026-02",
    programa: "Maestría Mercadeo",
    periodo: "2026-02",
    cohorte: "Cohorte 1",
    estado: "borrador",
    cursosPlaneados: 3,
    cursosTotal: 12,
    conflictos: 0,
    version: "v0.8",
    actualizado: "2024-01-10"
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
    periodo: "",
    programa: "",
    estado: ""
  });
  const [modalNueva, setModalNueva] = useState(false);
  const [nuevaPlaneacion, setNuevaPlaneacion] = useState({
    programa: "",
    periodo: "",
    cohorte: "",
    nombre: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const planeacionesFiltradas = planeaciones.filter(planeacion => {
    return (
      planeacion.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) &&
      (filtros.periodo === "" || planeacion.periodo === filtros.periodo) &&
      (filtros.programa === "" || planeacion.programa === filtros.programa) &&
      (filtros.estado === "" || planeacion.estado === filtros.estado)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Planeaciones</h1>
          <p className="text-muted-foreground">
            Gestiona las planeaciones académicas de los programas de posgrado
          </p>
        </div>
        <Dialog open={modalNueva} onOpenChange={setModalNueva}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva planeación
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nueva planeación</DialogTitle>
              <DialogDescription>
                Crea una nueva planeación académica para un programa y cohorte específicos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="programa">Programa</Label>
                  <Select value={nuevaPlaneacion.programa} onValueChange={(value) => 
                    setNuevaPlaneacion(prev => ({ ...prev, programa: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="esp-finanzas">Especialización en Finanzas</SelectItem>
                      <SelectItem value="maestria-mercadeo">Maestría en Mercadeo</SelectItem>
                      <SelectItem value="maestria-gestion">Maestría en Gestión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodo">Periodo</Label>
                  <Select value={nuevaPlaneacion.periodo} onValueChange={(value) => 
                    setNuevaPlaneacion(prev => ({ ...prev, periodo: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ej. 2026-01" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2026-01">2026-01</SelectItem>
                      <SelectItem value="2026-02">2026-02</SelectItem>
                      <SelectItem value="2026-03">2026-03</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cohorte">Cohorte</Label>
                <Input
                  placeholder="Ej. Cohorte 3, Única"
                  value={nuevaPlaneacion.cohorte}
                  onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, cohorte: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre (opcional)</Label>
                <Input
                  placeholder="Se genera automáticamente si se deja vacío"
                  value={nuevaPlaneacion.nombre}
                  onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, nombre: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha preferente de inicio</Label>
                  <Input
                    type="date"
                    value={nuevaPlaneacion.fechaInicio}
                    onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, fechaInicio: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha preferente de fin</Label>
                  <Input
                    type="date"
                    value={nuevaPlaneacion.fechaFin}
                    onChange={(e) => setNuevaPlaneacion(prev => ({ ...prev, fechaFin: e.target.value }))}
                  />
                </div>
              </div>
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
                  placeholder="Buscar por nombre, programa o periodo..."
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
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="2026-01">2026-01</SelectItem>
                  <SelectItem value="2026-02">2026-02</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Label>Programa</Label>
              <Select value={filtros.programa} onValueChange={(value) => 
                setFiltros(prev => ({ ...prev, programa: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="Esp. Finanzas">Esp. Finanzas</SelectItem>
                  <SelectItem value="Maestría Mercadeo">Maestría Mercadeo</SelectItem>
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
                  <SelectItem value="">Todos</SelectItem>
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
                  {filtros.busqueda || filtros.periodo || filtros.programa || filtros.estado
                    ? "No hay resultados con estos filtros. Ajusta los criterios de búsqueda."
                    : "Aún no hay planeaciones creadas. Crea la primera planeación."}
                </p>
              </div>
              {!(filtros.busqueda || filtros.periodo || filtros.programa || filtros.estado) && (
                <Button onClick={() => setModalNueva(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva planeación
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
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Programa:</span> {planeacion.programa}
                      </div>
                      <div>
                        <span className="font-medium">Periodo:</span> {planeacion.periodo}
                      </div>
                      <div>
                        <span className="font-medium">Cursos:</span> {planeacion.cursosPlaneados}/{planeacion.cursosTotal}
                      </div>
                      <div>
                        <span className="font-medium">Versión:</span> {planeacion.version}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}