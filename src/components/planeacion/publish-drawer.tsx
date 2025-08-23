import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Download,
  FileText,
  TrendingUp,
  AlertCircle,
  Users,
  Mail,
  Calendar
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Separator } from "@/components/ui/separator";

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
    count: 2,
    details: [
      'MBA Marketing Digital vs Gestión Estratégica - Viernes 18:00',
      'Doctorado Seminario I vs II - Sábado 09:00'
    ]
  },
  {
    id: 'holidays',
    title: 'Sesiones en Festivos',
    status: 'warning', 
    description: 'Algunas sesiones coinciden con días festivos',
    count: 1,
    details: [
      'Día de la Independencia - 20 de Julio'
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
    status: 'success',
    description: 'Todas las aulas están confirmadas',
    count: 0
  },
  {
    id: 'teachers',
    title: 'Asignación Docente',
    status: 'success',
    description: 'Todos los cursos tienen docente asignado',
    count: 0
  }
];

interface PublishDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PublishDrawer({ open, onOpenChange }: PublishDrawerProps) {
  const [step, setStep] = useState<'validation' | 'preview' | 'confirm'>('validation');
  const [publishNotes, setPublishNotes] = useState('');
  
  const criticalIssues = validationChecks.filter(check => check.status === 'error').length;
  const warningIssues = validationChecks.filter(check => check.status === 'warning').length;
  const canPublish = criticalIssues === 0;

  const handlePublish = () => {
    toast({
      title: "Planeación Publicada",
      description: "La versión 2024-2.4 ha sido publicada exitosamente.",
    });
    onOpenChange(false);
    setStep('validation');
    setPublishNotes('');
  };

  const renderValidationStep = () => (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className={`${criticalIssues > 0 ? 'border-destructive' : 'border-border'}`}>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              {criticalIssues > 0 ? (
                <XCircle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
              <div className="space-y-1">
                <p className="text-xs font-medium">
                  {criticalIssues > 0 ? 'Bloqueos' : 'Sin Bloqueos'}
                </p>
                <p className="text-lg font-bold">
                  {criticalIssues}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <div className="space-y-1">
                <p className="text-xs font-medium">Advertencias</p>
                <p className="text-lg font-bold">{warningIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div className="space-y-1">
                <p className="text-xs font-medium">Progreso</p>
                <p className="text-lg font-bold">87%</p>
              </div>
            </div>
            <Progress value={87} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Validation Checklist */}
      <div className="space-y-3">
        <h4 className="font-medium">Lista de Validación</h4>
        {validationChecks.map((check) => (
          <div key={check.id} className="flex items-start space-x-3 p-3 rounded-lg border">
            <div className="flex-shrink-0 mt-0.5">
              {check.status === 'success' && (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
              {check.status === 'warning' && (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
              {check.status === 'error' && (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium">{check.title}</h5>
                {check.count !== undefined && check.count > 0 && (
                  <Badge variant={check.status === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                    {check.count}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {check.description}
              </p>
              {check.details && check.details.length > 0 && (
                <div className="space-y-1 mt-2">
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
      </div>

      {!canPublish && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm font-medium text-destructive">
                No se puede publicar mientras existan bloqueos críticos
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Resuelve todos los conflictos de horario antes de continuar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Resumen de Publicación</h4>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Versión:</span>
            <p className="font-medium">2024-2.4</p>
          </div>
          <div>
            <span className="text-muted-foreground">Fecha de publicación:</span>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total de cursos:</span>
            <p className="font-medium">12 cursos</p>
          </div>
          <div>
            <span className="text-muted-foreground">Docentes involucrados:</span>
            <p className="font-medium">8 docentes</p>
          </div>
        </div>

        <Separator />

        <div>
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Notificaciones Automáticas
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>8 docentes recibirán notificación por correo</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>156 estudiantes recibirán sus horarios</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Enlaces de calendario disponibles para sincronización</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h5 className="font-medium mb-2">Comentarios de Publicación (Opcional)</h5>
          <Textarea
            placeholder="Agrega comentarios sobre esta versión (ej. cambios principales, consideraciones especiales)..."
            value={publishNotes}
            onChange={(e) => setPublishNotes(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <h4 className="font-semibold text-lg">¿Confirmar Publicación?</h4>
        <p className="text-sm text-muted-foreground mt-2">
          Una vez publicada, la planeación será visible para todos los usuarios y se enviarán las notificaciones automáticas.
        </p>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versión:</span>
              <span className="font-medium">2024-2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cursos afectados:</span>
              <span className="font-medium">12 cursos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notificaciones:</span>
              <span className="font-medium">164 usuarios</span>
            </div>
            {publishNotes && (
              <div>
                <span className="text-muted-foreground">Comentarios:</span>
                <p className="text-sm mt-1 p-2 bg-background rounded border">{publishNotes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setStep('preview')}
        >
          Volver
        </Button>
        <Button 
          className="flex-1"
          onClick={handlePublish}
        >
          <Send className="h-4 w-4 mr-2" />
          Publicar Ahora
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Publicar Planeación
                </SheetTitle>
                <SheetDescription>
                  {step === 'validation' && 'Revisa las validaciones antes de publicar'}
                  {step === 'preview' && 'Vista previa de la publicación'}
                  {step === 'confirm' && 'Confirma la publicación'}
                </SheetDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className={`w-2 h-2 rounded-full ${step === 'validation' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex-1 h-px ${step !== 'validation' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${step === 'preview' ? 'bg-primary' : step === 'confirm' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex-1 h-px ${step === 'confirm' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${step === 'confirm' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 overflow-y-auto">
            {step === 'validation' && renderValidationStep()}
            {step === 'preview' && renderPreviewStep()}
            {step === 'confirm' && renderConfirmStep()}
          </div>

          {step !== 'confirm' && (
            <div className="p-6 border-t">
              <div className="flex gap-3">
                {step === 'preview' && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep('validation')}
                  >
                    Volver
                  </Button>
                )}
                <Button 
                  size="sm"
                  disabled={!canPublish}
                  className={`flex-1 ${!canPublish ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => step === 'validation' ? setStep('preview') : setStep('confirm')}
                >
                  {step === 'validation' ? 'Continuar' : 'Confirmar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 