import { User } from "../models/users.model.js";
import projectService from "../services/project.js";
import { APIrespones } from "../utils/APIresponse.js";

export const creatproject = async (req, res) => {
  try {
    const { name } = req.body;

    const loggedInUser = await User.findOne({ email: req.user.email }).lean(); // Use lean() for plain object
    const userId = loggedInUser._id;
    // Ensure you are using the correct property for userId
    const project = await projectService.createProjectInDB({ name, userId });

    res.status(201).json(
      new APIrespones(200, project, "Project created successfully")
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({
      email: req.user.email,
    });

    const allUserProjects = await projectService.getAllProjectByUserId({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      projects: allUserProjects,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const addUserToProject = async (req, res) => {
  try {
    const { projectId, users } = req.body;

    // Ensure users is an array
    const usersArray = Array.isArray(users) ? users : [users];

    const loggedInUser = await User.findOne({
      email: req.user.email,
    });

    const project = await projectService.addUsersToProject({
      projectId,
      users: usersArray,
      userId: loggedInUser._id,
    });
    console.log(project);

    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) =>{
  const { projectId } = req.params;

    try {

        const project = await projectService.getProjectById({ projectId });

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}