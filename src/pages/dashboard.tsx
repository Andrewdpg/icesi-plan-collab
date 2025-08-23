import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  Users,
  AlertTriangle,
  Clock,
  FileText,
  Layers3,
  Upload,
  CheckCircle,
  TrendingUp,
  BookOpen,
  UserCheck,
  BarChart3
} from "lucide-react";

const kpiCards = [
  {
    title: "Cursos Planeados",
    value: "42",
    total: "48",
    description: "Semestre 2024-2",
    icon: BookOpen,
    progress: 87.5,
    trend: "+6 esta semana",
    color: "primary"
  },
  {
    title: "Conflictos Abiertos",
    value: "3",
    description: "Requieren atención",
    icon: AlertTriangle,
    color: "destructive",
    trend: "-2 resueltos hoy"
  },
  {
    title: "Sugerencias Pendientes",
    value: "8",
    description: "De directores",
    icon: Clock,
    color: "secondary",
    trend: "2 nuevas"
  },
  {
    title: "Próximos Hitos",
    value: "5 días",
    description: "Publicación semestre",
    icon: Calendar,
    color: "success"
  }
];

const quickActions = [
  {
    title: "Planeación de Cursos",
    description: "Gestionar horarios y asignaciones",
    icon: Layers3,
    href: "/planeacion",
    color: "primary"
  },
  {
    title: "Importar/Exportar",
    description: "Cargar datos institucionales",
    icon: Upload,
    href: "/datos",
    color: "secondary"
  },
  {
    title: "Aprobación & Publicación",
    description: "Revisar y publicar planeación",
    icon: CheckCircle,
    href: "/aprobacion",
    color: "success"
  }
];

const recentActivity = [
  {
    action: "Planeación actualizada",
    course: "Maestría en Gestión - Grupo 2",
    time: "Hace 2 horas",
    user: "María García"
  },
  {
    action: "Nueva sugerencia",
    course: "MBA - Marketing Digital",
    time: "Hace 4 horas",
    user: "Dr. Carlos Ruiz"
  },
  {
    action: "Conflicto resuelto",
    course: "Doctorado - Seminario I",
    time: "Ayer",
    user: "Sistema"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f7f8fe]">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#3f4159] mb-2">
                Bienvenida, María
              </h1>
              <p className="text-[#596b88] text-lg">
                Panel de control - Oficina de Posgrados
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#abb8c3]">Última actualización</p>
              <p className="text-lg font-semibold text-[#3f4159]">Hace 5 minutos</p>
            </div>
          </div>
        </div>

        {/* KPI Cards - Rediseñadas con colores Icesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-[#3f4159]">
                    {kpi.title}
                  </CardTitle>
                  <div className={`p-2 ${kpi.color === 'destructive' ? 'bg-[#fdecec] text-[#e9683b]' :
                    kpi.color === 'success' ? 'bg-[#e6f7ef] text-[#4fb37b]' :
                    kpi.color === 'secondary' ? 'bg-[#e4e9ff] text-[#5555ea]' :
                    'bg-[#f0f860] text-[#000000]'}`}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#3f4159] mb-2">
                  {kpi.value}
                  {kpi.total && <span className="text-lg text-[#abb8c3]">/{kpi.total}</span>}
                </div>
                <p className="text-sm text-[#596b88] mb-3">
                  {kpi.description}
                </p>
                {kpi.progress && (
                  <div className="mb-3">
                    <Progress value={kpi.progress} className="h-2" />
                    <p className="text-xs text-[#abb8c3] mt-1">{kpi.progress}% completado</p>
                  </div>
                )}
                {kpi.trend && (
                  <div className={`inline-flex items-center px-3 py-1 text-xs font-medium ${
                    kpi.trend.includes('+') ? 'bg-[#e6f7ef] text-[#4fb37b]' : 'bg-[#e4e9ff] text-[#5555ea]'
                  }`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {kpi.trend}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions y Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-[#3f4159] flex items-center">
                  <Layers3 className="w-6 h-6 mr-3 text-[#5555ea]" />
                  Accesos Rápidos
                </CardTitle>
                <CardDescription className="text-[#596b88]">
                  Herramientas principales del sistema de planeación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer p-6 border-2 border-transparent hover:border-[#5555ea] hover:bg-[#e4e9ff] transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`p-3 ${action.color === 'primary' ? 'bg-[#5555ea] text-white' :
                          action.color === 'success' ? 'bg-[#4fb37b] text-white' :
                          'bg-[#e9683b] text-white'}`}>
                          <action.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#3f4159] group-hover:text-[#5555ea] transition-colors">
                            {action.title}
                          </div>
                          <div className="text-sm text-[#596b88] mt-1">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-[#3f4159] flex items-center">
                <Clock className="w-6 h-6 mr-3 text-[#5555ea]" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="group p-4 hover:bg-[#f7f8fe] transition-colors border-l-4 border-transparent hover:border-[#5555ea]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#3f4159] group-hover:text-[#5555ea] transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-xs text-[#596b88]">
                        {activity.course}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-[#e3e4ec] text-[#596b88]">
                      {activity.time}
                    </Badge>
                  </div>
                  {activity.user !== "Sistema" && (
                    <div className="flex items-center gap-2 text-xs text-[#abb8c3]">
                      <UserCheck className="w-3 h-3" />
                      {activity.user}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Semester Overview */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-[#3f4159] flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-[#5555ea]" />
              Resumen Semestre 2024-2
            </CardTitle>
            <CardDescription className="text-[#596b88]">
              Estado general de programas de posgrado y métricas clave
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="p-4 bg-[#e4e9ff] text-[#5555ea] mb-3 group-hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold">14</div>
                  <div className="text-sm opacity-90">Programas</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-[#e6f7ef] text-[#4fb37b] mb-3 group-hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-sm opacity-90">Estudiantes</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-[#f0f860] text-[#000000] mb-3 group-hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold">28</div>
                  <div className="text-sm opacity-90">Docentes</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-[#fdecec] text-[#e9683b] mb-3 group-hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold">1,247</div>
                  <div className="text-sm opacity-90">Horas Total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}