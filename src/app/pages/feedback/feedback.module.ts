import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackComponent } from './feedback.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
