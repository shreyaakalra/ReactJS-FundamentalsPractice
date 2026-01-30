export function Button({ title, task, isOffline }){
    return(
        <>
            <button onClick={task} disabled={isOffline}>
                {title}
            </button>
        </>
    )
}