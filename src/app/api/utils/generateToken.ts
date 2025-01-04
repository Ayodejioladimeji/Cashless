import jwt from "jsonwebtoken";

interface TokenPayload {
  [key: string]: any;
}

export const createAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const createRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const createActivationToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};
