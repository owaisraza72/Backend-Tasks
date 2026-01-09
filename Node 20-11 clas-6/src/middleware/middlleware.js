const AdminAuthMiddleware = (req, res, next) => {
    console.log("this is admin middleware");
  const token = "abc1";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const UserAuthMiddleware = (req, res, next) => {

  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  AdminAuthMiddleware,
  UserAuthMiddleware,
};
