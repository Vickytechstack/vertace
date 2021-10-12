import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  userData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  first_name: String = '';
  last_name: String = '';
  email: String = '';
  id: number = 0;
  modalDisplay = 'none';

  constructor(private api: ApiService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  clickAddUser() {
    this.email = '';
    this.first_name = '';
    this.last_name = '';
    this.showAdd = true;
    this.modalDisplay = 'block';
  }

  addUserDetails() {
    var data = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    };
    if (this.first_name && this.last_name && this.email != null) {
      this.api
        .addUser(data)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.toast.success('', 'User Added!');
          // alert('User added!');
          let ref = document.getElementById('cancel');
          ref?.click();

          this.getAllUsers();
        })
        .catch((err) => {
          this.toast.error('', 'Something went wrong!');
        });
    } else {
      this.toast.error('', 'Enter your input!');
    }
  }

  getAllUsers() {
    this.api
      .getUsers()
      .toPromise()
      .then((res) => {
        this.userData = res.data;
        console.log(this.userData);
      })
      .catch((err) => {
        this.toast.error('', 'Something wentwrong!');
      });
  }

  deleteUser(row: any) {
    console.log('delete', row.id, row.first_name);

    this.api
      .deleteUser(row.id)
      .toPromise()
      .then((res) => {
        this.toast.success('', `${row.first_name} user Deleted!`);
        this.getAllUsers();
      })
      .catch((err) => this.toast.error('', 'Something wentwrong!'));
  }

  onEdit(row: any) {
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.email = row.email;
    this.showAdd = false;
    this.id = row.id;
    this.modalDisplay = 'block';
    // console.log(row.id);
  }

  updateUserDetails() {
    console.log(this.first_name, this.last_name, this.email);

    var data = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    };
    if (this.first_name && this.last_name && this.email != null) {
      this.api
        .updateUser(data, this.id)
        .toPromise()
        .then((res) => {
          this.modalDisplay = 'block';
          this.toast.success('', 'User Updated!');
          this.modalDisplay = 'none';
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getAllUsers();
        })
        .catch((err) => this.toast.error('', 'Something went wrong!'));
    } else {
      this.toast.error('', 'Enter your input!');
    }
  }
}

// getRecord(route) {
//   return this.http.get<any>(this.baseUrl + route);
// }

// getRecordWithParams(route, params) {
//   return this.http.get<any>(this.baseUrl + route, { params: params });
// }

// post(route, data) {
//   return this.http.post<any>(this.baseUrl + route, data);
// }

// delete(route) {
//   return this.http.delete(this.baseUrl + route).map(response => {
//     return response;
//   });
// }
