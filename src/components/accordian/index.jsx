import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };
  //   console.log(selected);
  const handleMultiSelection = (getCurrentId) => {
    let copyMultipleSelected = [...multiSelected];
    const findIndexOfCurrentId = copyMultipleSelected.indexOf(getCurrentId);
    findIndexOfCurrentId === -1
      ? copyMultipleSelected.push(getCurrentId)
      : copyMultipleSelected.splice(findIndexOfCurrentId, 1);

    setMultiSelected(copyMultipleSelected);
    // console.log(findIndexOfCurrentId, multiSelected);
  };
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable multi selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              key={dataItem.id}
              className="item"
              onClick={
                enableMultiSelection
                  ? () => handleMultiSelection(dataItem.id)
                  : () => handleSingleSelection(dataItem.id)
              }
            >
              <div className="title">
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multiSelected.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
