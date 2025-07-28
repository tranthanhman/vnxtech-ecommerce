import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/img/logo.png";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { menuGroups, type MenuItem } from "./data/sidebar-data";
import type { ReactNode } from "react";

function NavBadge({ children }: { children: ReactNode }) {
  return <Badge className="px-1 py-0 text-xs rounded-full">{children}</Badge>;
}

function checkIsActive(
  href: string,
  item: MenuItem,
  mainNav = false
) {
  // Defensive: ensure href is a string
  if (typeof href !== "string") return false;
  // Defensive: ensure item.url is a string if used
  const itemUrl = typeof item.url === "string" ? item.url : "";

  return (
    href === itemUrl ||
    href.split("?")[0] === itemUrl ||
    !!item?.items?.filter((i: MenuItem) => i.url === href).length ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      typeof itemUrl === "string" &&
      itemUrl.split &&
      href.split("/")[1] === itemUrl.split("/")[1])
  );
}

const SidebarMenuLink = ({
  item,
  href,
}: {
  item: MenuItem;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <Link to={item.url ?? "#"} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: MenuItem;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items &&
              item.items.map((subItem: MenuItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={checkIsActive(href, subItem)}
                  >
                    <Link to={subItem.url ?? "#"} onClick={() => setOpenMobile(false)}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: MenuItem;
  href: string;
}) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items &&
            item.items.map((sub: MenuItem) => (
              <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                <Link
                  to={sub.url ?? "#"}
                  className={`${checkIsActive(href, sub) ? "bg-secondary" : ""}`}
                >
                  {sub.icon && <sub.icon />}
                  <span className="max-w-52 text-wrap">{sub.title}</span>
                  {sub.badge && (
                    <span className="ml-auto text-xs">{sub.badge}</span>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  // useLocation returns a Location object, not a string. Use .pathname + .search for full URL path.
  const location = useLocation();
  const href = location.pathname + location.search;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex justify-center">
          <img src={Logo} alt="" className="size-[120px]" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, groupIdx) => (
          <SidebarGroup key={group.title + groupIdx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const key = `${item.title}-${item.url}`;
                if (!item.items)
                  return <SidebarMenuLink key={key} item={item} href={href} />;
                if (state === "collapsed" && !isMobile)
                  return (
                    <SidebarMenuCollapsedDropdown
                      key={key}
                      item={item}
                      href={href}
                    />
                  );
                return (
                  <SidebarMenuCollapsible key={key} item={item} href={href} />
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
