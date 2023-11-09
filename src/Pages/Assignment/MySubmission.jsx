import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
const MySubmission = () => {
    const loadedSubmission = useLoaderData();
    const { currentUser } = UseAuth();
    const filterSubmission = loadedSubmission.filter(submission => submission.email === currentUser?.email);
    

    const [submissiontList, setSubmissionList] = useState(filterSubmission);
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
    return (
        <div className="min-h-screen">
            <div className="overflow-x-auto">
                {
                    submissiontList &&
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Pdf Link</th>
                                    <th>Quick Note</th>
                                    <th>Assignment Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissiontList.map((assign, index) => (
                                    <tr key={index} className="bg-base-200">
                                        <th>{index + 1}</th>
                                        <td>{assign.pdflink}</td>
                                        <td>{assign.note}</td>
                                        <td>{getAssignmentTitle(assign.assignment_id)}</td>
                                        <td className="badge badge-primary">{assign.status}</td>
                          
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
        </div>
    );
}

export default MySubmission;