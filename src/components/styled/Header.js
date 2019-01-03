import styled from 'styled-components'

const Header = styled.h1`
  margin:0;
  padding: ${p => p.primary ? "0.5em" : "0.3em"};
  text-align: center;
  background: ${p => p.primary ? "black" : "darkcyan"};
  color: white;
  // width: ${p => p.primary ? "30vw" : "10vw"};
  font-weight: ${p => p.primary ? "bold" : "400"};
  font-size: 1.3rem;
   -webkit-box-shadow:0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow:0 3px 2px rgba(0, 0, 0, 0.2);
`

export default Header