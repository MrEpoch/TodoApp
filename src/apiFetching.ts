import axios from "axios";

export const unsecure_JWT_token_storage_name = "unsecure_JWT_token";

export const api_url = "http://localhost:3000";

// AUTH LOGIC CODE

export const logIn = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post( api_url + "/login", {
            username,
            email,
            password,
        });

        localStorage.setItem(unsecure_JWT_token_storage_name, response.data);
        return true;
    } catch (error) {
        return false;
    }
};

export const signUp = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(api_url + "/signup", {
            email,
            username,
            password,
        });
        localStorage.setItem(unsecure_JWT_token_storage_name, response.data);
        return true;
    } catch (e) {
        return false;
    }
};

export const isLoggedIn = () => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    return token;
};

export const logOut = () => {
    localStorage.removeItem(unsecure_JWT_token_storage_name);
};

// END AUTH LOGIC CODE

// COLLECTION LOGIC CODE

export const createCollection = async (title: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const collection = await axios.post(api_url + "/api/collection", {
            title,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return collection;
    } catch (e) {
        return false;
    }
};

export const getCollections = async () => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    } 
    try {
        const collections = await axios.get(api_url + "/api/collections", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return collections.data;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const getCollection = async (collectionId: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) { 
        return false;
    }
    try {
        const collection = axios.get(api_url + "/api/collection/" + collectionId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return collection;
    } catch (e) {
        return false;
    }
};

export const deleteCollection = async (collectionId: string) => { 
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        await axios.delete(api_url + "/api/collection/" + collectionId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    } catch (e) {
        return false;
    }
};

export const updateCollection = async (collectionId: string, favourite: string, title: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const updatedCollection = await axios.put(api_url + "/api/collection/" + collectionId, {
           title,
           favourite,
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return updatedCollection;
    } catch (e) {
        return false;
    }
};

// END COLLECTION LOGIC CODE

// ITEM LOGIC CODE

export const getItem = async (todoId: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const item = await axios.get(api_url + "/api/todo/" + todoId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return item;
    } catch (e) {
        return false;
    }
};

export const getItems = async (collectionId: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const items = await axios.get(api_url + "/api/todos/" + collectionId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return items;
    } catch (e) {
        return false;
    }
};

export const createItem = async (collectionId: string, title: string, dateVerify: string, yearMonth: string, date: string) => { 
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const newItem = await axios.post(api_url + "/api/todo", {
            collectionId,
            title,
            dateVerify,
            yearMonth,
            date,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return newItem;
    } catch (e) {
        return false;
    }
};

export const deleteItem = async (todoId: string) => {
   const token = localStorage.getItem(unsecure_JWT_token_storage_name); 
   if (token === null) {
        return false;
   }
   try {
        await axios.delete(api_url + "/api/todo/" + todoId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
   } catch (e) {
       return false;
    }
};

export const updateItem = async (todoId: string, completed: boolean, title: string, dateVerify: string, yearMonth: string, date: string) => {
    const token = localStorage.getItem(unsecure_JWT_token_storage_name);
    if (token === null) {
        return false;
    }
    try {
        const updatedItem = await axios.post(api_url + "/api/todo/" + todoId, {
            title,
            completed,
            dateVerify,
            yearMonth,
            date,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return updatedItem;
    } catch (e) {
        return false;
    }
};

// END ITEM LOGIC CODE

