const { userCollection} = require('../database/models/userSchema')
const { comparePassword } = require('../utilities/compare');


async function userProfile(req, res) {
    //gets user id
    const id = req.params.id;
    console.log(id)
    try {
        const user = await userCollection.findOne({_id: id});
        if (!user) {
            return res.json({
                status: 204,
                error: "No user with that id",
            });
        }
        res.json({Detail: user});
        res.status(200);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

// FOR DELETING A USER ACCOUNT.
//////////////////////////////////////////////////////////////////////////////////////////////////
async function deleteUser(req, res) {
  try {
    const { email, password } = req.body;

    // checking if all required field are provided.
    if (!email || !password) {
      res.status(400);
      res.json({ message: 'please provide user email and password' });
      return;
    }

    // checking for user in our database using the email provided
    const user = await userCollection.findOne({ email });

    // if user does not exist
    if (!user) {
      res.status(404);
      res.json({ message: 'no user found with the email provided' });
      return;
    }

    // verify that the user password is correct
    const hash = user.password;
    const isCorrect = await comparePassword(password, hash);

    // if password is not correct
    if (!isCorrect) {
      res.status(401);
      res.json({ message: 'you are not authorized to delete this account' });
      return;
    }

    // if user exist and password is correct
    if (user && isCorrect) {
      await userCollection.deleteOne({ email });
      res.status(200);
      res.json({ message: 'you have successfully deleted your account' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

//Updates a User profile. 
async function updateUser(req, res) {
  await userCollection.findByIdAndUpdate(req.user._id, req.body, {new:true})
       .then(user=>{
           
           if(!user){
             //If user was not found. 
             return res.status(401).json({message: 'No user found with the provided credentials.'});
           }
           res.status(200).json({message: 'user updated successfully.'});
       })
       .catch(err=>{
           console.log(err);
           res.status(401).json({message:'an error occurred'});
       });
}


module.exports = { deleteUser, userProfile, updateUser };
