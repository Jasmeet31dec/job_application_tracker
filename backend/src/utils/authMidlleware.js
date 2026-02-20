const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
    req.user = user;
    next();
  });
}

const adminMiddleware = (req, res, next) => {
    // 1. Check if user exists and if their role is admin
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the controller
    } else {
        // 2. If not admin, return 403 Forbidden
        return res.status(403).json({ 
            message: "Access denied. Admin resources only." 
        });
    }
};

function verifyToken(token){
  return jwt.verify(token,secretKey);
}

module.exports = { authenticateToken ,adminMiddleware, verifyToken};
