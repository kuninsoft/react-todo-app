import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type ListItem from "./ListItem";

export interface TodoItemsModel {
    todoItems: ListItem[];
    setTodoItems: Dispatch<SetStateAction<ListItem[]>>
}

export const TodoItemsContext = createContext<TodoItemsModel | undefined>(undefined);

export function useTodoContext() {
    const todoItems = useContext(TodoItemsContext);

    if (todoItems === undefined) {
        throw Error();
    }

    return todoItems;
}