import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  Clock,
  Users,
  BookOpen,
  MapPin,
  Eye,
  Download,
  RotateCcw,
  FileText,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface ValidationItem {
  id: string;
  title: string;
  status: 'success' | 'warning' | 'error';
  description: string;
  count?: number;
  details?: string[];
}

const validationChecks: ValidationItem[] = [
  {
    id: 'conflicts',
    title: 'Conflictos de Horario',
    status: 'error',
    description: 'Se encontraron choques de horarios entre cursos',
    count: 3,
    details: [
      'MBA Marketing Digital vs Gestión Estratégica - Viernes 18:00',
      'Doctorado Seminario I vs II - Sábado 09:00', 
      'Especialización Finanzas vs MBA Finanzas - Miércoles 19:00'
    ]
  },
  {
    id: 'holidays',
    title: 'Sesiones en Festivos',
    status: 'warning', 
    description: 'Algunas sesiones coinciden con días festivos',
    count: 2,
    details: [
      'Día de la Independencia - 20 de Julio',
      'Batalla de Boyacá - 7 de Agosto'
    ]
  },
  {
    id: 'hours',
    title: 'Cumplimiento de Horas',
    status: 'success',
    description: 'Todas las materias cumplen las horas requeridas',
    count: 0
  },
  {
    id: 'classrooms',
    title: 'Disponibilidad de Aulas',
    status: 'warning',
    description: 'Algunas aulas no tienen confirmación de disponibilidad',
    count: 5,
    details: [
      'Aula 301 - Sábados por confirmar',
      'Laboratorio B - Mantenimiento programado',
      'Auditorio - Reserva pendiente',
      'Sala de Videoconferencia 2 - Equipo en reparación',
      'Aula 205 - Disponibilidad parcial'
    ]
  },
  {
    id: 'teachers',
    title: 'Asignación Docente',
    status: 'success',
    description: 'Todos los cursos tienen docente asignado',
    count: 0
  },
  {
    id: 'resources',
    title: 'Recursos Especiales',
    status: 'success',
    description: 'Equipos y recursos especiales confirmados',
    count: 0
  }
];

const publishingHistory = [
  {
    version: '2024-2.3',
    date: '2024-01-15 14:30',
    user: 'María García',
    status: 'Publicada',
    changes: 'Ajuste horarios MBA - Marketing Digital',
    canRevert: false
  },
  {
    version: '2024-2.2',
    date: '2024-01-12 09:15',
    user: 'Sistema',
    status: 'Publicada',
    changes: 'Corrección conflictos detectados',
    canRevert: true
  },
  {
    version: '2024-2.1',
    date: '2024-01-10 16:45',
    user: 'Carlos Ruiz',
    status: 'Revertida',
    changes: 'Primera versión semestre',
    canRevert: false
  }
];

export default function AprobacionPage() {
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  
  const criticalIssues = validationChecks.filter(check => check.status === 'error').length;
  const warningIssues = validationChecks.filter(check => check.status === 'warning').length;
  const canPublish = criticalIssues === 0;

  const handlePublish = () => {
    toast({
      title: "Planeación Publicada",
      description: "La versión 2024-2.4 ha sido publicada exitosamente.",
    });
  };

  const handleRevert = (version: string) => {
    setSelectedVersion('');
    toast({
      title: "Versión Revertida",
      description: `Se ha revertido a la versión ${version}`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Aprobación & Publicación
        </h1>
        <p className="text-muted-foreground">
          Revisa y publica la planeación académica
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`shadow-soft ${criticalIssues > 0 ? 'border-destructive' : 'border-border'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              {criticalIssues > 0 ? (
                <XCircle className="h-5 w-5 text-destructive" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-success" />
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {criticalIssues > 0 ? 'Bloqueos Críticos' : 'Sin Bloqueos'}
                </p>
                <p className="text-2xl font-bold">
                  {criticalIssues}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Advertencias</p>
                <p className="text-2xl font-bold">{warningIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Progreso General</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="validation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="validation">Validación</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="validation" className="space-y-4">
          {/* Validation Checklist */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lista de Validación
              </CardTitle>
              <CardDescription>
                Revisa todos los puntos antes de publicar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {validationChecks.map((check) => (
                <div key={check.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                  <div className="flex-shrink-0 mt-0.5">
                    {check.status === 'success' && (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    )}
                    {check.status === 'warning' && (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    {check.status === 'error' && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{check.title}</h4>
                      {check.count !== undefined && check.count > 0 && (
                        <Badge variant={check.status === 'error' ? 'destructive' : 'secondary'}>
                          {check.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {check.description}
                    </p>
                    {check.details && check.details.length > 0 && (
                      <div className="space-y-1">
                        {check.details.map((detail, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  disabled={!canPublish}
                  className={!canPublish ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Publicar Planeación
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Confirmar Publicación?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Una vez publicada, la planeación será visible para todos los usuarios.
                    Los estudiantes y docentes recibirán notificaciones automáticas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePublish}>
                    Publicar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {!canPublish && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p className="text-sm font-medium text-destructive">
                    No se puede publicar mientras existan bloqueos críticos
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Resuelve todos los conflictos de horario antes de continuar.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {/* Version History */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Historial de Versiones
              </CardTitle>
              <CardDescription>
                Versiones publicadas y acciones de reversión disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {publishingHistory.map((version, index) => (
                  <div key={version.version} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{version.version}</span>
                        <Badge variant={
                          version.status === 'Publicada' ? 'default' : 
                          version.status === 'Revertida' ? 'secondary' : 'outline'
                        }>
                          {version.status}
                        </Badge>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Actual
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{version.changes}</p>
                      <p className="text-xs text-muted-foreground">
                        {version.date} • {version.user}
                      </p>
                    </div>
                    
                    {version.canRevert && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Revertir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Revertir a {version.version}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción revertirá todos los cambios realizados después de esta versión.
                              La acción es irreversible y se notificará a todos los usuarios.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleRevert(version.version)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Revertir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}