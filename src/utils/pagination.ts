type ConstructUrlParams = {
  pageNumber: number;
  search: string;
  pathname: string;
};

export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set("page", pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

type ConstructPrevOrNextParams = {
  currentPage: number;
  totalPages: number;
  search: string;
  pathname: string;
};

export const constructPrevOrNextUrl = ({
  currentPage,
  totalPages,
  search,
  pathname,
}: ConstructPrevOrNextParams): { prevUrl: string; nextUrl: string } => {
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = totalPages;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = currentPage + 1;
  if (nextPage > totalPages) nextPage = 1;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });
  return { prevUrl, nextUrl };
};
