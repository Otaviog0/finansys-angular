import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from './../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryServices: EntryService) { }

  ngOnInit() {
    this.entryServices.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry) {
    const mustaDelete = confirm('Deseja realmente excluir este item?');

    if (mustaDelete) {
      this.entryServices.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        () => alert('Erro ao tentar excluir')
      );
    }

  }

}
