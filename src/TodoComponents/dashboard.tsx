import { useEffect, useRef, useState } from "react";
import { useTodo } from "./TodoPage";
import { TodoContextType, itemType, CollectionType } from "../@types/todo";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import emptyFolder from "./empty-folder.svg";

export default function DashboardMain() {

  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");
      
  const { hiddenSidebar, setCurrentMain, userFolder } =
    useTodo() as TodoContextType;
  const dotRef = useRef<SVGSVGElement>(null);
  const arrRef = useRef<SVGSVGElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [longTerm, setLongTerm] = useState<CollectionType[] | []>([]);
  const [today, setToday] = useState<CollectionType[] | []>([]);
  const [btnToday, setBtnToday] = useState<boolean>(true);

  useEffect(() => {
    try {
      const date = new Date();
      const today = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      setToday(
        userFolder.map((collection: any) => {
          const filteredItem = collection.content.filter((item: itemType) => {
            const itemDate = item.date.split(" ");
            const [monthItem, yearItem] = item.yearMonth.split(" ");
            return (
              parseInt(monthItem) === month &&
              parseInt(itemDate[1]) === today &&
              parseInt(yearItem) === year &&
              !item.completed
            );
          });
        if (filteredItem.length !== 0) {
            return { ...collection, content: filteredItem, shown: false };
        } else {
            return false;
        }
      }).filter((collection) => collection !== false))

      setLongTerm(
        userFolder.map((collection: any) => {
          const filteredItem = collection.content.filter((item: itemType) => {
            const itemDate = item.date.split(" ");
            const [monthItem, yearItem] = item.yearMonth.split(" ");
            console.log(monthItem, itemDate[1], yearItem, "nothing", month, today, year);

            if (parseInt(yearItem) > year && !item.completed ? true : !item.completed && parseInt(monthItem) > month && parseInt(yearItem) === year ? true : parseInt(itemDate[1]) > today && parseInt(yearItem) === year && parseInt(monthItem) === month && !item.completed) {
                return true;
            }
          });
        if (filteredItem.length !== 0) {
            return { ...collection, content: filteredItem, shown: false };
        } else {
            return false;
        }
        }).filter(collection => collection !== false));
    } catch (e) {
      console.log(e);
    }
    setCurrentMain("dashboard");
    setLoading(false);
  }, [setCurrentMain, setLoading, userFolder]);

  const styleCSS = hiddenSidebar
    ? "todo-page-dashboard-main full-page"
    : "todo-page-dashboard-main";

  function changeShown(
    id: string,
    setWhich: React.Dispatch<React.SetStateAction<CollectionType[] | []>>,
    which: CollectionType[] | []
  ) {
    try {
      const newToday = which.map((collection: CollectionType) => {
        if (collection.id === id) {
          collection = { ...collection, shown: !collection.shown };
        }
        return collection;
      });
      setWhich(newToday);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  return (
    <main className={styleCSS}>
      {loading ? (
        <div
          style={{
            width: "100%",
            position: "absolute",
            top: "0",
            right: "0",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader color="#DD2616" loading={loading} size={150} />{" "}
        </div>
      ) : (
        <>
          <div className="todo-page-dashboard-main-heading">
            <h3>Dashboard</h3>
            <h1>
              Good morning, <span>User Name</span>
            </h1>
            <svg
              onClick={() => {
                navigate("/todo/collections");
              }}
              ref={dotRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>dots-horizontal</title>
              <path
                fill="currentColor"
                d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
              />
            </svg>
          </div>
          <div className="todo-page-dashboard-main-todosOverview">
            <div className="todo-page-dashboard-main-todosOverview-filter">
              <button
                onClick={() => {
                  setBtnToday(true);
                }}
                className={
                  btnToday
                    ? "todo-page-dashboard-main-todosOverview-filter-daily active-btn"
                    : "todo-page-dashboard-main-todosOverview-filter-daily"
                }
              >
                Today todos
              </button>
              <button
                onClick={() => {
                  setBtnToday(false);
                }}
                className={
                  btnToday
                    ? "todo-page-dashboard-main-todosOverview-filter-longTerm"
                    : "todo-page-dashboard-main-todosOverview-filter-longTerm active-btn"
                }
              >
                Long-term tasks
              </button>
            </div>
            <div className="todo-page-dashboard-main-todosContainer">
              {btnToday ? (
                today.length === 0 ? (
                  <img
                    style={{ width: "80%", height: "80%" }}
                    src={emptyFolder}
                  />
                ) : (
                  today.map((collection: CollectionType, index: number) => {
                    if (collection.content.length === 0) {
                      return;
                    }
                    return (
                      <div
                        className="todo-page-dashboard-main-todos-item"
                        key={index}
                      >
                        <div className="dashboard-main-todos-item-header">
                          <Link to={"/todo/" + collection.id}>
                            {collection.title}
                          </Link>
                          <svg
                            ref={arrRef}
                            onClick={() => {
                              changeShown(collection.id, setToday, today);
                            }}
                            className={collection.shown ? "reverse" : ""}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <title>chevron-down</title>
                            <path
                              fill="currentColor"
                              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                            />
                          </svg>
                        </div>
                        {collection.shown ? (
                          <div className="dashboard-main-todos-item-body">
                            {collection.content.map((item: itemType, index) => {
                              return (
                                <div
                                  key={index}
                                  className="dashboard-main-todos-item-body-todoContainer"
                                >
                                  <div className="dashboard-main-todos-item-body-todo-checkBox"></div>
                                  <h3>{item.title}</h3>
                                  <p>{item.date}</p>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                )
              ) : longTerm.length === 0 ? (
                <img
                  style={{ width: "80%", height: "80%" }}
                  src={emptyFolder}
                />
              ) : (
                longTerm.map((collection: CollectionType, index: number) => {
                  if (collection.content.length === 0) {
                    return;
                  }
                  return (
                    <div
                      className="todo-page-dashboard-main-todos-item"
                      key={index}
                    >
                      <div className="dashboard-main-todos-item-header">
                        <Link to={"/todo/" + collection.id}>
                          {collection.title}
                        </Link>
                        <svg
                          ref={arrRef}
                          onClick={() => {
                            changeShown(collection.id, setLongTerm, longTerm);
                          }}
                          className={collection.shown ? "reverse" : ""}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <title>chevron-down</title>
                          <path
                            fill="currentColor"
                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                          />
                        </svg>
                      </div>
                      {collection.shown ? (
                        <div className="dashboard-main-todos-item-body">
                          {collection.content.map((item: itemType, index) => {
                            return (
                              <div
                                key={index}
                                className="dashboard-main-todos-item-body-todoContainer"
                              >
                                <div className="dashboard-main-todos-item-body-todo-checkBox"></div>
                                <h5>{item.title}</h5>
                                <p>{item.date}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

