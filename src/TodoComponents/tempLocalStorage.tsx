import React, { useContext } from "react";

type ChildrenProp = {
    children: React.ReactNode
}

type StorageContextType = {
    createLocalStorage: (folderName: string, folder: []) => void,
    readLocalStorage: (folderName: string) => object | void,
    updateLocalStorage: (folderName: string, folder: []) => void,
    deleteLocalStorage: (folderName: string) => void
}

const StorageContext = React.createContext<StorageContextType | null>(null);

export function useStorage() {
    return useContext(StorageContext)
}


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

    const updateLocalStorage = (folderName: string, folder: []) => {
         localStorage.setItem(folderName, JSON.stringify(folder));
         return;
    }

    const deleteLocalStorage = (folderName: string) => {
         localStorage.removeItem(folderName);
         return;
    }

    
    const storageMethods = {
        createLocalStorage,
        readLocalStorage,
        updateLocalStorage,
        deleteLocalStorage
    }
    
    return (
        <StorageContext.Provider value={storageMethods}>
            {children}
        </StorageContext.Provider>
    )
} 


