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
    <Comp
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
    >
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
        tone === "dark" && "bg-bay text-daylight",
        tone === "accent" && "bg-engine text-daylight",
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
        "focus-visible:outline-engine inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "primary" &&
          "bg-engine hover:bg-engine-hot text-white shadow-sm",
        variant === "secondary" &&
          "border-steel/35 bg-daylight text-bay hover:border-bay/50 border hover:bg-white",
        variant === "ghost" &&
          "text-daylight underline-offset-4 hover:underline",
        variant === "phone" && "bg-bay text-daylight hover:bg-steel",
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
        <p className="text-engine mb-3 font-mono text-xs tracking-[0.22em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-bay text-4xl leading-none tracking-wide sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="text-steel mt-5 text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
