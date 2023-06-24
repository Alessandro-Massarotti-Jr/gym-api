export interface IWorkoutExercise {
    id: string;
    exercise_id: string;
    workout_id: string;
    repetitions: number;
    repetitions_qtd: number;
    done: boolean;
    done_at?: Date;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
}