import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  X,
  Calendar,
  Clock,
  User,
  Building,
  BookOpen,
  MapPin,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Clock4,
  Eye,
  Edit,
  Download,
  Share2,
  FilterX,
  SlidersHorizontal,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SearchResult {
  id: string;
  tipo: "planeacion" | "curso" | "profesor" | "espacio";
  titulo: string;
  descripcion: string;
  programa?: string;
  estado?: string;
  fecha?: string;
  usuario?: string;
  relevancia: number;
  tags: string[];
}

interface FilterState {
  tipo: string[];
  programa: string[];
  estado: string[];
  fechaDesde: string;
  fechaHasta: string;
  usuario: string;
  tags: string[];
}

export default function BusquedaAvanzada() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    tipo: [],
    programa: [],
    estado: [],
    fechaDesde: "",
    fechaHasta: "",
    usuario: "",
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  // Datos de ejemplo
  const programas = ["MBA", "Maestría en Finanzas", "Maestría en Marketing", "Especialización en Logística"];
  const estados = ["Activo", "Inactivo", "Borrador", "Publicado", "Pendiente"];
  const tipos = ["Planeación", "Curso", "Profesor", "Espacio"];
  const tags = ["Urgente", "Conflicto", "Aprobado", "Revisión", "Nuevo"];

  // Resultados de búsqueda simulados
  const searchResults: SearchResult[] = [
    {
      id: "1",
      tipo: "planeacion",
      titulo: "Planeación MBA Semestre 2025-1",
      descripcion: "Planeación completa del programa MBA para el primer semestre de 2024",
      programa: "MBA",
      estado: "Publicado",
      fecha: "2024-01-15",
      usuario: "María González",
      relevancia: 95,
      tags: ["Aprobado", "Completo"]
    },
    {
      id: "2",
      tipo: "curso",
      titulo: "Fundamentos de Administración",
      descripcion: "Curso introductorio a los principios fundamentales de la administración",
      programa: "MBA",
      estado: "Activo",
      fecha: "2024-01-10",
      usuario: "Carlos Mendoza",
      relevancia: 88,
      tags: ["Nuevo", "Revisión"]
    },
    {
      id: "3",
      tipo: "profesor",
      titulo: "Dr. Ana Rodríguez",
      descripcion: "Profesora titular del departamento de Finanzas",
      programa: "Maestría en Finanzas",
      estado: "Activo",
      fecha: "2024-01-08",
      usuario: "Sistema",
      relevancia: 82,
      tags: ["Experto", "Disponible"]
    },
    {
      id: "4",
      tipo: "espacio",
      titulo: "Aula 101 - Edificio Principal",
      descripcion: "Aula con capacidad para 30 estudiantes, equipada con proyector",
      programa: "Todos",
      estado: "Disponible",
      fecha: "2024-01-05",
      usuario: "Luis Pérez",
      relevancia: 75,
      tags: ["Equipado", "Accesible"]
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Búsqueda vacía",
        description: "Por favor ingresa un término de búsqueda",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Búsqueda realizada",
      description: `Encontrados ${searchResults.length} resultados para "${searchQuery}"`,
    });
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddFilter = (filterType: keyof FilterState, value: string) => {
    if (filterType === 'tipo' || filterType === 'programa' || filterType === 'estado' || filterType === 'tags') {
      const currentValues = filters[filterType] as string[];
      if (!currentValues.includes(value)) {
        handleFilterChange(filterType, [...currentValues, value]);
      }
    }
  };

  const handleRemoveFilter = (filterType: keyof FilterState, value: string) => {
    if (filterType === 'tipo' || filterType === 'programa' || filterType === 'estado' || filterType === 'tags') {
      const currentValues = filters[filterType] as string[];
      handleFilterChange(filterType, currentValues.filter(v => v !== value));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      tipo: [],
      programa: [],
      estado: [],
      fechaDesde: "",
      fechaHasta: "",
      usuario: "",
      tags: []
    });
    toast({
      title: "Filtros limpiados",
      description: "Todos los filtros han sido removidos",
    });
  };

  const saveSearch = () => {
    const searchName = `Búsqueda ${Date.now()}`;
    setSavedSearches(prev => [...prev, searchName]);
    toast({
      title: "Búsqueda guardada",
      description: `"${searchName}" ha sido guardada`,
    });
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "planeacion":
        return <Calendar className="h-4 w-4" />;
      case "curso":
        return <BookOpen className="h-4 w-4" />;
      case "profesor":
        return <User className="h-4 w-4" />;
      case "espacio":
        return <Building className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "planeacion":
        return "bg-blue-100 text-blue-800";
      case "curso":
        return "bg-green-100 text-green-800";
      case "profesor":
        return "bg-purple-100 text-purple-800";
      case "espacio":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
      case "Publicado":
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Inactivo":
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Borrador":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getRelevanciaColor = (relevancia: number) => {
    if (relevancia >= 90) return "text-green-600";
    if (relevancia >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3f4159]">Búsqueda Avanzada</h1>
        <p className="text-[#596b88] mt-2">
          Encuentra rápidamente planeaciones, cursos, profesores y espacios
        </p>
      </div>

      {/* Barra de búsqueda principal */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#596b88]" />
              <Input
                placeholder="Buscar planeaciones, cursos, profesores, espacios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button onClick={handleSearch} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-lg">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros avanzados */}
      {showFilters && (
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#3f4159] flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#5555ea]" />
                Filtros Avanzados
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Limpiar
                </Button>
                <Button
                  onClick={saveSearch}
                  variant="outline"
                  size="sm"
                  className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <select
                  onChange={(e) => e.target.value && handleAddFilter('tipo', e.target.value)}
                  className="w-full p-2 border border-[#e3e4ec] rounded-lg bg-[#f7f8fe]"
                >
                  <option value="">Seleccionar tipo</option>
                  {tipos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Programa</Label>
                <select
                  onChange={(e) => e.target.value && handleAddFilter('programa', e.target.value)}
                  className="w-full p-2 border border-[#e3e4ec] rounded-lg bg-[#f7f8fe]"
                >
                  <option value="">Seleccionar programa</option>
                  {programas.map(programa => (
                    <option key={programa} value={programa}>{programa}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <select
                  onChange={(e) => e.target.value && handleAddFilter('estado', e.target.value)}
                  className="w-full p-2 border border-[#e3e4ec] rounded-lg bg-[#f7f8fe]"
                >
                  <option value="">Seleccionar estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Usuario</Label>
                <Input
                  placeholder="Buscar por usuario"
                  value={filters.usuario}
                  onChange={(e) => handleFilterChange('usuario', e.target.value)}
                  className="bg-[#f7f8fe]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha desde</Label>
                <Input
                  type="date"
                  value={filters.fechaDesde}
                  onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
                  className="bg-[#f7f8fe]"
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha hasta</Label>
                <Input
                  type="date"
                  value={filters.fechaHasta}
                  onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
                  className="bg-[#f7f8fe]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Etiquetas</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddFilter('tags', tag)}
                    className="border-[#e3e4ec] text-[#596b88] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros activos */}
      {(filters.tipo.length > 0 || filters.programa.length > 0 || filters.estado.length > 0 || filters.tags.length > 0) && (
        <Card className="border-[#e3e4ec] bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-[#3f4159]">Filtros activos:</span>
              {filters.tipo.map(tipo => (
                <Badge key={tipo} variant="secondary" className="bg-blue-100 text-blue-800">
                  {tipo}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleRemoveFilter('tipo', tipo)}
                  />
                </Badge>
              ))}
              {filters.programa.map(programa => (
                <Badge key={programa} variant="secondary" className="bg-green-100 text-green-800">
                  {programa}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleRemoveFilter('programa', programa)}
                  />
                </Badge>
              ))}
              {filters.estado.map(estado => (
                <Badge key={estado} variant="secondary" className="bg-purple-100 text-purple-800">
                  {estado}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleRemoveFilter('estado', estado)}
                  />
                </Badge>
              ))}
              {filters.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleRemoveFilter('tags', tag)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resultados */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border-[#e3e4ec]">
          <TabsTrigger value="todos" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            Todos ({searchResults.length})
          </TabsTrigger>
          <TabsTrigger value="planeaciones" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Planeaciones
          </TabsTrigger>
          <TabsTrigger value="cursos" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Cursos
          </TabsTrigger>
          <TabsTrigger value="profesores" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profesores
          </TabsTrigger>
          <TabsTrigger value="espacios" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Building className="h-4 w-4 mr-2" />
            Espacios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="border-[#e3e4ec] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${getTipoColor(result.tipo)}`}>
                      {getTipoIcon(result.tipo)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3f4159]">{result.titulo}</h3>
                        <Badge className={getTipoColor(result.tipo)}>
                          {result.tipo.charAt(0).toUpperCase() + result.tipo.slice(1)}
                        </Badge>
                        {result.estado && (
                          <Badge className={getEstadoColor(result.estado)}>
                            {result.estado}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#596b88]">{result.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        {result.programa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {result.programa}
                          </span>
                        )}
                        {result.fecha && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.fecha}
                          </span>
                        )}
                        {result.usuario && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.usuario}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getRelevanciaColor(result.relevancia)}`}>
                          Relevancia: {result.relevancia}%
                        </span>
                        <div className="flex gap-1">
                          {result.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="planeaciones" className="space-y-4">
          {searchResults.filter(r => r.tipo === 'planeacion').map((result) => (
            <Card key={result.id} className="border-[#e3e4ec] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-800">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3f4159]">{result.titulo}</h3>
                        <Badge className="bg-blue-100 text-blue-800">Planeación</Badge>
                        {result.estado && (
                          <Badge className={getEstadoColor(result.estado)}>
                            {result.estado}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#596b88]">{result.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        {result.programa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {result.programa}
                          </span>
                        )}
                        {result.fecha && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.fecha}
                          </span>
                        )}
                        {result.usuario && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.usuario}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cursos" className="space-y-4">
          {searchResults.filter(r => r.tipo === 'curso').map((result) => (
            <Card key={result.id} className="border-[#e3e4ec] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-green-100 rounded-full text-green-800">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3f4159]">{result.titulo}</h3>
                        <Badge className="bg-green-100 text-green-800">Curso</Badge>
                        {result.estado && (
                          <Badge className={getEstadoColor(result.estado)}>
                            {result.estado}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#596b88]">{result.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        {result.programa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {result.programa}
                          </span>
                        )}
                        {result.fecha && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.fecha}
                          </span>
                        )}
                        {result.usuario && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.usuario}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="profesores" className="space-y-4">
          {searchResults.filter(r => r.tipo === 'profesor').map((result) => (
            <Card key={result.id} className="border-[#e3e4ec] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-800">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3f4159]">{result.titulo}</h3>
                        <Badge className="bg-purple-100 text-purple-800">Profesor</Badge>
                        {result.estado && (
                          <Badge className={getEstadoColor(result.estado)}>
                            {result.estado}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#596b88]">{result.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        {result.programa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {result.programa}
                          </span>
                        )}
                        {result.fecha && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.fecha}
                          </span>
                        )}
                        {result.usuario && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.usuario}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="espacios" className="space-y-4">
          {searchResults.filter(r => r.tipo === 'espacio').map((result) => (
            <Card key={result.id} className="border-[#e3e4ec] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-800">
                      <Building className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#3f4159]">{result.titulo}</h3>
                        <Badge className="bg-orange-100 text-orange-800">Espacio</Badge>
                        {result.estado && (
                          <Badge className={getEstadoColor(result.estado)}>
                            {result.estado}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#596b88]">{result.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-[#596b88]">
                        {result.programa && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {result.programa}
                          </span>
                        )}
                        {result.fecha && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.fecha}
                          </span>
                        )}
                        {result.usuario && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.usuario}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
