import React, { Component } from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	error: null,
	  	isLoaded: false,
	  	items: []
	  };
	}
	componentDidMount() {
		fetch("https://api.football-data.org/v1/competitions/?season=2017",
		{
			method: 'get',
			headers: {
				'X-Auth-Token':'17d00925d8024f569db7764c8aeb21dd',
			}
		}
		)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				})
			}
		)
	}
	render() {
		const {error,isLoaded, items} = this.state;
		if (error) {
			console.log(error.message);
			return <div>{error.message}</div>;
		}
		else if (!isLoaded) {
      return <div>Loading...</div>;
    	} 
		else{

		return (

			<div>
			<ul className="list-group">
			{items.map((item,i) => (
			<li key={item.caption} className="list-group-item">
			<Link  to={'/'+item.id}>{item.caption}</Link>
			</li>	
			))}

			</ul>	
			</div>
		)	
		}
	}
}

export default Home;