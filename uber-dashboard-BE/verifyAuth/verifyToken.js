import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token format' });
  }

  const tokenParts = token.split(' ');
  const userToken = tokenParts[1];

  console.log(userToken,">>>")
  try {
    const decoded = jwt.verify(userToken, process.env.JWT);
    if (decoded) {
      next();
    } else {
      next('User is not authorized');
    }
  } catch (error) {
    next('Invalid token');
  }
};
