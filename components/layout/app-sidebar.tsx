"use client"

import * as React from "react"
import {
  Activity,
  AlertCircle,
  Calendar,
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  HeartPulse,
  Plus,
  Search,
  Stethoscope,
  Users,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

const clinicalData = {
  user: {
    name: "Dr. Sarah Mitchell",
    email: "s.mitchell@healthpulse.org",
    avatar: "",
    role: "Chief Triage Physician",
  },
  navMain: [
    {
      title: "Triage Queue",
      icon: Activity,
      count: 6,
      badge: "6 Active",
      badgeVariant: "urgent" as const,
    },
    {
      title: "Consultations",
      icon: Stethoscope,
      count: 4,
      badge: "4 Scheduled",
      badgeVariant: "secondary" as const,
    },
    {
      title: "Inpatient Ward",
      icon: Users,
      count: 12,
      badge: "12 Beds",
      badgeVariant: "slate" as const,
    },
    {
      title: "Lab Results",
      icon: FlaskConical,
      count: 3,
      badge: "3 Pending",
      badgeVariant: "warning" as const,
    },
    {
      title: "Discharges",
      icon: ClipboardList,
      count: 2,
      badge: "2 Ready",
      badgeVariant: "emerald" as const,
    },
  ],
  patients: [
    {
      id: "PT-8831",
      name: "Eleanor Vance",
      age: 42,
      gender: "Female",
      category: "Triage Queue",
      priority: "High Priority",
      urgency: "urgent" as const,
      chiefComplaint: "Acute chest tightness & shortness of breath upon exertion",
      vitals: { hr: "104 bpm", bp: "148/92", spo2: "94%" },
      time: "8 min ago",
      assignedDoc: "Dr. Mitchell",
      room: "Room 102",
      status: "Awaiting ECG",
      isUnread: true,
    },
    {
      id: "PT-8832",
      name: "Marcus Aurelius Vance",
      age: 67,
      gender: "Male",
      category: "Triage Queue",
      priority: "Critical",
      urgency: "urgent" as const,
      chiefComplaint: "Suspected TIA with mild left-side facial numbness",
      vitals: { hr: "88 bpm", bp: "162/98", spo2: "97%" },
      time: "14 min ago",
      assignedDoc: "Dr. Mitchell",
      room: "Trauma Bay A",
      status: "CT Scan Ordered",
      isUnread: true,
    },
    {
      id: "PT-8833",
      name: "Sophia Chen",
      age: 29,
      gender: "Female",
      category: "Triage Queue",
      priority: "Moderate",
      urgency: "warning" as const,
      chiefComplaint: "Right lower quadrant abdominal pain, febrile (38.6°C)",
      vitals: { hr: "96 bpm", bp: "118/76", spo2: "99%" },
      time: "25 min ago",
      assignedDoc: "Dr. Al-Mansoor",
      room: "Room 105",
      status: "Ultrasound Pending",
      isUnread: true,
    },
    {
      id: "PT-8834",
      name: "James Thornton",
      age: 55,
      gender: "Male",
      category: "Triage Queue",
      priority: "Routine",
      urgency: "secondary" as const,
      chiefComplaint: "Post-op wound dressing evaluation, localized erythema",
      vitals: { hr: "72 bpm", bp: "124/82", spo2: "98%" },
      time: "42 min ago",
      assignedDoc: "Nurse Diaz",
      room: "Minor Care 3",
      status: "Checked In",
      isUnread: false,
    },
    {
      id: "PT-8835",
      name: "David Kim",
      age: 34,
      gender: "Male",
      category: "Consultations",
      priority: "Telehealth",
      urgency: "blue" as const,
      chiefComplaint: "Hypertension medication titration follow-up & lab review",
      vitals: { hr: "68 bpm", bp: "130/84", spo2: "99%" },
      time: "10:30 AM",
      assignedDoc: "Dr. Mitchell",
      room: "Virtual 02",
      status: "Call Ready",
      isUnread: true,
    },
    {
      id: "PT-8836",
      name: "Maria Santos",
      age: 51,
      gender: "Female",
      category: "Consultations",
      priority: "Follow-up",
      urgency: "secondary" as const,
      chiefComplaint: "Type 2 Diabetes quarterly HbA1c review (6.4%)",
      vitals: { hr: "74 bpm", bp: "122/78", spo2: "98%" },
      time: "11:15 AM",
      assignedDoc: "Dr. Mitchell",
      room: "Suite 4",
      status: "Checked In",
      isUnread: false,
    },
    {
      id: "PT-8837",
      name: "Robert Patterson",
      age: 73,
      gender: "Male",
      category: "Inpatient Ward",
      priority: "Post-Op Day 2",
      urgency: "slate" as const,
      chiefComplaint: "Total knee arthroplasty recovery, physical therapy rehab",
      vitals: { hr: "76 bpm", bp: "128/80", spo2: "97%" },
      time: "Ward 4B",
      assignedDoc: "Dr. Reynolds",
      room: "Bed 412",
      status: "Mobilizing",
      isUnread: false,
    },
    {
      id: "PT-8838",
      name: "Hannah Lindqvist",
      age: 26,
      gender: "Female",
      category: "Lab Results",
      priority: "Stat Lab",
      urgency: "warning" as const,
      chiefComplaint: "Electrolyte panel & Troponin I serial follow-up",
      vitals: { hr: "80 bpm", bp: "116/74", spo2: "100%" },
      time: "15 min ago",
      assignedDoc: "Dr. Mitchell",
      room: "Lab 2",
      status: "Results Ready",
      isUnread: true,
    },
    {
      id: "PT-8839",
      name: "Arthur Bradley",
      age: 63,
      gender: "Male",
      category: "Discharges",
      priority: "Discharge Ready",
      urgency: "emerald" as const,
      chiefComplaint: "Post-op coronary bypass rehabilitation complete, discharge summary signed",
      vitals: { hr: "68 bpm", bp: "120/78", spo2: "99%" },
      time: "20 min ago",
      assignedDoc: "Dr. Mitchell",
      room: "Room 204",
      status: "Medications Prescribed & Sent",
      isUnread: false,
    },
    {
      id: "PT-8840",
      name: "Elena Rostova",
      age: 48,
      gender: "Female",
      category: "Discharges",
      priority: "Care Plan Final",
      urgency: "emerald" as const,
      chiefComplaint: "Pneumonia recovery clearance, outpatient follow-up scheduled",
      vitals: { hr: "72 bpm", bp: "118/76", spo2: "98%" },
      time: "35 min ago",
      assignedDoc: "Dr. Al-Mansoor",
      room: "Room 110",
      status: "Transport Arranged",
      isUnread: false,
    },
  ],
}

export function AppSidebar({
  selectedPatientId,
  onSelectPatient,
  activeCategory = "Triage Queue",
  onSelectCategory,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  selectedPatientId?: string
  onSelectPatient?: (id: string) => void
  activeCategory?: string
  onSelectCategory?: (category: string) => void
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showUnreadsOnly, setShowUnreadsOnly] = React.useState(false)
  const { setOpen } = useSidebar()

  const filteredPatients = React.useMemo(() => {
    return clinicalData.patients.filter((patient) => {
      if (activeCategory && activeCategory !== "All Streams" && patient.category !== activeCategory) {
        return false
      }
      if (showUnreadsOnly && !patient.isUnread) return false
      if (searchTerm) {
        const query = searchTerm.toLowerCase()
        return (
          patient.name.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query) ||
          patient.chiefComplaint.toLowerCase().includes(query) ||
          patient.status.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [activeCategory, showUnreadsOnly, searchTerm])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r border-slate-200 *:data-[sidebar=sidebar]:flex-row bg-white"
      {...props}
    >
      {/* Icon Rail */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)] min-w-[calc(var(--sidebar-width-icon)+1px)] shrink-0 border-r border-slate-200 bg-white"
      >
        <SidebarHeader className="p-2 border-b border-slate-100 flex items-center justify-center">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-10 md:w-10 p-0 justify-center">
                <a href="#" className="flex items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors">
                  <HeartPulse className="size-5" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="py-3">
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu className="gap-1.5">
                {clinicalData.navMain.map((item) => {
                  const isActive = activeCategory === item.title
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: `${item.title} (${item.badge})`,
                          hidden: false,
                        }}
                        onClick={() => {
                          onSelectCategory?.(item.title)
                          setOpen(true)
                        }}
                        isActive={isActive}
                        className={`size-10 rounded-xl justify-center transition-all ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 font-semibold shadow-xs"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <item.icon className="size-5" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-slate-100">
          <NavUser user={clinicalData.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Secondary Triage Stream Pane */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex overflow-hidden bg-slate-50/50">
        <SidebarHeader className="gap-3 border-b border-slate-200 bg-white p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">{activeCategory}</h2>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                {filteredPatients.length}
              </span>
            </div>
            <Label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <span>Unread</span>
              <Switch
                checked={showUnreadsOnly}
                onCheckedChange={setShowUnreadsOnly}
                className="scale-90"
              />
            </Label>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
            <SidebarInput
              placeholder="Search patient, ID, triage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg bg-white"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto p-2">
          <SidebarGroup className="p-0">
            <SidebarGroupContent className="space-y-1.5">
              {filteredPatients.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No matching patients in {activeCategory}
                </div>
              ) : (
                filteredPatients.map((patient) => {
                  const isSelected = selectedPatientId === patient.id
                  return (
                    <button
                      type="button"
                      key={patient.id}
                      onClick={() => onSelectPatient?.(patient.id)}
                      className={`w-full text-left flex flex-col items-start gap-1.5 rounded-xl border p-3 text-xs leading-tight transition-all cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/70 shadow-xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-xs"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span>{patient.name}</span>
                          {patient.isUnread && (
                            <span className="size-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-slate-500">{patient.time}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-500">{patient.id} • {patient.age}y</span>
                        <Badge variant={patient.urgency} className="text-[10px] py-0 px-1.5 h-4">
                          {patient.priority}
                        </Badge>
                      </div>

                      <p className="line-clamp-2 text-[11px] text-slate-600 font-normal mt-0.5">
                        {patient.chiefComplaint}
                      </p>

                      <div className="w-full mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="text-emerald-700 font-medium">{patient.room}</span>
                        <span className="text-slate-600">{patient.status}</span>
                      </div>
                    </button>
                  )
                })
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
export { clinicalData }

