const { userCollection } = require("../database/models/userSchema");
const { response } = require("../utilities/response");
const bcrypt = require("bcryptjs");

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

const userProfile = async (req, res) => {
  //gets user id
  const id = req.params.id;

  try {
    const user = await userCollection.findById(id);
    // if user was not found
    if (!user) {
      return res.status(404).json(
        response({
          success: false,
          message: "User Not Found",
          data: {},
        })
      );
    }

    return res.status(200).json(
      response({
        success: true,
        message: "User found",
        data: user,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      response({
        success: false,
        message: "An Error Occured",
        data: {
          error,
        },
      })
    );
  }
};

// FOR DELETING A USER ACCOUNT.
//////////////////////////////////////////////////////////////////////////////////////////////////
const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if all required field are provided.
    if (!email || !password) {
      res.status(400);
      res.json({ message: "please provide user email and password" });
      return;
    }

    // checking for user in our database using the email provided
    const user = await userCollection.findOne({ email });

    // if user does not exist
    if (!user) {
      res.status(404);
      res.json({ message: "no user found with the email provided" });
      return;
    }

    // verify that the user password is correct
    const isCorrect = await comparePassword(password, user.password);

    // if password is not correct
    if (!isCorrect) {
      res.status(401);
      res.json({ message: "you are not authorized to delete this account" });
      return;
    }

    // if user exist and password is correct
    if (isCorrect) {
      await userCollection.deleteOne({ email });
      res.status(200);
      res.json({ message: "you have successfully deleted your account" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong" });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////

//Updates a User profile.
const updateUser = async (req, res) => {
  try {
    const profilePicture = req.file ? req.file.location : "";

    const data = {
      ...req.body,
      profilePicture: profilePicture,
    };

    const user = await userCollection.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    //If user was not found.
    if (!user) {
      return res.status(400).json(
        response({
          success: false,
          message: "User Not Found",
          data: {},
        })
      );
    }
    return res.status(200).json(
      response({
        success: true,
        message: "user updated successfully.",
        data: {},
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      response({
        success: false,
        message: "An Error Occured",
        data: {
          error: error,
        },
      })
    );
  }
};

module.exports = { deleteUser, userProfile, updateUser };
