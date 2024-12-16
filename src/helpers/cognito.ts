import {
  CognitoUserPool,
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

const userPool = new CognitoUserPool(poolData);
const cognitoClient = new CognitoIdentityProviderClient({
  region,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});

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
        // If adding to group fails, you might want to handle this
        // Optionally, you could remove the user if group addition fails
        reject(groupErr);
      }
    });
  });
};
