import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", "./uploads", folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(36).toString("hex");
                    const fileName = `${fileHash}-${file.originalname.replaceAll(' ', '-')}`;

                    return callback(null, fileName);
                }
            }),
        }
    }
}