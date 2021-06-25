import './App.css';
import APIToken from './artifacts/contracts/APIToken.sol/APIToken.json'
import DAI from './artifacts/contracts/DAI.sol/Dai.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import TokenSend from './components/TokenSend';
import ApproveDai from './components/ApproveDai';

function App() {

  const Token = APIToken;
  const dai = DAI;

  return (
    <>
    
    <div className="App">   
    <Container style={{width:"500px"}}>
   
    <Row className="justify-content-md-center ">
      <Col >
      <Row>
      
      </Row>
      <Row>
      
      <TokenSend tokenContract={Token}
     
      
      />
      
        </Row></Col>
    </Row>
    
    </Container>
    <Container style={{width:"500px"}}>
    <Row className="justify-content-md-center ">
      <Col >
     
      <Row>
       
      <ApproveDai
      tokenContractDai = {dai}
      tokenContract = {Token}
       />
      
        </Row></Col>
    </Row>
    </Container>
    </div>
    </>
  );
}

export default App;