const Pagination = ({ agentsPerPage, totalAgents, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalAgents / agentsPerPage); i++) pageNumbers.push(i);
  
    return (
      <div className="mt-4 flex justify-center">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className="px-4 py-2 mx-1 bg-purple-600 to-90% rounded border-solid border-2 border-red-400">
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  