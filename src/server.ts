import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import "./container"
import { routes } from "./routes";
import { ApiError } from "./errors/ApiError";
import "dotenv/config";
import path from "path";
import cors from "cors";
import { log } from "./utils/log";

export interface IReturnApi {
    message?: string | null;
    developerMessage?: string | null | undefined;
    data?: object | null;
    statusHTTP?: number;
}

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.returnApi = (data: IReturnApi): Response => {

        const returnData = {
            data: data.data ?? null,
            statusHTTP: data.statusHTTP ?? 200,
            message: data.message ?? "",
            developerMessage: data.developerMessage ?? ""
        };

        return res.status(returnData.statusHTTP).json(returnData);
    }
    next();
});


app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, '../uploads')));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.returnApi({
            data: null,
            developerMessage: err.message,
            message: err.message,
            statusHTTP: err.statusCode
        });
    }
    return res.returnApi({
        data: null,
        developerMessage: err.message,
        message: err.message,
        statusHTTP: 500
    })

});

app.use(function (req, res, next) {
    res.returnApi({ statusHTTP: 404, message: "Rota não encontrada" });
});


export const startServer = () => {
    const server = app.listen(process.env.PORT ?? 3000, () => log(`listen on http://127.0.0.1:${process.env.PORT ?? 3000}`));

    function shutDown() {
        return (signal: NodeJS.Signals) => {
            server.close(() => {
                log('Http Server closed');
                process.exit();
            });
        }
    }

    process.on('unhandledRejection', (error) => {
        log("unhandled Promise Rejection");
        console.log(error);
    });

    process.on('uncaughtException', (error, origin) => {
        log("unhandled Exception");
        console.log(error);
    })

    process.on('SIGINT', shutDown());

    process.on('SIGTERM', shutDown());
}