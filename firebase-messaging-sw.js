<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>আমাদের চ্যাট 💬</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --green:#25d366;--green-dk:#075e54;--green-md:#128c7e;
  --green-bubble:#005c4b;--blue-tick:#53bdeb;
  --bg:#0b141a;--hdr:#1f2c34;--inp-bg:#2a3942;
  --bubble-in:#1e2b33;--txt:#e9edef;--txt2:#8696a0;
  --border:rgba(134,150,160,.15);--r:10px;
  --danger:#e53e3e;--boy:#3b82f6;--girl:#ec4899;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased}
html,body{
  height:100%;width:100%;
  overflow:hidden;
  font-family:'Noto Sans Bengali',sans-serif;
  background:var(--bg);color:var(--txt);
}

/* ── APP SHELL ── */
#app{
  display:flex;flex-direction:column;
  /* Use dvh — shrinks when keyboard opens on modern Android Chrome */
  height:100dvh;
  width:100%;
  position:fixed;
  top:0;left:0;
  overflow:hidden;
}

/* ── LOGIN ── */
#login-screen{
  position:fixed;inset:0;z-index:500;background:var(--bg);
  display:flex;align-items:center;justify-content:center;padding:24px;
  transition:opacity .3s,transform .3s;
}
#login-screen.hiding{opacity:0;transform:scale(.96);pointer-events:none}
#login-screen.hidden{display:none}
.login-card{background:var(--hdr);border-radius:22px;padding:36px 28px;width:100%;max-width:320px;border:1px solid var(--border);box-shadow:0 16px 48px rgba(0,0,0,.5)}
.lbl{font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--green);margin-bottom:12px;display:block}
.pass-wrap{position:relative;margin-bottom:10px}
#login-input{width:100%;padding:15px 46px 15px 18px;background:var(--inp-bg);border:1.5px solid rgba(255,255,255,.1);border-radius:14px;color:var(--txt);font-size:18px;font-family:inherit;letter-spacing:4px;outline:none;transition:border-color .2s;-webkit-appearance:none}
#login-input:focus{border-color:var(--green)}
#login-input::placeholder{opacity:.3;letter-spacing:2px}
.eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:18px;cursor:pointer;opacity:.5;padding:4px}
.err{min-height:18px;font-size:12px;color:#ff6b6b;text-align:center;margin-bottom:10px}
#login-btn{width:100%;padding:15px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--green-md),var(--green));color:#fff;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:opacity .15s,transform .1s;box-shadow:0 4px 16px rgba(37,211,102,.3)}
#login-btn:active{opacity:.9;transform:scale(.98)}

/* ── HEADER ── */
#hdr{
  flex-shrink:0;background:var(--hdr);
  display:flex;align-items:center;gap:10px;
  padding:0 8px 0 14px;height:60px;
  border-bottom:1px solid var(--border);
  padding-top:env(safe-area-inset-top);
  position:relative;z-index:10;
}
.av-wrap{position:relative;flex-shrink:0}
.av{width:42px;height:42px;border-radius:50%;background:var(--green-dk);display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid transparent;transition:border-color .3s}
.av.boy-av{border-color:rgba(59,130,246,.4)}.av.girl-av{border-color:rgba(236,72,153,.4)}
.online-dot{width:11px;height:11px;border-radius:50%;background:#4ade80;border:2px solid var(--hdr);position:absolute;bottom:1px;right:1px;transition:background .3s}
.online-dot.offline{background:var(--txt2)}
.hdr-info{flex:1;min-width:0;cursor:pointer}
.hdr-info h2{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdr-status{font-size:11.5px;margin-top:1px;display:flex;align-items:center;gap:4px;transition:color .3s}
.hdr-status.online{color:#4ade80}.hdr-status.offline{color:var(--txt2)}.hdr-status.typing-status{color:var(--green)}

/* Unread badge in header */
#hdr-unread{
  background:var(--green);color:#fff;
  font-size:11px;font-weight:700;
  min-width:20px;height:20px;border-radius:10px;
  padding:0 5px;display:none;
  align-items:center;justify-content:center;
  flex-shrink:0;
  animation:badgePop .2s cubic-bezier(.34,1.56,.64,1);
}
#hdr-unread.on{display:flex}
@keyframes badgePop{from{transform:scale(0)}to{transform:scale(1)}}

#online-badge{background:rgba(74,222,128,.15);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;flex-shrink:0;display:none}
#online-badge.on{display:block}
.hdr-actions{display:flex;gap:2px;flex-shrink:0}
.icon-btn{width:42px;height:42px;border-radius:50%;background:none;border:none;color:var(--txt2);font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.icon-btn:active{background:rgba(255,255,255,.08)}
#timer-sel{background:rgba(255,255,255,.07);border:1px solid var(--border);border-radius:20px;color:var(--txt2);font-size:10px;padding:5px 7px;font-family:inherit;outline:none;cursor:pointer;max-width:68px}
#timer-sel option{background:#1f2c34;color:var(--txt)}

/* ── MESSAGES ── */
#msgs{
  flex:1;overflow-y:auto;overflow-x:hidden;
  -webkit-overflow-scrolling:touch;overscroll-behavior:contain;
  padding:8px 10px 6px;
  display:flex;flex-direction:column;gap:1px;
  will-change:scroll-position;
  /* Critical for keyboard handling */
  min-height:0;
}
#msgs::-webkit-scrollbar{width:3px}
#msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}

.date-sep{align-self:center;background:rgba(31,44,52,.92);backdrop-filter:blur(4px);color:var(--txt2);font-size:11px;padding:4px 14px;border-radius:8px;margin:10px 0;pointer-events:none;border:1px solid var(--border)}

/* GROUP */
.grp{display:flex;flex-direction:column;animation:msgPop .18s cubic-bezier(.34,1.56,.64,1) both}
@keyframes msgPop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.grp.me{align-items:flex-end}.grp.them{align-items:flex-start}.grp+.grp{margin-top:2px}

.brow{display:flex;align-items:flex-end;gap:4px;max-width:min(84vw,390px)}
.grp.me .brow{flex-direction:row}.grp.them .brow{flex-direction:row-reverse}

.sw{position:relative;border-radius:var(--r);max-width:100%;will-change:transform;transform:translateZ(0);transition:transform .15s cubic-bezier(.25,.46,.45,.94)}
.sw.dragging{transition:none}
.rarrow{position:absolute;top:50%;transform:translateY(-50%);font-size:14px;opacity:0;pointer-events:none;color:var(--txt2);transition:opacity .12s}
.grp.me .rarrow{left:-22px}.grp.them .rarrow{right:-22px}
.rarrow.show{opacity:1}

/* NO side action buttons anymore — long press shows context menu */
.bwrap{display:flex;flex-direction:column}
.grp.me .bwrap{align-items:flex-end}.grp.them .bwrap{align-items:flex-start}

/* Reply preview */
.rpreview{border-left:3px solid currentColor;padding:5px 9px 4px;border-radius:8px 8px 0 0;font-size:11.5px;background:rgba(0,0,0,.25);max-width:100%;overflow:hidden;cursor:pointer}
.rpreview .rname{font-weight:700;margin-bottom:2px;font-size:12px}
.rpreview .rtxt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.75}

/* Bubble */
.bbl{padding:7px 11px;font-size:14.5px;line-height:1.6;word-break:break-word;white-space:pre-wrap;overflow-wrap:anywhere;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.grp.me .bbl{background:var(--green-bubble);color:#e9edef;border-radius:var(--r) var(--r) 2px var(--r)}
.grp.them .bbl{background:var(--bubble-in);color:#e9edef;border-radius:var(--r) var(--r) var(--r) 2px}
.hreply .bbl{border-radius:0 0 var(--r) var(--r)!important}
.grp.me .hreply .bbl{border-radius:0 0 2px var(--r)!important}
.grp.them .hreply .bbl{border-radius:0 0 var(--r) 2px!important}

/* edited tag */
.edited-tag{font-size:10px;color:rgba(255,255,255,.4);margin-left:4px;font-style:italic}

/* long-press highlight */
.grp.lp-active .bbl,
.grp.lp-active .voice-bbl,
.grp.lp-active .imgb{
  filter:brightness(1.15);
  transform:scale(1.01);
  transition:filter .15s,transform .15s;
}
.grp.highlight{background:rgba(37,211,102,.1);border-radius:10px;transition:background .7s}
< truncated lines 156-1119 >
        row.innerHTML=`<span class="dlt-device">${d.device}<br><span style="font-size:10px;color:var(--txt2)">${d.browser||""}</span></span><span class="dlt-time">${ts}</span><span class="dlt-badge ${d.active?"active":"past"}">${d.active?"এখন":"আগে"}</span>`;
        rows.appendChild(row);
      });
    });
  }
  const lb=document.createElement("button");lb.id="settings-logout";lb.textContent="↩ লগআউট";lb.onclick=()=>{closeSettings();doLogout();};
  body.appendChild(lb);
}

/* SWIPE TO REPLY */
function addSwipe(el,grp,key,name,text,type,isMine){
  let sx=0,sy=0,dx=0,ok=false;const T=65;
  const arrow=grp.querySelector(".rarrow");
  el.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;ok=true;dx=0;el.classList.add("dragging");},{passive:true});
  el.addEventListener("touchmove",e=>{
    if(!ok)return;dx=e.touches[0].clientX-sx;const dy=e.touches[0].clientY-sy;
    if(Math.abs(dy)>Math.abs(dx)){ok=false;el.style.transform="";return;}
    const valid=isMine?dx<0:dx>0;
    if(!valid){el.style.transform="";arrow.classList.remove("show");return;}
    const t=Math.min(Math.abs(dx),T+20);
    el.style.transform=isMine?`translateX(-${t}px)`:`translateX(${t}px)`;
    arrow.classList.toggle("show",Math.abs(dx)>T*.5);
  },{passive:true});
  el.addEventListener("touchend",()=>{
    if(!ok)return;ok=false;el.classList.remove("dragging");el.style.transform="";arrow.classList.remove("show");
    if(Math.abs(dx)>=T)setReply(key,name,text,type);dx=0;
  });
}

/* BUILD MESSAGE */
function buildMsg(key,msg,isNew,lastDS){
  const isMine=msg.name===me;
  const d=msg.ts?new Date(msg.ts):new Date();
  const ds=d.toLocaleDateString("bn-BD",{day:"numeric",month:"long",year:"numeric"});
  if(ds!==lastDS){
    const sep=document.createElement("div");sep.className="date-sep";sep.textContent=ds;
    box.appendChild(sep);
  }

  const grp=document.createElement("div");
  grp.className="grp "+(isMine?"me":"them");
  grp.dataset.key=key;

  const brow=document.createElement("div");brow.className="brow";
  const sw=document.createElement("div");sw.className="sw";
  const arr=document.createElement("div");arr.className="rarrow";arr.textContent="↩";sw.appendChild(arr);
  const bw=document.createElement("div");bw.className="bwrap";

  const cw=document.createElement("div");
  if(msg.replyTo){
    cw.className="hreply";
    const ru=USERS[msg.replyTo.name]||{color:"#888"};
    const rp=document.createElement("div");rp.className="rpreview";
    rp.style.color=ru.color;rp.style.borderColor=ru.color;
    rp.innerHTML=`<div class="rname">${esc(msg.replyTo.name)}</div><div class="rtxt">${esc(msg.replyTo.text||"")}</div>`;
    rp.onclick=()=>{
      const o=box.querySelector(`.grp[data-key="${msg.replyTo.key}"]`);
      if(o){o.scrollIntoView({behavior:"smooth",block:"center"});o.classList.add("highlight");setTimeout(()=>o.classList.remove("highlight"),1200);}
    };
    cw.appendChild(rp);
  }
  appendContent(cw,msg,key);bw.appendChild(cw);

  // Meta
  const meta=document.createElement("div");meta.className="meta";
  if(msg.expiresAt){const rem=Math.max(0,Math.round((msg.expiresAt-Date.now())/60000));const tb=document.createElement("span");tb.className="tbadge";tb.textContent="⏱"+rem+"মি";meta.appendChild(tb);}
  if(msg.edited){const et=document.createElement("span");et.className="edited-tag";et.textContent="(সম্পাদিত)";meta.appendChild(et);}
  const tm=document.createElement("span");tm.textContent=d.toLocaleTimeString("bn-BD",{hour:"2-digit",minute:"2-digit"});meta.appendChild(tm);
  if(isMine){
    const other=Object.keys(USERS).find(n=>n!==me);
    const seen=key<=(seenCache[other]||"");
    const tk=document.createElement("span");tk.className="tick "+(seen?"seen":"sent");tk.dataset.key=key;tk.textContent=seen?"✓✓":"✓";meta.appendChild(tk);
  }
  bw.appendChild(meta);

  // Reactions
  const rxns=msg.reactions||{};
  if(Object.keys(rxns).length){
    const rd=document.createElement("div");rd.className="rxns";
    Object.entries(rxns).forEach(([em,users])=>{
      if(!users?.length)return;
      const ch=document.createElement("div");ch.className="rxchip"+(users.includes(me)?" mine":"");
      ch.textContent=em+" "+users.length;
      ch.onclick=()=>ctxReact(em);
      rd.appendChild(ch);
    });
    bw.appendChild(rd);
  }

  sw.appendChild(bw);
  brow.appendChild(sw);
  grp.appendChild(brow);

  // ── LONG PRESS to open context menu ──
  let lpFired=false;
  const startLP=(clientX,clientY)=>{
    lpFired=false;
    longPressTimer=setTimeout(()=>{
      lpFired=true;
      grp.classList.add("lp-active");
      // small vibration on mobile
      if(navigator.vibrate) navigator.vibrate(30);
      openCtxMenu(key,msg,isMine,grp);
    },500);
  };
  const cancelLP=()=>{clearTimeout(longPressTimer);};

  grp.addEventListener("touchstart",e=>{startLP(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
  grp.addEventListener("touchend",()=>{cancelLP();},{passive:true});
  grp.addEventListener("touchmove",()=>{cancelLP();},{passive:true});
  // Desktop: right click
  grp.addEventListener("contextmenu",e=>{e.preventDefault();openCtxMenu(key,msg,isMine,grp);});

  addSwipe(sw,grp,key,msg.name,msg.text||"",msg.type,isMine);
  box.appendChild(grp);
  return ds;
}

function appendContent(wrap,msg){
  if(msg.type==="image"&&msg.image){
    const iw=document.createElement("div");iw.className="imgb";iw.onclick=()=>openLbox(msg.image);
    const ie=document.createElement("img");ie.src=msg.image;ie.loading="lazy";ie.alt="ছবি";
    iw.appendChild(ie);wrap.appendChild(iw);
  } else if(msg.type==="voice"&&msg.audio){
    const vb=document.createElement("div");vb.className="voice-bbl";
    const btn=document.createElement("button");btn.className="voice-play";btn.textContent="▶";
    const info=document.createElement("div");info.className="voice-info";
    const wf=document.createElement("div");wf.className="voice-waveform";
    const BARS=20;
    for(let i=0;i<BARS;i++){const bar=document.createElement("div");bar.className="bar";bar.style.height=(7+Math.random()*16)+"px";wf.appendChild(bar);}
    const dur=document.createElement("div");dur.className="voice-dur";
    const s=msg.duration||0;dur.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
    info.appendChild(wf);info.appendChild(dur);vb.appendChild(btn);vb.appendChild(info);wrap.appendChild(vb);
    let audio=null,barInt=null;
    btn.onclick=()=>{
      if(!audio){audio=new Audio(msg.audio);audio.onended=()=>{btn.textContent="▶";btn.classList.remove("playing");clearInterval(barInt);wf.querySelectorAll(".bar").forEach(b=>b.classList.remove("active"));};}
      if(audio.paused){
        audio.play();btn.textContent="⏸";btn.classList.add("playing");
        let bi=0;barInt=setInterval(()=>{wf.querySelectorAll(".bar").forEach(b=>b.classList.remove("active"));const b=wf.querySelectorAll(".bar")[bi%BARS];if(b)b.classList.add("active");bi++;},((msg.duration||5)*1000)/BARS);
      } else{audio.pause();btn.textContent="▶";btn.classList.remove("playing");clearInterval(barInt);}
    };
  } else {
    const b=document.createElement("div");b.className="bbl";b.innerHTML=esc(msg.text||"");wrap.appendChild(b);
  }
}

/* INPUT AUTO HEIGHT */
const inp=$("msg-input");
inp.addEventListener("input",function(){this.style.height="auto";this.style.height=Math.min(this.scrollHeight,130)+"px";});
inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg();return;}sendTyp();});
inp.addEventListener("blur",clearTyp);
</script>
</body>
</html>
