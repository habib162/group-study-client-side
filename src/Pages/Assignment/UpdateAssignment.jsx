import { useLoaderData } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";
import UseAuth from "../../hooks/useAuth";
import ErrorData from "../../assets/Lottie/Error.json";

   
import DatePicker from "react-datepicker";
import { useLottie } from "lottie-react";
import { toast } from "react-toastify";
import axios from "axios";
const UpdateAssignment = () => {
    const assignments = useLoaderData();
    const { _id, title, photoUrl, mark, description, difficultLevel, date, user_mail } = assignments;

    const [level, setLevel] = useState(difficultLevel);
    const [selectedDate, setSelectedDate] = useState(new Date(date));
    const { currentUser } = UseAuth();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const options = {
        animationData: ErrorData,
        loop: true
      };
    
      const { View } = useLottie(options);


    const handleUpdateAssignment = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const photoUrl = form.photoUrl.value;
        const mark = form.mark.value;
        const difficultLevel = level;
        const description = form.description.value;
        const date = selectedDate;
        const user_mail = currentUser.email;
        const newAssignment = { title, photoUrl, mark, difficultLevel, description, date, user_mail };
        fetch(`https://b8a11-server-side-habib162.vercel.app/assignment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAssignment)
        }) .then(res => res.json())
        .then(data => {
            if (data.modifiedCount> 0) {
                toast.success("Assignment updated successfully")
            }
        })
        
    }
    return (
        <div className="grid grid-cols-5">
          {
            currentUser.email === user_mail ? (
            <>
            <div className="my-16 ml-6">
                <SideBar></SideBar>
            </div>
            <div className="flex items-center justify-center min-h-screen  col-span-4">
                <div className=" bg-white w-[75%] p-8 rounded-md py-10 shadow-xl">
                    <form onSubmit={handleUpdateAssignment}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' defaultValue={title} placeholder="Enter title" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input type="text" name='photoUrl' defaultValue={photoUrl} placeholder="Enter Image URL" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marks</span>
                                </label>
                                <input type="number" name='mark' defaultValue={mark} placeholder="Enter mark" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Level</span>
                                </label>
                                <select
                                name="difficultLevel"
                                value={difficultLevel}
                                className="select border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4 appearance-none leading-normal"
                                onChange={(e) => setLevel(e.target.value)}
                                >
                                <option disabled>Pick your difficulty level</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                </select>


                            </div>
                            <div className="mb-6 col-span-2">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    defaultValue={description}
                                    className="w-full border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required
                                    rows="3"
                                ></textarea>
                            </div>


                        </div>
                        <div className="mb-6">
                            <label className="label">
                                <span className="label-text">Due Date</span>
                            </label>
                            <DatePicker name="date" className="w-full border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required
                                selected={selectedDate} onChange={handleDateChange} />

                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-em  erald-700 focus:outline-none focus:shadow-outline"
                        >
                            Update Assignment
                        </button>
                    </form>
                </div>
            </div>
            </>
 
          ) :
        <div className="h-[300px] w-[300px] ml-[650px] my-10">
            {View}
        </div>
          }
        </div>
    );
}

export default UpdateAssignment;