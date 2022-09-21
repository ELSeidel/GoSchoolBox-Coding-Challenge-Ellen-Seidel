import React from 'react';
import './index.css';
 
function InputButton(props) {
    return <button className='button' onClick={props.onClickButton}>{props.name}</button>;
}
 
export default InputButton;