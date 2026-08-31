"use client"

import {
  Activity,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  FileSpreadsheet,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
    role?: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-emerald-50 data-[state=open]:text-emerald-700 hover:bg-slate-100 p-2 rounded-lg"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                SM
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-900">{user.name}</span>
                <span className="truncate text-xs text-slate-500">{user.role || user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-md"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-1.5 font-normal">
              <div className="flex items-center gap-2 text-left">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                  SM
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold text-slate-900">{user.name}</span>
                  <span className="truncate text-slate-500">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md cursor-pointer">
                <User className="size-4 text-emerald-600 mr-2" />
                Clinician Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md cursor-pointer">
                <Activity className="size-4 text-emerald-600 mr-2" />
                Ward Triage Shift
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md cursor-pointer">
                <ShieldCheck className="size-4 text-emerald-600 mr-2" />
                HIPAA & EHR Access
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer">
              <LogOut className="size-4 text-rose-500 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

