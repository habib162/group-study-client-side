import { useLottie } from "lottie-react";
import ErrorData from "../../assets/Lottie/Error.json";
const Error = () => {
    const options = {
        animationData: ErrorData,
        loop: true
      };
    
      const { View } = useLottie(options);
    
      return <div className="h-[500px] w-[500px] mx-auto my-10">
            {View}
      </div>;
}

export default Error;