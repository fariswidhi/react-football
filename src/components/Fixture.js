import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Fixture extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	error: null,
	  	isLoaded: false,
	  	items: [],
	  	item : [],
	  	fixtures: [],
	  	id: this.props.match.params.id,
	  	fixture: this.props.match.params.fixture
	  };
	}
	componentWillMount() {
		console.log("okay");
	}
	componentWillReceiveProps(props) {
		
		const id = this.props.match.params.id;
		const fixture = parseInt(this.props.match.params.fixture)+parseInt(1);
			fetch("http://api.football-data.org/v1/competitions/"+id+"/fixtures?matchday="+fixture,
		{
			method: 'get',
			headers: {
				'X-Auth-Token':'17d00925d8024f569db7764c8aeb21dd',
			}
		})
		.then(res => res.json())
		.then((result)=>
			this.setState({
				isLoaded: true,
				fixtures: result.fixtures,
				fixture: props.match.params.fixture
			})
			),
			(error)=> 
			this.setState({
				isLoaded: true,
				error
			})

	}
	componentDidMount() {
		const id = this.props.match.params.id;
		const fixture = this.props.match.params.fixture;
			fetch("http://api.football-data.org/v1/competitions/"+id+"/fixtures?matchday="+fixture,
		{
			method: 'get',
			headers: {
				'X-Auth-Token':'17d00925d8024f569db7764c8aeb21dd',
			}
		})
		.then(res => res.json())
		.then((result)=>
			this.setState({
				isLoaded: true,
				fixtures: result.fixtures,
				fixture: fixture
			})
			),
			(error)=> 
			this.setState({
				isLoaded: true,
				error
			})

	}
	render() {
		const next = parseInt(this.state.fixture)+ parseInt(1);
		const { error, isLoaded,fixtures, id,fixture, items,item } = this.state;

		if (error) {
			return <div>{error.message}</div>;			
		}
		else if(!isLoaded) {
			return <div>Loading...</div>;
		}
		else{
		return (

<div className="row">
				<div className="col-lg-12">
			<ul className="list-group" style={{textAlign:"left"}}>
			<li className="list-group-item">
		<center>Fixture {fixture}</center>
		<Link  className="btn btn-primary btn-sm float-left" to={'/standings/'+id+'/'+parseInt(fixture-1)}>Prev</Link>	
		<Link  className="btn btn-primary btn-sm float-right" to={'/standings/'+id+'/'+next}>Next</Link>	
</li>
				{fixtures.map((item,i) => (
					<li key={i} className="list-group-item">
					<span className="float-left">{item.homeTeamName} 
					</span>
					{item.status == "FINISHED" ? <span className='float-right'>{item.result.goalsHomeTeam}</span>:<span className='float-left-sm float-right '>{item.date}</span> }
					<br/>  {item.awayTeamName}
					{item.status == "FINISHED" ? <span className='float-right'>{item.result.goalsAwayTeam}</span> :"" }
					</li>
				))}
			</ul>
			</div>
			</div>

		)
	}
	}
}

export default Fixture;