import { GoogleOAuth2Provider } from '@infra/providers/oauth2/Google';

import { googleConfig } from '@main/config/env';

export function makeGoogleOAuth2Provider() {
  return new GoogleOAuth2Provider(
    googleConfig.CLIENT_ID,
    googleConfig.CLIENT_SECRET,
    googleConfig.REDIRECT_URL
  );
}
