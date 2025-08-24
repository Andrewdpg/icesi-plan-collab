import { 
  Calendar, 
  Home, 
  Layers3, 
  Upload,
  Users,
  Bell,
  CheckCircle,
  History,
  Settings,
  BookOpen,
  Building
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "@/assets/logo_hotizontal_dc.png";

import {
  Sidebar,
  SidebarContent as SidebarContentUI,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Calendario", url: "/calendario", icon: Calendar },
  { title: "Planeación", url: "/planeacion", icon: Layers3 },
  { title: "Datos", url: "/datos", icon: Upload },
  { title: "Espacios", url: "/espacios", icon: Building },
  { title: "Configuración", url: "/configuracion", icon: Settings },
];

// Componente interno que usa el contexto del sidebar
function SidebarNavigation() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-[#e4e9ff] text-[#5555ea] font-medium border-l-4 border-[#5555ea]" 
      : "hover:bg-[#f7f8fe] text-[#3f4159] hover:text-[#5555ea]";

  return (
    <>
      <SidebarHeader className="bg-[#f7f8fe] p-4 mb-4">
          {!collapsed && <img src={logo} alt="Icesi Posgrados" className="w-full h-auto px-8" />}
      </SidebarHeader>
      
      <SidebarContentUI className="bg-[#f7f8fe]">
        <SidebarGroup>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink to={item.url} end className={`flex items-center gap-3 px-3 py-2 transition-colors ${getNavClassName}`}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentUI>
    </>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-[#e3e4ec]">
      <SidebarNavigation />
    </Sidebar>
  );
}