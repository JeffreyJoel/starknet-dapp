"use client"
// eslint-disable/no-unused-vars
import { useState } from 'react'
import { connect, disconnect } from "starknetkit"
import { Button } from './ui/button';
import { useAccount } from '../provider/AccountProvider';

function Connect() {
  const [connection, setConnection] = useState(Boolean);
  const [address, setAddress] = useState('');
  const { account, setAccount } = useAccount();





  const connectWallet = async() => {
    const { wallet } = await connect( { webWalletUrl: "https://web.argent.xyz" } )

    if(wallet && wallet.isConnected) {
        setConnection(wallet.isConnected)
        setAccount(wallet.account)
        setAddress(wallet.selectedAddress)
    }
  }

  const disconnectWallet = async() => {
    await disconnect()
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
   }

  return (
    <div>
        {
          !connection ? 
          <Button
          onClick={connectWallet}
          className="h-[3rem] min-w-[4rem] gap-2 bg-purple-700 border border-purple-700 px-4 py-3 font-medium text-white lg:min-w-[8rem] rounded-full"
          translate="no"
        >
          Connect Wallet
        </Button>
            // <button className={styles.connectbtn}>Connect</button>
          : 
            <button className="" onDoubleClick={disconnectWallet}>{address.slice(0, 5)}...{address.slice(60, 66)}</button>
        }
    </div>
  )
}

export default Connect