import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <forgerock-customization-sidenav>
      <router-outlet></router-outlet>
    </forgerock-customization-sidenav>
  `,
  styles: [`
    ::ng-deep mat-sidenav-content {
      padding: 50px;
    }
  `]
})
export class AppComponent {
  title = "openbanking-ui-customization";
}
