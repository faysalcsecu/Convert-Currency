// App.js
import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import "./App.css";

function App() {
  // Initializing all the state variables
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  // Fetching the currency data
  useEffect(() => {
    Axios.get(`https://open.er-api.com/v6/latest/${from}`)
      .then((res) => {
        setInfo(res.data.rates);
        setOptions(Object.keys(res.data.rates));
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [from]);

  // Function to convert the currency
  const convert = () => {
    if (info[to]) {
      const rate = info[to];
      setOutput(input * rate);
    }
  };

  // Function to switch between two currencies
  const flip = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency Converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input
            type="number"
            placeholder="Enter the amount"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown
            options={options}
            onChange={(e) => setFrom(e.value)}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" onClick={flip} />
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown
            options={options}
            onChange={(e) => setTo(e.value)}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <button onClick={convert}>Convert</button>
        <h2>Converted Amount:</h2>
        <p>{`${input} ${from} = ${output.toFixed(2)} ${to}`}</p>
      </div>
      <footer className="footer">
        <p>Created by ✔️@Faysal_Zayn_28 🆓</p>
      </footer>
    </div>
  );
}

export default App;
