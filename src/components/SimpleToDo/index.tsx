import React, {useCallback} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTodos, postToDo} from "./api";

const SimpleToDo = () => {
    const queryClient = useQueryClient();

    const query = useQuery(['todo'], getTodos)

    const mutation = useMutation(postToDo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['todo'])
        }
    })

    const onClick = useCallback(() => {
        const todo = prompt('To Do');
        if (todo) {
            mutation.mutate({
                id: Date.now().toString(),
                title: todo,
            })
        }
    }, [mutation]);

    return (
        <div>
            <ul>
                {
                    query.data?.map(todo => (
                        <li key={todo.id}>{todo.title}</li>
                    ))
                }
            </ul>
            <button
                onClick={onClick}
            >
                Add ToDo
            </button>
        </div>
    )
}

export default SimpleToDo;