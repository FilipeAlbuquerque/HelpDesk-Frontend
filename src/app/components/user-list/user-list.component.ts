import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { DialogService } from 'src/app/services/dialog.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUsers = [];

  constructor(
    //para mensagem de confirmação, exemplo: 'Quer realmente excluir este utilizado?'
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router,
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listUsers = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }


  edit(id:string){
    this.router.navigate(['/user-new', id]);
  }

  delete(id:string){
    this.dialogService.confirm('Do you want to delete the user?')
    .then((canDelete:boolean) => {
      if(canDelete){
        this.message={};
        this.userService.delete(id).subscribe((responseApi:ResponseApi) => {
          this.showMessage({
            type: 'success',
            text: `User deleted`
          });
          this.findAll(this.page, this.count);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
      }
    });
  }



  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
