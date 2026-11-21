import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'hunger_rush_super_secret_jwt_key_2026_modern_delight',
    { expiresIn: '30d' }
  );
};

