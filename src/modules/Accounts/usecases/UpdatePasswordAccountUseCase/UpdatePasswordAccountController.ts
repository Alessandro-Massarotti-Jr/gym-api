import { Request, Response } from "express";
import { UpdatePasswordAccountUseCase } from "./UpdatePasswordAccountUseCase";
import { UpdatePasswordAccountValidation } from "./UpdatePasswordAccountValidation";
import { container } from "tsyringe";

export class UpdatePasswordAccountController {
  async handle(req: Request, res: Response) {
    const { new_password, old_password } =
      UpdatePasswordAccountValidation.validate(req.body);

    const account_id = req.auth_user!.id;

    const updatepasswordaccountUseCase = container.resolve(
      UpdatePasswordAccountUseCase
    );

    await updatepasswordaccountUseCase.execute({
      new_password,
      old_password,
      account_id,
    });

    return res.returnApi({
      data: null,
      message: "Senha atualizada.",
      developerMessage: "",
      statusHTTP: 200,
    });
  }
}
