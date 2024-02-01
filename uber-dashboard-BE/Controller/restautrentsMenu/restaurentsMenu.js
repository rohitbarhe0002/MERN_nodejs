import RestaurentMenu from "../../Schema/RestaurentsMenu/restaurentMenu.js";


///Add new menu item
export const createMenuItem = async (req, res, next) => {
  const newMenuItem = new RestaurentMenu(req.body);
  try {
    const saveMEnuItem = await newMenuItem.save();
    res.status(200).json(saveMEnuItem);
  } catch (err) {
    next(err);
  }
};

// ///update restaturent

export const updateRestaurant = async (req, res, next) => {
  const filter = { id: req.params.id };
  const update = req.body;
  
  try {
    const updatedRestaurant = await RestaurentMenu.findOneAndUpdate(filter,update, {
      returnOriginal: false,
      projection: { _id: 0 },
   });
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


// ///delete hotel
// export const deleteUser = async (req, res, next) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("user has been deleted");
//   } catch (err) {
//     next(err);
//   }
// };

// ///get All menu
export const getAllRestaurentMenu = async (req, res, next) => {
  try {
    const allMenus = await RestaurentMenu.find({}, { _id: 0 }).lean();
    if(allMenus.length > 0) {
      res.status(200).json({ restaurentsMenus : allMenus } );
    }else{
      res.status(200).json({errorMessage:'No menus found'});
    }
  } catch (err) {
    console.log(err);
  }
};

// ////single menu
export const getRestaurentMenuById = async (req, res, next) => {
  const filter = { id: req.params.id };
  try {
    const restaurentsMenu = await RestaurentMenu.findOne(filter);
    res.status(200).json(restaurentsMenu);
  } catch (err) {
    next(err);
  }
};

//delete menu
export const deleteRestaurentMenu = async (req, res, next) => {
  try {
    await RestaurentMenu.findOneAndDelete({id:req.params.id});
    res.status(200).json("menu has been deleted");
  } catch (err) {
    next(err);
  }
};

//search by char 
export const searchBychar = async (req, res) => {
  const searchChar = req.query.searchChar || '';
  try {
    const restaurantsByChar = await RestaurentMenu.find({
      name: { $regex: `^${searchChar}`, $options: 'i' },
    });

    if (restaurantsByChar.length > 0) {
      res.send(restaurantsByChar);
    } else {
      res.send({ message: "no restaurants are present" });
    }
  } catch (e) {
    console.log(e, "error is here");
  }
};
