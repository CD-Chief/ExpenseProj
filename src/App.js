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

  return (
    <div>
      <h3>Create Record</h3>
      <form>
        <input placeholder="Name..."></input>
        <input placeholder="Category..."></input>
        <input placeholder="Value..."></input>
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

function RecordList({ records }) {


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
