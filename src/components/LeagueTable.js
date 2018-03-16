import React, { Component } from 'react';

import { BrowserRouter as Router,Redirect, Switch, Route, Link } from 'react-router-dom';



class LeagueTable extends Component{
	constructor(props) {
	  super(props);




	  this.state = {
	  	error: null,
	  	isLoaded: false,
	  	items: [],
	  	item : [],
	  	fixtures: [],
	  	fixture: 0,
	  	id :0,
	  	name : "Premier League"
	  };
	}
	componentDidMount() {


		const id = this.props.match.params.id;

		fetch("https://api.football-data.org/v1/competitions/"+id+"/leagueTable",
		{
			method: 'get',
			headers: {
				'X-Auth-Token':'17d00925d8024f569db7764c8aeb21dd',
			}
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result.standing,
					item: result,
					fixture: result,
					id: id

				});



			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			},


		)


	}

	hello() {
		console.log(this.props.match.params);
		const id = this.props.match.params.id;

		const fixture = this.props.match.params.fixture == null ? this.state.item.matchday : this.props.match.params.fixture;
			fetch("http://api.football-data.org/v1/competitions/"+id+"/fixtures?matchday="+fixture,
		{
			method: 'get',
			headers: {
				'X-Auth-Token':'17d00925d8024f569db7764c8aeb21dd',
			}
		})
		.then(res => res.json())

	}
	render() {
		const {error, isLoaded,fixtures,fixture,id, items,item} = this.state;

		if (error) {
			return <div>{error.message}</div>;
		}
		else if (!isLoaded) {
			return <div>Waiting...</div>;	
		}
		else{
		return (
			<div>
			<h2>
			{item.leagueCaption} Table
			</h2>
			<Link to={'/'+id+'/'+this.state.fixture.matchday}>Fixtures</Link>
			<table className="table table-responsive-sm" style={{overflowY: 'hidden'}}>
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Team Name</th>
      <th scope="col">PG</th>
      <th  scope="col">W</th>
      <th scope="col">D</th>
      <th scope="col">L</th>
      <th scope="col">G</th>
      <th scope="col">GA</th>
      <th className="d-sm-block" scope="col">GD</th>
      <th scope="col">PTS</th>
    </tr>
  </thead>
  <tbody>
  	{items.map((item,i) => (
    <tr key={item.position+i} >
      <th scope="row">{item.position}</th>
      <td>{item.teamName}</td>
      <td >{item.playedGames}</td>
      <td >{item.wins}</td>
      <td  >{item.draws}</td>
      <td >{item.losses}</td>
      <td >{item.goals}</td>
      <td>{item.goalsAgainst}</td>
      <td>{item.goalDifference}</td>
      <td>{item.points}</td>
    </tr>
  		))}
  </tbody>
</table>



</div>
		)

		}
	}
}

export default LeagueTable;