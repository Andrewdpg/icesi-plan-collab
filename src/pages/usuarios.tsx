import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  UserX,
  RefreshCw,
  Eye,
  Upload,
  Download,
  Shield,
  Users as UsersIcon,
  Activity
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for users
const usuarios = [
  {
    id: 1,
    nombre: "María González",
    correo: "mgonzalez@icesi.edu.co",
    roles: ["Director"],
    ambito: "MBA, Esp. Finanzas",
    estado: "activo",
    ultimoAcceso: "2024-01-15 09:30"
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    correo: "cmendoza@icesi.edu.co",
    roles: ["Docente"],
    ambito: "Todos los programas",
    estado: "activo",
    ultimoAcceso: "2024-01-14 16:45"
  },
  {
    id: 3,
    nombre: "Ana Patricia Ruiz",
    correo: "apruiz@icesi.edu.co",
    roles: ["Oficina de Posgrados"],
    ambito: "Todos los programas",
    estado: "activo",
    ultimoAcceso: "2024-01-15 11:20"
  }
];

// Mock data for roles and permissions
const rolesPermisos = [
  {
    rol: "Estudiante",
    descripcion: "Acceso de solo lectura al calendario personal",
    permisos: {
      planeacion: { ver: true, editar: false, publicar: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false },
      datos: { importar: false, exportar: false }
    }
  },
  {
    rol: "Docente", 
    descripcion: "Puede proponer cambios y ver su calendario",
    permisos: {
      planeacion: { ver: true, editar: false, publicar: false },
      sugerencias: { ver: true, proponer: true, decidir: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false }
    }
  },
  {
    rol: "Director",
    descripcion: "Gestiona planeación de sus programas asignados",
    permisos: {
      planeacion: { ver: true, editar: true, publicar: false },
      sugerencias: { ver: true, proponer: true, decidir: false },
      calendario: { ver: true, descargar: true },
      notificaciones: { ver: true, plantillas: false, enviar: false }
    }
  },
  {
    rol: "Oficina de Posgrados",
    descripcion: "Control completo de planeación y publicación",
    permisos: {
      planeacion: { ver: true, editar: true, publicar: true },
      sugerencias: { ver: true, proponer: true, decidir: true },
      datos: { importar: true, exportar: true },
      usuarios: { ver: true, editar: true },
      notificaciones: { ver: true, plantillas: true, enviar: true },
      auditoria: { ver: true }
    }
  }
];

const registrosAcceso = [
  {
    id: 1,
    usuario: "Ana Patricia Ruiz",
    accion: "Login",
    modulo: "Sistema",
    resultado: "Exitoso",
    ip: "192.168.1.100",
    fecha: "2024-01-15 11:20:34"
  },
  {
    id: 2,
    usuario: "María González",
    accion: "Sugerir cambio",
    modulo: "Planeación",
    resultado: "Exitoso", 
    ip: "192.168.1.105",
    fecha: "2024-01-15 09:30:22"
  }
];

export default function Usuarios() {
  const [filtros, setFiltros] = useState({
    busqueda: "",
    rol: "all",
    estado: "all"
  });
  const [modalNuevo, setModalNuevo] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    roles: [] as string[],
    programas: [] as string[]
  });

  const usuariosFiltrados = usuarios.filter(usuario => {
    return (
      usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(filtros.busqueda.toLowerCase())
    ) &&
    (filtros.rol === "all" || filtros.rol === "" || usuario.roles.includes(filtros.rol)) &&
    (filtros.estado === "all" || filtros.estado === "" || usuario.estado === filtros.estado);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios & Permisos</h1>
          <p className="text-muted-foreground">
            Gestiona usuarios, roles y permisos del sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-6">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permisos</TabsTrigger>
          <TabsTrigger value="registros">Registros de Acceso</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-6">
          {/* Panel de acciones usuarios */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="busqueda">Buscar usuarios</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="busqueda"
                      placeholder="Buscar por nombre o correo..."
                      className="pl-10"
                      value={filtros.busqueda}
                      onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="w-40">
                  <Label>Rol</Label>
                  <Select value={filtros.rol} onValueChange={(value) => 
                    setFiltros(prev => ({ ...prev, rol: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Docente">Docente</SelectItem>
                      <SelectItem value="Oficina de Posgrados">Oficina de Posgrados</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Label>Estado</Label>
                  <Select value={filtros.estado} onValueChange={(value) => 
                    setFiltros(prev => ({ ...prev, estado: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Dialog open={modalNuevo} onOpenChange={setModalNuevo}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Nuevo usuario</DialogTitle>
                        <DialogDescription>
                          Agrega un nuevo usuario al sistema con los roles y permisos correspondientes.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre completo</Label>
                            <Input
                              placeholder="María González Pérez"
                              value={nuevoUsuario.nombre}
                              onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="correo">Correo institucional</Label>
                            <Input
                              type="email"
                              placeholder="mgonzalez@icesi.edu.co"
                              value={nuevoUsuario.correo}
                              onChange={(e) => setNuevoUsuario(prev => ({ ...prev, correo: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono (opcional)</Label>
                          <Input
                            placeholder="+57 300 123 4567"
                            value={nuevoUsuario.telefono}
                            onChange={(e) => setNuevoUsuario(prev => ({ ...prev, telefono: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Roles</Label>
                          <div className="space-y-2">
                            {["Estudiante", "Docente", "Director", "Oficina de Posgrados"].map(rol => (
                              <div key={rol} className="flex items-center space-x-2">
                                <Checkbox
                                  id={rol}
                                  checked={nuevoUsuario.roles.includes(rol)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNuevoUsuario(prev => ({ ...prev, roles: [...prev.roles, rol] }));
                                    } else {
                                      setNuevoUsuario(prev => ({ ...prev, roles: prev.roles.filter(r => r !== rol) }));
                                    }
                                  }}
                                />
                                <Label htmlFor={rol}>{rol}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {nuevoUsuario.roles.includes("Director") && (
                          <div className="space-y-2">
                            <Label>Programas asignados</Label>
                            <div className="space-y-2">
                              {["MBA", "Especialización en Finanzas", "Maestría en Mercadeo"].map(programa => (
                                <div key={programa} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={programa}
                                    checked={nuevoUsuario.programas.includes(programa)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNuevoUsuario(prev => ({ ...prev, programas: [...prev.programas, programa] }));
                                      } else {
                                        setNuevoUsuario(prev => ({ ...prev, programas: prev.programas.filter(p => p !== programa) }));
                                      }
                                    }}
                                  />
                                  <Label htmlFor={programa}>{programa}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalNuevo(false)}>
                          Cancelar
                        </Button>
                        <Button>
                          Guardar usuario
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de usuarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Usuarios ({usuariosFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Ámbito</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último acceso</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nombre}</TableCell>
                      <TableCell>{usuario.correo}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {usuario.roles.map(rol => (
                            <Badge key={rol} variant="outline" className="text-xs">
                              {rol}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {usuario.ambito}
                      </TableCell>
                      <TableCell>
                        <Badge variant={usuario.estado === 'activo' ? 'default' : 'secondary'}>
                          {usuario.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {usuario.ultimoAcceso}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reset enlace ICS
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver historial
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Desactivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Matriz de Roles & Permisos
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">Revertir permisos</Button>
                  <Button>Guardar cambios</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rolesPermisos.map((rolData) => (
                  <div key={rolData.rol} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{rolData.rol}</h3>
                        <p className="text-sm text-muted-foreground">{rolData.descripcion}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(rolData.permisos).map(([modulo, permisos]) => (
                        <div key={modulo} className="space-y-2">
                          <h4 className="font-medium text-sm capitalize">{modulo}</h4>
                          <div className="space-y-1">
                            {Object.entries(permisos).map(([permiso, value]) => (
                              <div key={permiso} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={Boolean(value)}
                                  className="text-xs"
                                />
                                <span className="text-xs capitalize">{permiso}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registros" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Registros de Acceso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Resultado</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrosAcceso.map((registro) => (
                    <TableRow key={registro.id}>
                      <TableCell className="font-medium">{registro.usuario}</TableCell>
                      <TableCell>{registro.accion}</TableCell>
                      <TableCell>{registro.modulo}</TableCell>
                      <TableCell>
                        <Badge variant={registro.resultado === 'Exitoso' ? 'default' : 'destructive'}>
                          {registro.resultado}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{registro.ip}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {registro.fecha}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}