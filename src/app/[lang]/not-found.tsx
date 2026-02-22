import { IconEungyeole } from "@/components/assets/icon-eungyeole";

export default function NotFound() {
  return (
    <div className="z-50 fixed inset-0 bg-background text-base flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <IconEungyeole width={50} height={50} />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">404 Not Found</h1>
          <p className="text-sm text-gray-500">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
}
