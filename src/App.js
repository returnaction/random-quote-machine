import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quotesArr, setQuotesArr] = useState([]);
  const [quote, setQuote] = useState({
    quote: "Code or not to code?",
    author: "CwLine",
  });

  const getQuote = () => {
    let randomNumber = Math.floor(Math.random() * quotesArr.length);
    setQuote(quotesArr[randomNumber]);
  };

  const fetchQuotes = async () => {
    try {
      let response = await axios.get(url);
      setQuotesArr(response.data.quotes);
    } catch (error) {
      console.warn("Error in fetchQuotes", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="App">
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i class="fa fa-quote-left" />
            <span id="text">{quote.quote}</span>
          </div>
          <div className="quote-author">
            {" - "}

            <span id="author">{quote.author}</span>
          </div>

          <div className="buttons">
            <a
              class="button"
              target="_blank"
              href={encodeURI(
                `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`
              )}
              id="tweet-quote"
            >
              <i className="fa fa-twitter-square"></i>
            </a>
            <button
              id="new-quote"
              className="button"
              onClick={() => getQuote()}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
