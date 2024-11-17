import React from "react";
import Card from "./card";
import ScrollCard from "./scrollCard";
import Category from "./category";


function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-40  bg-transparent">
        <Category />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <Card />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <ScrollCard />
      </div>
    </>
  );
}

export default Home;
