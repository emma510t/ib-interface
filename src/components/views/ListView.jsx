import { supabase } from "@/lib/supabaseclient";
import CaseList from "../ui/caseList";
import { Button } from "../ui/button";

export default async function ListView() {
  const { data, error } = await supabase
    .from("ib-product-cards_v2")
    .select("*");

  if (error || !data || data.length === 0) {
    // Handle the error case (e.g., return a 404 page or a different component)
    return <div>Error: Data not found</div>;
  }

  const productCards = data;

  return (
    <section className="border-r-2 border-r-ibsilver-400 border-solid">
      <h2 className="bold text-xl">ListView</h2>
      <ul>
        {productCards.map((card) => (
          <li key={card.id} className="p-2 border-b-2">
            <p className="text-sm text-ibsilver-400">{card.parent}</p>
            <h3 className="text-base font-medium">{card.title}</h3>
          </li>
        ))}
        <CaseList />
      </ul>
    </section>
  );
}
