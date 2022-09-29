import { defineStore } from 'pinia';

/**
 * Decode the OIDC token for additional information
 * @param token the OIDC token
 * @returns decoded JSON object representing the token
 * @throws an Error if token is not formatted as expected
 */
const decode = (token: string) => {
	// split the string up based on delimiter '.'
	const tokens = token.split('.');

	// retrieve only the 2nd one
	if (tokens.length !== 3) {
		throw new Error('Failed to Decode OIDC Token');
	}
	const infoToken = tokens[1];

	// decode the token
	const decodedToken = window.atob(infoToken);
	// const decodedToken = base64Decoder(infoToken);
	return JSON.parse(decodedToken);
};

let timer: NodeJS.Timeout;
/**
 * Main store used for authentication
 */
// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('auth', {
	state: () => ({
		userId: null,
		userToken: null as string | null,
		expires: null as number | null,
		name: null,
		email: null
	}),
	getters: {
		token: (state) => state.userToken,
		isAuthenticated: (state) => !!state.userToken
	},
	actions: {
		/**
		 * Retrieve access tokens from Keycloak
		 */
		async fetchSSO() {
			// const response = await fetch('/silent-check-sso.html', { cache: 'no-store' });
			// TODO: can this be done on the gateway so as not to expose the URL?
			const response =
				this.userToken !== null
					? await fetch(
							`/app/redirect_uri?refresh=http://localhost:8078/silent-check-sso.html&access_token=${this.userToken}`
					  )
					: await fetch('/silent-check-sso.html');

			if (!response.ok) {
				const error = new Error('Authentication Failed');
				throw error;
			}

			const accessToken = response.headers.get('OIDC_access_token');
			const expirationTimestamp =
				+(response?.headers?.get('OIDC_access_token_expires') ?? 0) * 1000;

			this.userToken = accessToken;

			if (accessToken) {
				const tokenInfo = decode(accessToken);

				this.name = tokenInfo.name;
				this.email = tokenInfo.email;

				// TODO: other info we can gather
				// preferred_username, given_name, family_name, realm_access.roles etc
			}

			const expiresIn = expirationTimestamp - new Date().getTime();
			timer = setTimeout(() => {
				this.autoRenew();
			}, expiresIn);
		},
		logout() {
			this.userId = null;
			this.userToken = null;
			this.name = null;
			this.email = null;
		},
		autoRenew() {
			console.log('RENEW SSO');
			clearTimeout(timer);
			// TODO: reenable when fixed
			this.fetchSSO();
			// this.logout();
		}
	}
});
