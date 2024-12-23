import { useState } from "react";

export default function PopupApp(): JSX.Element {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>You clicked {count} times</p>
        </div>
    );
}
