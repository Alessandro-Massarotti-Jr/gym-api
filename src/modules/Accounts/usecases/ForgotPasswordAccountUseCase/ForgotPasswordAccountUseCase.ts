import { inject, injectable } from "tsyringe";
import { ApiError } from "../../../../errors/ApiError";
import crypto from "crypto";
import { sendForgotPasswordMail } from "../../../../mail/triggers/sendForgotPasswordMailTrigger";
import { hash } from "bcrypt";
import { IAccountsRepository } from "../../../../database/repositories/IAccountsRepository";

@injectable()
export class ForgotPasswordAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) { }

  async execute(user_email: string) {
    const account = await this.accountsRepository.findByEmail(user_email);

    if (!account) {
      throw new ApiError("Nenhuma conta encontrada com este e-mail.");
    }

    const password = crypto.randomBytes(14).toString("base64").slice(0, 14);

    const respEmail = await sendForgotPasswordMail(password, user_email);

    if (respEmail.rejected.length > 0) {
      throw new ApiError("Erro ao enviar e-mail");
    }

    const passwor_hash = await hash(password, 8);

    await this.accountsRepository.updatePassword({
      account_id: account.id,
      new_password: passwor_hash,
    });

    return;
  }
}
