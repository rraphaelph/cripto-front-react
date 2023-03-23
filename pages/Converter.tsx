import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./App.module.css";

const Converter: React.FC = () => {
  const [realAmount, setRealAmount] = useState<number | "">("");
  const [bitcoinAmount, setBitcoinAmount] = useState<number | "">("");

  const convertRealToBitcoin = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=BRL"
      );
      const data = await response.json();
      const bitcoinPriceInBRL = data.bitcoin.brl;

      const bitcoinAmount = realAmount && realAmount  / bitcoinPriceInBRL;

      setBitcoinAmount(bitcoinAmount && Number(bitcoinAmount.toFixed(8)));
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  useEffect(() => {
    if (realAmount) {
      convertRealToBitcoin();
    }
  }, [realAmount]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealAmount(Number(event.target.value));
  };

  return (
    <div>
      <h2 className={styles.h1}>Conversor de Real para Bitcoin</h2>
      <div className={styles.h1}>
        Valor em Real:
        <input type="number" value={realAmount} onChange={handleInputChange} />
      </div>
      {bitcoinAmount && (
        <p className={styles.p}>
          {realAmount} reais equivalem a {bitcoinAmount} bitcoins.
        </p>
      )}
    </div>
  );
};

export default Converter;
