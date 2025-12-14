import React from "react";
import Container from "../../components/Shared/Container";
import Banner from "../../components/Home/Banner/Banner";
import PopularContests from "../../components/Home/PopularContests/PopularContests";

const Home = () => {
  return (
    <Container>
      {/* Banner */}
      <Banner></Banner>
      {/* Popular Contests */}
      <PopularContests></PopularContests>
    </Container>
  );
};

export default Home;
