import React from 'react';
import '../shipment-summary/shipment-summary.css';
import "react-tabulator/lib/styles.css"; 
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; 
import { React15Tabulator } from "react-tabulator"; 


// function SimpleButton(props) {
//   const cellData = props.cell._cell.row.data;
//   return <button onClick={() => alert(cellData.name)}>Show</button>;
// }

const columns = [
  { title: "Id", field: "id", width: 150 , align: "left", formatter: "link",
    headerFilter: "input"},
  { title: "Name", field: "name", editor: "input" },
  { title: "Shipment Mode", field: "mode" },
  { title: "Shipment Type", field: "type" },
  { title: "Orgin", field: "origin" },
  { title: "Destination", field: "destination" },
  { title: "Status", field: "status" },
  { title: "User Id", field: "userId" },
];
 

class ShipmentSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: []
    }
  }
 
    // onChange(){
    //       alert("clicked");
    // }
  

componentDidMount() {
        fetch('http://localhost:3000/shipments')
        .then(res => res.json())
        .then((data) => {
          this.setState({ data: data })
        })
        .catch(console.log)
      }

  render() {
    const options = {
      height: 150,
      movableRows: false,
        pagination:"local",
    paginationSize:20,
    paginationSizeSelector:[3, 6, 8, 10, 20],
    };
    return (
      <div className="card-style card shipment-container">
        <h4 class="text-left">Shipment Summary</h4>
        <React15Tabulator
          ref={ref => (this.ref = ref)}
          columns={columns}
          data={this.state.data}
          options={options}
          data-custom-attr="test-custom-attribute"
          className="custom-css-class grid-height"
        />

       

       
      
      </div>
    );
  }
}

export default ShipmentSummary;