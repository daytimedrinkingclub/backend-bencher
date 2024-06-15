const jwt = require("jsonwebtoken");
const {Student} = require("./database/models");

const PUBLIC_ROUTES = [
  '/api/auth/google',

];

const authenticateJWT = async (req, res, next) => {
  if (PUBLIC_ROUTES.some((route) => req.url.includes(route))) {
    return next();
  }

  const authHeader = req.headers.authorization;
  console.log('auth', authHeader);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id: userId } = decodedToken;

      const student = await Student.findOne({
        where: { id: userId },
      });

      if (!student) {
        return res.sendStatus(401);
      }

      req.student = {
        student_id: student.id,
        email: student.email,
      };

      next();
    } catch (err) {
      console.error(err);
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
