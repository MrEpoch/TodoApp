import "./dashboard.css";
import "./mobileDashboard.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TodoMain.css";
import { useStorage } from "./tempLocalStorage";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { mainFolderName } from "./tempLocalStorage";
import { uid } from "uid";
import {
  ChildrenProp,
  TodoContextType,
  StorageContextType,
  CollectionType,
  itemType,
} from "../@types/todo";

const TodoContext = React.createContext<TodoContextType | null>(null);

export function useTodo() {
  return useContext(TodoContext);
}

export default function TodoApp({ children }: ChildrenProp) {
  const { readLocalStorage } = useStorage() as StorageContextType;

  const [userFolder, setUserFolder] = useState<CollectionType[] | []>([]);
  const [hiddenSidebar, setHiddenSidebar] = useState<boolean>(true);
  const [currentMain, setCurrentMain] = useState<string>("dashboard");
  const [hiddenCreateItem, setHiddenCreateItem] = useState<boolean>(true);
  const [hiddenCreateCollection, setHiddenCreateCollection] =
    useState<boolean>(true);
  const [collectionsId, setCollectionsId] = useState<string[] | [] | boolean[]>([false]);
  
  useEffect(() => {
    setUserFolder(readLocalStorage(mainFolderName));

  }, [setUserFolder, readLocalStorage]);

  useEffect(() => {
    setCollectionsId(
      userFolder.map((collection: CollectionType) => collection.id)
    );
  }, [setCollectionsId, userFolder]);

  const todoValue = {
    setHiddenSidebar,
    hiddenSidebar,
    currentMain,
    setCurrentMain,
    setHiddenCreateCollection,
    setHiddenCreateItem,
    hiddenCreateCollection,
    hiddenCreateItem,
    userFolder,
    setUserFolder,
    collectionsId,
    setCollectionsId,
  };
  return (
    <TodoContext.Provider value={todoValue}>
      <section className="dashboard-page">
        <DashboardHeader />
        <DashboardSideBar />
        {hiddenCreateItem ? "" : <AddItem />}
        {hiddenCreateCollection ? "" : <AddCollection />}
        {children}
      </section>
    </TodoContext.Provider>
  );
}

function DashboardHeader() {
  const headerCollection = useRef<HTMLDivElement>(null);
  const headerDashboard = useRef<HTMLDivElement>(null);
  const addReference = useRef<SVGSVGElement>(null);

  const { setHiddenSidebar, currentMain, setHiddenCreateCollection } =
    useTodo() as TodoContextType;

  useEffect(() => {
    if (currentMain === "dashboard") {
      headerDashboard.current?.style.setProperty("color", "white");
      headerCollection.current?.style.setProperty("color", "darkgray");
    } else if (currentMain === "collections") {
      headerDashboard.current?.style.setProperty("color", "darkgray");
      headerCollection.current?.style.setProperty("color", "white");
    } else if (currentMain === "none") {
      headerDashboard.current?.style.setProperty("color", "darkgray");
      headerCollection.current?.style.setProperty("color", "darkgray");
    }
  }, [currentMain]);

  return (
    <header className="dashboard-page-header">
      <div className="dashboard-page-header-TodosControls">
        <svg
          onClick={() => setHiddenSidebar((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          tabIndex={0}
        >
          <title>menu</title>
          <path
            fill="currentColor"
            d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
          />
        </svg>
        <div
          ref={headerDashboard}
          className="dashboard-page-header-TodoControls-Dashboard"
        >
          <Link to="/todo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>view-dashboard</title>
              <path
                fill="currentColor"
                d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
              />
            </svg>
            Dashboard
          </Link>
        </div>
        <div
          ref={headerCollection}
          className="dashboard-page-header-TodoControls-Collections"
        >
          <Link to="/todo/collections">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>folder</title>
              <path
                fill="currentColor"
                d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"
              />
            </svg>
            Collections
          </Link>
        </div>
      </div>
      <div className="dashboard-page-header-UserControls">
        <div className="dashboard-page-header-UserControls-addNew">
          <svg
            tabIndex={0}
            ref={addReference}
            onClick={() => {
              setHiddenCreateCollection((prev) => !prev);
            }}
            xmlns="http://www.w4.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>plus</title>
            <path
              fill="currentColor"
              d="M20,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </div>
        <div className="dashboard-page-header-UserControls-Profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>account</title>
            <path
              fill="currentColor"
              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

function DashboardSideBar() {
  const { hiddenSidebar, userFolder } = useTodo() as TodoContextType;

  const cssSidebar = hiddenSidebar
    ? "dashboard-page-sidebar hidden"
    : "dashboard-page-sidebar";

  return (
    <section className={cssSidebar}>
      <div className="dashboard-page-sidebar-container">
        <h3 className="dashboard-collections-container-header">Collections</h3>
        <div className="dashboard-collections-container-list">
          {userFolder.map((collection: CollectionType, index) => {
            const location = `/todo/${collection.id}`;
            return (
              <Link
                to={location}
                className="dashboard-collections-container-list-item"
                key={index}
              >
                {collection.title}
              </Link>
            );
          }, [])}
        </div>
      </div>
    </section>
  );
}

export function AddCollection() {
  const { setHiddenCreateCollection, setUserFolder } =
    useTodo() as TodoContextType;
  const { addNewCollection, readLocalStorage } =
    useStorage() as StorageContextType;

  const collectionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  async function todoCollectionSubmitHandler(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    collectionRef.current;

    if (!titleRef.current) return;
    if (titleRef.current.value.trim().length === 0) return;
    if (titleRef.current.value.length > 12) {
      setError("Collection max size is 12 characters");
      return;
    }

    try {
      addNewCollection(mainFolderName, {
        title: titleRef.current.value,
        createdAt: new Date(),
        id: uid(),
        content: [],
        favourite: false,
      });
      setUserFolder(readLocalStorage(mainFolderName));
      setHiddenCreateCollection((prev) => !prev);
    } catch (e) {
      setError("Collection creation failed");
      return;
    }
  }

  return (
    <section className="todo-page-addCollection-popUp">
      <form
        onSubmit={(e) => {
          todoCollectionSubmitHandler(e);
        }}
        className="todo-page-addCollection-popUp-container"
      >
        {error.length !== 0 ? (
          <p className="todo-page-addCollection-popUp-container-error">
            {error}
          </p>
        ) : (
          ""
        )}
        <h2 className="todo-page-addCollection-popUp-container-header">
          Create new collection
        </h2>
        <input
          maxLength={12}
          ref={titleRef}
          className="todo-page-addCollection-popUp-container-input"
          type="text"
          placeholder="Collection name"
        />
        <div className="todo-page-addCollection-popUp-container-buttons">
          <button className="todo-page-addCollection-popUp-container-buttons-create">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
          </button>
          <button
            onClick={() => {
              setHiddenCreateCollection((prev) => !prev);
            }}
            className="todo-page-addCollection-popUp-container-buttons-cancel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>window-close</title><path fill="currentColor" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>
          </button>
        </div>
      </form>
    </section>
  );
}

export function AddItem() {
  const { setHiddenCreateItem, setUserFolder } = useTodo() as TodoContextType;

  const { insertIntoCollection, readLocalStorage } =
    useStorage() as StorageContextType;

  const [error, setError] = useState("");
  const [onChangeVal, setOnChange] = useState(new Date());

  const titleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { id } = useParams<string>();

  useEffect(() => {
    if (id === undefined) {
      navigate("/error");
    }
  });

  function todoItemSubmitHandler() {
    setError("");
    if (!titleRef.current) return;
    if (titleRef.current.value.length > 35) {
      setError("Todo cannot be longer than 35 characters");
      return;
    }

    if (onChangeVal === null) {
      setOnChange(new Date());
    }

    const [, month, dayInMonth, , time] = onChangeVal.toString().split(" ");
    const [hourTime, minuteTime] = time.split(":");

    try {
      const todoItem: itemType = {
        createdAt: new Date().toString(),
        title: titleRef.current.value,
        yearMonth: `${onChangeVal.getMonth()} ${onChangeVal.getFullYear()}`,
        date: `${month} ${dayInMonth} ${hourTime}:${minuteTime}`,
        dateVerify: onChangeVal.getTime(),
        id: uid(),
        completed: false,
      };
      insertIntoCollection(mainFolderName, todoItem, id);
      setHiddenCreateItem((prev) => !prev);
      setUserFolder(readLocalStorage(mainFolderName));
    } catch (e) {
      setError("Failed to add todo");
      return;
    }
  }

  return (
    <section className="todo-page-addItem-popUp">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          todoItemSubmitHandler();
        }}
        className="todo-page-addItem-popUp-container"
      >
        {error.length !== 0 ? (
          <p className="todo-page-addItem-popUp-container-error">{error}</p>
        ) : (
          ""
        )}
        <h2 className="todo-page-addItem-popUp-container-header">
          Add new todo
        </h2>
        <input
          maxLength={35}
          ref={titleRef}
          className="todo-page-addItem-popUp-container-input"
          type="text"
          placeholder="Todo title"
        />
        <DateTimePicker
          className="addItem-popUp-DatePicker"
          onChange={(e: any) => {
            setOnChange(e);
          }}
          value={onChangeVal}
        />
        <button
          onClick={() => {
            setHiddenCreateItem((prev) => !prev);
          }}
          className="todo-page-addItem-popUp-container-buttons-cancel"
        >
          Cancel
        </button>
        <button
          className="todo-page-addItem-popUp-container-buttons-create"
          type="submit"
        >
          Create
        </button>
      </form>
    </section>
  );
}
