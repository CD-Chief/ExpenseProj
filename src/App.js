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
        <input placeholder="Add Tag..."></input>
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
      <input placeholder="Find Tag..."></input>
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

function RecordList() {

  return (
    <tr>
      <th>Name</th>
      <th>Tags</th>
      <th>Value</th>
    </tr>
  )

}

function Totals() {

  return (
    <div>
      <h4>Total Records: </h4>
      <h4>Total Tags: </h4>
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

  return(
    <div>
      <Title/>
      <OptionBox/>
      <RecordBox/>
    </div>
  )
}
