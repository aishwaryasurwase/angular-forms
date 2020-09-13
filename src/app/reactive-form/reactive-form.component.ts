import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female']
  signupForm: FormGroup;
  submitted = false;
  forbiddenUsers = ['Anna', 'Chris'];

  user = {
    username: '',
    email: '',
    gender: 'female'
  }
  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [Validators.required, this.forbiddenUsername.bind(this)]),
        email: new FormControl('', [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([])
    })
    // this.signupForm.valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })
    this.signupForm.statusChanges.subscribe(status=>{
      console.log(status);
    });
    this.signupForm.setValue({
      userData:{
        username: 'Aishwarya',
        email: 'aishwarya@gmail.com'
      },
      gender: 'female',
      hobbies:[]
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm.value);

    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.gender = this.signupForm.controls.gender.value;

    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenUsername(control: FormControl) {
    if (this.forbiddenUsers.indexOf(control.value) !== -1) {
      return { 'nameForbidden': true }
    }
  }

  forbiddenEmail(control: FormControl){
    const promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value == 'test@test.com'){
          resolve({'forbiddenEmailInput': true})
        }else{
          resolve(null);
        }
      },1500);
    })
    return promise; 
  }

}
