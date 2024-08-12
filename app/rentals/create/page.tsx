"use client";
import ButtonLoader from "@/components/ButtonLoader";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import CategoryInput from "@/components/form/CategoryInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createPropertyAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CreateRentalsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createPropertyAction(formData),
    onSuccess: (data) => {
      toast({ description: data.message });
      if (data.success) {
        router.push("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue="Cabin in Latvia"
            />
            <FormInput
              name="tagline"
              type="text "
              label="Tagline (30 limit)"
              defaultValue="Dream Getaway Awaits You Here!"
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
            <CategoryInput />
          </div>
          {/* text area / description */}
          <TextAreaInput
            name="description"
            labelText="Description (10 - 1000 words)"
          />
          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput />
            <ImageInput />
          </div>

          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="guests" />
          <CounterInput detail="bedrooms" />
          <CounterInput detail="beds" />
          <CounterInput detail="baths" />

          {/* Amenities */}
          <AmenitiesInput />
          {/* Button */}
          <Button type="submit" className="capitalize mt-4">
            {isPending ? <ButtonLoader /> : "create property"}
          </Button>
        </form>
      </div>
    </section>
  );
};
export default CreateRentalsPage;
