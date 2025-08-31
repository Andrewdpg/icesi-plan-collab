import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock,
  RotateCcw,
  History,
  User,
  FileText,
  AlertTriangle
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

interface VersionHistoryItem {
  version: string;
  date: string;
  user: string;
  status: 'Publicada' | 'Revertida' | 'Borrador';
  changes: string;
  canRevert: boolean;
}

const publishingHistory: VersionHistoryItem[] = [
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
  },
  {
    version: '2024-2.0',
    date: '2024-01-08 11:20',
    user: 'Ana García',
    status: 'Publicada',
    changes: 'Versión inicial del semestre 2024-2',
    canRevert: true
  }
];

interface VersionHistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VersionHistoryDrawer({ open, onOpenChange }: VersionHistoryDrawerProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicada': return 'bg-status-published text-primary-foreground';
      case 'Revertida': return 'bg-status-conflict text-destructive-foreground';
      case 'Borrador': return 'bg-status-draft text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRevert = (version: string) => {
    setSelectedVersion('');
    toast({
      title: "Versión Revertida",
      description: `Se ha revertido a la versión ${version}`,
      variant: "destructive"
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-xl flex items-center gap-2">
              <History className="h-5 w-5" />
              Historial de Versiones
            </SheetTitle>
            <SheetDescription>
              Versiones publicadas y acciones de reversión disponibles
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {publishingHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay versiones publicadas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {publishingHistory.map((version, index) => (
                  <Card key={version.version} className="shadow-soft">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{version.version}</span>
                            <Badge className={getStatusColor(version.status)}>
                              {version.status}
                            </Badge>
                            {index === 0 && (
                              <Badge variant="outline" className="text-xs">
                                Actual
                              </Badge>
                            )}
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
                                  <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    ¿Revertir a {version.version}?
                                  </AlertDialogTitle>
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
                        
                        <div className="space-y-2">
                          <p className="text-sm text-foreground">{version.changes}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              {version.user}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {version.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-muted/30">
            <div className="text-xs text-muted-foreground text-center">
              Las versiones se crean automáticamente al publicar cambios
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 