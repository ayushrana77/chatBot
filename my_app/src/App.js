import React, { useState } from "react";
import "./App.css";
function App() {
  const [query, setquery] = useState("");
  const postData = async (e) => {
    e.preventDefault();

    const res = await fetch("/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      alert(data);
    } else {
      window.alert("Failed");
    }
  };
  return (
    <div>
      <input
        type="text"
        id="query"
        name="query"
        value={query}
        onChange={(e) => setquery(e.target.value)}
      />
      <button type="btn" onClick={postData}>
        Submit
      </button>
    </div>
  );
}

export default App;
