const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );


  const APIToken = await hre.ethers.getContractFactory("APIToken");
  const apiToken = await APIToken.deploy("0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735");


  await apiToken.deployed();

  console.log("Token deployed to:", apiToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
