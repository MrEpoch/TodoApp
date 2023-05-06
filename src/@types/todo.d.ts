export interface ChildrenProp {
    children: React.ReactNode
}

export type TodoContextType = {
    hiddenSidebar: boolean,
    setHiddenSidebar: React.Dispatch<React.SetStateAction<boolean>>
    currentMain: string,
    setCurrentMain: React.Dispatch<React.SetStateAction<string>>
    hiddenCreateItem: boolean,
    setHiddenCreateItem: React.Dispatch<React.SetStateAction<boolean>>
    hiddenCreateCollection: boolean,
    setHiddenCreateCollection: React.Dispatch<React.SetStateAction<boolean>>
    userFolder: [],
    setUserFolder: React.Dispatch<React.SetStateAction<[]>>
}

export type StorageContextType = {
    createLocalStorage: (folderName: string, folder: []) => void,
    readLocalStorage: (folderName: string) => [],
    addNewCollection: (folderName: string, folder: object) => void,
    insertIntoCollection: (folderName: string, collection: object, collectionName: string | undefined) => void,
    deleteLocalStorage: (folderName: string) => void,
    getCollection: (collectionName: string | undefined, folderName: string) => CollectionType,
}

export type CollectionType = {
    title: string,
    content: [],
    createdAt: string,
    id: string,
}

export type itemType = {
    title: string,
    date: string,
    id: string,
    date: string,
}