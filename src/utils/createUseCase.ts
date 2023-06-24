import fs from 'fs';
import path from 'path';
import { log } from './log';

const useCasePath = process.argv[2];
const useCaseName = path.basename(useCasePath);
const folderNames = useCasePath.split("/");

if (folderNames.length < 2) {
    log("Error: inform argument like 'Folder/Funcionality'");
} else {
    folderNames.pop();
    const folderPath = folderNames.join("/");
    console.log(folderPath);

    async function createUseCase() {

        const useCaseTemplate = `
        import { inject, injectable } from "tsyringe";
    
        @injectable()
        export class ${useCaseName}UseCase {
            
            constructor(@inject("ExampleRepository") private exampleRepository:IExampleRepository){}
    
            async execute(){
    
                // Implement your use case logic here
    
                throw new Error("Method not implemented");
    
                return;
            }
    
           }`;

        const filePath = `src/modules/${folderPath}/usecases/${useCaseName}UseCase/${useCaseName}UseCase.ts`;

        try {
            const stat = await fs.promises.stat(filePath);
            log(`UseCase already exists ${filePath} `);
        } catch {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFile(filePath, useCaseTemplate, (err) => {
                if (err) {
                    log('Error creating use case file');
                } else {
                    log(`Use case file ${filePath} created successfully!`);
                }
            });
        }

    }

    async function createController() {

        const useCaseTemplate = `import { Request, Response } from "express";
        import { ${useCaseName}UseCase } from "./${useCaseName}UseCase";
        import { ${useCaseName}Validation } from "./${useCaseName}Validation";
        import { container } from "tsyringe";
        
        export class ${useCaseName}Controller {
        
            async handle(req: Request, res: Response) {
          
                const data = ${useCaseName}Validation.validate(req.body);
        
                const ${useCaseName.toLowerCase()}UseCase = container.resolve(${useCaseName}UseCase);
        
        
                await ${useCaseName.toLowerCase()}UseCase.execute();
        
                return res.returnApi({ data: null, message: "", developerMessage: "", statusHTTP: 200 });
            }
        }`;


        const filePath = `src/modules/${folderPath}/usecases/${useCaseName}UseCase/${useCaseName}Controller.ts`;

        try {
            const stat = await fs.promises.stat(filePath);
            log(`Controller already exists ${filePath} `);
        } catch {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFile(filePath, useCaseTemplate, (err) => {
                if (err) {
                    log('Error creating controller file');
                } else {
                    log(`Controller file ${filePath} created successfully!`);
                }
            });
        }

    }

    async function createValidation() {

        const useCaseTemplate = `  import { z } from "zod";
        
        const ${useCaseName.toLowerCase()}Schema = z.object({});

       export class ${useCaseName}Validation {
            static validate(data:z.infer<typeof ${useCaseName.toLowerCase()}Schema>):z.infer<typeof ${useCaseName.toLowerCase()}Schema> {
               
        
                const validateData = ${useCaseName.toLowerCase()}Schema.safeParse(data);
        
                if (!validateData.success) {
                    throw new Error(validateData.error.errors[0].message);
                }
        
                return data;
            }
        }
        `;


        const filePath = `src/modules/${folderPath}/usecases/${useCaseName}UseCase/${useCaseName}Validation.ts`;

        try {
            const stat = await fs.promises.stat(filePath);
            log(`Validation already exists ${filePath} `);
        } catch {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFile(filePath, useCaseTemplate, (err) => {
                if (err) {
                    log('Error creating validation file');
                } else {
                    log(`validation file ${filePath} created successfully!`);
                }
            });
        }

    }

    createUseCase();
    createValidation();
    createController();
}