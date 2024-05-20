// eslint-disable-next-line no-unused-vars
import React from 'react';

const RoomPagination = ({currentPage , TotalPage , OnPageChange}) => {
    // const pageNumbers = Array.from({length: TotalPage}, (_, i) => i + 1);

    let pageNumbers = [];
    for(let i = 1; i <= TotalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? "page-item active" : "page-item"}>
                        <button className={"page-link"} onClick={() => OnPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default RoomPagination;