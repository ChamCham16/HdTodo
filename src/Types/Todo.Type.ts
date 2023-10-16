export interface ITodoWithoutID {
    title: string;
    description: string;
    done: boolean;
}

export interface ITodo extends ITodoWithoutID {
    id: string;
    createdAt: string;
}