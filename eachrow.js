/*github.com/davesmiths/eachRow*/(function(a,b){a.fn.eachVector=function(e){e.vector=e.vector||"row";e.type=e.type===b?0:e.type;e.callback=e.callback||function(){};var l,n,m,f,j,t,r,d,s,h,q,p,g,k,c;k="top";c="outerHeight";if(e.vector==="col"){k="left";c="outerWidth"}j=this.slice();t=j.length;while(t){n=[];m=[];d=[];r=[];if(e.type===-1){n=j}else{l=Number.POSITIVE_INFINITY;for(g=0;g<t;g+=1){s=a(j[g]);h=d[g]=s.offset()[k];q=r[g]=s[c]();if(h<l){l=h;n=[];f=0}if(h===l){n.push(j[g]);if(f<q){f=q}}}p=l+f;if(e.type!==0){if(e.type===1||e.type===2){for(g=0;g<t;g+=1){if(a.inArray(j[g],n)<0){h=d[g];if(h<p){if(e.type===2){if(h+r[g]<=p){n.push(j[g]);m.push([h,j[g]])}}else{n.push(j[g]);m.push([h,j[g]])}}}}}else{for(g=0;g<t;g+=1){if(a.inArray(j[g],n)<0){h=d[g]+r[g];if(h<=p){n.push(j[g]);m.push([d[g],j[g]])}}}}}}e.callback.call(n);for(g=0;g<m.length;g++){if(m[g][0]!==a(m[g][1]).offset()[k]){n=a(n).not(m[g][1])}}j=a(j).not(n);t=j.length}return this};a.fn.eachRow=function(c){c.vector="row";return this.eachVector(c)};a.fn.eachCol=function(c){c.vector="col";return this.eachRow(c)}}(jQuery));
