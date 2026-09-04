import RoleLayout from "@/components/layout/role-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/dashboard-cards";
import { StatusBadge } from "@/components/ui/status-badge";
import { FileText, Check, X, Filter } from "lucide-react";

const LEAVE_REQUESTS = [
  { id: "LR-001", studentName: "Alice Chen", studentId: "STU-1024", type: "Medical", date: "2024-09-10", days: 2, status: "pending", role: "student" },
  { id: "LR-002", studentName: "Dr. Rajesh Kumar", studentId: "FAC-042", type: "Conference", date: "2024-09-12", days: 1, status: "pending", role: "faculty" },
  { id: "LR-003", studentName: "Bob Smith", studentId: "STU-2087", type: "Personal", date: "2024-09-15", days: 3, status: "approved", role: "student" },
  { id: "LR-004", studentName: "Prof. Maria Garcia", studentId: "FAC-018", type: "Medical", date: "2024-09-16", days: 1, status: "rejected", role: "faculty" },
  { id: "LR-005", studentName: "Carol Wilson", studentId: "STU-3141", type: "Emergency", date: "2024-09-18", days: 1, status: "pending", role: "student" },
];

export default function AdminLeavePage() {
  return (
    <RoleLayout allowedRoles={["admin"]} role="admin">
      <PageHeader
        title="Leave Management"
        description="View, approve, or reject leave requests from students and faculty."
      />

      <div className="mb-4 flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground-muted hover:bg-surface-muted">
          <Filter className="h-4 w-4" />
          All Statuses
        </button>
      </div>

      <div className="space-y-3">
        {LEAVE_REQUESTS.map((req) => (
          <div key={req.id} className="flex items-center justify-between rounded-md border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">{req.studentName}</p>
                <p className="text-sm text-foreground-muted">
                  {req.studentId} • {req.role} • {req.type} leave
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground-muted">
                {req.date} • {req.days} day{req.days > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={req.status} />
              {req.status === "pending" && (
                <div className="flex gap-1">
                  <button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Approved This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Total This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">28</div>
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
}
