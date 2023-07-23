export interface IWorkout {
    id: string;
    account_id: string;
    started: boolean;
    started_at?: Date;
    finished: boolean;
    finished_at?: Date;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
}