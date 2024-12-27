import { loginService, logoutService } from "../service/auth.service";
import { Request } from "../@types/index";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Response } from "express";


export const loginCtrl = asyncWrapper( (req: Request, res: Response):any => {
  const { username, password } = req.body;

  const response =  loginService(username, password);

  return res.status(200).json({
    success: true,
    payload: response,
  });
});


