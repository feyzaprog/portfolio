/* ====== DATA PORTFOLIO: tambah karya baru di sini ====== */
const projects = [
 {title:"Film Pendek – Juara 1",category:"Filmmaking",description:"Proyek film pendek bersama tim yang berhasil meraih Juara 1 dalam kompetisi yang diikuti.",image:"assets/img/portfolio/film-pendek.jpg",pos:"center 40%",link:"https://www.instagram.com/reel/DYNVq0JyE6p/",label:"Lihat Project"},
 {title:"Panitia PDD POSSMA V",category:"Graphic Design",description:"Desain kreatif untuk acara POSSMA V: berbagai kebutuhan visual yang menjadi identitas dan publikasi acara.",image:"assets/img/portfolio/possma-v.jpg",fit:"contain",link:""},
 {title:"Video Teaser POSSMA V",category:"Video Making",description:"Video teaser yang dibuat oleh saya dan tim PDD POSSMA V.",image:"assets/img/portfolio/teaser.jpg",pos:"68% center",link:"https://www.instagram.com/p/DeLPK3gNaP5/",label:"Lihat Project"},
 {title:"Desain Postingan IG",category:"Graphic Design",description:"Desain postingan Instagram yang mengabadikan pengalaman dan kenangan mendaki Gunung Lawu.",image:"assets/img/portfolio/lawu.jpg",link:"https://www.instagram.com/p/DWlI1D2EYGu/?img_index=1",label:"Lihat Project"},
 {title:"Film Pendek – Juara 3",category:"Filmmaking",description:"Film pendek untuk memperingati Dies Maulidiyah MAN 1 Jember.",image:"assets/img/portfolio/film2.png",link:"https://www.instagram.com/reel/DJdauS3SOdN/",label:"Lihat Project"},
 {title:"Fotografi Gunung Raung",category:"Photography",description:"Kumpulan karya fotografi selama perjalanan dan pendakian Gunung Raung.",image:"assets/img/portfolio/raung.jpg",link:"https://www.instagram.com/p/DTFggXsAfiI/?img_index=1",label:"Lihat Project"}
];
const WA_NUMBER = "6285122097786";
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = t=>t.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* loader, tahun, navbar */
addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("done"),500));
$("#year").textContent = new Date().getFullYear();
addEventListener("scroll",()=>{$("#toTop").classList.toggle("show",scrollY>500)},{passive:true});
$("#toTop").onclick=()=>scrollTo({top:0,behavior:"smooth"});

/* indikator nav aktif + animasi muncul */
$$("main section").forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)window.setNav&&setNav(s.id);
}),{rootMargin:"-45% 0px -50% 0px"}).observe(s));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");ro.unobserve(e.target)}}),{threshold:.15});
$$(".reveal").forEach(el=>ro.observe(el));

/* portfolio + filter */
const cats=["All","Graphic Design","Photography","Filmmaking","Video Making"];
const fBox=$("#filters"), grid=$("#grid");
cats.forEach((c,i)=>{const b=document.createElement("button");b.textContent=c;if(!i)b.className="on";b.onclick=()=>{$$("button",fBox).forEach(x=>x.classList.remove("on"));b.classList.add("on");render(c)};fBox.append(b)});
function render(cat="All"){
  grid.innerHTML="";
  projects.filter(p=>cat==="All"||p.category===cat).forEach((p,i)=>{
    const el=document.createElement("article");el.className="pcard";el.style.animationDelay=i*70+"ms";
    el.innerHTML=`<div class="thumb"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" style="object-fit:${p.fit||"cover"};object-position:${p.pos||"center"}" onerror="this.replaceWith(document.createTextNode('Tambahkan gambar'))"></div>
    <div class="pbody"><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
    ${p.link?`<a class="btn" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.label||"Lihat Project")}</a>`:`<span class="soon">Link belum tersedia</span>`}</div>`;
    grid.append(el);
  });
}
render();

/* validasi */
function check(input,ok,msg){input.nextElementSibling.textContent=ok?"":msg;return ok}
/* kontak: kirim lewat WhatsApp */
$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();const f=e.target,n=f.name,m=f.email,t=f.msg;
  const ok=[check(n,n.value.trim().length>1,"Isi nama kamu."),check(m,/^\S+@\S+\.\S+$/.test(m.value),"Email tidak valid."),check(t,t.value.trim().length>4,"Pesan terlalu singkat.")].every(Boolean);
  if(!ok)return;
  const text=`Halo Abbad, saya ${n.value.trim()} (${m.value.trim()}).\n\n${t.value.trim()}`;
  open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,"_blank","noopener");f.reset();
});
/* komentar (localStorage) */
const KEY="portfolio_comments";
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}};
function showComments(){
  const list=load(),ul=$("#comments");$("#cCount").textContent=list.length?"("+list.length+")":"";
  ul.innerHTML=list.length?"":"<li>Belum ada komentar. Jadilah yang pertama!</li>";
  list.forEach(c=>{const li=document.createElement("li");li.innerHTML=`<b>${esc(c.name)}</b><small>${esc(c.date)}</small><p>${esc(c.text)}</p>`;ul.append(li)});
}
$("#cForm").addEventListener("submit",e=>{
  e.preventDefault();const n=$("#cName"),t=$("#cText");
  if(![check(n,n.value.trim().length>1,"Isi nama."),check(t,t.value.trim().length>1,"Isi komentar.")].every(Boolean))return;
  const list=load();list.unshift({name:n.value.trim(),text:t.value.trim(),date:new Date().toLocaleDateString("id-ID")});
  try{localStorage.setItem(KEY,JSON.stringify(list.slice(0,50)))}catch{}
  n.value=t.value="";showComments();
});
showComments();

/* ID card 3D (Three.js): tali, tarik, pegas, balik ke Spider-Man */
(()=>{
 const box=$("#id3d"),btn=$("#toggleHero");
 if(!window.THREE){box.textContent="Three.js gagal dimuat. Cek koneksi internet.";return}
 /* ===== PENGATURAN KARTU: ubah di sini ===== */
 const FULL_CARD=true;            // true = gambar kartu penuh (desain dari Canva), tanpa teks bawaan
 const STRAP_TEXT="ABBAD ANNAHID"; // tulisan di tali
 const STRAP_COLOR="#0b0d1c";     // warna tali
 const T=THREE,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
 const R=new T.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=T.sRGBEncoding;box.append(R.domElement);
 const S=new T.Scene(),C=new T.PerspectiveCamera(35,1,.1,50);C.position.z=9;
 S.add(new T.AmbientLight(0xffffff,.95));const L=new T.DirectionalLight(0xffffff,.5);L.position.set(2,3,5);S.add(L);
 const fit=()=>{const w=box.clientWidth,h=box.clientHeight;R.setSize(w,h);C.aspect=w/h;C.updateProjectionMatrix()};fit();addEventListener("resize",fit);
 /* tekstur kartu digambar di canvas */
 function tex(src,mode){
  const cv=document.createElement("canvas");cv.width=512;cv.height=736;const x=cv.getContext("2d"),t=new T.CanvasTexture(cv);t.anisotropy=4;t.encoding=T.sRGBEncoding;
  const base=()=>{x.fillStyle="#ece8d8";x.fillRect(0,0,512,736);x.fillStyle="#1a1a22";x.fillRect(206,22,100,20);
   x.fillStyle="#111";x.textAlign="center";x.font="800 38px Inter,sans-serif";x.fillText("ABBAD F. ANNAHID",256,660);x.fillStyle="#666";x.font="500 24px Inter,sans-serif";x.fillText(mode,256,700)};
  const ph=m=>{const g=x.createLinearGradient(0,70,0,610);g.addColorStop(0,"#2a3358");g.addColorStop(1,"#141a33");x.fillStyle=g;x.fillRect(36,70,440,540);x.fillStyle="#9aa5c0";x.font="500 24px sans-serif";x.textAlign="center";x.fillText(m,256,340);t.needsUpdate=true};
  base();ph("Memuat foto…");
  const im=new Image();
  im.onload=()=>{try{const p=document.createElement("canvas").getContext("2d");p.drawImage(im,0,0,1,1);p.getImageData(0,0,1,1)}catch{base();ph("Buka lewat Live Server");return}
   if(FULL_CARD){cv.width=1024;cv.height=1472;x.drawImage(im,0,0,1024,1472);t.needsUpdate=true;return}
   base();const s=Math.max(440/im.width,540/im.height),w=im.width*s,h=im.height*s;x.save();x.beginPath();x.rect(36,70,440,540);x.clip();x.drawImage(im,36+(440-w)/2,70,w,h);x.restore();t.needsUpdate=true};
  im.onerror=()=>{base();ph("Tambahkan "+src.split("/").pop())};im.src=src;return t}
 const mk=t=>new T.MeshStandardMaterial({map:t,roughness:.3,metalness:.02});
 const rr=(w,h,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s};
 const fg=new T.ExtrudeGeometry(rr(1.8,2.62,.12),{depth:.06,bevelEnabled:true,bevelThickness:.015,bevelSize:.015,bevelSegments:3});fg.translate(0,0,-.03);
 const card=new T.Group();card.add(new T.Mesh(fg,new T.MeshStandardMaterial({color:0x14141e,roughness:.35,metalness:.3})));
 const face=(t,back)=>{const m=new T.Mesh(new T.PlaneGeometry(1.565,2.25),mk(t));m.position.set(0,-.07,back?-.047:.047);if(back)m.rotation.y=Math.PI;card.add(m)};
 face(tex("assets/img/profile.jpg","Creative · Normal Mode"),false);face(tex("assets/img/profile-spiderman.jpg","Creative · Spider-Man Mode"),true);
 const slot=new T.Mesh(new T.PlaneGeometry(.46,.08),new T.MeshBasicMaterial({color:0x000000}));slot.position.set(0,1.18,.047);card.add(slot);
 card.position.y=-1.18;
 const metal=new T.MeshStandardMaterial({color:0xc4cad8,metalness:.9,roughness:.25});
 const ring=new T.Mesh(new T.TorusGeometry(.09,.016,10,24),metal),clip=new T.Mesh(new T.BoxGeometry(.34,.2,.07),metal);clip.position.y=.17;
 const g=new T.Group();g.add(card,ring,clip);S.add(g);
 const sc=document.createElement("canvas");sc.width=64;sc.height=256;const sx=sc.getContext("2d");
 sx.fillStyle=STRAP_COLOR;sx.fillRect(0,0,64,256);sx.translate(32,128);sx.rotate(-Math.PI/2);sx.fillStyle="#e8ecff";sx.font="700 26px Inter,sans-serif";sx.textAlign="center";sx.textBaseline="middle";sx.fillText(STRAP_TEXT,0,0);
 const st=new T.CanvasTexture(sc);st.wrapT=T.RepeatWrapping;st.repeat.set(1,3);
 const strap=new T.Mesh(new T.BoxGeometry(.26,1,.03),new T.MeshStandardMaterial({map:st,roughness:.8}));S.add(strap);
 /* fisika: pegas + ayunan */
 const A={x:0,y:3.4},HOME=.75,q={x:0,y:HOME,vx:0,vy:0};let drag=false,yaw=0,yawT=0,vis=true,offX=0,offY=0;
 const ray=new T.Raycaster(),pl=new T.Plane(new T.Vector3(0,0,1),0),p3=new T.Vector3(),ndc=new T.Vector2(),cv=R.domElement;
 const aim=e=>{const r=cv.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,C);return ray.ray.intersectPlane(pl,p3)};
 cv.addEventListener("pointerdown",e=>{aim(e);if(!ray.intersectObject(card,true).length)return;drag=true;offX=q.x-p3.x;offY=q.y-p3.y;cv.setPointerCapture(e.pointerId);cv.style.cursor="grabbing"});
 cv.addEventListener("pointermove",e=>{if(!drag||!aim(e))return;q.x=cl(p3.x+offX,-1.6,1.6);q.y=cl(p3.y+offY,HOME-1,HOME+.1);q.vx=q.vy=0});
 const end=()=>{drag=false;cv.style.cursor="grab"};cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
 btn.onclick=()=>{const on=yawT===0;yawT=on?Math.PI:0;q.vy-=4;btn.textContent=on?"👤 Kembali ke Normal":"🕷️ Ubah ke Spider-Man"};
 new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(box);
 let last=performance.now();
 (function loop(t){requestAnimationFrame(loop);if(!vis)return;const dt=Math.min((t-last)/1000,.033);last=t;
  if(!drag){q.vx+=(-14*q.x-2.2*q.vx)*dt;q.vy+=(-46*(q.y-HOME)-3.2*q.vy)*dt;q.x+=q.vx*dt;q.y+=q.vy*dt}
  yaw+=(yawT-yaw)*Math.min(1,dt*6);
  const phi=Math.atan2(q.x-A.x,A.y-q.y);
  g.position.set(q.x,q.y,0);g.rotation.set(0,yaw,phi+(drag?0:-q.vx*.12));
  strap.position.set((A.x+q.x)/2,(A.y+q.y)/2,0);strap.scale.y=Math.hypot(q.x-A.x,A.y-q.y);strap.rotation.z=phi;
  R.render(S,C)})(last);
})();
/* mengetik (typewriter) */
(()=>{const w=["Graphic Designer","Photographer","Video Editor"],el=$("#typed");let i=0,j=0,del=false;
 const tick=()=>{const t=w[i];j+=del?-1:1;el.textContent=t.slice(0,j);let d=del?40:90;
  if(!del&&j===t.length){del=true;d=1400}else if(del&&j===0){del=false;i=(i+1)%w.length;d=300}setTimeout(tick,d)};tick()})();
/* hitung angka statistik */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
 const n=+e.target.dataset.n;let c=0;const id=setInterval(()=>{e.target.textContent=++c;if(c>=n)clearInterval(id)},180)}),{threshold:.6});
$$("[data-n]").forEach(el=>co.observe(el));
/* latar bintang + bintang jatuh */
(()=>{const cv=$("#stars"),x=cv.getContext("2d");let W,H,S=[],M=[];
 const size=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;S=Array.from({length:Math.round(W*H/9000)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,p:Math.random()*6}))};
 size();addEventListener("resize",size);
 const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 (function f(t){x.clearRect(0,0,W,H);
  S.forEach(s=>{x.globalAlpha=.35+.65*Math.abs(Math.sin(t/1500+s.p));x.fillStyle="#cfe0ff";x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});
  if(!rm&&Math.random()<.006)M.push({x:Math.random()*W,y:-10,l:0});
  M=M.filter(m=>{m.x-=7;m.y+=7;m.l++;x.globalAlpha=Math.max(0,1-m.l/60);const g=x.createLinearGradient(m.x,m.y,m.x+70,m.y-70);g.addColorStop(0,"#9cc4ff");g.addColorStop(1,"transparent");x.strokeStyle=g;x.lineWidth=1.5;x.beginPath();x.moveTo(m.x,m.y);x.lineTo(m.x+70,m.y-70);x.stroke();return m.l<60});
  requestAnimationFrame(f)})(0)})();

/* About: kursor mengungkap mode Spider-Man, klik/ketuk untuk menetap */
(()=>{const p=$("#aPhoto");
 p.addEventListener("pointermove",e=>{const r=p.getBoundingClientRect();p.style.setProperty("--x",e.clientX-r.left+"px");p.style.setProperty("--y",e.clientY-r.top+"px")});
 p.addEventListener("click",()=>p.classList.toggle("on"));})();

/* navbar: pill geser + tombol efek suara */
(()=>{const pill=$("#pill"),links=$$("#menu a"),G={education:"about",music:"about",findme:"contact"};let cur="home";
 const move=()=>{const a=links.find(l=>l.dataset.g===cur);if(a){pill.style.left=a.offsetLeft+"px";pill.style.width=a.offsetWidth+"px";pill.style.opacity=1}else pill.style.opacity=0};
 window.setNav=id=>{cur=G[id]||id;links.forEach(l=>l.classList.toggle("active",l.dataset.g===cur));move()};
 addEventListener("resize",move);document.fonts&&document.fonts.ready.then(move);setNav("home");
 let on=false,ac;const snd=$("#snd");
 const tick=f=>{if(!on)return;ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.09);o.stop(ac.currentTime+.1)};
 snd.onclick=()=>{on=!on;snd.setAttribute("aria-pressed",on);snd.classList.toggle("off",!on);tick(880)};
 links.forEach(l=>{l.addEventListener("click",()=>tick(520));l.addEventListener("pointerenter",()=>tick(700))});})();
