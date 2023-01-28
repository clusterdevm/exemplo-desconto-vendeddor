import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface FoodNode {
  name: string;
  bruto?: number;
  desconto?: number;
  abatimentos: number;
  media: string;
  totalvenda?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'ALESSANDRA CRISTINA VISNIESKI',
    bruto: 4152.37,
    abatimentos: 0,
    desconto: 1335.79,
    media: '32.17%',
    totalvenda: 2816.58,
    children: [
      {
        name: 'varejo',
        bruto: 2363.21,
        abatimentos: 0,
        desconto: 1181.62,
        media: '50%',
        totalvenda: 1181.59,
      },
      {
        name: 'varejo',
        bruto: 1389.57,
        abatimentos: 0,
        desconto: 34.28,
        media: '2.47%',
        totalvenda: 1355.29,
      },
      {
        name: 'varejo ',
        bruto: 399.59,
        abatimentos: 0,
        desconto: 119.89,
        media: '30%',
        totalvenda: 279.7,
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  bruto?: number;
  desconto?: number;
  abatimentos: number;
  media: string;
  totalvenda?: number;
  level: number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  displayedColumns: string[] = [
    'name',
    'bruto',
    'media',
    'desconto',
    'abatimentos',
    'totalvenda',
  ];

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      bruto: node.bruto,
      desconto: node.desconto,
      abatimentos: node.abatimentos,
      media: node.media,
      totalvenda: node.totalvenda,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
