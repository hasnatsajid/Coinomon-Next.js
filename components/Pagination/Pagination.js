import LeftChevron from '../../svgs/leftChevron.svg';
import RightChevron from '../../svgs/rightChevron.svg';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';

import { DOTS, usePagination } from '../../hooks/usePagination';
import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

const Pagination = (props) => {
  const router = useRouter();
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const { pathname } = router;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  useEffect(() => {}, [paginationRange]);

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    // window.scrollTo({ behavior: 'smooth', top: '0px' });
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    // window.scrollTo({ behavior: 'smooth', top: '0px' });
  };

  const onPageClick = (pageNumber) => {
    onPageChange(pageNumber);
    // window.scrollTo({ behavior: 'smooth', top: '0px' });
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationBlock}>
        <ul>
          <li disabled={currentPage === 1} onClick={onPrevious}>
            <Link href={pathname}>
              <a>
                <LeftChevron />
              </a>
            </Link>
          </li>
          {paginationRange &&
            paginationRange.map((pageNumber, i) => {
              if (pageNumber === DOTS) {
                return (
                  <li key={i} className="pagination-item dots">
                    &#8230;
                  </li>
                );
              }

              return (
                <li
                  key={i}
                  selected={pageNumber === currentPage}
                  className={pageNumber === currentPage && styles.selected}
                  onClick={() => onPageClick(pageNumber)}
                >
                  <Link href={pathname}>
                    <a>{pageNumber}</a>
                  </Link>
                  {/* <Link href={`/?page=${pageNumber}`}> {pageNumber}</Link> */}
                </li>
              );
            })}
          <li disabled={currentPage === lastPage} onClick={onNext}>
            <Link href={pathname}>
              <RightChevron />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
