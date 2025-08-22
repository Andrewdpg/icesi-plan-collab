import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Settings,
  Eye,
  ExternalLink,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  entity: string;
  before: string;
  after: string;
  reason?: string;
  ip: string;
  success: boolean;
}

const auditLogs: AuditLog[] = [
  {
    id: 'audit_001',
    timestamp: '2024-01-15 14:30:45',
    user: 'María García',
    action: 'Publicar Planeación',
    module: 'Aprobación',
    entity: 'Planeación 2024-2',
    before: 'Borrador',
    after: 'Publicada',
    reason: 'Aprobación final semestre',
    ip: '192.168.1.45',
    success: true
  },
  {
    id: 'audit_002',
    timestamp: '2024-01-15 11:22:15',
    user: 'Carlos Ruiz',
    action: 'Modificar Horario',
    module: 'Planeación',
    entity: 'MBA Marketing Digital - Grupo 1',
    before: 'Viernes 18:00-20:00',
    after: 'Viernes 19:00-21:00',
    reason: 'Conflicto con otra materia',
    ip: '192.168.1.23',
    success: true
  },
  {
    id: 'audit_003',
    timestamp: '2024-01-15 09:15:30',
    user: 'Ana López',
    action: 'Crear Usuario',
    module: 'Usuarios',
    entity: 'Dr. Pedro Martínez',
    before: 'No existía',
    after: 'Docente - MBA',
    ip: '192.168.1.67',
    success: true
  },
  {
    id: 'audit_004',
    timestamp: '2024-01-14 16:45:20',
    user: 'Sistema',
    action: 'Importar Datos',
    module: 'Datos',
    entity: 'Banner - Estudiantes.xlsx',
    before: '0 registros',
    after: '156 registros',
    reason: 'Carga semestral',
    ip: '127.0.0.1',
    success: false
  },
  {
    id: 'audit_005',
    timestamp: '2024-01-14 14:20:10',
    user: 'Miguel Torres',
    action: 'Enviar Notificación',
    module: 'Notificaciones',
    entity: 'Cambio de Aula - Urgente',
    before: 'No enviada',
    after: 'Enviada a 45 usuarios',
    reason: 'Mantenimiento aula 301',
    ip: '192.168.1.89',
    success: true
  },
  {
    id: 'audit_006',
    timestamp: '2024-01-14 10:30:25',
    user: 'Laura Rodríguez',
    action: 'Revertir Versión',
    module: 'Aprobación',
    entity: 'Planeación 2024-2.1',
    before: 'Versión 2024-2.2',
    after: 'Versión 2024-2.1',
    reason: 'Error en asignaciones',
    ip: '192.168.1.34',
    success: true
  }
];

export default function AuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    
    return matchesSearch && matchesModule && matchesAction && matchesUser;
  });

  const exportLogs = () => {
    toast({
      title: "Exportando Auditoría",
      description: "Se ha iniciado la descarga del reporte en formato CSV.",
    });
  };

  const goToContext = (log: AuditLog) => {
    toast({
      title: "Navegando al contexto",
      description: `Abriendo ${log.module} para ${log.entity}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Auditoría del Sistema
        </h1>
        <p className="text-muted-foreground">
          Registro completo de acciones y cambios en el sistema
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Registros</p>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Exitosas</p>
                <p className="text-2xl font-bold">
                  {auditLogs.filter(log => log.success).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Fallidas</p>
                <p className="text-2xl font-bold">
                  {auditLogs.filter(log => !log.success).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-secondary-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold">
                  {new Set(auditLogs.map(log => log.user)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Búsqueda</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Usuario, acción, entidad..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Módulo</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los módulos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Planeación">Planeación</SelectItem>
                  <SelectItem value="Usuarios">Usuarios</SelectItem>
                  <SelectItem value="Datos">Datos</SelectItem>
                  <SelectItem value="Notificaciones">Notificaciones</SelectItem>
                  <SelectItem value="Aprobación">Aprobación</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Acción</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las acciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Crear Usuario">Crear</SelectItem>
                  <SelectItem value="Modificar Horario">Modificar</SelectItem>
                  <SelectItem value="Publicar Planeación">Publicar</SelectItem>
                  <SelectItem value="Importar Datos">Importar</SelectItem>
                  <SelectItem value="Enviar Notificación">Notificar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Usuario</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los usuarios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="María García">María García</SelectItem>
                  <SelectItem value="Carlos Ruiz">Carlos Ruiz</SelectItem>
                  <SelectItem value="Ana López">Ana López</SelectItem>
                  <SelectItem value="Sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">Desde</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">Hasta</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredLogs.length} de {auditLogs.length} registros
            </p>
            <Button onClick={exportLogs} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Módulo</TableHead>
                <TableHead>Entidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>IP</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {log.user}
                    </div>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.module}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {log.entity}
                  </TableCell>
                  <TableCell>
                    {log.success ? (
                      <Badge variant="default" className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Exitosa
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Fallida
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.ip}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalle de Auditoría</DialogTitle>
                            <DialogDescription>
                              Información completa del registro de auditoría
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLog && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    FECHA Y HORA
                                  </Label>
                                  <p className="font-mono">{selectedLog.timestamp}</p>
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    USUARIO
                                  </Label>
                                  <p>{selectedLog.user}</p>
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    ACCIÓN
                                  </Label>
                                  <p>{selectedLog.action}</p>
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    MÓDULO
                                  </Label>
                                  <p>{selectedLog.module}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">
                                  ENTIDAD AFECTADA
                                </Label>
                                <p>{selectedLog.entity}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    ANTES
                                  </Label>
                                  <p className="text-sm bg-muted p-2 rounded">{selectedLog.before}</p>
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    DESPUÉS
                                  </Label>
                                  <p className="text-sm bg-muted p-2 rounded">{selectedLog.after}</p>
                                </div>
                              </div>
                              
                              {selectedLog.reason && (
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    MOTIVO
                                  </Label>
                                  <p className="text-sm">{selectedLog.reason}</p>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    DIRECCIÓN IP
                                  </Label>
                                  <p className="font-mono">{selectedLog.ip}</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => goToContext(selectedLog)}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Ver en contexto
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}