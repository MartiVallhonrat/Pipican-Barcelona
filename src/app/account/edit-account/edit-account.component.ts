import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserFirebase } from '../account-interfaces/account.interface';
import { AccountManagmentService } from '../account-managment.service';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes, listAll, deleteObject } from 'firebase/storage';
import { ConfimationDialogComponent } from './confimation-dialog/confimation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {

  hide:boolean = true;
  userId: string = localStorage.getItem("id")!;
  currentUser?: UserFirebase;
  urlImage: string = "../../../assets/profile-placeholder.jpg";
  customError?: boolean;

  constructor(private accountService: AccountManagmentService,
              private fb: FormBuilder,
              private storage: Storage,
              private dialog: MatDialog,
              private router: Router
              ) { }

  form = new FormGroup({
    ProfileImage: new FormControl(""),
    Username: new FormControl(""),
    Email: new FormControl(""),
    Password: new FormControl(""),
    DogBreed: new FormControl(""),
    id: new FormControl("")
  });

  ngOnInit() {
    this.accountService.getItemById(this.userId)
      .subscribe(user => {
        this.currentUser = user;
        if(this.currentUser == undefined) {
          return;
        }
        if(this.currentUser.ProfileImage !== null) {
          this.urlImage = this.currentUser.ProfileImage;
        }; 
        this.form = this.fb.group({
          ProfileImage: new FormControl(this.currentUser.ProfileImage),
          Username: new FormControl(this.currentUser.Username, [Validators.required, Validators.minLength(3)]),
          Email: new FormControl(this.currentUser.Email, [Validators.required, Validators.email]),
          Password: new FormControl(this.currentUser.Password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
          DogBreed: new FormControl(this.currentUser.DogBreed),
          id: new FormControl(this.currentUser.id)
        });
      });
  }

  async onSelectFile(e: any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any) => {
        this.urlImage = event.target.result;
      }

      const folderRef = ref(this.storage, `images/${this.userId}`)
      await listAll(folderRef)
      .then(file => {
        if(file == undefined || file.items.length == 0) {
          return;
        }
        file.items.forEach(itemRef => {
          deleteObject(itemRef);
        });
      });

      const file = e.target.files[0];
      const imgRef = ref(this.storage, `images/${this.userId}/${file.name}`);
      await uploadBytes(imgRef, file);
      await getDownloadURL(imgRef)
        .then((url) => {
          this.form.value.ProfileImage = url;
        })
    }
  }

  onSubmit() {
    this.customError = false;

    if (this.form.invalid) {
      return;
    } 

    this.accountService.getUserByEmail(this.form.value.Email!)
      .then(async snapshot => {
        if(snapshot.size === 0 || snapshot.docs[0].id == this.userId) {
          console.log(this.form.value)
          // @ts-ignore
          await this.accountService.updateUser(this.form.value);
          this.router.navigate([`/home`]);
        } else {
          this.customError = true;
        }
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      }); 
  }

  logout() {
    this.accountService.logout();
  }

  openDialog(): void {
    this.dialog
      .open(ConfimationDialogComponent)
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.accountService.deleteUser(this.userId);
        };
      });
  }
}
