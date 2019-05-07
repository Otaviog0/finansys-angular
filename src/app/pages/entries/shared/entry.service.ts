import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryServices: CategoryService
  ) {
    super('api/entries', injector);
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryServices.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryServices.getById(entry.categoryId).pipe(
      flatMap(
        category => {
          entry.category = category;
          return super.update(entry);
        }
      )
    );
  }

  protected jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
  }

  protected jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}
