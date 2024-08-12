import { Label } from "../ui/label";
import { Input } from "../ui/input";

const PriceInput = ({ defaultValue }: { defaultValue?: number }) => {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
};
export default PriceInput;
