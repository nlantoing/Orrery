import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

// ORRERY -----------------------------------------

function Orbit(props) {
  return(
      <tr key={ props.orbitid }>
      <td>{ props.barycentre }</td>
      <td>{ props.body }</td>
      <td>{ props.argPeriapsis }</td>
      <td>{ props.eccentricity }</td>
      <td>{ props.epochTrueAnomaly }</td>
      <td>{ props.inclination }</td>
      <td>{ props.longAscNode }</td>
      <td>{ props.semiMajorAxis }</td>
      </tr>
  );
}


class Data extends React.Component {
  constructor() {
    super()
    this.state = {
      orbits: [],
      bodies: []
    }

    this.getOrbits();
    this.getBodies();
  }

  getOrbits() {
    axios.get('http://localhost:5000/orbits').then(
      response => {
        this.setState({ orbits: response.data.results});
      }
    ).then(() => this.orderBy());
  }

  orderBy(param='barycentre') {
    let orbits = this.state.orbits.slice();
    orbits.sort((a,b) => a[param] - b[param]);
    this.setState({ orbits: orbits});
  }
  
  getBodies() {
    axios.get('http://localhost:5000/bodies').then(
      response => {
        this.setState({ bodies: response.data.results});
      }
    )
  }

  getBodyName(id) {
    for(let i in this.state.bodies){
      const body = this.state.bodies[i];
      if(body.id === id) return body.name;
    }
  }
  
  render() {
    const orbits = this.state.orbits.map((orbit, index) => {
      const bodyname = this.getBodyName(orbit.body);
      const barycenterName = this.getBodyName(orbit.barycentre);
      return(
          <Orbit
        key={orbit.id}
        orbitid={orbit.id}
        barycentre={barycenterName}
        body={bodyname}
        argPeriapsis={orbit.argPeriapsis}
        eccentricity={orbit.eccentricity}
        epochTrueAnomaly={orbit.epochTrueAnomaly}
        inclination={orbit.inclination}
        longAscNode={orbit.longAscNode}
        semiMajorAxis={orbit.semiMajorAxis}
          />
      )
    });
    
    return (
        <table id="orrery">
        <thead>
        <Orbit
      orbitid="-999"
      barycentre="Barycentre"
      body="Body"
      argPeriapsis="Argument of periapsis"
      eccentricity="Eccentricity"
      epochTrueAnomaly="Epoch true anomaly"
      inclination="Inclination"
      longAscNode="Long ascention node"
      semiMajorAxis="Semi major axis"
        />
        </thead>
        <tbody>
        {orbits}
      </tbody>
      </table>
    );
  }
}

// ========================================

ReactDOM.render(
    <div>
    <Data />
    </div>,
  document.getElementById('root')
);

