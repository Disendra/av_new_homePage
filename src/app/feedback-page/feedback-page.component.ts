import { Component, TemplateRef, ViewChild, AfterViewInit, OnInit } from '@angular/core'
import { UserServicesService } from '../services/user-services.service'
import { PopupService } from '../services/popup.service'

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  dialogRef: any
  emailId: any
  message: any
  rating: any;
  userName : any;
  isDialogOpen: boolean = false;
  error : boolean = false;
  @ViewChild('firstDialog') firstDialog!: TemplateRef<any>
 

  constructor (
    public popUp : PopupService,
    public userService: UserServicesService
  ) {
  
  }
  ngOnInit(): void {
    this.emailId = localStorage.getItem('emailId');
    this.userName = localStorage.getItem('userName');
    const dialogOpened = localStorage.getItem('dialogOpened');
    if (dialogOpened) {
      setTimeout(() => {
        this.popUp.openDialogWithTemplateRef(this.firstDialog);
        localStorage.setItem('dialogOpened', 'true');
      }, 30000);
    }
  }
  
  displaySelectedRating (rating: any) {
    this.rating = rating
  }

  onSubmit () {
    if(this.rating) {
    const feedbackData = {
      rating: this.rating,
      emailId: this.emailId,
      message: this.message,
      userName : this.userName
    }
    this.userService.insertFeedback(feedbackData).subscribe(
      (response: any) => {
        console.log(response);
        this.popUp.closeDialog();
      },
      (error: any) => {
        console.error(error)
      }
    )
    }
    else {
      this.error = true;
    }
  }
}
