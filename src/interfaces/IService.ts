export interface IService<T> {
  create(obj:T): Promise<T>,
  list(): Promise<T[]>,
  listOne(_id: string): Promise<T | null>,
  update(_id: string, obj:T): Promise<T | null>,
  delete(_id: string): Promise<void>,
}