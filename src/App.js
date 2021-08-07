import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import Alert from 'react-bootstrap/Alert';
import Weather from './components/weather';


export class App extends Component {
  
  constructor (props){
    super(props)
    this.state = {
      locationInfo: {},
      errMsg: '',
      weatherInfo: {},
    }
  }
  submitForm = async (event) => {
    try {
    event.preventDefault();
    const city = event.target.cityName.value;
    // const cityModified = city
    console.log(city);
    const response = await axios.get (`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`)
    const locationInfo = response.data[0]
    
    const weatherResponse = await axios.get (`${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${city}&lat=${locationInfo.lat}&lon=${locationInfo.lon}`)
    const weatherInfo = weatherResponse.data;
    console.log(weatherResponse);
    this.setState({
      locationInfo: locationInfo,
      errMsg: '',
      weatherInfo: weatherInfo,
    })
    console.log(weatherInfo); 
  }
  catch(error){
    this.setState ({
      errMsg: error.message,
    })
  }
 
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.submitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label >City Name</Form.Label>
            <Form.Control type="text" placeholder="City Name" name ='cityName' />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
          {this.state.errMsg && <Alert key={1} variant={'danger'}>
            {this.state.errMsg}
          </Alert>}
        </Form>
        <div>
          <img src = {`https://maps.locationiq.com/v3/staticmap?key=pk.7fdd04755e31c0ef21b603122ae4b268&center=${this.state.locationInfo.lat},${this.state.locationInfo.lon}&zoom=15`} alt={`${this.state.locationInfo.display_name}`} />
        </div>
        {
          this.state.locationInfo.display_name && 
        <div>
          <p>{this.state.locationInfo.display_name}</p>
          <p>lon {this.state.locationInfo.lon}</p>
          <p>lat {this.state.locationInfo.lat}</p>
          
        <Weather 
          weatherInfo = {this.state.weatherInfo}
        />
        </div>
        }
      </div>
    )
  }
}

export default App;
