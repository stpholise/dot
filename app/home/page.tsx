import Hero from "../_components/user/Hero";
import OffersCard from "../_components/offers/OffersCard";

const page = () => {
  return (
    <div className="bg-[#FAF9F9] min-h-screen w-screen ">
      <main className="ml-72 mt-12 flex flex-col gap-8 py-4 ">
        <Hero />
        <div className="offers grid grid-cols-3 w-[calc(100%-40px)] gap-3 justify-evenly">
          <OffersCard />
          <OffersCard />
          <OffersCard />
        </div>
      </main>
      testing home page
    </div>
  );
};

export default page;
