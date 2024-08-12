import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = () => {
  const name = "image";
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        required
        className="max-w-xs mt-2"
      />
    </div>
  );
};
export default ImageInput;
