

/*

fetcher that will be used alongside swr to make fetching HTTP requests.

The code below is for handling authentication and token refresh with wretch in the Next.js application. 

Extract Functions: Initially, it extracts handleJWTRefresh, storeToken, and getToken from the AuthActions utility, making these functions available for managing JWT tokens.
Configure API Requests: We define an api function that configures wretch for making authenticated requests to a backend server.
Token Management in Requests: The api function automatically adds an Authorization header with the access token obtained via getToken. If a request returns a 401 Unauthorized status, indicating an expired or invalid token, it attempts to refresh the token using handleJWTRefresh. This is where wretch is fabulous as it just requires a few lines of code to ensure that we can trigger the token refresh logic, using the catcher callback. You can see an example of how to do it with axioshere.
Handle Token Refresh: Upon a successful token refresh, we store the new access token using storeToken and retry the original request with the updated token. If the refresh fails or the retried request is unauthorized, we redirect the user to the Login page.
Fetcher Utility: Finally, we export a fetcher function that wraps the api logic for easy use with swr or other data-fetching libraries. This function is designed to make GET requests to a specified URL and automatically handle token refresh and error scenarios, providing seamless integration for authenticated data fetching in the application. This is the function that we will use alongside swr .
*/

import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "@/app/auth/utils";

// Extract necessary functions from the AuthActions utility.
const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return (
    wretch("http://localhost:8000")
      // Initialize authentication with the access token.
      .auth(`Bearer ${getToken("access")}`)
      // Catch 401 errors to refresh the token and retry the request.
      .catcher(401, async (error: WretchError, request: Wretch) => {
        try {
          // Attempt to refresh the JWT token.
          const { access } = (await handleJWTRefresh().json()) as {
            access: string;
          };

          // Store the new access token.
          storeToken(access, "access");

          // Replay the original request with the new access token.
          return request
            .auth(`Bearer ${access}`)
            .fetch()
            .unauthorized(() => {
              window.location.replace("/");
            })
            .json();
        } catch (err) {
          window.location.replace("/");
        }
      })
  );
};

export const fetcher = (url: string): Promise<any> => {
  return api().get(url).json();
};