/**
 * @abstract This is the typescript client for a Permanent Delegate SPL token
   it allows mint authority to delegate token authority permanently
 * what this means that when a given token is minted this authority has the power to tranfer or burn the token,
   without the wallet user's permission...this is While this feature certainly has room for abuse, it has many important real-world use cases.
   In some jurisdictions, a stablecoin issuer must be able to seize assets from sanctioned entities. Through the permanent delegate, 
   the stablecoin issuer can transfer or burn tokens from accounts owned by sanctioned entities.
 * 
 */
import {
	clusterApiUrl,
	sendAndConfirmTransaction,
	Connection,
	Keypair,
	SystemProgram,
	Transaction,
  Cluster,
	LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import {
	createInitializeNonTransferableMintInstruction,
	createInitializeMintInstruction,
	getMintLen,
	ExtensionType,
  mintTo,
	TOKEN_2022_PROGRAM_ID,
	getAccountLen,
	createInitializeAccountInstruction,
	createInitializeImmutableOwnerInstruction,
  createInitializePermanentDelegateInstruction,
  createAccount,
  transferChecked,
} from "@solana/spl-token";
import bs58 from 'bs58'


export function loadWalletKey(keypairFile:string): Keypair {
    const fs = require("fs");
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
  }

  /**
   * @param payer: This is the person that pays for this transaction
   * @param authority: This is the authority of the Mint
   * @param mint: This is the keypair for the mint
   * @param permanentDelagate: This is the account that has the permanent delegate privileges
   * @param cluster: devnet || mainnet
   * @returns Transaction signature
   */
  async function mintNGNC(
                  payer: Keypair, 
                  mintAuthority: Keypair,
                  mintKeypair: Keypair, 
                  permanentDelegate: Keypair, 
                  cluster: Cluster
                  ){
    
    const mint = mintKeypair.publicKey;
    const extensions = [ExtensionType.PermanentDelegate];
    const mintLen = getMintLen(extensions);
    const decimals = 9;

    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');


    const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen);
    const mintTransaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mint,
            space: mintLen,
            lamports: mintLamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializePermanentDelegateInstruction(mint, permanentDelegate.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mint, decimals, mintAuthority.publicKey, null, TOKEN_2022_PROGRAM_ID)
    );
   const sig = await sendAndConfirmTransaction(connection, mintTransaction, [payer, mintKeypair], undefined);
   console.log(sig)
   return sig

   }

    const payer = loadWalletKey('mint.json');

    const mintAuthority = Keypair.generate();
    console.log(mintAuthority)
    const mintKeypair = Keypair.generate();
    const permanentDelegate = Keypair.generate();
    
    mintNGNC(
      payer,
      mintAuthority,
      mintKeypair,
      permanentDelegate,
      "devnet"
    )


    //Transfer function
    async function transfer(
                     payer: Keypair,
                     mintAccount: PublicKey,
                     owner1: Keypair, 
                     owner2: Keypair, 
                     cluster: Cluster,
                     ) {
      
      const connection = new Connection(clusterApiUrl(cluster), 'confirmed');

      let destination = await createAccount(
          connection,
          payer,
          mintAccount,
          owner2.publicKey,
          undefined,
          undefined,
          TOKEN_2022_PROGRAM_ID
      );
      let account = await createAccount(connection, payer, mintAccount, owner1.publicKey, undefined, undefined, TOKEN_2022_PROGRAM_ID);
      
      if(account){
        
      const receipt = await mintTo(connection, payer, mintAccount, account, mintAuthority, 5, [], undefined, TOKEN_2022_PROGRAM_ID);
      console.log(receipt)
      const transfer = await transferChecked(
          connection,
          payer,
          account,
          mintAccount,
          destination,
          permanentDelegate,
          2,
          9,
          undefined,
          undefined,
          TOKEN_2022_PROGRAM_ID
      );
      console.log(transfer)
      const source_info = await connection.getTokenAccountBalance(account);
      console.log(source_info)
      const destination_info = await connection.getTokenAccountBalance(destination);
      console.log(destination_info)
      } 
    }

    const owner1 = Keypair.generate()
    const owner2 = Keypair.generate()

    transfer(
        payer,
        mintKeypair.publicKey,
        owner1,
        owner2,
        "devnet"
    )