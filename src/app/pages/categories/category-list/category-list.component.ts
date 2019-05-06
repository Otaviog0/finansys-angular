import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryServices: CategoryService) { }

  ngOnInit() {
    this.categoryServices.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(category) {
    const mustaDelete = confirm('Deseja realmente excluir este item?');

    if (mustaDelete) {
      this.categoryServices.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('Erro ao tentar excluir')
      );
    }

  }

}
