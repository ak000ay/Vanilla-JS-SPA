
export class RouteComponent extends HTMLElement {

    constructor() {
        super();
        this.update = this.update.bind(this);
        this.style.display = 'contents';
    }

    #isActive = false;

    get isActive() {
        return this.#isActive;
    }

    connectedCallback() {
        this.classList.toggle('route', true);
        window.addEventListener('hashchange', this.update);
        this.update();
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.update);        
    }

    static get observedAttributes() {
        return ['path', 'exact'];
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {
        const path = this.getAttribute('path') || '';
        const exact = this.hasAttribute('exact');
        const matches = this.#matchesRoute(path, exact);
        this.#isActive = !!matches;
        this.setIsActive(this.#isActive);
        this.routeChangedCallback.apply(this, matches ? matches.slice() : []);
    }

    setIsActive(active) {
        this.style.display = active ? 'contents' : 'none';
    }

  
    routeChangedCallback(...matches) {}

    #matchesRoute(path, exact) {
        let matches;
      
        if (path === '*') {
            const activeRoutes = 
                Array.from(this.parentNode.querySelectorAll('.route')).filter(_ => _.isActive);
            if (!activeRoutes.length) matches = ['*'];
     
        } else {
            const regex = new RegExp(`^#${path.replaceAll('/', '\\/')}${exact ? '$' : ''}`, 'gi');
            const currentPath = window.location.hash || '#/';
            matches = regex.exec(currentPath);
        }
        return matches;
    }
}

export const registerRouteComponent = () => customElements.define('x-route', RouteComponent);