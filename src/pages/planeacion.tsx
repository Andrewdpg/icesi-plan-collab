import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  MoreHorizontal,
  Settings,
  MessageSquare,
  History,
  Send,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  ChevronLeft,
  FileText,
  Download,
  Upload,
  Lock,
  Unlock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SuggestionsDrawer } from "@/components/planeacion/suggestions-drawer";
import { VersionHistoryDrawer } from "@/components/planeacion/version-history-drawer";
import { PublishDrawer } from "@/components/planeacion/publish-drawer";
import { SessionSuggestionModal } from "@/components/planeacion/session-suggestion-modal";
import { GeneratePlanningModal } from "@/components/planeacion/generate-planning-modal";
import { ProgrammingConfigModal } from "@/components/planeacion/programming-config-modal";

// Datos de programas con mallas curriculares
const programas = [
  {
    id: 1,
    nombre: "Maestría en Ciencia de Datos",
    mallas: [
      {
        id: "mcd-2024-1",
        periodo: "2024-1",
        activa: true,
        materias: [
          { id: 1, nombre: "Fundamentos de Big Data", codigo: "BIG001", semestre: 1, grupos: ["G01", "G02"] },
          { id: 2, nombre: "Machine Learning Avanzado", codigo: "ML001", semestre: 1, grupos: ["G01"] },
          { id: 3, nombre: "Visualización de Datos", codigo: "VIZ001", semestre: 2, grupos: ["G01", "G02", "G03"] },
          { id: 4, nombre: "Deep Learning", codigo: "DL001", semestre: 2, grupos: ["G01", "G02"] },
          { id: 5, nombre: "Proyecto Integrador", codigo: "PRO001", semestre: 3, grupos: ["G01"] },
        ]
      },
      {
        id: "mcd-2023-2",
        periodo: "2023-2",
        activa: false,
        materias: [
          { id: 1, nombre: "Fundamentos de Big Data", codigo: "BIG001", semestre: 1, grupos: ["G01"] },
          { id: 2, nombre: "Machine Learning Básico", codigo: "ML001", semestre: 1, grupos: ["G01", "G02"] },
          { id: 3, nombre: "Visualización de Datos", codigo: "VIZ001", semestre: 2, grupos: ["G01"] },
          { id: 4, nombre: "Inteligencia Artificial", codigo: "IA001", semestre: 2, grupos: ["G01", "G02"] },
          { id: 5, nombre: "Proyecto Integrador", codigo: "PRO001", semestre: 3, grupos: ["G01"] },
        ]
      },
      {
        id: "mcd-2023-1",
        periodo: "2023-1",
        activa: false,
        materias: [
          { id: 1, nombre: "Introducción a Big Data", codigo: "BIG001", semestre: 1, grupos: ["G01"] },
          { id: 2, nombre: "Machine Learning Básico", codigo: "ML001", semestre: 1, grupos: ["G01"] },
          { id: 3, nombre: "Análisis de Datos", codigo: "ANL001", semestre: 2, grupos: ["G01", "G02"] },
          { id: 4, nombre: "Inteligencia Artificial", codigo: "IA001", semestre: 2, grupos: ["G01"] },
          { id: 5, nombre: "Proyecto Final", codigo: "PRO001", semestre: 3, grupos: ["G01"] },
        ]
      }
    ]
  },
  {
    id: 2,
    nombre: "Maestría en Ciencias Administrativas",
    mallas: [
      {
        id: "mca-2024-1",
        periodo: "2024-1",
        activa: true,
        materias: [
          { id: 6, nombre: "Metodología de Investigación", codigo: "MET001", semestre: 1, grupos: ["G01", "G02"] },
          { id: 7, nombre: "Estadística Aplicada", codigo: "EST001", semestre: 1, grupos: ["G01"] },
          { id: 8, nombre: "Teoría Organizacional", codigo: "ORG001", semestre: 2, grupos: ["G01", "G02", "G03"] },
          { id: 9, nombre: "Econometría", codigo: "ECO001", semestre: 2, grupos: ["G01"] },
          { id: 10, nombre: "Seminario de Tesis I", codigo: "SEM001", semestre: 3, grupos: ["G01"] },
          { id: 11, nombre: "Seminario de Tesis II", codigo: "SEM002", semestre: 4, grupos: ["G01"] },
        ]
      },
      {
        id: "mca-2023-2",
        periodo: "2023-2",
        activa: false,
        materias: [
          { id: 6, nombre: "Metodología de Investigación", codigo: "MET001", semestre: 1, grupos: ["G01"] },
          { id: 7, nombre: "Estadística Descriptiva", codigo: "EST001", semestre: 1, grupos: ["G01", "G02"] },
          { id: 8, nombre: "Teoría Organizacional", codigo: "ORG001", semestre: 2, grupos: ["G01"] },
          { id: 9, nombre: "Economía Aplicada", codigo: "ECO001", semestre: 2, grupos: ["G01", "G02"] },
          { id: 10, nombre: "Seminario de Tesis I", codigo: "SEM001", semestre: 3, grupos: ["G01"] },
          { id: 11, nombre: "Seminario de Tesis II", codigo: "SEM002", semestre: 4, grupos: ["G01"] },
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: "Maestría en Ciencias Biotecnología",
    mallas: [
      {
        id: "mcb-2024-1",
        periodo: "2024-1",
        activa: true,
        materias: [
          { id: 12, nombre: "Biotecnología Molecular", codigo: "BIO001", semestre: 1, grupos: ["G01", "G02"] },
          { id: 13, nombre: "Biotecnología Industrial", codigo: "BIO002", semestre: 1, grupos: ["G01"] },
          { id: 14, nombre: "Biotecnología Ambiental", codigo: "BIO003", semestre: 2, grupos: ["G01", "G02", "G03"] },
          { id: 15, nombre: "Biotecnología Farmacéutica", codigo: "BIO004", semestre: 2, grupos: ["G01"] },
          { id: 16, nombre: "Proyecto de Investigación", codigo: "INV001", semestre: 3, grupos: ["G01"] },
        ]
      },
      {
        id: "mcb-2023-2",
        periodo: "2023-2",
        activa: false,
        materias: [
          { id: 12, nombre: "Biotecnología Molecular", codigo: "BIO001", semestre: 1, grupos: ["G01"] },
          { id: 13, nombre: "Biotecnología Industrial", codigo: "BIO002", semestre: 1, grupos: ["G01", "G02"] },
          { id: 14, nombre: "Biotecnología Ambiental", codigo: "BIO003", semestre: 2, grupos: ["G01"] },
          { id: 15, nombre: "Biotecnología Farmacéutica", codigo: "BIO004", semestre: 2, grupos: ["G01", "G02"] },
          { id: 16, nombre: "Trabajo de Grado", codigo: "TG001", semestre: 3, grupos: ["G01"] },
        ]
      }
    ]
  }
];

// Datos de cursos/grupos
const cursos = [
  {
    id: 1,
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    sesiones: "8/10",
    modalidad: "Presencial",
    estado: "planeada",
    conflictos: 0,
    festivos: 1,
    adjuntos: 2
  },
  {
    id: 2,
    grupo: "02",
    docente: "Dra. Ana García",
    sesiones: "6/10",
    modalidad: "Híbrida",
    estado: "conflicto",
    conflictos: 2,
    festivos: 0,
    adjuntos: 1
  }
];

// Datos de sesiones del curso seleccionado
const sessionData: SessionData[] = [
  // Maestría en Ciencia de Datos - Fundamentos de Big Data
  // Grupo 01 - Lunes, Miércoles, Viernes 17:00-21:00
  {
    id: "1",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-02",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "2",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-04",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "3",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-06",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "4",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-09",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "5",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-11",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "6",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-13",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "7",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-16",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "conflicto"
  },
  {
    id: "8",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-18",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "9",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-20",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "10",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-23",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "11",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-25",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "12",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-27",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "13",
    curso: "Fundamentos de Big Data",
    grupo: "01",
    docente: "Dr. Carlos Mendoza",
    fecha: "2024-09-30",
    horaInicio: "17:00",
    horaFin: "21:00",
    aula: "Aula 204",
    modalidad: "Presencial",
    estado: "normal"
  },

  // Grupo 02 - Martes, Jueves 18:00-22:00
  {
    id: "14",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-03",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "15",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-05",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "16",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-10",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "17",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-12",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "18",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-17",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "19",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-19",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "20",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-24",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "21",
    curso: "Fundamentos de Big Data",
    grupo: "02",
    docente: "Dra. Ana García",
    fecha: "2024-09-26",
    horaInicio: "18:00",
    horaFin: "22:00",
    aula: "Aula 205",
    modalidad: "Presencial",
    estado: "normal"
  },
  // Machine Learning Avanzado - Grupo 01 - Lunes, Miércoles 14:00-18:00
  {
    id: "22",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-02",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "23",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-04",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "24",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-09",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "25",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-11",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "26",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-16",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "27",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-18",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "28",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-23",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "29",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-25",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "30",
    curso: "Machine Learning Avanzado",
    grupo: "01",
    docente: "Dra. Ana García",
    fecha: "2024-09-30",
    horaInicio: "14:00",
    horaFin: "18:00",
    aula: "Aula 301",
    modalidad: "Presencial",
    estado: "normal"
  },
  // Visualización de Datos - Grupo 01 - Martes, Jueves 10:00-14:00
  {
    id: "31",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-03",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "32",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-05",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "33",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-10",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "34",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-12",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "35",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-17",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "36",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-19",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "37",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-24",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "38",
    curso: "Visualización de Datos",
    grupo: "01",
    docente: "Dr. Roberto Silva",
    fecha: "2024-09-26",
    horaInicio: "10:00",
    horaFin: "14:00",
    aula: "Aula 105",
    modalidad: "Presencial",
    estado: "normal"
  },

  // Deep Learning - Grupo 01 - Viernes 16:00-20:00
  {
    id: "39",
    curso: "Deep Learning",
    grupo: "01",
    docente: "Dra. María López",
    fecha: "2024-09-06",
    horaInicio: "16:00",
    horaFin: "20:00",
    aula: "Aula 302",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "40",
    curso: "Deep Learning",
    grupo: "01",
    docente: "Dra. María López",
    fecha: "2024-09-13",
    horaInicio: "16:00",
    horaFin: "20:00",
    aula: "Aula 302",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "41",
    curso: "Deep Learning",
    grupo: "01",
    docente: "Dra. María López",
    fecha: "2024-09-20",
    horaInicio: "16:00",
    horaFin: "20:00",
    aula: "Aula 302",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "42",
    curso: "Deep Learning",
    grupo: "01",
    docente: "Dra. María López",
    fecha: "2024-09-27",
    horaInicio: "16:00",
    horaFin: "20:00",
    aula: "Aula 302",
    modalidad: "Presencial",
    estado: "normal"
  },
  // Proyecto Integrador - Grupo 01 - Sábados 08:00-12:00
  {
    id: "43",
    curso: "Proyecto Integrador",
    grupo: "01",
    docente: "Dr. Juan Pérez",
    fecha: "2024-09-07",
    horaInicio: "08:00",
    horaFin: "12:00",
    aula: "Aula 401",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "44",
    curso: "Proyecto Integrador",
    grupo: "01",
    docente: "Dr. Juan Pérez",
    fecha: "2024-09-14",
    horaInicio: "08:00",
    horaFin: "12:00",
    aula: "Aula 401",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "45",
    curso: "Proyecto Integrador",
    grupo: "01",
    docente: "Dr. Juan Pérez",
    fecha: "2024-09-21",
    horaInicio: "08:00",
    horaFin: "12:00",
    aula: "Aula 401",
    modalidad: "Presencial",
    estado: "normal"
  },
  {
    id: "46",
    curso: "Proyecto Integrador",
    grupo: "01",
    docente: "Dr. Juan Pérez",
    fecha: "2024-09-28",
    horaInicio: "08:00",
    horaFin: "12:00",
    aula: "Aula 401",
    modalidad: "Presencial",
    estado: "normal"
  }
];

interface SessionData {
  id: string;
  curso: string;
  grupo: string;
  docente: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  modalidad: "Presencial" | "Híbrida" | "Virtual";
  estado?: string;
}

export default function Planeacion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8, 1)); // Septiembre 2024
  const [programaActivo, setProgramaActivo] = useState(1); // Programa seleccionado
  const [mallaActiva, setMallaActiva] = useState("mcd-2024-1"); // Malla seleccionada
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const [publicarAbierto, setPublicarAbierto] = useState(false);
  const [modalPlaneacion, setModalPlaneacion] = useState(false);
  const [modalSugerencia, setModalSugerencia] = useState(false);
  const [sessionSeleccionada, setSessionSeleccionada] = useState<SessionData | null>(null);
  const [programasExpandidos, setProgramasExpandidos] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true
  });
  const [mallasExpandidas, setMallasExpandidas] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false
  });
  
  // NUEVO: Estado para el modal de selección de malla
  const [modalSeleccionMalla, setModalSeleccionMalla] = useState(false);
  
  // NUEVO: Estados para selección de materia y grupo
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string | null>(null);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string | null>(null);
  
  // NUEVO: Estado para panel flotante
  const [panelFlotanteAbierto, setPanelFlotanteAbierto] = useState(false);

  // Debug: Verificar que el componente se está renderizando
  console.log('Planeacion component rendering...');

  // NUEVO: Estado para fase de recomendaciones
  const [faseRecomendaciones, setFaseRecomendaciones] = useState({
    activa: true,
    fechaInicio: "2025-01-01", // Fecha pasada para que esté activa
    fechaFin: "2025-12-31", // Fecha futura para que esté activa
    bloqueada: false,
    forzarApertura: false // NUEVO: Para forzar apertura aunque haya pasado la fecha
  });

  // NUEVO: Modal para configurar fase de recomendaciones
  const [modalConfiguracionFase, setModalConfiguracionFase] = useState(false);
  
  // NUEVO: Modal para configuración de programación por módulos
  const [modalConfiguracionProgramacion, setModalConfiguracionProgramacion] = useState(false);
  const [grupoConfiguracion, setGrupoConfiguracion] = useState<{
    id: number;
    grupo: string;
    docente: string;
    modalidad: string;
    sesiones: number;
  } | null>(null);

  // NUEVO: Función para verificar si la fase está activa
  const esFaseActiva = () => {
    const ahora = new Date();
    const inicio = new Date(faseRecomendaciones.fechaInicio + 'T00:00:00');
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const dentroDelPeriodo = ahora >= inicio && ahora <= fin;
    
    // Si está bloqueada manualmente, no está activa
    if (faseRecomendaciones.bloqueada) return false;
    
    // Si está dentro del período o se fuerza la apertura, está activa
    return dentroDelPeriodo || faseRecomendaciones.forzarApertura;
  };

  // NUEVO: Función para obtener el estado de la fase
  const getEstadoFase = () => {
    if (faseRecomendaciones.bloqueada) return "bloqueada";
    
    const ahora = new Date();
    const fin = new Date(faseRecomendaciones.fechaFin + 'T23:59:59');
    const haPasadoLaFecha = ahora > fin;
    
    if (haPasadoLaFecha && !faseRecomendaciones.forzarApertura) {
      return "cerrada";
    }
    
    return "activa";
  };

  // NUEVO: Función para obtener el tiempo restante
  const getTiempoRestante = () => {
    const ahora = new Date();
    const fin = new Date(faseRecomendaciones.fechaFin);
    const diferencia = fin.getTime() - ahora.getTime();
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return dias > 0 ? `${dias} días` : "Finalizada";
  };

  // NUEVO: Función para abrir modal de configuración de programación
  const handleOpenProgrammingConfig = (curso: {
    id: number;
    grupo: string;
    docente: string;
    modalidad: string;
    sesiones: number;
  }) => {
    setGrupoConfiguracion({
      id: curso.id,
      grupo: curso.grupo,
      docente: curso.docente,
      modalidad: curso.modalidad,
      sesiones: curso.sesiones
    });
    setModalConfiguracionProgramacion(true);
  };

  // Función para seleccionar programa desde la barra izquierda
  const handleSelectPrograma = (programaId: number) => {
    setProgramaActivo(programaId);
    // Seleccionar automáticamente la malla activa del programa
    const programa = programas.find(p => p.id === programaId);
    if (programa) {
      const mallaActivaPrograma = programa.mallas.find(m => m.activa);
      if (mallaActivaPrograma) {
        setMallaActiva(mallaActivaPrograma.id);
      }
    }
  };

  // Función para seleccionar malla
  const handleSelectMalla = (mallaId: string) => {
    setMallaActiva(mallaId);
  };

  // NUEVO: Función para seleccionar materia
  const handleSelectMateria = (materiaId: string) => {
    setMateriaSeleccionada(materiaId);
    setGrupoSeleccionado(null); // Reset grupo al seleccionar materia
  };

  // NUEVO: Función para seleccionar grupo específico
  const handleSelectGrupo = (materiaId: string, grupo: string) => {
    setMateriaSeleccionada(materiaId);
    setGrupoSeleccionado(grupo);
  };

  // NUEVO: Función para obtener colores de materias
  const getMateriaColors = (materiaNombre: string) => {
    // Todas las materias usan el mismo color azul claro
    return { bg: 'bg-[#e4e9ff]', border: 'border-[#5555ea]', text: 'text-[#5555ea]', badgeColor: '#5555ea' };
  };

  // Encontrar el programa actual
  const programaActual = programas.find(p => p.id === programaActivo);
  
  // Encontrar la malla actual
  const mallaActual = programaActual?.mallas.find(m => m.id === mallaActiva);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generar días del mes
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Agregar días del mes anterior para completar la primera semana
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }
    
    // Agregar días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Agregar días del mes siguiente para completar la última semana
    const remainingDays = 35 - days.length; // 5 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Filtrar programas basado en búsqueda
  const filteredProgramas = programas.filter(programa =>
    programa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    programa.mallas.some(malla =>
      malla.materias.some(materia =>
        materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materia.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  // Obtener sesiones para una fecha específica de la malla activa
  const getSessionsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    if (!mallaActual) return [];
    
    // Si hay una materia seleccionada, filtrar por esa materia
    if (materiaSeleccionada) {
      const materiaSeleccionadaObj = mallaActual.materias.find(m => m.id.toString() === materiaSeleccionada);
      if (!materiaSeleccionadaObj) return [];
      
      // Si hay un grupo específico seleccionado, filtrar por ese grupo
      if (grupoSeleccionado) {
        // Normalizar el formato del grupo (G01 -> 01, G02 -> 02, etc.)
        const grupoNormalizado = grupoSeleccionado.replace('G', '');
        return sessionData.filter(session => 
          session.fecha === dateString && 
          session.curso === materiaSeleccionadaObj.nombre &&
          session.grupo === grupoNormalizado
        );
      } else {
        // Si solo hay materia seleccionada, mostrar todos los grupos de esa materia
        return sessionData.filter(session => 
          session.fecha === dateString && 
          session.curso === materiaSeleccionadaObj.nombre
        );
      }
    }
    
    // Si no hay selección específica, mostrar todas las materias de la malla activa
    const materiasDeLaMalla = mallaActual.materias.map(m => m.nombre);
    return sessionData.filter(session => 
      session.fecha === dateString && 
      materiasDeLaMalla.includes(session.curso)
    );
  };

  const getSessionStyle = (estado?: string, curso?: string) => {
    // Primero verificar el estado
    switch (estado) {
      case 'conflicto':
        return 'bg-[#fdecec] border border-[#e9683b] hover:bg-[#fdecec]';
      case 'festivo':
        return 'bg-[#fff8e6] border border-[#f4a460] hover:bg-[#fff8e6]';
      default:
        // Si no hay conflicto, usar colores por tipo de curso
        switch (curso) {
          // Maestría en Ciencia de Datos
          case 'Fundamentos de Big Data':
            return 'bg-[#e4e9ff] border border-[#5555ea] hover:bg-[#e4e9ff]';
          case 'Machine Learning Avanzado':
            return 'bg-[#e6f7ef] border border-[#4fb37b] hover:bg-[#e6f7ef]';
          case 'Visualización de Datos':
            return 'bg-[#fff2e6] border border-[#ff8c42] hover:bg-[#fff2e6]';
          case 'Deep Learning':
            return 'bg-[#f0e6ff] border border-[#8b5cf6] hover:bg-[#f0e6ff]';
          case 'Proyecto Integrador':
            return 'bg-[#e6f3ff] border border-[#0ea5e9] hover:bg-[#e6f3ff]';
          // Maestría en Ciencias Administrativas
          case 'Metodología de Investigación':
            return 'bg-[#fef3c7] border border-[#f59e0b] hover:bg-[#fef3c7]';
          case 'Estadística Aplicada':
            return 'bg-[#fce7f3] border border-[#ec4899] hover:bg-[#fce7f3]';
          case 'Teoría Organizacional':
            return 'bg-[#ecfdf5] border border-[#10b981] hover:bg-[#ecfdf5]';
          case 'Econometría':
            return 'bg-[#fef2f2] border border-[#ef4444] hover:bg-[#fef2f2]';
          case 'Seminario de Tesis I':
          case 'Seminario de Tesis II':
            return 'bg-[#f3f4f6] border border-[#6b7280] hover:bg-[#f3f4f6]';
          // Maestría en Ciencias Biotecnología
          case 'Biotecnología Molecular':
            return 'bg-[#dcfce7] border border-[#22c55e] hover:bg-[#dcfce7]';
          case 'Biotecnología Industrial':
            return 'bg-[#fef3c7] border border-[#eab308] hover:bg-[#fef3c7]';
          case 'Biotecnología Ambiental':
            return 'bg-[#dbeafe] border border-[#3b82f6] hover:bg-[#dbeafe]';
          case 'Biotecnología Farmacéutica':
            return 'bg-[#fce7f3] border border-[#ec4899] hover:bg-[#fce7f3]';
          case 'Proyecto de Investigación':
            return 'bg-[#f3e8ff] border border-[#a855f7] hover:bg-[#f3e8ff]';
          default:
            return 'bg-[#e4e9ff] border border-[#5555ea] hover:bg-[#e4e9ff]';
        }
    }
  };

  const handleSessionClick = (session: SessionData) => {
    setSessionSeleccionada(session);
    setModalSugerencia(true);
  };

  const togglePrograma = (programaId: number) => {
    setProgramasExpandidos(prev => ({
      ...prev,
      [programaId]: !prev[programaId]
    }));
  };

  // Debug: Verificar que llegamos al return
  console.log('About to return JSX...');

  return (
    <div className="flex h-screen bg-[#f7f8fe]">
      {/* Sidebar Izquierdo - Programas */}
      <div className="w-1/4 bg-white border-r border-[#e3e4ec] p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#3f4159]">Programas</h2>
                          <Button variant="outline" size="sm" className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#596b88]" />
            <Input
              placeholder="Buscar programa o materia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e3e4ec] focus:border-[#5555ea] bg-white"
            />
          </div>

          <div className="space-y-3">
            {/* Maestría en Ciencia de Datos */}
            <div className="space-y-2">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  programaActivo === 1 
                    ? 'bg-[#e4e9ff] border border-[#5555ea]' 
                    : 'bg-[#f7f8fe] hover:bg-[#e4e9ff]'
                }`}
                onClick={() => {
                  handleSelectPrograma(1);
                  setProgramasExpandidos(prev => ({ ...prev, 1: !prev[1] }));
                }}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">Maestría en Ciencia de Datos</h3>
                    <p className="text-xs text-[#596b88]">MCD</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[1] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[1] && (
                <div className="ml-4 space-y-2">
                  {/* Selector de Malla */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2 py-1">
                      <FileText className="h-3 w-3 text-[#5555ea]" />
                      <span className="text-xs font-medium text-[#596b88] uppercase">Malla Activa</span>
                  </div>
                  
                    {/* Selector compacto de malla */}
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all bg-gradient-to-r from-[#f7f8fe] to-white border border-[#e3e4ec] hover:border-[#5555ea] hover:shadow-sm"
                      onClick={() => setModalSeleccionMalla(true)}
                    >
                      <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#3f4159]">
                            {programas[0].mallas.find(m => m.id === mallaActiva)?.periodo || 'Seleccionar malla'}
                          </div>
                          {programas[0].mallas.find(m => m.id === mallaActiva)?.activa && (
                            <Badge className="bg-[#4fb37b] text-white text-xs px-2 py-0.5 rounded-full">
                                Activa
                              </Badge>
                            )}
                          </div>
                        </div>
                      <ChevronDown className="h-4 w-4 text-[#596b88]" />
                    </div>
                  </div>
                  
                  {/* Materias de la malla activa */}
                  {mallaActiva && programas[0].mallas.find(m => m.id === mallaActiva) && (
                    <div className="ml-4 space-y-3">
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#5555ea] to-[#4a4ad9] rounded-full"></div>
                        <span className="text-xs font-semibold text-[#596b88] uppercase tracking-wide">Materias</span>
                      </div>
                      
                      <div className="space-y-4">
                        {(() => {
                          const materias = programas[0].mallas.find(m => m.id === mallaActiva)?.materias || [];
                          const materiasPorSemestre = materias.reduce((acc, materia) => {
                            if (!acc[materia.semestre]) {
                              acc[materia.semestre] = [];
                            }
                            acc[materia.semestre].push(materia);
                            return acc;
                          }, {} as Record<number, typeof materias>);

                          return Object.keys(materiasPorSemestre)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map((semestre) => (
                              <div key={semestre} className="space-y-3">
                                {/* Header del semestre */}
                                <div className="flex items-center gap-2 py-2 border-b border-[#e3e4ec]">
                                  <div className="w-2 h-2 bg-[#5555ea] rounded-full"></div>
                                  <h3 className="text-sm font-semibold text-[#5555ea] uppercase tracking-wide">
                                    Semestre {semestre}
                                  </h3>
                                  <div className="flex-1 h-px bg-gradient-to-r from-[#5555ea] to-transparent ml-2"></div>
                                </div>

                                {/* Materias del semestre */}
                                <div className="space-y-2 ml-4">
                                  {materiasPorSemestre[parseInt(semestre)].map((materia) => {
                                    const colors = getMateriaColors(materia.nombre);
                                    const isSelected = materiaSeleccionada === materia.id.toString();
                                    
                                    return (
                                      <div 
                                        key={materia.id} 
                                        className={`group p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                          isSelected 
                                            ? `${colors.bg} ${colors.border} shadow-md` 
                                            : `bg-white border-[#e3e4ec] hover:${colors.border} hover:shadow-sm`
                                        }`}
                                        onClick={() => handleSelectMateria(materia.id.toString())}
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <h4 className={`font-medium text-sm transition-colors ${
                                              isSelected ? colors.text : 'text-[#3f4159] group-hover:' + colors.text.replace('text-', '')
                                            }`}>
                                              {materia.nombre}
                                            </h4>
                                            <p className="text-xs text-[#596b88] mt-1">
                                              {materia.codigo}
                                            </p>
                                          </div>
                                          <div className="flex flex-wrap gap-1 ml-2">
                                            {materia.grupos?.map((grupo, index) => {
                                              const isGrupoSelected = isSelected && grupoSeleccionado === grupo;
                                              
                                              return (
                                                <Badge 
                                                  key={index}
                                                  className={`text-xs px-2 py-1 rounded-md transition-colors cursor-pointer border-2 ${
                                                    isGrupoSelected
                                                      ? 'bg-[#5555ea] text-white border-[#5555ea] shadow-md'
                                                      : isSelected
                                                      ? 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                      : 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                  }`}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectGrupo(materia.id.toString(), grupo);
                                                  }}
                                                >
                                                  {grupo}
                                                </Badge>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Maestría en Ciencias Administrativas */}
            <div className="space-y-2">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  programaActivo === 2 
                    ? 'bg-[#e4e9ff] border border-[#5555ea]' 
                    : 'bg-[#f7f8fe] hover:bg-[#e4e9ff]'
                }`}
                onClick={() => {
                  handleSelectPrograma(2);
                  setProgramasExpandidos(prev => ({ ...prev, 2: !prev[2] }));
                }}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">Maestría en Ciencias Administrativas</h3>
                    <p className="text-xs text-[#596b88]">MCA</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[2] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[2] && (
                <div className="ml-4 space-y-2">
                  {/* Selector de Malla */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2 py-1">
                      <FileText className="h-3 w-3 text-[#5555ea]" />
                      <span className="text-xs font-medium text-[#596b88] uppercase">Malla Activa</span>
                  </div>
                  
                    {/* Selector compacto de malla */}
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all bg-gradient-to-r from-[#f7f8fe] to-white border border-[#e3e4ec] hover:border-[#5555ea] hover:shadow-sm"
                      onClick={() => setModalSeleccionMalla(true)}
                    >
                      <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#3f4159]">
                            {programas[1].mallas.find(m => m.id === mallaActiva)?.periodo || 'Seleccionar malla'}
                          </div>
                          {programas[1].mallas.find(m => m.id === mallaActiva)?.activa && (
                            <Badge className="bg-[#4fb37b] text-white text-xs px-2 py-0.5 rounded-full">
                                Activa
                              </Badge>
                            )}
                          </div>
                        </div>
                      <ChevronDown className="h-4 w-4 text-[#596b88]" />
                    </div>
                  </div>
                  
                  {/* Materias de la malla activa */}
                  {mallaActiva && programas[1].mallas.find(m => m.id === mallaActiva) && (
                    <div className="ml-4 space-y-3">
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#5555ea] to-[#4a4ad9] rounded-full"></div>
                        <span className="text-xs font-semibold text-[#596b88] uppercase tracking-wide">Materias</span>
                      </div>
                      
                      <div className="space-y-4">
                        {(() => {
                          const materias = programas[1].mallas.find(m => m.id === mallaActiva)?.materias || [];
                          const materiasPorSemestre = materias.reduce((acc, materia) => {
                            if (!acc[materia.semestre]) {
                              acc[materia.semestre] = [];
                            }
                            acc[materia.semestre].push(materia);
                            return acc;
                          }, {} as Record<number, typeof materias>);

                          return Object.keys(materiasPorSemestre)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map((semestre) => (
                              <div key={semestre} className="space-y-3">
                                {/* Header del semestre */}
                                <div className="flex items-center gap-2 py-2 border-b border-[#e3e4ec]">
                                  <div className="w-2 h-2 bg-[#5555ea] rounded-full"></div>
                                  <h3 className="text-sm font-semibold text-[#5555ea] uppercase tracking-wide">
                                    Semestre {semestre}
                                  </h3>
                                  <div className="flex-1 h-px bg-gradient-to-r from-[#5555ea] to-transparent ml-2"></div>
                                </div>

                                {/* Materias del semestre */}
                                <div className="space-y-2 ml-4">
                                  {materiasPorSemestre[parseInt(semestre)].map((materia) => {
                                    const colors = getMateriaColors(materia.nombre);
                                    const isSelected = materiaSeleccionada === materia.id.toString();
                                    
                                    return (
                                      <div 
                                        key={materia.id} 
                                        className={`group p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                          isSelected 
                                            ? `${colors.bg} ${colors.border} shadow-md` 
                                            : `bg-white border-[#e3e4ec] hover:${colors.border} hover:shadow-sm`
                                        }`}
                                        onClick={() => handleSelectMateria(materia.id.toString())}
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <h4 className={`font-medium text-sm transition-colors ${
                                              isSelected ? colors.text : 'text-[#3f4159] group-hover:' + colors.text.replace('text-', '')
                                            }`}>
                                              {materia.nombre}
                                            </h4>
                                            <p className="text-xs text-[#596b88] mt-1">
                                              {materia.codigo}
                                            </p>
                                          </div>
                                          <div className="flex flex-wrap gap-1 ml-2">
                                            {materia.grupos?.map((grupo, index) => {
                                              const isGrupoSelected = isSelected && grupoSeleccionado === grupo;
                                              
                                              return (
                                                <Badge 
                                                  key={index}
                                                  className={`text-xs px-2 py-1 rounded-md transition-colors cursor-pointer border-2 ${
                                                    isGrupoSelected
                                                      ? 'bg-[#5555ea] text-white border-[#5555ea] shadow-md'
                                                      : isSelected
                                                      ? 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                      : 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                  }`}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectGrupo(materia.id.toString(), grupo);
                                                  }}
                                                >
                                                  {grupo}
                                                </Badge>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Maestría en Ciencias Biotecnología */}
            <div className="space-y-2">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  programaActivo === 3 
                    ? 'bg-[#e4e9ff] border border-[#5555ea]' 
                    : 'bg-[#f7f8fe] hover:bg-[#e4e9ff]'
                }`}
                onClick={() => {
                  handleSelectPrograma(3);
                  setProgramasExpandidos(prev => ({ ...prev, 3: !prev[3] }));
                }}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#5555ea]" />
                  <div>
                    <h3 className="font-medium text-sm text-[#3f4159]">Maestría en Ciencias Biotecnología</h3>
                    <p className="text-xs text-[#596b88]">MCB</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-[#596b88] transition-transform ${
                    programasExpandidos[3] ? 'rotate-180' : ''
                  }`}
                />
              </div>
              
              {programasExpandidos[3] && (
                <div className="ml-4 space-y-2">
                  {/* Selector de Malla */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2 py-1">
                      <FileText className="h-3 w-3 text-[#5555ea]" />
                      <span className="text-xs font-medium text-[#596b88] uppercase">Malla Activa</span>
                  </div>
                  
                    {/* Selector compacto de malla */}
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all bg-gradient-to-r from-[#f7f8fe] to-white border border-[#e3e4ec] hover:border-[#5555ea] hover:shadow-sm"
                      onClick={() => setModalSeleccionMalla(true)}
                    >
                      <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#3f4159]">
                            {programas[2].mallas.find(m => m.id === mallaActiva)?.periodo || 'Seleccionar malla'}
                          </div>
                          {programas[2].mallas.find(m => m.id === mallaActiva)?.activa && (
                            <Badge className="bg-[#4fb37b] text-white text-xs px-2 py-0.5 rounded-full">
                                Activa
                              </Badge>
                            )}
                          </div>
                        </div>
                      <ChevronDown className="h-4 w-4 text-[#596b88]" />
                    </div>
                  </div>
                  
                  {/* Materias de la malla activa */}
                  {mallaActiva && programas[2].mallas.find(m => m.id === mallaActiva) && (
                    <div className="ml-4 space-y-3">
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#5555ea] to-[#4a4ad9] rounded-full"></div>
                        <span className="text-xs font-semibold text-[#596b88] uppercase tracking-wide">Materias</span>
                      </div>
                      
                      <div className="space-y-4">
                        {(() => {
                          const materias = programas[2].mallas.find(m => m.id === mallaActiva)?.materias || [];
                          const materiasPorSemestre = materias.reduce((acc, materia) => {
                            if (!acc[materia.semestre]) {
                              acc[materia.semestre] = [];
                            }
                            acc[materia.semestre].push(materia);
                            return acc;
                          }, {} as Record<number, typeof materias>);

                          return Object.keys(materiasPorSemestre)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map((semestre) => (
                              <div key={semestre} className="space-y-3">
                                {/* Header del semestre */}
                                <div className="flex items-center gap-2 py-2 border-b border-[#e3e4ec]">
                                  <div className="w-2 h-2 bg-[#5555ea] rounded-full"></div>
                                  <h3 className="text-sm font-semibold text-[#5555ea] uppercase tracking-wide">
                                    Semestre {semestre}
                                  </h3>
                                  <div className="flex-1 h-px bg-gradient-to-r from-[#5555ea] to-transparent ml-2"></div>
                                </div>

                                {/* Materias del semestre */}
                                <div className="space-y-2 ml-4">
                                  {materiasPorSemestre[parseInt(semestre)].map((materia) => {
                                    const colors = getMateriaColors(materia.nombre);
                                    const isSelected = materiaSeleccionada === materia.id.toString();
                                    
                                    return (
                                      <div 
                                        key={materia.id} 
                                        className={`group p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                          isSelected 
                                            ? `${colors.bg} ${colors.border} shadow-md` 
                                            : `bg-white border-[#e3e4ec] hover:${colors.border} hover:shadow-sm`
                                        }`}
                                        onClick={() => handleSelectMateria(materia.id.toString())}
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <h4 className={`font-medium text-sm transition-colors ${
                                              isSelected ? colors.text : 'text-[#3f4159] group-hover:' + colors.text.replace('text-', '')
                                            }`}>
                                              {materia.nombre}
                                            </h4>
                                            <p className="text-xs text-[#596b88] mt-1">
                                              {materia.codigo}
                                            </p>
                                          </div>
                                          <div className="flex flex-wrap gap-1 ml-2">
                                            {materia.grupos?.map((grupo, index) => {
                                              const isGrupoSelected = isSelected && grupoSeleccionado === grupo;
                                              
                                              return (
                                                <Badge 
                                                  key={index}
                                                  className={`text-xs px-2 py-1 rounded-md transition-colors cursor-pointer border-2 ${
                                                    isGrupoSelected
                                                      ? 'bg-[#5555ea] text-white border-[#5555ea] shadow-md'
                                                      : isSelected
                                                      ? 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                      : 'bg-white text-[#5555ea] border-[#5555ea] hover:bg-[#5555ea] hover:text-white'
                                                  }`}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectGrupo(materia.id.toString(), grupo);
                                                  }}
                                                >
                                                  {grupo}
                                                </Badge>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-[#e3e4ec] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3f4159]">Planeación de Cursos</h1>
              <p className="text-[#596b88]">
                {programaActual?.nombre} - Malla {mallaActual?.periodo}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setModalPlaneacion(true)}
                className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generar planeación
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 space-y-6 p-6">

          {/* Calendario de Planeación */}
          <Card className="border-[#e3e4ec] bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#3f4159]">Calendario de Planeación</CardTitle>
                  <CardDescription className="text-[#596b88]">
                    {programaActual?.nombre} - Malla {mallaActual?.periodo} - {
                      materiaSeleccionada ? (
                        grupoSeleccionado 
                          ? `${mallaActual?.materias.find(m => m.id.toString() === materiaSeleccionada)?.nombre} - ${grupoSeleccionado}`
                          : `${mallaActual?.materias.find(m => m.id.toString() === materiaSeleccionada)?.nombre} - Todos los grupos`
                      ) : 'Todos los cursos'
                    }
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium text-[#3f4159]">
                    {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleNextMonth} className="border-[#e3e4ec] hover:bg-[#e4e9ff] hover:border-[#5555ea] rounded-lg">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Headers de días */}
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-[#596b88]">
                    {day}
                  </div>
                ))}
                
                {/* Días del calendario */}
                {getDaysInMonth().map((date, index) => {
                  const sessions = getSessionsForDate(date);
                  const isCurrentMonthDay = isCurrentMonth(date);
                  
                  return (
                    <div 
                      key={index}
                      className={`min-h-[80px] p-2 border border-[#e3e4ec] ${
                        isCurrentMonthDay ? 'bg-white' : 'bg-[#f7f8fe]'
                      }`}
                    >
                      <div className={`text-sm ${
                        isCurrentMonthDay ? 'text-[#3f4159]' : 'text-[#596b88]'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className={`mt-1 p-1 text-xs cursor-pointer transition-colors ${getSessionStyle(session.estado, session.curso)}`}
                          onClick={() => handleSessionClick(session)}
                        >
                          <div className="font-medium">{session.curso}</div>
                          <div className="flex items-center gap-1 text-[#596b88]">
                            <Clock className="h-3 w-3" />
                            {session.horaInicio}
                          </div>
                          <div className="text-[#596b88]">{session.aula}</div>
                          {session.estado === 'conflicto' && (
                            <div className="flex items-center gap-1 text-[#e9683b]">
                              <AlertTriangle className="h-3 w-3" />
                              <span>Conflicto</span>
                            </div>
                          )}
                          {session.estado === 'festivo' && (
                            <div className="flex items-center gap-1 text-[#b8860b]">
                              <AlertTriangle className="h-3 w-3" />
                              <span>Festivo</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Panel Flotante - Acciones */}
      <div className="fixed top-52 right-6 z-50">
        {/* Botón flotante principal */}
        <div className="relative">
              <Button 
            onClick={() => setPanelFlotanteAbierto(!panelFlotanteAbierto)}
            className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all"
              >
            <MoreHorizontal className="h-5 w-5" />
              </Button>
          
          {/* Indicador de notificaciones */}
          <div className="absolute -top-1 -right-1 bg-[#e9683b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
            </div>
      </div>

        {/* Overlay para cerrar el panel */}
        {panelFlotanteAbierto && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setPanelFlotanteAbierto(false)}
          />
        )}

        {/* Panel expandible */}
        {panelFlotanteAbierto && (
          <div className="absolute top-16 right-0 w-64 bg-white rounded-lg shadow-xl border border-[#e3e4ec] p-4 space-y-3 z-50">
            {/* Estado de fase de recomendaciones */}
            <div className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${
              getEstadoFase() === 'activa' 
                ? 'bg-[#e6f7ef] border-[#4fb37b]' 
                : getEstadoFase() === 'bloqueada'
                ? 'bg-[#fdecec] border-[#e9683b]'
                : 'bg-[#fff8e6] border-[#b8860b]'
            }`}
            onClick={() => setModalConfiguracionFase(true)}>
              <div className="flex items-center gap-2">
                {getEstadoFase() === 'activa' ? (
                  <Unlock className="h-4 w-4 text-[#4fb37b]" />
                ) : (
                  <Lock className="h-4 w-4 text-[#e9683b]" />
                )}
                <span className={`text-sm font-medium ${
                  getEstadoFase() === 'activa' 
                    ? 'text-[#4fb37b]' 
                    : getEstadoFase() === 'bloqueada'
                    ? 'text-[#e9683b]'
                    : 'text-[#b8860b]'
                }`}>
                  Fase Activa
                </span>
                <Settings className="h-4 w-4 text-[#596b88] ml-auto" />
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="space-y-2">
            <Button 
              variant="ghost" 
                size="sm"
                className={`w-full justify-start text-sm text-[#3f4159] hover:bg-[#e4e9ff] h-10 ${
                !esFaseActiva() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
                onClick={() => {
                  if (esFaseActiva()) {
                    setDrawerAbierto(true);
                    setPanelFlotanteAbierto(false);
                  }
                }}
              disabled={!esFaseActiva()}
            >
              <MessageSquare className="h-4 w-4 mr-3" />
                Sugerencias
                <Badge className="ml-auto bg-[#e9683b] text-white text-xs h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
            <Button 
              variant="ghost" 
                size="sm"
                className="w-full justify-start text-sm text-[#3f4159] hover:bg-[#e4e9ff] h-10"
                onClick={() => {
                  setHistorialAbierto(true);
                  setPanelFlotanteAbierto(false);
                }}
            >
              <History className="h-4 w-4 mr-3" />
                Historial
            </Button>
            <Button 
              variant="ghost" 
                size="sm"
                className="w-full justify-start text-sm text-[#3f4159] hover:bg-[#e4e9ff] h-10"
                onClick={() => {
                  setPublicarAbierto(true);
                  setPanelFlotanteAbierto(false);
                }}
            >
              <Send className="h-4 w-4 mr-3" />
              Publicar
            </Button>
            </div>
          </div>
        )}
      </div>


      {/* Modales y Drawers */}
      <SuggestionsDrawer 
        open={drawerAbierto} 
        onOpenChange={setDrawerAbierto} 
      />
      
      <VersionHistoryDrawer
        open={historialAbierto}
        onOpenChange={setHistorialAbierto}
      />

      <PublishDrawer
        open={publicarAbierto}
        onOpenChange={setPublicarAbierto}
      />

      <SessionSuggestionModal
        open={modalSugerencia}
        onOpenChange={setModalSugerencia}
        sessionData={sessionSeleccionada}
      />
      
      <GeneratePlanningModal
        open={modalPlaneacion}
        onOpenChange={setModalPlaneacion}
        curso={mallaActual ? {
          nombre: `${programaActual?.nombre} - Malla ${mallaActual.periodo}`,
          codigo: mallaActual.id,
          grupo: "Todos"
        } : undefined}
      />

      <ProgrammingConfigModal
        open={modalConfiguracionProgramacion}
        onOpenChange={setModalConfiguracionProgramacion}
        grupoData={grupoConfiguracion}
      />

      {/* Modal de configuración de fase de recomendaciones */}
      <Dialog open={modalConfiguracionFase} onOpenChange={setModalConfiguracionFase}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurar Fase de Recomendaciones
            </DialogTitle>
            <DialogDescription>
              Define las fechas de inicio y fin para que los directores puedan enviar sugerencias
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Estado actual */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estado Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#596b88]">Estado:</span>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        getEstadoFase() === 'activa' 
                          ? 'bg-[#e6f7ef] text-[#4fb37b]' 
                          : getEstadoFase() === 'bloqueada'
                          ? 'bg-[#fdecec] text-[#e9683b]'
                          : 'bg-[#fff8e6] text-[#b8860b]'
                      }>
                        {getEstadoFase() === 'activa' ? 'Activa' : getEstadoFase() === 'bloqueada' ? 'Bloqueada' : 'Cerrada'}
                      </Badge>
                      {faseRecomendaciones.forzarApertura && (
                        <Badge className="bg-[#e6f7ef] text-[#4fb37b] text-xs">
                          Forzada
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#596b88]">Fecha de inicio:</span>
                    <span className="text-sm font-medium">{faseRecomendaciones.fechaInicio}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#596b88]">Fecha de fin:</span>
                    <span className="text-sm font-medium">{faseRecomendaciones.fechaFin}</span>
                  </div>
                  {esFaseActiva() && !faseRecomendaciones.forzarApertura && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#596b88]">Tiempo restante:</span>
                      <span className="text-sm font-medium text-[#4fb37b]">{getTiempoRestante()}</span>
                    </div>
                  )}
                  {faseRecomendaciones.forzarApertura && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#596b88]">Apertura forzada:</span>
                      <span className="text-sm font-medium text-[#4fb37b]">Activa</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Configuración de fechas */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={faseRecomendaciones.fechaInicio}
                    onChange={(e) => setFaseRecomendaciones(prev => ({
                      ...prev,
                      fechaInicio: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de fin</Label>
                  <Input
                    id="fechaFin"
                    type="date"
                    value={faseRecomendaciones.fechaFin}
                    onChange={(e) => setFaseRecomendaciones(prev => ({
                      ...prev,
                      fechaFin: e.target.value
                    }))}
                  />
                </div>
              </div>

              {/* Control manual de bloqueo */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Bloqueo manual</div>
                  <div className="text-xs text-[#596b88]">
                    Bloquear inmediatamente el envío de sugerencias
                  </div>
                </div>
                <Button
                  variant={faseRecomendaciones.bloqueada ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setFaseRecomendaciones(prev => ({
                    ...prev,
                    bloqueada: !prev.bloqueada,
                    forzarApertura: false // Reset forzar apertura al bloquear
                  }))}
                >
                  {faseRecomendaciones.bloqueada ? "Desbloquear" : "Bloquear"}
                </Button>
              </div>

              {/* Control de forzar apertura */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Forzar apertura</div>
                  <div className="text-xs text-[#596b88]">
                    Permitir sugerencias aunque haya pasado la fecha límite
                  </div>
                </div>
                <Button
                  variant={faseRecomendaciones.forzarApertura ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFaseRecomendaciones(prev => ({
                    ...prev,
                    forzarApertura: !prev.forzarApertura,
                    bloqueada: false // Reset bloqueo al forzar apertura
                  }))}
                >
                  {faseRecomendaciones.forzarApertura ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </div>

            {/* Información adicional */}
            <Card className="bg-[#f7f8fe] border-[#e3e4ec]">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#b8860b] mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-[#3f4159]">Información importante</p>
                    <ul className="text-[#596b88] mt-1 space-y-1">
                      <li>• Los directores recibirán notificación automática cuando se abra la fase</li>
                      <li>• El sistema bloqueará automáticamente el envío de sugerencias al finalizar</li>
                      <li>• Puedes bloquear manualmente la fase en cualquier momento</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setModalConfiguracionFase(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                // Aquí se guardaría la configuración
                toast({
                  title: "Configuración guardada",
                  description: "Las fechas de la fase de recomendaciones han sido actualizadas",
                });
                setModalConfiguracionFase(false);
              }}
            >
              Guardar configuración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Selección de Malla */}
      <Dialog open={modalSeleccionMalla} onOpenChange={setModalSeleccionMalla}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Seleccionar Malla Curricular
            </DialogTitle>
            <DialogDescription>
              Elige la malla curricular que deseas visualizar y planificar
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Información del programa actual */}
            <Card className="bg-[#f7f8fe] border-[#e3e4ec]">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-[#5555ea]" />
                  <div>
                    <div className="font-medium text-[#3f4159]">{programaActual?.nombre}</div>
                    <div className="text-sm text-[#596b88]">
                      {programaActual?.mallas.length} mallas disponibles
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de mallas */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {programaActual?.mallas.map((malla) => (
                <div
                  key={malla.id}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    mallaActiva === malla.id
                      ? 'bg-[#e4e9ff] border-[#5555ea]'
                      : 'bg-white border-[#e3e4ec] hover:border-[#5555ea] hover:bg-[#f7f8fe]'
                  }`}
                  onClick={() => {
                    handleSelectMalla(malla.id);
                    setModalSeleccionMalla(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      malla.activa ? 'bg-[#4fb37b]' : 'bg-[#6b7280]'
                    }`}></div>
                    <div>
                      <div className="font-medium text-[#3f4159]">
                        Malla {malla.periodo}
                      </div>
                      <div className="text-sm text-[#596b88]">
                        {malla.materias.length} materias • {Math.max(...malla.materias.map(m => m.semestre))} semestres
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {malla.activa && (
                      <Badge className="bg-[#4fb37b] text-white text-xs px-2 py-1">
                        Activa
                      </Badge>
                    )}
                    {mallaActiva === malla.id && (
                      <CheckCircle className="h-5 w-5 text-[#5555ea]" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Información adicional */}
            <Card className="bg-[#f7f8fe] border-[#e3e4ec]">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#b8860b] mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-[#3f4159]">Información</p>
                    <ul className="text-[#596b88] mt-1 space-y-1">
                      <li>• Solo puedes planificar cursos de la malla seleccionada</li>
                      <li>• Las mallas activas son las que están en uso actualmente</li>
                      <li>• Las mallas históricas son para consulta y referencia</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setModalSeleccionMalla(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => setModalSeleccionMalla(false)}
              className="bg-[#5555ea] hover:bg-[#4a4ad9] text-white"
            >
              Confirmar selección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}