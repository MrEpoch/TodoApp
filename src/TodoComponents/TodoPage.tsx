import "./dashboard.css"
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./TodoMain.css";
import StorageProvider, { StorageContextType, useStorage } from "./tempLocalStorage";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const listOfCollectionsSchema = [
    { title: "home", createdAt: new Date(), content: [{ task: "take thrash out", createdAt: new Date().toString()}]},
    { title: "school", createdAt: new Date(), content: [] },
    { title: "personal", createdAt: new Date(), content: [] },
    { title: "programming", createdAt: new Date(), content: [] }
]

type ChildrenProp = {
    children: React.ReactNode
}

type TodoContextType = {
    hiddenSidebar: boolean,
    setHiddenSidebar: React.Dispatch<React.SetStateAction<boolean>>
    currentMain: string,
    setCurrentMain: React.Dispatch<React.SetStateAction<string>>
}

const TodoContext = React.createContext<TodoContextType | null>(null);

export function useTodo() {
    return useContext(TodoContext);
}

export default function TodoApp({ children }: ChildrenProp) {

    const [hiddenSidebar, setHiddenSidebar] = useState<boolean>(false);
    const [currentMain, setCurrentMain] = useState<string>("dashboard");

    return (
        <TodoContext.Provider value={{ setHiddenSidebar, hiddenSidebar, currentMain, setCurrentMain }}>
                <section className="dashboard-page">
                    <DashboardHeader />
                    <DashboardSideBar />
                    {children}
                </section>
        </TodoContext.Provider>
    )
}

function DashboardHeader() {

    const headerCollection = useRef<HTMLDivElement>(null);
    const headerDashboard = useRef<HTMLDivElement>(null);
    const addReference = useRef<SVGSVGElement>(null);
    const [display, setDisplay] = useState<boolean>(false)

    const { setHiddenSidebar, currentMain } = useTodo() as TodoContextType;

    useEffect(() => {
        if (currentMain === "dashboard") {
            headerDashboard.current?.style.setProperty("color", "white");
            headerCollection.current?.style.setProperty("color", "darkgray")
        } else if (currentMain === "collections") {
            headerDashboard.current?.style.setProperty("color", "darkgray")
            headerCollection.current?.style.setProperty("color", "white")
        } else if (currentMain === "none") {
            headerDashboard.current?.style.setProperty("color", "darkgray")
            headerCollection.current?.style.setProperty("color", "darkgray")
        }

    }, [currentMain]);


    return (
        <header className="dashboard-page-header">
            {display ? <AddItem /> : null}
            <div className="dashboard-page-header-TodosControls">
                <svg onClick={() => setHiddenSidebar(prev => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                <div ref={headerDashboard} className="dashboard-page-header-TodoControls-Dashboard">
                    <Link to="/todo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>view-dashboard</title><path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" /></svg>
                        Dashboard
                    </Link>
                </div>
                <div ref={headerCollection} className="dashboard-page-header-TodoControls-Collections">
                    <Link to="/todo/collections">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder</title><path fill="currentColor" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>
                        Collections
                    </Link>
                </div>
            </div>
            <div className="dashboard-page-header-UserControls">
                <div className="dashboard-page-header-UserControls-addNew">
                    <svg ref={addReference} onClick={() => { setDisplay(prev => !prev) }} xmlns="http://www.w4.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                </div>
                <div className="dashboard-page-header-UserControls-Search">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magnify</title><path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                </div>
                <div className="dashboard-page-header-UserControls-Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                </div>
            </div>
        </header>
    )
}

function DashboardSideBar() {

    const { hiddenSidebar } = useTodo() as TodoContextType;

    const cssSidebar = hiddenSidebar ? "dashboard-page-sidebar hidden" : "dashboard-page-sidebar";

    return (
        <section className={cssSidebar}>
            <div className="dashboard-page-sidebar-container">
                <h3 className="dashboard-collections-container-header">Collections</h3>
                <div className="dashboard-collections-container-list">
                    {listOfCollectionsSchema.map((collection, index) => {
                        const location = `/todo/${collection.title}`
                        return <Link to={location} className="dashboard-collections-container-list-item" key={index}>{collection.title}</Link>
                    }, [])}
                </div>
            </div>
        </section>
    )
}

export function DashboardCollectionMain() {

    const { setCurrentMain, hiddenSidebar } = useTodo() as TodoContextType;

    useEffect(() => {
        setCurrentMain('collections');
    })

    return (
        <main style={{ gridColumn: hiddenSidebar ? "1/3" : "2/3" }} className="dashboard-page-main-collection">
            This is Collection
        </main>
    )
}

export function TemplateTodoList() {

    const { setCurrentMain } = useTodo() as TodoContextType;

    setCurrentMain("none")

    return (
        <section className="todo-page-main-collection-template">
            <div className="dashboard-page-main-collection-template-top">
                <div className="collection-template-top-Header">
                    <button className="collection-template-top-Header-ReturnButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                    </button>
                    <h2 className="collection-template-top-Header-h2">Temporary</h2>
                </div>
                <div className="collection-template-top-TodoAdd">
                    <button className="collection-template-top-TodoAdd-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M21,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                    </button>
                    <input className="collection-template-top-TodoAdd-input" type="text" placeholder="Add a new todo" />
                </div>
            </div>
        </section>
    )
}


export function AddCollection() {

    const { setCurrentMain } = useTodo() as TodoContextType;

    const { addNewCollection } = useStorage() as StorageContextType;

    const collectionRef = useRef<HTMLInputElement>(null);

    const titleRef = useRef<HTMLInputElement>(null);

    function todoCollectionSubmitHandler(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault();

        collectionRef.current;
        
        if (!titleRef.current) return;

        try {
            addNewCollection("Temp-testing-localstorage", {title: titleRef.current.value, createdAt: new Date(), content: []})
        } catch (e) {
            console.log(e)
        }
    }

    setCurrentMain("plus")

    return (
        <section className="todo-page-addCollection-popUp">
           <form onSubmit={(e) => { todoCollectionSubmitHandler(e) }} className="todo-page-addCollection-popUp-container"> 
                <h2 className="todo-page-addCollection-popUp-container-header">Create new collection</h2>
                <label className="todo-page-addCollection-popUp-container-label">Collection name</label>
                <input ref={titleRef} className="todo-page-addCollection-popUp-container-input" type="text" placeholder="Collection name" />
                <div className="todo-page-addCollection-popUp-container-buttons">
                    <button className="todo-page-addCollection-popUp-container-buttons-cancel">Cancel</button>
                    <button className="todo-page-addCollection-popUp-container-buttons-create">Create</button>
                </div>
            </form>
        </section>
    )
}

export function AddItem() {

    const { insertIntoCollection } = useStorage() as StorageContextType;

    const [onChangeVal, setOnChange] = useState(new Date());

    const titleRef = useRef<HTMLInputElement>(null);


    function todoItemSubmitHandler() {
        const datePicker = document.querySelector(".addItem-popUp-DatePicker");
        if (!titleRef.current) return;
        if (titleRef.current.value.length > 40) return;
        
        try {
            const todoItem = {
                createdAt: new Date(),
                title: titleRef.current.value,
                date: datePicker
            }
            insertIntoCollection("Temp-testing-localstorage", todoItem)


        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <section className="todo-page-addItem-popUp">
           <form onSubmit={(e) => { e.preventDefault(); todoItemSubmitHandler()}} className="todo-page-addItem-popUp-container"> 
                <h2 className="todo-page-addItem-popUp-container-header">Add new todo</h2>
                <label className="todo-page-addItem-popUp-container-label">Todo title</label>
                <input className="todo-page-addItem-popUp-container-input" type="text" placeholder="Todo title" />
                <DateTimePicker className="addItem-popUp-DatePicker" onChange={(e: any) => { setOnChange(e) }} value={onChangeVal} />
                <button className="todo-page-addItem-popUp-container-buttons-cancel">Cancel</button>
                <button className="todo-page-addItem-popUp-container-buttons-create" type="submit">Create</button>
            </form>
        </section>
    )
}
