(()=>{var e={697:e=>{e.exports=function(e,t){e.sort(((e,t)=>e-t));const n={};n.classInterval=function(e,t){const n=Math.max(...e)-Math.min(...e),a=Math.ceil(n/t),i=[],r=Math.min(...e)+(a*t-1);for(let t=Math.min(...e);t<=r;t+=a)i.push({min:t,max:t+(a-1)});return i}(e,t),n.classBoundaries=n.classInterval.map((e=>({min:e.min-.5,max:e.max+.5}))),n.classMark=n.classInterval.map((e=>(e.min+e.max)/2)),n.classFrequency=[];for(let a=0;a<t;a+=1){n.classFrequency.push(0);for(let t=0;t<e.length;t+=1)e[t]>=n.classInterval[a].min&&e[t]<=n.classInterval[a].max&&(n.classFrequency[a]+=1)}return n.relativeFrequency=n.classFrequency.map((t=>Number((t/e.length).toFixed(3)))),n}},720:e=>{function t(e,t){return Number(e.toFixed(t))}function n(e){return t(e.reduce(((e,t)=>e+t),0)/e.length,3)}function a(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"population";const i=n(e),r=e.map((e=>(e-i)**2)),o="population"===a?e.length:e.length-1;return t(r.reduce(((e,t)=>e+t),0)/o,3)}e.exports={limitDecimalPoints:t,getMean:n,getMode:function(e){const t={};e.forEach((e=>{t[e]=(t[e]||0)+1}));let n=0,a=[];return a=Object.keys(t).reduce(((e,i)=>{const r=Number(i),o=t[i];return o>n?(a=[r],n=o):o===n&&a.push(r),a}),[]),a.length===Object.keys(t).length?[]:a},getMedian:function(e){const t=e.slice().sort(((e,t)=>e-t)),n=Math.floor(t.length/2);return t.length%2==0?(t[n-1]+t[n])/2:t[n]},getVariance:a,getStandardDeviation:function(e){const n=a(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"population");return t(Math.sqrt(n),3)}}},818:(e,t,n)=>{const{limitDecimalPoints:a}=n(720);function i(e){return e<0?"indirect":e>0?"direct":""}function r(e){const t=Math.abs(e);return t>0&&t<=.25?"weak":t>.25&&t<=.75?"intermediate":t>.75&&t<1?"strong":""}e.exports={calculateSimpleCorrelation:function(e,t){const n=e.reduce(((e,t)=>e+t),0),i=t.reduce(((e,t)=>e+t),0),r=[],o=[],s=[];for(let n=0;n<e.length;n+=1)r[n]=e[n]*t[n],o[n]=e[n]**2,s[n]=t[n]**2;const l=r.reduce(((e,t)=>e+t),0),c=o.reduce(((e,t)=>e+t),0),u=s.reduce(((e,t)=>e+t),0),d=e.length,m=n**2/d,p=i**2/d,h=Math.sqrt((c-m)*(u-p));return a((l-n*i/d)/h,3)},getNature:i,getStrength:r,getFinalLabel:function(e){return 0===e?"no relation":1===e||-1===e?"perfect correlation":`${i(e)} ${r(e)} correlation`}}},180:(e,t,n)=>{const{limitDecimalPoints:a}=n(720);function i(e){let t=[];for(let n=0;n<e.length;n++)t.push({value:e[n],index:n});let n=[],a=[];a="string"==typeof e[0]?t:[...t].sort(((e,t)=>t.value-e.value)),a.push({value:void 0,index:void 0}),a.push({value:void 0,index:void 0});const i=[],r=[];for(let t=0;t<e.length;t++){if(a[t].value===a[t+1].value){let n=a[t].value;r.push(t+1);for(let i=t+1;i<e.length;i++)n===a[i].value&&r.push(i+1);t+=r.length}if(r.length>0){let e=r.reduce(((e,t)=>e+t),0)/r.length;for(let t=0;t<r.length;t++)r[t]=e;const t=r.length;for(let e=0;e<t;e++)n.push(r.pop())}a[t].value!==a[t+1].value&&t<e.length?(n.push(t+1),i.push(a[t].value)):a[t].value===a[t+1].value&&t--}let o=[];for(let t=0;t<e.length;t++)o[a[t].index]=n[t];return o}function r(e){return new Set(e).size!==e.length}e.exports={rank:i,spearmanRank:function(e,t){const n=r(e)||r(t),o=e.length;if(!1===n){const n=i(e),r=i(t),s=[];for(let e=0;e<o;e+=1)s[e]=n[e]-r[e];const l=s.map((e=>e**2)),c=l.reduce(((e,t)=>e+t),0);return{computedValue:a(1-6*c/(o*(o**2-1)),3),xRankData:n,yRankData:r,diData:s,diSquaredData:l,diSquaredSummation:c}}{const n=i(e),r=i(t),s=n.reduce(((e,t)=>e+t),0)/o,l=r.reduce(((e,t)=>e+t),0)/o;let c=[];RyMinusMryData=[],ProductData=[],RxMinusMRxRaiseTo2Data=[],RyMinusMRyRaiseTo2Data=[];for(let e=0;e<o;e++)c[e]=n[e]-s,RyMinusMryData[e]=r[e]-l,ProductData[e]=c[e]*RyMinusMryData[e],RxMinusMRxRaiseTo2Data[e]=c[e]**2,RyMinusMRyRaiseTo2Data[e]=RyMinusMryData[e]**2;const u=ProductData.reduce(((e,t)=>e+t),0),d=RxMinusMRxRaiseTo2Data.reduce(((e,t)=>e+t),0),m=RyMinusMRyRaiseTo2Data.reduce(((e,t)=>e+t),0),p=u/Math.sqrt(d*m);return{computedValue:a(p,3),xRankData:n,yRankData:r,MRx:s,MRy:l,RxMinusMrxData:c,RyMinusMryData,ProductData,RxMinusMRxRaiseTo2Data,RyMinusMRyRaiseTo2Data,SummationOfProductData:u,SummationOfRxMinusMRxRaiseTo2Data:d,SummationOfRyMinusMRyRaiseTo2Data:m}}},hasDuplicates:r}},329:(e,t,n)=>{const{limitDecimalPoints:a,getMean:i,getMedian:r,getStandardDeviation:o}=n(720);e.exports={calculateSkewness:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"population";const n=3*(i(e)-r(e))/o(e,t);return a(n,3)},getSymmetry:function(e){return e>0?"positively skewed":e<0?"negatively skewed":"normally skewed"}}}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};(()=>{"use strict";n.d(a,{b:()=>T});var e=n(697),t=n.n(e);const i=document.querySelector("main"),r=document.createElement("div");function o(e){const{key:t}=e;return t>="0"&&t<="9"||(e.preventDefault(),!1)}function s(e){const{key:t}=e;return t>="0"&&t<="9"||","===t||"."===t||(e.preventDefault(),!1)}r.id="frq-dist-u-table";var l=n(329);const c=document.querySelector("main"),u=document.createElement("div");function d(e){const{key:t}=e;return t>="0"&&t<="9"||","===t||"."===t||(e.preventDefault(),!1)}u.id="skewness-result-container";var m=n(818);const p=document.querySelector("main"),h=document.createElement("div");function f(e){const{key:t}=e;return t>="0"&&t<="9"||","===t||"."===t||(e.preventDefault(),!1)}h.id="simple-corre-table";var v=n(180);const y=document.querySelector("main"),x=document.createElement("div");function M(e){const{key:t}=e;return t>="0"&&t<="9"||t>="a"&&t<="z"||t>="A"&&t<="Z"||","===t||"."===t||(e.preventDefault(),!1)}x.id="spearman-rank-table";const R=document.querySelector("nav #nav-button"),D=document.querySelector("aside");function b(e){D.contains(e.target)||R.contains(e.target)||D.classList.contains("hidden")||(D.classList.add("hidden"),window.removeEventListener("click",b))}R.onclick=()=>{D.classList.toggle("hidden"),window.addEventListener("click",b)};const g=document.querySelector("main").innerHTML,k=document.querySelector("header img"),C=document.querySelector("main"),S=document.querySelectorAll("aside button");function T(e){if(e){let t=e.firstChild;for(;t;)t.remove(),t=e.firstChild}}k.onclick=()=>{T(C),C.innerHTML=g},S.forEach((e=>{e.addEventListener("click",(()=>{T(C)}))})),S[0].addEventListener("click",(function(){const e=document.createElement("h2");e.textContent="# Frequency Distribution Table (Ungrouped)";const n=document.createElement("div");n.innerHTML="<p>Important characteristics of a large mass of data can be readily assessed by <b>grouping the data into different classes</b> and then determining the number of observations that fall in each of the classes.</p>",n.innerHTML+="<p>Such an arrangement in tabular form is called a frequency distribution</p>";const a=document.createElement("form");a.id="frq-dist-u-form",function(e){const n=document.createElement("label");n.textContent="Data Set (e.g. 1,2,3):";const a=document.createElement("input");a.type="text",a.name="dataset",a.placeholder="1,2,3",n.appendChild(a),a.addEventListener("keypress",s);const i=document.createElement("label");i.textContent="Number of Classes:";const l=document.createElement("input");l.type="text",l.name="numClasses",l.placeholder="1 - 999",l.maxLength="3",i.appendChild(l),i.appendChild(l),l.addEventListener("keypress",o),a.setAttribute("required",!0),l.setAttribute("required",!0);const c=document.createElement("button");c.textContent="Show Frequency Distribution",c.type="submit";const u=document.createElement("p");u.textContent="All* fields are required",u.style.display="none",u.style.color="red",u.style.textAlign="center",c.addEventListener("click",(e=>{e.preventDefault(),T(r),a.value&&l.value?(function(e,n){const a=t()(e,n),i=document.createElement("p");i.textContent="Data Set (Sorted): ",i.id="data-set-display";const o=e.sort();for(let t=0;t<o.length;t+=1)"Data Set (Sorted): "===i.textContent?i.textContent+=e[t]:i.textContent+=`, ${e[t]}`;const s=document.createElement("table"),l=s.insertRow();["Class Interval","Class Boundaries","Class Mark","Class Frequency","Relative Frequency"].forEach((e=>{const t=document.createElement("th");t.textContent=e,l.appendChild(t)}));for(let e=0;e<n;e+=1){const t=s.insertRow(),n=t.insertCell(),i=a.classInterval[e];n.textContent=`${i.min} - ${i.max}`;const r=t.insertCell(),o=a.classBoundaries[e];r.textContent=`${o.min} - ${o.max}`,["classMark","classFrequency","relativeFrequency"].forEach((n=>{t.insertCell().textContent=a[n][e]}))}r.append(s,i)}(a.value.split(",").filter((e=>""!==e.trim())).map(Number),Number(l.value)),u.style.display="none",l.value="",a.value=""):u.style.display="block"})),e.append(n,i,c,u)}(a);const l=document.createElement("div");l.innerHTML="<h3>✏️ How It Works</h3>",l.innerHTML+="<p>From the data entered, the calculator computes for the <b>class width</b> (range / class number) rounded <i>up</i> to the nearest whole number. <i>(<b>range</b> = min - max)</i></p>",l.innerHTML+="Using the computed class width, the calculator now computes for the <b>class intervals</b> of the data. Starting with the lowest value in the data set which will be used as base for the lower class interval, the calculator will add a value of (class width - 1) to get the higher class interval. The value of class width will be added to the following class intervals.",l.innerHTML+="<p><code><pre>\n  const maxClassInterval = Math.min(...dataSet) + ((classWidth * classNumber) - 1);\n  for (let i = Math.min(...dataSet); i <= maxClassInterval; i += classWidth) {\n    classInterval.push({ min: i, max: i + (classWidth - 1) });\n  }\n  </pre></code></p>",l.innerHTML+="The calculator proceeds to computing the <b>class boundaries</b> by subtracting 0.5 to the lower value of class intervals and adding 0.5 to the higher value of class intervals.",l.innerHTML+="<p><code><pre>\n  classBoundaries = classInterval.map((classInt) => ({\n    min: classInt.min - 0.5,\n    max: classInt.max + 0.5,\n  }));\n  </pre></code></p>",l.innerHTML+="<b>Class mark</b> is computed by adding the lower and higher value of the corresponding interval and dividing them to 2",l.innerHTML+="<p><code><pre>\n  classMark = fTable.classInterval.map((classInt) => (classInt.min + classInt.max) / 2);\n  </pre></code></p>",l.innerHTML+="The calculator computes the <b>frequency</b> of values within each class interval by tallying the number of data points that fall into each interval.",l.innerHTML+="<p><code><pre>\n  classFrequency = [];\n  for (let i = 0; i < classNumber; i += 1) {\n    classFrequency.push(0);\n    for (let j = 0; j < dataSet.length; j += 1) {\n      if (dataSet[j] >= classInterval[i].min && dataSet[j] <= classInterval[i].max) {\n        classFrequency[i] += 1;\n      }\n    }\n  }\n  </pre></code></p>",l.innerHTML+="The <b>relative frequency</b> for each class interval is calculated by dividing the corresponding class frequency by the total number of data points in the dataset, resulting in a proportional value for each interval. <i>The resulting value that has any fractional part of the number will have a maximum of three decimal places.</i>",l.innerHTML+="<p><code><pre>\n  fTable.relativeFrequency = fTable.classFrequency.map((frequency) => (\n    Number((frequency / dataSet.length).toFixed(3))\n  ));\n  </pre></code></p>",i.append(e,n,a,r,l)})),S[1].addEventListener("click",(function(){const e=document.createElement("h2");e.textContent="# Symmetry and Skewness";const t=document.createElement("div");t.innerHTML="<p><b>Symmetric: </b>if distribution can be folded along a vertical axis so that the two sides coincide.</p>",t.innerHTML+="<p><b>Skewed: </b>a distribution that lacks symmetry with respect to vertical axis.</p>";const n=document.createElement("form");n.id="skewness-form",function(e){const t=document.createElement("label");t.textContent="Data Set (e.g. 1,2,3):";const n=document.createElement("input");n.type="text",n.name="dataset",n.placeholder="1,2,3",t.appendChild(n),n.addEventListener("keypress",d);const a=document.createElement("label"),i=document.createElement("input");i.type="checkbox",i.name="population",i.checked=!0,a.appendChild(i),a.appendChild(document.createTextNode(" Population"));const r=document.createElement("label"),o=document.createElement("input");o.type="checkbox",o.name="sample",r.appendChild(o),r.appendChild(document.createTextNode(" Sample"));const s=[i,o];s.forEach((e=>{e.addEventListener("change",(e=>{s.forEach((t=>{t.checked||t===e.target?t!==e.target&&(t.checked=!1):t.checked=!0}))}))}));const c=document.createElement("button");c.textContent="Show Symmetry and Skewness",c.type="submit";const m=document.createElement("p");m.textContent="All* fields are required",m.style.display="none",m.style.color="red",m.style.textAlign="center",c.addEventListener("click",(e=>{if(e.preventDefault(),T(u),n.value){m.style.display="none";const e=i.checked?"population":"sample";!function(e,t){const n=e.value.split(",").filter((e=>""!==e.trim())).map(Number),a=(0,l.calculateSkewness)(n,t),i=(0,l.getSymmetry)(a),r=document.createElement("p");r.textContent="Data Set (Sorted): ",r.id="data-set-display";const o=n.sort();for(let e=0;e<o.length;e+=1)"Data Set (Sorted): "===r.textContent?r.textContent+=n[e]:r.textContent+=`, ${n[e]}`;const s=document.createElement("p");s.textContent=`Result: ${a}, ${i}`,u.append(s,r)}(n,e),n.value=""}else m.style.display="block"})),e.append(t,a,r,c,m)}(n);const a=document.createElement("div");a.innerHTML="<h3>✏️ How It Works</h3>",a.innerHTML+="<p>The skewness of a dataset is calculated using the following formula:</p>",a.innerHTML+="<p>Skewness = 3(Mean−Median) / Standard Deviation</p>",a.innerHTML+="<p>Where:</p>",a.innerHTML+="<p>- Mean is the mean (average) of the dataset.</p>",a.innerHTML+="<p>- Median is the median of the dataset.</p>",a.innerHTML+="<p>- Standard Deviation is the standard deviation of the dataset.</p>",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function calculateSkewness(data, type = 'population') {\n    const skewness = (3 * (getMean(data) - getMedian(data))) / getStandardDeviation(data, type);\n    return skewness;\n  }\n  </pre></code></p>",a.innerHTML+="<p>The formula essentially measures the asymmetry of the dataset. If the skewness is:</p>",a.innerHTML+="<p>- Positive: The data distribution is skewed to the right (positively skewe</p>",a.innerHTML+="<p>- Negative: The data distribution is skewed to the left (negatively skewed).</p>",a.innerHTML+="<p>- The data distribution is symmetric (normally skewed).</p>",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function getSymmetry(skewness) {\n    if (skewness > 0) return 'positively skewed';\n    if (skewness < 0) return 'negatively skewed';\n    return 'normally skewed'; // === 0\n  }\n  </pre></code></p>",c.append(e,t,n,u,a)})),S[2].addEventListener("click",(function(){const e=document.createElement("h2");e.textContent="# Simple Correlation Coefficient";const t=document.createElement("div");t.innerHTML="<p>It is also called as <b>Pearson's correlation</b> or <b>Product moment correlation coefficient</b></p>",t.innerHTML+="<p>It measures the nature and strength between two variables of the quantitative type</p>";const n=document.createElement("form");n.id="simple-corre-form",function(e){const t=document.createElement("label");t.textContent="X Data Set (e.g. 1,2,3):";const n=document.createElement("input");n.type="text",n.name="dataset",n.placeholder="1,2,3",t.appendChild(n),n.addEventListener("keypress",f);const a=document.createElement("label");a.textContent="Y Data Set (e.g. 1,2,3):";const i=document.createElement("input");i.type="text",i.name="dataset",i.placeholder="1,2,3",a.appendChild(i),i.addEventListener("keypress",f);const r=document.createElement("label");r.textContent="X Label:",r.className="data-label";const o=document.createElement("input");o.type="text",o.name="x-label",o.value="X",r.appendChild(o);const s=document.createElement("label");s.textContent="Y Label:",s.className="data-label";const l=document.createElement("input");l.type="text",l.name="y-label",l.value="Y",s.appendChild(l),n.setAttribute("required",!0),i.setAttribute("required",!0);const c=document.createElement("button");c.textContent="Show Simple Correlation Coefficient",c.type="submit";const u=document.createElement("p");u.textContent="All* fields are required",u.style.display="none",u.style.color="red",u.style.textAlign="center",c.addEventListener("click",(e=>{e.preventDefault(),T(h),n.value&&i.value?(function(e,t,n){const a=(0,m.calculateSimpleCorrelation)(e,t),i=(0,m.getFinalLabel)(a),r=document.createElement("p");r.textContent=`Result: ${a}, ${i}`;const o=document.createElement("table"),s=o.insertRow();n.forEach((e=>{const t=document.createElement("th");t.textContent=e,s.appendChild(t)}));let l=0,c=0,u=0,d=0,p=0;for(let n=0;n<e.length;n+=1){const a=o.insertRow();a.insertCell().textContent=e[n],l+=e[n],a.insertCell().textContent=t[n],c+=t[n],a.insertCell().textContent=e[n]**2,u+=e[n]**2,a.insertCell().textContent=t[n]**2,d+=t[n]**2,a.insertCell().textContent=e[n]*t[n],p+=e[n]*t[n]}const f=o.insertRow();f.insertCell().textContent=`∑X = ${l}`,f.insertCell().textContent=`∑Y = ${c}`,f.insertCell().textContent=`∑X² = ${u}`,f.insertCell().textContent=`∑Y² = ${d}`,f.insertCell().textContent=`∑XY = ${p}`,h.append(r,o)}(n.value.split(",").filter((e=>""!==e.trim())).map(Number),i.value.split(",").filter((e=>""!==e.trim())).map(Number),[o.value,l.value,"X²","Y²","XY"]),u.style.display="none",n.value="",i.value="",o.value="X",l.value="Y"):u.style.display="block"})),e.append(r,t,s,a,c,u)}(n);const a=document.createElement("div");a.innerHTML="<h3>✏️ How It Works</h3>",a.innerHTML+="<p>To interpret the correlation coefficient:</p>",a.innerHTML+="The calculator uses a labeling function that categorizes the coefficient based on its value. A coefficient of 0 is labeled 'no relation,' while a coefficient of 1 or -1 indicates a 'perfect correlation.' For other coefficients, the label reflects both the nature (positive or negative) and strength (weak, moderate, strong) of the correlation.",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function getFinalLabel(value) {\n    if (value === 0) return 'no relation';\n    if (value === 1 || value === -1) return 'perfect correlation';\n    return 'getNature(value) getStrength(value) correlation';\n  }\n  </pre></code></p>",a.innerHTML+="<p>To calculate the correlation coefficient:</p>",a.innerHTML+="The correlation calculation involves various steps, including obtaining sums, products, and squared values of data points from two datasets. The size of the datasets (n) is considered. Applying the Pearson correlation formula, which involves covariance and standard deviations, yields the correlation coefficient. The final result is limited to three decimal points.",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function calculateSimpleCorrelation(xData, yData) {\n    const summationX = xData.reduce((acc, val) => acc + val, 0);\n    const summationY = yData.reduce((acc, val) => acc + val, 0);\n  \n    const xyData = []; const xSquaredData = []; const\n      ySquaredData = [];\n    for (let i = 0; i < xData.length; i += 1) {\n      xyData[i] = xData[i] * yData[i];\n      xSquaredData[i] = xData[i] ** 2;\n      ySquaredData[i] = yData[i] ** 2;\n    }\n  \n    const summationXY = xyData.reduce((acc, val) => acc + val, 0);\n    const summationXSquared = xSquaredData.reduce((acc, val) => acc + val, 0);\n    const summationYSquared = ySquaredData.reduce((acc, val) => acc + val, 0);\n    const n = xData.length;\n  \n    const xSquaredDividedByN = summationX ** 2 / n;\n    const ySquaredDividedByN = summationY ** 2 / n;\n  \n    const denominator = Math.sqrt(\n      (summationXSquared - xSquaredDividedByN) * (summationYSquared - ySquaredDividedByN),\n    );\n    const numerator = summationXY - ((summationX * summationY) / n);\n    const simpleCorrelation = numerator / denominator;\n    return limitDecimalPoints(simpleCorrelation, 3);\n  }\n  </pre></code></p>",p.append(e,t,n,h,a)})),S[3].addEventListener("click",(function(){const e=document.createElement("h2");e.textContent="# Spearman Rank Correlation Coefficient";const t=document.createElement("div");t.innerHTML="<p>The Spearman rank correlation coefficient, is a statistical measure that assesses the strength and direction of the <b>monotonic relationship</b> between two variables. It is a non-parametric measure, meaning it doesn't rely on the distribution of the data, making it suitable for both <b>continuous</b> and <b>ordinal data.</b>",t.innerHTML+="<p>It measures the nature and strength between two variables of the quantitative type</p>",t.innerHTML+="<p><i>Note: when inserting ordinal data (not a number but a label), type them in order, (for example: University,Secondary,Preparatory,Nursery,Illiterate) and type the corresponding value for each of the values on the second variable input (Y Data Set)</i></p>";const n=document.createElement("form");n.id="spearman-rank-form",function(e){const t=document.createElement("label");t.textContent="X Data Set (e.g. 1,2,3):";const n=document.createElement("input");n.type="text",n.name="dataset",n.placeholder="1,2,3",t.appendChild(n),n.addEventListener("keypress",M);const a=document.createElement("label");a.textContent="Y Data Set (e.g. 1,2,3):";const i=document.createElement("input");i.type="text",i.name="dataset",i.placeholder="1,2,3",a.appendChild(i),i.addEventListener("keypress",M);const r=document.createElement("label");r.textContent="X Label:",r.className="data-label";const o=document.createElement("input");o.type="text",o.name="x-label",o.value="X",r.appendChild(o);const s=document.createElement("label");s.textContent="Y Label:",s.className="data-label";const l=document.createElement("input");l.type="text",l.name="y-label",l.value="Y",s.appendChild(l),n.setAttribute("required",!0),i.setAttribute("required",!0);const c=document.createElement("button");c.textContent="Show Spearman Rank Correlation Coefficient",c.type="submit";const u=document.createElement("p");u.textContent="All* fields are required",u.style.display="none",u.style.color="red",u.style.textAlign="center",c.addEventListener("click",(e=>{if(e.preventDefault(),T(x),n.value&&i.value){let e=n.value.split(",").filter((e=>""!==e.trim()));e=e.map((e=>{const t=Number(e.trim());return isNaN(t)?e.trim():t}));let t=i.value.split(",").filter((e=>""!==e.trim()));t=t.map((e=>{const t=Number(e.trim());return isNaN(t)?e.trim():t})),function(e,t,n){console.log(e);const a=(0,v.spearmanRank)(e,t),i=a.computedValue,r=(0,m.getFinalLabel)(i),o=document.createElement("p");o.textContent=`Result: ${i}, ${r}`;const s=document.createElement("table"),l=s.insertRow(),c=(0,v.hasDuplicates)(e)||(0,v.hasDuplicates)(t);if(!1===c?(n.push("Rank X"),n.push("Rank Y"),n.push("di"),n.push("di^2"),n.forEach((e=>{const t=document.createElement("th");t.textContent=e,l.appendChild(t)}))):(n.push("Rank X"),n.push("Rank Y"),n.push("Rx-MRx"),n.push("Ry-MRy"),n.push("(Rx-MRx)*(Ry-MRy)"),n.push("(Rx-MRx)^2"),n.push("(Ry-MRy)^2"),n.forEach((e=>{const t=document.createElement("th");t.textContent=e,l.appendChild(t)}))),!1===c){const n=a.xRankData,i=a.yRankData,r=a.diData,o=a.diSquaredData;a.diSquaredSummation;for(let a=0;a<e.length;a+=1){const l=s.insertRow();l.insertCell().textContent=e[a],l.insertCell().textContent=t[a],l.insertCell().textContent=n[a],l.insertCell().textContent=i[a],l.insertCell().textContent=r[a],l.insertCell().textContent=o[a]}}else{const n=a.xRankData,i=a.yRankData,r=(a.MRx,a.MRy,a.RxMinusMrxData),o=a.RyMinusMryData,l=a.ProductData,c=a.RxMinusMRxRaiseTo2Data,u=a.RyMinusMRyRaiseTo2Data;a.SummationOfProductData,a.SummationOfRxMinusMRxRaiseTo2Data,a.SummationOfRyMinusMRyRaiseTo2Data;for(let a=0;a<e.length;a+=1){const d=s.insertRow();d.insertCell().textContent=e[a],d.insertCell().textContent=t[a],d.insertCell().textContent=n[a],d.insertCell().textContent=i[a],d.insertCell().textContent=r[a],d.insertCell().textContent=o[a],d.insertCell().textContent=l[a],d.insertCell().textContent=c[a],d.insertCell().textContent=u[a]}}x.append(o,s)}(e,t,[o.value,l.value]),u.style.display="none",n.value="",i.value="",o.value="X",l.value="Y"}else u.style.display="block"})),e.append(r,t,s,a,c,u)}(n);const a=document.createElement("div");a.innerHTML="<h3>✏️ How It Works</h3>",a.innerHTML+="<p>To interpret the correlation coefficient:</p>",a.innerHTML+="The calculator uses a labeling function that categorizes the coefficient based on its value. A coefficient of 0 is labeled 'no relation,' while a coefficient of 1 or -1 indicates a 'perfect correlation.' For other coefficients, the label reflects both the nature (positive or negative) and strength (weak, moderate, strong) of the correlation.",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function getFinalLabel(value) {\n    if (value === 0) return 'no relation';\n    if (value === 1 || value === -1) return 'perfect correlation';\n    return 'getNature(value) getStrength(value) correlation';\n  }\n  </pre></code></p>",a.innerHTML+="<p>To rank the data:</p>",a.innerHTML+="<p>This function rank is designed to assign ranks to an array of data points, with a distinction made between cases where the data contains duplicates and where it does not. The function first creates an array of objects, each containing the original value and its index. Depending on whether the data is composed of strings or numerical values, it either maintains the original order for strings or sorts the array in descending order for numerical values. When duplicates are present, the function calculates average ranks for sets of identical values and assigns these ranks to all occurrences. The function then maps the calculated ranks back to the original order of the data using the stored indices, providing a final array of ranked data. This approach ensures accurate ranking, making the function suitable for scenarios where the presence of duplicate values needs to be appropriately considered.</p>",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function rank(data) {\n    let dataObjects = [];\n    for (let i = 0; i < data.length; i++) {\n      dataObjects.push({value: data[i], index: i});\n    }\n  \n    let rankData = [];\n    let mainSortedData = [];\n    if (typeof data[0] === 'string'){\n      mainSortedData = dataObjects;\n    } else {\n      mainSortedData = [...dataObjects].sort((a, b) => b.value - a.value);\n    }\n    //inserted two dumies para hindi sya malito sa variable i.\n    mainSortedData.push({value: undefined, index: undefined});\n    mainSortedData.push({value: undefined, index: undefined});\n    const dataArray = [], duplicateRank = []; \n    \n    for (let i = 0; i < data.length; i++) {\n      if (mainSortedData[i].value === mainSortedData[i+1].value){\n        let duplicate = mainSortedData[i].value;\n        duplicateRank.push(i + 1);\n        for (let j = i + 1; j < data.length; j++) {\n          if (duplicate === mainSortedData[j].value) {\n            duplicateRank.push(j + 1);\n          }\n        }\n  \n        i += duplicateRank.length;\n      }\n      \n  \n      if (duplicateRank.length > 0){\n        const sum = duplicateRank.reduce((acc, val) => acc + val, 0);\n        const n = duplicateRank.length;\n        let average = sum/n;\n  \n        for (let i = 0; i < duplicateRank.length; i++) {\n          duplicateRank[i] = average;\n        }\n  \n        const len = duplicateRank.length;\n  \n        for (let i = 0; i < len; i++) {\n          rankData.push(duplicateRank.pop());\n        }\n      }\n  \n  \n      if (mainSortedData[i].value !== mainSortedData[i+1].value && i < data.length) {\n        rankData.push(i + 1);\n        dataArray.push(mainSortedData[i].value);\n      } else if (mainSortedData[i].value === mainSortedData[i+1].value) {\n        i--;\n      }\n    }\n    \n    let rankedData = [];\n    for (let h = 0; h < data.length; h++) {\n      rankedData[mainSortedData[h].index] = rankData[h];\n    }\n    return rankedData;\n  }\n  </pre></code></p>",a.innerHTML+="<p>To calculate the spearman rank correlation coefficient:</p>",a.innerHTML+="The provided JavaScript function calculates the Spearman rank correlation coefficient for two sets of data points, considering the presence of duplicates. In the absence of duplicates, it ranks the data, computes differences between corresponding ranks, and applies the Spearman formula to obtain the correlation coefficient. Additional information, including ranked data, differences, and squared differences, is returned. In the presence of duplicates, the function calculates mean ranks and performs modified Spearman calculations, returning a variety of intermediate results such as mean ranks, differences from mean ranks, and products of differences. The function limits the computed Spearman rank to three decimal places and provides a comprehensive set of outputs for both scenarios to aid in result interpretation and debugging.",a.innerHTML+="<p>Expressed in javascript:</p>",a.innerHTML+="<p><code><pre>\n  function spearmanRank(xData, yData) {\n    const duplicatesChecker = hasDuplicates(xData) || hasDuplicates(yData);\n  \n    const n = xData.length;\n    if (duplicatesChecker === false){\n      const xRankData = rank(xData); const yRankData = rank(yData); const diData = [];\n  \n      for (let i = 0; i < n; i += 1) {\n        diData[i] = xRankData[i] - yRankData[i];\n      }\n      const diSquaredData = diData.map((num) => num ** 2);\n      const diSquaredSummation = diSquaredData.reduce((acc, val) => acc + val, 0);\n      const spearmanRank = 1 - ((6 * diSquaredSummation) / (n * ((n ** 2) - 1)));\n  \n      return {\n        computedValue: limitDecimalPoints(spearmanRank, 3), \n        xRankData: xRankData, \n        yRankData: yRankData,\n        diData: diData,\n        diSquaredData: diSquaredData,\n        diSquaredSummation: diSquaredSummation,\n      };\n    } else {\n      const xRankData = rank(xData); const yRankData = rank(yData);\n      const MRx = xRankData.reduce((acc, val) => acc + val, 0) / n;\n      const MRy = yRankData.reduce((acc, val) => acc + val, 0) / n;\n      let RxMinusMrxData = []; RyMinusMryData = []; ProductData = []; RxMinusMRxRaiseTo2Data = []; RyMinusMRyRaiseTo2Data = [];\n      for (let i = 0; i < n; i++) {\n        RxMinusMrxData[i] = xRankData[i] - MRx;\n        RyMinusMryData[i] = yRankData[i] - MRy;\n        ProductData[i] = RxMinusMrxData[i] * RyMinusMryData[i];\n        RxMinusMRxRaiseTo2Data[i] = RxMinusMrxData[i] ** 2;\n        RyMinusMRyRaiseTo2Data[i] = RyMinusMryData[i] ** 2;\n      }\n  \n      const SummationOfProductData = ProductData.reduce((acc, val) => acc + val, 0);\n      const SummationOfRxMinusMRxRaiseTo2Data = RxMinusMRxRaiseTo2Data.reduce((acc, val) => acc + val, 0);\n      const SummationOfRyMinusMRyRaiseTo2Data = RyMinusMRyRaiseTo2Data.reduce((acc, val) => acc + val, 0);\n  \n      const spearmanRank = SummationOfProductData / (Math.sqrt(SummationOfRxMinusMRxRaiseTo2Data * SummationOfRyMinusMRyRaiseTo2Data))\n  \n      return {\n        computedValue: limitDecimalPoints(spearmanRank, 3), \n        xRankData: xRankData, \n        yRankData: yRankData,\n        MRx: MRx,\n        MRy: MRy,\n        RxMinusMrxData: RxMinusMrxData,\n        RyMinusMryData: RyMinusMryData,\n        ProductData: ProductData,\n        RxMinusMRxRaiseTo2Data: RxMinusMRxRaiseTo2Data,\n        RyMinusMRyRaiseTo2Data: RyMinusMRyRaiseTo2Data,\n        SummationOfProductData: SummationOfProductData,\n        SummationOfRxMinusMRxRaiseTo2Data: SummationOfRxMinusMRxRaiseTo2Data,\n        SummationOfRyMinusMRyRaiseTo2Data: SummationOfRyMinusMRyRaiseTo2Data\n      };\n    }\n  }\n  </pre></code></p>",y.append(e,t,n,x,a)}))})()})();