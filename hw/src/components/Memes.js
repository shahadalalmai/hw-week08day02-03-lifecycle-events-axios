import React, { Component } from 'react';
import memesInfo from "./data/memesInfo";
import Meme from "./Meme";
import axios from "axios";

class Memes extends Component {
    constructor(props){
        super(props)
        this.state = {  
        allMemes: [],
        theme: false
        }
    }// end constructor


    componentDidMount(){ // after rendering Memes component, we will assign the array we brought from data to the empty array of the state of the initilaized instance state
        this.setState({ allMemes: memesInfo})

        // using axios
        axios.get(`https://api.imgflip.com/get_memes`)
        .then(response => {
            let memes = response.data.memes // getting all memes object
            console.log(memes)
        })
    }

    changeTheme = () => {
        let { theme } = this.state // taking a copy of the key theme from the state object
        this.setState({
            theme: !theme
        })
    }

    deleteMemes = () => {
        let copyState = {... this.state}
        copyState.allMemes = [] // emptying the array of imgs
        this.setState(copyState)
    }

    deleteMeme = (id) => {
        let copyMemes = [...this.state.allMemes]
        copyMemes = copyMemes.filter( (meme) => (meme.id) !== id ) // all other memes I want except the one we will remove
        this.setState({
            allMemes: copyMemes
        })
    }
    
    render() { 
        let { theme } = this.state // last updated value of theme in the object state after rendering everything else, I think this is why it's recommended to take a copy of the object state
        let arr = this.state.allMemes
        let cname = (theme) ? 'new' : '' // the className upon changing it

        return ( 
            <div>
                <form className={`meme-form ${cname}`}>
                    Title
                    <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    />

                    Image
                    <input
                    type="text"
                    name="image"
                    placeholder="Image"
                    />
                    <button>Save Meme</button>
                    
                </form>
                    <button onClick={this.changeTheme}>Change Theme</button>
                    <button onClick={this.deleteMemes}>Delete Memes</button>

                    {(this.state.allMemes.length === 0)? <h2>There are no memes :(</h2> : ''}

                    {
                    arr.map( (meme, index) => {
                    return <Meme className={cname} key={index} id={meme.id} title={meme.title} img={meme.image} delete={this.deleteMeme}/>
                    
                     } )}

            </div>
         );
    }
}
 
export default Memes;