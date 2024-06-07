import CaseForm from "@/components/views/CaseForm";
import ListView from "@/components/views/ListView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="grid grid-cols-3 max-w-[1280px] mx-auto gap-2 px-2">
        <ListView className="col-span-1 max-w-full w-screen"></ListView>
        <CaseForm className="col-span-2 max-w-full w-screen"></CaseForm>
      </div>
    </main>
  );
}
