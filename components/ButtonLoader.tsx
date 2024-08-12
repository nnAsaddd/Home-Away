import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";

const ButtonLoader = () => {
  return (
    <Button>
      <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
};

export default ButtonLoader;
