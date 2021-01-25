import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // Initialize
  constructor(private cs: CommonService) { }

  getFeedbacks(prod_id) {
    return this.cs.get(`feedback/${prod_id}`);
  }

  addFeedback(data) {
    return this.cs.post(`feedback`, data);
  }

  deleteFeedback(feedback_id) {
    return this.cs.delete(`feedback/${feedback_id}`);
  }



}
