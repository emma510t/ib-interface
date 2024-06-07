import Image from "next/image";
import { TriangleAlert } from "lucide-react";

export default function FormError({ children }) {
  return (
    <p className="max-w-60 flex text-xs items-center gap-1 text-ibred-400 mt-2" role="alert">
      <TriangleAlert className="w-4 h-4 stroke-ibred-400" />

      {children}
    </p>
  );
}
