const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Role authorization middleware generator.
 * Usage: app.get('/admin', authorize('admin'), handler)
 *        app.get('/seller-or-admin', authorize('seller','admin'), handler)
 * If no roles are provided, the middleware only verifies authentication.
 */
function authorize(...allowedRoles) {
  return async (req, res, next) => {
    // Support token from cookie or Authorization header
    const tokenFromCookie = req.cookies && req.cookies.accessToken;
    const authHeader =
      req.headers && (req.headers.authorization || req.headers.Authorization);
    const tokenFromHeader =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const token = tokenFromCookie || tokenFromHeader;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const secret = process.env.ACCESS_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ message: "Server JWT secret not configured" });
    }

    try {
      const decoded = jwt.verify(token, secret);

      // Determine user id from token payload (support different shapes)
      const userId =
        decoded.userId || decoded.id || (decoded.user && decoded.user.id);
      if (!userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      // Load user from DB to get up-to-date role and attach safe user info
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach minimal user object for downstream handlers
      req.user = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      // If roles were specified, ensure user role is allowed
      if (allowedRoles.length > 0) {
        const userRole = req.user.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
          return res
            .status(403)
            .json({ message: "Forbidden: insufficient permissions" });
        }
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = authorize;
