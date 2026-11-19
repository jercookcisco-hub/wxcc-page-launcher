class ExternalAppLauncher extends HTMLElement {
  connectedCallback() {
    const url = this.getAttribute('url');
    const label = this.getAttribute('label') || 'External application';
    const root = this.attachShadow({mode:'open'});
    const button = document.createElement('button');
    button.textContent = `Open ${label} in new tab ↗`;
    button.style.cssText = 'padding:12px 20px;font:inherit;cursor:pointer;border-radius:6px;border:1px solid #777;background:#fff;color:#222';
    button.addEventListener('click', () => {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:') throw new Error('HTTPS required');
        window.open(parsed.href, '_blank', 'noopener,noreferrer');
      } catch(e) { alert('Configure a valid HTTPS portal URL.'); }
    });
    root.append(button);
  }
}
customElements.define('external-app-launcher', ExternalAppLauncher);
