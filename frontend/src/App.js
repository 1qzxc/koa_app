import React, { Component } from 'react';
//import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Post from "./Component/Post/index";
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Component/Modals/Modal.js'
import DataTable from './Component/Tables/DataTable.js'
import Footer from './Footer'

class App extends Component {
    state = {
	  items:[]
    }

    getItems(){
		console.log(" get items this.props.match.params.id : " + this.props.match.params.id)
	    fetch('http://192.168.1.7:3002/posts/' + this.props.match.params.id)
		    .then(response => response.json())
		    .then(items => this.setState({items}))
			.catch(err => console.log(err));
			
    }


    addItemToState = (item) => {
	    this.setState(prevState => ({
		    items: [...prevState.items, item]
	    }))
    }

	updateState = (item) => {
		const itemIndex = this.state.items.findIndex(data => data.id === item.id) 
	    const newArray = [
		// destructing items 
	        ...this.state.items.slice(0, itemIndex),
		//add updated item to the array
		item,
		//add rest of items
		...this.state.items.slice(itemIndex + 1)
	]
	    for (var propName in newArray ){
		const propValue = newArray[propName]
		console.log("[appjs] newArray: " + propName,propValue);
	    }
		this.setState({ items: newArray }) 
	}

	deleteItemFromState = (id) => {
		const updatedItems = this.state.items.filter(item => item.id !== id) 
		this.setState({ items: updatedItems }) 
	}

	componentDidMount(){
    this.getItems();
    console.log("params: " + this.props.match.params.id);
	}

	render(){
	console.log("listidval: " + listidval );
	const listidval = this.props.match.params.id;
		return (
			<Container fluid="lg" className="App">
			<Row className="justify-content-md-center">
			  <Col md="auto">
			    <h1 style ={{margin: "20px 0"}}> Tasks </h1>
			  </Col>
			</Row>
			<Row className="justify-content-md-center">
			  <Col>
			    <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} listid={listidval}/>
                            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} listid={listidval} />
  		          </Col>
                        </Row>
                        </Container>
    )
  }


}


export default App;
