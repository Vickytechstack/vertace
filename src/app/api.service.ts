import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post('https://reqres.in/api/users', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUsers() {
    return this.http.get('https://reqres.in/api/users').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(data: any, id: number) {
    return this.http.put('https://reqres.in/api/users/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete('https://reqres.in/api/users/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
