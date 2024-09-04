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

    const [inputs, setInputs] = useState({
      name: "",
      category: "",
      value: ""
    });

  const handleChange = (event) => {
    const [name, value] =event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  return (
    <div>
      <h3>Create Record</h3>
      <form>
        <input placeholder="Name..." name='name' value={inputs.name} ></input>
        <input placeholder="Category..." name='category' value={inputs.category}></input>
        <input placeholder="Value..." name='value' value={inputs.value}></input>
        <button>Add</button>
      </form>
    </div>
  )
}

function FilterRecord() {

  return (
    <div>
    <h3>Filter Records</h3>
    <form>
      <input placeholder="Find Name..."></input>
      <input placeholder="Find Category..."></input>
      <input placeholder="FInd Value..."></input>
      <button>Filter</button>
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
  const {records, setRecords} = useContext(RecordContext);


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
        {records}
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

export default function ExpenseTracker() {
  const [records, setRecords] = useState();
  const [filteredRecords, setFilteredRecords] = useState();

  const RecordContext = createContext();
  const FilteredContext = createContext();

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
