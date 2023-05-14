import { useEffect, useState } from "react";
import { useTodo } from "./TodoPage";
import { StorageContextType, TodoContextType, CollectionType, itemType } from "../@types/todo";
import { mainFolderName, useStorage } from "./tempLocalStorage";

export default function DashboardCollectionMain() {

    const { setCurrentMain, hiddenSidebar } = useTodo() as TodoContextType;
    const { readLocalStorage, updateStarred } = useStorage() as StorageContextType;

    const [collections, setCollections] = useState<CollectionType[]>(readLocalStorage(mainFolderName));
    const [all, setAll] = useState<boolean>(true);


    useEffect(() => {
        setCurrentMain('collections');
        setCollections(readLocalStorage(mainFolderName));
    }, [setCollections, readLocalStorage, setCurrentMain])

    const styleCSS = hiddenSidebar ? "todo-page-main-collection full-page" : "todo-page-main-collection";

    function star(collection: CollectionType) {
        collection.favourite = !collection.favourite;
        updateStarred(mainFolderName, collection.title); 
        setCollections(readLocalStorage(mainFolderName));
    }

    return (
        <main className={styleCSS}>
            <div className="todo-page-main-collection-header">
                <h1>Collections</h1>
                <div className="todo-page-main-collection-button-container">
                    <button onClick={() => { setAll(false) }}  className="todo-page-main-collection-button-favourites">Favourites</button>
                    <button onClick={() => { setAll(true) }} className="todo-page-main-collection-button-all">All collections</button>
                </div>
            </div>
            <div className="todo-page-main-collection-content">
                {all ? collections.map((collection: CollectionType) => {
                    return (
                        <div key={collection.id} className="todo-page-main-collection-content-item">
                            <h2>{collection.title}</h2>
                            <p> {collection.content.filter((todo: itemType) => todo.completed).length}/{collection.content.length} done</p>
                            { collection.favourite ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }}  viewBox="0 0 24 24"><title>star</title><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg> 
                                :   <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }} viewBox="0 0 24 24"><title>star-outline</title><path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>
                            }
                        </div>
                    )
                    
                    })
                : collections.filter((collection: CollectionType) => collection.favourite).map((collection: CollectionType) => {
                    return (
                        <div key={collection.id} className="todo-page-main-collection-content-item">
                            <h2>{collection.title}</h2>
                            <p> {collection.content.filter((todo: itemType) => todo.completed).length}/{collection.content.length} done</p>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }} viewBox="0 0 24 24"><title>star</title><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
                        </div>
                    )
                    
                    })

                }                
            </div>
        </main>
    )
}
