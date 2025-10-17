import { Loader } from "lucide-react";

export default function HomeLoading() {
  return (
    <div className="z-50 fixed inset-0 bg-background text-base flex items-center justify-center">
      <Loader className="animate-spin text-gray-500" />
    </div>
  );
}
