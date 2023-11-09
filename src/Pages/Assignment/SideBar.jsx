import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className='shadow-md h-fit w-full rounded-[10px] font-poppins' >
            <ul className='bg-white'>
                {/* <li><Link to='/dashboard'><button className='w-full p-3 text-black/80 cursor-pointer hover:bg-slate-200 rounded-[10px] pl-5 font-medium text-left'>About Me</button></Link></li> */}
                    <ul>
                        <li><Link to='/add-assignment'><button className='w-full text-left p-3 text-black/80 cursor-pointer hover:bg-emerald-200 rounded-[10px] pl-5 font-medium'>Add Assignment</button></Link></li>

                        <li><Link to='/assignment-list'><button className='w-full text-left p-3 text-black/80 cursor-pointer hover:bg-emerald-200 rounded-[10px] pl-5 font-medium'>Manage Assignment</button></Link> </li>
                        <li><Link to='/all-submitted-assignment'><button className='w-full text-left p-3 text-black/80 cursor-pointer hover:bg-emerald-200 rounded-[10px] pl-5 font-medium'>All Submitted Assignment</button></Link> </li>
                    </ul>
            
            </ul>
        </div>
    );
}

export default SideBar;