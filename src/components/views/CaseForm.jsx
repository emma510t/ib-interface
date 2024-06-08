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

export default function CaseForm({ className, selectedPage }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo(0, 0);
    }
  }, [formSubmitted]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPage.id !== "new") {
        const { data, error } = await supabase.from("ib-cases_v2").select("*").eq("id", selectedPage.id).single();
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          reset({
            virksomhed: data.h1,
            situation: data.situation_udfordringer,
            url: data.slug,
            intro: data.intro,
            titel1: data.fase_1_headline,
            desc1: data.fase_1_text,
            titel2: data.fase_2_headline,
            desc2: data.fase_2_text,
            titel3: data.fase_3_headline,
            desc3: data.fase_3_text,
          });
        }
      }
    };
    fetchData();
  }, [selectedPage, reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      let response;
      if (selectedPage.id) {
        // Update existing case
        response = await supabase
          .from("ib-cases_v2")
          .update({
            h1: data.virksomhed,
            situation_udfordringer: data.situation,
            slug: data.url,
            intro: data.intro,
            fase_1_headline: data.titel1,
            fase_1_text: data.desc1,
            fase_2_headline: data.titel2,
            fase_2_text: data.desc2,
            fase_3_headline: data.titel3,
            fase_3_text: data.desc3,
          })
          .eq("id", selectedPage.id);
      } else {
        // Insert new case
        response = await supabase.from("ib-cases_v2").insert([
          {
            h1: data.virksomhed,
            situation_udfordringer: data.situation,
            slug: data.url,
            intro: data.intro,
            fase_1_headline: data.titel1,
            fase_1_text: data.desc1,
            fase_2_headline: data.titel2,
            fase_2_text: data.desc2,
            fase_3_headline: data.titel3,
            fase_3_text: data.desc3,
          },
        ]);
      }

      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    } finally {
      setSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <section className={`p-4 ${className}`}>
      <h2>CaseForm</h2>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-5">
          <div className="w-full">
            <Label htmlFor="virksomhed">Virksomhed*</Label>
            <Input
              id="virksomhed"
              {...register("virksomhed", { required: true })}
              aria-invalid={errors.virksomhed ? "true" : "false"}
              className={`mt-1.5 ${errors.virksomhed ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.virksomhed?.type === "required" && <FormError>Indtast virksomhedens navn</FormError>}
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
          <div className="w-full">
            <Label htmlFor="intro">Intro tekst*</Label>
            <Textarea
              id="intro"
              {...register("intro", { required: true })}
              aria-invalid={errors.intro ? "true" : "false"}
              className={`mt-1.5 ${errors.intro ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.intro?.type === "required" && <FormError>Indset introtekst til forsiden</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="situation">Situation og udfordinger*</Label>
            <Textarea
              id="situation"
              {...register("situation", { required: true })}
              aria-invalid={errors.situation ? "true" : "false"}
              className={`mt-1.5 ${errors.situation ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.situation?.type === "required" && <FormError>Beskriv situation og udfordringer</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="titel1">Fase 1, titel*</Label>
            <Input
              id="titel1"
              {...register("titel1", { required: true })}
              aria-invalid={errors.titel1 ? "true" : "false"}
              className={`mt-1.5 ${errors.titel1 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.titel1?.type === "required" && <FormError>Indtast titel til fase 1</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="desc1">Fase 1, beskrivelse*</Label>
            <Textarea
              id="desc1"
              {...register("desc1", { required: true })}
              aria-invalid={errors.desc1 ? "true" : "false"}
              className={`mt-1.5 ${errors.desc1 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.desc1?.type === "required" && <FormError>Beskriv fase 1</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="titel2">Fase 2, titel*</Label>
            <Input
              id="titel2"
              {...register("titel2", { required: true })}
              aria-invalid={errors.titel2 ? "true" : "false"}
              className={`mt-1.5 ${errors.titel2 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.titel2?.type === "required" && <FormError>Indtast titel til fase 2</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="desc2">Fase 2, beskrivelse*</Label>
            <Textarea
              id="desc2"
              {...register("desc2", { required: true })}
              aria-invalid={errors.desc2 ? "true" : "false"}
              className={`mt-1.5 ${errors.desc2 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.desc2?.type === "required" && <FormError>Beskriv fase 2</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="titel3">Fase 3, titel*</Label>
            <Input
              id="titel3"
              {...register("titel3", { required: true })}
              aria-invalid={errors.titel3 ? "true" : "false"}
              className={`mt-1.5 ${errors.titel3 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.titel3?.type === "required" && <FormError>Indtast titel til fase 3</FormError>}
          </div>
          <div className="w-full">
            <Label htmlFor="desc3">Fase 3, beskrivelse*</Label>
            <Textarea
              id="desc3"
              {...register("desc3", { required: true })}
              aria-invalid={errors.desc3 ? "true" : "false"}
              className={`mt-1.5 ${errors.desc3 ? "border-ibred-400 border-2" : "border-ibsilver-500"}`}
            />
            {errors.desc3?.type === "required" && <FormError>Beskriv fase 3</FormError>}
          </div>
          <div></div>
          <div className="flex justify-between">
            <Button disabled={submitting} variant="destructive">
              Slet
            </Button>
            <Button disabled={submitting}>{submitting ? "Opdaterer..." : "Udgiv/opdater"}</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
