"use client";

import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormError from "../ui/formError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";

export default function CaseForm({ className }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <section className={`p-4 ${className}`}>
      <h2>CaseForm</h2>
      <Form>
        <form action="" className="flex flex-col gap-5">
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
          <div className="flex justify-between">
            <Button variant="destructive">Slet</Button>
            <Button>Udgiv/opdater</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
