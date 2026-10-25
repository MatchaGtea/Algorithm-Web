'use strict';
const basicLabForLesson={sorting:'basic-counting',selection:'basic-partition',dfs:'basic-dfs'};
function numericBars(a,roles={},max=Math.max(...a,1),tags={}){
 const names={compare:'กำลังเปรียบเทียบ',pivot:'Pivot / ตัวอ้างอิง',move:'กำลังย้าย',done:'จัดตำแหน่งแล้ว',scan:'กำลังอ่าน',idle:'ยังไม่ประมวลผล'};
 return '<div class="sort-legend">'+[...new Set(a.map((_,i)=>roles[i]||'idle'))].map(r=>'<span><i class="role-'+r+'"></i>'+names[r]+'</span>').join('')+'</div><div class="sort-chart" role="img" aria-label="ความสูงของแท่งแสดงค่าตัวเลข">'+a.map((v,i)=>'<div class="sort-column"><div class="sort-bar role-'+(roles[i]||'idle')+'" data-bar="'+i+'" style="height:'+Math.max(4,Number(v)/max*200)+'px"><b>'+ve(v)+'</b></div><small>['+i+']</small><em>'+ve(tags[i]||'')+'</em></div>').join('')+'</div>';
}
function countingBasic(){
 const a=[4,2,1,4,3],counts=[0,0,0,0,0],out=[],m=vmodel('basic-counting','Counting Sort · เริ่มจาก 5 ตัว','อ่านค่า → นับจำนวน → เขียนค่าจากน้อยไปมาก','sorting');
 m.code=['count[0..4] = 0','for value in A:\n    count[value] += 1','for value = 0..4:\n    repeat count[value] times:\n        output.append(value)'];
 const snap=(title,msg,line,idx=-1)=>vframe(m,title,msg,{line,body:numericBars(a,idx<0?{}:{[idx]:'scan'},4)+'<div class="bucket-row">'+counts.map((c,i)=>'<div class="bucket '+(idx>=0&&a[idx]===i?'selected':'')+'"><small>ค่า '+i+'</small><b>'+c+'</b><span>ตัว</span></div>').join('')+'</div>'+(out.length?'<h4 class="chart-caption">ผลลัพธ์ที่เขียนแล้ว</h4>'+numericBars(out,Object.fromEntries(out.map((_,i)=>[i,'done'])),4):''),vars:{read:idx<0?'–':a[idx],output:out.join(', ')||'ยังว่าง'}});
 snap('เริ่ม: ตัวเลขยิ่งมาก แท่งยิ่งสูง','ต้องการเรียง [4,2,1,4,3] จากน้อยไปมาก ช่องนับทุกช่องเริ่มที่ 0',0);
 a.forEach((v,i)=>{counts[v]++;snap('อ่าน '+v+' → เพิ่ม count['+v+'] เป็น '+counts[v],'แท่งสีน้ำเงินคือตัวที่กำลังอ่าน เรานับว่าค่า '+v+' ปรากฏกี่ครั้ง ยังไม่ได้สลับแท่ง',1,i)});
 for(let v=0;v<counts.length;v++)for(let k=0;k<counts[v];k++){out.push(v);snap('เขียน '+v+' ลงผลลัพธ์','ไล่ช่องนับจาก 0 ไป 4 ค่า '+v+' มี '+counts[v]+' ตัว จึงเขียนซ้ำตามจำนวน สีเขียวคือผลลัพธ์ที่เรียงแล้ว',2)}
 m.result={a:out};return m;
}
function partitionBasic(){
 const a=[4,1,6,2,5],m=vmodel('basic-partition','Lomuto · จัดกลุ่มรอบ Pivot','เพียง 5 ค่า · ใช้ตัวแรกเป็น pivot ตามรูปแบบในบทเรียน','selection');let s=0;
 m.code=['pivot = A[0]; s = 0','for i = 1..n-1:\n    if A[i] < pivot:','        s += 1\n        swap(A[s], A[i])','swap(A[0], A[s])\nreturn s'];
 const snap=(title,msg,line,roles={},tags={})=>vframe(m,title,msg,{line,body:numericBars(a,{0:'pivot',...roles},6,{0:'pivot',...tags}),vars:{pivot:4,s}});
 snap('เลือก Pivot = 4','สีม่วงคือ pivot เป้าหมายคือให้ค่าที่น้อยกว่า 4 อยู่ด้านซ้าย ไม่จำเป็นต้องเรียงทั้งอาร์เรย์',0);
 for(let i=1;i<a.length;i++){snap('เทียบ '+a[i]+' กับ 4',a[i]<4?'น้อยกว่า 4: ขยายเขตฝั่งซ้าย แล้วสลับเข้ามา':'ไม่น้อยกว่า 4: ปล่อยไว้ แล้วอ่านตัวถัดไป',1,{[i]:'compare'},{[i]:'i'});if(a[i]<4){s++;[a[s],a[i]]=[a[i],a[s]];snap('สลับ index '+s+' กับ '+i,'สีส้มแสดงตำแหน่งที่ย้าย ตอนนี้มี '+s+' ตัวที่น้อยกว่า pivot',2,{[s]:'move',[i]:'move'},{[s]:'s',[i]:'i'})}}
 [a[0],a[s]]=[a[s],a[0]];vframe(m,'Pivot อยู่ index 2 → อันดับที่ 3','ผล [2,1,4,6,5]: ซ้าย < 4 ขวา ≥ 4 สีเขียวคือ pivot ที่อยู่ตำแหน่งสุดท้ายแล้ว',{line:3,body:numericBars(a,{2:'done'},6,{2:'pivot ถูกตำแหน่ง'}),vars:{s,rank:s+1}});return m;
}
function dfsBasic(){
 const m=vmodel('basic-dfs','DFS · เดินกราฟเล็กก่อน','4 nodes · เลือก B ก่อน C · d = เวลาเข้า, f = เวลาออก','dfs',{A:[130,230],B:[400,110],C:[400,390],D:[780,110]},[['A','B'],['A','C'],['B','D']]);
 m.code=['DFS(u):\n    d[u] = ++time\n    push(u)','    for v in adj[u]:\n        if v is unseen:\n            DFS(v)','    f[u] = ++time\n    pop(u)'];let clock=0;const d={},f={},stack=[];
 const snap=(title,msg,line,active=[])=>vframe(m,title,msg,{line,active,notes:Object.fromEntries(Object.keys(m.nodes).map(n=>[n,'d='+(d[n]||'–')+'  f='+(f[n]||'–')])),vars:{time:clock,stack:stack.join(' → ')||'ว่าง'},table:{headers:['Node','เข้า d','ออก f'],rows:Object.keys(m.nodes).map(n=>[n,d[n]||'–',f[n]||'–'])}});
 snap('เริ่ม: ยังไม่เคยเข้า node ใด','เริ่มที่ A เดินลึกให้สุดก่อนย้อนกลับ ทุกครั้งที่เข้าและออกให้เพิ่มนาฬิกา 1',0);
 function visit(u){d[u]=++clock;stack.push(u);snap('เข้า '+u+' → d['+u+'] = '+clock,'จดเวลาเข้า แล้วใส่ '+u+' ใน stack สีส้มคือตำแหน่งปัจจุบัน',0,[u]);for(const [,v]of m.edges.filter(e=>e[0]===u)){snap('เดิน '+u+' → '+v,'ปลายทางยังไม่เคยเข้า จึงเรียก DFS('+v+') ก่อนกลับมาทำ '+u+' ต่อ',1,[u,v,vkey(u,v)]);visit(v)}f[u]=++clock;stack.pop();snap('ออก '+u+' → f['+u+'] = '+clock,'ไม่มีเพื่อนบ้านที่ยังไม่เคยเข้าแล้ว จดเวลาออกและย้อนกลับ',2,[u])}visit('A');return m;
}
for(const m of [countingBasic(),partitionBasic(),dfsBasic()])visualModels[m.id]=m;
const formattedCode={
 'dfs-trace':['DFS(u):\n    d[u] = ++time; push(u)','    for v in sorted(adj[u]):','        if unseen(v):\n            parent[v] = u\n            DFS(v)','    f[u] = ++time; pop(u)','Gᵀ = transpose(G)','for u in decreasing finish time:\n    if unseen(u): DFS(Gᵀ, u)'],
 'ica-insertion':['for i = 1..n-1:\n    v = A[i]; j = i-1','    while j >= 0 and A[j] > v:','        A[j+1] = A[j]\n        j -= 1','    A[j+1] = v','# C counts key comparisons: A[j] > v'],
 'ica-quickselect':['while lo <= hi:\n    pivot = A[lo]; s = lo','    for i = lo+1..hi:\n        if A[i] < pivot:','            s += 1\n            swap(A[s], A[i])','    swap(A[lo], A[s])','    if s == k: return A[s]\n    if k < s: hi = s-1\n    else: lo = s+1'],
 'radix-trace':['for digit in [1, 10, 100]:','    for value in A:\n        b = (value // digit) % 10\n        buckets[b].append(value)','    A = concatenate(buckets[0..9])','    clear(buckets)'],
 'ap-trace':['DFS(u):\n    disc[u] = low[u] = ++time','    for each unseen child v:\n        DFS(v)','        low[u] = min(low[u], low[v])','        if u != root and low[v] >= disc[u]:\n            mark u as articulation point','    for each back edge (u, v):\n        low[u] = min(low[u], disc[v])','    if u == root and children >= 2:\n        mark u as articulation point'],
 'ica-flow':['while true:\n    residual = buildResidual(capacity, flow)','    path = BFS(residual, source, sink)','    if path exists:\n        delta = min(residual[e] for e in path)','        for e in path:\n            augment(e, delta)','    # repeat with updated residual graph','    if no path:\n        return flow, reachableFromSource'],
 'ica-matching':['while augmenting paths exist:\n    starts = free vertices in X','    levels = BFS(alternating graph, starts)','    paths = disjoint shortest augmenting paths','    for path in paths:\n        flip matched / unmatched edges','return matching'],
 'ica-stable':['while free proposer exists:','    w = next free proposer\n    r = next preference of w','    if r is free:\n        engage(w, r)','    else if r prefers w to current partner:\n        free(old partner)\n        engage(w, r)','    else:\n        keep current partner\n        w proposes again'],
 'topological-trace':['indegree = countIncomingEdges(G)','ready = vertices with indegree == 0','while ready:\n    u = removeNext(ready)\n    EF[u] = ES[u] + duration[u]','    for v in adj[u]:\n        ES[v] = max(ES[v], EF[u])','        indegree[v] -= 1\n        if indegree[v] == 0: ready.add(v)'],
 'ica-weighted':['for x, y:\n    w[x,y] = 26 - cost[x,y]','for x: label[x] = max(w[x,:])\nfor y: label[y] = 0','while matching is incomplete:\n    grow tree using equality edges','    delta = min(label[x]+label[y]-w[x,y]\n                for x in S, y not in T)','    for x in S: label[x] -= delta\n    for y in T: label[y] += delta','    if free y reached:\n        augment matching'],
 'ica-quilt':['read base row\nblueCount = number of B in base','while row has more than 1 patch:\n    for each adjacent pair (a,b):\n        if a == b: c = a','        else: c = third color of R,G,B','        append c to next row\n        if c == B: blueCount += 1','return blueCount'],
 'horspool-trace':['for i = 0..m-2:\n    shift[P[i]] = m-1-i','while offset <= n-m:\n    compare P against T from right to left','    if mismatch:\n        c = T[offset+m-1]','        offset += shift.get(c, m)','    else:\n        return offset'],
 'ica-boyer-moore':['last, goodSuffix = preprocess(P)','while offset <= n-m:\n    compare P from right to left','    if mismatch at j:\n        bad = max(1, j-last.get(T[offset+j], -1))','        good = goodSuffix[j+1]','        offset += max(bad, good)','    else:\n        return offset']
};
formattedCode['ica-scc']=formattedCode['dfs-trace'];
formattedCode['ica-bike']=formattedCode['ica-flow'];
formattedCode['ica-survey']=formattedCode['ica-flow'];
for(const [id,code]of Object.entries(formattedCode))visualModels[id].code=code;
function upgradeNumericFrames(){
 for(const id of ['ica-insertion','ica-quickselect','radix-trace']){const m=visualModels[id];for(const f of m.frames){const matches=[...f.body.matchAll(/class="v-cell ([^"]*)"[^>]*><small>\[(\d+)\]<\/small><b>([^<]*)<\/b><em>([^<]*)<\/em>/g)];if(!matches.length)continue;const a=matches.map(x=>Number(x[3])),roles={},tags={};matches.forEach((x,i)=>{if(x[1].includes('is-hot'))roles[i]=/สลับ|เลื่อน|แทรก/.test(f.title)?'move':'compare';tags[i]=x[4];if(x[4].includes('pivot'))roles[i]='pivot'});if(id==='ica-quickselect'&&typeof f.vars.pivot==='number'){const pos=f.line===3?f.vars.s:f.vars.lo;roles[pos]=f.line===3?'done':'pivot';tags[pos]='pivot'}if(/เรียงเสร็จ|ครบทุกหลัก|คำตอบ/.test(f.title))a.forEach((_,i)=>roles[i]='done');f.body=numericBars(a,roles,id==='radix-trace'?802:34,tags)}}
}
upgradeNumericFrames();


function radixBasic(){
 const m=vmodel('basic-radix','Radix Sort · เริ่มจาก 4 ตัว','เริ่มที่หลักหน่วย → หลักสิบ → หลักร้อย · เก็บลำดับเดิมภายใน bucket','sorting');let a=[170,45,75,90];
 m.code=['for digit in [1,10,100]:','    for value in A:\n        b = (value // digit) % 10\n        buckets[b].append(value)','    A = concatenate(buckets[0..9])'];
 for(const digit of [1,10,100]){
  const buckets=Array.from({length:10},()=>[]);
  const snap=(title,msg,line,active=-1)=>vframe(m,title,msg,{line,body:numericBars(a,active<0?{}:{[active]:'scan'},170)+'<div class="bucket-row radix-buckets">'+buckets.map((r,b)=>'<div class="bucket"><small>'+b+'</small><b>'+r.join(', ')+'</b></div>').join('')+'</div>',vars:{digit},table:{headers:['Bucket','ลำดับตัวเลข'],rows:buckets.map((r,b)=>[b,r.join(', ')||'–'])}});
  snap('ดู'+({1:'หลักหน่วย',10:'หลักสิบ',100:'หลักร้อย'}[digit]),'รอบนี้พิจารณาเพียงหลักเดียว ตัวเลขที่อยู่ bucket เดียวกันต้องรักษาลำดับเดิม',0);
  for(let i=0;i<a.length;i++){const b=Math.floor(a[i]/digit)%10;buckets[b].push(a[i]);snap('อ่าน '+a[i]+' → bucket '+b,'หลักที่กำลังดูมีค่า '+b+' จึงต่อท้าย bucket '+b+' โดยไม่แซงตัวก่อนหน้า',1,i)}
  a=buckets.flat();snap('เก็บ bucket 0 → 9 กลับมา','ได้ ['+a.join(', ')+']'+(digit===100?' ครบทุกหลักแล้ว จึงเรียงจากน้อยไปมาก':' ยังไม่ต้องเรียงสมบูรณ์ เพราะเหลือหลักถัดไป'),2);
 }
 m.result={a};return m;
}
visualModels['basic-radix']=radixBasic();

