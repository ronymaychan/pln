﻿import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),
        new MenuItem(this.l("SecurityMenu"), "", "menu", "", [
            new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
            new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
            new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        ]),
        new MenuItem(this.l("CatalogsMenu"), "", "menu", "", [
            new MenuItem(this.l("Countries"), "Pages.Countries", "local_offer", "/app/countries"),
            new MenuItem(this.l("States"), "Pages.States", "local_offer", "/app/states"),
            new MenuItem(this.l("Cities"), "Pages.Cities", "local_offer", "/app/cities")
        ])
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}