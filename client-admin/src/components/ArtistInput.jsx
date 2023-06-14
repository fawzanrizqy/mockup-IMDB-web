import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function ArtistInput({ onInputValuesChange }) {
  const [inputs, setInputs] = useState([]);

  const addTextInput = () => {
    const newInputs = [...inputs];
    newInputs.push("");
    setInputs(newInputs);
  };

  const removeTextInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    onInputValuesChange(newInputs);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    onInputValuesChange(newInputs);
  };

  return (
    <div>
      {inputs.map((value, index) => (
        <div key={index} className="mb-3">
          <Form.Control
            type="text"
            placeholder={`Actor ${index + 1}`}
            value={value}
            onChange={(event) => handleInputChange(index, event)}
          />
          <Button
            variant="danger"
            className="mt-2"
            onClick={() => removeTextInput(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="primary" className="mt-2" onClick={addTextInput}>
        Add New Actor
      </Button>
    </div>
  );
}
