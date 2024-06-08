import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import CaseList from "../ui/caseList";

import ProductList from "../ui/productList";

async function fetchData() {
  const { data, error } = await supabase.from("ib-product-cards_v2").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default function ListView({ className, setSelectedPage, selectedPage }) {
  const [productCards, setProductCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setProductCards(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (productCards.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <section className={`border-r-2 border-r-ibsilver-400 border-solid h-[100vh] overflow-scroll ${className}`}>
      <h2 className="bold text-xl">ListView</h2>
      <ul>
        <ProductList setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
        <CaseList setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
      </ul>
    </section>
  );
}
