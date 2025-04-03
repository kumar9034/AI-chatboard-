import React, {  useState } from "react";
import { UserContext } from '../context/user.context';
import { useContext, useEffect } from "react";
import axios from "../config/Axios";
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [project , setproject] = useState([])

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("/project/all").then((res)=>{
            console.log(res.data);
            setproject(res.data.projects)
        }).catch((error)=>{
            console.log(error);
            
        })

    },[])

    function createProject(e) {
        console.log({projectName});


        axios.post('/project/create',{
            name : projectName
        }).then(
            (res)=>{
                console.log(res);
                setModalOpen(false)
            }
        ).catch((err)=>{
            console.log(err);
            
        })
    }

    return (
        <main className="flex flex-wrap">
            <div className="p-4 ">
                <div className="projects">
                    <div
                        className="project w-40  p-4 font-bold border hover:bg-blue-200 border-slate-300 rounded-md cursor-pointer"
                        onClick={() => setModalOpen(true)}
                    >  New Project
                        <i className="ri-user-add-fill ml-2 text-xl"></i>
                    </div>
                </div>
            </div>

            {Array.isArray(project) && project.map((e) => (
    <div key={e._id}
    onClick={()=>{navigate("/project", {
        state: {project}
    })}}
    >
        <div className="ml-5 border border-slate-300  mt-5 px-6 py-2 w-min text-sm rounded cursor-pointer hover:bg-blue-200 ">
        <p className="font-bold">{e.name}</p>
            <div className="flex gap-2 ">
                <i className="ri-team-fill text-[17px]"></i>
                collaborators:
                <div>{e.users.length}</div>
            </div>


        </div>
    </div>
))}
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Create Project</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createProject();
                            }}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="projectName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                   Create Project Name
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;