import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.service.addUsers(this.userForm.value).subscribe((response: any) => {
      this.toastr.success('Saved!', response.USERS);
      this.userForm.reset();
      this.router.navigate(['']);
    });
  }
}
