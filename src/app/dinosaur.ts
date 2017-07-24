import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
//import { FormsModule } from '@angular/forms';
import { NewUser } from './NewUser';

@Component({
  selector: 'dinosaurs',
  providers: [UserService],
  template: `
<div>
    <ul>
        <li *ngFor="let user of users; let i = index;">
            <span (click)="fillFormWithUserData(i)">
                {{user.firstName}} - {{ user.lastName }} - {{ user.age }}
            </span>
            <span (click)="deleteUser(i)">X</span>
        </li>
    </ul>
    <form>
        <label>Name:</label>
        <input [(ngModel)]="newUser.firstName" />
        <label>Last name:</label>
        <input [(ngModel)]="newUser.lastName" />
        <label>Email:</label>
        <input [(ngModel)]="newUser.email" />
        <label>Age:</label>
        <input [(ngModel)]="newUser.age" />
    </form>
    <button (click)="handleSave()">Save</button>
</div>
`
})

export class DinosaurComponent implements OnInit {
  dinos: any[];
  error: any;
  users: any[];
  usersOlderThan20: any[];
  newUser: NewUser = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  };
  index: number;

  constructor(private userService: UserService) { }

  handleSave() {
      if (this.newUser.id) {
          this.updateUser();
      } else {
          this.addUser();
      }
  }

  addUser() {
      this.userService
      .addNewUser(this.newUser)
      .then(result1 => result1.json())
      .then(createdUser => {
          this.users.push(createdUser);
          this.clearForm();
      });
  }

  deleteUser(index) {
      this.userService
      .deleteUser(this.users[index])
      .then((result) => {
          console.log(result);
          this.users.splice(index, 1);
      })
      .catch((error) => {
          console.log(error);
      });
  }

  getDinos() {
    this.userService
        .getDinos()
        .then(dinos => this.dinos = dinos)
        .catch(error => this.error = error);
  }

  getUsers() {
      this.userService
        .getUsers()
        .then(users => {
              const usersOlderThan20 = [];
              users.map(user => {
                  if (user.age > 20) {
                      usersOlderThan20.push(user);
                  }
              });
              this.users = users;
              this.usersOlderThan20 = usersOlderThan20;
          })
        .catch(error => this.error = error);
  }

  fillFormWithUserData(index) {
      this.newUser = new NewUser(
          this.users[index].id,
          this.users[index].firstName,
          this.users[index].lastName,
          this.users[index].email,
          this.users[index].age
      );
      this.index = index;
  }

  updateUser() {
      this.userService
        .updateUser(this.newUser)
        .then(result => result.json())
        .then(updatedUser => {
              this.users.map((user, index, usersArray) => {
                  if (user.id === updatedUser.id) {
                      usersArray[index] = updatedUser;
                  }
              });
              this.clearForm();
        })
        .catch(error => console.log(error));
  }

  clearForm() {
      this.newUser = new NewUser(null, '', '', '', '');
  }

  ngOnInit() {
      this.getUsers();
  }
}
