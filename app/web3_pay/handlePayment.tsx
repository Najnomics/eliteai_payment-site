"use client";

import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { sendSol } from "../utils/pay_via_web3/solanaUtils";
import { toast } from "react-toastify";

const COMPANY_WALLET_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_WALLET_ADDRESS;

interface Params {
  setPaySol: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  handleWeb3PostPayment: () => Promise<void>;
}

export default function HandlePayment({
  setPaySol,
  price,
  handleWeb3PostPayment,
}: Params) {
  const wallet = useWallet();
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMade, setPaymentMade] = useState(false);

  // Fetch the current SOL to USD exchange rate
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
      }
    };

    fetchSolPrice();
  }, []);

  const handleSendSol = async () => {
    //set processing to true and update button text
    setProcessing(true);
    if (!wallet.publicKey || !wallet.signTransaction) {
      alert("Connect a wallet first!");
      return;
    }

    if (solPrice === null) {
      alert("Unable to fetch SOL price. Please try again later.");
      return;
    }

    const amountInSol = price / solPrice;

    try {
      const recipientPubkey = new PublicKey(
        COMPANY_WALLET_ADDRESS
          ? COMPANY_WALLET_ADDRESS
          : "HcoAjaHANkokq2V24LvEKfC38NehpDd2s3PV59fSqsdr"
      );
      const signature = await sendSol(wallet, recipientPubkey, amountInSol);
      setTransactionHash(signature);

      setProcessing(false);
      //show toast of payment successful
      toast.success("Payment successful ✅");
      //set paid to true
      setPaymentMade(true);
      //send email here
      handleWeb3PostPayment();
    } catch (error) {
      toast.success("Payment failed ❌");
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className=" h-max w-[20rem] rounded-lg p-10 bg-gray-900 backdrop-blur-lg text-white">
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold mt-5">Send Solana Payment</h1>

        {solPrice !== null ? (
          <p className="">
            Amount to pay: {(price / solPrice).toFixed(4)} SOL ($
            {price}).
          </p>
        ) : (
          <p className="mt-3">Fetching current SOL price...</p>
        )}
      </div>

      {!paymentMade && (
        <button
          className="bg-purple-700 px-4 py-2 rounded text-white mt-10"
          onClick={handleSendSol}
          disabled={solPrice === null || processing}
        >
          {processing
            ? "Processing..."
            : solPrice
            ? `Send ${price / solPrice} SOL`
            : "Fetching..."}
        </button>
      )}
      <button
        className="border-2 border-white px-4 py-2 rounded text-white mt-5 w-full"
        onClick={() => setPaySol(false)}
      >
        Close
      </button>

      {transactionHash && (
        <p className="mt-3">
          ✅ Transaction successful!{" "}
          <a
            href={`https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View on Solana Explorer
          </a>
        </p>
      )}
    </div>
  );
}
function sendEmail(
  arg0: any,
  arg1: string,
  text: string,
  arg3: any,
  arg4: any,
  arg5: string
) {
  throw new Error("Function not implemented.");
}
