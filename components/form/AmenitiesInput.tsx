import { Checkbox } from "../ui/checkbox";
import { amenities, Amenity } from "@/utils/amenities";
import { Label } from "../ui/label";
import { useState } from "react";
const AmenitiesInput = ({ defaultValue }: { defaultValue?: Amenity[] }) => {
  const name = "amenities";
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prevState) => {
      return prevState.map((item) => {
        if (item.name === amenity.name) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
    });
  };

  return (
    <section>
      <input
        type="hidden"
        name={name}
        defaultValue={JSON.stringify(selectedAmenities)}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {selectedAmenities.map((amenity, index) => {
          return (
            <div key={amenity.name} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.name}
                defaultChecked={false}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <Label
                htmlFor={amenity.name}
                className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
              >
                {amenity.name} <amenity.icon className="w-4 h-4" />
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default AmenitiesInput;
