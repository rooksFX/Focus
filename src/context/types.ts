interface ITask {
    id: string;
    detail: string;
    order: number;
    status: 'todo' | 'wip' | 'done';
}