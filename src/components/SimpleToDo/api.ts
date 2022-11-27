export type ToDo = {
    id: string;
    title: string;
};

const StorageKey = 'ToDo';

export const getTodos = (): ToDo[] => {
    const data = window.sessionStorage.getItem(StorageKey);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

export const postToDo = (todo: ToDo): Promise<void> => {
    const data = getTodos();
    data.push(todo);
    window.sessionStorage.setItem(StorageKey, JSON.stringify(data));
    return Promise.resolve();
}

