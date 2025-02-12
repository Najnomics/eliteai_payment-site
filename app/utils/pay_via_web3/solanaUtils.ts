import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";

const SOLANA_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com"; // Use Mainnet for production
const connection = new Connection(SOLANA_RPC_URL, "confirmed");

/**
 * Sends SOL from one wallet to another
 * @param sender Keypair of the sender
 * @param recipient PublicKey of the recipient
 * @param amount Amount of SOL to send
 */
export async function sendSol(
  wallet: WalletContextState, // ✅ Use WalletContextState instead of Keypair
  recipient: PublicKey,
  amount: number
): Promise<string> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected or signing method unavailable");
  }

  const senderPublicKey = wallet.publicKey; // ✅ Extract public key from wallet

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipient,
      lamports: Math.round(amount * 1_000_000_000), // Convert SOL to lamports
    })
  );

  transaction.feePayer = senderPublicKey;
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  const signedTransaction = await wallet.signTransaction(transaction); // ✅ Use `signTransaction`
  const signature = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );

  await connection.confirmTransaction(signature, "confirmed");

  return signature; // ✅ Return transaction signature
}

/**
 * Sends an SPL token from one wallet to another
 * @param sender Keypair of the sender
 * @param recipient PublicKey of the recipient
 * @param tokenMint PublicKey of the token mint
 * @param amount Amount of tokens to send (in smallest unit)
 */
export async function sendSPLToken(
  sender: WalletContextState,
  recipient: PublicKey,
  tokenMint: PublicKey,
  amount: number
) {
  if (!sender.publicKey || !sender.signTransaction) {
    throw new Error("Wallet not connected or signing method unavailable");
  }

  const senderTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    sender.publicKey
  );
  const recipientTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    recipient
  );

  const transaction = new Transaction().add(
    createTransferInstruction(
      senderTokenAccount,
      recipientTokenAccount,
      sender.publicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  const signedTransaction = await sender.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );
  await connection.confirmTransaction(signature, "confirmed");
  return signature;
}
