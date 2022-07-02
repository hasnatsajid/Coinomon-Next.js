import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';

import styles from './crypto.module.scss';

import useFetch from '../../hooks/useFetch';

const Crypto = () => {
  const router = useRouter();
  const { crypto } = router.query;
  const [cryptoData, setCryptoData] = useState();

  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${crypto}`;

  const { data: fetchedData, isLoading: cryptoIsLoading, error: cryptoError } = useFetch(cryptoUrl, {});

  useEffect(() => {
    setCryptoData(fetchedData);
  }, [fetchedData, cryptoUrl, crypto]);

  let content = <p>Loading data ...</p>;

  if (!cryptoIsLoading && cryptoData) {
    content = (
      <>
        <div className={styles.crypto__info}>
          <div className={styles.crypto__title}>
            <>{cryptoData.image && <Image src={cryptoData.image.large} width={35} height={35} alt={`World's Largest crypto price tracker `} />}</>
            <div className={styles.crypto__name}>{cryptoData.name}</div>
            <div className={styles.crypto__symbol}>{cryptoData.symbol}</div>
          </div>
          <div className={styles.crypto__price}>
            ${cryptoData.market_data && cryptoData.market_data.current_price.usd ? cryptoData.market_data.current_price.usd.toFixed(2) : 'N/A'}
          </div>
        </div>

        <div className={styles['crypto__additional-info']}>
          <div className={styles.crypto__rank}>{`Rank #${cryptoData.market_cap_rank}`}</div>
          <div className={styles.crypto__category}>Coin</div>
        </div>

        <div className={styles.crypto__basic_stats}>
          <div>
            <h3>Market Cap</h3>
            <p>
              $
              {cryptoData.market_data && cryptoData.market_data.market_cap.usd
                ? cryptoData.market_data.market_cap.usd.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : 'N/A'}
            </p>
          </div>
          <div>
            <h3>Fully Diluted Market Cap</h3>
            <p>
              $
              {cryptoData.market_data &&
                (cryptoData.market_data.fully_diluted_valuation.usd
                  ? cryptoData.market_data.fully_diluted_valuation.usd.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                  : 'N/A')}
            </p>
          </div>
          <div>
            <h3>Volume</h3>
            <p>
              $
              {cryptoData.market_data &&
                (cryptoData.market_data.total_volume.usd
                  ? cryptoData.market_data.total_volume.usd.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                  : 'N/A')}
            </p>
          </div>
          <div>
            <h3>Circulating Supply</h3>
            <p>{`${
              cryptoData.market_data &&
              (cryptoData.market_data.circulating_supply
                ? cryptoData.market_data.circulating_supply.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : 'N/A')
            } ${cryptoData.symbol}`}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.crypto}>
        <div className={styles.crypto__wrapper}>
          {content}

          <div className={styles.charts}></div>
        </div>
      </div>
    </>
  );
};

export default Crypto;
