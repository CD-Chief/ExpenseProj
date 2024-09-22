import { useState, createContext, useContext } from 'react';

function Title() {

  return (
    <h1> Expense Tracker</h1>
  )
}

function OptionButtons() {

  return(
    <div>
      <button>Create</button>
      <button>Filter</button>
    </div>
  )
}

  function CreateRecord() {
    const {records, setRecords} = useContext(RecordContext);
    const {filteredRecords, setFilteredRecords} = useContext(FilteredContext);

    const [inputs, setInputs] = useState({
      name: "",
      category: "",
      value: ""
    });

  const handleChange = (event) => {
    const {name, value} =event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const tempArray = [...records];

    for (const inpField in inputs){
      if (inputs[inpField].trim() === '') {
        alert("Must fill all spaces before adding");
        return;
      };
    };
    
    tempArray.push(<RecordRow record={inputs}/>);
    setRecords(tempArray);
    setFilteredRecords(tempArray);


  };

  return (
    <div>
      <h3>Create Record</h3>
      <form>
          <input placeholder="Name..." name='name' value={inputs.name} onChange={handleChange} ></input>
          <input placeholder="Category..." name='category' value={inputs.category} onChange={handleChange}></input>
          <input placeholder="Value..." name='value' value={inputs.value} onChange={handleChange}></input>
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  )
}

function FilterRecord() {
  const {records, setRecords} = useContext(RecordContext);
  const {filteredRecords, setFilteredRecords} = useContext(FilteredContext);

  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    value: ""
  });

  const handleChange = (event) => {
    const {name, value} =event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredArray = [];

    // Index of which element to add
    let index;

    let input;
    let filledFields = 0;

    for (const  inpField in inputs){
      if (inputs[inpField].trim() !== '') {
        console.log(inputs[inpField]);
        filledFields += 1;
        input = inputs[inpField];

        switch (inpField) {
          case "name":
            index = filteredRecords.findIndex(el => el.name === input);
            if (index !== -1){
              console.log(index);
              filteredArray.add(filteredRecords[index]);
            }
            break;
          case "category":
            break;
          case "value":
            break;
        }
      }
    }


    // If button was pressed with no inputs
    if (filledFields === 0){
      setFilteredRecords([...records]);
    }else {
      setFilteredRecords(filteredArray);
    }

    // Clear Fields after
    setInputs({
      name: "",
      category: "",
      value: ""
    });
};


  return (
    <div>
    <h3>Filter Records</h3>
    <form>
      <input placeholder="Find Name..." name='name' value={inputs.name} onChange={handleChange}></input>
      <input placeholder="Find Category..." name='category' value={inputs.category} onChange={handleChange}></input>
      <input placeholder="Find Value..." name='value' value={inputs.value} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Filter</button>
    </form>
  </div>
  )
  
}

function OptionBox() {

  return(
    <div>
      <OptionButtons/>
      <CreateRecord/>
      <FilterRecord/>
    </div>
  )
}

function RecordRow({ record }) {

  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.category}</td>
      <td>{record.value}</td>
    </tr>
  )
}

function RecordList() {
  const {filteredRecords, setFilteredRecords} = useContext(FilteredContext);


  return (

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecords}
      </tbody>
    </table>


  )

}

function Totals({totals}) {

  return (
    <div>
      <h4>Total Records: </h4>
      <h4>Total Categories: </h4>
      <h4>Total value: </h4>
    </div>
  )

}

function RecordBox() {

  return(
    <div>
      <RecordList/>
      <Totals/>
    </div>
  )
}

export const RecordContext = createContext();
export const FilteredContext = createContext();

export default function ExpenseTracker() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  return(
    <RecordContext.Provider value={{ records,setRecords }}>
      <FilteredContext.Provider value={{ filteredRecords,setFilteredRecords}}>
        <div>
          <Title/>
          <OptionBox/>
          <RecordBox/>
        </div>
      </FilteredContext.Provider>
    </RecordContext.Provider>
    
  )
}
