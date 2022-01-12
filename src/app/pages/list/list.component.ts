import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: any = [];
  closeResult: string = '';
  modalReference!: NgbModalRef;
  constructor(
    private router: Router,
    private service: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDatas();
  }

  getUserDatas() {
    this.service.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }
  viewUser(id: any) {
    this.modalReference = this.modalService.open(ProfileComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
    });
    this.modalReference.componentInstance.userId = id;
  }

  deleteUser(content: any, id: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.service.deleteUser(id).subscribe((deleted: any) => {
            this.toastr.info('Deleted!', deleted);
            this.router
              .navigateByUrl('/addUser', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['']);
              });
          });
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
