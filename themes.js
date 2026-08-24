const THEMES = {
  coastal: {
    label: 'Coastal',
    description: 'Airy blues and sea-glass greens',
    swatch: ['#2F6F78', '#6D9F8A', '#F6FAF8'],
    fontLink: '<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">',
    css: `:root{
      --ink:#183B45;
      --ink-soft:#526A70;
      --bg:#F6FAF8;
      --panel:#FFFFFF;
      --panel-soft:#EDF5F2;
      --line:#D4E3E0;
      --accent:#2F6F78;
      --accent-soft:#DDEEEE;
      --warm:#6D9F8A;
      --warm-soft:#E7F1EB;
      --font-display:'Nunito Sans', sans-serif;
      --font-body:'Nunito Sans', sans-serif;
      --font-mono:'IBM Plex Mono', monospace;
      --radius:16px;
      --shadow:0 8px 28px rgba(35,59,62,.055);
    }
    body.theme-coastal .site-shell{max-width:800px;}
    body.theme-coastal .hero{padding:64px 38px 26px;text-align:left;}
    body.theme-coastal .hero-content{max-width:640px;}
    body.theme-coastal .hero-cover{max-width:724px;margin:34px auto 0;aspect-ratio:16/9;border-radius:20px;}
    body.theme-coastal .section-marker{width:42px;background:var(--accent);}
    body.theme-coastal .gallery{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}
    body.theme-coastal .gallery img{aspect-ratio:1;border-radius:12px;}
    body.theme-coastal .card,body.theme-coastal .place-card{background:rgba(255,255,255,.82);}
    `
  },

  cabin: {
    label: 'Cabin',
    description: 'Grounded teal and warm wood tones',
    swatch: ['#256B66', '#9A6546', '#F5F0E8'],
    fontLink: '<link href="https://fonts.googleapis.com/css2?family=Bitter:opsz,wght@11..96,500;11..96,600;11..96,700&family=Source+Sans+3:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">',
    css: `:root{
      --ink:#2C3732;
      --ink-soft:#5F6B65;
      --bg:#F5F0E8;
      --panel:#FFFDF8;
      --panel-soft:#EEE7DD;
      --line:#DDD2C4;
      --accent:#256B66;
      --accent-soft:#DDEBE7;
      --warm:#9A6546;
      --warm-soft:#EFE2D7;
      --font-display:'Bitter', serif;
      --font-body:'Source Sans 3', sans-serif;
      --font-mono:'IBM Plex Mono', monospace;
      --radius:14px;
      --shadow:0 8px 28px rgba(41,53,31,.06);
    }
    body.theme-cabin .site-shell{max-width:840px;}
    body.theme-cabin .hero{min-height:500px;padding:0;display:flex;align-items:flex-end;text-align:left;background:var(--accent);}
    body.theme-cabin .hero-cover{position:absolute;inset:0;aspect-ratio:auto;border-radius:0;}
    body.theme-cabin .hero-cover::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(25,34,19,.08) 25%,rgba(25,34,19,.7) 100%);}
    body.theme-cabin .hero-content{position:relative;z-index:2;max-width:670px;padding:54px 40px;color:#fff;}
    body.theme-cabin .hero .eyebrow,body.theme-cabin .hero .tagline,body.theme-cabin .hero .host-note{color:rgba(255,255,255,.9);}
    body.theme-cabin .hero.no-cover{min-height:360px;}
    body.theme-cabin section{padding-left:38px;padding-right:38px;}
    body.theme-cabin .section-marker{width:42px;background:var(--warm);}
    body.theme-cabin .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
    body.theme-cabin .gallery img{aspect-ratio:4/3;border-radius:13px;}
    body.theme-cabin .card,body.theme-cabin .place-card{background:rgba(255,253,248,.86);}
    body.theme-cabin nav{background:rgba(245,240,232,.95);}
    `
  },

  loft: {
    label: 'Modern loft',
    description: 'Neutral, calm, and quietly editorial',
    swatch: ['#5E666B', '#A3A5A2', '#F5F5F3'],
    fontLink: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">',
    css: `:root{
      --ink:#242627;
      --ink-soft:#62686A;
      --bg:#F5F5F3;
      --panel:#FFFFFF;
      --panel-soft:#ECEEED;
      --line:#DADDDC;
      --accent:#5E666B;
      --accent-soft:#E9EBEB;
      --warm:#8B8B87;
      --warm-soft:#EEEEEB;
      --font-display:'Inter', sans-serif;
      --font-body:'Inter', sans-serif;
      --font-mono:'IBM Plex Mono', monospace;
      --radius:12px;
      --shadow:0 8px 28px rgba(38,40,38,.055);
    }
    body.theme-loft .site-shell{max-width:980px;}
    body.theme-loft nav{justify-content:flex-start;padding:0 28px;}
    body.theme-loft nav a{flex:0 0 auto;padding-left:15px;padding-right:15px;}
    body.theme-loft .hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(360px,1.05fr);align-items:stretch;gap:0;padding:28px 28px 0;text-align:left;}
    body.theme-loft .hero-content{display:flex;flex-direction:column;justify-content:center;order:1;padding:48px 38px 54px;background:var(--panel);border-radius:20px 0 0 20px;}
    body.theme-loft .hero-cover{order:2;min-height:410px;aspect-ratio:auto;border-radius:0 20px 20px 0;}
    body.theme-loft .hero.no-cover{display:block;padding:28px;}
    body.theme-loft .hero.no-cover .hero-content{max-width:780px;border-radius:20px;}
    body.theme-loft .hero h1{font-size:clamp(38px,5.6vw,62px);font-weight:700;letter-spacing:-.045em;line-height:1.02;}
    body.theme-loft section{padding-left:42px;padding-right:42px;}
    body.theme-loft .section-marker{width:42px;background:var(--accent);}
    body.theme-loft .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
    body.theme-loft .gallery img{aspect-ratio:4/3;border-radius:12px;}
    body.theme-loft .gallery img:first-child{grid-column:1/-1;aspect-ratio:16/8;}
    body.theme-loft .card,body.theme-loft .place-card{background:rgba(255,255,255,.86);}
    `
  }
};
