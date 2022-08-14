import Image from 'next/image'
import React ,{ useCallback , useState } from 'react';
import styles from '../styles/Home.module.css';
import { TOKENADDRESS, BASECOIN , TOKENNAME, CONTADDRESS, TXNURL, GUIDE, TIPS, TOKENCT } from '../config/constclient';
import SimpleStorageContract from '../config/contracts/Dstate.json';
import toast from "../components/Toast";
import Web3 from 'web3';

export default function Product(props) {
  const { product, onAdd, isConnected, web3, accounts,  rbal, setRbalance } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingr, setIsLoadingr] = useState(false);
  
  const notify = useCallback((type, message , action) => {
    toast({ type, message, action });
  }, []);

  const gotourl = async (urls) => {
    window.open(urls, '_blank').focus();
   }

  const callRedeemCT = async (accounts) => {
    try {
      if(accounts) {
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        CONTADDRESS
      );

        if(!instance) {
          notify("info","Please try again! To know the steps ", GUIDE);
        }
        else {
      await instance.methods.withdraw().send({ from: accounts }, 
      function(error, transactionHash){
        if (error) {
          notify("info","Please try again! To know the steps ", GUIDE);
        } else {
          notify("info","To achieve great earnings-tips & tricks ", TIPS);
          notify("success", "Please find redeem receipt  " , TXNURL + transactionHash);
        }
    });
  }
  } else
  {
    
  }
    } catch (error) {
      notify("info","Please try again! To know the steps ", GUIDE);
    }
  }; 


    /* callredeem */
    const callredeem = async (account) => {
      try {
      setIsLoadingr(true);
      await callRedeemCT(account);
      setIsLoadingr(false);
    } catch (err) {
      setIsLoadingr(false);
    }
    }

  return (
    <span  className={styles.card}>

    <label>Mint</label>
    <div>

        {true && (<button  title="Guide" className={styles.refreshbutton} 
                onClick={(e) => {
                  e.preventDefault();
                  gotourl(GUIDE);
                }}
                disabled={isLoading}>
                  <Image src="/guide.png" alt="Refresh" width={10} height={10} />
                </button>)}
                &nbsp;
        {true && (<button title="Token Scan" className={styles.refreshbutton} 
                onClick={(e) => {
                  e.preventDefault();
                  gotourl(TOKENCT);
                }}
                disabled={isLoading}>
                  <Image src="/settings.png" alt="Refresh" width={10} height={10} />
                </button>)}

                &nbsp;
        {isConnected && (<button title="Refresh Balance" className={styles.refreshbutton} 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setRbalance(accounts);
                  setIsLoading(false);
                }}
                disabled={isLoading}>
                  {isLoading && <span className={styles.loaderre}></span>}
                  {!isLoading && <Image src="/refresh.png" alt="Refresh" width={10} height={10} />}
                </button>)}
 
      </div>

      {!isConnected && (
      <>
      <div className={styles.h3}>
      Polygon Testnet 
      </div>
      <div className={styles.h33}>
      Get Base Currency {BASECOIN} <Image src="/maticcoin.png"  width={20} height={20} /> as incentive
      </div>
      </>
      )}

      {isConnected && (
      <>
      <div className={styles.h3}>
        {Number.parseFloat(rbal).toFixed(3)}<sup className={styles.supf}>{BASECOIN}</sup>
      </div>
      
      {rbal <= 0 && (<div> Your Redeem Balance  </div> )}
      {rbal > 0 && (<div> <button className={styles.betbutton}
       onClick={(e) => {
        e.preventDefault();
        callredeem(accounts);
      }
      }
    disabled={isLoadingr}>
     {isLoadingr && <span className={styles.loaderre}></span>}
      Redeem</button>   </div> )}
     
      </> )}

      <div className={styles.line}></div>
 
      <img className="small" src={product.image} alt={product.name} width={300} height={300} />

      <h3>{product.name}</h3>
      <h6>Specialized Nft generates recurring {BASECOIN} on each mint</h6>
      
      <div>{product.price} <sup>{BASECOIN}</sup></div>

      <div>
        <button className={styles.betbutton} onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
{/* 
      <span className={styles.detailsbut}>
        <button >Details</button>
      </span> */}


      {/* <div className={styles.details}> */}
      {/* <span className={styles.la}>Blockchain</span> 
      <span className={styles.ra}>Binance Smart Chain</span>  */}
      {/* </div> */}

      {/* <div className={styles.details}> */}
      {/* <span className={styles.la}>Token Standard</span> 
      <span className={styles.ra}>ERC-721</span>  */}
      {/* </div> */}
      {/* </div> */}
      </span>
  );
}
