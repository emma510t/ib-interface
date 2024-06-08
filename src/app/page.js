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

  return (
    <>
      <Header setSelectedPage={setSelectedPage} />
      <main className="flex min-h-screen flex-col md:min-h-screen">
        <div className="grid grid-cols-3 max-w-[1280px] mx-auto gap-2 px-2 sticky md:h-screen">
          <ListView
            className="col-span-1 max-w-full w-screen md:overflow-auto"
            setSelectedPage={setSelectedPage}
            selectedPage={selectedPage}
          ></ListView>
          {selectedPage.type === "cases" ? (
            <CaseForm
              className="col-span-2 max-w-full w-screen md:h-screen md:sticky md:overflow-auto"
              selectedPage={selectedPage}
            />
          ) : selectedPage.type === "product" ? (
            <ProductForm
              className="col-span-2 max-w-full w-screen md:h-screen md:sticky md:overflow-auto"
              selectedPage={selectedPage}
            />
          ) : (
            <section className="col-span-2 max-w-full w-screen md:h-screen md:sticky">
              <p>Placeholder form</p>
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
            </section>
          )}
        </div>
      </main>
    </>
  );
}
