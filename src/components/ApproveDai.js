import { useState,useEffect} from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const DAIAddress = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";
const APITokenAddress = "0x4c09552Bace79F75aF950FF841ceFC005E1a2BE7"

const TokenSend = (props) => {

  const [approveTokens, setApproveTokens] = useState();
  const [daiAllow, setDAiAllow] = useState();
  
  useEffect(() => {  
    daiAllowance();    
  });

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function approveDai() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(DAIAddress, props.tokenContractDai.abi, signer);
      const transation = await contract.approve(APITokenAddress,approveTokens);
      await transation.wait();
  }
}
async function daiAllowance() {
  if (typeof window.ethereum !== 'undefined') {
    // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(APITokenAddress, props.tokenContract.abi, signer)
    let daiAllowed = await contract.checkDaiAllowance();
    console.log(daiAllowed);
    console.log("daiAllowed--->>",parseInt(daiAllowed[0]._hex))
    
    setDAiAllow(parseInt(daiAllowed[0]._hex));
    
    // console.log("daiAllowed DAI>>>>>>>>>>>: ", parseInt(daiAllowed[0]._hex),daiAllowed[1]);

  }
}


    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
          <Card.Title>
            Approve DAI to this Contract
          </Card.Title>
          <Card.Subtitle>
            Dai Allowed: {daiAllow}
          </Card.Subtitle>
        <Card.Body>
        <div className="d-grid gap-2">
        
        <input onChange={e => setApproveTokens(e.target.value)} placeholder="Amount" />
         <Button onClick={approveDai} variant="success">ApproveDai </Button> 
        </div>
        </Card.Body>
        
        </Card>
        
    )
}

export default TokenSend
