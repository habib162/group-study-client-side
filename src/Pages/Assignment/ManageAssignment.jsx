import { Link, useLoaderData } from "react-router-dom";
import SideBar from "./SideBar";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/useAuth";
import { useState } from "react";

const ManageAssignment = () => {
    const loadAssignment = useLoaderData();
    const {currentUser} = UseAuth();
    const filterAssignment = loadAssignment.filter(assignment => assignment.user_mail === currentUser?.email);
    const [assignmentList, setAssignmentList] = useState(filterAssignment);
    const handleDeleteAssignment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You wont be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://b8a11-server-side-habib162.vercel.app/assignment/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted',
                                'Your file has been deleted',
                                'success'
                            )
                            const updatedAssignment = filterAssignment.filter(assignment => assignment._id !== id);
                            setAssignmentList(updatedAssignment);
                        }
                    })
            }
        })

    }
    return (
        <div>
            <div className="min-h-screen py-5 grid grid-cols-5 gap-9">
            <div className="my-12 ml-6">
            <SideBar></SideBar>
            </div>
            <div className="overflow-x-auto col-span-4">
                {
                    assignmentList &&
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Due Date</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Marks</th>
                                    <th>Description</th>
                                    <th>Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentList.map((assign, index) => (
                                    <tr key={index} className="bg-base-200">
                                        <th>{index + 1}</th>
                                        <td>{assign.date}</td>
                                        <td>{assign.title}</td>
                                        <td> <img src={assign.photoUrl} alt="Logo 1" className="w-12 h-12 object-contain" /></td>
                                        <td>{assign.mark}</td>
                                        <td>{assign.description}</td>
                                        <td>{assign.difficultLevel}</td>
                                        <td>
                                            <button className="btn bg-[#D2B48C] btn-sm rounded-md"><AiFillEye></AiFillEye></button>
                                            <Link to={`/update-assignment/${assign._id}`}><button className="btn btn-neutral btn-sm rounded-md"><AiFillEdit></AiFillEdit></button></Link>
                                            <button className="btn bg-[#EA4744] btn-sm rounded-md" onClick={() => handleDeleteAssignment(assign._id)}><AiFillDelete></AiFillDelete></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
        </div> 
        </div>
    );
}

export default ManageAssignment;