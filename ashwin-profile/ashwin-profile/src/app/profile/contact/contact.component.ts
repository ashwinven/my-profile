import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { SnotifyService } from 'ng-snotify';
import { environment } from '../../../environments/environment';
import * as emailjs from 'emailjs-com';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
 
  contactForm: FormGroup;
  success = false;
  processingStart = false;
  message = '';
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private modalService: NgbModal) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
      lname: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
      msg:   ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  shareEmail(fname: HTMLInputElement,email:HTMLInputElement, message: HTMLInputElement, confirmationModal: any): boolean {
      this.processingStart = true;

      if (this.contactForm.valid) {
        emailjs.init('user_CB5ObPQgHFTqAOKWzUKgL');

        var service_id = 'gmail';
        var template_id = 'template_QHWQYUmw';
        var template_params = {
          to_name: fname.value,
          from_name: email.value,
          reply_to: 'venkatakrishnan.a@husky.neu.edu',
          message_html: message.value
        };
        emailjs.send(service_id, template_id, template_params);

        this.modalService.open(confirmationModal, {centered: true}).result.then((result) => {if (result === 'yes') {
          this.contactForm.reset();
          this.processingStart = false;
        }});
        return false;
    }
  }

}
