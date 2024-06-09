import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import he from "he";
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
import { Globe, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

async function fetchData() {
  const { data, error } = await supabase
    .from("ib-product-cards_v2")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default function ProductList({
  setSelectedPage,
  selectedPage,
  productCards,
  setProductCards,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

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

  const handleDelete = async () => {
    console.log("slet denne", selectedPage.id);
    setProductCards((o) => o.filter((page) => page.id !== selectedPage.id));

    await supabase
      .from("ib-product-cards_v2")
      .delete()
      .eq("id", selectedPage.id)
      .single();
    setSelectedPage({ id: "", type: "" });
    toast({
      title: "Siden er slettet!",
      description: "Din side er nu permanent fjernet",
    });
  };

  return (
    <>
      {productCards.map((card) => (
        <li key={card.id} className="p-2 flex gap-2 border-b-2">
          <div>
            <p className="text-sm text-ibsilver-400">{card.parent}</p>
            <h3 className="text-base font-medium break-words max-w-[180px]">
              {he.decode(card.title)}
            </h3>
          </div>
          <div className="ml-auto flex gap-4 items-center mr-2">
            <Link
              href={`https://improve-business-rettelser.vercel.app/consulting/${card.url}`}
              target="_blank"
              passHref={true}
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Button
              size="icon"
              className="bg-transparent hover:bg-transparent z-50"
              onClick={() => {
                setSelectedPage({ id: card.id, type: "product" });
                console.log(selectedPage);
              }}
            >
              <Pencil className="stroke-ibsilver-600" />
            </Button>
            <AlertDialog className="z-50">
              <AlertDialogTrigger
                className="h-5 w-5"
                onClick={() => {
                  setSelectedPage({ id: card.id, type: "product" });
                }}
              >
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
                  <AlertDialogAction onClick={handleDelete}>
                    Bekræft
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </li>
      ))}
    </>
  );
}
