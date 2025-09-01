import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download,
  FileText,
  FileSpreadsheet,
  FileCode,
  Eye,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  Calendar,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Template {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "docentes" | "cursos" | "estudiantes" | "espacios";
  formato: "excel" | "csv" | "json";
  icon: React.ReactNode;
  tamaño: string;
  version: string;
  ultimaActualizacion: string;
  campos: string[];
  ejemplo: string;
}

export default function PlantillasImportacion() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: "1",
      nombre: "Plantilla Docentes",
      descripcion: "Formato para importar información de profesores y sus datos básicos",
      tipo: "docentes",
      formato: "excel",
      icon: <Users className="h-5 w-5" />,
      tamaño: "45 KB",
      version: "2.1",
      ultimaActualizacion: "2024-01-15",
      campos: ["ID", "Nombre", "Apellido", "Email", "Teléfono", "Departamento", "Tipo Contrato", "Estado"],
      ejemplo: `ID,Nombre,Apellido,Email,Teléfono,Departamento,Tipo Contrato,Estado
D001,Carlos,Mendoza,cmendoza@icesi.edu.co,+57 300 123 4567,Administración,Tiempo Completo,Activo
D002,Ana,Rodríguez,arodriguez@icesi.edu.co,+57 300 234 5678,Finanzas,Cátedra,Activo`
    },
    {
      id: "2",
      nombre: "Plantilla Cursos",
      descripcion: "Formato para importar cursos, mallas curriculares y asignaturas",
      tipo: "cursos",
      formato: "excel",
      icon: <BookOpen className="h-5 w-5" />,
      tamaño: "32 KB",
      version: "1.8",
      ultimaActualizacion: "2024-01-10",
      campos: ["Código", "Nombre", "Créditos", "Horas Teóricas", "Horas Prácticas", "Programa", "Semestre"],
      ejemplo: `Código,Nombre,Créditos,Horas Teóricas,Horas Prácticas,Programa,Semestre
ADM101,Fundamentos de Administración,3,32,16,MBA,1
FIN201,Análisis Financiero,4,48,24,MBA,2`
    },
    {
      id: "3",
      nombre: "Plantilla Estudiantes",
      descripcion: "Formato para importar información de estudiantes y matrículas",
      tipo: "estudiantes",
      formato: "csv",
      icon: <GraduationCap className="h-5 w-5" />,
      tamaño: "28 KB",
      version: "2.0",
      ultimaActualizacion: "2024-01-12",
      campos: ["Matrícula", "Nombre", "Apellido", "Email", "Programa", "Semestre", "Estado"],
      ejemplo: `Matrícula,Nombre,Apellido,Email,Programa,Semestre,Estado
2024001,Juan,Pérez,jperez@icesi.edu.co,MBA,1,Activo
2024002,María,González,mgonzalez@icesi.edu.co,MBA,1,Activo`
    },
    {
      id: "4",
      nombre: "Plantilla Espacios",
      descripcion: "Formato para importar aulas, laboratorios y espacios académicos",
      tipo: "espacios",
      formato: "excel",
      icon: <Building className="h-5 w-5" />,
      tamaño: "18 KB",
      version: "1.5",
      ultimaActualizacion: "2024-01-08",
      campos: ["Código", "Nombre", "Tipo", "Capacidad", "Edificio", "Piso", "Equipamiento"],
      ejemplo: `Código,Nombre,Tipo,Capacidad,Edificio,Piso,Equipamiento
A101,Aula 101,Aula,30,Principal,1,Proyector
L201,Laboratorio 201,Laboratorio,20,Ciencias,2,Computadores`
    }
  ];

  const handleDownload = (template: Template) => {
    // Simular descarga
    toast({
      title: "Descarga iniciada",
      description: `${template.nombre} se está descargando...`,
    });
    
    // En una implementación real, aquí se generaría y descargaría el archivo
    setTimeout(() => {
      toast({
        title: "Descarga completada",
        description: `${template.nombre} ha sido descargado exitosamente`,
      });
    }, 2000);
  };

  const handleCopyExample = (template: Template) => {
    navigator.clipboard.writeText(template.ejemplo);
    setCopiedTemplate(template.id);
    toast({
      title: "Ejemplo copiado",
      description: "El ejemplo ha sido copiado al portapapeles",
    });
    
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const handlePreview = (template: Template) => {
    toast({
      title: "Vista previa",
      description: `Mostrando vista previa de ${template.nombre}`,
    });
  };

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "csv":
        return <FileText className="h-4 w-4" />;
      case "json":
        return <FileCode className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFormatoColor = (formato: string) => {
    switch (formato) {
      case "excel":
        return "bg-green-100 text-green-800";
      case "csv":
        return "bg-blue-100 text-blue-800";
      case "json":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "docentes":
        return "bg-blue-100 text-blue-800";
      case "cursos":
        return "bg-green-100 text-green-800";
      case "estudiantes":
        return "bg-purple-100 text-purple-800";
      case "espacios":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-[#f7f8fe] p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3f4159]">Plantillas de Importación</h1>
        <p className="text-[#596b88] mt-2">
          Descarga las plantillas oficiales para importar datos al sistema
        </p>
      </div>

      {/* Información general */}
      <Card className="border-[#e3e4ec] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#3f4159] flex items-center gap-2">
            <Info className="h-5 w-5 text-[#5555ea]" />
            Información Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#596b88]">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Usa las plantillas oficiales para evitar errores</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span>No modifiques la estructura de columnas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Las plantillas se actualizan periódicamente</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border-[#e3e4ec]">
          <TabsTrigger value="todas" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            Todas
          </TabsTrigger>
          <TabsTrigger value="docentes" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            Docentes
          </TabsTrigger>
          <TabsTrigger value="cursos" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Cursos
          </TabsTrigger>
          <TabsTrigger value="estudiantes" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <GraduationCap className="h-4 w-4 mr-2" />
            Estudiantes
          </TabsTrigger>
          <TabsTrigger value="espacios" className="data-[state=active]:bg-[#5555ea] data-[state=active]:text-white">
            <Building className="h-4 w-4 mr-2" />
            Espacios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e4e9ff] rounded-full">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#3f4159]">{template.nombre}</CardTitle>
                        <CardDescription className="text-[#596b88]">
                          {template.descripcion}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getFormatoColor(template.formato)}>
                        {getFormatoIcon(template.formato)}
                        <span className="ml-1">{template.formato.toUpperCase()}</span>
                      </Badge>
                      <Badge className={getTipoColor(template.tipo)}>
                        {template.tipo.charAt(0).toUpperCase() + template.tipo.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#596b88]">Tamaño:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.tamaño}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Versión:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.version}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Actualizado:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.ultimaActualizacion}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#3f4159] mb-2">Campos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.map((campo, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(template)}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleCopyExample(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      {copiedTemplate === template.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docentes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.filter(t => t.tipo === "docentes").map((template) => (
              <Card key={template.id} className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#3f4159]">{template.nombre}</CardTitle>
                        <CardDescription className="text-[#596b88]">
                          {template.descripcion}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getFormatoColor(template.formato)}>
                      {getFormatoIcon(template.formato)}
                      <span className="ml-1">{template.formato.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#596b88]">Tamaño:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.tamaño}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Versión:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.version}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#3f4159] mb-2">Campos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.map((campo, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(template)}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleCopyExample(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      {copiedTemplate === template.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cursos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.filter(t => t.tipo === "cursos").map((template) => (
              <Card key={template.id} className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#3f4159]">{template.nombre}</CardTitle>
                        <CardDescription className="text-[#596b88]">
                          {template.descripcion}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getFormatoColor(template.formato)}>
                      {getFormatoIcon(template.formato)}
                      <span className="ml-1">{template.formato.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#596b88]">Tamaño:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.tamaño}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Versión:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.version}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#3f4159] mb-2">Campos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.map((campo, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(template)}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleCopyExample(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      {copiedTemplate === template.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="estudiantes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.filter(t => t.tipo === "estudiantes").map((template) => (
              <Card key={template.id} className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#3f4159]">{template.nombre}</CardTitle>
                        <CardDescription className="text-[#596b88]">
                          {template.descripcion}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getFormatoColor(template.formato)}>
                      {getFormatoIcon(template.formato)}
                      <span className="ml-1">{template.formato.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#596b88]">Tamaño:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.tamaño}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Versión:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.version}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#3f4159] mb-2">Campos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.map((campo, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(template)}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleCopyExample(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      {copiedTemplate === template.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="espacios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.filter(t => t.tipo === "espacios").map((template) => (
              <Card key={template.id} className="border-[#e3e4ec] bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#3f4159]">{template.nombre}</CardTitle>
                        <CardDescription className="text-[#596b88]">
                          {template.descripcion}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getFormatoColor(template.formato)}>
                      {getFormatoIcon(template.formato)}
                      <span className="ml-1">{template.formato.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#596b88]">Tamaño:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.tamaño}</span>
                    </div>
                    <div>
                      <span className="text-[#596b88]">Versión:</span>
                      <span className="ml-2 font-medium text-[#3f4159]">{template.version}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#3f4159] mb-2">Campos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.map((campo, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#e3e4ec] text-[#596b88]">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(template)}
                      className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleCopyExample(template)}
                      className="border-[#e3e4ec] text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea]"
                    >
                      {copiedTemplate === template.id ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
