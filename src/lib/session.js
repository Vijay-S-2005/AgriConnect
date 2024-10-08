import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

// No need to declare IronSessionData interface in JS

const sessionOptions = {
    password: process.env.SESSION_PASSWORD, // Store this in .env file
    cookieName: "my-cookie-name",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 100
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
