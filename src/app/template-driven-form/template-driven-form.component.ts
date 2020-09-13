import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  reply;
  secretChoice = 'teacher';
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  }
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.submitted = true;
    console.log("form value ", form.value.userData.username)
    this.user.username = form.value.userData.username;
    this.user.email = form.value.userData.email;
    this.user.secretQuestion = form.value.question;
    this.user.answer = form.value.answer;
    this.user.gender = form.value.gender;
    
    form.reset();
  }

}
