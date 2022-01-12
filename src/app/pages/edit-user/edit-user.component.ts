import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  editID: any;
  userDetail: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
    this.editID = this.route.snapshot.params.id;
    this.service.getById(this.editID).subscribe((res: any) => {
      this.userDetail = res;
    });
  }

  onSubmit() {
    this.service
      .updateUser(this.userDetail, this.editID)
      .subscribe((response: any) => {
        this.toastr.success('Updated!', response);
        this.editUserForm.reset();
        this.router.navigate(['']);
      });
  }
}
