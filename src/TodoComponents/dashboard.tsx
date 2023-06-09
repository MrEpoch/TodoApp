import { useEffect, useRef, useState } from "react";
import { useTodo } from "./wrapper.tsx";
import {
  TodoContextType,
  itemType,
  CollectionShownType,
} from "../@types/todo";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function DashboardMain() {
  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const { hiddenSidebar, setCurrentMain, userFolder } =
    useTodo() as TodoContextType;
  const dotRef = useRef<SVGSVGElement>(null);
  const arrRef = useRef<SVGSVGElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [longTerm, setLongTerm] = useState<CollectionShownType[] | []>([]);
  const [today, setToday] = useState<CollectionShownType[] | []>([]);
  const [btnToday, setBtnToday] = useState<boolean>(true);

  useEffect(() => {
    try {
      const date = new Date();
      const today = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      setToday(
        userFolder
          .map((collection: any) => {
            const filteredItem = collection.collectionTodos.filter(
              (item: itemType) => {
                const itemDate = item.date.split(" ");
                const [monthItem, yearItem] = item.yearMonth.split(" ");
                return (
                  parseInt(monthItem) === month &&
                  parseInt(itemDate[1]) === today &&
                  parseInt(yearItem) === year &&
                  !item.completed
                );
              }
            );
            if (filteredItem.length !== 0) {
              return {
                ...collection,
                collectionTodos: filteredItem,
                shown: false,
              };
            } else {
              return false;
            }
          })
          .filter((collection) => collection !== false)
      );

      setLongTerm(
        userFolder
          .map((collection: any) => {
            const filteredItem = collection.collectionTodos.filter(
              (item: itemType) => {
                const itemDate = item.date.split(" ");
                const [monthItem, yearItem] = item.yearMonth.split(" ");

                if (
                  parseInt(yearItem) > year && !item.completed
                    ? true
                    : !item.completed &&
                      parseInt(monthItem) > month &&
                      parseInt(yearItem) === year
                    ? true
                    : parseInt(itemDate[1]) > today &&
                      parseInt(yearItem) === year &&
                      parseInt(monthItem) === month &&
                      !item.completed
                ) {
                  return true;
                }
              }
            );
            if (filteredItem.length !== 0) {
              return {
                ...collection,
                collectionTodos: filteredItem,
                shown: false,
              };
            } else {
              return false;
            }
          })
          .filter((collection) => collection !== false)
      );
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
    setWhich: React.Dispatch<React.SetStateAction<CollectionShownType[] | []>>,
    which: CollectionShownType[] | []
  ) {
    try {
      const newToday = which.map((collection: CollectionShownType) => {
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
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
              {btnToday
                ? today.map(
                    (collection: CollectionShownType, index: number) => {
                      return (
                          <List 
                            key={index}
                            style={{ marginTop: "3em" }}
                            className="todo-page-dashboard-main-todos-item"
                          >
                            <div className="dashboard-main-todos-item-header">
                              <ListItemButton
                                onClick={() => {
                                  navigate("/todo/" + collection.id);
                                }}
                                disableRipple
                                sx={{ pl: 4 }}
                              >
                                <ListItemText>{collection.title}</ListItemText>
                              </ListItemButton>
                              <ListItemButton
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  padding: "1rem",
                                }}
                                disableRipple
                              >
                                <ListItemIcon>
                                  <KeyboardArrowDown
                                    ref={arrRef}
                                    style={{ color: "white" }}
                                    onClick={() => {
                                      changeShown(
                                        collection.id,
                                        setToday,
                                        today
                                      );
                                    }}
                                    className={
                                      collection.shown ? "reverse" : ""
                                    }
                                  />
                                </ListItemIcon>
                              </ListItemButton>
                            </div>
                            {collection.shown ? (
                              <>
                                {collection.collectionTodos.map(
                                  (item: itemType) => {
                                    return (
                                      <ListItem
                                        key={item.id}
                                        style={{ padding: "2em" }}
                                      >
                                        <ListItemText primary={item.title} />
                                        <ListItemText primary={item.date} />
                                      </ListItem>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                          </List>
                      );
                    }
                  )
                : longTerm.map(
                    (collection: CollectionShownType, index: number) => {
                      if (collection.collectionTodos.length === 0) {
                        return;
                      }
                      return (
                        <>
                          <List
                            key={index}
                            style={{ marginTop: "3em" }}
                            className="todo-page-dashboard-main-todos-item"
                          >
                            <div className="dashboard-main-todos-item-header">
                              <ListItemButton
                                onClick={() => {
                                  navigate("/todo/" + collection.id);
                                }}
                                disableRipple
                                sx={{ pl: 4 }}
                              >
                                <ListItemText>{collection.title}</ListItemText>
                              </ListItemButton>
                              <ListItemButton
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  padding: "1rem",
                                }}
                                disableRipple
                              >
                                <ListItemIcon>
                                  <KeyboardArrowDown
                                    ref={arrRef}
                                    style={{ color: "white" }}
                                    onClick={() => {
                                      changeShown(
                                        collection.id,
                                        setToday,
                                        today
                                      );
                                    }}
                                    className={
                                      collection.shown ? "reverse" : ""
                                    }
                                  />
                                </ListItemIcon>
                              </ListItemButton>
                            </div>
                            {collection.shown ? (
                              <>
                                {collection.collectionTodos.map(
                                  (item: itemType) => {
                                    return (
                                      <ListItem
                                        key={item.id}
                                        style={{ padding: "2em" }}
                                      >
                                        <ListItemText primary={item.title} />
                                        <ListItemText primary={item.date} />
                                      </ListItem>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                          </List>
                          <Divider variant="middle" component="li" />
                        </>
                      );
                    }
                  )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
