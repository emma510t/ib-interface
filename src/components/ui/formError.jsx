import Image from "next/image";

export default function FormError({ children }) {
  return (
    <p className="max-w-60 flex text-xs items-center gap-1 text-ibred-400 mt-2" role="alert">
      <Image src="/img/svg-icons/warning.svg" width={20} height={20} alt="advarsels symbol" />
      {children}
    </p>
  );
}
