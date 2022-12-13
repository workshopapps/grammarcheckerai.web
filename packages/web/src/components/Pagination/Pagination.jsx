import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

function Pagination({ cardsPerPage, page, totalCards, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="mt-4">
      <ul
        className={
          page === 1 ? 'flex items-center gap-4 justify-end pb-6' : 'flex items-center gap-4 justify-between pb-6'
        }
      >
        {page > 1 && (
          <b onClick={() => paginate(page - 1)} className="flex gap-2 items-center cursor-pointer">
            <BiLeftArrow /> Prev
          </b>
        )}
        {page < Math.ceil(totalCards / cardsPerPage) && (
          <b onClick={() => paginate(page + 1)} className="flex gap-2 items-center cursor-pointer">
            Next <BiRightArrow />
          </b>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
