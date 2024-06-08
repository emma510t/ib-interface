import { Button } from "./ui/button";

export default function Header({ setSelectedPage }) {
  return (
    <header className="p-1 flex justify-end">
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
