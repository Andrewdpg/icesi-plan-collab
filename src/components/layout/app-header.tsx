import { Bell, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string> = {
  "/": "Inicio",
  "/planeacion": "Planeación de Cursos",
  "/datos": "Importar/Exportar Datos",
  "/calendario": "Calendario Personal",
  "/aprobacion": "Aprobación & Publicación"
};

export function AppHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const breadcrumb = breadcrumbMap[currentPath] || "Icesi Posgrados";

  return (
    <header className="h-16 border-b border-[#e3e4ec] bg-white flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        {/* Logo - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-[#5555ea] flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <span className="font-semibold text-[#3f4159]">Icesi Posgrados</span>
        </div>
      </div>

      {/* Center breadcrumb - hidden on mobile */}
      <div className="hidden md:block">
        <h1 className="text-lg font-medium text-[#3f4159]">{breadcrumb}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Program/Cohort selectors for planeacion page */}
        {currentPath === "/planeacion" && (
          <div className="hidden lg:flex items-center gap-2">
            <select className="px-3 py-1.5 border border-[#e3e4ec] text-sm bg-white text-[#3f4159] focus:border-[#5555ea] focus:outline-none">
              <option>Maestría en Gestión</option>
              <option>MBA</option>
              <option>Doctorado en Ciencias</option>
            </select>
            <select className="px-3 py-1.5 border border-[#e3e4ec] text-sm bg-white text-[#3f4159] focus:border-[#5555ea] focus:outline-none">
              <option>2024-2</option>
              <option>2024-1</option>
            </select>
          </div>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-[#e4e9ff]">
          <Bell className="h-4 w-4 text-[#3f4159]" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#e9683b] text-white">
            3
          </Badge>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 hover:bg-[#e4e9ff]">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/user.jpg" alt="Usuario" />
                <AvatarFallback className="bg-[#5555ea] text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-[#e3e4ec] bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-[#3f4159]">María García</p>
                <p className="text-xs leading-none text-[#596b88]">
                  coordinadora@icesi.edu.co
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            <DropdownMenuItem className="hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159]">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#e4e9ff] focus:bg-[#e4e9ff] text-[#3f4159]">
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#e3e4ec]" />
            <DropdownMenuItem className="text-[#e9683b] hover:bg-[#fdecec] focus:bg-[#fdecec]">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}