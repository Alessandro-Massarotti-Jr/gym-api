import { Request, Response } from "express";
import { UpdateProfileImageUseCase } from "./UpdateProfileImageUseCase";
import { container } from "tsyringe";
import { ApiError } from "../../../../errors/ApiError";

export class UpdateProfileImageController {

    async handle(req: Request, res: Response) {



        if (!req.file) {
            throw new ApiError("file é obrigatorio");
        }

        const account_id = req.auth_user!.id;
        const file = req.file.filename;

        const updateprofileimageUseCase = container.resolve(UpdateProfileImageUseCase);

        await updateprofileimageUseCase.execute({ account_id, profile_image: file });

        return res.returnApi({ data: null, message: "Foto de perfil atualizada com sucesso", developerMessage: "", statusHTTP: 200 });
    }
}