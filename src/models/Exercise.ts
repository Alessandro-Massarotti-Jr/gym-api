export type ExercisesLevels = "BEGINNER" | "INTERMEDIARY" | "ADVANCED"

export interface IExercise {
    id: string;
    name: string;
    description?: string;
    category_id?: string;
    level: ExercisesLevels;
    cover_image?: String;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
}