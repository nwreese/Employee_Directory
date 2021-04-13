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

        //update keyword
        this.setState({ keyword: event.target.value });

        // create new list based on keyword
        let newList = this.state.peopleList.filter((people) => {
            return (people.name.first.toLowerCase().includes(event.target.value))
        })

        // update the filteredList, which is the one being displayed in the table
        this.setState({
            filteredPeopleList: newList
        })
        
    }
// sorting emails alphabetically 
    Sort = (event) => {
        let peopleList = this.state.peopleList;
        peopleList.sort((a,b) => {
            if (a.email < b.email) {
                return -1;
            }
            if (a.email > b.email) {
                return 1;
            }
        })
        this.setState({filteredPeopleList: peopleList})
    }
// sorting last name alphabetically 
    SortByLastName = (event) => {
        let peopleList = this.state.peopleList;
        peopleList.sort((a,b) => {
            if (a.name.last < b.name.last) {
                return -1;
            }
            if (a.name.last > b.name.last) {
                return 1;
            }
        })
        this.setState({filteredPeopleList: peopleList})
    }
// sorting first name alphabetically 
SortByFirstname = (event) => {
    let peopleList = this.state.peopleList;
    peopleList.sort((a,b) => {
        if (a.name.first < b.name.first) {
            return -1;
        }
        if (a.name.first > b.name.first) {
            return 1;
        }
    })
    this.setState({filteredPeopleList: peopleList})
}


    render() {
        return (
            <>
            
            <input type="text" onChange={this.filter}></input>

            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name  <button onClick={this.SortByFirstname}>Sort</button> </th>
                <th>Last Name  <button onClick={this.SortByLastName}>Sort</button></th>
                <th>email  <button onClick={this.Sort}>Sort</button>
                </th>
              </tr>
            </thead>
            <tbody>
                {
                    this.state.filteredPeopleList.map((people) => {
                        return (
                            <tr>
                                <td><img src={people.picture.thumbnail} alt="employee pic"></img></td>
                                <td>{people.name.first}</td>
                                <td>{people.name.last}</td>
                                <td>{people.email}</td>
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