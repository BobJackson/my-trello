import React, {createContext, Dispatch, FC, useContext} from "react";
import {AppState, appStateReducer, List, Task} from "./appStateReducer.ts";
import {Action} from "./actions.ts";
import {useImmerReducer} from "use-immer";

const appData: AppState = {
    lists: [
        {
            id: '0',
            text: 'To Do',
            tasks: [{id: 'c0', text: 'Generate app scaffold'}],
        },
        {
            id: '1',
            text: 'In Progress',
            tasks: [{id: 'c2', text: 'Learn Typescript'}],
        },
        {
            id: '2',
            text: 'Done',
            tasks: [{id: 'c3', text: 'Begin to use static typing'}],
        }
    ]
}

type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
)

interface AppProps {
    children?: React.ReactNode;
}

export const AppStateProvider: FC<AppProps> = ({children}) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)
    const {lists} = state

    const getTasksByListId = (id: string) => {
        return lists.find(list => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider value={{lists, getTasksByListId, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}
