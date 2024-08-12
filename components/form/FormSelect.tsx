import { FormSelectType } from "@/utils/types";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSelect = (props: FormSelectType) => {
  const { title, defaultValue, selectItem } = props;
  return (
    <div>
      <Label htmlFor={title} className="capitalize">
        {defaultValue || title}
      </Label>
      <Select name={title} defaultValue={selectItem[0].value}>
        <SelectTrigger className="bg-background">
          <SelectValue placeholder={selectItem[0].value} />
        </SelectTrigger>
        <SelectContent>
          {selectItem.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export default FormSelect;
