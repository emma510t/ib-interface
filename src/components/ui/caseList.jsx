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
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

async function fetchCases() {
  const { data, error } = await supabase.from("ib-cases_v2").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default function CaseList({ setSelectedPage, selectedPage }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCases()
      .then((data) => {
        setCases(data);
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

  if (cases.length === 0) {
    return <div>No data found</div>;
  }

  const handleDelete = async () => {
    console.log("slet denne", selectedPage.id);
    setProductCards((o) => o.filter((page) => page.id !== selectedPage.id));

    await supabase
      .from("ib-cases_v2")
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
      {cases.map((card) => (
        <li key={card.id} className="p-2 border-b-2 flex gap-2">
          <div>
            <p className="text-sm text-ibsilver-400">Cases</p>
            <h3 className="text-base font-medium break-words max-w-[180px]">
              {he.decode(card.h1)}
            </h3>
          </div>
          <div className="ml-auto flex gap-4 items-center mr-2">
            <AlertDialog>
              <AlertDialogTrigger
                className="h-5 w-5"
                onClick={() => {
                  setSelectedPage({ id: card.id, type: "cases" });
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
            <Button
              size="icon"
              className="bg-transparent hover:bg-transparent"
              onClick={() => {
                setSelectedPage({ id: card.id, type: "cases" });
              }}
            >
              <Pencil className="stroke-ibsilver-600" />
            </Button>
          </div>
        </li>
      ))}
    </>
  );
}
