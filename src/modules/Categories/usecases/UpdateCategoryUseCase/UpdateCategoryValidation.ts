import { z } from "zod";

const updatecategorySchema = z.object({
    name: z.string({ required_error: "nome é um campo obrigatorio" }),
    description: z.string().optional()
});

export class UpdateCategoryValidation {
    static validate(data: z.infer<typeof updatecategorySchema>): z.infer<typeof updatecategorySchema> {


        const validateData = updatecategorySchema.safeParse(data);

        if (!validateData.success) {
            throw new Error(validateData.error.errors[0].message);
        }

        return data;
    }
}
