import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface Node {
  url: string;
  name: string;
  icon: string;
  children?: Node[];
}

const TREE_DATA_CATEGORY: Node[] = [
  {
    name: 'Категории',
    url: '/url',
    icon: 'icon',
    children: [
      {name: 'Масла и Смазки', url: '/admin/categories-oil', icon: 'waves'},
      {name: 'Металлорежущие', url: '/admin/categories-drill', icon: 'brightness_high'},
    ]
  }
];

const TREE_DATA_PRODUCT: Node[] = [
  {
    name: 'Продукты',
    url: '/url',
    icon: 'icon',
    children: [
      {name: 'Масла и Смазки', url: '/admin/products-oil', icon: 'waves'},
      {name: 'Металлорежущие', url: '/admin/products-drill', icon: 'brightness_high'},
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private transformerCategory = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      icon: node.icon,
      level,
    };
  }

  private transformerProduct = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      icon: node.icon,
      level,
    };
  }

  treeControlCategory = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattenerCategory = new MatTreeFlattener(
    this.transformerCategory, node => node.level, node => node.expandable, node => node.children);

  treeControlProduct = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattenerProduct = new MatTreeFlattener(
    this.transformerProduct, node => node.level, node => node.expandable, node => node.children);

  dataSourceCategory = new MatTreeFlatDataSource(this.treeControlCategory, this.treeFlattenerCategory);
  dataSourceProduct = new MatTreeFlatDataSource(this.treeControlProduct, this.treeFlattenerProduct);

  constructor() {
    this.dataSourceCategory.data = TREE_DATA_CATEGORY;
    this.dataSourceProduct.data = TREE_DATA_PRODUCT;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }

}
