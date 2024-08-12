import { FormInputType } from "@/utils/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormInput = (props: FormInputType) => {
  const { name, type, label, defaultValue, placeholder } = props;
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        // className="bg-background"
      />
    </div>
  );
};
export default FormInput;
