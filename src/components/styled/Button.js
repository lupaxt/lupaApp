import styled from 'styled-components'

const Button = styled.button`
    cursor: pointer;
    color: white;
   
    background: turquoise;
    
     &:hover {
    background: #786b99;
  }
  z-index: 5;
    transition-duration: 700ms;
    padding: 0.8em;
    font-size: 1.5em;
    font-weight: bold;
     -webkit-box-shadow: 0 5px 12px rgba(0, 0, 0, 0.6);
     box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
`
export default Button