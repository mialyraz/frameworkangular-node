import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimengService {

  constructor(
    private messageService: MessageService
  ) { }

  transformToTreeSelectFlexible<T>(
    items: T[],
    keyLabel?: string,
    keyValue?: string
  ): any[] {
    return items.map(item => {
      if (typeof item === 'object' && keyLabel && keyValue) {
        return {
          ...item,
          label: item[keyLabel],
          value: item[keyValue]
        };
      } else {
        return {
          label: item,
          value: item
        };
      }
    });
  }

  toast(type = "secondary", summary = "Titre toast", detail = "Le toast est affiché") {
    this.messageService.clear();
    this.messageService.add({
      key: type,
      severity: type,
      summary: summary,
      detail: detail
    });
  }
}
