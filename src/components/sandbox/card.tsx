import { cn } from "@/components/ui/cn";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  preview: React.ReactNode;
  previewClassName?: string;
}

export const Card = ({ children, className, preview, previewClassName, ...props }: CardProps) => {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[20px] border border-border bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex min-h-56 items-center justify-center overflow-hidden border-b border-border bg-surface-muted p-5",
          previewClassName,
        )}
      >
        {preview}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </article>
  );
};

interface CardCaptionProps {
  description: string;
  eyebrow: string;
  link: React.ReactNode;
}

export const CardCaption = ({ description, eyebrow, link }: CardCaptionProps) => {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{eyebrow}</p>
      <h2 className="text-[16px] font-semibold tracking-[-0.01em]">{link}</h2>
      <p className="mt-1.5 text-[14px] leading-6 text-muted">{description}</p>
    </div>
  );
};
