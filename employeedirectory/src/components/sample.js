import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import API from '../utils/api'

class sample extends Component {
    state = {
        peopleList: [],
        filteredPeopleList: [],
        keyword: ""
      };

    componentDidMount() {
        // const data = API.getTenPeople(); --> wrong

        API.getTenPeople()
        .then((data) => {
            console.log(data.data.results)

            this.setState({
                peopleList: data.data.results,
                filteredPeopleList: data.data.results
            })
        })

    }

    filter = (event) => {

        this.setState({ keyword: event.target.value });

        let newList = this.state.peopleList.filter((people) => {
            return (people.name.first.includes(event.target.value))
        })

        this.setState({
            filteredPeopleList: newList
        })
        
    }

    render() {
        return (
            <>
             {/* <InputGroup className="mb-3">
                <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={this.filter()}
                />
            </InputGroup> */}

            <input type="text" onChange={this.filter}></input>

            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
                {
                    this.state.filteredPeopleList.map((people) => {
                        return (
                            <tr>
                                <td>1</td>
                                <td>{people.name.first}</td>
                                <td>{people.name.last}</td>
                                <td>@mdo</td>
                            </tr>
                        )
                    })
                }
              
            </tbody>
          </Table>
          </>
            
        );
    }
}

export default sample;