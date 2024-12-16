import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || "",
  ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID || "",
};

const userPool = new CognitoUserPool(poolData);

/**
 * Register a new user.
 */
export const registerUser = (
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

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          result?.user.getUsername() ||
            "Registration successful. Confirm your email."
        );
      }
    });
  });
};
