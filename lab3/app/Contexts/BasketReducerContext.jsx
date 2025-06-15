import React, { createContext, useReducer, useEffect } from "react";

const initState = [];

const reducer = (state, action) => {
    switch(action.type) {
        case "INIT":
            return action.payload;
        case "ADD_ITEM":
            if (state.find(item => item.id === action.payload.id)) {
                return state;
            }
            return [...state, action.payload];
        case "REMOVE_ITEM":
            return state.filter((it) => it.id !== action.payload.id);
        default:
            return state;
    }
};

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        dispatch({ type: "INIT", payload: storedBasket });
    }, []);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(state));
    }, [state]);

    return (
        <BasketContext.Provider value={{ state, dispatch }}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketContext;