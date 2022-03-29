const createPages = (allPages: number, currentPage: number) => {
  const resultPagesCount = [];

  if (currentPage > 2) {
    if (currentPage <= allPages - 1) {
      for (let i = currentPage - 1; i < currentPage + 2; i += 1) {
        resultPagesCount.push(i);
        if (currentPage === allPages) break;
      }
    } else {
      for (let i = currentPage - 2; i <= allPages + 2; i += 1) {
        resultPagesCount.push(i);
      }
    }
  } else {
    for (let i = 1; i <= 3; i += 1) {
      resultPagesCount.push(i);
    }
  }

  return resultPagesCount;
};

export default createPages;
