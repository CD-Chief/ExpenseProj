
function Options(){

  function HandleClick(){
    const buttonId = currentTarget.getAttribute('data-id');
  }

  return (
    <form>
      <button data-id="createButton"> Create </button>
      <button data-id="filterButton"> Filter </button>
    </form>
  )

}

function CreateOrFilter(option, tags){

  return (
    <div>
      <div id="create" style={{ display: option ? "none"  : "block"}}>
        <form>
          <input type="text" placeholder="Record name..."/>
        </form>
      </div>

      <div id="filter" style={{ display: option ? "block"  : "none"}}>
        
      </div>
    </div>
  )

}

function RecordsTable(records, filters){
  const rows = []

  records.array.forEach(record => {
    rows.push(<RecordRow record={record}/>)
  });

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tags</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function RecordRow(record){
  return(
    <tr>
      <td>{record.name}</td>
      <td>{record.tags}</td>
      <td>{record.value}</td>
    </tr>
  )
}

function Totals(filtRecords){

}

const RECORDS = [
  {name: "Tuition", tags: ["Uni", "Large"], value: -15600},
  {name: "Accomodation", tags: ["Uni", "Living"], value: -4000},
  {name: "Work", tags: ["income"], value: 5000}
]

const TAGS = [ "Uni", "Large", "Living", "Income"]

//App
export default function ExpenseTracker(){

  return (
    <div>
      <h1> Expense Tracker </h1>
      <Options/>
      <CreateOrFilter/>
    </div>
    

  )

}