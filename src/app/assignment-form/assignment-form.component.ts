import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {
  projectForm: FormGroup;
  projectData = {
    projectname: '',
    mail: '',
    projectStatus: ''
  }
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectname: new FormControl('', Validators.required, this.forbiddenProjectName),
      mail: new FormControl('', [Validators.required, Validators.email]),
      projectStatus: new FormControl('Stable')
    })

  }

  onFormSubmit() {
    this.submitted = true;

    this.projectData.projectname = this.projectForm.value.projectname;
    this.projectData.mail = this.projectForm.value.mail;
    this.projectData.projectStatus = this.projectForm.value.projectStatus;
    console.log("forms ", this.projectForm);

    this.projectForm.reset();
  }

  forbiddenProjectName(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
      if (control.value === 'Test') {
        resolve({ 'forbidden': true })
      } else {
        resolve(null);
      }
    })
    return promise;
  }
}
