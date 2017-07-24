export class NewUser {
    constructor(
        public id : number,
        public firstName : string,
        public lastName : string,
        public email : string,
        public age : string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
}