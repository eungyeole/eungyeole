import { cn } from "@/components/ui/cn";

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("rounded-md border border-gray-200 p-4", className)} {...props}>
    {children}
  </div>;
};