import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() userId: any;
  usersData: any;
  constructor(
    public activeModal: NgbActiveModal,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.service.getById(this.userId).subscribe((res: any) => {
      this.usersData = res;
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
