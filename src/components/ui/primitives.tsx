import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return (
    <Comp className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </Comp>
  );
}

export function Section({
  className,
  children,
  id,
  tone = "default",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "default" | "muted" | "dark" | "accent";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "muted" && "bg-surface-muted",
        tone === "dark" && "bg-ink text-cream",
        tone === "accent" && "bg-ember text-cream",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<"a"> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "phone";
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember",
        variant === "primary" &&
          "bg-ember text-white shadow-sm hover:bg-ember-hot",
        variant === "secondary" &&
          "border border-steel/30 bg-cream text-ink hover:border-ink/40 hover:bg-white",
        variant === "ghost" &&
          "text-cream underline-offset-4 hover:underline",
        variant === "phone" &&
          "bg-ink text-cream hover:bg-steel",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-ember">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-steel">{description}</p>
      ) : null}
    </div>
  );
}
