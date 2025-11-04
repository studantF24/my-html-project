
(function(){
function qs(s){return document.querySelector(s)}
function qsa(s){return Array.from(document.querySelectorAll(s))}
function swapBootstrapForLang(lang){
  var link=[...document.querySelectorAll('link[rel="stylesheet"]')].find(l=>l.href.includes('bootstrap'));
  if(!link)return;
  var href=link.getAttribute('href');
  if(lang==='en' && href.includes('bootstrap.rtl.min.css')) link.setAttribute('href', href.replace('bootstrap.rtl.min.css','bootstrap.min.css'));
  if(lang==='ar' && href.includes('bootstrap.min.css')) link.setAttribute('href', href.replace('bootstrap.min.css','bootstrap.rtl.min.css'));
}
function setLang(lang){localStorage.setItem("lang",lang);applyLang()}
function applyLang(){
  var lang=localStorage.getItem("lang")||"ar";
  var dict={"ar": {"nav.home": "الرئيسية", "nav.events": "كل الفعاليات", "nav.about": "عن الدليل", "nav.contact": "اتصل بنا", "nav.brand": "دليل الفعاليات", "page.index.title": "الرئيسية", "page.events.title": "كل الفعاليات", "page.about.title": "عن الدليل", "page.contact.title": "اتصل بنا", "page.event.title": "تفاصيل الفعالية", "hero.title": "اكتشف فعاليات المدينة", "hero.subtitle": "اعثر على الحفلات والرياضة والأنشطة العائلية والمزيد حسب التاريخ والتصنيف.", "hero.cta": "استكشاف الفعاليات", "cat.music": "موسيقى", "cat.sport": "رياضة", "cat.culture": "ثقافة", "cat.family": "عائلي", "btn.details": "التفاصيل", "filter.category": "التصنيف", "filter.fromDate": "من تاريخ", "filter.allCats": "كل التصنيفات", "filter.clear": "مسح الفلاتر", "footer.backTop": "العودة للأعلى", "ph.name": "الاسم الكامل", "ph.email": "البريد الإلكتروني", "ph.message": "رسالتك"}, "en": {"nav.home": "Home", "nav.events": "All Events", "nav.about": "About", "nav.contact": "Contact", "nav.brand": "Events Guide", "page.index.title": "Home", "page.events.title": "All Events", "page.about.title": "About", "page.contact.title": "Contact", "page.event.title": "Event Details", "hero.title": "Discover city events", "hero.subtitle": "Find concerts, sports, family activities and more by date and category.", "hero.cta": "Explore events", "cat.music": "Music", "cat.sport": "Sports", "cat.culture": "Culture", "cat.family": "Family", "btn.details": "Details", "filter.category": "Category", "filter.fromDate": "From date", "filter.allCats": "All categories", "filter.clear": "Clear filters", "footer.backTop": "Back to top", "ph.name": "Full name", "ph.email": "Email", "ph.message": "Message"}};
  dict=dict[lang]||dict.ar;
  document.documentElement.lang=lang;
  document.documentElement.dir=(lang==="ar"?"rtl":"ltr");
  qsa("[data-i18n]").forEach(function(el){
    var k=el.getAttribute("data-i18n");
    if(dict[k]!==undefined){el.textContent=dict[k]}
  });
  qsa("[data-i18n-placeholder]").forEach(function(el){
    var k=el.getAttribute("data-i18n-placeholder");
    if(dict[k]!==undefined){el.setAttribute("placeholder",dict[k])}
  });
  var t=document.querySelector("title[data-i18n]");
  if(t){var k=t.getAttribute("data-i18n"); if(dict[k]!==undefined){t.textContent=dict[k]}}
  swapBootstrapForLang(lang);
}
function setTheme(theme){localStorage.setItem("theme",theme);applyTheme()}
function toggleTheme(){setTheme((localStorage.getItem("theme")||"light")==="light"?"dark":"light")}
function applyTheme(){var th=localStorage.getItem("theme")||"light";document.documentElement.classList.toggle("theme-dark",th==="dark")}
function initSearch(){
  var input=qs("#searchInput");var btn=qs("#searchBtn");if(!input||!btn)return;var cards=qsa(".card");
  function run(){var q=input.value.toLowerCase().trim();cards.forEach(function(c){var ok=!q||c.innerText.toLowerCase().includes(q);c.style.display=ok?"":"none"})}
  btn.addEventListener("click",run);
  input.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();run()}})
}
function initEventPassing(){
  qsa('a[href*="event.html"]').forEach(function(a){
    a.addEventListener("click",function(){
      var card=a.closest(".card");if(!card)return;
      var title=(card.querySelector(".card-title")||{}).textContent||"";
      var img=(card.querySelector("img")||{}).getAttribute&&card.querySelector("img").getAttribute("src")||"";
      var meta=(card.querySelector(".small.text-muted")||{}).textContent||"";
      var cat=(card.querySelector(".badge")||{}).textContent||"";
      var data={title:title.trim(),img:img,meta:meta.trim(),cat:cat.trim()};
      try{localStorage.setItem("selectedEvent",JSON.stringify(data))}catch(e){}
    })
  })
}
function populateEventPage(){
  if(!location.pathname.endsWith("event.html"))return;
  var data=null;try{data=JSON.parse(localStorage.getItem("selectedEvent")||"null")}catch(e){}
  if(!data)return;
  var img=qs("main img");if(img&&data.img)img.src=data.img;
  var h2=qs("main h2");if(h2&&data.title)h2.textContent=data.title;
  var meta=qs("main .text-muted");if(meta&&data.meta)meta.textContent=data.meta;
  var lis=qsa("main ul li");
  if(lis.length){if(data.cat)lis[0].innerHTML="<strong>"+(document.documentElement.lang==="ar"?"الفئة:":"Category:")+"</strong> "+data.cat}
}

function insertTeamNames(){
  var wrap = qs("#teamNames");
  if(!wrap) return;
  var team = [
    {handle:"sarah_285327", name:"ساره عرب"},
    {handle:"alma_233809", name:"المى خاناتي"},
    {handle:"dareen_193783", name:"دارين ريحاني"},
    {handle:"mulda_197917", name:"ملدا قدور"},
    {handle:"yazan_317450", name:"يزن ابراهيم"}
  ];
  wrap.innerHTML = "";
  team.forEach(function(m){
    var card = document.createElement("div");
    card.className = "team-card shadow-sm";
    card.innerHTML = '<div class="fw-bold">'+m.handle+'</div><div class="small text-muted">'+m.name+'</div>';
    wrap.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded",function(){
  applyLang();applyTheme();initSearch();initEventPassing();populateEventPage();insertTeamNames();
  var ar=qs("#langAr"),en=qs("#langEn"),th=qs("#themeToggle");
  if(ar)ar.onclick=function(){setLang("ar")};
  if(en)en.onclick=function(){setLang("en")};
  if(th)th.onclick=toggleTheme
})
})();
