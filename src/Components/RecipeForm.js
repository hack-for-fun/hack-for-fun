import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class RecipeForm extends React.Component {
  constructor(props) {
  super();
  this.state = {
     word: '',
     items: [],
   };
 };
 addToList = (e) => {
   const updated_items = [this.state.word, ...this.state.items]
   this.setState({ items: updated_items, word: ''})
   this.props.setIngredients(updated_items)
   this.renderList()
 }

 removeFromList = (word) => {
   const i = this.state.items.indexOf(word);
   const newList = [...this.state.items];
   newList.splice(i,1);
   this.setState({items: newList})
 }

 onChange = (e) => {
   this.setState({word: e.target.value});
 }

 renderList = () => {
   return (
     <div className="recipe-container">
     <ul className="list">
       {this.state.items.map((word, index) =>
         <li className="recipe-items" key={index}>{word} - <Button className="delete" onClick= {() => {this.removeFromList(word) }} > X </Button></li> ) }
     </ul>
     </div>
   );
 }

 render() {
  return (
        <div className="form-wrapper">
            <Form>
                <Form.Group controlId="formIngredients">
                    <Form.Label className="form-header"> Tell us what you have in your pantry </Form.Label>
                    <Form.Control className="input-bar" type="Text" placeholder="Enter Ingredient" value={this.state.word} onChange={this.onChange} />
                    <Button className="form-button" onClick={this.addToList}> Add Ingredient </Button>
                </Form.Group>
            </Form>
            {this.renderList()}
        </div>
    );
  }
}
