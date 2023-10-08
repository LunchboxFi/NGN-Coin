# NGN-Coin
A stablecoin to bring Nigerian Naira on Solana

What do i have to do;
- First i have to create naira reserve off chain to this i would use paystack or flutterwave
- I have to create a webhook of some sort to make sure that the supply off-chain is same on-chain(Fiat collaterization)
- --To do this i'll build an api that receives changes from the reserve and mints new tokens to Lunchbox token wallet.
## Alternatively user can mint directly to their wallet..this involves Lunchbox's Buy token gate way
 - They buy using paystack and the NGNC Token 2022 is issued to their wallet address.
   With this Users can accquire NGNC without KYC but they would have to wait for the authority multisig to sign off. They goal is that the wait time will get shorter and shorter with Neuron coordination
