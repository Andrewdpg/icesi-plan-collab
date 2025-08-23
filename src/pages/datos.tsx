import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  Users,
  BookOpen,
  Calendar,
  FileSpreadsheet,
  Eye,
  RefreshCw
} from "lucide-react";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const importSteps = [
  { id: 1, title: "Subir", description: "Cargar archivo y validar formato" },
  { id: 2, title: "Validar", description: "Revisar errores y advertencias" },
  { id: 3, title: "Duplicados", description: "Resolver conflictos y preview" },
  { id: 4, title: "Confirmar", description: "Importar datos finales" }
];

const entidades = [
  {
    id: "docentes",
    title: "Docentes",
    icon: Users,
    description: "Información de profesores y disponibilidad",
    columns: ["Nombre completo", "Identificación", "Correo", "Modalidad preferida"],
    template: "plantilla_docentes.xlsx"
  },
  {
    id: "cursos",
    title: "Cursos/Malla",
    icon: BookOpen,
    description: "Catálogo de materias y programas",
    columns: ["Código", "Nombre", "Horas totales", "Sesiones", "Modalidad"],
    template: "plantilla_cursos.xlsx"
  },
  {
    id: "estudiantes",
    title: "Estudiantes",
    icon: Users,
    description: "Listas por curso para notificaciones",
    columns: ["Nombre", "Correo", "Teléfono", "Curso", "Cohorte"],
    template: "plantilla_estudiantes.xlsx"
  },
  {
    id: "calendario",
    title: "Calendario Docente",
    icon: Calendar,
    description: "Disponibilidad horaria por docente",
    columns: ["Docente", "Día", "Hora inicio", "Hora fin", "Disponible"],
    template: "plantilla_calendario.csv"
  }
];

export default function Datos() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("importar");
  const [selectedEntity, setSelectedEntity] = useState("docentes");
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep(2);
          toast({
            title: "Archivo cargado",
            description: "Archivo procesado exitosamente. Revisa las validaciones.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadTemplate = (template: string) => {
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${template}...`,
    });
    // Simulate download
  };

  const mockValidationErrors = [
    { fila: 3, columna: "Correo", error: "Formato de correo inválido", valor: "invalid-email" },
    { fila: 7, columna: "Identificación", error: "Campo requerido", valor: "" },
    { fila: 12, columna: "Modalidad", error: "Valor no válido", valor: "Mixta" }
  ];

  const mockDuplicates = [
    { id: 1, nombre: "Carlos Mendoza", correo: "cmendoza@icesi.edu.co", accion: "mantener" },
    { id: 2, nombre: "Ana García", correo: "agarcia@icesi.edu.co", accion: "actualizar" }
  ];

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3f4159]">Importar/Exportar Datos</h1>
        <p className="text-[#596b88] mt-2">
          Gestiona la carga y descarga de información institucional
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-white border-[#e3e4ec]">
          <TabsTrigger value="importar" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white data-[state=inactive]:text-[#596b88] data-[state=inactive]:hover:text-[#5555ea]">Importar</TabsTrigger>
          <TabsTrigger value="exportar" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white data-[state=inactive]:text-[#596b88] data-[state=inactive]:hover:text-[#5555ea]">Exportar</TabsTrigger>
        </TabsList>

        <TabsContent value="importar" className="space-y-6">
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3f4159]">Seleccionar Entidad</CardTitle>
              <CardDescription className="text-[#596b88]">
                Elige el tipo de datos que deseas importar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {entidades.map((entidad) => {
                  const Icon = entidad.icon;
                  return (
                    <Card
                      key={entidad.id}
                      className={`cursor-pointer transition-all hover:shadow-md border-[#e3e4ec] bg-white ${
                        selectedEntity === entidad.id ? 'ring-2 ring-[#5555ea]' : ''
                      }`}
                      onClick={() => {
                        setSelectedEntity(entidad.id);
                        setCurrentStep(1);
                      }}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <Icon className="h-8 w-8 mx-auto text-[#5555ea]" />
                        <div>
                          <h3 className="font-medium text-[#3f4159]">{entidad.title}</h3>
                          <p className="text-xs text-[#596b88] mt-1">
                            {entidad.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Wizard Steps */}
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#3f4159]">
                    Importar {entidades.find(e => e.id === selectedEntity)?.title}
                  </CardTitle>
                  <CardDescription className="text-[#596b88]">
                    Paso {currentStep} de 4
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {importSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-medium ${
                        step.id === currentStep
                          ? 'bg-[#5555ea] text-white'
                          : step.id < currentStep
                          ? 'bg-[#4fb37b] text-white'
                          : 'bg-[#f7f8fe] text-[#596b88]'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#e3e4ec] p-8 text-center space-y-4 bg-[#f7f8fe]">
                    <Upload className="h-12 w-12 mx-auto text-[#596b88]" />
                    <div>
                      <h3 className="font-medium text-[#3f4159]">Arrastra tu archivo aquí</h3>
                      <p className="text-sm text-[#596b88]">
                        o haz clic para seleccionar (Excel, CSV)
                      </p>
                    </div>
                    <Button
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={isProcessing}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Seleccionar archivo
                        </>
                      )}
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.csv"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </div>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#3f4159]">Procesando archivo...</span>
                        <span className="text-[#596b88]">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="bg-[#e3e4ec]" />
                    </div>
                  )}

                  <div className="bg-[#f7f8fe] p-4 border border-[#e3e4ec]">
                    <h4 className="font-medium mb-2 text-[#3f4159]">Columnas esperadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {entidades.find(e => e.id === selectedEntity)?.columns.map((col, index) => (
                        <Badge key={index} variant="outline" className="border-[#e3e4ec] text-[#596b88] bg-white">{col}</Badge>
                      ))}
                    </div>
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-[#5555ea] hover:text-[#4a4ad9]"
                      onClick={() => handleDownloadTemplate(
                        entidades.find(e => e.id === selectedEntity)?.template || ""
                      )}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Descargar plantilla
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Se encontraron {mockValidationErrors.length} errores que requieren corrección.
                    </AlertDescription>
                  </Alert>

                  <div className="border rounded-lg">
                    <div className="p-4 border-b bg-muted/50">
                      <h4 className="font-medium">Errores de Validación</h4>
                    </div>
                    <div className="divide-y max-h-64 overflow-y-auto">
                      {mockValidationErrors.map((error, index) => (
                        <div key={index} className="p-3 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Fila {error.fila}, Columna: {error.columna}
                            </div>
                            <div className="text-xs text-destructive">
                              {error.error}
                            </div>
                            {error.valor && (
                              <div className="text-xs text-muted-foreground">
                                Valor: "{error.valor}"
                              </div>
                            )}
                          </div>
                          <Badge variant="destructive">Error</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadTemplate("reporte_errores.xlsx")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar reporte
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Volver
                      </Button>
                      <Button onClick={() => setCurrentStep(3)}>
                        Continuar (ignorar advertencias)
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Se encontraron {mockDuplicates.length} registros duplicados. 
                      Selecciona la acción para cada uno.
                    </AlertDescription>
                  </Alert>

                  <div className="border rounded-lg">
                    <div className="p-4 border-b bg-muted/50">
                      <h4 className="font-medium">Registros Duplicados</h4>
                    </div>
                    <div className="divide-y">
                      {mockDuplicates.map((duplicate) => (
                        <div key={duplicate.id} className="p-4 space-y-3">
                          <div>
                            <div className="font-medium">{duplicate.nombre}</div>
                            <div className="text-sm text-muted-foreground">
                              {duplicate.correo}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">Mantener existente</Button>
                            <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">Sobrescribir</Button>
                            <Button variant="outline" size="sm" className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">Fusionar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]">
                      Anterior
                    </Button>
                    <Button onClick={() => setCurrentStep(4)} className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 text-center">
                  <CheckCircle className="h-16 w-16 text-[#4fb37b] mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#3f4159]">¡Import Complete!</h3>
                    <p className="text-[#596b88]">
                      Se han importado 25 docentes exitosamente
                    </p>
                  </div>
                  <div className="bg-[#f7f8fe] p-4 border border-[#e3e4ec] text-left max-w-md mx-auto">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#596b88]">Creados:</span>
                        <span className="font-medium text-[#3f4159]">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#596b88]">Actualizados:</span>
                        <span className="font-medium text-[#3f4159]">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#596b88]">Omitidos:</span>
                        <span className="font-medium text-[#3f4159]">2</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => {
                    setCurrentStep(1);
                    setUploadProgress(0);
                  }}>
                    Importar más datos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exportar" className="space-y-6">
          <div className="grid gap-6">
            <Card className="border-[#e3e4ec] bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#3f4159]">Filtros de Exportación</CardTitle>
                <CardDescription className="text-[#596b88]">
                  Selecciona los datos que deseas exportar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#3f4159]">Programa</label>
                    <select className="w-full mt-1 p-2 border border-[#e3e4ec] bg-white text-[#3f4159] focus:border-[#5555ea] focus:outline-none">
                      <option>Todos los programas</option>
                      <option>Maestría en Gestión</option>
                      <option>MBA</option>
                      <option>Doctorado en Ciencias</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3f4159]">Cohorte</label>
                    <select className="w-full mt-1 p-2 border border-[#e3e4ec] bg-white text-[#3f4159] focus:border-[#5555ea] focus:outline-none">
                      <option>Todas las cohortes</option>
                      <option>2024-2</option>
                      <option>2024-1</option>
                      <option>2023-2</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3f4159]">Período</label>
                    <select className="w-full mt-1 p-2 border border-[#e3e4ec] bg-white text-[#3f4159] focus:border-[#5555ea] focus:outline-none">
                      <option>Período actual</option>
                      <option>Histórico completo</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#3f4159]">
                    <FileSpreadsheet className="h-5 w-5" />
                    Banner (CSV/XLSX)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[#596b88]">
                    Exporta la planeación en formato compatible con Banner para carga masiva.
                  </p>
                  <Alert className="border-[#e9683b] bg-[#fdecec] text-[#e9683b]">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Requiere planeación aprobada sin conflictos
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full bg-[#5555ea] hover:bg-[#4a4ad9] text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Banner
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#3f4159]">
                    <FileSpreadsheet className="h-5 w-5" />
                    Preferencias de Aulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[#596b88]">
                    Exporta los requerimientos de espacio por curso para coordinación con Planeación.
                  </p>
                  <div className="text-xs text-[#596b88]">
                    Incluye: modalidad, capacidad, recursos especiales
                  </div>
                  <Button className="w-full border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar XLSX
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#3f4159]">
                    <FileText className="h-5 w-5" />
                    PDF Oficial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[#596b88]">
                    Genera un reporte oficial en PDF con la planeación completa del semestre.
                  </p>
                  <div className="text-xs text-[#596b88]">
                    Incluye: horarios, docentes, modalidades, estadísticas
                  </div>
                  <Button className="w-full border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}