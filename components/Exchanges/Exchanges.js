import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import styles from './Exchanges.module.scss';

const Exchanges = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const exchangesUrl = `https://api.coingecko.com/api/v3/exchanges?per_page=${pageSize}&page=${page}`;
  const { data: exchangesData, isLoading, error } = useFetch(exchangesUrl);

  let content = (
    <tr>
      <td>Loading ...</td>
    </tr>
  );

  if (exchangesData && exchangesData.length > 0) {
    content = exchangesData.map((exchange) => (
      <tr key={exchange.id}>
        <td>{exchange.trust_score_rank ? exchange.trust_score_rank : 'N/A'}</td>
        <td>
          <img src={exchange.image} alt="" />
          <span>{exchange.name}</span>
        </td>
        <td>{exchange.trust_score}</td>
        <td>{exchange.trade_volume_24h_btc ? exchange.trade_volume_24h_btc.toFixed(2) : 'N/A'}</td>
        <td>{exchange.country ? exchange.country : 'N/A'}</td>
        <td>{exchange.year_established ? exchange.year_established : 'N/A'}</td>
      </tr>
    ));
  }

  return (
    <>
      <div className={styles.exchangesPage}>
        <div className={styles.exchangesPageTitle}>Top Cryptocurrency Exchanges Ranking by Trust Score</div>
        <div className={styles.priceItems}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Exchange</th>
                <th>Trust Score</th>
                <th>24h Volume (BTC)</th>
                <th>Country</th>
                <th>Year Established</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>

      <Pagination totalCount={250} currentPage={page} pageSize={pageSize} onPageChange={(page) => setPage(page)} />
    </>
  );
};

export default Exchanges;
