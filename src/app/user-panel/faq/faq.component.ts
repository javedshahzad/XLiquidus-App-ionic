import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  faqs: any[] = [];
  backButtonSubscription:any;
  constructor(public _appservices:AppService, public platform:Platform, public _nav:NavController  ) {
    this.faqs = [
      {
        ques: "Lorem ipsum dolor sit amet?",
        ans: "Vivamus est orci, porta a pellentesque at, condimentum sed massa. Donec interdum risus nec porttitor porta."
      },
      {
        ques: "Lorem ipsum dolor sit amet, consectetur adipiscing elit aakk.",
        ans: "Vivamus est orci, porta a pellentesque at, condimentum sed massa. Donec interdum risus nec porttitor porta."
      },
      {
        ques: "Nullam blandit odio ex?",
        ans: "Vivamus est orci, porta a pellentesque at, condimentum sed massa. Donec interdum risus nec porttitor porta."
      },
      {
        ques: "Ut maximus tellus ac diam tristique.",
        ans: "Vivamus est orci, porta a pellentesque at, condimentum sed massa. Donec interdum risus nec porttitor porta."
      },
      {
        ques: "Fusce rhoncus finibus arcu, ut maximus ipsum cursus eget.",
        ans: "Vivamus est orci, porta a pellentesque at, condimentum sed massa. Donec interdum risus nec porttitor porta."
      },
    ];

    setTimeout(() => {
      let acc = document.getElementsByClassName("accordion");
      for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          let panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    }, 100);
  }

  ngOnInit() { 
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    }); 
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
