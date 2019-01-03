import {useState} from "react";

const defaultGroup = "alpha_testers"

export default function InputChoice({choices = [defaultGroup], defaultChoice = defaultGroup, handleClick}) {
    const [value, setValue] = useState("")
    const [error, setError] = useState(null)
    console.log('value', value)


    const names = value.split(' ').map(e => e.toLowerCase().trim());
    const legitEntry = names.every(v => choices.includes(v))
    legitEntry ? setError(null) : setError("seems like one of those group names doesn't exist")

    return <>
        <input placeholder={"group names separated by space (eg. 'synbio alphat hacker_z')"}
               defaultValue={defaultChoice}
               onChange={(ev) => setValue(ev.target.value)}>
            {error && <span>Oops: {error}</span>}
        </input>
        <button onClick={() => error || handleClick(names)}>{error ? "..." : "OK"}</button>
    </>
}
