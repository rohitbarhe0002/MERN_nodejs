import User from "../../Schema/user/user.js";

///Add new hotel
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const  saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
};


///delete hotel
export const deleteUser  = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    next(err);
  }
};

///get All hotels
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};



// update user
export const updateUser = async (req, res, next) => {
  const filter = { id: req.params.id };
  const update = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(filter,update, {
      returnOriginal: false,
      projection: { _id: 0},
   });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

  

//single user
export const getUserById = async (req, res, next) => {
    const {id}   = req.params ;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};