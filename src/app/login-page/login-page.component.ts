import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router'
import { FaServiceService } from '../services/fa-service.service'
import { AuthServiceService } from '../services/auth-service.service'
import { MatDialog } from '@angular/material/dialog'
import { PopupService } from '../services/popup.service'
import { FormBuilder, Validators } from '@angular/forms'
import {
  GoogleLoginProvider,
  SocialAuthService
} from '@abacritt/angularx-social-login'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  host: { ngSkipHydration: 'true' },
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  receivedValue: any
  googleUrl: any
  linkedInUrl: any
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private faService: FaServiceService
  ) {}

  ngOnInit () {
    if (this.faService.hasSession()) {
      this.router.navigate(['/avEngineer-dashboard'])
    } else {
      this.route.params.subscribe(params => {
        this.receivedValue = params['value']
      })
    }
  }

  onClick (type: any) {
    if (type === 'google') {
      window.location.href = `http://localhost:3000/auth/google?destination=${this.receivedValue}`
    } else if (type === 'linkedIn') {
      window.location.href = `http://localhost:3000/auth/linkedin?destination=${this.receivedValue}`
    }
  }
}
