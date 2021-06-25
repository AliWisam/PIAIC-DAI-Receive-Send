import { useState, useEffect} from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Message from './Message'

const APITokenAddress = "0x4c09552Bace79F75aF950FF841ceFC005E1a2BE7"
// const DAIAddress = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";


const TokenSend = (props) => {

  const [showDiv,setShowDiv] = useState(null);

  const [userAccount, setUserAccount] = useState(null)
  const [amount, setAmount] = useState();

  const [id] = useState(0);
  const [balance, setBalance] = useState();
  const [showBalance, setShowBalance] = useState(false);


  const [apiId] = useState(0);
  const [apiAmount, setApiAmount] = useState();
  const [data] = useState(0x00);

  useEffect(() => {  
    requestAccount();
    daiAllowance();
    getBalance();
        
  });

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  async function daiAllowance() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(APITokenAddress, props.tokenContract.abi, signer)
      let daiAllowed = await contract.checkDaiAllowance();
      // console.log("daiAllowed: ", parseInt(daiAllowed[0]._hex),daiAllowed[1]);
      setShowDiv(daiAllowed[1]);
    }
  }
  
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(APITokenAddress, props.tokenContract.abi, provider)
      const balance = await contract.balanceOf(account,id);
      // console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(APITokenAddress, props.tokenContract.abi, signer);
      const transation = await contract.getAPIToken(amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
  }
}
async function sendApiTokens() {
  if (typeof window.ethereum !== 'undefined') {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(APITokenAddress, props.tokenContract.abi, signer);
    const transation = await contract.safeTransferFrom(account,userAccount,apiId,apiAmount,data);
    await transation.wait();
    console.log(`${amount} Coins successfully sent to ${userAccount}`);
}
}
    
  
    return(
      
      <>
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
         <Card.Title>
           Send ALI API tokens
         </Card.Title>
        <Card.Body>
        
        
        <Card.Subtitle> { showBalance ? <Message balance={balance}/> : 0 }
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="to address" />
        <input onChange={e=>setApiAmount(e.target.value)} placeholder="amount of API tokens" />
        <Button onClick={sendApiTokens} variant="success">send </Button>
        </div>
        </Card.Body>       
        
        </Card>

       {showDiv?(
         <>
         <Card className="mt-5" style={{background: "rgba(227, 104, 222, 0.71)"}}>
         <Card.Title>
           Get ALI API Token
         </Card.Title>
        <Card.Body>
        
        
        <Card.Subtitle> { showBalance ? <Message balance={balance}/> : 0 }
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        {/* <input onChange={e => setUserAccount(e.target.value)} placeholder="Payee 0x address" /> */}
        {/* {console.log(userAccount)} */}
        <input onChange={e => setAmount(e.target.value)} placeholder="amount of Dai" />
        <Button onClick={sendCoins} variant="success">send </Button>
        </div>
        </Card.Body>
        
        </Card>
         </>
       ):(
         <>
          <Card  className="mt-5" style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <b>Please approve DAI first to get API tokens</b>
        </Card>
         </>
       )}
    
   
    </>
    )
    
}

export default TokenSend
