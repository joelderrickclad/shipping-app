import React from "react"
import {Route} from "react-router-dom"
import ShipmentSummary from "./components/shipment-summary/shipment-summary"
import ShipmentDetails from "./components/shipment-details/shipment-details"

const Routes = () => {
    return(
        <div>
            <Route exact path="/" component = {ShipmentSummary} />
             <Route path="/:id" component = {ShipmentDetails} />
        </div>
    )
}

export default Routes;