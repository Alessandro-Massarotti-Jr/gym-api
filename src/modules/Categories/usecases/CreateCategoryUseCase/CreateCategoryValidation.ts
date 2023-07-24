import { z } from "zod";

const createcategorySchema = z.object({
    name: z.string({ required_error: "nome é um campo obrigatorio" }),
    description: z.string().optional()
});

export class CreateCategoryValidation {
    static validate(data: z.infer<typeof createcategorySchema>): z.infer<typeof createcategorySchema> {


        const validateData = createcategorySchema.safeParse(data);

        if (!validateData.success) {
            throw new Error(validateData.error.errors[0].message);
        }

        return data;
    }
}
