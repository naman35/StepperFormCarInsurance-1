import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { CommonDataService } from '../../../../shared/common-data.service';
import { InstallmentService } from './installment.service';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css'],
})
export class InstallmentComponent implements OnInit {
  installmentForm: FormGroup;
  errorMessage;
  @Output() OnToggle = new EventEmitter();
  @Input() termSelected: string;
  serviceData;
  obj;

  @Output() OnSinglePayment = new EventEmitter<any>();
  @Output() OnTwoPayments = new EventEmitter<any>();
  @Output() OnFourPayments = new EventEmitter<any>();
  @Output() OnSubmission = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private GAService: GoogleAnalyticsService,
    private installmentService: InstallmentService,
    private commonDataService: CommonDataService
  ) { }

  ngOnInit() {
    this.installmentForm = this.formBuilder.group({
      term: ['', Validators.required],
      installment: [''],
    });
    this.installmentService.getInstallmentData().subscribe(
      (res) => {
        this.serviceData = res;
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }
  submitInstalmentForm() {
    this.router.navigate(['/']);
  }
  submit = () => {
    this.GAService.event('Next Button clicked', 'Installment', 'Next');
    this.commonDataService.installment.next(this.obj);
    this.OnSubmission.emit('Installemt form is submitted!');
  }
  change = () => {
    for (const element of this.serviceData) {
      if (element.title === this.installmentForm.value.term) {
        const obj = {
          term: this.installmentForm.value.term,
          installments: element.installments,
          amount: element.amount,
        };
        this.obj = obj;
      }
    }
    if (this.installmentForm.valid) {
      this.OnToggle.emit(true);
      this.commonDataService.installment.next(this.obj);
    } else {
      this.OnToggle.emit(false);
    }
    this.commonDataService.installmentData.next(this.obj);
    // code for storybook START
    if (this.obj.term === this.serviceData[0].title) {
      this.OnSinglePayment.emit('You have opted Single Payment option');
    } else if (this.obj.term === this.serviceData[1].title) {
      this.OnTwoPayments.emit('You have opted Two Payments option');
    } else {
      this.OnFourPayments.emit('You have opted Four Payments option');
    }
    // code for storybook START
  }

  get formControl() {
    return this.installmentForm.controls;
  }
}
