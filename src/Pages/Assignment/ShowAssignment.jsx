import { motion } from "framer-motion";
import { Link, Navigate, useLoaderData, useLocation } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ShowAssignment = () => {
    const assignments = useLoaderData();
    const { _id, title, photoUrl, mark, description, difficultLevel, date, user_mail } = assignments;
    const {currentUser} = UseAuth();
    const [takeAssignment, SetTakeAssignment] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("https://b8a11-server-side-habib162.vercel.app/take-assignment")
        .then(res => res.json())
        .then(data => {
            SetTakeAssignment(data)
            setLoading(false)
        })
    },[])

     const findData = takeAssignment.find(data => data.email === currentUser.email && data.assignment_id === _id) ?? 'null';


    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        const pdflink = e.target.pdflink.value;
        const note = e.target.note.value;
        const email = currentUser.email;
        const status = 'pending';
        const newSubmit = {pdflink, note, email, status, assignment_id: _id};

         
         if (findData !== 'null') {
            toast("Already taken")
         }else{
        fetch("https://b8a11-server-side-habib162.vercel.app/take-assignment", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newSubmit)
            }) .then(res => res.json())
            .then(data => {
                    toast.success("Assignment Submitted successfully")
                    
            })
            
         }
        


    }

    return (
        <div className="hero min-h-screen">
            <motion.div  whileHover={{ scale: 1.1 }} className="hero-content flex-col lg:flex-row shadow-lg bg-emerald-200 p-10 gap-10">
           
                <img src={photoUrl} className="rounded-md shadow-md  h-[200px] w-[250px]" />
                <div>
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-3">{description}</p>
                    <p className="py-3">Mark: {mark}</p>
                    <p className="py-3">Level: {difficultLevel}</p>
                    <Link><button className="btn btn-success btn-sm" onClick={() => document.getElementById('my_modal_3').showModal()}>Take Assignment</button></Link>
                </div>
            </motion.div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmitAssignment}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PDF Link</span>
                            </label>
                            <input type="text" name='pdflink' placeholder="Enter PDF Link" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Quick Note</span>
                            </label>
                            <textarea type="text" name='note' rows={3} placeholder="Enter Note" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </dialog >
        </div >
    );
}

export default ShowAssignment;