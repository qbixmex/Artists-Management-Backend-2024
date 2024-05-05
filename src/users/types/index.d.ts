export type QueryParams = {
  order: string;
  orderBy: 'firstName' | 'lastName' | 'role' | 'active';
  limit: number;
  page: number;
};

export type GetAllResponse = {
  total: number;
  users: UserEntity[];
};

export type RequestCreate = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
  imageURL: string;
}

export type RequestUpdate = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  active?: boolean;
  role?: string;
};
