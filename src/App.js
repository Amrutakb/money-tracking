import { useEffect, useState } from "react";
import "./App.css";
// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  const [name, setName] = useState("");
  const [description, setDescriptipon] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return (await response).json();
  }
  function addNewTransactions(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction"; //URL WHITH PARAMS FOR BACKEND
    // `${process.env.REACT_APP_API_URL}/transaction`
    const price = name.split(" ")[0];
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        date,
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          console.log("result", json);
          setName("");
          setDate("");
          setDescriptipon("");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  return (
    <main>
      <div className="container">
        <h1>BALANCE : {balance} </h1>
        <form onSubmit={addNewTransactions}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="enter the item name"
            ></input>
            <input
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
              type="date"
            ></input>
          </div>
          <div className="inputdescription">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescriptipon(ev.target.value)}
              placeholder="description"
            ></input>
          </div>
          <div className="transactions">
            {transactions.length > 0 &&
              transactions.map((transaction, index) => (
                <div className="item" key={index}>
                  <div className="left">
                    <div className="product">{transaction.name}</div>
                    <div className="description">{transaction.description}</div>
                  </div>
                  <div className="right">
                    <div
                      className={
                        "price" + (transaction.price < 0 ? " red" : " green")
                      }
                    >
                      {transaction.price}
                    </div>
                    <div className="date">{transaction.date}</div>
                  </div>
                </div>
              ))}
            <button type="submit">Add transaction</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
