import React from "react";
import Container from "../../components/Shared/Container";
import Banner from "../../components/Home/Banner/Banner";
import PopularContests from "../../components/Home/PopularContests/PopularContests";
import WhyChooseUs from "../../components/Home/WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <Container>
      {/* Banner */}
      <Banner></Banner>
      {/* Popular Contests */}
      <PopularContests></PopularContests>
      {/* Why Choose Us  */}
      <WhyChooseUs></WhyChooseUs>
    </Container>
  );
};

export default Home;
