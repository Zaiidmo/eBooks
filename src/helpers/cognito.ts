import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { login, logout } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store"; 

const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || "",
  ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID || "",
};

const region = import.meta.env.VITE_AWS_COGNITO_REGION || "";

const cognitoClient = new CognitoIdentityProviderClient({
  region,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});

const userPool = new CognitoUserPool(poolData);

/**
 * Register a new user and add them to the 'users' group.
 */
export const registerUser = async (
  email: string,
  preferredUsername: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "preferred_username", Value: preferredUsername }),
    ];

    userPool.signUp(email, password, attributeList, [], async (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const username = result?.user?.getUsername();

      if (!username) {
        reject(new Error("Could not retrieve username"));
        return;
      }

      try {
        const addToGroupCommand = new AdminAddUserToGroupCommand({
          GroupName: "users",
          UserPoolId: poolData.UserPoolId,
          Username: username,
        });

        await cognitoClient.send(addToGroupCommand);

        resolve("Registration successful. Confirm your email.");
      } catch (groupErr) {
        reject(groupErr);
      }
    });
  });
};

/**
 * Confirm a user's registration with a confirmation code.
 */
export const confirmUser = async (
  email: string,
  confirmationCode: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve("Email confirmed successfully!: " + result);
    });
  });
};

/**
 * Authenticate a user, dispatch login action, and return their tokens.
 */
export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch // Use Redux dispatch
): Promise<{ idToken: string; accessToken: string; refreshToken: string }> => {
  return new Promise((resolve, reject) => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        // Dispatch login action with user data
        const user = {
          email,
          username: cognitoUser.getUsername(),
        };
        dispatch(login({ user, accessToken }));

        resolve({ idToken, accessToken, refreshToken });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * Logout the current user and dispatch logout action.
 */
export const logoutUser = (dispatch: AppDispatch) => {
  const currentUser = userPool.getCurrentUser();

  if (currentUser) {
    currentUser.signOut();
    console.log("User has been logged out successfully.");
  } else {
    console.warn("No user is currently logged in.");
  }

  // Dispatch logout action
  dispatch(logout());
};
