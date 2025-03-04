import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { links } from "@/utils/index";
import UserLogo from "../UserLogo/UserLogo";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks";

export function AppSidebar() {
  const userName = useAppSelector((state) => state.userState.user?.username);
  return (
    <Sidebar className="absolute h-full" collapsible="icon">
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="pointer-events-none">
              <div>
                <UserLogo></UserLogo>
                <span className="pl-1 text-lg font-medium">
                  {userName ? userName : "Guest User"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator className="-ml-1"></SidebarSeparator>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem></SidebarMenuItem>
            {links.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span className="text-lg">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
