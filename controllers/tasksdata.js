import user from '../models/user.js';

const addTaks = async (req, res) => {
  try {
    const {title, description} = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: `Kindly Add the title and description`,
        status: false,
      });
    }
    const userOne = await user.findById(req.user._id);

    userOne.tasks.push({
      title,
      description,
      createdAt: new Date(Date.now()).toISOString().slice(0, 10),
      completed: false,
    });

    await userOne.save();
    res.status(200).json({
      message: 'Add Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occcured ===========> ${error}`,
      status: false,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: `Kindly Add the title and description for update`,
        status: false,
      });
    }

    const {id} = req.params;
    let userOne = await user.findById(req.user._id);
    userOne.tasks = userOne.tasks.find(
      task => task._id.toString() === id.toString(),
    );
    userOne.tasks = {
      title,
      description,
      createdAt: new Date(Date.now()),
      completed: true,
    };

    await userOne.save();
    res.status(200).json({
      message: 'Updated Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occcured ===========> ${error}`,
      status: false,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const userOne = await user.findById(req.user._id);

    userOne.tasks = userOne.tasks.filter(ele => ele.id !== id);

    await userOne.save();
    res.status(200).json({
      message: 'Deleted Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occcured ===========> ${error}`,
      status: false,
    });
  }
};
export {updateTask, deleteTask, addTaks};
