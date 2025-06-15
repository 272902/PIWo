import { useContext, useRef } from "react"
import BasketContext from "../Contexts/BasketReducerContext"

export default ()=>{
    const {state, dispatch} = useContext(BasketContext);

    const list = useRef(); 
    const basketHTML = state.map((it) => (
        <article key={it.id}>
            {it.title}
            <button
                onClick={() => {
                    dispatch({ type: "REMOVE_ITEM", payload: it });
                }}
            > Usuń </button>
        </article>
    ));

    const toggleList =()=>{
        list.current.style.display = list.current.style.display === "block" ? "none" : "block";
    }
    return (
        <a className="dropdown-container" onClick={toggleList}>
            🧺 {state.length}
            <div className="dropdown-content" ref={list}>
                {basketHTML}
            </div>
        </a>
    )
}