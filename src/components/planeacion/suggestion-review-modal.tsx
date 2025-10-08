import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Suggestion {
  id: number;
  tipo: "propuesta_docente" | "sugerencia_director";
  curso: string;
  grupo: string;
  fechaAfectada: string;
  solicitante: string;
  resumen: string;
  estado: "pendiente" | "en_revision" | "aprobada" | "rechazada" | "aplicada";
  descripcion: string;
  fechaCreacion: string;
  adjuntos?: number;
  cambiosPropuestos: {
    actual: string;
    propuesto: string;
  };
  comentarios?: {
    aprobacion?: string;
    rechazo?: string;
    fechaDecision?: string;
    revisor?: string;
  };
}

interface SuggestionReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestion: Suggestion | null;
  onApprove?: (id: number, comentario: string) => void;
  onReject?: (id: number, comentario: string) => void;
}

export function SuggestionReviewModal({ 
  open, 
  onOpenChange, 
  suggestion, 
  onApprove, 
  onReject 
}: SuggestionReviewModalProps) {
  const [comentario, setComentario] = useState("");
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetForm = () => {
    setComentario("");
    setMostrarComentarios(false);
    setIsProcessing(false);
  };

  const handleApprove = async () => {
    if (!suggestion) return;
    
    setIsProcessing(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onApprove?.(suggestion.id, comentario);
      
      toast({
        title: "Sugerencia aprobada",
        description: "La sugerencia ha sido aprobada exitosamente",
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo aprobar la sugerencia",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!suggestion) return;
    
    if (!comentario.trim()) {
      toast({
        title: "Comentario requerido",
        description: "Debes proporcionar un comentario al rechazar la sugerencia",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onReject?.(suggestion.id, comentario);
      
      toast({
        title: "Sugerencia rechazada",
        description: "La sugerencia ha sido rechazada",
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo rechazar la sugerencia",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  if (!suggestion) return null;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en_revision': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'aprobada': return 'bg-green-100 text-green-800 border-green-200';
      case 'rechazada': return 'bg-red-100 text-red-800 border-red-200';
      case 'aplicada': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'propuesta_docente' ? User : AlertTriangle;
  };

  const TipoIcon = getTipoIcon(suggestion.tipo);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Revisar Sugerencia de Cambio
              </DialogTitle>
              <DialogDescription>
                Revisa los detalles de la sugerencia y toma una decisión
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header con información básica */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <TipoIcon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      {suggestion.curso} - Grupo {suggestion.grupo}
                    </h3>
                    <Badge className={getEstadoColor(suggestion.estado)}>
                      {suggestion.estado.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{suggestion.resumen}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Solicitante:</span>
                  <p className="font-medium">{suggestion.solicitante}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fecha afectada:</span>
                  <p className="font-medium">
                    {new Date(suggestion.fechaAfectada).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tipo:</span>
                  <p className="font-medium">
                    {suggestion.tipo === 'propuesta_docente' ? 'Propuesta Docente' : 'Sugerencia Director'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Creado:</span>
                  <p className="font-medium">
                    {new Date(suggestion.fechaCreacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descripción detallada */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                {suggestion.descripcion}
              </p>
            </CardContent>
          </Card>

          {/* Comparación de cambios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comparación de Cambios</CardTitle>
              <CardDescription>
                Compara el estado actual con la propuesta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">ESTADO ACTUAL</span>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm">{suggestion.cambiosPropuestos.actual}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">PROPUESTO</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm">{suggestion.cambiosPropuestos.propuesto}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adjuntos */}
          {suggestion.adjuntos && suggestion.adjuntos > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Adjuntos ({suggestion.adjuntos})</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver adjuntos
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Comentarios previos (si existen) */}
          {suggestion.comentarios && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Comentarios de Decisión</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMostrarComentarios(!mostrarComentarios)}
                  >
                    {mostrarComentarios ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {mostrarComentarios ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </div>
              </CardHeader>
              {mostrarComentarios && (
                <CardContent className="space-y-4">
                  {suggestion.comentarios.aprobacion && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Aprobación</span>
                      </div>
                      <p className="text-sm text-green-700">{suggestion.comentarios.aprobacion}</p>
                      {suggestion.comentarios.fechaDecision && suggestion.comentarios.revisor && (
                        <p className="text-xs text-green-600 mt-2">
                          Por {suggestion.comentarios.revisor} el {new Date(suggestion.comentarios.fechaDecision).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                  {suggestion.comentarios.rechazo && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Rechazo</span>
                      </div>
                      <p className="text-sm text-red-700">{suggestion.comentarios.rechazo}</p>
                      {suggestion.comentarios.fechaDecision && suggestion.comentarios.revisor && (
                        <p className="text-xs text-red-600 mt-2">
                          Por {suggestion.comentarios.revisor} el {new Date(suggestion.comentarios.fechaDecision).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )}

          {/* Acciones de revisión (solo para sugerencias pendientes) */}
          {suggestion.estado === 'pendiente' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Acciones de Revisión</CardTitle>
                <CardDescription>
                  Toma una decisión sobre esta sugerencia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comentario">
                    Comentarios {suggestion.estado === 'pendiente' ? '(opcional para aprobación, requerido para rechazo)' : ''}
                  </Label>
                  <Textarea
                    id="comentario"
                    placeholder="Agrega comentarios sobre tu decisión..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button 
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Procesando...' : 'Aprobar'}
                  </Button>
                  <Button 
                    onClick={handleReject}
                    disabled={isProcessing}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Procesando...' : 'Rechazar'}
                  </Button>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Una vez que apruebes o rechaces esta sugerencia, 
                    el solicitante recibirá una notificación con tu decisión y comentarios.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
