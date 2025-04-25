import React from "react";
import HomeHeader from "./components/HomeHeader/HomeHeader";
import SearchComponent from "@/app/components/SearchComponent/SearchComponent";
import BookingTable from "./components/BookingsTable/BookingsTable";

const Home = () => {
  return (
    <div className="flex flex-col h-full w-full gap-8">
      <HomeHeader />
      <div className="flex px-10">
        <SearchComponent fromHome />
      </div>
      <div className="flex flex-col gap-4 px-10">
        <BookingTable />
      </div>
    </div>
  );
};

export default Home;
