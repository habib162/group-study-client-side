import { useEffect, useState } from "react";
import CardAssignment from "./CardAssignment";
import Aos from "aos";

const AllAssignment = () => {
    const [loading, setLoading] = useState(true);
    const [loadedAssignment, setLoadedAssignment] = useState([]);
    const [allAssignments, setAllAssignments] = useState([]);
    useEffect(() => {
        fetch('https://b8a11-server-side-habib162.vercel.app/assignment')
            .then(res => res.json())
            .then(data => {
                setLoadedAssignment(data)
                setAllAssignments(data);
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    const handleFilter = (e) => {
        const selectedLevel = e.target.value;
        setLoading(true);
        if (selectedLevel !== 'All') {
            const filterAss = allAssignments.filter(
                (assignment) => assignment.difficultLevel === selectedLevel
            );
            setLoadedAssignment(filterAss);
            setLoading(false);
        } else {
            setLoadedAssignment(allAssignments);
            setLoading(false);
        }
    };



    return (
        <div className="max-w-7xl mx-auto">
            <div className="py-5">
                <h1 className="text-4xl font-bold text-center py-6 bg-gradient-to-r text-transparent bg-clip-text from-indigo-500 from-10% via-emerald-500 via-30% to-emerald-500 to-90% " data-aos="fade-right">All Assignment</h1>
                {
                    loading && <div className="flex justify-center py-20">
                        <span className="loading loading-spinner text-success"></span>
                    </div>
                }
                <div className="form-control my-5 mx-auto w-1/2 flex" data-aos="fade-left">
                    <div><span className="label-text text-black font-bold">Filter by</span></div>
                    <select
                        name="difficultLevel"
                        onChange={handleFilter}
                        className="select border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal"
                    >
                        <option>All</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
                

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <span className="loading loading-spinner text-success"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {loadedAssignment &&
                                loadedAssignment.map((assignment) => (
                                    <CardAssignment key={assignment._id} assignment={assignment} />
                                ))}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default AllAssignment;