(function(){
  document.body.classList.remove('no-js');
  // assemble email address at runtime so it never appears in the HTML
  document.querySelectorAll('[data-mail-u]').forEach(function(a){
    var addr=a.getAttribute('data-mail-u')+'@'+a.getAttribute('data-mail-d').split('').reverse().join('');
    a.setAttribute('href','mailto:'+addr);
  });

  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        var sibs=[].slice.call(en.target.parentNode.children).filter(function(c){return c.classList.contains('reveal')});
        var i=Math.max(0,sibs.indexOf(en.target));
        en.target.style.transitionDelay=Math.min(i*40,160)+'ms';
        en.target.classList.add('in');io.unobserve(en.target);
      }
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.05});
  els.forEach(function(e){io.observe(e)});

  var links=[].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  var so=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        links.forEach(function(a){a.removeAttribute('aria-current')});
        var a=document.querySelector('.nav a[href="#'+en.target.id+'"]');
        if(a)a.setAttribute('aria-current','true');
      }
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){so.observe(s)});

})();
