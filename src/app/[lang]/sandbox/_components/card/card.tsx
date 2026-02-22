export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex w-full rounded-lg bg-white shadow-sm !px-[23px] !py-[17px] h-64">
      {children}
    </div>
  );
};