import { cn } from "@/components/ui/cn";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  preview: React.ReactNode;
  previewClassName?: string;
}

export const Card = ({ children, className, preview, previewClassName, ...props }: CardProps) => {
  return (
    <article
      className={cn("group w-full overflow-hidden rounded-lg bg-white shadow-sm dark:bg-neutral-900", className)}
      {...props}
    >
      <div
        className={cn(
          "relative flex min-h-56 items-center justify-center overflow-hidden border-b border-gray-100 bg-stone-50 p-5 dark:border-neutral-800 dark:bg-neutral-900",
          previewClassName,
        )}
      >
        {preview}
      </div>
      <div className="px-[23px] py-[17px]">{children}</div>
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
      <p className="mb-1.5 text-xs font-medium text-gray-400">{eyebrow}</p>
      <h2 className="text-base font-medium">{link}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
};
