import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Converter from "./Converter";
import GlobalStyle from "./GlobalStyle";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import {FaRegMoon} from"@react-icons/all-files/fa/FaRegMoon"
interface CriptoPrecos {
  coin: string;
  price: number;
}

function CriptoPrecos() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prices, setPrices] = useState<CriptoPrecos[]>([]);

  const handleThemeChange = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,binancecoin,tron,shiba-inu,lido-staked-ether&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        const newPrices = [
          { coin: "Ethereum (ETH)", price: data.ethereum.usd },
          { coin: "Bitcoin (BTC)", price: data.bitcoin.usd },
          { coin: "Binance Coin (BNB)", price: data.binancecoin.usd },
          { coin: "Tron (TRX)", price: data.tron.usd },
          // { coin: "Lido Staked Ether (STETH)", price: data.lido-staked-ether.usd},
          // { coin: "Shiba Inu (SHIB)", price: data.shiba-inu.usd},
        ];
        setPrices(newPrices);
      })
      .catch((error) => console.error(error));
  }, []);

  // if (cotacao === null) {
  //   return <div>Carregando...</div>;
  // }

  return (
    <div className={`${isDarkMode ? styles.dark : styles.light}`}>
    <button className={styles.themeToggle} onClick={handleThemeChange}>
      {isDarkMode ? <FaMoon className={styles.FaRegMoon}/> :  <FaMoon/>}
    </button>
      <GlobalStyle />
      <h1 className={styles.h1}>Cotação atual criptos</h1>
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr className={styles.tr}>
            <th className={styles.th}>Coin</th>
            <th className={styles.th}>Preço (USD)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(({ coin, price }) => (
            <tr className={styles.tr} key={coin}>
              <td className={styles.td}>{coin}</td>
              <td className={styles.td}>
                {price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Converter />
    </div>
  );
}

export default CriptoPrecos;
