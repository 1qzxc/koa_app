import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import { hostname } from '../../config';


class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listid: this.props.listid
    }
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      console.log("delete this.state.listid : " + this.state.listid)
      console.log("id var : " + id)
      fetch('http://' + hostname + ':3002/posts/' + this.state.listid, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.body}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} listid={this.props.listid} itemIndex={this.props.itemIndex}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
