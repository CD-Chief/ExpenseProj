
import { useState, createContext, useContext } from 'react';

function Title() {

  return (
    <h1> Expense Tracker</h1>
  )
}

function OptionButtons({setCreatePanel}) {
  const {records} = useContext(RecordContext);
  const {setFilteredRecords} = useContext(FilteredContext);

  const handleClick = (event) => {
    event.preventDefault();
    const element = event.target;


    console.log(element.name);

    if (element.name === "Create"){
      console.log("Working");
      setCreatePanel(true);
      setFilteredRecords([...records]);
    } else {
      setCreatePanel(false);
      console.log("Working");
    }
  }

  return(
    <div>
      <button name='Create' onClick={handleClick}>Create</button>
      <button name='Filter' onClick={handleClick}>Filter</button>
    </div>
  )
}

  function CreateRecord() {
    const {records, setRecords} = useContext(RecordContext);
    const {setFilteredRecords} = useContext(FilteredContext);

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
    
    if (parseInt(inputs.value) != inputs.value){
      alert("Value must be a number");
      return;
    }

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
  const {records} = useContext(RecordContext);
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

    const tempFilteredRecords = [...filteredRecords];
    const filteredArray = [];
    let filledFields = 0;
    let true3;

    //Check if inputs are filled
    if (inputs.name.trim() !== ""){
      filledFields += 1;
    }
    if (inputs.category.trim() !== ""){
      filledFields += 1;
    }
    if (inputs.value.trim() !== ""){
      filledFields += 1;
    }
    
    // If button was pressed with no inputs
    if (filledFields === 0) {
      setFilteredRecords([...records]);
      return
    };

    for (let i = 0; i < tempFilteredRecords.length ; i++){
      let currentRecord = tempFilteredRecords[i];
      true3 = 0;

      // Check name
      if (currentRecord.props.record.name === inputs.name || inputs.name.trim() === ""){
        true3 += 1;
      }
      //Check category
      if (currentRecord.props.record.category === inputs.category || inputs.category.trim() === ""){
        true3 += 1;
      }
      //Check value
      if (currentRecord.props.record.value === inputs.value || inputs.value.trim() === ""){
        true3 += 1;
      }

      //If all are true
      if (true3 === 3){
        filteredArray.push(currentRecord);
      }
    }

    

    //Update array
    setFilteredRecords(filteredArray);

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
  const [createPanel, setCreatePanel] = useState(true);

  return(
    <div>
      <OptionButtons setCreatePanel={setCreatePanel}/>
      {createPanel ? <CreateRecord /> : <FilterRecord />}
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
  const {filteredRecords} = useContext(FilteredContext);


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
  const {filteredRecords} = useContext(FilteredContext);

  //Total records
  const totalRecords = filteredRecords.length;

  //Total value
  let totalValue = 0;
  for (let currentRecord of filteredRecords){
    totalValue += parseInt(currentRecord.props.record.value);
  }


  return (
    <div> 
      <h4>Total Records: {totalRecords} </h4>
      <h4>Total value: {totalValue} </h4>
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
