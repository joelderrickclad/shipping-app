import React from 'react';
import '../shipment-details/shipment-details.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


class ShipmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipmentId: this.props.match.params.id,
            selectedShipment: null,
            allShipments: null
        }

    }

    componentWillMount() {
        fetch('http://localhost:3000/shipments')
            .then(res => res.json())
            .then((responseJson) => {
                let data = responseJson.find(obj => obj.id === this.state.shipmentId);
                this.setState({
                    selectedShipment: data,
                    allShipments: responseJson
                })
            })
            .catch(console.log)
    }
    renderSwitch(param) {
        if (param !== undefined)
            switch (param) {
                case 'ACTIVE':
                    return <button type="button" class="btn btn-primary">{param}</button>;
                case 'COMPLETED':
                    return <button type="button" class="btn btn-success">{param}</button>;
                case 'NEW':
                    return <button type="button" class="btn btn-warning">{param}</button>;
                default:
                    return <button type="button" class="btn btn-success">{param}</button>;;
            }
    }

    getCargoItems() {
        if (this.state.selectedShipment != null) {
            return this.state.selectedShipment.cargo.map((item, key) => {
                return <tr><th>{item.type}</th> <th>{item.description}</th> <th>{item.volume}</th></tr>
            })
        }
    }
    onTextChange(value) {
        this.setState({ allShipments: this.findAndReplace(this.state.allShipments, this.state.shipmentId, value) });
        alert("No Proper Instructions given regarding updating data to jsonserver. Tried to post modified data to localhost:3000//shipments using post but update not happening for value- "+ value);
        let postUrl = "http://localhost:3000/shipments";
        return fetch(postUrl, {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(this.state.allShipments),
        })
            .then(response => response.json())

    }

    findAndReplace(object, keyvalue, name) {
        object.map((item, key) => {
            if (item.id === keyvalue) {
                item.name = name
            }
        })
        return object;
    }


    render() {
        if (!this.state.selectedShipment) {
            return null;
        }
        return (
            <div class="shipment-container">
                <div class="padding-50 row">
                    <h4 class="col-6 text-left">Shipment Details</h4>

                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-default"><a href="/">Back</a></button>
                    </div>
                </div>

                <div class="card-style card border-default">
                    <div class="card-header text-left">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <h5>Shipment Id - {this.state.selectedShipment.userId}</h5>
                            </div>
                            <div class="col-4 ">
                                <h5>User Id - {this.state.selectedShipment.userId}</h5>
                            </div>
                            <div class="col-4 text-right">
                                {this.renderSwitch(this.state.selectedShipment.status)}
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <label class="shipment-text">Name : </label>
                            <input class="form-control col-5" value={this.state.selectedShipment.name} onChange={(e) => this.onTextChange(e.target.value)} />
                        </div>
                        <div>
                            <div class="container row">
                                <div class="col-6 custyle">
                                    <h5>Cargo Details:</h5>
                                    <table class="table table-striped custab">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Description</th>
                                                <th>Volume</th>
                                            </tr>
                                        </thead>

                                        {this.getCargoItems()}
                                    </table>
                                </div>
                                <div class="col-6 details-style">
                                    <h5 class="row">Type : {this.state.selectedShipment.type}</h5>
                                    <h5 class="row">Mode : {this.state.selectedShipment.mode}</h5>
                                    <h5 class="row">Osrigin : {this.state.selectedShipment.origin}</h5>
                                    <h5 class="row">Destination : {this.state.selectedShipment.destination}</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-right">
                            <h5>Total = {this.state.selectedShipment.total}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ShipmentDetails;
