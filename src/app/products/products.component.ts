import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router"
import {ProductsInterface} from './productsInterface.component'
import {ProductsNewComponent} from './new/productsNew.component'
import {ProductsNewFlowComponent} from './flow/productFlow.component'
import {ProductsListComponent} from './list/productsList.component'
import {ProductsDirective} from './products.directive'
@Component({
  selector: 'app-products',
  template:`

      <ng-template steep-host></ng-template>
      `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit{
  @ViewChild(ProductsDirective) productHost: ProductsDirective;
  public userName: string;
  private steep : string;
  constructor(
    private routerChange : Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute
    ) {
    routerChange.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                // Show loading indicator
            }
            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                this.steep = route.snapshot.params['steep']
                this.loadComponent();
            }
            if (event instanceof NavigationError) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });
  }
  ngAfterViewInit() {
    //NOTE: este time out se tiene que cambiar a una promesa esto es en un fix temporal
    //NOTE: link de referencia https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    setTimeout(()=>{
      this.userName = "Ion Oliver"
      this.loadComponent();
    },100)
  }
  loadComponent() {
    let componentContainer = null
    console.log(this.steep)
    switch(this.steep){
      case 'new':
        componentContainer = ProductsNewComponent
      break;
      case 'flow':
        componentContainer = ProductsNewFlowComponent
      break;
      default:
        componentContainer = ProductsListComponent
      break;
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentContainer);

    let viewContainerRef = this.productHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
