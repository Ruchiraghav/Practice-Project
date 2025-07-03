const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    console.log("TOKEN VERIFIED:", decoded);
    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
