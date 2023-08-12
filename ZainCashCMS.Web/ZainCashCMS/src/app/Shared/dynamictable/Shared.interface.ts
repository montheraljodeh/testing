import { Observable } from "rxjs";

export interface Shared<T> {
   
GetAll():any;

  }


  /*

 create(item: T): Promise<T>;
    read(id: string): Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<void>;
    list(): Promise<T[]>;
  */