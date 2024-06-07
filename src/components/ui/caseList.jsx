import { supabase } from "@/lib/supabaseclient";

export default async function CaseList() {
  const { data, error } = await supabase.from("ib-cases_v2").select("*");

  if (error || !data || data.length === 0) {
    // Handle the error case (e.g., return a 404 page or a different component)
    return <div>Error: Data not found</div>;
  }

  const cases = data;
  return (
    <>
      {cases.map((card) => (
        <li key={card.id}>
          <p>Cases</p>
          <h3>{card.h1}</h3>
        </li>
      ))}
    </>
  );
}
