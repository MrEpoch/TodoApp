import { useEffect, useState, useRef } from "react";
import { useTodo } from "./TodoPage";
import { StorageContextType, TodoContextType, CollectionType, itemType } from "../@types/todo";
import { mainFolderName, useStorage } from "./tempLocalStorage";
import "./TodoPage.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function DashboardCollectionMain() {

    const { setCurrentMain, hiddenSidebar, setHiddenCreateCollection,  userFolder, setUserFolder } = useTodo() as TodoContextType;
    const { readLocalStorage, updateStarred } = useStorage() as StorageContextType;
    
    const [loading, setLoading] = useState<boolean>(true);
    const [all, setAll] = useState<boolean>(true);

    const favouritesRef = useRef<HTMLButtonElement>(null);
    const allRef = useRef<HTMLButtonElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentMain('collections');
    }, [readLocalStorage, setCurrentMain])

    useEffect(() => {
        if (all) {
            favouritesRef.current?.classList.remove("active-btn");
            allRef.current?.classList.add("active-btn");
        } else {
            favouritesRef.current?.classList.add("active-btn");
            allRef.current?.classList.remove("active-btn");
        }
    }, [all]);

    const styleCSS = hiddenSidebar ? "todo-page-main-collection full-page" : "todo-page-main-collection";

    function star(collection: CollectionType): void {
        try {
            updateStarred(mainFolderName, collection.id); 
            setUserFolder(readLocalStorage(mainFolderName));
        } catch (e) {
            console.log(e);
        }
        return;
    }

    function navigateCollection(collectionId: string): void {
        try {
            navigate("/todo/" + collectionId)
        } catch (e) {
            console.log(e);
            return;
        }
        return;
    }

    return (
        <main className={styleCSS}>

            <div className="todo-page-main-collection-header">
                <h1>Collections</h1>
                <div className="todo-page-main-collection-button-container">
                    <button ref={favouritesRef} onClick={() => { setAll(false) }}  className="todo-page-main-collection-button-favourites">Favourites</button>
                    <button ref={allRef} onClick={() => { setAll(true) }} className="todo-page-main-collection-button-all">All collections</button>
                </div>
            </div>
            <div className="todo-page-main-collection-content">
                {all && all ? userFolder.map((collection: CollectionType) => {
                    return (
                        <div key={collection.id} className="todo-page-main-collection-content-item">
                            <div onClick={() => { navigateCollection(collection.id) }} className="todo-page-main-collection-content-item-info">
                                <h2>{collection.title}</h2>
                                <p> {collection.content.filter((todo: itemType) => todo.completed).length}/{collection.content.length} done</p>
                            </div>
                            <div className="todo-page-main-collection-content-item-starContainer">
                                { collection.favourite ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }}  viewBox="0 0 24 24"><title>star</title><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg> 
                                    :   <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }} viewBox="0 0 24 24"><title>star-outline</title><path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>
                                }
                            </div>
                        </div>
                    )
                    
                    })
                : userFolder.filter((collection: CollectionType) => collection.favourite).map((collection: CollectionType) => {
                    return (
                        <div key={collection.id} className="todo-page-main-collection-content-item">
                            <div onClick={() => { navigateCollection(collection.id) }} className="todo-page-main-collection-content-item-info">
                                <h2>{collection.title}</h2>
                                <p> {collection.content.filter((todo: itemType) => todo.completed).length}/{collection.content.length} done</p>
                            </div>
                            <div className="todo-page-main-collection-content-item-starContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { star(collection) }} viewBox="0 0 24 24"><title>star</title><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
                            </div>
                        </div>
                    )
                    
                    })

                }
                 <div onClick={() => { setHiddenCreateCollection(prev => !prev) }} className="todo-page-main-collection-content-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                </div>
            </div>
        </main>
    )
}
