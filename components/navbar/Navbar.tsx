import Logo from "./Logo";
import { DarkMode } from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Navsearch from "./Navsearch";
const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="text-3xl container flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Logo />
        <Navsearch />
        <div className="flex flex-col md:flex-row gap-4 md:items-center ">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
