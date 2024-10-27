/* Example of usage in HTML:
<button color="default/red/blue" typ="submit / button(default)" ids="button" disabled="true/false"> Button Text </button>
*/

export default class Button extends HTMLElement {
    connectedCallback() {
        this.render();

        const observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                    this.refreshButton();
                    break;
                }
            }
        });

        observer.observe(this, { attributes: true });
    }

    render() {
        let textContent = this.textContent.trim();
        this.innerHTML = '';

        let buttonId = this.getAttribute('ids') || this.generateRandomName(10);
        let isDisabled = this.getAttribute('disabled') === 'true';
        let buttonType = this.getAttribute('typ') || "button";

        // Get the value of the color attribute
        let color = this.getAttribute('color');

        // Define default colors and colors based on the color attribute
        let defaultColors = "w-full rounded-md bg-green-600 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-500";
        let buttonColors = {
            "default": defaultColors,
            "red": "w-full rounded-md bg-red-600 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-gray-500",
            // Add more color options as needed
        }[color] || defaultColors;

        // Create the button element
        let button = document.createElement('button');
        button.id = buttonId;
        button.type = buttonType;
        button.className = buttonColors || defaultColors;
        button.textContent = textContent;

        // Add the disabled attribute if the disable attribute is set to true
        if (isDisabled) {
            button.setAttribute('disabled', '');
        }
        this.appendChild(button);
    }

    refreshButton() {
        this.render();
    }

    generateRandomName(length) {
        let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
