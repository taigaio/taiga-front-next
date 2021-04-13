export interface UserStorage<T> {
  createdDate: string;
  key: string;
  modifiedDate: string;
  value: T;
}
