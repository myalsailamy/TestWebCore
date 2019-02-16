import { AlertifyService, ConfirmResult } from './../services/Alertify.service';
import { MemberEditComponent } from './../components/members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  actionResult = false;
  constructor(private alertify: AlertifyService) { }
  async canDeactivate(component: MemberEditComponent) {

    if (component.editForm.dirty) {

      const confirm = await this.alertify.promisifyConfirm('إنتـبــه', 'تم تعديل البيانات الخاصة بك هل تود الإستمرار بدون حفظ البيانات');
      if (confirm === ConfirmResult.Ok) {
        this.actionResult = true;
      } else {
        this.actionResult = false;
      }
      return this.actionResult;
    }
    return true;
  }


}
