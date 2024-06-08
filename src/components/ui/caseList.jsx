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
        <li key={card.id} className="p-2 border-b-2 flex gap-2">
          <div>
            <p className="text-sm text-ibsilver-400">Cases</p>
            <h3 className="text-base font-medium break-words max-w-[180px]">
              {he.decode(card.h1)}
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
            <Button size="icon" className="bg-transparent hover:bg-transparent">
              <Pencil className="stroke-ibsilver-600" />
            </Button>
          </div>
        </li>
      ))}
    </>
  );
}
