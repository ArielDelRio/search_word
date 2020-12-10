var React = require("react");
const { useState } = require("react");
var DefaultLayout = require("./layouts/default");

const HelloMessage = (props) => {
  const [countCharacters, setcountCharacters] = useState(2);
  const [letterInputs, setletterInputs] = useState(["a", "a"]);

  const handleChange = (e) => {
    alert();
    console.log(e);
  };

  console.log(letterInputs);
  return (
    <DefaultLayout title={props.title}>
      <div>{props.name}</div>
      <form action="/search" type="get">
        <div className="form-section select-count-characters">
          <label htmlFor="countCharacters">
            Please input the characters count
          </label>
          <input
            type="number"
            id="countCharacters"
            name="countCharacters"
            min="2"
            max="10"
            value={countCharacters}
            required
          />
        </div>
        <div className="form-section select-count-characters">
          {letterInputs.map((lInput, index) => (
            <input
              key={index}
              type="text"
              defaultValue={lInput}
              maxLength="1"
            />
          ))}
        </div>

        <input type="submit" value="Buscar" />
      </form>
    </DefaultLayout>
  );
};

module.exports = HelloMessage;
