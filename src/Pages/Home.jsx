import { useEffect } from "react";
import AllAssignment from "./Assignment/AllAssignment";
import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import Aos from 'aos'
import FAQs from "./FAQs/FAQs";
const Home = () => {
 
 useEffect(() => {
    Aos.init({
      duration: 3000,
    });
  });
    return (
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
            <Banner></Banner>
            <AllAssignment></AllAssignment>
            <FAQs></FAQs>
        </div>
    );
}

export default Home;