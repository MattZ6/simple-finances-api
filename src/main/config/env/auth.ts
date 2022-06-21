export const authConfig = {
  /** Authentication */

  ACCESS_TOKEN_SECRET: process.env.JWT_AUTH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: 30 * 60, // 👈 30 min

  /** Refresh token */

  REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS: 2 * 24 * 60 * 60 * 1000, // 👈 2 days
};
