import React, { useState } from 'react';
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
import { Search, Plus, MapPin, Monitor, Wifi, WifiOff, Beaker, Microscope, Users, Clock, Edit, Trash2, Building, Globe } from 'lucide-react';

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Espacios</h1>
          <p className="text-muted-foreground">
            Administra espacios físicos y virtuales para las clases
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Espacio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Espacio</DialogTitle>
              <DialogDescription>
                Complete la información del nuevo espacio
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
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select
                    value={newSpace.type}
                    onValueChange={(value: 'physical' | 'virtual') => setNewSpace({ ...newSpace, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
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

                  {/* Características */}
                  {space.characteristics.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Características:</p>
                      <div className="flex flex-wrap gap-2">
                        {space.characteristics.map((charId) => {
                          const char = CHARACTERISTICS.find(c => c.id === charId);
                          return char ? (
                            <Badge key={charId} variant="secondary" className="flex items-center gap-1">
                              <char.icon className="h-3 w-3" />
                              {char.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Equipamiento */}
                  {space.equipment.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Equipamiento:</p>
                      <div className="flex flex-wrap gap-2">
                        {space.equipment.map((equip) => (
                          <Badge key={equip} variant="outline">
                            {equip}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
    </div>
  );
}