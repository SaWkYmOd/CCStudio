/* ============ DOWNLOAD SETTINGS — edit these two lines ============
   DIRECT_URL : file hosted with the site (put the zip in /downloads)
   GITHUB_URL : your GitHub releases page
   MODE       : "direct"  -> main button downloads the zip
                "github"  -> main button opens GitHub
                "both"    -> main button opens a small chooser           */
var DIRECT_URL = "downloads/CC-Studio-win64.zip";
var GITHUB_URL = "https://github.com/SaWkYmOd/CCStudio/releases/latest";
var MODE = "github";
/* =================================================================== */
(function(){
  var modal=document.getElementById('modal');
  document.getElementById('dDirect').href=DIRECT_URL;
  document.getElementById('dGit').href=GITHUB_URL;
  document.querySelectorAll('[data-dl]').forEach(function(b){
    b.addEventListener('click',function(e){
      e.preventDefault();
      if(MODE==='direct') location.href=DIRECT_URL;
      else if(MODE==='github') window.open(GITHUB_URL,'_blank','noopener');
      else modal.classList.add('on');
    });
  });
  modal.addEventListener('click',function(e){if(e.target===modal||e.target.hasAttribute('data-close'))modal.classList.remove('on')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')modal.classList.remove('on')});
  // image fallback: show a labelled placeholder until the screenshot is added
  document.querySelectorAll('.shot img').forEach(function(img){
    img.addEventListener('error',function(){
      var d=document.createElement('div');d.className='ph';
      d.textContent='Screenshot: '+img.getAttribute('src');
      img.replaceWith(d);
    });
  });
  // lightbox
  var imgs=[].slice.call(document.querySelectorAll('.shot img')),cur=0;
  var lb=document.createElement('div');lb.className='lb';
  lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#8249;</button><img alt=""><button class="n" aria-label="Next">&#8250;</button><div class="cap"></div>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'),cap=lb.querySelector('.cap');
  function show(i){cur=(i+imgs.length)%imgs.length;big.src=imgs[cur].src;big.alt=imgs[cur].alt;cap.textContent=imgs[cur].alt+'  ('+(cur+1)+'/'+imgs.length+')';lb.classList.add('on');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('on');document.body.style.overflow=''}
  imgs.forEach(function(im,i){im.parentNode.addEventListener('click',function(){show(i)})});
  lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(e){e.stopPropagation();show(cur-1)};lb.querySelector('.n').onclick=function(e){e.stopPropagation();show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target===big)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
})();
