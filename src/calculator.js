import React, { useState } from 'react';
import InputButton from './inputButton';
import OutputButton from './outputButton';
import './index.css';
import {ERROR_EXPRESSION, evaluateExpression, OPERATION_CHARACTERS} from './calculatorUtils'
 
function Calculator() {
    const [output, setOutput] = useState('');
    const [lastClickWasEquals, setLastClickWasEquals] = useState(false);

    function clickInputButton(val) {
        if (
            output === ERROR_EXPRESSION || 
            (lastClickWasEquals && !OPERATION_CHARACTERS.includes(val))
        ) {
            setOutput(val);
        }
        else {
            setOutput(output + val);
        }
        setLastClickWasEquals(false);
    }

    function clickDeleteButton(val) {
        if (output === ERROR_EXPRESSION) {
            setOutput('');
        } 
        else {
            setOutput(output.slice(0,-1));
        }
        setLastClickWasEquals(false);
    }

    function clickClearButton(val) {
        setOutput('');
        setLastClickWasEquals(false);
    }


    function clickEquals() {
        if (output === ERROR_EXPRESSION) {
            setOutput('');
        }

        else {
            const result = evaluateExpression(output);
            setOutput(result.toString());
        }
        setLastClickWasEquals(true);
    }

    const outputField = <div><button className='output' disabled={true}>{output}</button></div>;    

    const RowOneValues = ['7', '8', '9', '/'];
    const RowOneButtons = 
        RowOneValues.map(
            (val) => {
                return <InputButton key={val} name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowTwoValues = ['4', '5', '6', '*'];
    const RowTwoButtons = 
        RowTwoValues.map(
            (val) => {
                return <InputButton key={val} name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowThreeValues = ['1', '2', '3', '-'];
    const RowThreeButtons = 
        RowThreeValues.map(
            (val) => {
                return <InputButton key={val} name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowFourButtons = 
        <div>
            <InputButton key={'0'} name={'0'} onClickButton={() => clickInputButton('0')}></InputButton>
            <InputButton key={'.'} name={'.'} onClickButton={() => clickInputButton('.')}></InputButton>
            <OutputButton onClickButton={() => clickEquals()}></OutputButton>
            <InputButton key={'+'} name={'+'} onClickButton={() => clickInputButton('+')}></InputButton>
        </div>;

    const RowFiveButtons = 
        <div>
            <InputButton key={'N/A'} name={'N/A'}></InputButton>
            <InputButton key={'DEL'} name={'DEL'} onClickButton={() => clickDeleteButton()}></InputButton>
            <InputButton key={'CLEAR'} name={'CLEAR'} onClickButton={() => clickClearButton()}></InputButton>
            <InputButton key={'^'} name={'^'} onClickButton={() => clickInputButton('^')}></InputButton>
        </div>;

    return (
        <div>
            {outputField}
            <div>{RowOneButtons}</div>
            <div>{RowTwoButtons}</div>
            <div>{RowThreeButtons}</div>
            {RowFourButtons}
            {RowFiveButtons}
      </div>
    );
}
 
export default Calculator;