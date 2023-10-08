import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getAccount } from '@solana/spl-token'

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);
const TOKEN_2022_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);
const walletPublicKey = new PublicKey('8Hs2MzJAuWXt57LKcTsYQaRCZyNUeuyuGHrfAzYQSLDv'); // insert your key
const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');

(async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
        walletPublicKey, { programId: TOKEN_PROGRAM_ID }
      );
      // console.log(tokenAccounts)
      const token2022Accounts = await connection.getTokenAccountsByOwner(
        walletPublicKey, { programId: TOKEN_2022_PROGRAM_ID }
      );
      
      console.log(token2022Accounts)

      /**
       * @fetch account info
       */
      const address = new PublicKey("7jFF1oXnuzmDyCa9Bc971x8sWHcZ4WjvL7cKSSsT6oCD")
      let destination = await getAccount(connection, address, "confirmed" ,TOKEN_2022_PROGRAM_ID)
      console.log(destination)
  
})();