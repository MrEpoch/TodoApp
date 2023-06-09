import { useEffect, useState } from "react";
import { useTodo } from "./wrapper.tsx";
import { TodoContextType, itemType, CollectionType } from "../@types/todo";
import { useNavigate, useParams } from "react-router-dom";
import "./Todo_template_collections.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { deleteCollection, deleteItem, updateItem } from "../apiFetching";

export default function TemplateTodoList() {
  const navigate = useNavigate();

  if (useTodo() === null) navigate("/login");

  const {
    setHiddenCreateItem,
    setCurrentMain,
    hiddenSidebar,
    collectionsId,
    userFolder,
    setUserFolder,
  } = useTodo() as TodoContextType;

  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<itemType[]>([]);
  const [completedTodos, setCompleteTodos] = useState<itemType[]>([]);

  function filteredCollection(
    todoStatus: boolean,
    collectionId: string,
    todoId: string
  ) {
    userFolder.map((collection: CollectionType) => {
      if (collection.id === collectionId) {
        collection.collectionTodos = collection.collectionTodos.map(
          (todo: itemType) => {
            if (todo.id === todoId) {
              todo.completed = todoStatus;
            }
            return todo;
          }
        );
      }
      return collection;
    });
    return userFolder.find(
      (collection: CollectionType) => collection.id === id
    );
  }
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (collectionsId[0] === false) {
      navigate("/todo");
      return;
    }

    if (id === undefined) {
      navigate("/error");
      return;
    }

    if (id === undefined || !collectionsId.includes(id)) {
      navigate("/error");
      return;
    }
    setLoading(false);
  }, [id, collectionsId, navigate, setLoading]);

  const [collection, setCollection] = useState<CollectionType | any>({});

  useEffect(() => {
    try {
      setCollection(
        userFolder.find((collection: CollectionType) => collection.id === id)
      );
    } catch (e) {
      console.log(e);
    }
  }, [id, setCollection, userFolder]);

  useEffect(() => {
    if (collection.collectionTodos) {
      try {
        setCurrentMain("none");
        setTodos(
          collection.collectionTodos.filter((todo: itemType) => !todo.completed)
        );
        setCompleteTodos(
          collection.collectionTodos.filter((todo: itemType) => todo.completed)
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [setCurrentMain, collection, setTodos, setCompleteTodos]);

  const styleCSS = hiddenSidebar
    ? "todo-page-main-collection-template full-page"
    : "todo-page-main-collection-template";

  function changeTodoStatus(todo: itemType, collectionId: string) {
    setLoading(true);
    try {
      updateItem(
        todo.id,
        !todo.completed,
        todo.title,
        todo.dateVerify,
        todo.yearMonth,
        todo.date
      );
      setCollection(filteredCollection(!todo.completed, collectionId, todo.id));
    } catch (e) {
      console.log(e);
      navigate("/todo");
    }
    setLoading(false);
    return;
  }

  const warning = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="late-todo"
      viewBox="0 0 24 24"
    >
      <title>alert</title>
      <path
        fill="currentColor"
        d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"
      />
    </svg>
  );
  const currentTime = new Date();

  function deleteCollectionHandler(collection: CollectionType): void {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${collection.title}?`
    );
    if (confirmDelete) {
      setLoading(true);
      try {
        deleteCollection(collection.id).then(() => {
          setUserFolder(
            userFolder.filter(
              (collectionU: CollectionType) => collectionU.id !== collection.id
            )
          );
        });
        navigate("/todo/collections");
      } catch (e) {
        console.log(e);
        navigate("/todo");
      }
      setLoading(false);
      return;
    }
  }

  function deleteTodoHandler(todo: itemType, collectionId: string) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${todo.title}?`
    );
    if (confirmDelete) {
      setLoading(true);
      try {
        deleteItem(todo.id).then(() => {
          setCollection(
            filteredCollection(todo.completed, collectionId, todo.id)
          );
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    return;
  }

  return (
    <section className={styleCSS}>
      {loading ? (
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="todo-page-main-collection-template-top">
            <div className="collection-template-top-Header">
              <button
                onClick={() => {
                  navigate("/todo/collections");
                }}
                className="collection-template-top-Header-ReturnButton"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>arrow-left</title>
                  <path
                    fill="currentColor"
                    d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                  />
                </svg>
              </button>
              <h2 className="collection-template-top-Header-h2">
                {collection && collection.title}
              </h2>
            </div>
            <div className="collection-template-top-TodoAdd">
              <button
                onClick={() => {
                  setHiddenCreateItem((prev) => !prev);
                }}
                className="collection-template-top-TodoAdd-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>plus</title>
                  <path
                    fill="currentColor"
                    d="M21,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="todo-page-main-collection-template-todos">
            <div className="todo-page-main-collection-template-todos-incomplete">
              <h5 className="todo-page-main-collection-template-todos-header">
                Tasks - {todos && todos.length}
              </h5>
              {collection.collectionTodos && collection.collectionTodos
                .filter((todo: itemType) => todo.completed === false)
                .map((todo: itemType, index: number) => {
                  return (
                    <div
                      className={
                        todo.completed
                          ? "todo-page-main-collection-template-todos-todo-container line-through"
                          : "todo-page-main-collection-template-todos-todo-container"
                      }
                      key={index}
                    >
                      <div
                        onClick={() => {
                          changeTodoStatus(todo, collection.id);
                        }}
                        className="todo-page-main-collection-template-todos-todo-container-checkbox"
                      ></div>
                      <div className="todo-page-main-collection-template-todos-todo-container-text">
                        {todo.title}
                      </div>
                      <div className="todo-page-main-collection-template-todos-todo-container-date">
                        {todo.date}
                      </div>
                      <div className="todo-page-main-collection-template-todos-todo-container-control">
                        {todo.dateVerify < currentTime.getTime() ? warning : ""}
                        <svg
                          onClick={() => {
                            deleteTodoHandler(todo, collection.id);
                          }}
                          className="delete-todo-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <title>close</title>
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="todo-page-main-collection-template-todos-complete">
              <h5 className="todo-page-main-collection-template-todos-header">
                Completed - {completedTodos && completedTodos.length}
              </h5>
              {collection.collectionTodos
                .filter((todo: itemType) => todo.completed === true)
                .map((todo: itemType, index: number) => {
                  return (
                    <div
                      className="todo-page-main-collection-template-todos-todo-container line-through"
                      key={index}
                    >
                      <div
                        onClick={() => {
                          changeTodoStatus(todo, collection.id);
                        }}
                        className="todo-page-main-collection-template-todos-todo-container-checkbox completed-checkbox"
                      >
                        {todo.completed ? (
                          <svg
                            className="todo-container-checkbox-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <title>check-mark</title>
                            <path
                              fill="currentColor"
                              d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="todo-page-main-collection-template-todos-todo-container-text">
                        {todo.title}
                      </div>
                      <div className="todo-page-main-collection-template-todos-todo-container-open">
                        {todo.date}
                      </div>
                      <div className="todo-page-main-collection-template-todos-todo-container-control">
                        <svg
                          onClick={() => {
                            deleteTodoHandler(todo, collection.id);
                          }}
                          className="delete-todo-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <title>close</title>
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <svg
            className="todo-page-main-collection-template-delete"
            onClick={() => {
              deleteCollectionHandler(collection);
            }}
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>delete</title>
            <path
              fill="currentColor"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </>
      )}
    </section>
  );
}
