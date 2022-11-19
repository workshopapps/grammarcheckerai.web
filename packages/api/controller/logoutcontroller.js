
//logout script that export logout function to app.js
exports.logout = (req, res) => {
    res.cookie('jwt', 'Logged Out!', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ 
        pageTitle:"logout endpoint",
        status: "success"});
  };