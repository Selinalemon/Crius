import React from 'react';
import { withRouter } from 'react-router-dom';

class Card extends React.Component {
	constructor(props) {
	    super(props);

    }
   	render() {
     	return (
     		<div className="wrapper">
     			<p>这是第二页：测试</p>
		 	</div>
     	);
  	}

}

export default withRouter(Card);