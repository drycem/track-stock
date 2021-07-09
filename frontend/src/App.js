//import logo from './logo.svg';
import React, { Component } from "react";
import Modal from "./components/modal";
import axios from "axios";
//import './App.css';

/*const urunItems = [
  {
    title: "abc filter",
    code: "b257m",
    brand: "asas",
    price: 12.14
  },

  {
    title: "air filter",
    code: "abc257m",
    brand: "vs",
    price: 15.0
  },
];*/

class App extends Component {
  state = {
    activeItem: {
      title: "",
      code: "",
      brand: "",
      price: 0.0
    },
    urunList: []
  };

  /*constructor(props) {
    super(props);
    this.state = {urunItems};
  };*/

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/todos/");
      const urunList = await res.json();
      this.setState({
        urunList
      });
    } catch (e) {
      console.log(e)
    }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  
  //responsible for saving the task
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/urunler/${item.id}/`, item)
      return;
    }
    axios
      .post("http://localhost:8000/api/urunler", item)
  };

  createItem = () => {
    const item = {title: "", code: "", brand: "", price: 0.0};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  
  renderTabList = () => {
    return (
      <div className="my-5 tablist">
        <button
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </button>
        <button
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </button>

      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.urunList.filter(
      item => this.completed === viewCompleted
    );
    // eslint-disable-next-line
    return newItems.map(item => {
      <li 
        key={item.id}
        className="list-gruop-item d-flex justify-content-between align-items-center"
      >
        <span 
          className={`urun-title mr-2 ${
            this.state.viewCompleted ? "complete-urun" : ""
          }`}
        >
          title={item.brand}
        </span>
      </li>
    });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase tex-center my-4">Urun</h1>
        <div className="row">
          <div className="col-md col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-success">Urun ekle</button>
              </div>
              {this.renderTabList}
              <ul className="list-group list-group-flush">
                {this.renderItems}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null}
      </main>
    )
  }
}

export default App;
