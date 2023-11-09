import { useLottie } from "lottie-react";
import BannerData from "../../assets/Lottie/Banner.json";

const Banner = () => {
    const options = {
        animationData: BannerData,
        loop: true
    };

    const { View } = useLottie(options);
                   
    return (
        <div className="md:flex min-h-[500px] max-w-7xl mx-auto font-poppins" >
            <div className=" mt-40">
                <h1 className="text-5xl font-bold mr-10 mb-4">
                    Collaborate, Illuminate,
                </h1>
                <h1 className="text-5xl font-bold mr-10 mb-4">
                Elevate  Empowering Minds
                </h1>
                <h1 className="text-5xl font-bold mr-10 mb-4">
                Through <span className="text-5xl font-bold">
                <span className="bg-gradient-to-r text-transparent bg-clip-text from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
                    Group Study!
                </span>
                </span>
                </h1>
                <p>Strength in Numbers, Excellence in Assignments: Uniting Minds, Achieving Success!</p>
                <br></br>
                <button className="btn btn-outline btn-success" >Explore More</button>
            </div>
            <div className="h-[500px] w-[500px] mx-auto my-10">
                {View}
            </div>
        </div>
    );
}

export default Banner;