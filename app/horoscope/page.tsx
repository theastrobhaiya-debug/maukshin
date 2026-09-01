"useclient";

import{useEffect,useMemo,useState}from"react";

typeHoroscopeData={
date:string;
[key:string]:string;
};

typeSign={
name:string;
hindi:string;
symbol:string;
key:string;
html:string;
};

constsignsMeta=[
{
name:"Aries",
hindi:"Mesha",
symbol:"♈",
key:"aries",
},
{
name:"Taurus",
hindi:"Vrishabha",
symbol:"♉",
key:"taurus",
},
{
name:"Gemini",
hindi:"Mithuna",
symbol:"♊",
key:"gemini",
},
{
name:"Cancer",
hindi:"Karka",
symbol:"♋",
key:"cancer",
},
{
name:"Leo",
hindi:"Simha",
symbol:"♌",
key:"leo",
},
{
name:"Virgo",
hindi:"Kanya",
symbol:"♍",
key:"virgo",
},
{
name:"Libra",
hindi:"Tula",
symbol:"♎",
key:"libra",
},
{
name:"Scorpio",
hindi:"Vrishchika",
symbol:"♏",
key:"scorpio",
},
{
name:"Sagittarius",
hindi:"Dhanu",
symbol:"♐",
key:"sagittarius",
},
{
name:"Capricorn",
hindi:"Makara",
symbol:"♑",
key:"capricorn",
},
{
name:"Aquarius",
hindi:"Kumbha",
symbol:"♒",
key:"aquarius",
},
{
name:"Pisces",
hindi:"Meena",
symbol:"♓",
key:"pisces",
},
];

constHOROSCOPE_URL=
"https://raw.githubusercontent.com/theastrobhaiya-debug/Mauksh-data/main/Horoscope.json";

functioncleanHtml(html:string){
returnhtml.replace(/<h3>.*?<\/h3>/i,"");
}

functiongetFirstParagraph(html:string){
constmatch=html.match(/<p>(.*?)<\/p>/i);

if(!match)return"";

returnmatch[1]
.replace(/<[^>]*>/g,"")
.replace(/&nbsp;/g,"")
.trim();
}

functiongetSection(html:string,label:string){
constregex=newRegExp(
`<p>.*?${label}:.*?</p>`,
"is"
);

constmatch=html.match(regex);

if(!match)return"";

returnmatch[0]
.replace(/<p>/i,"")
.replace(/<\/p>/i,"")
.trim();
}

exportdefaultfunctionHoroscopePage(){
const[data,setData]=useState<HoroscopeData|null>(null);
const[selectedSign,setSelectedSign]=useState<string>("aries");
const[loading,setLoading]=useState(true);
const[error,setError]=useState("");

useEffect(()=>{
asyncfunctionloadHoroscope(){
try{
setLoading(true);
setError("");

constresponse=awaitfetch(HOROSCOPE_URL,{
cache:"no-store",
});

if(!response.ok){
thrownewError("Unabletoloadhoroscopedata.");
}

constjson=awaitresponse.json();

setData(json);
}catch(err){
console.error(err);
setError("Unabletoloadtoday'shoroscope.");
}finally{
setLoading(false);
}
}

loadHoroscope();
},[]);

constsigns:Sign[]=useMemo(()=>{
if(!data)return[];

returnsignsMeta.map((sign)=>({
...sign,
html:data[sign.key]||"",
}));
},[data]);

constselected=signs.find(
(sign)=>sign.key===selectedSign
);

if(loading){
return(
<mainclassName="kd-horoscope">
<divclassName="kd-loading">
<divclassName="kd-loader"/>
<p>Readingtoday'sstars...</p>
</div>

<stylejsx>{styles}</style>
</main>
);
}

if(error||!data){
return(
<mainclassName="kd-horoscope">
<divclassName="kd-error">
<span>✦</span>
<h1>Horoscopeunavailable</h1>
<p>{error||"Pleasetryagainlater."}</p>

<button
onClick={()=>window.location.reload()}
>
TryAgain
</button>
</div>

<stylejsx>{styles}</style>
</main>
);
}

return(
<mainclassName="kd-horoscope">

{/*HERO*/}

<sectionclassName="kd-hero">

<divclassName="kd-hero-inner">

<divclassName="kd-eyebrow">
KAALDARPAN
<span>•</span>
VEDICHOROSCOPE
</div>

<divclassName="kd-hero-grid">

<div>
<pclassName="kd-overline">
DAILYGUIDANCE
</p>

<h1>
Yourday,
<br/>
writteninthestars.
</h1>
</div>

<divclassName="kd-hero-side">
<divclassName="kd-date-mark">
<span>HOROSCOPEFOR</span>
<strong>{data.date}</strong>
</div>

<p>
AVedicperspectiveontheenergies,
opportunitiesandlessonsshaping
yourday.
</p>
</div>

</div>

</div>

</section>


{/*ZODIACSELECTOR*/}

<sectionclassName="kd-signs">

<divclassName="kd-section-head">

<div>
<pclassName="kd-label">
CHOOSEYOURRASHI
</p>

<h2>
Findyour
<br/>
dailyguidance.
</h2>
</div>

<pclassName="kd-section-copy">
Selectyourzodiacsigntoexplore
today'sMaukshhoroscope.
</p>

</div>


<divclassName="kd-zodiac-grid">

{signs.map((sign)=>(

<button
key={sign.key}
type="button"
className={`kd-zodiac-card${
selectedSign===sign.key
?"active"
:""
}`}
onClick={()=>
setSelectedSign(sign.key)
}
>

<spanclassName="kd-zodiac-number">
{String(
signsMeta.findIndex(
(item)=>item.key===sign.key
)+1
).padStart(2,"0")}
</span>

<spanclassName="kd-symbol">
{sign.symbol}
</span>

<spanclassName="kd-sign-name">
{sign.name}
</span>

<spanclassName="kd-sign-hindi">
{sign.hindi}
</span>

</button>

))}

</div>

</section>


{/*SELECTEDHOROSCOPE*/}

{selected&&(

<sectionclassName="kd-reading">

<divclassName="kd-reading-inner">

<divclassName="kd-reading-heading">

<divclassName="kd-reading-sign">

<spanclassName="kd-reading-symbol">
{selected.symbol}
</span>

<div>
<pclassName="kd-label">
TODAY'SHOROSCOPE
</p>

<h2>
{selected.name}
</h2>

<span>
{selected.hindi}
</span>
</div>

</div>

<divclassName="kd-reading-index">
{String(
signs.findIndex(
(sign)=>
sign.key===selected.key
)+1
).padStart(2,"0")}
<small>/12</small>
</div>

</div>


<divclassName="kd-reading-content">

<divclassName="kd-reading-intro">

<spanclassName="kd-intro-icon">
✦
</span>

<p>
{getFirstParagraph(selected.html)}
</p>

</div>


<divclassName="kd-topic-grid">

<divclassName="kd-topic">
<span>01</span>

<div>
<h3>Career</h3>

<p>
{getSection(
selected.html,
"💼Career"
)}
</p>
</div>
</div>


<divclassName="kd-topic">
<span>02</span>

<div>
<h3>Love</h3>

<p>
{getSection(
selected.html,
"❤️Love"
)}
</p>
</div>
</div>


<divclassName="kd-topic">
<span>03</span>

<div>
<h3>Money</h3>

<p>
{getSection(
selected.html,
"💰Money"
)}
</p>
</div>
</div>


<divclassName="kd-topic">
<span>04</span>

<div>
<h3>Advice</h3>

<p>
{getSection(
selected.html,
"🧘Advice"
)}
</p>
</div>
</div>

</div>


{/*MAUKSHTRUTH*/}

<divclassName="kd-truth">

<divclassName="kd-truth-symbol">
⚡
</div>

<div>
<span>MAUKSHTRUTH</span>

<p
dangerouslySetInnerHTML={{
__html:
selected.html.match(
/<pclass="truth">(.*?)<\/p>/is
)?.[1]||"",
}}
/>
</div>

</div>

</div>

</div>

</section>

)}


{/*ALLSIGNS*/}

<sectionclassName="kd-all">

<divclassName="kd-all-head">

<div>
<pclassName="kd-label">
12RASHIS
</p>

<h2>
Today's
<br/>
completesky.
</h2>
</div>

<p>
Exploreeveryzodiacsignand
discovertheplanetarystory
unfoldingtoday.
</p>

</div>


<divclassName="kd-list">

{signs.map((sign,index)=>(

<article
key={sign.key}
className={`kd-row${
selectedSign===sign.key
?"selected"
:""
}`}
>

<divclassName="kd-row-number">
{String(index+1).padStart(2,"0")}
</div>


<button
className="kd-row-sign"
onClick={()=>{
setSelectedSign(sign.key);

window.scrollTo({
top:
document.querySelector(
".kd-reading"
)?.getBoundingClientRect()
.top!+
window.scrollY-
30,
behavior:"smooth",
});
}}
>

<span>
{sign.symbol}
</span>

<div>
<strong>{sign.name}</strong>
<small>{sign.hindi}</small>
</div>

</button>


<p>
{getFirstParagraph(sign.html)}
</p>


<button
className="kd-read"
onClick={()=>{
setSelectedSign(sign.key);

window.scrollTo({
top:
document.querySelector(
".kd-reading"
)?.getBoundingClientRect()
.top!+
window.scrollY-
30,
behavior:"smooth",
});
}}
>
Read
<span>→</span>
</button>

</article>

))}

</div>

</section>


{/*FOOTERNOTE*/}

<sectionclassName="kd-footer-note">

<div>
<span>KAALDARPAN</span>
<p>
Vedicwisdomforthemodernday.
</p>
</div>

<spanclassName="kd-footer-star">
✦
</span>

</section>


<stylejsx>{styles}</style>

</main>
);
}

conststyles=`

.kd-horoscope{
--paper:#f5f0e7;
--paper-light:#faf7f0;
--ink:#171512;
--muted:#756e63;
--line:#d8d0c2;
--gold:#a27a3e;
--gold-light:#c6a56d;

min-height:100vh;
background:var(--paper);
color:var(--ink);
font-family:
Inter,
-apple-system,
BlinkMacSystemFont,
"SegoeUI",
sans-serif;
}


/*================================
LOADING
================================*/

.kd-loading{
min-height:70vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:20px;
color:var(--muted);
}

.kd-loader{
width:34px;
height:34px;
border:2pxsolidvar(--line);
border-top-color:var(--gold);
border-radius:50%;
animation:kd-spin.8slinearinfinite;
}

@keyframeskd-spin{
to{
transform:rotate(360deg);
}
}


/*================================
ERROR
================================*/

.kd-error{
min-height:70vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
text-align:center;
padding:40px;
}

.kd-error>span{
color:var(--gold);
font-size:28px;
}

.kd-errorh1{
margin:15px010px;
font-family:"PlayfairDisplay",Georgia,serif;
font-size:48px;
}

.kd-errorp{
color:var(--muted);
}

.kd-errorbutton{
margin-top:20px;
padding:12px22px;
border:1pxsolidvar(--ink);
background:var(--ink);
color:var(--paper);
cursor:pointer;
}


/*================================
HERO
================================*/

.kd-hero{
border-bottom:1pxsolidvar(--line);
}

.kd-hero-inner{
max-width:1280px;
margin:auto;
padding:34px42px100px;
}

.kd-eyebrow{
display:flex;
gap:12px;
align-items:center;

color:var(--gold);
font-size:12px;
font-weight:700;
letter-spacing:3px;
}

.kd-eyebrowspan{
color:var(--line);
}

.kd-hero-grid{
margin-top:95px;

display:grid;
grid-template-columns:1.5fr.65fr;
gap:80px;

align-items:end;
}

.kd-overline,
.kd-label{
margin:0016px;

color:var(--gold);

font-size:12px;
font-weight:700;
letter-spacing:3px;
}

.kd-heroh1{
margin:0;

max-width:900px;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:clamp(65px,9vw,132px);
line-height:.88;
letter-spacing:-5px;
font-weight:500;
}

.kd-hero-side{
border-left:1pxsolidvar(--line);
padding-left:35px;
}

.kd-date-mark{
display:flex;
flex-direction:column;
gap:8px;
}

.kd-date-markspan{
color:var(--muted);
font-size:11px;
letter-spacing:2px;
}

.kd-date-markstrong{
font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:28px;
font-weight:500;
}

.kd-hero-side>p{
margin:28px00;

color:var(--muted);

font-size:16px;
line-height:1.7;
}


/*================================
SIGNS
================================*/

.kd-signs{
max-width:1280px;
margin:auto;

padding:100px42px120px;
}

.kd-section-head{
display:flex;
justify-content:space-between;
gap:60px;

align-items:end;

margin-bottom:48px;
}

.kd-section-headh2,
.kd-all-headh2{
margin:0;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:clamp(50px,6vw,78px);
line-height:.92;
letter-spacing:-2px;
font-weight:500;
}

.kd-section-copy{
max-width:340px;
margin:0;

color:var(--muted);

font-size:15px;
line-height:1.7;
}

.kd-zodiac-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:12px;
}

.kd-zodiac-card{
position:relative;

min-height:190px;

padding:25px;

border:1pxsolidvar(--line);
border-radius:2px;

background:var(--paper-light);
color:var(--ink);

text-align:left;

display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:space-between;

cursor:pointer;

transition:
transform.25sease,
background.25sease,
color.25sease,
border-color.25sease;
}

.kd-zodiac-card:hover{
transform:translateY(-4px);
border-color:var(--gold);
}

.kd-zodiac-card.active{
background:var(--ink);
border-color:var(--ink);
color:var(--paper);
transform:translateY(-4px);
}

.kd-zodiac-number{
color:var(--gold);

font-size:11px;
letter-spacing:2px;
}

.kd-symbol{
font-size:42px;
line-height:1;
}

.kd-sign-name{
font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:27px;
font-weight:500;
}

.kd-sign-hindi{
color:var(--muted);
font-size:12px;
}

.kd-zodiac-card.active.kd-sign-hindi{
color:#aaa399;
}


/*================================
READING
================================*/

.kd-reading{
background:var(--ink);
color:var(--paper);
}

.kd-reading-inner{
max-width:1280px;
margin:auto;

padding:100px42px115px;
}

.kd-reading-heading{
display:flex;
justify-content:space-between;
align-items:flex-start;

padding-bottom:65px;

border-bottom:1pxsolid#3a3732;
}

.kd-reading-sign{
display:flex;
gap:28px;
align-items:center;
}

.kd-reading-symbol{
width:82px;
height:82px;

border:1pxsolid#4b463f;

display:flex;
align-items:center;
justify-content:center;

font-size:42px;
}

.kd-reading-signh2{
margin:0;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:clamp(55px,7vw,90px);
line-height:.85;
font-weight:500;
letter-spacing:-3px;
}

.kd-reading-sign>div>span{
display:block;
margin-top:12px;

color:#989187;

font-size:14px;
}

.kd-reading-heading.kd-label{
color:var(--gold-light);
}

.kd-reading-index{
color:var(--gold-light);
font-size:22px;
letter-spacing:2px;
}

.kd-reading-indexsmall{
color:#6d675e;
font-size:11px;
}

.kd-reading-content{
max-width:1080px;
margin:65pxauto0;
}

.kd-reading-intro{
display:grid;
grid-template-columns:60px1fr;
gap:25px;

padding-bottom:65px;

border-bottom:1pxsolid#3a3732;
}

.kd-intro-icon{
color:var(--gold-light);
font-size:25px;
}

.kd-reading-introp{
margin:0;

max-width:900px;

color:#ddd7cc;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:clamp(22px,2.2vw,31px);
line-height:1.45;
}


/*================================
TOPICS
================================*/

.kd-topic-grid{
display:grid;
grid-template-columns:1fr1fr;

border-bottom:1pxsolid#3a3732;
}

.kd-topic{
display:grid;
grid-template-columns:42px1fr;
gap:22px;

padding:48px45px48px0;
}

.kd-topic:nth-child(2n){
padding-left:45px;
border-left:1pxsolid#3a3732;
}

.kd-topic:nth-child(n+3){
border-top:1pxsolid#3a3732;
}

.kd-topic>span{
color:var(--gold-light);
font-size:11px;
letter-spacing:1px;
}

.kd-topich3{
margin:0015px;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:27px;
font-weight:500;
}

.kd-topicp{
margin:0;

color:#aaa39a;

font-size:15px;
line-height:1.75;
}


/*================================
TRUTH
================================*/

.kd-truth{
margin-top:65px;

padding:30px;

border:1pxsolid#514a41;

display:grid;
grid-template-columns:48px1fr;
gap:20px;
}

.kd-truth-symbol{
color:var(--gold-light);
font-size:25px;
}

.kd-truthspan{
color:var(--gold-light);

font-size:11px;
font-weight:700;
letter-spacing:3px;
}

.kd-truthp{
margin:12px00;

color:#ddd7cc;

font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:20px;
line-height:1.5;
}


/*================================
ALLSIGNS
================================*/

.kd-all{
max-width:1280px;
margin:auto;

padding:110px42px;
}

.kd-all-head{
display:flex;
justify-content:space-between;
align-items:end;

gap:60px;

margin-bottom:55px;
}

.kd-all-head>p{
max-width:350px;
margin:0;

color:var(--muted);

font-size:15px;
line-height:1.7;
}

.kd-list{
border-top:1pxsolidvar(--line);
}

.kd-row{
display:grid;
grid-template-columns:55px220px1fr70px;
gap:25px;

align-items:center;

padding:28px0;

border-bottom:1pxsolidvar(--line);

transition:padding.2sease;
}

.kd-row.selected{
padding-left:12px;
padding-right:12px;
background:rgba(162,122,62,.06);
}

.kd-row-number{
color:var(--gold);

font-size:11px;
letter-spacing:2px;
}

.kd-row-sign{
padding:0;

border:0;
background:transparent;

display:flex;
align-items:center;
gap:15px;

text-align:left;

cursor:pointer;
color:var(--ink);
}

.kd-row-sign>span{
font-size:28px;
}

.kd-row-signdiv{
display:flex;
flex-direction:column;
gap:3px;
}

.kd-row-signstrong{
font-family:
"PlayfairDisplay",
Georgia,
serif;

font-size:22px;
font-weight:500;
}

.kd-row-signsmall{
color:var(--muted);
font-size:11px;
}

.kd-row>p{
margin:0;

color:var(--muted);

font-size:14px;
line-height:1.6;
}

.kd-read{
padding:0;

border:0;
background:transparent;

color:var(--ink);

font-size:13px;
font-weight:600;

cursor:pointer;

display:flex;
justify-content:flex-end;
gap:7px;
}

.kd-readspan{
transition:transform.2sease;
}

.kd-read:hoverspan{
transform:translateX(4px);
}


/*================================
FOOTERNOTE
================================*/

.kd-footer-note{
border-top:1pxsolidvar(--line);

max-width:1280px;
margin:auto;

padding:35px42px50px;

display:flex;
justify-content:space-between;
align-items:center;
}

.kd-footer-notespan{
color:var(--gold);

font-size:11px;
font-weight:700;
letter-spacing:3px;
}

.kd-footer-notep{
margin:7px00;

color:var(--muted);

font-size:13px;
}

.kd-footer-star{
font-size:20px;
}


/*================================
TABLET
================================*/

@media(max-width:900px){

.kd-hero-grid{
grid-template-columns:1fr;
gap:45px;
}

.kd-hero-side{
max-width:500px;
}

.kd-zodiac-grid{
grid-template-columns:repeat(3,1fr);
}

.kd-row{
grid-template-columns:45px190px1fr60px;
}

}


/*================================
MOBILE
================================*/

@media(max-width:650px){

.kd-hero-inner{
padding:25px22px70px;
}

.kd-eyebrow{
font-size:9px;
letter-spacing:2px;
}

.kd-hero-grid{
margin-top:65px;
}

.kd-heroh1{
font-size:clamp(58px,18vw,90px);
letter-spacing:-3px;
}

.kd-hero-side{
border-left:0;
border-top:1pxsolidvar(--line);
padding:25px00;
}

.kd-signs{
padding:70px22px80px;
}

.kd-section-head,
.kd-all-head{
display:block;
}

.kd-section-headh2,
.kd-all-headh2{
font-size:50px;
}

.kd-section-copy,
.kd-all-head>p{
margin-top:25px;
}

.kd-zodiac-grid{
grid-template-columns:1fr1fr;
gap:8px;
}

.kd-zodiac-card{
min-height:145px;
padding:18px;
}

.kd-symbol{
font-size:34px;
}

.kd-sign-name{
font-size:22px;
}

.kd-reading-inner{
padding:70px22px80px;
}

.kd-reading-heading{
padding-bottom:45px;
}

.kd-reading-sign{
gap:16px;
}

.kd-reading-symbol{
width:58px;
height:58px;
font-size:30px;
}

.kd-reading-signh2{
font-size:53px;
letter-spacing:-2px;
}

.kd-reading-index{
display:none;
}

.kd-reading-content{
margin-top:45px;
}

.kd-reading-intro{
grid-template-columns:1fr;
gap:12px;
padding-bottom:45px;
}

.kd-reading-introp{
font-size:21px;
}

.kd-topic-grid{
display:block;
}

.kd-topic,
.kd-topic:nth-child(2n){
padding:32px0;
border-left:0;
}

.kd-topic+.kd-topic{
border-top:1pxsolid#3a3732;
}

.kd-topich3{
font-size:25px;
}

.kd-topicp{
font-size:14px;
}

.kd-truth{
margin-top:40px;
padding:22px;
}

.kd-truthp{
font-size:18px;
}

.kd-all{
padding:75px22px;
}

.kd-row{
grid-template-columns:35px1fr;
gap:12px;
padding:24px0;
}

.kd-row>p{
grid-column:2;
}

.kd-read{
grid-column:2;
justify-content:flex-start;
}

.kd-footer-note{
padding:30px22px40px;
}

}
`;