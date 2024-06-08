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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

export default function ProductForm({ className, selectedPage }) {
  const {
    register,
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
      const { data, error } = await supabase
        .from("ib-product-cards_v2")
        .select("*")
        .eq("parent", "consulting");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        const icons = data.map((item) => item.icon);
        setParents(icons);
      }
    };
    fetchData();
  }, [selectedPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPage.id !== "new") {
        const { data, error } = await supabase
          .from("ib-product-cards_v2")
          .select("*")
          .eq("id", selectedPage.id)
          .single();
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          console.log("Fetched Data:", data);
          setConsultingType(
            data.parent === "consulting" ? "consulting" : "product"
          );
          setParentSB(data.parent);

          reset({
            title: data.title,
            url: data.url,
            desc: data.desc,
            icon: data.icon,
            parent: data.parent,
            content: data.content.map((obj) => obj.text).join("\n"),
            pDesc1: data.ydelse_content_1
              ? data.ydelse_content_1.map((obj) => obj.text).join("\n")
              : "",
            pHeadline2: data.ydelse_headline_2 || "",
            pDesc2: data.ydelse_content_2
              ? data.ydelse_content_2.map((obj) => obj.text).join("\n")
              : "",
            pHeadline3: data.ydelse_headline_3 || "",
            pDesc3: data.ydelse_content_3
              ? data.ydelse_content_3.map((obj) => obj.text).join("\n")
              : "",
          });
        }
      }
    };
    fetchData();
  }, [selectedPage, reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const content = data.content
        ? data.content.split("\n").map((line) => ({ text: line }))
        : null;
      const ydelse_content_1 = data.pDesc1
        ? data.pDesc1.split("\n").map((line) => ({ text: line }))
        : null;
      const ydelse_content_2 = data.pDesc2
        ? data.pDesc2.split("\n").map((line) => ({ text: line }))
        : null;
      const ydelse_content_3 = data.pDesc3
        ? data.pDesc3.split("\n").map((line) => ({ text: line }))
        : null;

      const insertData = {
        title: data.title,
        card_title: data.title,
        url: data.url,
        desc: data.desc,
        icon: data.icon,
        parent: parentSB,
        content,
        ydelse_content_1,
        ydelse_headline_2: data.pHeadline2,
        ydelse_content_2,
        ydelse_headline_3: data.pHeadline3,
        ydelse_content_3,
      };

      if (selectedPage.id !== "new") {
        // If selectedPage.id is not "new", update existing entry
        const { error: updateError } = await supabase
          .from("ib-product-cards_v2")
          .update(insertData)
          .match({ id: selectedPage.id });

        if (updateError) {
          throw updateError;
        }
      } else {
        // If selectedPage.id is "new", insert new entry
        const { error: insertError } = await supabase
          .from("ib-product-cards_v2")
          .insert([insertData]);

        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    } finally {
      setSubmitting(false);
      setFormSubmitted(true);
    }
  };

  // const onHandleDeleteConfirm = async () => {
  //   const id = selectedPage.id;
  //   const { error } = await supabase.from("ib-product-cards_v2").delete().eq("id", id);
  // };

  const handleDelete = async () => {
    console.log("slet denne", selectedPage.id);
  };

  return (
    <section className={`p-4 ${className}`}>
      <h2>
        {selectedPage.id !== "new"
          ? "Opdater konsulent side"
          : "Ny konsulent side"}
      </h2>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {selectedPage.id === "new" && (
            <div className="w-full flex gap-2">
              <Select
                id="category"
                defaultValue={consultingType}
                onValueChange={(value) => {
                  setConsultingType(value);
                  setParentSB(value === "consulting" ? "consulting" : "");
                }}
              >
                <SelectTrigger
                  className={`mt-1.5 ${
                    errors.title
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                >
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
                  defaultValue={parentSB}
                  id="parent"
                  onValueChange={(value) => setParentSB(value)}
                >
                  <SelectTrigger
                    className={`mt-1.5 capitalize ${
                      errors.title
                        ? "border-ibred-400 border-2"
                        : "border-ibsilver-500"
                    }`}
                  >
                    <SelectValue placeholder="Konsulent område" />
                  </SelectTrigger>
                  <SelectContent className="border-ibsilver-500">
                    <SelectGroup>
                      <SelectLabel>Vælg konsulent område</SelectLabel>
                      {parents.map((parent) => (
                        <SelectItem
                          key={parent}
                          value={parent}
                          className="capitalize"
                        >
                          {parent}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          <div className="w-full">
            <Label htmlFor="title">Titel*</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              aria-invalid={errors.title ? "true" : "false"}
              className={`mt-1.5 ${
                errors.title
                  ? "border-ibred-400 border-2"
                  : "border-ibsilver-500"
              }`}
            />
            {errors.title?.type === "required" && (
              <FormError>Indtast Titel</FormError>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="url">Url*</Label>
            <Input
              id="url"
              {...register("url", { required: true })}
              aria-invalid={errors.url ? "true" : "false"}
              className={`mt-1.5 ${
                errors.url ? "border-ibred-400 border-2" : "border-ibsilver-500"
              }`}
            />
            {errors.url?.type === "required" && (
              <FormError>Indtast stig til siden</FormError>
            )}
          </div>
          {consultingType === "consulting" && (
            <div className="w-full">
              <Label htmlFor="desc">Beskrivelse til produktkort*</Label>
              <Textarea
                id="desc"
                {...register("desc", { required: true })}
                aria-invalid={errors.desc ? "true" : "false"}
                className={`mt-1.5 ${
                  errors.desc
                    ? "border-ibred-400 border-2"
                    : "border-ibsilver-500"
                }`}
              />
              {errors.desc?.type === "required" && (
                <FormError>Indtast beskrivelse til produktkort</FormError>
              )}
            </div>
          )}
          <div className="w-full">
            <Label htmlFor="icon">Icon*</Label>
            <Input
              id="icon"
              {...register("icon", { required: true })}
              aria-invalid={errors.icon ? "true" : "false"}
              className={`mt-1.5 ${
                errors.icon
                  ? "border-ibred-400 border-2"
                  : "border-ibsilver-500"
              }`}
            />
            {errors.icon?.type === "required" && (
              <FormError>Indtast ikon navn</FormError>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="content">
              Beskrivende tekst
              {consultingType === "product" && " til område siden"}*
            </Label>
            <Textarea
              id="content"
              {...register("content", { required: true })}
              aria-invalid={errors.content ? "true" : "false"}
              className={`mt-1.5 ${
                errors.content
                  ? "border-ibred-400 border-2"
                  : "border-ibsilver-500"
              }`}
            />
            {errors.content?.type === "required" && (
              <FormError>Indtast indhold</FormError>
            )}
          </div>
          {consultingType === "product" && (
            <>
              <div className="w-full">
                <Label htmlFor="pDesc1">#1 tekst*</Label>
                <Textarea
                  id="pDesc1"
                  {...register("pDesc1")}
                  aria-invalid={errors.pDesc1 ? "true" : "false"}
                  className={`mt-1.5 ${
                    errors.pDesc1
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="pHeadline2">#2 underrubrik*</Label>
                <Input
                  id="pHeadline2"
                  {...register("pHeadline2")}
                  aria-invalid={errors.pHeadline2 ? "true" : "false"}
                  className={`mt-1.5 ${
                    errors.pHeadline2
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="pDesc2">#2 tekst*</Label>
                <Textarea
                  id="pDesc2"
                  {...register("pDesc2")}
                  aria-invalid={errors.pDesc2 ? "true" : "false"}
                  className={`mt-1.5 ${
                    errors.pDesc2
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="pHeadline3">#3 underrubrik</Label>
                <Input
                  id="pHeadline3"
                  {...register("pHeadline3")}
                  aria-invalid={errors.pHeadline3 ? "true" : "false"}
                  className={`mt-1.5 ${
                    errors.pHeadline3
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="pDesc3">#3 tekst</Label>
                <Textarea
                  id="pDesc3"
                  {...register("pDesc3")}
                  aria-invalid={errors.pDesc3 ? "true" : "false"}
                  className={`mt-1.5 ${
                    errors.pDesc3
                      ? "border-ibred-400 border-2"
                      : "border-ibsilver-500"
                  }`}
                />
              </div>
            </>
          )}
          <div className="flex justify-between">
            {selectedPage.id !== "new" && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger className="h-5 w-5">
                    <Button
                      disabled={submitting}
                      variant="destructive"
                      type="button"
                    >
                      Slet
                    </Button>
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
                <Button disabled={submitting}>
                  {submitting ? "Opdaterer..." : "Opdater"}
                </Button>
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
