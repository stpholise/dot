import Searchbar from "../menu/Searchbar";
import RoleAndNotification from '../menu/RoleAndNotification'
const Header = () => {
  return (
    <div className=" sticky top-0 right-0 h-24 bg-white w-[calc(100%-240px)] ml-60 flex justify-between items-center text-[#343434] font-medium px-12">
      <Searchbar />
      <RoleAndNotification />
    </div>
  );
};

export default Header;
