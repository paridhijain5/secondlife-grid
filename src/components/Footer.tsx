export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center">
              <div className="h-3 w-3 rounded-full bg-accent" />
            </div>
            <span className="font-display text-lg font-semibold text-primary">SecondLife Grid</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Giving useful items a second life through AI-powered redistribution.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary">Solutions</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="/donate" className="hover:text-primary">Donate</a></li>
            <li><a href="/organizations" className="hover:text-primary">Organizations</a></li>
            <li><a href="/impact" className="hover:text-primary">Impact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="mailto:support@secondlifegrid.org" className="hover:text-primary">support@secondlifegrid.org</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground">
          © 2026 SecondLife Grid. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
