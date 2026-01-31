import { useState } from "react"

export function Quotes(){
    const quotesList = [
        "The only way to do great work is to love what you do.",
        "It’s not that I’m so smart, it’s just that I stay with problems longer.",
        "First, solve the problem. Then, write the code.",
        "Experience is the name everyone gives to their mistakes.",
        "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it."
    ]

    const colors = ["red", "orange", "blue", "yellow", "purple"];

    const [index, setIndex] = useState(0);

    const changeThings = () =>{
        const randomIndex = Math.floor(Math.random() * quotesList.length);
        setIndex(randomIndex);
    }


    return(
        <div style={{backgroundColor: colors[index], minHeight: "100vh"}}>
            <h1>RANDOM QUOTE GENERATOR</h1>
            <p>{quotesList[index]}</p>
            <button onClick={changeThings}>
                generate new quote
            </button>
        </div>
    );
}




