import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root='dist';
const pages=['index.html','poems.html','music.html','cafes.html'];
for(const file of pages){
 const source=fs.readFileSync(path.join(root,file),'utf8');
 const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)throw Error('Duplicate IDs in '+file);
 for(const m of source.matchAll(/(?:href|src)="([^"#]+)"/g)){
  if(!/^(https?:|mailto:|data:)/.test(m[1])&&!fs.existsSync(path.join(root,decodeURIComponent(m[1].split('#')[0]))))throw Error('Missing link in '+file+': '+m[1]);
 }
 for(const m of source.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))throw Error('Broken anchor in '+file+': '+m[1]);
 for(const m of source.matchAll(/<script[^>]+src="([^"]+)"/g))new vm.Script(fs.readFileSync(path.join(root,m[1]),'utf8'));
}
for(const css of ['collage.css','collection-theme.css','fonts.css','readable-fonts.css','refinements.css','welcome.css','desk-interactions.css']){
 const source=fs.readFileSync(path.join(root,css),'utf8');
 for(const m of source.matchAll(/url\(['"]?([^'")]+)['"]?\)/g))if(!/^(data:|https?:)/.test(m[1])&&!fs.existsSync(path.join(root,m[1])))throw Error('Missing CSS asset '+m[1]);
}
const context={window:{}};vm.runInNewContext(fs.readFileSync('dist/content.js','utf8'),context);vm.runInNewContext(fs.readFileSync('dist/poems-data.js','utf8'),context);
const {portfolio,poems}=context.window;
if(portfolio.projects.length!==5||portfolio.projects.filter(p=>p.status==='progress').length!==2)throw Error('Project inventory changed');
if(poems.length!==37||new Set(poems.map(p=>p.id)).size!==37||poems.some(p=>!p.title||!p.lines.length))throw Error('Poem inventory changed');
if((fs.readFileSync('dist/music.html','utf8').match(/https:\/\/music.apple.com\/in\/playlist\//g)||[]).length!==6)throw Error('Playlist inventory changed');
if((fs.readFileSync('dist/cafes.html','utf8').match(/<li>/g)||[]).length!==90)throw Error('Places inventory changed');
for(let i=1;i<=11;i++)if(!fs.existsSync(`dist/assets/portraits/bhoomi-${String(i).padStart(2,'0')}.jpeg`))throw Error('Missing portrait '+i);
console.log('PASS: all four pages, script syntax, unique IDs, section anchors, CSS image/font references and local links.');
console.log('PASS: five projects (two in progress), 37 complete poems, six playlists, 90 places and all 11 portraits preserved.');
