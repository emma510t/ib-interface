import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import CaseList from "../ui/caseList";
import { Button } from "../ui/button";
import he from "he";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

async function fetchData() {
  const { data, error } = await supabase
    .from("ib-product-cards_v2")
    .select("*");
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
    <section
      className={`border-r-2 border-r-ibsilver-400 border-solid h-[100vh] overflow-scroll ${className}`}
    >
      <h2 className="bold text-xl">ListView</h2>
      <ul>
        {productCards.map((card) => (
          <li key={card.id} className="p-2 border-b-2 flex gap-2">
            <div>
              <p className="text-sm text-ibsilver-400">{card.parent}</p>
              <h3 className="text-base font-medium break-words max-w-[180px]">
                {he.decode(card.title)}
              </h3>
            </div>
            <div className="ml-auto flex gap-4 items-center">
              <AlertDialog>
                <AlertDialogTrigger className="h-5 w-5">
                  <Trash2 className="stroke-ibred-400 h-5 w-5" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ved at klikke Bekræft sletter du siden permanent. Dine
                      ændringer kan ikke fortrydes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Fortryd</AlertDialogCancel>
                    <AlertDialogAction>Bekræft</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                size="icon"
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                  setSelectedPage({ id: card.id, type: "ydelse" });
                  console.log(selectedPage);
                }}
              >
                <Pencil className="stroke-ibsilver-600" />
              </Button>
            </div>
          </li>
        ))}
        <CaseList
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
        />
      </ul>
    </section>
  );
}
