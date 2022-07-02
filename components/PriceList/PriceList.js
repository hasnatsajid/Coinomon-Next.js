import styles from './PriceList.module.scss';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

import Pagination from '../Pagination/Pagination';

import Link from 'next/link';
import Image from 'next/image';

const PriceList = () => {
  const [prices, setPrices] = useState();
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const priceUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=7d%2C24h`;

  const { data: priceData, isLoading: priceLoading, error: priceError } = useFetch(priceUrl, {});

  useEffect(() => {
    setPrices(priceData);
  }, [priceUrl, priceData]);

  let content = (
    <tr>
      <td>Loading...</td>
    </tr>
  );

  content =
    prices &&
    prices.map((crypto) => (
      <Link key={crypto.id} href={`/crypto/${crypto.id}`}>
        <a>
          <tr>
            <td>{crypto.market_cap_rank ? crypto.market_cap_rank : 'N/A'}</td>
            <td>
              <img src={crypto.image} alt="" width={25} height={25} />
              <span>{crypto.name}</span>
            </td>
            <td>${crypto.current_price && crypto.current_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>{crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : 'N/A'}%</td>
            <td>{crypto.price_change_percentage_7d_in_currency ? crypto.price_change_percentage_7d_in_currency.toFixed(2) : 'N/A'}%</td>
            <td>${crypto.total_volume && crypto.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>${crypto.market_cap && crypto.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
          </tr>
        </a>
      </Link>
    ));

  if (priceLoading) <p>Loading...</p>;

  return (
    <>
      <div className={styles.priceList}>
        <h2>Latest Cryptocurrency Prices By Market Cap</h2>
        <div className={styles.priceItems}>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h %</th>
                <th>7d %</th>
                <th>Volume(24h)</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>

      <Pagination totalCount={13200} currentPage={page} pageSize={pageSize} onPageChange={(page) => setPage(page)} />
    </>
  );
};

export default PriceList;
