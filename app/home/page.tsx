import Hero from "../_components/user/Hero";
import OffersCard from "../_components/offers/OffersCard";
import { offerInfo } from "../_data/OfferData";

const page = () => {
  return (
    <div className="bg-[#FAF9F9] min-h-screen lg:w-full">
      <main className="lg:ml-70 mt-10 flex flex-col gap-8 lg:w-[calc(100%-340px)] md:p-8 lg:p-0 px-4 ">
        <Hero />
        <div className="offers grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 w-full   lg:gap-4 md:gap-8 justify-evenly  lg:p-0">
         {
          offerInfo.map((item, index) => (
            <OffersCard key={index}  image={item.image} link={item.link} description={item.description} icon={item.icon} />
          ))
         }
        </div>
      </main> 
    </div>
  );
};

export default page;
