import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';

export interface BossyNavigationConfig {
	activeMenuId: string,
	navigation: BossyNavigationMenuConfig[]
}

export interface BossyNavigationMenuConfig {
	title: string,
	menuId: string,
	subMenus: BossyNavigationMenuConfig[],
    route: string
}

// represents each menu within a navigation bar
@Component({
	selector: 'bossy-navigation-menu',
	templateUrl: '/app/navigation/bossy-navigation-menu.html',
    //styleUrls: ['/app/navigation/_bossy-navigation-menu.css'], // need to break out css
	inputs: ['config', 'interact']
})
export class BossyNavigationMenu implements OnInit {
    private config: BossyNavigationMenuConfig
    
    // view flags
    private isOpen: boolean = false
    private isActive: boolean = false
    
    // track open and active path
    private openPath: BossyNavigationMenuConfig[] = []
    private activePath: BossyNavigationMenuConfig[] = []
    
    // inform menus that an event has occurred
    private interact: EventEmitter<BossyNavigationMenuConfig>
    
	// do we want to depend on router? if not, determining current page is more troublesome
    constructor(private router: Router) {
    }

    // reset menu
    doReset() {
        this.activePath.length = 0;
        this.openPath.length = 0;
        this.activePath.push(this.config);
        this.openPath.push(this.config);
    }

    // open menu
    doOpen() {
        this.openPath = this.activePath.slice();
        this.isOpen = true;
        this.interact.emit(this.activePath[this.activePath.length - 1]);
    }
    
    // close menu and navigate to the given route
    doSelect() {
        this.activePath = this.openPath.slice();
        this.isOpen = false;
        this.router.navigate([this.activePath[this.activePath.length - 1].route]);
    }
    
    // close menu without navigation
    doCancel() {
        this.openPath = this.activePath.slice();
        this.isOpen = false;
    }

    // push menu to the top of the path
    pushState(menu: BossyNavigationMenuConfig) {
        this.openPath.push(menu);
    }
    
    // pop top menu from path until we find the given menu or empty the path
    popState(menu: BossyNavigationMenuConfig) {
        var lastMenu = this.openPath[this.openPath.length - 1];
        while (lastMenu !== menu && this.openPath.length) {
            this.openPath.pop();
            lastMenu = this.openPath[this.openPath.length - 1];
        }
    }
    
    onClickSub(menu: BossyNavigationMenuConfig) {
        // This is a leaf menu
        if (!menu.subMenus) {
            this.pushState(menu);
            this.doSelect();
        // This is a non-leaf menu
        } else {
            this.pushState(menu);
        }
    }
    
    onClickBreadcrumb(menu: BossyNavigationMenuConfig) {
        // This is a leaf menu
        if (!menu.subMenus) {
            this.doSelect();
        }
        // This is the active menu
        else  if (menu === this.openPath[this.openPath.length - 1]) {
            if (this.isOpen) {
                this.doCancel();
            } else {
                this.doOpen();
            }
        // This is an inactive menu
        } else {
            if (this.isOpen) {
                this.popState(menu);
            } else {
                this.doOpen();
                this.popState(menu);
            }
        }
    }
    
    // callback when any menu in the nav has is opened
    onInteract(menu: BossyNavigationMenuConfig) {
        if (menu !== this.activePath[this.activePath.length - 1]) {
            this.doCancel();
        }
    }
    
    // callback when router event has triggered
    onRoute() {
        this.doReset();
        this.isActive = false;
        this.findActive(this.config, null);
    }
    
    // find which navigation is active - should better integrate this with how we set breadcrumb path
    findActive(menu: BossyNavigationMenuConfig, path: BossyNavigationMenuConfig[]) {
        
        // probably better to build a hash to determine active path rather than iterate each time
        var newPath = <BossyNavigationMenuConfig[]>[];
        if (path !== null) {
            newPath = newPath.concat(path);
        }
        newPath.push(menu);
        if (menu.route) {
            if (this.router.isRouteActive(this.router.generate([menu.route]))) {
                this.isActive = true;
                this.openPath = newPath;
                this.activePath = newPath;
            }
        }
        if (menu.subMenus) {
            for (var i = 0; i < menu.subMenus.length; i++) {
                this.findActive(menu.subMenus[i], newPath);
            }
        }
    }
    
	ngOnInit() {
		// should have fallback for missing config
        this.doReset();
        this.interact.subscribe(menu => this.onInteract(menu));
        this.router.subscribe(url => this.onRoute());
	}
}

// represents the entire navigation bar
@Component({
	selector: 'bossy-navigation',
	templateUrl: '/app/navigation/bossy-navigation.html',
	inputs: ['config'],
	//styleUrls: ['/app/navigation/_bossy-navigation.css'], // need to break out css
    directives: [BossyNavigationMenu]
})
export class BossyNavigation {
	public config: BossyNavigationConfig
	public interact: EventEmitter<BossyNavigationMenuConfig> = new EventEmitter()
}

