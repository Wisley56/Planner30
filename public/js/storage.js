export const store = {
  set(k,v){ localStorage.setItem(k, v); },
  get(k){ return localStorage.getItem(k); },
  jsonSet(k,obj){ localStorage.setItem(k, JSON.stringify(obj)); },
  jsonGet(k){ try{return JSON.parse(localStorage.getItem(k)||"null");}catch(e){return null;} }
};