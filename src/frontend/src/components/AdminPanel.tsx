import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BellIcon,
  BriefcaseIcon,
  DatabaseIcon,
  Loader2,
  LockIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Type } from "../backend.d";
import type { Alert, Job } from "../hooks/useQueries";
import {
  useAddAlert,
  useAddJob,
  useAddSampleData,
  useDeleteAlert,
  useDeleteJob,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "admin123";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  alerts: Alert[];
}

export default function AdminPanel({
  isOpen,
  onClose,
  jobs,
  alerts,
}: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Job form
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("");
  const [jobCategory, setJobCategory] = useState<Type>(Type.centralGovt);
  const [jobVacancies, setJobVacancies] = useState("");
  const [jobLastDate, setJobLastDate] = useState("");
  const [jobQualification, setJobQualification] = useState("");
  const [jobApplyLink, setJobApplyLink] = useState("");
  const [jobPostedDate, setJobPostedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Alert form
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertDate, setAlertDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const addJobMut = useAddJob();
  const deleteJobMut = useDeleteJob();
  const addAlertMut = useAddAlert();
  const deleteAlertMut = useDeleteAlert();
  const addSampleMut = useAddSampleData();

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  }

  function handleClose() {
    setAuthenticated(false);
    setPasswordInput("");
    setPasswordError("");
    onClose();
  }

  async function handleAddJob() {
    if (
      !jobTitle ||
      !jobDept ||
      !jobVacancies ||
      !jobLastDate ||
      !jobQualification
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await addJobMut.mutateAsync({
        password: ADMIN_PASSWORD,
        title: jobTitle,
        department: jobDept,
        category: jobCategory,
        vacancies: BigInt(Number.parseInt(jobVacancies, 10)),
        lastDate: jobLastDate,
        qualification: jobQualification,
        applyLink: jobApplyLink || "#",
        postedDate: jobPostedDate,
      });
      toast.success("Job added successfully!");
      setJobTitle("");
      setJobDept("");
      setJobVacancies("");
      setJobLastDate("");
      setJobQualification("");
      setJobApplyLink("");
    } catch (e) {
      toast.error(
        `Failed to add job: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  async function handleDeleteJob(id: bigint, idx: number) {
    try {
      await deleteJobMut.mutateAsync({ password: ADMIN_PASSWORD, id });
      toast.success("Job deleted");
    } catch (e) {
      toast.error(
        `Failed to delete job: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
    void idx;
  }

  async function handleAddAlert() {
    if (!alertTitle || !alertDescription) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await addAlertMut.mutateAsync({
        password: ADMIN_PASSWORD,
        title: alertTitle,
        description: alertDescription,
        date: alertDate,
      });
      toast.success("Alert added successfully!");
      setAlertTitle("");
      setAlertDescription("");
    } catch (e) {
      toast.error(
        `Failed to add alert: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  async function handleDeleteAlert(id: bigint, idx: number) {
    try {
      await deleteAlertMut.mutateAsync({ password: ADMIN_PASSWORD, id });
      toast.success("Alert deleted");
    } catch (e) {
      toast.error(
        `Failed to delete alert: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
    void idx;
  }

  async function handleSeedData() {
    try {
      await addSampleMut.mutateAsync();
      toast.success("Sample data loaded successfully!");
    } catch (e) {
      toast.error(
        `Failed to seed data: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-[oklch(0.22_0.08_255)]" />
            Admin Panel
          </DialogTitle>
        </DialogHeader>

        {!authenticated ? (
          <div className="py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[oklch(0.22_0.08_255/0.08)] flex items-center justify-center">
              <LockIcon className="w-8 h-8 text-[oklch(0.22_0.08_255)]" />
            </div>
            <p className="text-muted-foreground text-sm">
              Enter admin password to continue
            </p>
            <div className="w-full max-w-sm space-y-3">
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  data-ocid="admin.password.input"
                  className="mt-1"
                />
                {passwordError && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="admin.error_state"
                  >
                    {passwordError}
                  </p>
                )}
              </div>
              <Button
                onClick={handleLogin}
                data-ocid="admin.login.button"
                className="w-full bg-[oklch(0.22_0.08_255)] hover:bg-[oklch(0.28_0.1_255)] text-white"
              >
                Login
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="jobs">
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="jobs" className="flex items-center gap-1.5">
                <BriefcaseIcon className="w-3.5 h-3.5" /> Jobs
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1.5">
                <BellIcon className="w-3.5 h-3.5" /> Alerts
              </TabsTrigger>
              <TabsTrigger value="seed" className="flex items-center gap-1.5">
                <DatabaseIcon className="w-3.5 h-3.5" /> Seed Data
              </TabsTrigger>
            </TabsList>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6">
              {/* Add Job Form */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" /> Add New Job
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <Label>Job Title *</Label>
                      <Input
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Junior Engineer Civil"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Department *</Label>
                      <Input
                        value={jobDept}
                        onChange={(e) => setJobDept(e.target.value)}
                        placeholder="e.g. UPSC, SSC"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={jobCategory}
                        onValueChange={(v) => setJobCategory(v as Type)}
                      >
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="admin.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Type.centralGovt}>
                            Central Govt
                          </SelectItem>
                          <SelectItem value={Type.stateGovt}>
                            State Govt
                          </SelectItem>
                          <SelectItem value={Type.csc}>CSC</SelectItem>
                          <SelectItem value={Type.railway}>Railway</SelectItem>
                          <SelectItem value={Type.banking}>Banking</SelectItem>
                          <SelectItem value={Type.defence}>Defence</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Vacancies *</Label>
                      <Input
                        type="number"
                        value={jobVacancies}
                        onChange={(e) => setJobVacancies(e.target.value)}
                        placeholder="e.g. 150"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Last Date *</Label>
                      <Input
                        type="date"
                        value={jobLastDate}
                        onChange={(e) => setJobLastDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Posted Date</Label>
                      <Input
                        type="date"
                        value={jobPostedDate}
                        onChange={(e) => setJobPostedDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Apply Link</Label>
                      <Input
                        value={jobApplyLink}
                        onChange={(e) => setJobApplyLink(e.target.value)}
                        placeholder="https://..."
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Qualification *</Label>
                      <Textarea
                        value={jobQualification}
                        onChange={(e) => setJobQualification(e.target.value)}
                        placeholder="e.g. 10th Pass, Graduate, B.Tech"
                        className="mt-1"
                        rows={2}
                        data-ocid="admin.textarea"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddJob}
                    disabled={addJobMut.isPending}
                    data-ocid="admin.add_job.button"
                    className="bg-[oklch(0.22_0.08_255)] hover:bg-[oklch(0.28_0.1_255)] text-white"
                  >
                    {addJobMut.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <PlusIcon className="w-4 h-4 mr-2" />
                    )}
                    Add Job
                  </Button>
                </CardContent>
              </Card>

              {/* Jobs List */}
              <div>
                <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                  Existing Jobs ({jobs.length})
                </h4>
                {jobs.length === 0 ? (
                  <p
                    className="text-muted-foreground text-sm"
                    data-ocid="jobs.empty_state"
                  >
                    No jobs yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {jobs.map((job, idx) => (
                      <div
                        key={job.id.toString()}
                        className="flex items-center justify-between gap-3 bg-muted/40 rounded-lg px-3 py-2.5 border border-border"
                        data-ocid={`jobs.item.${idx + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job.department}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteJob(job.id, idx + 1)}
                          disabled={deleteJobMut.isPending}
                          data-ocid={`admin.delete_button.${idx + 1}`}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        >
                          {deleteJobMut.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <TrashIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" /> Add New Alert
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Alert Title *</Label>
                    <Input
                      value={alertTitle}
                      onChange={(e) => setAlertTitle(e.target.value)}
                      placeholder="e.g. CSC New Service Launch"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={alertDescription}
                      onChange={(e) => setAlertDescription(e.target.value)}
                      placeholder="Alert description..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={alertDate}
                      onChange={(e) => setAlertDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleAddAlert}
                    disabled={addAlertMut.isPending}
                    data-ocid="admin.add_alert.button"
                    className="bg-[oklch(0.5_0.16_155)] hover:bg-[oklch(0.45_0.18_155)] text-white"
                  >
                    {addAlertMut.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <PlusIcon className="w-4 h-4 mr-2" />
                    )}
                    Add Alert
                  </Button>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                  Existing Alerts ({alerts.length})
                </h4>
                {alerts.length === 0 ? (
                  <p
                    className="text-muted-foreground text-sm"
                    data-ocid="alerts.empty_state"
                  >
                    No alerts yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {alerts.map((alert, idx) => (
                      <div
                        key={alert.id.toString()}
                        className="flex items-center justify-between gap-3 bg-muted/40 rounded-lg px-3 py-2.5 border border-border"
                        data-ocid={`alerts.item.${idx + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {alert.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.date}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAlert(alert.id, idx + 1)}
                          disabled={deleteAlertMut.isPending}
                          data-ocid={`admin.delete_button.${idx + 1}`}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        >
                          {deleteAlertMut.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <TrashIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Seed Data Tab */}
            <TabsContent value="seed">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <DatabaseIcon className="w-4 h-4" /> Seed Sample Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Load sample government job listings and CSC alerts to
                    populate the portal with realistic data.
                  </p>
                  <Button
                    onClick={handleSeedData}
                    disabled={addSampleMut.isPending}
                    className="bg-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.68_0.2_55)] text-white"
                  >
                    {addSampleMut.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Loading Sample Data...
                      </>
                    ) : (
                      <>
                        <DatabaseIcon className="w-4 h-4 mr-2" />
                        Load Sample Data
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
