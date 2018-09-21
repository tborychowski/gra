const style = `
.backdrop { position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: #0006; display: none; align-items: center; justify-content: center; }
.window { font: inherit; min-width: 300px; min-height: 100px; border-radius: 5px; box-shadow: 0 3px 20px #000a, 0 0 1px #fff9; }
`;

const template = `<div class="backdrop">
	<div class="focus-catcher-top" tabindex="0"></div>
	<div class="window"><slot></slot></div>
	<div class="focus-catcher-bottom" tabindex="0"></div>
</div>`;

const focusableSelector = [
	"a[href]:not([tabindex='-1'])",
	"input:not([disabled]):not([tabindex='-1'])",
	"select:not([disabled]):not([tabindex='-1'])",
	"textarea:not([disabled]):not([tabindex='-1'])",
	"button:not([disabled]):not([tabindex='-1'])",
	"[tabindex]:not([tabindex='-1'])",
	"[contentEditable=true]:not([tabindex='-1'])",
].join(',');


function animate (el, from, to, opts = {}) {
	return new Promise(resolve => {
		opts = Object.assign({}, {duration: 300, easing: 'ease-out', fill: 'forwards'}, opts);
		const anim = el.animate([from, to], opts);
		anim.oncancel = resolve;
		anim.onfinish = resolve;
	});
}

class XWindow extends HTMLElement {

	constructor () {
		super();
		this.template = document.createElement('template');
		this.template.innerHTML = `<style>${style}</style>${template}`;
		this.templateContent = this.template.content;
	}

	static get observedAttributes () { return ['open']; }

	connectedCallback () {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(this.templateContent.cloneNode(true));
		this.init();
	}

	attributeChangedCallback (name, oldVal, newVal) {
		if (name === 'open') return this.setVisibility(newVal === 'true');
	}

	set open (val) { this.setAttribute('open', val); }
	get open () { return this.getAttribute('open'); }

	hide () {
		this.open = false;
		return this;
	}

	show (trigger) {
		if (trigger) this.trigger = trigger;
		this.open = true;
		return this;
	}

	init () {
		this.backdrop = this.shadowRoot.querySelector('.backdrop');
		this.el = this.shadowRoot.querySelector('.window');
		this.addEventListener('keydown', e => { if (e.key === 'Escape') this.hide(); });
		this.backdrop.addEventListener('click', this.onClick.bind(this));
		this.shadowRoot.querySelector('.focus-catcher-top').addEventListener('focus', () => this.focusEl('last'));
		this.shadowRoot.querySelector('.focus-catcher-bottom').addEventListener('focus', () => this.focusEl('first'));
	}

	focusEl (whichOne) {
		const firstNode = this.querySelector(focusableSelector);
		if (whichOne === 'first') {
			if (firstNode) {
				if (firstNode.tagName in {INPUT: 1, TEXTAREA: 1}) firstNode.select();
				else firstNode.focus();
			}
			else this.el.querySelector('a,button,[tabindex],input,textarea,select').focus();
		}
		else this.buttonsEl.querySelector('button:last-child').focus();
		return this;
	}

	setVisibility (show) {
		if (show) {
			this.fireEvent('showing');
			this.style.display = 'block';
			this.backdrop.style.display = 'flex';
			animate(this.backdrop, {opacity: 0}, {opacity: 1});
			animate(this.el, {transform: 'scale(0.85)'}, {transform: 'scale(1)'})
				.then(() => this.fireEvent('visible').focusEl('first'));
		}
		else {
			this.fireEvent('hiding');
			animate(this.backdrop, {opacity: 1}, {opacity: 0});
			animate(this.el, {transform: 'scale(1)'}, {transform: 'scale(0.85)'}).then(() => {
				this.backdrop.style.display = 'none';
				this.style.display = 'none';
				if (this.trigger) this.trigger.focus();
				this.fireEvent('hidden');
			});
		}
		return this;
	}


	onClick (e) {
		if (e.target === this.backdrop) return this.hide();
	}

	fireEvent (name, detail) {
		this.dispatchEvent(new CustomEvent(name, { detail }));
		return this;
	}

}

customElements.define('x-window', XWindow);
export default XWindow;
