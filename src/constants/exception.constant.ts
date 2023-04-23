export const ERROR = {
  UNKNOWN_ERROR: {
    message: 'internal server error',
    code: -1,
  },
  USER_NOT_EXIST: {
    message: 'user not exist',
    code: 1,
  },
  WRONG_USERNAME_OR_PASSWORD: {
    message: 'wrong username or password',
    code: 2,
  },
  USER_EXISTED: {
    message: 'user existed',
    code: 3,
  },
  UNAUTHORIZED: {
    message: 'unauthorized',
    code: 4,
  },
  FORBIDDEN: {
    message: 'forbidden',
    code: 5,
  },
  TOO_MANY_REQUESTS: {
    message: 'too many requests',
    code: 6,
  },
  REFRESH_TOKEN_FAIL: {
    message: 'refresh token fail',
    code: 7,
  },
  REFRESH_TOKEN_EXPIRED: {
    message: 'refresh token expired',
    code: 8,
  },
};
