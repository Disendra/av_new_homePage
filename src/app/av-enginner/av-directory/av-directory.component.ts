import { Component, OnInit, ViewChild } from '@angular/core'
import { FaServiceService } from 'src/app/services/fa-service.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { UserServicesService } from 'src/app/services/user-services.service'
import { AuthServiceService } from 'src/app/services/auth-service.service'

@Component({
  selector: 'app-av-directory',
  templateUrl: './av-directory.component.html',
  styleUrls: ['./av-directory.component.css']
})
export class AvDirectoryComponent implements OnInit {
  twitterUrl: any
  facebookUrl: any
  instagramUrl: any
  linkedInUrl: any
  userEmailId: any
  imagePath: any
  userData: any[] = []
  pagedUserData: any[] = []
  clickedUserData: any[] = []
  profileData: any[] = []
  pageSize: number =10;
  companyName!: string
  profileImage: any[] = []
  showClickedData: boolean = false
  showFilters: boolean = true
  searchBox: boolean = true
  showSpinner: boolean = false
  filterTerm: string = ''
  emptyLinks: string = 'The user has not updated'
  pageSizeOptions: number[] = [5, 10, 25, 100]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor (
    private faService: FaServiceService,
    private userService: UserServicesService,
    private authService: AuthServiceService
  ) {}

  ngOnInit (): void {
    this.getData(0,this.pageSize);
  }

  getData(offset: number,limit: number) {
    this.showSpinner = true;
    this.faService.getUserDetails(offset, limit, this.filterTerm).subscribe((response: any) => {
      console.log('Response from server:', response)
      this.userData = response.records
      this.userEmailId = response.emailId
      this.applyFilter();
      this.showSpinner = false;
    })
  }
  
  onPageChange (event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    this.getData(offset, event.pageSize);
  }

  applyFilter() {
    this.pagedUserData = this.userData.filter(
      item => {
        const fullName = item.fullName || '';
        const companyName = item.companyName || '';
        return fullName.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
               companyName.toLowerCase().includes(this.filterTerm.toLowerCase());
      }
    );
  
    if (this.pagedUserData.length > 0) {
      this.showFilters = true;
      if (this.paginator) {
        this.paginator.length = this.pagedUserData.length;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.pagedUserData = this.pagedUserData.slice(
          startIndex,
          startIndex + this.paginator.pageSize
        );
      }
    } else {
      this.showFilters = false;
    }
  }
  

  showDetails (item: any) {
    this.searchBox = false
    this.showSpinner = true
    this.showClickedData = true
    console.log('Clicked Item Details:', item)
    let emailId = item.emailId
    this.imagePath = item.imagePath;
    this.userService
      .getSocialMediaProfile(emailId)
      .subscribe((response: any) => {
        this.showSpinner = false
        let records = response.records[0]
        if (response.records.length !== 0) {
          this.twitterUrl = records.twitter || null
          this.facebookUrl = records.faceBook || null
          this.instagramUrl = records.instagram || null
          this.linkedInUrl = records.linkedIn || null
        }
      })

    this.clickedUserData = [item]
  }

  onBack () {
    this.companyName = ''
    this.instagramUrl = ''
    this.facebookUrl = ''
    this.twitterUrl = ''
    this.linkedInUrl = ''
    this.searchBox = true
    this.showClickedData = false
    this.imagePath = ''
  }
}
