import { useState, useEffect } from "react";

function WordCounter() {
  const [text, setText] = useState("");
  const [count, setCount] = useState([]);

  function handleCount(value) {
    setText(value);
        const words = value
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
      const wordMap = {};

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      wordMap[word] = (wordMap[word] || 0) + 1;
    }

    const result = Object.entries(wordMap).map(([word, count]) => ({
      word,
      count,
    }));

    setCount(result);
}

//     if (count.length > 0) {
//       for (let i = 0; i < count.length; i++) {
//         if (count[i].word === value) {
//           setCount((prev) => {
//             [...prev, count[i].count + 1]
//           })
//         }
//       }
//     }
//     else {
//       count.push({ word: { text }, count: 1 })
//     }
//   }

  useEffect(() => {
    // Function Call
  }, []);

  return (
    <div className="wordCounter">
      <h1>Word Counter</h1>

      <div className="container">
        <textarea
          className="textarea"
          placeholder="Type your text here"
          data-testid="textarea"
          value={text}
          onChange={(e) => handleCount(e.target.value)}
        />

        {/* Display result on if there are any characters or words */}

        <div className="results">
          <h3>Word Frequencies</h3>
          <ul data-testid="result-list">
            {count.map(({word, count}) => (
              <li key={word} data-testid={`word-${word}`}>
                <strong>{word}</strong>: {count} Times
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default WordCounter;
