import React from 'react';
import './index.css';
 
function OutputButton(props) {
    return <button className='button' onClick={props.onClickButton}>{'='}</button>;
}
 
export default OutputButton;