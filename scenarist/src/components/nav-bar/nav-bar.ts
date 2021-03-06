import { IScenario } from './../../models/scenario';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(EventAggregator)
export class NavBarCustomElement {
  @bindable public router: Router;
  public activeScenarioLabel = '';
  // private sideNav: any;
  private sideNavVisible = true;
  private subscriptions: Subscription[] = [];

  constructor(private ea: EventAggregator) { }

  public attached() {
    // this.sideNav = ($('.button-collapse') as any).sideNav;
    // this.sideNav({
    //   menuWidth: 300, // Default is 300
    //   // edge: 'right', // Choose the horizontal origin
    //   closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    //   draggable: true // Choose whether you can drag to open on touch screens,
    //   // onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
    //   // onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    // });
    this.subscriptions.push(this.ea.subscribe('activeScenarioChanged', s => this.updateTitle(s)));
    this.subscriptions.push(this.ea.subscribe('scenariosUpdated', s => this.updateTitle(s)));
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  public toggleMenu() {
    this.sideNavVisible = !this.sideNavVisible;
    // this.sideNav(this.sideNavVisible ? 'show' : 'hide');
    ($('.button-collapse') as any).sideNav('show');
  }

  private updateTitle(scenario?: IScenario) {
    this.activeScenarioLabel = scenario && scenario.title ? `${scenario.title} | ` : '';
  }
}
