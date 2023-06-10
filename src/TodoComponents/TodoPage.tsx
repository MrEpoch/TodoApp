import "./dashboard.css";
import "./mobileDashboard.css";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TodoMain.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ChildrenProp, TodoContextType, CollectionType } from "../@types/todo";
import { Alert, AlertTitle } from "@mui/material";
import { createCollection, createItem, getCollections } from "../apiFetching";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTodo } from "./wrapper";

export default function TodoApp({ children }: ChildrenProp) {
    
  const { hiddenCreateItem, hiddenCreateCollection } = useTodo() as TodoContextType;

  return (
    <>
      <section className="dashboard-page">
        <DashboardHeader />
        <DashboardSideBar />
        {hiddenCreateItem ? "" : <AddItem />}
        {hiddenCreateCollection ? "" : <AddCollection />}
        {children}
      </section>
    </>
  );
}



function DashboardHeader() {
  const headerCollection = useRef<HTMLDivElement>(null);
  const headerDashboard = useRef<HTMLDivElement>(null);
  const addReference = useRef<SVGSVGElement>(null);

  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const { setHiddenSidebar, currentMain, setHiddenCreateCollection } =
    useTodo() as TodoContextType;

  useMemo(() => {
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
  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const { hiddenSidebar, userFolder } = useTodo() as TodoContextType;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    return () => setLoading(true);
  }, [setLoading, userFolder]);

  const cssSidebar = hiddenSidebar
    ? "dashboard-page-sidebar hidden"
    : "dashboard-page-sidebar";

  return (
    <>
      {loading ? (
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <section className={cssSidebar}>
          <div className="dashboard-page-sidebar-container">
            <h3 className="dashboard-collections-container-header">
              Collections
            </h3>
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
      )}
    </>
  );
}

export function AddCollection() {
  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const { setHiddenCreateCollection, setUserFolder } =
    useTodo() as TodoContextType;

  const collectionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  async function todoCollectionSubmitHandler(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    collectionRef.current;

    if (!titleRef.current) return;
    if (titleRef.current.value.trim().length === 0) {
      setError("Choose collection name");
      return;
    } else if (titleRef.current.value.length > 12) {
      setError("Collection max size is 12 characters");
      return;
    }

    try {
      (async () => {
        if (titleRef.current?.value === undefined) {
          setError("Choose collection name");
          return;
        }
        createCollection(titleRef.current?.value).then(() => {
          getCollections().then((data) => {
            setUserFolder(data.userFolder);
          });
        });
      })();
      setHiddenCreateCollection((prev) => !prev);
    } catch (e) {
      setError("Collection creation failed");
      return;
    }
  }

  return (
    <section className="todo-page-addCollection-popUp">
      {error && (
        <Alert
          onClose={() => {
            setError("");
          }}
          style={{ position: "absolute", top: "20svh", zIndex: "10" }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          todoCollectionSubmitHandler(e);
        }}
        className="todo-page-addCollection-popUp-container"
      >
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>plus</title>
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setHiddenCreateCollection((prev) => !prev);
            }}
            className="todo-page-addCollection-popUp-container-buttons-cancel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>window-close</title>
              <path
                fill="currentColor"
                d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}

export function AddItem() {
  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const { setHiddenCreateItem, setUserFolder } = useTodo() as TodoContextType;

  const [error, setError] = useState("");
  const [onChangeVal, setOnChange] = useState(new Date());

  const titleRef = useRef<HTMLInputElement>(null);

  const { id } = useParams<string>();

  useMemo(() => {
    if (id === undefined) {
      navigate("/error");
    }
  }, [id, navigate]);

  function todoItemSubmitHandler() {
    setError("");
    if (!titleRef.current) return;
    if (titleRef.current.value.length > 35) {
      setError("Todo cannot be longer than 35 characters");
      return;
    } else if (titleRef.current.value.trim().length === 0) {
      setError("Todo cannot be empty");
      return;
    }

    if (onChangeVal === null) {
      setOnChange(new Date());
    } else if (
      !(
        onChangeVal &&
        Object.prototype.toString.call(onChangeVal) === "[object Date]"
      )
    ) {
      setError("There is something wrong with date");
      return;
    }

    const [, month, dayInMonth, , time] = onChangeVal.toString().split(" ");
    const [hourTime, minuteTime] = time.split(":");

    try {
      const dateVerify = onChangeVal.getTime();
      const date = `${month} ${dayInMonth} ${hourTime}:${minuteTime}`;
      const yearMonth = `${onChangeVal.getMonth()} ${onChangeVal.getFullYear()}`;

      if (titleRef.current?.value === undefined) {
        setError("Todo cannot be empty");
        return;
      } else if (id === undefined) {
        setError("Todo cannot be empty");
        navigate("/error");
        return;
      }
      createItem(id, titleRef.current?.value, dateVerify, yearMonth, date)
        .then(
            () => {
                getCollections()
                    .then((data) => {
                        setUserFolder(data.userFolder);
                    })
            }
        )
        .catch(
            () => {
               throw new Error("Failed to create item"); 
            });
      setHiddenCreateItem((prev) => !prev);
      return;
    } catch (e) {
      console.log(e);
      setError("Failed to add todo");
      return;
    }
  }

  return (
    <section className="todo-page-addItem-popUp">
      {error && (
        <Alert
          onClose={() => {
            setError("");
          }}
          style={{ position: "absolute", top: "20svh", zIndex: "10" }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          todoItemSubmitHandler();
        }}
        className="todo-page-addItem-popUp-container"
      >
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
          x
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
