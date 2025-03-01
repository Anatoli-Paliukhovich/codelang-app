export type User = {
	id: number;
	username: string;
	role: UserRole;
 };

export type UsersResponse = {
  data: {
    data: User[];
    meta: UsersMeta;
    links: PaginationLinks;
  };
};

export type UserResponse = {
	data: User;
 };

export type UserStatisticResponse = {
	data: User & { statistic: Statistic };
 };

export type UserProfileLoaderData = {
  user: User;
  statistic: Statistic;
};

export type UserRole = "user" | "guest";

export type UsersMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: SortParameter[];
  searchBy: string[];
  search: string;
  select: string[];
  filter: Record<string, unknown>;
};

export type Statistic = {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
};


export type SortParameter = [field: string, direction: "ASC" | "DESC"];

export type PaginationLinks = {
  first: string;
  previous: string;
  current: string;
  next: string;
  last: string;
};

export type UsersQueryParams = {
  page: number;
  limit: number;
  sortBy: string[];
  search: string;
  searchBy: string[];
};
