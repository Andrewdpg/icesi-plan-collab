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
  UserCheck
} from "lucide-react";

const kpiCards = [
  {
    title: "Cursos Planeados",
    value: "42",
    total: "48",
    description: "Semestre 2024-2",
    icon: BookOpen,
    progress: 87.5,
    trend: "+6 esta semana"
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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Bienvenida, María
        </h1>
        <p className="text-muted-foreground text-lg">
          Panel de control - Oficina de Posgrados
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${
                kpi.color === 'destructive' ? 'text-destructive' :
                kpi.color === 'success' ? 'text-success' :
                kpi.color === 'secondary' ? 'text-muted-foreground' :
                'text-primary'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value}
                {kpi.total && <span className="text-sm text-muted-foreground">/{kpi.total}</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {kpi.description}
              </p>
              {kpi.progress && (
                <Progress value={kpi.progress} className="mt-3" />
              )}
              {kpi.trend && (
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.trend}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>
              Herramientas principales del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-secondary/50"
                asChild
              >
                <a href={action.href}>
                  <action.icon className={`h-8 w-8 ${
                    action.color === 'primary' ? 'text-primary' :
                    action.color === 'success' ? 'text-success' :
                    'text-secondary-foreground'
                  }`} />
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col space-y-2 pb-3 border-b border-border last:border-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.course}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
                {activity.user !== "Sistema" && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <UserCheck className="h-3 w-3" />
                    {activity.user}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Semester Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Semestre 2024-2</CardTitle>
          <CardDescription>
            Estado general de programas de posgrado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">14</div>
              <div className="text-sm text-muted-foreground">Programas</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">156</div>
              <div className="text-sm text-muted-foreground">Estudiantes</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-secondary-foreground">28</div>
              <div className="text-sm text-muted-foreground">Docentes</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-muted-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Horas Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}