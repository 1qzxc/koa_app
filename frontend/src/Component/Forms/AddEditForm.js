import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { hostname } from '../../config';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    post: '',
    listid: this.props.listid, // <<< -------   fix ? 
    itemIndex: this.props.itemIndex
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    console.log("this.state.listid : " + this.state.listid)    // <<< --- substitute props to state
    e.preventDefault()
    fetch('http://' + hostname  + ':3002/posts/' + this.state.listid, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: this.state.post
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
	 this.props.addItemToState(item[0])
	 this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    //console.log("this.state.listid : " + this.state.listid) // <<< --- substitute props to state
    //console.log("this.state.id : " + this.state.id)
    e.preventDefault()
    fetch('http://' + hostname  + ':3002/posts/' + this.state.listid , {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.id,
        post: this.state.post
      })
    })
      .then(response => response.json())
      .then(item => {


/*        this.props.updateState(item[this.state.id])
        this.props.toggle()*/
       if(Array.isArray(item)) {
        for (var propName in item ){
          const propValue = item[propName]
          console.log("[addeditform] item propname-value : " + propName,propValue);
        }
          const index = item.findIndex(data => data.id === this.state.id)
          console.log("index : "+ index)
          this.props.updateState(item[index])
	        //}
          this.props.toggle()
        } 
        else {
          console.log('item = ' + JSON.stringify(item[0]));
        }
      })
      .catch(err => console.log(err))
  }
  
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, post } = this.props.item
      this.setState({ id, post })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="post">Post</Label>
          <Input type="text" name="post" id="post" onChange={this.onChange} value={this.state.post === null ? '' : this.state.post} listid={this.state.listid}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
