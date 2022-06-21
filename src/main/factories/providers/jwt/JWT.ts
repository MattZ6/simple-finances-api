import { JWTProvider } from '@infra/providers/jwt/JWT';

import { authConfig } from '@main/config/env';

export function makeJWTProvider() {
  return new JWTProvider(
    authConfig.ACCESS_TOKEN_SECRET,
    authConfig.ACCESS_TOKEN_EXPIRES_IN_SECONDS
  );
}
