// eslint-disable-next-line import/no-extraneous-dependencies
import { Page, Route } from '@playwright/test';

export default async function authRoute(page: Page) {
	await page.route('**/silent-check-sso.html', (route: Route) => {
		route.fulfill({
			headers: {
				OIDC_access_token:
					'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPdVNmNy13aFVmM1FXSlp5elJmNS0wOWhIZ0ZSVVZsV1owZjRoMTVsZjFzIn0.eyJleHAiOjE2NjY4NDA3ODEsImlhdCI6MTY2Njg0MDQ4MSwiYXV0aF90aW1lIjoxNjY2ODQwNDgxLCJqdGkiOiIwYmNjZDU1Mi01ZDRjLTQxODMtOTE0OC1mNmYyMzdhZmEzZGIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwNzkvcmVhbG1zL1VuY2hhcnRlZCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5MDNiMzNiYy1mZjFmLTRiMWMtYmI1Ny04M2I2Y2ExNjgwYWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcHAiLCJub25jZSI6IjV2Y1cwRTFqRml0SGVXV0NURXBBT19Tdkd6Mk5WcENXZ1Vqd2EyZlFFQVUiLCJzZXNzaW9uX3N0YXRlIjoiNzFlMzE0NGMtOTMwOS00NWYwLWFlNGEtOWYyMWM4MWI5NWE2IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy11bmNoYXJ0ZWQiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjcxZTMxNDRjLTkzMDktNDVmMC1hZTRhLTlmMjFjODFiOTVhNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkxhZHkgVXJzdWxhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidXJzdWxhIiwiZ2l2ZW5fbmFtZSI6IkxhZHkiLCJmYW1pbHlfbmFtZSI6IlVyc3VsYSIsImVtYWlsIjoidXJzdWxhQHRlc3QuaW8ifQ.MolDWnuq1INUZiSmtcPfSvGLewn3dlRM69JsFrDFVQyEVBaBi1rIri-Hu3rE1IWH8y6k8TKvDeUm_dOPRqPVw1e-kHe5fBTlCtYSnLV7PmjpfCKHPBoomcg4B6YWfzvXDDhKcYbHuwfmenkD9xCmlDvbezxjawy2WmUW2nvNYALjXyJjP_D5HIToBNIZmJoEBE_ch55eIZO67tD1te-JLt_-jRePTbs3l3w5CEQCrC9R9zJmsYTjbBym3Z27VsyfWgUhOk1R1Z66vsTjIWSTL8oYBq1yf5oFmv_DXaBPgCZaginrTrqwO-niv6CNxxIAMFL5GWnM56oBSKm5U1cQtQ',
				OIDC_access_token_expires: '1666840782'
			},
			contentType: 'text/plain',
			body: 'Fake Authentication'
		});
	});
}
