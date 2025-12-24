import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

/**
 * User interface for authenticated requests
 */
interface User {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  isMentor?: boolean;
}

/**
 * Extend Express Request to include user property
 */
export interface RequestWithUser extends ExpressRequest {
  user?: {
    _id: string;
    firstName: string;
    surname: string;
    email: string;
    isMentor?: boolean;
  };
}

// Declare the global namespace extension properly
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        firstName: string;
        surname: string;
        email: string;
        isMentor?: boolean;
      };
    }
  }
}

// Export the types - but don't combine Request with User
export type Request = RequestWithUser;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;
