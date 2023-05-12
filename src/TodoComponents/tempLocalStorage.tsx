import React, { useContext } from "react";
import { ChildrenProp, CollectionType, itemType, StorageContextType } from "../@types/todo";

const StorageContext = React.createContext<StorageContextType | null>(null);

export function useStorage() {
   return useContext(StorageContext)
}

export const mainFolderName = "Temp-testing-localstorage";

export default function StorageProvider({ children }: ChildrenProp) {


    const createLocalStorage = (folderName: string, folder: []) => {
         localStorage.setItem(folderName, JSON.stringify(folder));
         return;
    }

    const readLocalStorage = (folderName: string) => {
         const item = localStorage.getItem(folderName);
         if (!item) return;
         return JSON.parse(item);
    }

    const getCollection = (collectionName: string | undefined, folderName: string) => {
        const mainFolder = readLocalStorage(folderName);
        const collection = mainFolder.find((item: CollectionType) => item.title === collectionName);
        return collection;
    }

    const addNewCollection = (folderName: string, collection: object) => {
         const mainFolder = readLocalStorage(folderName);
         mainFolder.push(collection);
         localStorage.setItem(folderName, JSON.stringify(mainFolder));
         return;
    }

    const insertIntoCollection = (folderName: string, collection: object, collectionName: string | undefined) => {
        const mainFolder = readLocalStorage(folderName);
        const index = mainFolder.findIndex((item: CollectionType) => item.title === collectionName);
        mainFolder[index].content.push(collection);
        localStorage.setItem(folderName, JSON.stringify(mainFolder));
        return;
    }

    const updateTodo = (folderName: string, todo: object, collectionName: string, id: string) => {
        const mainFolder = readLocalStorage(folderName);
        const index = mainFolder.findIndex((item: CollectionType) => item.title === collectionName);
        const todoIndex = mainFolder[index].content.findIndex((item: itemType) => item.id === id);
        mainFolder[index].content[todoIndex] = todo;
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
        insertIntoCollection,
        getCollection,
        updateTodo
    }
    
    return (
        <StorageContext.Provider value={storageMethods}>
            {children}
        </StorageContext.Provider>
    )
} 


