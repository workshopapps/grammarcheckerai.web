//logout script that export logout function to app.js
exports.logout = (req, res) => {
  res.cookie("jwt", "Logged Out!", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return res.status(200).json({
    pageTitle: "logout endpoint",
    success: true,
    message:
      "You have Logged out successfully, we hope to see you come around again.",
  });
};
