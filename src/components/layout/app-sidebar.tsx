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
  Building,
  User
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
  { title: "Inicio", url: "/app", icon: Home },
  { title: "Calendario", url: "/app/calendario", icon: Calendar },
  { title: "Planeación", url: "/app/planeacion", icon: Layers3 },
  { title: "Datos", url: "/app/datos", icon: Upload },
  { title: "Recursos", url: "/app/recursos", icon: Building },
  { title: "Configuración", url: "/app/configuracion", icon: Settings },
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
      ? "bg-[#5555ea]/10 text-[#5555ea] font-medium" 
      : "text-gray-600 hover:text-[#5555ea] hover:bg-[#5555ea]/5";

  return (
    <>
      <SidebarHeader className="bg-white p-4 mb-4 border-b border-gray-100">
          {!collapsed && <img src={logo} alt="Icesi Posgrados" className="w-full h-auto px-4" />}
      </SidebarHeader>
      
      <SidebarContentUI className="bg-white px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 ${getNavClassName}`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-[#5555ea]' : 'text-gray-600'}`} />
                      {!collapsed && (
                        <span className={`text-sm font-medium ${isActive(item.url) ? 'text-[#5555ea]' : 'text-gray-600'}`}>
                          {item.title}
                        </span>
                      )}
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
    <Sidebar collapsible="icon" className="border-r border-[#e3e4ec] rounded-tr-lg">
      <SidebarNavigation />
    </Sidebar>
  );
}