class App extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <x-route path="/">
            <x-app-layout></x-app-layout>
            <x-route path="/" exact>
                <h2>Home Component</h2>
            </x-route>
            <x-route path="/about" exact>
                <h2>About Component</h2>
            </x-route>
            <x-route path="/dashboard" exact>
                <h2>Dashboard Component</h2>
            </x-route>
            <x-route path="*">
                <h2>default Component</h2>
                <a href="#/">Go to the home page</a>
            </x-route>
        </x-route>
        `;
    }
}

class AppLayout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="menu">
            <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#/about">About</a></li>
                <li><a href="#/dashboard">Dashboard</a></li>
                <li><a href="#/nothing-here">Nothing Here</a></li>
            </ul>
        </nav>
        <hr />
        `;
    }
}

export const registerApp = () => {
    customElements.define('x-app', App);
    customElements.define('x-app-layout', AppLayout);
}