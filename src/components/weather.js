import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export class weather extends Component {
    render() {
        return (
            <div>
                {
                    this.props.weatherInfo && 
                    <ul>
                        <li>
                            {this.props.weatherInfo[0].valid_date}
                            {this.props.weatherInfo[0].description}
                        </li>
                        <li>
                            {this.props.weatherInfo[1].valid_date}
                            {this.props.weatherInfo[1].description}
                        </li>
                        <li>
                            {this.props.weatherInfo[2].valid_date}
                            {this.props.weatherInfo[2].description}
                        </li>
                    </ul>
                }
            </div>
        )
    }
}

export default weather;
