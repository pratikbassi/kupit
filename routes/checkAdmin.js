module.exports = (req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user.is_admin) {
    return res
      .status(401)
      .send({ error: "You are not allowed to visit this route!" });
  }
  next();
};
