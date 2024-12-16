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
    // Add required attributes: email and preferred_username
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({
        Name: "preferred_username",
        Value: preferredUsername,
      }),
    ];


    userPool.signUp(email, password, attributeList, [], async (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      // Safely access the username
      const username = result?.user?.getUsername();

      if (!username) {
        reject(new Error("Could not retrieve username"));
        return;
      }

      try {
        // Add user to 'users' group
        const addToGroupCommand = new AdminAddUserToGroupCommand({
          GroupName: "users",
          UserPoolId: poolData.UserPoolId,
          Username: username,
        });

        await cognitoClient.send(addToGroupCommand);

        resolve("Registration successful. Confirm your email.");
      } catch (groupErr) {
        // If adding to group fails, handle the error appropriately
        reject(groupErr);
      }
    });
  });
};

/**
 * Confirm a user's registration with a confirmation code.
 */
export const confirmUser = async (email: string, confirmationCode: string): Promise<string> => {
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
 * Authenticate a user and return their tokens.
 */
export const loginUser = async (email: string, password: string): Promise<{ idToken: string; accessToken: string; refreshToken: string }> => {
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
        resolve({
          idToken: result.getIdToken().getJwtToken(),
          accessToken: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
