import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import moment from 'moment';

@Directive({
  selector: '[deadlineWarning]',
  standalone: true,
})
export class DeadlineWarningDirective implements OnChanges {
  @Input('deadlineWarning') deadline!: string | Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (!this.deadline) return;

    const deadlineMoment = moment(this.deadline);
    const now = moment();
    const hoursLeft = deadlineMoment.diff(now, 'hours');
    const minutesLeft = deadlineMoment.diff(now, 'minutes');

    // Trường hợp deadline còn hơn 12 giờ
    if (hoursLeft > 12) {
      this.renderer.addClass(this.el.nativeElement, 'deadline-far');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'deadline-far');
    }

    // Trường hợp deadline còn dưới hoặc bằng 12 giờ
    if (hoursLeft <= 12 && hoursLeft >= -12) {
      this.renderer.addClass(this.el.nativeElement, 'deadline-warning');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'deadline-warning');
    }

    // Trường hợp deadline đã qua
    if (hoursLeft < -6) {
      this.renderer.addClass(this.el.nativeElement, 'deadline-passed');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'deadline-passed');
    }
  }
}
