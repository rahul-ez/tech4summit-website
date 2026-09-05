import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

/**
 * Throwaway internal review page (context/build-plan.md Phase 1, task
 * "temporary internal preview route, removed before launch"). Renders every
 * shadcn primitive added in this pass across the states context/ui-tokens.md
 * defines, for visual review against its Button/Card/Inputs/Badges tables.
 * Hover/focus states are interactive — tab and hover through this page in a
 * browser rather than reading it statically. Not linked from any public nav.
 */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 py-8">
      <div>
        <h2 className="font-display text-xl font-semibold text-text-primary">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border-muted py-3 last:border-b-0">
      <span className="w-28 shrink-0 font-mono text-xs text-text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function DevComponentsPage() {
  return (
    <main className="mx-auto max-w-(--breakpoint-lg) px-4 py-12 sm:px-8">
      <header className="border-b border-border pb-6">
        <p className="font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
          Internal / not linked from public nav
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-text-primary">
          Component Review — /dev/components
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          Every primitive added in this pass, across default / hover / disabled /
          error states. Compare against context/ui-tokens.md&apos;s Button and Card
          tables. Delete this route before launch.
        </p>
      </header>

      <Section title="Button" description="Variants: primary, secondary, ghost, destructive.">
        <Row label="primary">
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </Row>
        <Row label="secondary">
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </Row>
        <Row label="ghost">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </Row>
        <Row label="destructive">
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive" disabled>
            Disabled
          </Button>
        </Row>
        <p className="pt-2 text-xs text-text-muted">
          Hover/focus states aren&apos;t screenshot-able here — hover each button
          or Tab to it to check `hover:`/`focus-ring` treatment live.
        </p>
      </Section>

      <Separator />

      <Section title="Input">
        <Row label="default">
          <Input placeholder="Team name" className="max-w-64" />
        </Row>
        <Row label="disabled">
          <Input placeholder="Team name" disabled className="max-w-64" />
        </Row>
        <Row label="error">
          <Input placeholder="Team name" aria-invalid className="max-w-64" />
        </Row>
      </Section>

      <Separator />

      <Section title="Textarea">
        <Row label="default">
          <Textarea placeholder="Tell us about your project" className="max-w-80" />
        </Row>
        <Row label="disabled">
          <Textarea placeholder="Tell us about your project" disabled className="max-w-80" />
        </Row>
        <Row label="error">
          <Textarea placeholder="Tell us about your project" aria-invalid className="max-w-80" />
        </Row>
      </Section>

      <Separator />

      <Section title="Select">
        <Row label="default">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Choose a track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="healthtech">HealthTech</SelectItem>
              <SelectItem value="edtech">EdTech</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Row label="disabled">
          <Select disabled>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Choose a track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fintech">FinTech</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Row label="error">
          <Select>
            <SelectTrigger className="w-48" aria-invalid>
              <SelectValue placeholder="Choose a track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fintech">FinTech</SelectItem>
            </SelectContent>
          </Select>
        </Row>
      </Section>

      <Separator />

      <Section title="Checkbox">
        <Row label="unchecked">
          <Checkbox aria-label="Unchecked" />
        </Row>
        <Row label="checked">
          <Checkbox defaultChecked aria-label="Checked" />
        </Row>
        <Row label="disabled">
          <Checkbox disabled aria-label="Disabled" />
          <Checkbox disabled defaultChecked aria-label="Disabled checked" />
        </Row>
        <Row label="error">
          <Checkbox aria-invalid aria-label="Invalid" />
        </Row>
      </Section>

      <Separator />

      <Section title="Radio">
        <Row label="default">
          <RadioGroup defaultValue="solo" className="flex flex-row gap-4">
            <span className="flex items-center gap-2">
              <RadioGroupItem value="solo" id="r-solo" />
              <label htmlFor="r-solo" className="text-sm text-text-primary">
                Solo
              </label>
            </span>
            <span className="flex items-center gap-2">
              <RadioGroupItem value="team" id="r-team" />
              <label htmlFor="r-team" className="text-sm text-text-primary">
                Team
              </label>
            </span>
          </RadioGroup>
        </Row>
        <Row label="disabled">
          <RadioGroup defaultValue="solo" disabled className="flex flex-row gap-4">
            <span className="flex items-center gap-2">
              <RadioGroupItem value="solo" id="r-solo-d" />
              <label htmlFor="r-solo-d" className="text-sm text-text-muted">
                Solo
              </label>
            </span>
          </RadioGroup>
        </Row>
      </Section>

      <Separator />

      <Section title="Badge" description="Default, Success, Warning, Error, Informational, Live/Event.">
        <Row label="variants">
          <Badge>Default</Badge>
          <Badge variant="success">Confirmed</Badge>
          <Badge variant="warning">Pending confirmation</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="info">Notice</Badge>
          <Badge variant="live">Registrations open</Badge>
        </Row>
      </Section>

      <Separator />

      <Section
        title="Spinner"
        description="Non-decorative in-progress indicator. Used standalone (text-muted) and inside Button's loading state (primary-foreground)."
      >
        <Row label="standalone">
          <Spinner className="text-text-muted" />
        </Row>
        <Row label="in a button">
          <Button variant="primary" loading>
            Submitting
          </Button>
        </Row>
      </Section>

      <Separator />

      <Section
        title="Separator"
        description="border-muted divider — used throughout this page between sections; both orientations shown here."
      >
        <Row label="horizontal">
          <div className="w-48">
            <Separator />
          </div>
        </Row>
        <Row label="vertical">
          <div className="flex h-8 items-center gap-3">
            <span className="text-sm text-text-secondary">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-text-secondary">Right</span>
          </div>
        </Row>
      </Section>

      <Separator />

      <Section
        title="Card"
        description="Standard, Interactive, Featured (1st place only), Informational, Status."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card variant="standard">
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>Default bounded content surface.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">surface-secondary, border, radius-lg.</p>
            </CardContent>
          </Card>

          <Card variant="interactive" tabIndex={0}>
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>Hover to see border-light.</CardDescription>
            </CardHeader>
          </Card>

          <Card variant="featured">
            <CardHeader>
              <CardTitle>Featured — 1st place</CardTitle>
              <CardDescription>primary border + glow-primary.</CardDescription>
              <CardAction>
                <Badge variant="live">₹3,00,000</Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card variant="informational">
            <CardTitle>Informational</CardTitle>
            <CardContent>
              <p className="text-sm text-text-secondary">Compact space-4 padding.</p>
            </CardContent>
          </Card>

          <Card variant="status" status="warning">
            <CardTitle>Status — warning</CardTitle>
            <CardContent>
              <p className="text-sm text-text-secondary">Pending organizer confirmation.</p>
            </CardContent>
          </Card>

          <Card variant="status" status="success">
            <CardTitle>Status — success</CardTitle>
            <CardFooter>
              <span className="text-sm text-success">Registration confirmed.</span>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Separator />

      <Section title="Dialog">
        <Row label="default">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm registration</DialogTitle>
                <DialogDescription>
                  shadow-elevation + overlay + surface-secondary — the only
                  place shadow-elevation is allowed to appear.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button variant="primary">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
      </Section>

      <Separator />

      <Section title="Sheet (Drawer)" description="Registered as Drawer in context/ui-registry.md.">
        <Row label="default">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open drawer</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Mobile navigation drawer shell.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Row>
      </Section>
    </main>
  );
}
