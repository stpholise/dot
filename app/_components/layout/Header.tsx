import Searchbar from "../menu/Searchbar";
import RoleAndNotification from '../menu/RoleAndNotification'
import MenuButton  from "../menu/MenuButton";
const Header = () => {
  return (
    <div className=" sticky top-0 right-0 h-24 md:gap-12 bg-white w-full lg:w-[calc(100%-240px)] lg:ml-60 flex justify-between items-center text-[#343434] font-medium p-4 xs:px-10">
      <div className="flex items-center gap-4">
      <MenuButton />
      <Searchbar />
      </div>
      <RoleAndNotification />
    </div>
  );
};

export default Header;
