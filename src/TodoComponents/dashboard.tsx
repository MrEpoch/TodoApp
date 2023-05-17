import { useEffect, useRef, useState } from "react";
import  { useTodo } from "./TodoPage";
import { TodoContextType, itemType, CollectionType } from "../@types/todo";
import { ClipLoader } from "react-spinners";

export default function DashboardMain() {

    const { hiddenSidebar, setCurrentMain, userFolder } = useTodo() as TodoContextType;
    const dotRef = useRef<SVGSVGElement>(null);
    const arrRef = useRef<SVGSVGElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [today, setToday] = useState<CollectionType[] | []>([]);

    useEffect(() => {
        setCurrentMain("dashboard");
        setLoading(false);
    }, [setLoading, setCurrentMain]);

    useEffect(() => {
        try {
            setToday(userFolder.filter((collection: CollectionType) => {
                const date = new Date();
                const today = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                return today === collectionDay && month === collectionMonth && year === collectionYear;
        } catch(e) {

        }
    }, [userFolder]);

    const styleCSS = hiddenSidebar ? "todo-page-dashboard-main full-page" : "todo-page-dashboard-main";

    return (
        <main className={styleCSS}>
            {loading ? <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><ClipLoader color="#DD2616" loading={loading} size={150} /> </div> :  
            <div className="todo-page-dashboard-main-container"> 
                <div className="todo-page-dashboard-main-heading">
                    <h3>Dashboard</h3>
                    <h1>Good morning, <span>User Name</span></h1>
                    <svg ref={dotRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-horizontal</title><path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg>
                </div>
                <div className="todo-page-dashboard-main-todosOverview">
                    <div className="todo-page-dashboard-main-todosOverview-filter">
                        <button className="todo-page-dashboard-main-todosOverview-filter-daily">Daily tasks</button>
                        <button className="todo-page-dashboard-main-todosOverview-filter-longTerm">Long-term tasks</button>
                    </div>
                    <div className="todo-page-dashboard-main-todosContainer">
                        {userFolder.map((collection: CollectionType, index: any) => {
                            if (collection.content.length === 0) {
                                return
                            }
                            return (
                                    <div className="todo-page-dashboard-main-todos-item" key={index}>                                
                                        <div className="dashboard-main-todos-item-header">
                                            <h1>{collection.title}</h1>
                                            <svg ref={arrRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                        </div>
                                        <div className="dashboard-main-todos-item-body">
                                            {collection.content.map((item: itemType, index) => {
                                                return (
                                                    <div key={index} className="dashboard-main-todos-item-body-todoContainer">
                                                        <div className="dashboard-main-todos-item-body-todo-checkBox"></div>
                                                        <h3>{item.title}</h3>
                                                        <p>{item.date}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        
                                    </div>
                            )

                        })}
                    </div>
                </div>
            </div>
            }
        </main>
    )
}
