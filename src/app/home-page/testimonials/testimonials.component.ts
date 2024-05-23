import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  carouselItems = [
    {
      name: 'Harish N',
      role: 'AV Engineer',
      description: 'The AV CHAMPS Group is a dynamic community consisting of seasoned professionals and experts from the AV industry. Within this group, members leverage their collective knowledge and diverse experiences. " HAPPY TO BE A PART OF THIS NETWORK" !',
      imageUrl: '/assets/img/testimonials/harish.jpeg'
    },
    {   
      name: 'Vishnu Vardhan',
      role: 'AV Engineer',
      description: 'Whether it’s discussing the latest AV innovations or troubleshooting technical challenges, the AV CHAMPS provides a supportive platform for professionals to learn, grow, and succeed in the dynamic world of audiovisual technology. "THANK YOU AV CHAMPS" !',
      imageUrl: '/assets/img/testimonials/vishnu.jpeg'
    },
  ];
}
