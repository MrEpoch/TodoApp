import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCollections } from "../apiFetching";
import { CollectionType, TodoContextType } from "../@types/todo";


const TodoContext = createContext<TodoContextType | object>({});

export function Wrapper({ children }: any) {
    
  const [userFolder, setUserFolder] = useState<CollectionType[] | []>([]);
  const [hiddenSidebar, setHiddenSidebar] = useState<boolean>(true);
  const [currentMain, setCurrentMain] = useState<string>("dashboard");
  const [hiddenCreateItem, setHiddenCreateItem] = useState<boolean>(true);
  const [hiddenCreateCollection, setHiddenCreateCollection] =
    useState<boolean>(true);
  const [collectionsId, setCollectionsId] = useState<
    string[] | [] | boolean[] | any
  >([false]);

  const navigate = useNavigate();

  useMemo(() => {
    getCollections()
      .then((res) => {
        console.log(res.userFolder);
        res && setUserFolder(res.userFolder);
      })
      .catch(() => {
        navigate("/error");
      });
    return () => {
      setUserFolder([]);
    };
  }, [setUserFolder]);

  useEffect(() => {
    setCollectionsId(
      userFolder.map((collection: CollectionType) => collection.id)
    );
    return () => {
      setCollectionsId([]);
    };
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
            {children}
        </TodoContext.Provider>
    )
}

export function useTodo() {
  return useContext(TodoContext);
}

