import { useState, useEffect } from "react";
import Connect from "./components/ConnectWallet";
import { Button } from "./components/ui/button";
import abi from "./constants/abi.json";
import { Contract } from "starknet";
import { useAccount } from "./provider/AccountProvider";
import { useContractRead } from "@starknet-react/core";
import { shortString } from "starknet";

function App() {
  const [name, setName] = useState("");
  const { account } = useAccount();
  const [contract, setContract] = useState(null);

  const contractAddress = "0x3119bca18b5ba9fb09b8d9cd36f5bf8b0ce4b962549c8e50a957422048734e6";

  useEffect(() => {
    if (account) {
      const newContract = new Contract(abi, contractAddress, account);
      setContract(newContract);
    }
  }, [account]);

  const { data: currentName, isError, isLoading, error, refetch } = useContractRead({
    functionName: "get_name",
    args: [],
    abi,
    address: contractAddress,
    watch: true,
  });

  console.log(currentName);

  

  async function handleNameChange() {
    if (!contract) return;
    try {
      await contract.set_name(name);
      console.log("Name updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating name:", error);
    }
  }

  return (
    <div className="bg-gray-950 h-[100vh] text-white">
      <div className="w-full flex justify-end p-6">
        <Connect />
      </div>
      <div className="mt-[25%] w-fit mx-auto">
        <div className="flex flex-col">
          <input
            type="text"
            className="text-black p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />
          <Button
            onClick={handleNameChange}
            size="sm"
            className="mt-3 w-fit mx-auto rounded-full bg-purple-700 border border-purple-700 px-4 py-3 font-medium text-white"
            translate="no"
          >
            Update Name
          </Button>
        </div>
        <div className="text-white">
          {isLoading ? (
            <h1 className="text-center text-3xl mt-10">Loading...</h1>
          ) : isError ? (
            <h1 className="text-center text-3xl mt-10">Error: {error?.message}</h1>
          ) : (
            <h1 className="text-center text-3xl mt-10">Current name is {shortString.decodeShortString(`${currentName}`)}!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;