import { Request, Response } from "express";
import { ForgotPasswordAccountUseCase } from "./ForgotPasswordAccountUseCase";
import { ForgotPasswordAccountValidation } from "./ForgotPasswordAccountValidation";
import { container } from "tsyringe";

export class ForgotPasswordAccountController {
  async handle(req: Request, res: Response) {
    const { email } = ForgotPasswordAccountValidation.validate(req.body);

    const forgotpasswordaccountUseCase = container.resolve(
      ForgotPasswordAccountUseCase
    );

    await forgotpasswordaccountUseCase.execute(email);

    return res.returnApi({
      data: null,
      message: "Geramos sua nova senha. Verifique seu e-mail",
      developerMessage: "",
      statusHTTP: 200,
    });
  }
}
