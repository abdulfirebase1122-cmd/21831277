"use client"

import * as React from "react"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bed,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  FlaskConical,
  Heart,
  HeartPulse,
  Info,
  Layers,
  MessageSquare,
  MoreHorizontal,
  PhoneCall,
  Pill,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Thermometer,
  TrendingUp,
  User,
  UserCheck,
  UserPlus,
  Users,
  Video,
  X,
} from "lucide-react"

import { AppSidebar, clinicalData } from "@/components/layout/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Patient record interface
interface PatientRecord {
  id: string
  name: string
  age: number
  gender: string
  category: string
  priority: string
  urgency: "urgent" | "warning" | "secondary" | "slate" | "blue" | "emerald"
  chiefComplaint: string
  vitals: {
    hr: string
    bp: string
    spo2: string
    temp?: string
    resp?: string
  }
  time: string
  assignedDoc: string
  room: string
  status: string
  allergies?: string[]
  notes?: string
  labOrders?: string[]
}

const initialPatients: PatientRecord[] = [
  {
    id: "PT-8831",
    name: "Eleanor Vance",
    age: 42,
    gender: "Female",
    category: "Triage Queue",
    priority: "High Priority",
    urgency: "urgent",
    chiefComplaint: "Acute chest tightness & shortness of breath upon exertion. Radiating left arm discomfort for 45 mins.",
    vitals: { hr: "104 bpm", bp: "148/92", spo2: "94%", temp: "37.1°C", resp: "22/min" },
    time: "8 min ago",
    assignedDoc: "Dr. Sarah Mitchell",
    room: "Trauma Bay 2",
    status: "Awaiting 12-Lead ECG",
    allergies: ["Penicillin", "NSAIDs"],
    notes: "Patient administered Aspirin 324mg and SL Nitroglycerin x1 with mild relief. Serial Troponin-I and CXR ordered.",
    labOrders: ["Stat Troponin I", "12-Lead ECG", "Portable CXR", "CBC + CMP"],
  },
  {
    id: "PT-8832",
    name: "Marcus Aurelius Vance",
    age: 67,
    gender: "Male",
    category: "Triage Queue",
    priority: "Critical",
    urgency: "urgent",
    chiefComplaint: "Sudden onset speech slurring and mild right hemiparesis. Symptoms started 40 mins prior to arrival.",
    vitals: { hr: "88 bpm", bp: "162/98", spo2: "97%", temp: "36.8°C", resp: "18/min" },
    time: "14 min ago",
    assignedDoc: "Dr. Sarah Mitchell",
    room: "Trauma Bay A",
    status: "Code Stroke Protocol",
    allergies: ["Sulfa drugs"],
    notes: "Non-contrast Head CT in progress. NIH Stroke Scale evaluated at 6. Stroke team bedside.",
    labOrders: ["Stat Head CT", "Coagulation Panel", "Blood Glucose (118 mg/dL)"],
  },
  {
    id: "PT-8833",
    name: "Sophia Chen",
    age: 29,
    gender: "Female",
    category: "Triage Queue",
    priority: "Moderate",
    urgency: "warning",
    chiefComplaint: "Right lower quadrant abdominal pain, rebound tenderness, febrile, nausea without vomiting.",
    vitals: { hr: "96 bpm", bp: "118/76", spo2: "99%", temp: "38.6°C", resp: "16/min" },
    time: "25 min ago",
    assignedDoc: "Dr. Tariq Al-Mansoor",
    room: "Room 105",
    status: "Abdominal Ultrasound Pending",
    allergies: ["No Known Allergies (NKDA)"],
    notes: "IV fluids initiated (Normal Saline 1000mL). Acetaminophen 1000mg IV administered for fever control.",
    labOrders: ["Stat Pelvic & RUQ Ultrasound", "CBC with Diff", "Urinalysis + hCG"],
  },
  {
    id: "PT-8834",
    name: "James Thornton",
    age: 55,
    gender: "Male",
    category: "Triage Queue",
    priority: "Routine",
    urgency: "secondary",
    chiefComplaint: "Post-op left knee arthroscopy wound check. Mild localized erythema along incision lines.",
    vitals: { hr: "72 bpm", bp: "124/82", spo2: "98%", temp: "36.9°C", resp: "14/min" },
    time: "42 min ago",
    assignedDoc: "Nurse Practitioner Diaz",
    room: "Minor Care 3",
    status: "Triage Assessment Complete",
    allergies: ["Latex"],
    notes: "No purulent discharge or systemic fever. Wound cleansed and redressed with sterile non-adherent dressing.",
    labOrders: ["Wound Culture Swab"],
  },
  {
    id: "PT-8835",
    name: "David Kim",
    age: 34,
    gender: "Male",
    category: "Consultations",
    priority: "Telehealth",
    urgency: "blue",
    chiefComplaint: "Hypertension medication titration review and lifestyle modification assessment.",
    vitals: { hr: "68 bpm", bp: "130/84", spo2: "99%", temp: "36.6°C", resp: "15/min" },
    time: "10:30 AM",
    assignedDoc: "Dr. Sarah Mitchell",
    room: "Virtual Room 02",
    status: "Patient in Waiting Room",
    allergies: ["NKDA"],
    notes: "Home BP log shows morning averages of 132/84 mmHg. Amlodipine 5mg tolerated well.",
    labOrders: ["Annual Lipid Panel", "Basic Metabolic Panel"],
  },
  {
    id: "PT-8836",
    name: "Maria Santos",
    age: 51,
    gender: "Female",
    category: "Consultations",
    priority: "Follow-up",
    urgency: "secondary",
    chiefComplaint: "Type 2 Diabetes quarterly management and HbA1c review.",
    vitals: { hr: "74 bpm", bp: "122/78", spo2: "98%", temp: "36.7°C", resp: "14/min" },
    time: "11:15 AM",
    assignedDoc: "Dr. Sarah Mitchell",
    room: "Clinical Suite 4",
    status: "Checked In at Front Desk",
    allergies: ["Codeine"],
    notes: "HbA1c decreased from 7.1% to 6.4% over 3 months with Metformin and dietary compliance.",
    labOrders: ["HbA1c Lab Complete", "eGFR Normal"],
  },
  {
    id: "PT-8837",
    name: "Robert Patterson",
    age: 73,
    gender: "Male",
    category: "Inpatient Ward",
    priority: "Post-Op Day 2",
    urgency: "slate",
    chiefComplaint: "Total knee arthroplasty inpatient recovery, pain management titration.",
    vitals: { hr: "76 bpm", bp: "128/80", spo2: "97%", temp: "37.0°C", resp: "16/min" },
    time: "Ward 4B",
    assignedDoc: "Dr. Eric Reynolds",
    room: "Bed 412",
    status: "Physical Therapy Active",
    allergies: ["NKDA"],
    notes: "Ambulated 40 feet with rolling walker. Pain controlled at 3/10 on Oral Oxycodone 5mg PRN.",
    labOrders: ["Post-op Hemoglobin (11.8 g/dL)", "DVT Prophylaxis Active"],
  },
  {
    id: "PT-8838",
    name: "Hannah Lindqvist",
    age: 26,
    gender: "Female",
    category: "Lab Results",
    priority: "Stat Lab",
    urgency: "warning",
    chiefComplaint: "Palpitations and dizziness. Electrolyte panel and serial 12-lead ECG monitoring.",
    vitals: { hr: "80 bpm", bp: "116/74", spo2: "100%", temp: "36.8°C", resp: "14/min" },
    time: "15 min ago",
    assignedDoc: "Dr. Sarah Mitchell",
    room: "Observation Bed 3",
    status: "Lab Findings Available",
    allergies: ["NKDA"],
    notes: "Potassium mildly low at 3.3 mmol/L. Oral KCl 20mEq administered with orange juice.",
    labOrders: ["Serum Potassium (3.3 - Low)", "Magnesium (2.1 - Normal)", "Troponin (Negative)"],
  },
]

export default function HealthcareDashboard() {
  const [patients, setPatients] = React.useState<PatientRecord[]>(initialPatients)
  const [selectedPatientId, setSelectedPatientId] = React.useState<string>("PT-8831")
  const [filterPriority, setFilterPriority] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [isIntakeModalOpen, setIsIntakeModalOpen] = React.useState<boolean>(false)
  const [notificationCount, setNotificationCount] = React.useState<number>(3)
  const [isLiveSyncing, setIsLiveSyncing] = React.useState<boolean>(false)
  const [lastSyncTime, setLastSyncTime] = React.useState<string>("Just now")

  // Intake Form State
  const [newPatientName, setNewPatientName] = React.useState("")
  const [newPatientAge, setNewPatientAge] = React.useState("45")
  const [newPatientGender, setNewPatientGender] = React.useState("Female")
  const [newPatientComplaint, setNewPatientComplaint] = React.useState("")
  const [newPatientUrgency, setNewPatientUrgency] = React.useState<"urgent" | "warning" | "secondary">("urgent")
  const [newPatientRoom, setNewPatientRoom] = React.useState("Room 108")
  const [newPatientDoc, setNewPatientDoc] = React.useState("Dr. Sarah Mitchell")

  const selectedPatient = React.useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0]
  }, [patients, selectedPatientId])

  const filteredPatients = React.useMemo(() => {
    return patients.filter((patient) => {
      if (filterPriority === "urgent" && patient.urgency !== "urgent") return false
      if (filterPriority === "warning" && patient.urgency !== "warning") return false
      if (filterPriority === "routine" && patient.urgency !== "secondary" && patient.urgency !== "slate" && patient.urgency !== "blue") return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          patient.name.toLowerCase().includes(q) ||
          patient.id.toLowerCase().includes(q) ||
          patient.chiefComplaint.toLowerCase().includes(q) ||
          patient.room.toLowerCase().includes(q) ||
          patient.assignedDoc.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [patients, filterPriority, searchQuery])

  // Count active urgent
  const urgentCount = patients.filter((p) => p.urgency === "urgent").length

  const handleSyncRefresh = () => {
    setIsLiveSyncing(true)
    setTimeout(() => {
      setIsLiveSyncing(false)
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 600)
  }

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatientName.trim() || !newPatientComplaint.trim()) return

    const newId = `PT-${Math.floor(8840 + Math.random() * 90)}`
    const priorityLabel = newPatientUrgency === "urgent" ? "High Priority" : newPatientUrgency === "warning" ? "Moderate" : "Routine"

    const createdRecord: PatientRecord = {
      id: newId,
      name: newPatientName.trim(),
      age: parseInt(newPatientAge, 10) || 30,
      gender: newPatientGender,
      category: "Triage Queue",
      priority: priorityLabel,
      urgency: newPatientUrgency,
      chiefComplaint: newPatientComplaint.trim(),
      vitals: {
        hr: "84 bpm",
        bp: "126/80",
        spo2: "98%",
        temp: "37.0°C",
        resp: "16/min",
      },
      time: "Just now",
      assignedDoc: newPatientDoc,
      room: newPatientRoom,
      status: "Initial Triage Completed",
      allergies: ["NKDA"],
      notes: "Newly admitted via clinical intake form. Triage protocol active.",
      labOrders: ["Baseline CBC", "Stat Vitals Evaluation"],
    }

    setPatients([createdRecord, ...patients])
    setSelectedPatientId(newId)
    setIsIntakeModalOpen(false)

    // Reset Form
    setNewPatientName("")
    setNewPatientComplaint("")
  }

  const handleUpdateStatus = (patientId: string, newStatus: string) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status: newStatus } : p))
    )
  }

  const handleDischargePatient = (patientId: string) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, status: "Discharged & Care Plan Finalized", urgency: "emerald" }
          : p
      )
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "340px",
          "--sidebar-width-icon": "56px",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        selectedPatientId={selectedPatientId}
        onSelectPatient={(id) => setSelectedPatientId(id)}
      />

      <SidebarInset className="bg-slate-50/50 min-h-screen flex flex-col">
        {/* ======================================================== */}
        {/* 1. TOP NAVIGATION BAR (NAVBAR)                           */}
        {/* ======================================================== */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg p-1.5 transition-colors" />
            <Separator orientation="vertical" className="h-5 bg-slate-200" />
            
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs">
                <Stethoscope className="size-4" />
              </div>
              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-slate-500 hover:text-slate-900 text-xs font-medium">
                      HealthPulse Clinical System
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-slate-300" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-900 font-semibold text-xs">
                      Emergency & Triage Operations
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Right Action Center */}
          <div className="flex items-center gap-2.5">
            {/* Live EHR Sync Indicator */}
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/80">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
              </span>
              <span>EHR Sync: Active</span>
              <button
                type="button"
                onClick={handleSyncRefresh}
                title="Refresh Live Triage Data"
                className="ml-1 text-emerald-700 hover:text-emerald-900 transition-transform active:rotate-180"
              >
                <RefreshCw className={`size-3 ${isLiveSyncing ? "animate-spin text-emerald-600" : ""}`} />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative hidden md:block w-52 lg:w-64">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
              <Input
                placeholder="Search patient, MRN, diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs h-9 bg-slate-50/70 border-slate-300 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
              />
            </div>

            {/* Notifications Button */}
            <button
              type="button"
              onClick={() => setNotificationCount(0)}
              className="relative flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-colors"
              title="Clinical Alerts"
            >
              <Bell className="size-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: New Patient Intake */}
            <Button
              onClick={() => setIsIntakeModalOpen(true)}
              className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 font-semibold text-xs h-9 px-3.5 shadow-sm rounded-lg"
            >
              <Plus className="size-4 mr-1" />
              New Patient Intake
            </Button>
          </div>
        </header>

        {/* ======================================================== */}
        {/* DASHBOARD CONTENT BODY                                    */}
        {/* ======================================================== */}
        <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* ======================================================== */}
          {/* 2. HERO & BANNER CALLOUT SECTION (Light mint tint)        */}
          {/* ======================================================== */}
          <div className="relative overflow-hidden rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-xs transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                  <Activity className="size-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                      Clinical Triage Center • Level 1 Emergency Active
                    </h1>
                    <Badge variant="urgent" className="text-[11px] py-0.5">
                      {urgentCount} High Priority Cases
                    </Badge>
                    <span className="text-xs text-slate-500 font-medium">
                      Updated {lastSyncTime}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    Rapid physician intake in progress with 4 active clinical bays. Dr. Sarah Mitchell on-duty with full trauma and telemetry staff standby.
                  </p>
                </div>
              </div>

              {/* Action Callouts */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterPriority(filterPriority === "urgent" ? "all" : "urgent")}
                  className={`text-xs border-slate-200 ${
                    filterPriority === "urgent"
                      ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <AlertTriangle className="size-3.5 mr-1.5 text-amber-600" />
                  Filter Urgent Cases ({urgentCount})
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedPatientId("PT-8838")
                  }}
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs font-semibold"
                >
                  <FlaskConical className="size-3.5 mr-1.5 text-emerald-700" />
                  Review Stat Labs (3)
                </Button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. HEALTHCARE PERFORMANCE METRIC CARDS                    */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Patients */}
            <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Patients Today
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Users className="size-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">48</span>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
                    <ArrowUpRight className="size-3" />
                    +12.4%
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  38 Outpatient • 10 Inpatient Admissions
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Average Triage Wait */}
            <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Avg Triage Wait Time
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Clock className="size-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">14.2 min</span>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
                    <ArrowDownRight className="size-3" />
                    -4.8 min
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Target: &lt; 20 mins (94% adherence)
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Bed Occupancy */}
            <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Bed Occupancy Rate
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Bed className="size-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">82.3%</span>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
                    28 / 34 Active
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "82.3%" }} />
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Stat Lab Turnaround */}
            <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Stat Lab Turnaround
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FlaskConical className="size-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">21.8 min</span>
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/80">
                    3 Pending
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Troponin, CT Scan & Electrolyte labs ready
                </p>
              </CardContent>
            </Card>

          </div>

          {/* ======================================================== */}
          {/* 4. PRIMARY WORKSPACE: PATIENT TRIAGE & DETAIL MANAGER     */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 7 COLS: PATIENT QUEUE TABLE & FILTER CONTROLS */}
            <div className="lg:col-span-7 space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Live Triage & Patient Roster
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 mt-0.5">
                      Select a patient to inspect clinical vitals, order stat labs, or manage status.
                    </CardDescription>
                  </div>

                  {/* Priority Filter Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    {[
                      { key: "all", label: "All Cases" },
                      { key: "urgent", label: "Urgent" },
                      { key: "warning", label: "Moderate" },
                      { key: "routine", label: "Routine" },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.key}
                        onClick={() => setFilterPriority(tab.key)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                          filterPriority === tab.key
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold">
                        <th className="py-2.5 px-4">Patient / MRN</th>
                        <th className="py-2.5 px-3">Triage Priority</th>
                        <th className="py-2.5 px-3">Vitals</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3">Assigned Provider</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredPatients.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No patients found matching the selected filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredPatients.map((patient) => {
                          const isSelected = selectedPatient.id === patient.id
                          return (
                            <tr
                              key={patient.id}
                              onClick={() => setSelectedPatientId(patient.id)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-emerald-50/60 font-medium"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900">{patient.name}</div>
                                <div className="text-[11px] text-slate-500">
                                  {patient.id} • {patient.age}y {patient.gender.charAt(0)}
                                </div>
                              </td>

                              <td className="py-3 px-3">
                                <Badge variant={patient.urgency} className="text-[10px] py-0 px-2 h-4">
                                  {patient.priority}
                                </Badge>
                              </td>

                              <td className="py-3 px-3">
                                <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                                  <Heart className="size-3 text-emerald-600" />
                                  <span>{patient.vitals.hr}</span>
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  BP {patient.vitals.bp} • {patient.vitals.spo2}
                                </div>
                              </td>

                              <td className="py-3 px-3">
                                <div className="font-semibold text-emerald-700">{patient.room}</div>
                                <div className="text-[10px] text-slate-500">{patient.time}</div>
                              </td>

                              <td className="py-3 px-3">
                                <div className="text-slate-800 font-medium">{patient.assignedDoc}</div>
                                <div className="text-[10px] text-slate-500">{patient.status}</div>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedPatientId(patient.id)
                                  }}
                                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-7 px-2"
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </CardContent>

                <CardFooter className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Showing {filteredPatients.length} active triage records</span>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span>Real-time Clinical Socket Active</span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* RIGHT 5 COLS: SELECTED PATIENT DETAILED CLINICAL CARD */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardHeader className="p-5 bg-slate-50/70 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedPatient.urgency}>
                          {selectedPatient.priority}
                        </Badge>
                        <span className="text-xs font-semibold text-slate-500">{selectedPatient.id}</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mt-1">
                        {selectedPatient.name}
                      </h2>
                      <p className="text-xs text-slate-600">
                        {selectedPatient.age} Years • {selectedPatient.gender} • {selectedPatient.room}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedPatient.id, "Physician Review In Progress")}
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold h-8"
                      >
                        <CheckCircle2 className="size-3.5 mr-1 text-emerald-600" />
                        Triage
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-5">
                  
                  {/* Vital Signs Grid */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                      <HeartPulse className="size-3.5 text-emerald-600" />
                      Recorded Vital Signs
                    </h3>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="rounded-lg bg-emerald-50/60 p-2.5 border border-emerald-100">
                        <div className="text-[11px] font-medium text-emerald-800">Heart Rate</div>
                        <div className="text-base font-bold text-slate-900">{selectedPatient.vitals.hr}</div>
                        <div className="text-[10px] text-emerald-700">Sinus rhythm</div>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
                        <div className="text-[11px] font-medium text-slate-600">Blood Pressure</div>
                        <div className="text-base font-bold text-slate-900">{selectedPatient.vitals.bp}</div>
                        <div className="text-[10px] text-slate-500">mmHg</div>
                      </div>

                      <div className="rounded-lg bg-emerald-50/60 p-2.5 border border-emerald-100">
                        <div className="text-[11px] font-medium text-emerald-800">Oxygen (SpO2)</div>
                        <div className="text-base font-bold text-slate-900">{selectedPatient.vitals.spo2}</div>
                        <div className="text-[10px] text-emerald-700">Room Air</div>
                      </div>
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Chief Complaint & Triage Presentation
                    </h3>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                      {selectedPatient.chiefComplaint}
                    </p>
                  </div>

                  {/* Allergies & Safety Warnings */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                      <AlertCircle className="size-3.5 text-rose-600" />
                      Allergies & Clinical Precautions
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                        selectedPatient.allergies.map((allergy, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200/80"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">No allergies recorded</span>
                      )}
                    </div>
                  </div>

                  {/* Active Orders & Stat Labs */}
                  {selectedPatient.labOrders && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                        <FlaskConical className="size-3.5 text-emerald-600" />
                        Diagnostic Orders & Labs
                      </h3>
                      <ul className="space-y-1.5 text-xs">
                        {selectedPatient.labOrders.map((order, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 border border-slate-200"
                          >
                            <span className="font-medium text-slate-800">{order}</span>
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                              Active Order
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Physician Notes */}
                  {selectedPatient.notes && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                        <FileText className="size-3.5 text-slate-500" />
                        Attending Physician Clinical Notes
                      </h3>
                      <p className="text-xs text-slate-600 italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-200">
                        "{selectedPatient.notes}"
                      </p>
                    </div>
                  )}

                </CardContent>

                {/* Patient Action Footer */}
                <CardFooter className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Status: <span className="text-emerald-700">{selectedPatient.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedPatient.id, "Stat CT / Ultrasound Ordered")}
                      className="border-slate-300 text-xs h-8 text-slate-700 hover:bg-slate-100"
                    >
                      <FlaskConical className="size-3.5 mr-1 text-emerald-600" />
                      Order Labs
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDischargePatient(selectedPatient.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-8"
                    >
                      <ClipboardCheck className="size-3.5 mr-1" />
                      Finalize Triage
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

          </div>

          {/* ======================================================== */}
          {/* 5. SECONDARY WIDGETS: SCHEDULE & CLINICAL CARE TEAM       */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Consultation Schedule */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-4 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="size-4 text-emerald-600" />
                    Consultation Schedule
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Today's appointments & Telehealth
                  </CardDescription>
                </div>
                <Badge variant="emerald" className="text-[10px]">4 Today</Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { time: "10:30 AM", name: "David Kim", type: "Telehealth Video", status: "Ready", icon: Video },
                  { time: "11:15 AM", name: "Maria Santos", type: "Clinical Suite 4", status: "Checked In", icon: Stethoscope },
                  { time: "01:00 PM", name: "Arthur Bradley", type: "Post-Op Wound Review", status: "Upcoming", icon: Stethoscope },
                  { time: "02:30 PM", name: "Elena Rostova", type: "Cardiology Follow-up", status: "Upcoming", icon: Video },
                ].map((apt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                        <apt.icon className="size-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{apt.name}</div>
                        <div className="text-[11px] text-slate-500">{apt.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-800 block">{apt.time}</span>
                      <span className="inline-block text-[10px] text-emerald-700 font-medium">{apt.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stat Diagnostic Reports */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-4 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FlaskConical className="size-4 text-emerald-600" />
                    Stat Diagnostic Feed
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Real-time lab result alerts
                  </CardDescription>
                </div>
                <Badge variant="warning" className="text-[10px]">3 New</Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { title: "Troponin I Serial Panel", patient: "Eleanor Vance (Bay 2)", status: "Completed (0.04 ng/mL)", time: "6m ago", normal: true },
                  { title: "Head Non-Contrast CT", patient: "Marcus Vance (Bay A)", status: "Ready for Radiology Review", time: "12m ago", normal: false },
                  { title: "Serum Electrolytes (K+)", patient: "Hannah Lindqvist (Obs 3)", status: "Low: 3.3 mmol/L", time: "18m ago", normal: false },
                ].map((lab, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{lab.title}</span>
                      <span className="text-[10px] text-slate-500">{lab.time}</span>
                    </div>
                    <div className="text-[11px] text-slate-600">{lab.patient}</div>
                    <div className={`text-[11px] font-semibold ${lab.normal ? "text-emerald-700" : "text-amber-700"}`}>
                      {lab.status}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* On-Duty Care Team Roster */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-4 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="size-4 text-emerald-600" />
                    On-Duty Care Team
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Emergency Shift Staff
                  </CardDescription>
                </div>
                <span className="size-2 rounded-full bg-emerald-500" />
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { name: "Dr. Sarah Mitchell", role: "Attending Physician", dept: "Emergency & Triage", status: "On Duty", badgeVariant: "emerald" as const },
                  { name: "Dr. Tariq Al-Mansoor", role: "General Surgeon", dept: "Trauma Surgical", status: "In OR 3", badgeVariant: "warning" as const },
                  { name: "Nurse Practitioner Diaz", role: "Lead Triage NP", dept: "Fast Track Care", status: "On Duty", badgeVariant: "emerald" as const },
                  { name: "Dr. Eric Reynolds", role: "Orthopedic Specialist", dept: "Ward 4B Rounds", status: "Rounding", badgeVariant: "slate" as const },
                ].map((staff, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-[10px]">
                        {staff.name.split(" ").slice(-1)[0].substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{staff.name}</div>
                        <div className="text-[10px] text-slate-500">{staff.role} • {staff.dept}</div>
                      </div>
                    </div>
                    <Badge variant={staff.badgeVariant} className="text-[10px] py-0 px-2 h-4">
                      {staff.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* ======================================================== */}
          {/* 6. CLEAN FOOTER WITH EHR STATUS & SYSTEM LINKS           */}
          {/* ======================================================== */}
          <footer className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-slate-700">HealthPulse Clinical System v3.8</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                HIPAA & SOC-2 Type II Certified
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>FHIR R4 Server Connected</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Clinical Guidelines
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Pharmacy Formulary
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                Emergency Contact (x8899)
              </a>
            </div>
          </footer>

        </main>
      </SidebarInset>

      {/* ======================================================== */}
      {/* 7. NEW PATIENT INTAKE MODAL                              */}
      {/* ======================================================== */}
      {isIntakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in-0">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <UserPlus className="size-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">New Clinical Patient Intake</h3>
                  <p className="text-xs text-slate-500">Register new patient directly into Triage Stream</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsIntakeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Patient Full Name *</Label>
                  <Input
                    required
                    placeholder="e.g. Jonathan Doe"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Age</Label>
                    <Input
                      type="number"
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(e.target.value)}
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Gender</Label>
                    <select
                      value={newPatientGender}
                      onChange={(e) => setNewPatientGender(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-300 bg-white px-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700">Chief Complaint & Symptoms *</Label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe onset, pain scale, vitals notes, or acute trauma..."
                  value={newPatientComplaint}
                  onChange={(e) => setNewPatientComplaint(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Urgency Level</Label>
                  <select
                    value={newPatientUrgency}
                    onChange={(e) => setNewPatientUrgency(e.target.value as any)}
                    className="w-full h-9 rounded-lg border border-slate-300 bg-white px-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                  >
                    <option value="urgent">High Priority (Urgent)</option>
                    <option value="warning">Moderate</option>
                    <option value="secondary">Routine</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Assign Room/Bay</Label>
                  <Input
                    value={newPatientRoom}
                    onChange={(e) => setNewPatientRoom(e.target.value)}
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Attending Physician</Label>
                  <select
                    value={newPatientDoc}
                    onChange={(e) => setNewPatientDoc(e.target.value)}
                    className="w-full h-9 rounded-lg border border-slate-300 bg-white px-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                    <option value="Dr. Tariq Al-Mansoor">Dr. Tariq Al-Mansoor</option>
                    <option value="Nurse Diaz">Nurse Diaz</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsIntakeModalOpen(false)}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                >
                  <CheckCircle2 className="size-4 mr-1" />
                  Admit to Triage
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}
    </SidebarProvider>
  )
}
