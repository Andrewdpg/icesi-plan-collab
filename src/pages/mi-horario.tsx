import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, ExternalLink, MapPin, Clock, User, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Datos de ejemplo del horario del estudiante
const mockScheduleData = [
  {
    id: 1,
    course: "Gestión Estratégica",
    code: "GEST501",
    group: "G01",
    instructor: "Dr. María González",
    schedule: [
      {
        day: "Miércoles",
        date: "2025-01-29",
        time: "18:00 - 21:00",
        room: "Aula 302",
        building: "Edificio Central",
        type: "Presencial"
      },
      {
        day: "Viernes",
        date: "2025-01-31", 
        time: "18:00 - 21:00",
        room: "Aula 302",
        building: "Edificio Central",
        type: "Presencial"
      }
    ]
  },
  {
    id: 2,
    course: "Finanzas Corporativas",
    code: "FIN502",
    group: "G01",
    instructor: "Dr. Carlos Ruiz",
    schedule: [
      {
        day: "Sábado",
        date: "2025-02-01",
        time: "08:00 - 12:00",
        room: "Aula Virtual",
        building: "Campus Virtual",
        type: "Virtual"
      }
    ]
  },
  {
    id: 3,
    course: "Investigación de Mercados",
    code: "MKT503",
    group: "G02",
    instructor: "Dra. Ana Pérez",
    schedule: [
      {
        day: "Jueves",
        date: "2025-01-30",
        time: "19:00 - 22:00",
        room: "Aula 205",
        building: "Edificio B",
        type: "Híbrida"
      }
    ]
  }
];

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default function MiHorario() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025-01");
  const [viewMode, setViewMode] = useState("semana");

  const handleGoogleCalendarSync = () => {
    // Simulación de conexión con Google Calendar
    toast({
      title: "Conectando con Google Calendar",
      description: "Se está sincronizando tu horario con Google Calendar...",
    });
    
    setTimeout(() => {
      toast({
        title: "¡Sincronización exitosa!",
        description: "Tu horario ha sido exportado a Google Calendar.",
      });
    }, 2000);
  };

  const handleDownloadICS = () => {
    // Simulación de descarga de archivo ICS
    toast({
      title: "Descargando calendario",
      description: "El archivo ICS se está descargando...",
    });
  };

  const generateWeekView = () => {
    const weekData = {};
    
    // Inicializar estructura de la semana
    daysOfWeek.forEach(day => {
      weekData[day] = {};
      timeSlots.forEach(time => {
        weekData[day][time] = null;
      });
    });

    // Llenar con datos de horario
    mockScheduleData.forEach(course => {
      course.schedule.forEach(session => {
        const timeStart = session.time.split(" - ")[0];
        if (weekData[session.day] && weekData[session.day][timeStart] !== undefined) {
          weekData[session.day][timeStart] = {
            course: course.course,
            code: course.code,
            instructor: course.instructor,
            room: session.room,
            building: session.building,
            type: session.type,
            time: session.time
          };
        }
      });
    });

    return weekData;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Presencial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Virtual":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Híbrida":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const weekData = generateWeekView();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Horario</h1>
          <p className="text-muted-foreground">Consulta tu horario de clases y espacios asignados</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleGoogleCalendarSync} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Sincronizar con Google Calendar
          </Button>
          <Button variant="outline" onClick={handleDownloadICS} className="gap-2">
            <Download className="h-4 w-4" />
            Descargar ICS
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025-01">2025-01</SelectItem>
            <SelectItem value="2024-02">2024-02</SelectItem>
            <SelectItem value="2024-01">2024-01</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Vista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Semana</SelectItem>
            <SelectItem value="lista">Lista</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contenido principal */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList>
          <TabsTrigger value="semana">Vista Semanal</TabsTrigger>
          <TabsTrigger value="lista">Vista Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="semana" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Horario Semanal - Periodo {selectedPeriod}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-1 min-w-[800px]">
                  {/* Header de horas */}
                  <div className="p-2 font-medium text-sm text-muted-foreground"></div>
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-2 font-medium text-sm text-center border-b">
                      {day}
                    </div>
                  ))}
                  
                  {/* Filas de horarios */}
                  {timeSlots.map(time => (
                    <React.Fragment key={time}>
                      <div className="p-2 text-sm text-muted-foreground font-medium border-r">
                        {time}
                      </div>
                      {daysOfWeek.map(day => (
                        <div key={`${day}-${time}`} className="p-1 border border-border min-h-[60px]">
                          {weekData[day][time] && (
                            <div className="bg-card border border-border rounded p-2 h-full">
                              <div className="text-xs font-medium truncate">
                                {weekData[day][time].code}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {weekData[day][time].room}
                              </div>
                              <Badge variant="secondary" className={`text-xs mt-1 ${getTypeColor(weekData[day][time].type)}`}>
                                {weekData[day][time].type}
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lista" className="space-y-4">
          <div className="grid gap-4">
            {mockScheduleData.map(course => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.course}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {course.code} - {course.group}
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <User className="h-3 w-3" />
                      {course.instructor}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.schedule.map((session, index) => (
                      <div key={index} className="flex flex-wrap items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{session.day}</span>
                            <span className="text-muted-foreground">({session.date})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{session.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{session.room}</span>
                            <span className="text-muted-foreground">- {session.building}</span>
                          </div>
                        </div>
                        
                        <Badge className={getTypeColor(session.type)}>
                          {session.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Resumen del Periodo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockScheduleData.length}</div>
              <div className="text-sm text-muted-foreground">Materias Inscritas</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {mockScheduleData.reduce((acc, course) => acc + course.schedule.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Sesiones por Semana</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">18</div>
              <div className="text-sm text-muted-foreground">Horas Semanales</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}