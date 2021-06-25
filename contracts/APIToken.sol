// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ALIAPIToken is ERC1155 {
    
    

    IERC20 private _token;
    uint256 public constant AliAPIToken = 0;
    
    constructor(IERC20 token) ERC1155("") {
        //0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735
    _token = token;
    
    }

    function checkDaiAllowance() external view returns(uint daiAllowed,bool){
        
    uint bal =  _token.allowance(msg.sender,address(this));
     
     if( _token.allowance(msg.sender,address(this)) != 0){
        
         return (bal,true);
         
     }
     else{
        return (bal,false);
     }
    }
    
    function getAPIToken(uint _amount) external{
    
     require(_token.allowance(msg.sender,address(this)) != 0,"zero allowance, pleae approve DAI first to be used by this contract");
   
     address from = msg.sender;
     require(_token.transferFrom(from, address(this), _amount)== true,"error");
     _mint(msg.sender, AliAPIToken, _amount * 100, "");
    
}

}
