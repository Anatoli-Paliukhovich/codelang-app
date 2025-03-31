import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  UsersResponseWithParams,
  constructUrl,
  constructPrevOrNextUrl,
} from "@/utils";

import { useLoaderData, useLocation } from "react-router-dom";

function PaginationContainer() {
  const { data } = useLoaderData() as UsersResponseWithParams;
  const { totalPages, currentPage } = data.meta;
  const { search, pathname } = useLocation();

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  if (totalPages < 2) return null;

  const renderPagination = pages.map((pageNumber) => {
    const isActive = pageNumber === currentPage;
    const url = constructUrl({ pageNumber, search, pathname });

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: currentPage,
    totalPages,
    search,
    pathname,
  });

  return (
    <Pagination className="mt-14">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationContainer;
