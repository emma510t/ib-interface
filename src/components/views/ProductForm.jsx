"use client";

import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormError from "../ui/formError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export default function ProductForm({ className, selectedPage }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [parents, setParents] = useState([]);
  const [consultingType, setConsultingType] = useState("");
  const [parentSB, setParentSB] = useState("");

  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo(0, 0);
    }
  }, [formSubmitted]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("ib-product-cards_v2").select("*").eq("parent", "consulting");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        const icons = data.map((item) => item.icon);
        setParents(icons);
      }
    };
    fetchData();
  }, [selectedPage, setParents]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPage.id !== "new") {
        const { data, error } = await supabase.from("ib-product-cards_v2").select("*").eq("id", selectedPage.id).single();
        setConsultingType(data.parent === "consulting" ? data.parent : "product");
        console.log(data.parent);
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          reset({
            title: data.title,
            //card_title: data.title,
            url: data.url,
            desc: data.cardDesc,
            icon: data.icon,
            parent: data.parent,
            content: data.content,
            ydelse_content_1: data.pDesc1,
            ydelse_headline_2: data.pHeadline2,
            ydelse_content_2: data.pDesc2,
            ydelse_headline_3: data.pHeadline3,
            ydelse_content_3: data.pDesc3,
          });
        }
      }
    };
    fetchData();
  }, [selectedPage, reset, setConsultingType]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); // Set submitting state to true

      // Send form data to SupaBase
      const { data: formData, error } = await supabase.from("ib-product-cards_v2").insert([
        {
          title: data.title,
          card_title: data.title,
          url: data.url,
          desc: data.cardDesc,
          icon: data.icon,
          parent: parentSB,
          content: [data.content.split("\n").map((line) => ({ text: line }))],
          ydelse_content_1: [data.pDesc1.split("\n").map((line) => ({ text: line }))],
          ydelse_headline_2: data.pHeadline2,
          ydelse_content_2: [data.pDesc2.split("\n").map((line) => ({ text: line }))],
          ydelse_headline_3: data.pHeadline3,
          ydelse_content_3: [data.pDesc3.split("\n").map((line) => ({ text: line }))],
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    } finally {
      setSubmitting(false);
      setFormSubmitted(true); // Reset submitting state
    }
  };

  return (
    <section className={`p-4 ${className}`}>
      <h2>
        {selectedPage.id !== "new" && "Opdater konsulent side"}
        {selectedPage.id === "new" && "Ny konsulent side"}
      </h2>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-5">
          <div className="w-full flex gap-2">
            <Select
              id="category"
              /* disabled={selectedPage.id !== "new"} */
              defaultValue={consultingType}
              onValueChange={(value) => {
                if (value === "consulting") {
                  setConsultingType("consulting");
                  setParentSB("consulting");
                } else if (value === "product") {
                  setConsultingType("product");
                }
              }}
            >
              <SelectTrigger className={`mt-1.5 ${errors.title ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}>
                <SelectValue placeholder="Konsulent type" />
              </SelectTrigger>
              <SelectContent className="border-ibsilver-500">
                <SelectGroup>
                  <SelectLabel>Vælg konsulent type</SelectLabel>
                  <SelectItem value="consulting">Konsulent område</SelectItem>
                  <SelectItem value="product">Konsulent ydelse</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {consultingType === "product" && (
              <Select
                id="parent"
                onValueChange={(value) => {
                  setParentSB(value);
                }}
              >
                <SelectTrigger className={`mt-1.5 capitalize ${errors.title ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}>
                  <SelectValue placeholder="Konsulent område" />
                </SelectTrigger>
                <SelectContent className="border-ibsilver-500">
                  <SelectGroup>
                    <SelectLabel>Vælg konsulent område</SelectLabel>
                    {parents.map((parent) => (
                      <SelectItem key={parent} value={parent} className="capitalize">
                        {parent}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="title">Titel*</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              aria-invalid={errors.title ? "true" : "false"}
              className={`mt-1.5 ${errors.title ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.title?.type === "required" && <FormError>Indtast Titel</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="url">Url*</Label>
            <Input
              id="url"
              {...register("url", { required: true })}
              aria-invalid={errors.url ? "true" : "false"}
              className={`mt-1.5 ${errors.url ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.url?.type === "required" && <FormError>Indtast stig til siden</FormError>}
          </div>
          {consultingType === "consulting" && (
            <div className="w-full">
              <Label htmlFor="cardDesc">cardDesc tekst*</Label>
              <Textarea
                id="cardDesc"
                {...register("cardDesc", { required: true })}
                aria-invalid={errors.cardDesc ? "true" : "false"}
                className={`mt-1.5 ${errors.cardDesc ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
              />
              {errors.cardDesc?.type === "required" && <FormError>Indset cardDesctekst til forsiden</FormError>}
            </div>
          )}

          <div className="w-full">
            <Label htmlFor="icon">icon*</Label>
            <Input
              id="icon"
              {...register("icon", { required: true })}
              aria-invalid={errors.icon ? "true" : "false"}
              className={`mt-1.5 ${errors.icon ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.icon?.type === "required" && <FormError>Indtast stig til siden</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="content">content og udfordinger*</Label>
            <Textarea
              id="content"
              {...register("content", { required: true })}
              aria-invalid={errors.content ? "true" : "false"}
              className={`mt-1.5 ${errors.content ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.content?.type === "required" && <FormError>Beskriv content og udfordringer</FormError>}
          </div>
          {consultingType === "product" && (
            <>
              <div className="w-full">
                <Label htmlFor="pDesc1">Beskrivelse*</Label>
                <Textarea
                  id="pDesc1"
                  {...register("pDesc1", { required: true })}
                  aria-invalid={errors.pDesc1 ? "true" : "false"}
                  className={`mt-1.5 ${errors.pDesc1 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
                />
                {errors.pDesc1?.type === "required" && <FormError>Beskriv </FormError>}
              </div>
              <div className="w-full">
                <Label htmlFor="pHeadline2">Underrubrik*</Label>
                <Input
                  id="pHeadline2"
                  {...register("pHeadline2", { required: true })}
                  aria-invalid={errors.pHeadline2 ? "true" : "false"}
                  className={`mt-1.5 ${errors.pHeadline2 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
                />
                {errors.pHeadline2?.type === "required" && <FormError>Indtast titel til </FormError>}
              </div>
              <div className="w-full">
                <Label htmlFor="pDesc2">Beskrivelse*</Label>
                <Textarea
                  id="pDesc2"
                  {...register("pDesc2", { required: true })}
                  aria-invalid={errors.pDesc2 ? "true" : "false"}
                  className={`mt-1.5 ${errors.pDesc2 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
                />
                {errors.pDesc2?.type === "required" && <FormError>Beskriv </FormError>}
              </div>
              <div className="w-full">
                <Label htmlFor="pHeadline3">Underrubrik</Label>
                <Input
                  id="pHeadline3"
                  {...register("pHeadline3", { required: true })}
                  aria-invalid={errors.pHeadline3 ? "true" : "false"}
                  className={`mt-1.5 ${errors.pHeadline3 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
                />
                {errors.pHeadline3?.type === "required" && <FormError>Indtast titel til </FormError>}
              </div>
              <div className="w-full">
                <Label htmlFor="pDesc3">Beskrivelse</Label>
                <Textarea
                  id="pDesc3"
                  {...register("pDesc3", { required: true })}
                  aria-invalid={errors.pDesc3 ? "true" : "false"}
                  className={`mt-1.5 ${errors.pDesc3 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
                />
                {errors.pDesc3?.type === "required" && <FormError>Beskriv </FormError>}
              </div>
            </>
          )}

          <div></div>
          <div className="flex justify-between">
            {selectedPage.id !== "new" && (
              <>
                <Button disabled={submitting} variant="destructive">
                  Slet
                </Button>
                <Button disabled={submitting}>{submitting ? "Opdaterer..." : "Opdater"}</Button>
              </>
            )}
            {selectedPage.id === "new" && (
              <Button className="ml-auto" disabled={submitting}>
                {submitting ? "Udgiver..." : "Udgiv"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
