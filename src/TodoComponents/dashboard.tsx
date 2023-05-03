import "./dashboard.css"

const listOfCollections = ["personal", "school", "social", "programming"];

export default function Dashboard() {
    return (
        <section className="dashboard-page">
            <DashboardHeader />
            <DashboardSideBar />
            <DashboardMain />
        </section> 
    )
}

function DashboardHeader() {
    return (
            <header className="dashboard-page-header">
                <div className="dashboard-page-header-TodosControls">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg> 
                  <div className="dashboard-page-header-TodoControls-Collections">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder</title><path fill="currentColor"d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>
                    Collections
                  </div>
                </div>
                <div className="dashboard-page-header-UserControls">
                    <div className="dashboard-page-header-UserControls-addNew">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor"d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                    </div>
                    <div className="dashboard-page-header-UserControls-Search">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magnify</title><path fill="currentColor"d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                    </div>
                    <div className="dashboard-page-header-UserControls-Profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path fill="currentColor"d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                    </div>
                </div>
            </header> 
    )
}

function DashboardSideBar() {
    return (
        <section className="dashboard-page-sidebar">
            <div className="dashboard-collections-container">
                <h3 className="dashboard-collections-container-header">Collections</h3>
                <div className="dashboard-collections-container-list">
                    {listOfCollections.map((collection, index) => {
                        return <h3 className="dashboard-collections-container-list-item" key={index}>{collection}</h3>
                    }, [])}
                </div>
            </div>
        </section>
    )
}

function DashboardMain() {
    return (
        <main className="dashboard-page-main">
            <div className="dashboard-page-main-TodoList">
                <div className="dashboard-page-main-TodoList-Header"> 
                    <button className="dashboard-page-main-TodoList-Header-ReturnButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path fill="currentColor"d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                    </button>
                    <h2 className="dashboard-page-main-TodoList-header-h2">Temporary</h2>
                </div>
                <div className="dashboard-page-main-TodoList-TodoAdd">
                    <button className=" dashboard-page-main-TodoList-TodoAdd-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor"d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                    </button>
                    <input className="dashboard-page-main-TodoList-TodoAdd-input" type="text" placeholder="Add a new todo" />
                </div>
            </div>
        </main>
    )
}
