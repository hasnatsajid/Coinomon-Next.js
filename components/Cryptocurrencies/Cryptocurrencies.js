import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import PriceList from '../PriceList/PriceList';
import styles from './Cryptocurrencies.module.scss';

const Cryptocurrencies = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const cryptocurrenciessUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=7d%2C24h`;
  const { data: cryptocurrenciesData, isLoading, error } = useFetch(cryptocurrenciessUrl, {});

  let content = (
    <tr>
      <td>Loading ...</td>
    </tr>
  );

  if (cryptocurrenciesData && cryptocurrenciesData.length > 0) {
    content = cryptocurrenciesData.map((crypto) => (
      <tr key={crypto.id}>
        <td>{crypto.market_cap_rank ? crypto.market_cap_rank : 'N/A'}</td>
        <td>
          <img src={crypto.image} alt="" />
          <span>{crypto.name}</span>
        </td>
        <td>${crypto.current_price && crypto.current_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</td>
        <td>{crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : 'N/A'}%</td>
        <td>{crypto.price_change_percentage_7d_in_currency ? crypto.price_change_percentage_7d_in_currency.toFixed(2) : 'N/A'}%</td>
        <td>${crypto.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        <td>${crypto.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
      </tr>
    ));
  }

  return (
    <>
      <PriceList />
    </>
  );
};

export default Cryptocurrencies;
