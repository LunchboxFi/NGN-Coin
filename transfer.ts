// create the token transfer
 Transfer function
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