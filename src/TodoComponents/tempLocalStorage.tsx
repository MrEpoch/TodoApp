import React, { useContext } from "react";

type ChildrenProp = {
    children: React.ReactNode
}

export type StorageContextType = {
    createLocalStorage: (folderName: string, folder: []) => void,
    readLocalStorage: (folderName: string) => object | void,
    addNewCollection: (folderName: string, folder: object) => void,
    insertIntoCollection: (folderName: string, collection: object, index: number) => void,
    deleteLocalStorage: (folderName: string) => void
}

const StorageContext = React.createContext<StorageContextType | null>(null);

export function useStorage() {
    return useContext(StorageContext)
}


export default function StorageProvider({ children }: ChildrenProp) {

    const createLocalStorage = (folderName: string, folder: []) => {
         console.log("used")
         localStorage.setItem(folderName, JSON.stringify(folder));
         return;
    }

    const readLocalStorage = (folderName: string) => {
         const item = localStorage.getItem(folderName);
         if (!item) return;
         return JSON.parse(item);
    }

    const addNewCollection = (folderName: string, collection: object) => {
         const mainFolder = readLocalStorage(folderName);
         mainFolder.push(collection);
         localStorage.setItem(folderName, JSON.stringify(mainFolder));
         return;
    }

    const insertIntoCollection = ( folderName: string, collection: object, index: number) => {
        const mainFolder = readLocalStorage(folderName);
        mainFolder[index].content.push(collection);
        return;
    }

    const deleteLocalStorage = (folderName: string) => {
         localStorage.removeItem(folderName);
         return;
    }

    
    const storageMethods = {
        createLocalStorage,
        readLocalStorage,
        deleteLocalStorage,
        addNewCollection,
        insertIntoCollection
    }
    
    return (
        <StorageContext.Provider value={storageMethods}>
            {children}
        </StorageContext.Provider>
    )
} 


