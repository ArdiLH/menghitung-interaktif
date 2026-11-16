// Tab
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('nav button').forEach(x=>x.setAttribute('aria-selected',x===b));
  ['t1','t2','t3'].forEach(id=>$('#'+id).hidden=id!==b.dataset.t);
  if(b.dataset.t==='t2')$('#in').focus();
});
