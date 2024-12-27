import { asyncWrapper } from "../middleware/asyncWrapper";
import { profileService } from "../../src/service/user.service";
import { Request, Response } from "../@types";


export const profileCtrl = asyncWrapper((req: Request, res: Response): any => {
  const { username } = req.user;
  const response = profileService(username);

  return res.status(200).json({
    success: true,
    payload: response,
  });
});
