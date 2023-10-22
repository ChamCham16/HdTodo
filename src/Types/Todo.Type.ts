export interface ITodoWithoutID {
    title: string;
    description: string;
    done: boolean;
    images: string[];
}

export interface ITodo extends ITodoWithoutID {
    id: string;
    createdAt: string;
}