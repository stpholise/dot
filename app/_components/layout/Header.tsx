import Searchbar from "../menu/Searchbar";
import RoleAndNotification from '../menu/RoleAndNotification'
const Header = () => {
  return (
    <div className=" sticky top-0 right-0 h-24 bg-white w-full md:w-[calc(100%-240px)] md:ml-60 flex justify-between items-center text-[#343434] font-medium p-4 xs:px-10">
      <div className="flex items-center">

      <Searchbar />
      </div>
      <RoleAndNotification />
    </div>
  );
};

export default Header;
