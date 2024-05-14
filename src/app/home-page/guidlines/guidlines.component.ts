import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Route } from '@angular/router'

@Component({
  selector: 'app-guidlines',
  templateUrl: './guidlines.component.html',
  styleUrls: ['./guidlines.component.css']
})
export class GuidlinesComponent implements OnInit {
  filePath: any
  pdfLoaded: boolean = false

  constructor (private route: ActivatedRoute) {}

  ngOnInit (): void {
    setTimeout(() => {
      this.pdfLoaded = true
    }, 2000)

    let route = this.route.snapshot.url.join('/')
    alert(route)
    this.getFiles(route)
  }

  getFiles (route: any) {
    if (route === 'privacy-policy') {
      this.filePath = './assets/guideLines/Privacy-policy.pdf'
    } else if (route === 'cookie-policy') {
      this.filePath = './assets/guideLines/cookie-Policy.pdf'
    }
  }
}
