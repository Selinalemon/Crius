import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routePaths from './../constants/routePaths';

class Index extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    };

	    this.handle = this.handle.bind(this);
    }

    handle() {
    	alert('你看你看~');
    }

   	render() {
     	return (
     		<div className="wrapper">
	     			<h1 onClick={this.handle}>这是首页</h1>
	     			<div className="mc">
	     				<Link to={routePaths.CARD}>
	     					<button>点击跳转</button>
	     				</Link>
	     			</div>
		 	</div>
     	);
  	}

}

export default withRouter(Index);