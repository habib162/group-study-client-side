import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const SubmittedAssignment = () => {
    const submittedAssignment = useLoaderData();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetch('https://b8a11-server-side-habib162.vercel.app/assignment')
            .then(res => res.json())
            .then(data => {
                setAssignments(data);
            });
    }, []);

    const getAssignmentTitle = (assignmentId) => {
        const assignment = assignments.find(item => item._id === assignmentId);
        return assignment ? assignment.title : 'Title not found';
    };
    const getAssignmentMark = (assignmentId) => {
        const assignment = assignments.find(item => item._id === assignmentId);
        return assignment ? assignment.mark : 'not found';
    };

    const handleSubmitAssignment = (e, id) => {
        const mark = e.target.marks.value;
        const newMark = { mark, status: 'Completed' }
        e.target.reset();
        fetch(`https://b8a11-server-side-habib162.vercel.app/take-assignment/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMark)
        }) .then(res => res.json())
        .then(data => {
            if (data.modifiedCount> 0) {
                toast.success("Mark updated successfully")
            }
        })
        
        
    }
    return (
        <div>
            <div className="min-h-screen">
                <div className="overflow-x-auto">
                    {
                        submittedAssignment &&
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>pdfLink</th>
                                        <th>Title</th>
                                        <th>Marks</th>
                                        <th>Examinee Mail</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submittedAssignment.map((assign, index) => (
                                        (assign.status == 'pending' &&
                                            (<tr key={index} className="bg-base-200">
                                                <th>{index + 1}</th>
                                                <td><Link to={assign.pdflink} target="_blank" rel="noopener noreferrer">Pdf Link</Link></td>
                                                <td>{getAssignmentTitle(assign.assignment_id)}</td>
                                                <td>{getAssignmentMark(assign.assignment_id)}</td>
                                                <td>{assign.email}</td>
                                                <td>{assign.status}</td>
                                                <td>
                                                    <button
                                                        className="btn bg-success btn-sm rounded-md"
                                                        onClick={(e) => {
                                                            document.getElementById('my_modal_3').showModal();
                                                            document.getElementById('modal-data-id').setAttribute('data-id', assign._id);
                                                        }}
                                                    >
                                                        Give Mark
                                                    </button></td>
                                            </tr>))

                                    ))}
                                </tbody>
                            </table>
                        )}
                </div>
            </div>
            <div id="modal-data-id" style={{ display: 'none' }}></div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={(e) => handleSubmitAssignment(e, document.getElementById('modal-data-id').getAttribute('data-id'))}>
                        <div className="form-control my-4">
                            <label className="label">
                                <span className="label-text">Mark</span>
                            </label>
                            <input type="text" name='marks' placeholder="Enter Mark" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-em  erald-700 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </dialog >
        </div>
    );
}

export default SubmittedAssignment;