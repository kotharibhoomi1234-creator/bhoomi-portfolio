import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../dist/vinyl.js', import.meta.url), 'utf8');
function setup() {
  const target = () => ({events:{},attributes:{},classes:new Set(),textContent:'',hidden:false,
    addEventListener(name,fn){this.events[name]=fn;},setAttribute(name,value){this.attributes[name]=value;},
    get classList(){return {add:n=>this.classes.add(n),remove:n=>this.classes.delete(n)};}});
  const nodes = Object.fromEntries(['vinyl-toggle','vinyl-label','vinyl-note','vinyl-track-link'].map(id=>[id,target()]));
  const document = {...target(),hidden:false,getElementById:id=>nodes[id]};
  const window = {...target(),musicPreviews:[1,2].map(i=>({title:'Song '+i,artist:'Artist',playlist:'Playlist',previewUrl:'https://audio.test/'+i,trackUrl:'https://music.test/'+i}))};
  let audio;let sequence=0;const timers=new Map();
  class Audio {constructor(){audio=this;this.events={};this.currentTime=0;this.paused=true;}addEventListener(name,fn){this.events[name]=fn;}set src(value){this.url=value;this.currentTime=0;}play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}}
  vm.runInNewContext(source,{document,window,Audio,setTimeout:(fn,ms)=>{timers.set(++sequence,{fn,ms});return sequence;},clearTimeout:id=>timers.delete(id)});
  return {nodes,document,window,audio,timers,tap:()=>nodes['vinyl-toggle'].events.click(),emit:event=>audio.events[event]()};
}
test('no autoplay; tap starts a real preview and spins only when playing',()=>{const s=setup();assert.equal(s.audio.paused,true);s.tap();assert.equal(s.audio.url,'https://audio.test/1');assert.equal(s.nodes['vinyl-toggle'].classes.has('spinning'),false);s.emit('playing');assert.equal(s.nodes['vinyl-toggle'].classes.has('spinning'),true);assert.equal(s.nodes['vinyl-toggle'].attributes['aria-busy'],'false');assert.match(s.nodes['vinyl-note'].textContent,/Song 1/);});
test('stops after 15 seconds and advances to the next track',()=>{const s=setup();s.tap();s.emit('playing');const deadline=[...s.timers.values()].find(t=>t.ms===15000);assert.ok(deadline);deadline.fn();assert.equal(s.audio.paused,true);assert.equal(s.nodes['vinyl-toggle'].attributes['aria-pressed'],'false');s.tap();assert.equal(s.audio.url,'https://audio.test/2');});
test('timeupdate enforces playback cap, even if timers are delayed',()=>{const s=setup();s.tap();s.emit('playing');s.audio.currentTime=15.1;s.emit('timeupdate');assert.equal(s.audio.paused,true);assert.equal(s.timers.size,0);});
test('second tap cancels playback and pending loading',()=>{const s=setup();s.tap();s.tap();assert.equal(s.audio.paused,true);assert.equal(s.timers.size,0);s.emit('playing');assert.equal(s.audio.paused,true);assert.equal(s.nodes['vinyl-toggle'].classes.has('spinning'),false);});
test('navigation and background tabs stop audio',()=>{const s=setup();s.tap();s.emit('playing');s.document.hidden=true;s.document.events.visibilitychange();assert.equal(s.audio.paused,true);s.tap();s.window.events.pagehide();assert.equal(s.audio.paused,true);});
test('failed or stalled loading resets controls and retains the listening link',()=>{const s=setup();s.tap();[...s.timers.values()].find(t=>t.ms===12000).fn();assert.equal(s.audio.paused,true);assert.match(s.nodes['vinyl-note'].textContent,/couldn’t load/);assert.equal(s.nodes['vinyl-track-link'].href,'https://music.test/1');assert.equal(s.nodes['vinyl-toggle'].attributes['aria-pressed'],'false');s.tap();s.emit('error');assert.equal(s.audio.paused,true);});
