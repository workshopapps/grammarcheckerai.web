const jwt = require('jsonwebtoken');
const { environment } = require('../../config/environment');
const { JWT_SECRET } = environment;
const { userCollection } = require('../../database/models/userSchema');

async function getUser(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
    res.json({ message: 'invalid user token' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const payLoad = jwt.verify(token, JWT_SECRET);
  const { _id } = payLoad;
  const user = await userCollection.findOne({ _id });
  return user;
}

// RESTRICTING ACCESS TO USER PROFILE ROUTE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function userprofileAccess(req, res, next) {
  // fetching logged in user details
  const user = await getUser(req, res);

  // handling instance where the role of the logged in account is user
  if (user.role === 'user') {
    const { id } = req.params;
    if (id === user._id) {
      next();
    }
    if (id !== user._id) {
      res.status(401);
      res.json({ message: 'you are not authorized to fetch this resource' });
    }
  }

  // handling instance where the role of the logged account is adim
  if (user.role === 'admin') {
    next();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR RESTRICTING ACCESS TO DELETE USER ROUTE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function deleteUserAccess(req, res, next) {
  const user = await getUser(req, res);
  const email = req.body.email;

  // handling the instance where the role of the logged in account is user
  if (user.role === 'user') {
    if (user.email === email) {
      next();
    }
    if (user.email !== email) {
      res.status(401);
      res.json({
        message: 'you do not have permission to delete this account',
      });
    }
  }
  // handling the instance where the role of the logged in account is admin
  if (user.role === 'admin') {
    await userCollection.deleteOne({ email });
    res.status(200);
    res.json({ message: 'Account was deleted sucessfully' });
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR RESTRICTING USER ACCESS TO UPDATE USER ROUTE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateUserAccess(req, res, next) {
  const user = await getUser(req, res);
  if (user.role === 'user') {
    next();
  }
  if (user.role === 'admin') {
    const { userid } = req.query;
    await userCollection.findByIdAndUpdate(userid, req.body, { new: true });
    res.status(200);
    res.json({ message: 'user updated successfully.' });
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR RESTRICTING USER ACCESS TO CONVERSATION ROUTE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function userConversationAccess(req, res, next) {
  const { userId } = req.query;
  // if the user is not logged in
  if (!userId) {
    next();
  }

  const user = await getUser(req, res);

  // handling the instance where the logged in account has the role of user
  if (user.role === 'user') {
    if (user._id === userId) {
      next();
    }
    if (user.role !== userId) {
      res.status(401);
      res.json({
        message: 'you do not have authorization to fetch this resource',
      });
    }
  }
  // handling the instance where the logged in account has the role of admin
  if (user.role === admin) {
    next();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  userprofileAccess,
  deleteUserAccess,
  userConversationAccess,
  updateUserAccess,
};
