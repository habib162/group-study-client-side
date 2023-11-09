
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../assets/Lottie/Login.json';
import { useLottie } from "lottie-react";
import { toast } from "react-toastify";
import UseAuth from "../hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import Aos from "aos";
const Login = () => {
    const options = {
        animationData: loginImg,
        loop: true
    };
    const { View } = useLottie(options);
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    const { signIn } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email && password) {
            signIn(email, password)
                .then(result => {
                    // axios.post('https://b8a11-server-side-habib162.vercel.app/jwt',{email},{withCredentials:true})
                    // .then((data) => console.log(data))
                    // navigate(location?.state ? location.state : "/");
                    // toast("Logged in successfully");

                    fetch('https://b8a11-server-side-habib162.vercel.app/jwt',{
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({email: email})
                    })
                    .then((res)=> res.json).then(data => console.log(data))
                       navigate(location?.state ? location.state : "/");
                        toast("Logged in successfully");
                })
                .catch(error => {
                    toast.error("Email or Password invalid")
                })
        }

    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left w-1/2 mr-12 mx-auto my-10" data-aos="fade-right">
                        {View}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100 rounded-md" data-aos="fade-left">
                        <SocialLogin></SocialLogin>
                        <form className="card-body" onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-success ' type='submit' value="Login"></input>
                            </div>
                        </form>
                        <p className='mb-4 text-center'>
                            Don't have an account ?<Link to="/register" className='label-text-alt link link-hover'> Register Here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;