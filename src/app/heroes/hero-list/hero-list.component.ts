import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Route, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-list",
  templateUrl: "./hero-list.component.html",
  styleUrls: ["./hero-list.component.css"]
})
export class HeroListComponent implements OnInit, OnDestroy {
  selectedId: number;

  heroes: Observable<Hero[]>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Nuevo Hero-list", this.route.snapshot.paramMap.get("foo"));
    this.getHeroes();
  }

  ngOnDestroy() {
    console.log("Destroy Hero-list.component");
  }

  onSelect(hero: Hero): void {
    this.selectedId = hero.id;
    this.router.navigate(["/hero", hero.id]);
  }

  getHeroes(): void {
    this.heroes = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get("id");
        return this.heroService.getHeroes();
      })
    );
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
