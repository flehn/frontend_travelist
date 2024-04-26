// src/app/auth/utils.ts
import wretch from "wretch";
import Cookies from "js-cookie";

// Base API setup for making HTTP requests
const api = wretch("http://localhost:8000").accept("application/json");

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
    Cookies.set(type + "Token", token);
  };
  
  /**
   * Retrieves a token from cookies.
   * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
   * @returns {string | undefined} The token, if found.
   */
  const getToken = (type: string) => {
    return Cookies.get(type + "Token");
  };
  
  /**
   * Removes both access and refresh tokens from cookies.
   */
  const removeTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };


  /**
   * register: This method sends a POST request to create a new user account with the provided email, username, and password.
login: Initiates a POST request to authenticate a user by sending their email and password, expecting to receive JWT tokens upon successful authentication.
logout: Executes a POST request to log the user out by sending the refresh token to the server, where it will be invalidated.
handleJWTRefresh: Sends a POST request with the refresh token to obtain a new access token, ensuring the user remains authenticated without re-entering credentials.
resetPassword: Triggers a POST request to initiate the password reset process by sending the user's email to the server, which then sends a password reset link.
resetPasswordConfirm: Completes the password reset process by sending a POST request with the new password, confirmation of the new password, token, and user ID to validate and update the user's password.
   */

  
  const register = (email: string, username: string, password: string) => {
    return api.post({ email, username, password }, "/auth/users/");
  };
  
  const login = (email: string, password: string) => {
    return api.post({ username: email, password }, "/auth/jwt/create");
  };
  
  const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/logout/");
  };
  
  const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
  };
  
  const resetPassword = (email: string) => {
    return api.post({ email }, "/auth/users/reset_password/");
  };
  
  const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
  ) => {
    return api.post(
      { uid, token, new_password, re_new_password },
      "/auth/users/reset_password_confirm/"
    );
  };

  export const AuthActions = () => {
    return {
      login,
      resetPasswordConfirm,
      handleJWTRefresh,
      register,
      resetPassword,
      storeToken,
      getToken,
      logout,
      removeTokens,
    };
  };