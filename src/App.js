import logo from './logo.svg';
import './App.css';

import React from 'react';

import './App.css';

class JavaScriptCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      hasDecimal: false,
      multZero: true,
      input: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEqual = this.handleEqual.bind(this);

  }


  //this handleClick class method is what is going on when a key is pressed.
  handleClick = (event) => {
    //this is saying that if any event happens, the value of the input property of the state object will be set to false.
    if(event){
      this.setState({
        input: false
      })
    }

    // below is to ensure that no more than one decimal can be entered per integer using the state object with a key of hasDecimal set to a boolean value
    if (
      event.target.value === '.' &&
      this.state.hasDecimal === false) {
      this.setState({
        hasDecimal: true
      });
    }
    else if (
      event.target.value === '+' ||
      event.target.value === '-' ||
      event.target.value === '*' ||
      event.target.value === '/') {
      this.setState({
        hasDecimal: false
      });
    };

    //the next couple if/else if/else if are to make sure that no numbers start with multiple zeros using the state object with a key of multZero set to a boolean value
    if (
      event.target.value === '0' &&
      this.state.multZero === false) {
      this.setState({
        multZero: false
      });
    }

    else if (event.target.value === '+' ||
      event.target.value === '-' ||
      event.target.value === '*' ||
      event.target.value === '/') {
      this.setState({
        multZero: true
      });
    }

    else if (event.target.value === '1' ||
      event.target.value === '2' ||
      event.target.value === '3' ||
      event.target.value === '4' ||
      event.target.value === '5' ||
      event.target.value === '6' ||
      event.target.value === '7' ||
      event.target.value === '8' ||
      event.target.value === '9' ||
      event.target.value === '.') {
      this.setState({
        multZero: false
      });
    };

//this if statement is for when the equal sign is pressed, and it then runs the handleEqual method.
 if (event.target.value === '=') {
      this.handleEqual()
    };

  //this regex is for when 2 or more operators are entered consecutively. When they are, it then changes the display to only show the last operator entered, and then you can do the math on that. 
    let operReg = /[^0-9.]{2,}/g;

    if (operReg.test(this.state.display) === true) {
      this.setState({
        display: this.state.display.replace(operReg, this.state.display.charAt(this.state.display.length - 1)) + event.target.value
      });
   }
    
    //this final else statement is saying that the display which starts as an empty string is then concatenated with whatever number, operator, or decimal is clicked.
    else {
      this.setState({
        display: this.state.display + event.target.value
      });
    }
  };


  //the handleClear class method changes the state back to the initial state with the display set to an empty string
  handleClear() {
    this.setState({
      hasDecimal: false,
      multZero: true,
      input: true
    })
  };

  //All of the math for the calculator is done here in the handleEqual method whatever is in the current display is evaluated to provide solution to the math entered
  handleEqual = () => {
    try {
      this.setState({
        // eslint-disable-next-line
        display: (eval(this.state.display))
      })
    }
    catch (e) {
      this.setState({
        display: 'error'
      })
    }
  };

  render() {
    //the next 4 variables are used in the return to render each button conditionally.
    //the decimal will only be clickable one time per number entered.
    const decButt = <button onClick={this.handleClick} id='decimal' className='buttSize' value='.'>.</button>;
    const noDecButt = <button id='noDec'>.</button>;
    //the zero button will not allow a user to start any number with multiple zeros
    const zeroButt = <button onClick={this.handleClick} id='zero' className='buttSize' value='0'>0</button>;
    const noZeroButt = <button className='buttSize'>0</button>;
    //the const below is used to set the display to 0 until another button is pressed. 
    const inputDisplay = 0;


    return (
      <div className="calculator">
        <br />
        <br />
        <br />
        <br />
        {/*The display is displaying the value set in the state. it is set to start at zero and change when there is anything else entered.*/}
        <div id='display'>{(this.state.input) ? inputDisplay : this.state.display}</div>
        {/* each of the buttons  have a handleClick class method that will go to the class method above */}
        <button onClick={this.handleClick} id='seven' className='buttSize' value='7'>7</button>
        <button onClick={this.handleClick} id='eight' className='buttSize' value='8'>8</button>
        <button onClick={this.handleClick} id='nine' className='buttSize' value='9'>9</button>
        <button onClick={this.handleClick} id='add' className='buttSize' value='+'>+</button>
        <br />
        <button onClick={this.handleClick} id='four' className='buttSize' value='4'>4</button>
        <button onClick={this.handleClick} id='five' className='buttSize' value='5'>5</button>
        <button onClick={this.handleClick} id='six' className='buttSize' value='6'>6</button>
        <button onClick={this.handleClick} id='subtract' className='buttSize' value='-'>-</button>
        <br />
        <button onClick={this.handleClick} id='one' className='buttSize' value='1'>1</button>
        <button onClick={this.handleClick} id='two' className='buttSize' value='2'>2</button>
        <button onClick={this.handleClick} id='three' className='buttSize' value='3'>3</button>
        <button onClick={this.handleClick} id='multiply' className='buttSize' value='*'>*</button>
        <br />
        {/* the variables set above for the zero and decimal buttons, the logic is here to decide when they will work for the user. */}
        {(this.state.multZero) ? noZeroButt : zeroButt}
        {(this.state.hasDecimal) ? noDecButt : decButt}
        <button onClick={this.handleClear} id='clear' className='buttSize' value='clear'>CE</button>
        <button onClick={this.handleClick} id='divide' className='buttSize' value='/'>/</button>
        <br />
        <button id='equals' onClick={this.handleEqual} className='equalSize' value='equals'>=</button>
      </div>
    );
  }
};


export default JavaScriptCalc;