import CaseForm from "@/components/views/CaseForm";
import ListView from "@/components/views/ListView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="grid grid-cols-3">
        <ListView></ListView>
        <CaseForm className="col-span-2"></CaseForm>
      </div>
    </main>
  );
}
