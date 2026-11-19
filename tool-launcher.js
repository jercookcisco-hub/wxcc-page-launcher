class WxCCToolLauncher extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({mode:'open'});
    const apps = [
      {name:'Spok', url:this.getAttribute('spok-url') || 'https://YOUR-SPOK-PORTAL.example.com/', color:'#1769aa', icon:'<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>'},
      {name:'Amion', url:this.getAttribute('amion-url') || 'https://www.amion.com/', color:'#008a78', icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M13 14h3M8 18h3"/>'},
      {name:'Everbridge', url:this.getAttribute('everbridge-url') || 'https://manager.everbridge.net/', color:'#bc4b3a', icon:'<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/>'}
    ];
    const style = document.createElement('style');
    style.textContent = `
      :host{display:block;height:100%;box-sizing:border-box;font-family:inherit;color:#182536}
      .wrap{min-height:100%;box-sizing:border-box;padding:clamp(24px,5vw,56px) 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;background:#f7f9fc}
      h1{font-size:24px;font-weight:650;margin:0;text-align:center}
      .grid{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:24px;width:100%;max-width:800px}
      .tile{appearance:none;border:0;border-radius:16px;width:180px;height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;color:white;background:var(--tile-color);cursor:pointer;box-shadow:0 6px 18px rgba(22,35,55,.15);transition:transform .15s,box-shadow .15s}
      .tile:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(22,35,55,.22)}
      .tile:focus-visible{outline:3px solid #172f54;outline-offset:4px}
      svg{width:62px;height:62px;stroke:currentColor;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}
      .name{font-size:19px;font-weight:650;letter-spacing:.1px}
      .hint{margin:0;color:#596779;font-size:13px;text-align:center}
      @media(max-width:580px){.grid{gap:14px}.tile{width:145px;height:145px}}
    `;
    const wrap = document.createElement('main'); wrap.className='wrap';
    const title = document.createElement('h1'); title.textContent='Tool Launcher';
    const grid = document.createElement('div'); grid.className='grid';
    for (const app of apps) {
      const button = document.createElement('button');
      button.className='tile'; button.type='button';
      button.style.setProperty('--tile-color',app.color);
      button.setAttribute('aria-label',`Open ${app.name} in a new tab`);
      button.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${app.icon}</svg><span class="name">${app.name}</span>`;
      button.addEventListener('click',()=>{
        try {
          const target=new URL(app.url);
          if(target.protocol!=='https:' || target.hostname.includes('example.com')) throw new Error('Invalid URL');
          window.open(target.href,'_blank','noopener,noreferrer');
        } catch(err) { window.alert(`Configure a valid HTTPS URL for ${app.name} in the WxCC desktop layout.`); }
      });
      grid.append(button);
    }
    const hint=document.createElement('p'); hint.className='hint';
    hint.textContent='Select an application to open it in a new browser tab.';
    wrap.append(title,grid,hint); root.append(style,wrap);
  }
}
if(!customElements.get('wxcc-tool-launcher')) customElements.define('wxcc-tool-launcher',WxCCToolLauncher);
