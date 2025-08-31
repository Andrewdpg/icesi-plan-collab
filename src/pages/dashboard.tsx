import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  BookOpen,
  Building,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  XCircle,
  Eye,
  ArrowRight,
  FileText,
  Settings,
  Database,
  Zap,
  Target,
  BarChart3,
  Shield,
  Timer,
  Star
} from "lucide-react";

export default function Dashboard() {
  const [selectedProgram, setSelectedProgram] = useState("todos");

  // Mock data - Datos reales vendrían de la API
  const dashboardData = {
    // 1. Listo para publicar
    readyToPublish: {
      score: 85,
      status: "Casi listo",
      blockingReasons: [
        "2 conflictos críticos",
        "1 sesión en festivo",
        "3% sesiones sin confirmar"
      ],
      criticalConflicts: 2,
      unconfirmedSessions: 3
    },

    // 2. Progreso de planeación
    planningProgress: {
      confirmed: 247,
      total: 260,
      percentage: 95,
      byProgram: {
        "MBA": 98,
        "MSc": 92,
        "Especialización": 89
      }
    },

    // 3. Aprobaciones & Sugerencias
    approvals: {
      pending: 12,
      dueToday: 3,
      suggestions: 8,
      slaHours: 48
    },

    // 4. Actividad Reciente
    recentActivity: [
      {
        id: 1,
        type: "planeacion",
        action: "actualizada",
        program: "MBA",
        time: "2h",
        user: "María González"
      },
      {
        id: 2,
        type: "sugerencia",
        action: "nueva",
        program: "MSc",
        time: "4h",
        user: "Carlos Ruiz"
      },
      {
        id: 3,
        type: "conflicto",
        action: "resuelto",
        program: "Especialización",
        time: "Ayer",
        user: "Ana López"
      },
      {
        id: 4,
        type: "aprobacion",
        action: "aprobada",
        program: "MBA",
        time: "Ayer",
        user: "Juan Pérez"
      }
    ]
  };

  const getStatusColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "planeacion": return <FileText className="h-4 w-4" />;
      case "sugerencia": return <CheckSquare className="h-4 w-4" />;
      case "conflicto": return <AlertTriangle className="h-4 w-4" />;
      case "aprobacion": return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "planeacion": return "text-blue-600";
      case "sugerencia": return "text-purple-600";
      case "conflicto": return "text-red-600";
      case "aprobacion": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Título mejorado - Minimalista */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5555ea] rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">Vista general del sistema de planeación académica</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">En tiempo real</span>
          </div>
          <Badge variant="outline" className="text-sm">
            Última actualización: hace 5 min
          </Badge>
        </div>
      </div>

      {/* Fila 1: 3 tarjetas principales - Reorganizadas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Listo para publicar - Mejorado */}
        <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5555ea] rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Listo para publicar</CardTitle>
              </div>
              {getStatusIcon(dashboardData.readyToPublish.score)}
            </div>
            <CardDescription className="text-gray-600">
              Estado de preparación para publicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score principal */}
            <div className="text-center space-y-2">
              <div className="relative inline-block">
                <div className={`text-4xl font-bold ${getStatusColor(dashboardData.readyToPublish.score)}`}>
                  {dashboardData.readyToPublish.score}%
                </div>
              </div>
                              <div className="text-sm font-medium text-gray-700 bg-gray-100 rounded-xl px-3 py-1 inline-block">
                {dashboardData.readyToPublish.status}
              </div>
            </div>
            
            {/* Bloqueos */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Bloqueos detectados
              </div>
              <div className="space-y-2">
                {dashboardData.readyToPublish.blockingReasons.map((reason, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-700 font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

                          <Button className="w-full bg-[#5555ea] hover:bg-[#4a4ad8] text-white font-medium transition-all duration-300 rounded-lg">
              <Eye className="h-4 w-4 mr-2" />
              Resolver bloqueos
            </Button>
          </CardContent>
        </Card>

        {/* 2. Progreso de planeación - Mejorado */}
        <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5555ea] rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Progreso de planeación</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 rounded-lg">
                {dashboardData.planningProgress.percentage}%
              </Badge>
            </div>
            <CardDescription className="text-gray-600">
              Sesiones confirmadas vs totales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Métricas principales */}
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-gray-900">
                {dashboardData.planningProgress.confirmed}
                <span className="text-gray-400 text-xl">/{dashboardData.planningProgress.total}</span>
              </div>
              <div className="space-y-2">
                <Progress value={dashboardData.planningProgress.percentage} className="h-2 bg-gray-100" />
                <div className="text-xs text-gray-600">
                  {dashboardData.planningProgress.percentage}% completado
                </div>
              </div>
            </div>
            
            {/* Breakdown por programa */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-gray-600" />
                Por programa
              </div>
              <div className="space-y-2">
                {Object.entries(dashboardData.planningProgress.byProgram).map(([program, percentage]) => (
                  <div key={program} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">{program}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#5555ea] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-900 min-w-[2rem]">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all duration-300 rounded-lg">
              <ArrowRight className="h-4 w-4 mr-2" />
              Ver pendientes
            </Button>
          </CardContent>
        </Card>

        {/* 3. Aprobaciones & Sugerencias - Mejorado */}
        <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5555ea] rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Aprobaciones</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 rounded-lg">
                {dashboardData.approvals.pending + dashboardData.approvals.suggestions}
              </Badge>
            </div>
            <CardDescription className="text-gray-600">
              Pendientes y sugerencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {dashboardData.approvals.pending}
                </div>
                <div className="text-xs text-gray-600">Pendientes</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xl font-bold text-orange-600 mb-1">
                  {dashboardData.approvals.dueToday}
                </div>
                <div className="text-xs text-gray-600">Vencen hoy</div>
              </div>
            </div>
            
            {/* Sugerencias */}
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-lg font-bold text-gray-900 mb-1">
                {dashboardData.approvals.suggestions}
              </div>
              <div className="text-xs text-gray-600">Sugerencias nuevas</div>
            </div>
            
            {/* SLA */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                <Timer className="h-4 w-4 text-gray-500" />
                <span className="text-xs font-medium text-gray-700">
                  SLA: {dashboardData.approvals.slaHours}h
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-[#5555ea] hover:bg-[#4a4ad8] text-white font-medium transition-all duration-300 rounded-lg">
                <CheckSquare className="h-4 w-4 mr-1" />
                Aprobar
              </Button>
              <Button className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all duration-300 rounded-lg">
                <XCircle className="h-4 w-4 mr-1" />
                Rechazar
              </Button>
            </div>

            <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all duration-300 rounded-lg">
              <ArrowRight className="h-4 w-4 mr-2" />
              Bandeja completa
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Fila 2: Actividad Reciente - Expandida */}
      <Card className="shadow-sm bg-white border border-gray-200 rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Actividad Reciente</CardTitle>
              <CardDescription className="text-gray-600">
                Últimas acciones en el sistema
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
              <Activity className="h-4 w-4 mr-2" />
              Ver toda la actividad
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Hoy
              </h3>
              <div className="space-y-4">
                                 {dashboardData.recentActivity.slice(0, 2).map((activity) => (
                   <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                    <div className={`mt-1 p-2 rounded-lg bg-white ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900">
                        {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} • {activity.program}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.user} • hace {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Ayer
              </h3>
              <div className="space-y-4">
                                 {dashboardData.recentActivity.slice(2).map((activity) => (
                   <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                    <div className={`mt-1 p-2 rounded-lg bg-white ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900">
                        {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} • {activity.program}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.user} • hace {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}