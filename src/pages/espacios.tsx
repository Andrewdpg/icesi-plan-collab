import React, { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Search, Plus, MapPin, Monitor, Wifi, WifiOff, Beaker, Microscope, Users, Clock, Edit, Trash2, Building, Globe, BookOpen, GraduationCap } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  type: 'physical' | 'virtual';
  building?: string;
  floor?: string;
  capacity: number;
  characteristics: string[];
  status: 'available' | 'occupied' | 'maintenance';
  equipment: string[];
  description?: string;
}

const CHARACTERISTICS = [
  { id: 'video', label: 'Video/Proyector', icon: Monitor },
  { id: 'internet', label: 'Internet', icon: Wifi },
  { id: 'no-internet', label: 'Sin Internet', icon: WifiOff },
  { id: 'lab-fisico', label: 'Laboratorio Físico', icon: Beaker },
  { id: 'lab-quimico', label: 'Laboratorio Químico', icon: Microscope },
  { id: 'lab-computo', label: 'Laboratorio de Cómputo', icon: Monitor },
  { id: 'auditorio', label: 'Auditorio', icon: Users },
  { id: 'aire-acondicionado', label: 'Aire Acondicionado', icon: Building },
  { id: 'pizarra-digital', label: 'Pizarra Digital', icon: Monitor },
];

const EQUIPMENT = [
  'Computadores',
  'Proyector',
  'Pizarra',
  'Sistema de Audio',
  'Microscopios',
  'Equipos de Laboratorio',
  'Mesa de Trabajo',
  'Sillas Ergonómicas',
];

const initialSpaces: Space[] = [
  {
    id: '1',
    name: 'Aula 101',
    type: 'physical',
    building: 'Edificio A',
    floor: '1',
    capacity: 30,
    characteristics: ['video', 'internet', 'aire-acondicionado'],
    status: 'available',
    equipment: ['Proyector', 'Pizarra', 'Sistema de Audio'],
    description: 'Aula estándar con capacidad para 30 estudiantes'
  },
  {
    id: '2',
    name: 'Lab. Química 201',
    type: 'physical',
    building: 'Edificio B',
    floor: '2',
    capacity: 20,
    characteristics: ['lab-quimico', 'no-internet'],
    status: 'occupied',
    equipment: ['Equipos de Laboratorio', 'Mesa de Trabajo'],
    description: 'Laboratorio especializado en química'
  },
  {
    id: '3',
    name: 'Auditorio Principal',
    type: 'physical',
    building: 'Edificio C',
    floor: '1',
    capacity: 200,
    characteristics: ['video', 'internet', 'auditorio', 'aire-acondicionado'],
    status: 'available',
    equipment: ['Proyector', 'Sistema de Audio', 'Pizarra Digital'],
    description: 'Auditorio principal para eventos y conferencias'
  },
  {
    id: '4',
    name: 'Aula Virtual Teams',
    type: 'virtual',
    capacity: 100,
    characteristics: ['video', 'internet'],
    status: 'available',
    equipment: [],
    description: 'Aula virtual para clases remotas'
  }
];

export default function Espacios() {
  const [activeTab, setActiveTab] = useState<'espacios' | 'docentes' | 'estudiantes' | 'programas'>('espacios');
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  
  const [newSpace, setNewSpace] = useState<Partial<Space>>({
    name: '',
    type: 'physical',
    building: '',
    floor: '',
    capacity: 0,
    characteristics: [],
    status: 'available',
    equipment: [],
    description: ''
  });

  // Mock data for other resources
  const docentes = useMemo(() => ([
    { id: 'd1', nombre: 'Carlos Mendoza', correo: 'cmendoza@icesi.edu.co', modalidad: 'Presencial' },
    { id: 'd2', nombre: 'Ana García', correo: 'agarcia@icesi.edu.co', modalidad: 'Virtual' },
    { id: 'd3', nombre: 'Roberto Silva', correo: 'rsilva@icesi.edu.co', modalidad: 'Híbrida' },
  ]), []);
  const estudiantes = useMemo(() => ([
    { id: 'e1', nombre: 'Laura Torres', correo: 'ltorres@correo.edu', cohorte: '2024-2' },
    { id: 'e2', nombre: 'Julián Pérez', correo: 'jperez@correo.edu', cohorte: '2024-2' },
    { id: 'e3', nombre: 'María Gómez', correo: 'mgomez@correo.edu', cohorte: '2025-1' },
  ]), []);
  const programas = useMemo(() => ([
    { id: 'p1', nombre: 'Maestría en Gestión', cursos: [
      { codigo: 'GES001', nombre: 'Gestión Estratégica', semestre: 1 },
      { codigo: 'FIN001', nombre: 'Finanzas Corporativas', semestre: 2 },
      { codigo: 'DAT001', nombre: 'Análisis de Datos', semestre: 1 },
    ], estudiantes: ['Laura Torres', 'Julián Pérez']},
    { id: 'p2', nombre: 'MBA', cursos: [
      { codigo: 'MKT001', nombre: 'Marketing Digital', semestre: 1 },
    ], estudiantes: ['María Gómez']},
  ]), []);

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const selectedProgram = useMemo(() => programas.find(p => p.id === selectedProgramId) || null, [programas, selectedProgramId]);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [selectedDocenteId, setSelectedDocenteId] = useState<string | null>(null);
  const selectedDocente = useMemo(() => docentes.find(d => d.id === selectedDocenteId) || null, [docentes, selectedDocenteId]);
  const [isDocenteDialogOpen, setIsDocenteDialogOpen] = useState(false);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState<string | null>(null);
  const selectedEstudiante = useMemo(() => estudiantes.find(e => e.id === selectedEstudianteId) || null, [estudiantes, selectedEstudianteId]);
  const [isEstudianteDialogOpen, setIsEstudianteDialogOpen] = useState(false);

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.building?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || space.type === filterType;
    const matchesStatus = filterStatus === 'all' || space.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateSpace = () => {
    if (!newSpace.name || !newSpace.capacity) {
      toast({
        title: "Error",
        description: "Por favor complete los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const space: Space = {
      id: (spaces.length + 1).toString(),
      name: newSpace.name!,
      type: newSpace.type!,
      building: newSpace.building,
      floor: newSpace.floor,
      capacity: newSpace.capacity!,
      characteristics: newSpace.characteristics || [],
      status: newSpace.status || 'available',
      equipment: newSpace.equipment || [],
      description: newSpace.description
    };

    setSpaces([...spaces, space]);
    setNewSpace({
      name: '',
      type: 'physical',
      building: '',
      floor: '',
      capacity: 0,
      characteristics: [],
      status: 'available',
      equipment: [],
      description: ''
    });
    setIsCreateModalOpen(false);
    
    toast({
      title: "Espacio creado",
      description: `El espacio "${space.name}" ha sido creado exitosamente`,
    });
  };

  const handleDeleteSpace = (spaceId: string) => {
    setSpaces(spaces.filter(space => space.id !== spaceId));
    toast({
      title: "Espacio eliminado",
      description: "El espacio ha sido eliminado exitosamente",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupado';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Recursos Académicos</h1>
          <p className="text-muted-foreground">
            Gestiona datos cargados desde Importar/Exportar
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-lg">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{activeTab === 'espacios' ? 'Crear Nuevo Espacio' : 'Crear Nuevo Registro'}</DialogTitle>
              <DialogDescription>
                Complete la información del nuevo registro
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Espacio *</Label>
                  <Input
                    id="name"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                    placeholder="Ej: Aula 101"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select
                    value={newSpace.type}
                    onValueChange={(value: 'physical' | 'virtual') => setNewSpace({ ...newSpace, type: value })}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="physical">Físico</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newSpace.type === 'physical' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="building">Edificio</Label>
                    <Input
                      id="building"
                      value={newSpace.building}
                      onChange={(e) => setNewSpace({ ...newSpace, building: e.target.value })}
                      placeholder="Ej: Edificio A"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="floor">Piso</Label>
                    <Input
                      id="floor"
                      value={newSpace.floor}
                      onChange={(e) => setNewSpace({ ...newSpace, floor: e.target.value })}
                      placeholder="Ej: 1"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newSpace.capacity}
                  onChange={(e) => setNewSpace({ ...newSpace, capacity: parseInt(e.target.value) || 0 })}
                  placeholder="Número de personas"
                />
              </div>

              <div className="space-y-2">
                <Label>Características</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CHARACTERISTICS.map((char) => (
                    <div key={char.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={char.id}
                        checked={newSpace.characteristics?.includes(char.id)}
                        onCheckedChange={(checked) => {
                          const current = newSpace.characteristics || [];
                          if (checked) {
                            setNewSpace({ ...newSpace, characteristics: [...current, char.id] });
                          } else {
                            setNewSpace({ ...newSpace, characteristics: current.filter(c => c !== char.id) });
                          }
                        }}
                      />
                      <Label htmlFor={char.id} className="flex items-center gap-2 text-sm">
                        <char.icon className="h-4 w-4" />
                        {char.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Equipamiento</Label>
                <div className="grid grid-cols-2 gap-2">
                  {EQUIPMENT.map((equip) => (
                    <div key={equip} className="flex items-center space-x-2">
                      <Checkbox
                        id={equip}
                        checked={newSpace.equipment?.includes(equip)}
                        onCheckedChange={(checked) => {
                          const current = newSpace.equipment || [];
                          if (checked) {
                            setNewSpace({ ...newSpace, equipment: [...current, equip] });
                          } else {
                            setNewSpace({ ...newSpace, equipment: current.filter(e => e !== equip) });
                          }
                        }}
                      />
                      <Label htmlFor={equip} className="text-sm">{equip}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  placeholder="Descripción opcional del espacio"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSpace}>
                  Crear Espacio
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs de Recursos */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="bg-white border">
          <TabsTrigger value="espacios" className="gap-2">
            <Building className="h-4 w-4" />
            Espacios
            <Badge variant="secondary" className="ml-1">{spaces.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="docentes" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Docentes
            <Badge variant="secondary" className="ml-1">{docentes.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="estudiantes" className="gap-2">
            <Users className="h-4 w-4" />
            Estudiantes
            <Badge variant="secondary" className="ml-1">{estudiantes.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="programas" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Programas/Cursos
            <Badge variant="secondary" className="ml-1">{programas.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Espacios */}
        <TabsContent value="espacios" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar espacios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="physical">Físico</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="occupied">Ocupado</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Espacios */}
          <div className="grid gap-4">
            {filteredSpaces.map((space) => (
              <Card key={space.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {space.type === 'physical' ? (
                            <Building className="h-5 w-5 text-primary" />
                          ) : (
                            <Globe className="h-5 w-5 text-primary" />
                          )}
                          <h3 className="text-lg font-semibold">{space.name}</h3>
                        </div>
                        <Badge className={getStatusColor(space.status)}>
                          {getStatusText(space.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Ubicación</p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {space.type === 'physical' 
                              ? `${space.building} - Piso ${space.floor}`
                              : 'Virtual'
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Capacidad</p>
                          <p className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {space.capacity} personas
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Tipo</p>
                          <p>{space.type === 'physical' ? 'Físico' : 'Virtual'}</p>
                        </div>
                      </div>

                      {space.description && (
                        <p className="text-sm text-muted-foreground mb-4">{space.description}</p>
                      )}

                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteSpace(space.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSpaces.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron espacios</h3>
                <p className="text-muted-foreground text-center">
                  No hay espacios que coincidan con los filtros seleccionados.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Docentes */}
        <TabsContent value="docentes" className="space-y-4">
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Docentes</CardTitle>
              <CardDescription className="text-[#596b88]">Gestiona profesores y su información</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar docente por nombre o correo" className="pl-10 rounded-lg" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por modalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Virtual">Virtual</SelectItem>
                    <SelectItem value="Híbrida">Híbrida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docentes.map(d => (
                  <Card key={d.id} className="border-0 shadow-sm group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#3f4159] group-hover:text-[#5555ea]">{d.nombre}</CardTitle>
                      </div>
                      <CardDescription className="text-xs text-[#596b88]">{d.correo}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-end gap-2">
                      <Button size="sm" className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white" onClick={() => { setSelectedDocenteId(d.id); setIsDocenteDialogOpen(true); }}>Ver detalles</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estudiantes */}
        <TabsContent value="estudiantes" className="space-y-4">
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Estudiantes</CardTitle>
              <CardDescription className="text-[#596b88]">Gestiona estudiantes por cohorte y programa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar estudiante por nombre o correo" className="pl-10 rounded-lg" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por cohorte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="2024-2">2024-2</SelectItem>
                    <SelectItem value="2025-1">2025-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {estudiantes.map(e => (
                  <Card key={e.id} className="border-0 shadow-sm group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#3f4159] group-hover:text-[#5555ea]">{e.nombre}</CardTitle>
                        <Badge className="bg-[#e6f7ef] text-[#4fb37b] border-[#e6f7ef]">{e.cohorte}</Badge>
                      </div>
                      <CardDescription className="text-xs text-[#596b88]">{e.correo}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-end gap-2">
                      <Button size="sm" className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white" onClick={() => { setSelectedEstudianteId(e.id); setIsEstudianteDialogOpen(true); }}>Ver detalles</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Programas / Cursos */}
        <TabsContent value="programas">
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Programas y Cursos</CardTitle>
              <CardDescription className="text-[#596b88]">Programas con relación de materias y estudiantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar programa" className="pl-10 rounded-lg" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nombre">Nombre</SelectItem>
                    <SelectItem value="cursos"># Cursos</SelectItem>
                    <SelectItem value="estudiantes"># Estudiantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {programas.map(p => (
                  <Card key={p.id} className="hover:shadow-md transition-shadow border-0">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#3f4159]">{p.nombre}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className="bg-[#e4e9ff] text-[#5555ea] border-[#e4e9ff]">{p.cursos.length} cursos</Badge>
                          <Badge className="bg-[#e6f7ef] text-[#4fb37b] border-[#e6f7ef]">{p.estudiantes.length} estudiantes</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {p.cursos.slice(0, 4).map(c => (
                          <Badge key={c.codigo} variant="outline">{c.codigo}</Badge>
                        ))}
                        {p.cursos.length > 4 && (
                          <Badge variant="secondary">+{p.cursos.length - 4} más</Badge>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]" onClick={() => { setSelectedProgramId(p.id); setIsProgramDialogOpen(true); }}>Ver detalles</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dialogo Detalles del Programa */}
          <Dialog open={isProgramDialogOpen && !!selectedProgram} onOpenChange={(open) => { setIsProgramDialogOpen(open); if (!open) setSelectedProgramId(null); }}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Detalles: {selectedProgram?.nombre}</DialogTitle>
                <DialogDescription>Gestiona cursos y estudiantes del programa</DialogDescription>
              </DialogHeader>
              {selectedProgram && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Materias / Cursos por semestre</div>
                        <Button size="sm" variant="outline" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"><Plus className="h-4 w-4 mr-1" />Agregar</Button>
                      </div>
                      <div className="border rounded">
                        {Array.from(new Set(selectedProgram.cursos.map(c => c.semestre))).sort((a,b) => (a as number) - (b as number)).map(sem => (
                          <div key={`sem-${sem}`} className="">
                            <div className="px-3 py-2 bg-[#f7f8fe] text-[#3f4159] text-sm font-medium border-b">Semestre {sem}</div>
                            {selectedProgram.cursos.filter(c => c.semestre === sem).map(c => (
                              <div key={c.codigo} className="flex items-center justify-between p-2 border-b last:border-b-0">
                                <div className="text-sm">{c.codigo} - {c.nombre}</div>
                                <div className="flex gap-2">
                                  <Button size="icon" variant="outline" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"><Edit className="h-4 w-4" /></Button>
                                  <Button size="icon" variant="outline" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Estudiantes</div>
                        <Button size="sm" variant="outline" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"><Plus className="h-4 w-4 mr-1" />Agregar</Button>
                      </div>
                      <div className="border rounded">
                        {selectedProgram.estudiantes.map(e => (
                          <div key={e} className="flex items-center justify-between p-2 border-b last:border-b-0">
                            <div className="text-sm">{e}</div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea]"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

      {/* Dialogo Detalles Docente */}
      <Dialog open={isDocenteDialogOpen && !!selectedDocente} onOpenChange={(open) => { setIsDocenteDialogOpen(open); if (!open) setSelectedDocenteId(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Docente</DialogTitle>
            <DialogDescription>Información del profesor</DialogDescription>
          </DialogHeader>
          {selectedDocente && (
            <div className="space-y-3 text-sm">
              <div className="font-medium text-[#3f4159]">{selectedDocente.nombre}</div>
              <div className="text-[#596b88]">{selectedDocente.correo}</div>
              <div className="flex gap-2">
                <Badge className="bg-[#e4e9ff] text-[#5555ea] border-[#e4e9ff]">{selectedDocente.modalidad}</Badge>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">Editar</Button>
                <Button className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">Cerrar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogo Detalles Estudiante */}
      <Dialog open={isEstudianteDialogOpen && !!selectedEstudiante} onOpenChange={(open) => { setIsEstudianteDialogOpen(open); if (!open) setSelectedEstudianteId(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Estudiante</DialogTitle>
            <DialogDescription>Información del estudiante</DialogDescription>
          </DialogHeader>
          {selectedEstudiante && (
            <div className="space-y-3 text-sm">
              <div className="font-medium text-[#3f4159]">{selectedEstudiante.nombre}</div>
              <div className="text-[#596b88]">{selectedEstudiante.correo}</div>
              <div>
                <Badge className="bg-[#e6f7ef] text-[#4fb37b] border-[#e6f7ef]">{selectedEstudiante.cohorte}</Badge>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">Ver historial</Button>
                <Button className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">Cerrar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}