import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { Response } from "../@types";



function verifyJWT(req: any, res: Response, next: NextFunction):any {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, payload: "Invalid token" });

  jwt.verify(
    token,
    config.jwtSecret,
    (err: Error | null, decoded: any): any => {
      if (err) {
        return res.status(403).json({
          success: false,
          payload: "Invalid session",
        });
      }
      req.user = decoded.user;

      next();
    }
  );
}





export  default{ verifyJWT };
