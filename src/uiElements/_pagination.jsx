import React from 'react'

export default function Pagination(props) {
    const pageNumbers = [];
    const lessThanValue = Math.ceil(props.totalPosts / props.postsPerPage);

    for (let i = 1; i <= lessThanValue; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul> 
                {pageNumbers.map(number => (
                    <li key={number}> 
                        <a href="!">
                            {number}
                        </a>
                    </li>
                ))}
            </ul> 
        </nav> 
    )
}

