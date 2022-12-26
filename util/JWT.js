import jwt from 'jsonwebtoken';

const secret = 'sheep-secret';

export const JWT = {
  generate(value, expires) {
    return jwt.sign(value, secret, { expiresIn: expires });
  },

  verify(token) {
    try {
      return jwt.verify(token, secret);
    } catch {
      return false;
    }
  },
};
