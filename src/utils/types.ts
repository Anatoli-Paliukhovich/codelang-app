export type User = {
  id: number;
  username: string;
  role: UserRole;
};

export type UsersResponse = {
  data: {
    data: User[];
    meta: UsersMeta;
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

export type UserRole = "user" | "admin";

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

export type SortParameter = [field: string, direction: "ASC" | "DESC"];

export type Params = {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  searchBy?: string;
};

export type UsersResponseWithParams = UsersResponse & { params: Params };
