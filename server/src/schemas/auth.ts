import { Schema } from 'express-validator';

const authSchema: Schema = {
  username: {
    trim: true,
    notEmpty: true,
    escape: true,
    isString: true,
  },
  password: {
    trim: true,
    notEmpty: true,
    isLength: { options: { min: 8 } },
    isString: true,
  },
};

export { authSchema };
