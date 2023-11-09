import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import loginImg from '../assets/Lottie/Login.json';
import SocialLogin from './SocialLogin';
import { toast } from 'react-toastify';
import UseAuth from '../hooks/useAuth';
import { useEffect } from "react";
import Aos from "aos";
const Register = () => {
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
    const { registerUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;
        console.log(name,email,password,photoUrl);
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{6,}$/;

        if (!regex.test(password)) {
            if (password.length < 6) {
                toast.error("Password is less than 6 characters");
            }
            else if (!/[A-Z]/.test(password)) {
                toast.error("Don't have capital letter");
            }
            else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
                toast.error("Don't have Special Character");
            }
        } else {
            if (email) {
                registerUser(email, password, name, photoUrl)

                    .then(result => { 
                        const createdAt = result.user?.metadata?.creationTime;
                        const newUser = { email, password, name,photoUrl, createdAt }
                        fetch('https://b8a11-server-side-habib162.vercel.app/user', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    toast.success("user registered successfully")
                                }

                            })
                        navigate(location?.state ? location.state : "/");

                    })
                    .catch(error => { toast.error(error) });
            }

        }
    }
    return (
        <div>

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left w-1/2 mr-12 mx-auto my-10" data-aos="fade-right">
                        {View}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-xl shadow-md bg-base-100 rounded-md " data-aos="fade-left">
                        <SocialLogin></SocialLogin>
                        <form className="card-body" onSubmit={handleSignUp}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Enter Name" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name='photoUrl' placeholder="Enter Photo URL" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                           
                            </div>
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
                                <input className='btn btn-success' type='submit' value="Sign Up"></input>
                            </div>
                        </form>
                        <p className='mb-4 text-center'>
                        Already have an account ?<Link to="/login" className='label-text-alt link link-hover'> Login Here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;