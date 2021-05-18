/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios'

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            showingAutocomplete:false,
            query: "",
            items: [],
            filtredData: []
        };
    }

    handleInputChange = event => {
        const query = event.target.value;
    
        this.setState(prevState => {
          const filteredData = prevState.data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
    
          return {
            query,
            filteredData
          };
        });
      };

    getData = () =>{
        axios('http://localhost:3035/')
        // JSON came in a string format. I dont know why??? Also, in 'search-results' class i did mapping from data,which i comment, while i got error here/ Markup for search-results' class i alo done 
            .then(response => {
            const { query } = this.state;  
            
            const serverdata = response.data;  
                 

            console.log(response.data)      
            const filteredData = serverdata.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());            
            });
            this.setState({
                showingAutocomplete:true,
                data,
                filteredData
                })      
            })
            .catch(error => {
            console.log('Error getting fake data: ' + error);
            })       
    }

    componentDidMount(){
        this.getData();
          
    }
    
    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
   

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text"  ref={input => this.search = input} onChange={this.handleInputChange} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                </div>
                <div className='search-results'>          
                    {/* {this.state.filteredData.map(i => 
                    <div className='card'>
                        <div className='title'>{i.name}</div>
                        <div className='about'>{i.about}</div>
                        <div className='thumb-img'>{i.img}</div>
                        <div className='price'>{i.price}</div>
                    </div>
                    )} */}
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;