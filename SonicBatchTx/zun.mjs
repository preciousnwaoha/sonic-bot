import web3 from "@solana/web3.js";
import chalk from "chalk";
import bs58 from "bs58";

const connection = new web3.Connection("https://devnet.sonic.game", 'confirmed');

const privkey = "6629vyeuSq5WcVRWb1CorxXPANQpgsaGyEtzqs8ozkQf1v6R8eFpMTdmTwBiZZmhvqQe6aBo48ZqR5LYQ8b4jfMD";
const from = web3.Keypair.fromSecretKey(bs58.decode(privkey));
const to = web3.Keypair.generate();

(async () => {
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to.publicKey,
          lamports: web3.LAMPORTS_PER_SOL * 0.001,
        }),
      );
    
      
      const txCount = 100;
      for (let i = 0; i < txCount; i++) {
      const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
      );
    console.log(chalk.blue('Tx hash :'), signature);
    console.log("");
    const randomDelay = Math.floor(Math.random() * 3) + 1;
    await new Promise(resolve => setTimeout(resolve, randomDelay * 1000));
  }
})();
