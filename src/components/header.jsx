import { Button } from "./ui/button";

export default function Header({ setSelectedPage }) {
  return (
    <header className="p-3 flex justify-between bg-ibsilver-600 items-center">
      <h1 className="text-xl text-ibsilver-100">Improve Business&apos; interface</h1>

      <Button
        onClick={() => {
          setSelectedPage("");
        }}
      >
        Opret ny side
      </Button>
    </header>
  );
}
