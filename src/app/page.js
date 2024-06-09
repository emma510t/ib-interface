"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import CaseForm from "@/components/views/CaseForm";
import ListView from "@/components/views/ListView";
import ProductForm from "@/components/views/ProductForm";
import { useState } from "react";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState({
    id: "",
    type: "",
  });
  const [cases, setCases] = useState([]);
  const [productCards, setProductCards] = useState([]);

  return (
    <>
      <Header setSelectedPage={setSelectedPage} />
      <main className="flex min-h-[calc(100vh-64px)] flex-col md:min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-3 max-w-[1280px] mx-auto gap-2 px-2 sticky md:h-[calc(100vh-64px)]">
          <ListView
            className="col-span-1 max-w-full w-screen md:overflow-auto"
            setSelectedPage={setSelectedPage}
            selectedPage={selectedPage}
            cases={cases}
            setCases={setCases}
            productCards={productCards}
            setProductCards={setProductCards}
          />
          {selectedPage.type === "cases" ? (
            <CaseForm
              className="col-span-2 max-w-full w-screen md:h-[calc(100vh-64px)] md:sticky md:overflow-auto"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              cases={cases}
              setCases={setCases}
            />
          ) : selectedPage.type === "product" ? (
            <ProductForm
              className="col-span-2 max-w-full w-screen md:h-[calc(100vh-64px)] md:sticky md:overflow-auto"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              productCards={productCards}
              setProductCards={setProductCards}
            />
          ) : (
            <section className="col-span-2 max-w-full w-screen md:h-[calc(100vh-64px)] md:sticky p-3">
              <h2>Opret ny side</h2>
              <div className="flex items-center justify-center h-full gap-3">
                <Button
                  onClick={() => {
                    setSelectedPage({ id: "new", type: "product" });
                  }}
                >
                  Opret konsulent side
                </Button>
                <Button
                  onClick={() => {
                    setSelectedPage({ id: "new", type: "cases" });
                  }}
                >
                  Opret case side
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
