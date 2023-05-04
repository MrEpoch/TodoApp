import "./dashboard.css"
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./TodoMain.css";

const listOfCollections = ["personal", "school", "social", "programming"];

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
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
                    {listOfCollections.map((collection, index) => {
                        const location = `/todo/${collection}`
                        return <Link to={location} className="dashboard-collections-container-list-item" key={index}>{collection}</Link>
                    }, [])}
                </div>
            </div>
        </section>
    )
}

export function DashboardMain() {

    const { hiddenSidebar, setCurrentMain } = useTodo() as TodoContextType;

    useEffect(() => {
        setCurrentMain("dashboard");
    })

    return (
        <main style={{ gridColumn: hiddenSidebar ? "1/3" : "2/3" }} className="dashboard-page-main">
            <div className="dashboard-page-main-heading">
                <h3>Dashboard</h3>
                <h1>Good morning, <span>User Name</span></h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-horizontal</title><path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg>
            </div>
        </main>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                    </button>
                    <input className="collection-template-top-TodoAdd-input" type="text" placeholder="Add a new todo" />
                </div>
            </div>
        </section>
    )
}

