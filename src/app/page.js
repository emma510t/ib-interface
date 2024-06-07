import CaseForm from "@/components/views/CaseForm";
import ListView from "@/components/views/ListView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:min-h-screen">
      <div className="grid grid-cols-3 max-w-[1280px] mx-auto gap-2 px-2 sticky">
        <ListView className="col-span-1 max-w-full w-screen md:overflow-auto"></ListView>
        <CaseForm className="col-span-2 max-w-full w-screen md:min-h-screen md:sticky"></CaseForm>
      </div>
    </main>
  );
}
