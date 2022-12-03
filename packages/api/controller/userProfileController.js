const { userCollection } = require('../database/models/userSchema');
const { response } = require('../utilities/response');

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
          message: 'User Not Found',
          data: {},
        })
      );
    }

    return res.status(200).json(
      response({
        success: true,
        message: 'User found',
        data: user,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      response({
        success: false,
        message: 'An Error Occured',
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
      return res.status(400).json(
        response({
          success: false,
          message: 'Please provide user email or Password',
          data: {},
        })
      );
    }

    // checking for user in our database using the email provided
    const user = await userCollection.findOne({ email });

    // if user does not exist
    if (!user) {
      return res.status(404).json(
        response({
          success: false,
          message: 'No user found with the email provided',
          data: {},
        })
      );
    }

    // verify that the user password is correct
    const validPassword = await user.comparePassword(password);

    // if password is not correct
    if (!validPassword) {
      return res.status(400).json(
        response({
          success: false,
          message: 'You provided an incorrect password',
          data: {},
        })
      );
    }

    // if user exist and password is correct
    if (user && validPassword) {
      await userCollection.deleteOne({ email });

      return res.status(200).json(
        response({
          success: true,
          message: 'User successfully deleted',
          data: {},
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      response({
        success: false,
        message: 'An Error Occured',
        data: {
          error,
        },
      })
    );
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////

//Updates a User profile.
const updateUser = async (req, res) => {
  try {
    const profilePicture = req.file ? req.file.location : '';

    const data = {
      ...req.body,
      profilePicture: profilePicture,
    };

    const user = await userCollection.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    //If user was not found.
    if (!user) {
      return res.status(404).json(
        response({
          success: false,
          message: 'User Not Found',
          data: {},
        })
      );
    }
    return res.status(200).json(
      response({
        success: true,
        message: 'user updated successfully.',
        data: {},
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      response({
        success: false,
        message: 'An Error Occured',
        data: {
          error: error,
        },
      })
    );
  }
};

module.exports = { deleteUser, userProfile, updateUser };
