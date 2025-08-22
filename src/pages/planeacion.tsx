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
  MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SuggestionsDrawer } from "@/components/planeacion/suggestions-drawer";
import { GeneratePlanningModal } from "@/components/planeacion/generate-planning-modal";

const materias = [
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
  },
  {
    id: 3,
    nombre: "Finanzas Corporativas",
    codigo: "FIN001",
    cursos: [
      { grupo: "01", estado: "aprobada" },
      { grupo: "02", estado: "pendiente" }
    ]
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
    case 'planeada': return 'bg-status-published text-primary';
    case 'aprobada': return 'bg-status-approved text-success';
    case 'conflicto': return 'bg-status-conflict text-destructive';
    case 'borrador': return 'bg-status-draft text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Planeacion() {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(1);
  const [cursoActivo, setCursoActivo] = useState(1);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [modalPlaneacion, setModalPlaneacion] = useState(false);

  const materiaActual = materias.find(m => m.id === materiaSeleccionada);

  return (
    <div className="h-full flex gap-6 relative">
      {/* Panel Izquierdo - Materias */}
      <div className="w-1/4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Materias</h2>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar materia..."
            className="pl-10"
          />
        </div>

        <div className="space-y-2">
          {materias.map((materia) => (
            <Card 
              key={materia.id}
              className={`cursor-pointer transition-all hover:shadow-soft ${
                materiaSeleccionada === materia.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setMateriaSeleccionada(materia.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{materia.nombre}</h3>
                      <p className="text-xs text-muted-foreground">{materia.codigo}</p>
                    </div>
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
      </div>

      {/* Panel Central */}
      <div className="flex-1 space-y-6">
        {/* Barra Superior */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Planeación de Cursos</h1>
            <p className="text-muted-foreground">
              {materiaActual?.nombre} - {materiaActual?.codigo}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Validar</Button>
            <Button onClick={() => setModalPlaneacion(true)}>
              Generar planeación
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Guardar versión</DropdownMenuItem>
                <DropdownMenuItem>Revertir</DropdownMenuItem>
                <DropdownMenuItem>Compartir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Panel de Cursos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cursos/Grupos</CardTitle>
            <CardDescription>
              Administra los grupos de la materia seleccionada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cursos.map((curso) => (
              <Card 
                key={curso.id}
                className={`cursor-pointer transition-all hover:shadow-soft ${
                  cursoActivo === curso.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCursoActivo(curso.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Grupo {curso.grupo}</Badge>
                        <Badge className={getEstadoColor(curso.estado)}>
                          {curso.estado}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {curso.conflictos} conflictos
                          </Badge>
                        )}
                        {curso.festivos > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {curso.festivos} festivos
                          </Badge>
                        )}
                        {curso.adjuntos > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {curso.adjuntos} adjuntos
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Duplicar grupo</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full h-12 border-dashed">
              <Plus className="h-4 w-4 mr-2" />
              Agregar nuevo grupo
            </Button>
          </CardContent>
        </Card>

        {/* Calendario de Planeación */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calendario de Planeación</CardTitle>
                <CardDescription>Vista semanal - Octubre 2024</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Semana</Button>
                <Button variant="ghost" size="sm">Mes</Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-4 min-h-96">
              {/* Time column */}
              <div className="space-y-4">
                <div className="h-8"></div>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="h-12 text-xs text-muted-foreground">
                    {8 + i}:00
                  </div>
                ))}
              </div>
              
              {/* Days */}
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                <div key={day} className="space-y-4">
                  <div className="h-8 text-center font-medium">
                    {day}
                    <div className="text-xs text-muted-foreground">
                      {14 + index}
                    </div>
                  </div>
                  
                  {/* Sample sessions */}
                  <div className="space-y-2">
                    {index === 2 && (
                      <div className="bg-primary/10 border border-primary/20 rounded p-2 h-24 cursor-pointer hover:bg-primary/20 transition-colors">
                        <div className="text-xs font-medium">GES001-01</div>
                        <div className="text-xs text-muted-foreground">Dr. Mendoza</div>
                        <div className="text-xs">Aula 204</div>
                      </div>
                    )}
                    {index === 4 && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded p-2 h-24 cursor-pointer hover:bg-destructive/20 transition-colors">
                        <div className="text-xs font-medium">GES001-02</div>
                        <div className="text-xs text-muted-foreground">Dra. García</div>
                        <div className="text-xs flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Conflicto
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Derecho - Acciones */}
      <div className="w-1/5 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Curso Activo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grupo:</span>
                <span>01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Docente:</span>
                <span>Dr. Mendoza</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sesiones:</span>
                <span>8/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modalidad:</span>
                <span>Presencial</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium text-sm">Validaciones</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-3 w-3" />
                  Horas cumplidas
                </div>
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  Cruce de horario
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Button size="sm" className="w-full">
                Confirmar cambios
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sugerencias Drawer Trigger */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          variant="outline"
          className="rounded-l-lg rounded-r-none shadow-elegant bg-card border-r-0 pr-4"
          onClick={() => setDrawerAbierto(true)}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <div className="writing-vertical-rl text-sm font-medium whitespace-nowrap">
              Sugerencias/Cambios
            </div>
            <Badge className="bg-destructive text-destructive-foreground text-xs">3</Badge>
          </div>
        </Button>
      </div>

      {/* Modales y Drawers */}
      <SuggestionsDrawer 
        open={drawerAbierto} 
        onOpenChange={setDrawerAbierto} 
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