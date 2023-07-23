
import { inject, injectable } from "tsyringe";
import { IAccountsRepository, IUpdateProfileImageDTO } from "../../../../database/repositories/IAccountsRepository";
import { ApiError } from "../../../../errors/ApiError";
import { deleteFile } from "../../../../utils/deleteFile";

@injectable()
export class UpdateProfileImageUseCase {

    constructor(@inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }

    async execute({ account_id, profile_image }: IUpdateProfileImageDTO) {

        const account = await this.accountsRepository.findById(account_id);

        if (!account) {
            throw new ApiError("Conta não encontrada");
        }

        const image = `/uploads/accounts/${profile_image}`;

        await this.accountsRepository.updateProfileImage({ account_id, profile_image: image });

        if (account.profile_image) {
            await deleteFile(`.${account.profile_image}`);
        }

        return;
    }

}