import React, { useState } from 'react';
import InputButton from './inputButton';
import OutputButton from './outputButton';
import './index.css';
import {ERROR_EXPRESSION, evaluateExpression} from './calculatorUtils'
 
function Calculator() {
    const [output, setOutput] = useState('');

    function clickInputButton(val) {
        if (output === ERROR_EXPRESSION) {
            setOutput(val);
        }
        else {setOutput(output + val);}
    }

    function clickDeleteButton(val) {
        if (output === ERROR_EXPRESSION) {
            setOutput('');
        } 
        else {setOutput(output.slice(0,-1));}
    }

    function clickClearButton(val) {
        setOutput('');
    }

    function clickEquals() {
        if (output === ERROR_EXPRESSION) {
            setOutput('');
        }

        else {
            const result = evaluateExpression(output);
            setOutput(result.toString());
        }
    }

    const outputField = <div><button className='output' disabled='true'>{output}</button></div>;    

    const RowOneValues = ['7', '8', '9', '/'];
    const RowOneButtons = 
        RowOneValues.map(
            (val) => {
                return <InputButton name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowTwoValues = ['4', '5', '6', '*'];
    const RowTwoButtons = 
        RowTwoValues.map(
            (val) => {
                return <InputButton name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowThreeValues = ['1', '2', '3', '-'];
    const RowThreeButtons = 
        RowThreeValues.map(
            (val) => {
                return <InputButton name={val} onClickButton={() => clickInputButton(val)}></InputButton> 
            }
        );

    const RowFourButtons = 
        <div>
            <InputButton name={'0'} onClickButton={() => clickInputButton('0')}></InputButton>
            <InputButton name={'.'} onClickButton={() => clickInputButton('.')}></InputButton>
            <OutputButton onClickButton={() => clickEquals()}></OutputButton>
            <InputButton name={'+'} onClickButton={() => clickInputButton('+')}></InputButton>
        </div>;

    const RowFiveButtons = 
        <div>
            <InputButton name={'DEL'} onClickButton={() => clickDeleteButton()}></InputButton>
            <InputButton name={'CLEAR'} onClickButton={() => clickClearButton()}></InputButton>
            <InputButton name={'??'}></InputButton>
            <InputButton name={'^'} onClickButton={() => clickInputButton('^')}></InputButton>
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