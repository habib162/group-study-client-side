import Aos from 'aos';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const CardAssignment = ({ assignment }) => {
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    return (

       <div data-aos="zoom-in-up">
         <motion.div 
            whileHover={{ scale: 1.1 }}
            className="card w-auto bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={assignment.photoUrl} alt={assignment.title} className="rounded-md w-[250px] h-[200px]" />
            </figure>
            <div className="card-body items-center text-center">
                <motion.h2 className="card-title">{assignment.title}</motion.h2>
                <motion.p>Level: {assignment.difficultLevel}</motion.p>
                <motion.p>Mark: {assignment.mark}</motion.p>
                <div className="card-actions">
                    <Link to={`/show-assignment/${assignment._id}`}><motion.button className="btn btn-success btn-sm text-white" >View Assignment</motion.button></Link>
                    <motion.button className="btn btn-success btn-sm">View Assignment</motion.button>
                </div>
            </div>
        </motion.div>
       </div>
    );
}

export default CardAssignment;