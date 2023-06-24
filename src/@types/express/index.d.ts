import { IAccount } from "../../models/Account";
import { IClient } from "../../models/Client";
import { IProfessional } from "../../models/Professional";
import { IReturnApi } from "../../server";

declare global {
    namespace Express {

        export interface Request {
            auth_user?: IAccount;
        }

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }

}

