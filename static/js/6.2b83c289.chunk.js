(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[6],{1059:function(e,t){},1585:function(e,t){},1599:function(e,t){},1660:function(e,t){},1662:function(e,t){},1794:function(e,t){},1796:function(e,t){},1803:function(e,t){},1805:function(e,t){},1813:function(e,t){},1815:function(e,t){},1821:function(e,t){},1823:function(e,t){},1852:function(e,t){},1854:function(e,t){},1914:function(e,t){},1940:function(e,t){},1946:function(e,t){},1948:function(e,t){},2137:function(e,t){},2160:function(e,t){},2162:function(e,t){},2185:function(e,t){},2187:function(e,t){},2255:function(e,t){},2269:function(e,t){},2274:function(e,t){},2276:function(e,t){},2314:function(e,t){},2316:function(e,t){},2376:function(e,t){},2377:function(e,t){},2440:function(e,t){},2446:function(e,t){},2454:function(e,t){},2509:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a.n(n),r=a(13),i=a(16),c=a(5),l=a(9),s=a(0),u=a.n(s),m=a(1053),p=a.n(m),d=a(1494),g=a.n(d),f=a(1506),E=a.n(f),h=a(830),v=a(2498),b=a(2487),y=a(2506),w=(a(992),a(107)),O=(a(201),a(91)),A=a(902),D=(a(993),a(195)),I=a(2500),j=a(2501),k=a(2502),x=a(2505),T=a(2504),F=a(2503),V=a(960),B=a.n(V),N=a(825),R=a(824),P=a(2482),_=a.n(P),C=Object(I.a)({root:{width:210,height:370,marginRight:16},media:{height:140}});function L(e){var t=e.proposal,a=t.title,n=t.description,o=t.website,r=t.image,i=t.id,c=e.votingAllowed,l=e.vote,s=e.address,m=C();console.log({vote:l});return u.a.createElement(j.a,{className:m.root},u.a.createElement(k.a,null,r&&u.a.createElement(F.a,{className:m.media,image:r,title:a}),u.a.createElement(T.a,null,u.a.createElement(b.a,{gutterBottom:!0,variant:"h5",component:"h2"},a),u.a.createElement(b.a,{variant:"body2",color:"textSecondary",component:"p",style:{maxHeight:60}},n))),u.a.createElement(x.a,{style:{float:"right"}},u.a.createElement(R.a,{title:"Open website"},u.a.createElement(N.a,{"aria-label":"open",href:o,target:"_blank"},u.a.createElement(_.a,null))),c&&u.a.createElement(u.a.Fragment,null,u.a.createElement(R.a,{title:"Vote using your wallet"},u.a.createElement(N.a,{color:"primary","aria-label":"vote",onClick:function(){return l(i)}},u.a.createElement(B.a,null))),u.a.createElement(R.a,{title:"Vote via Twitter"},u.a.createElement(N.a,{color:"secondary","aria-label":"vote via twitter",onClick:function(){var e="https://twitter.com/intent/tweet?text="+encodeURI("I (".concat(s,") am voting for proposal ~").concat(i," on "))+"%23"+encodeURI("WhoopTogether - A no loss funding DAO");console.log(e),window.open(e,"_blank").focus()}},u.a.createElement(g.a,null))))))}a(194);var W=Object(h.a)((function(e){var t,a,n;return{root:{marginTop:e.spacing(2),marginBottom:e.spacing(2)},paper:(t={},Object(l.a)(t,e.breakpoints.up("md"),{maxWidth:"75%",minWidth:180}),Object(l.a)(t,"width","100%"),Object(l.a)(t,"padding",e.spacing(3)),t),title:{},textField:Object(l.a)({margin:e.spacing(1,0)},e.breakpoints.up("sm"),{marginRight:e.spacing(2)}),subscribeButton:{},fieldGroup:(a={},Object(l.a)(a,e.breakpoints.up("sm"),{display:"flex",marginTop:e.spacing(1)}),Object(l.a)(a,"alignItems","center"),a),flexGrow:{flexGrow:1},wrapper:(n={position:"relative"},Object(l.a)(n,e.breakpoints.down("xs"),{textAlign:"center",marginTop:e.spacing(2)}),Object(l.a)(n,"marginTop",e.spacing(2)),n),hiddenImage:{display:"none"},image:{display:"block"},statusMsg:{marginLeft:16},button:{width:190},card:{width:210,height:370}}})),X=function(e){e.className,Object(c.a)(e,["className"]);var t=Object(D.a)(),a=t.proposals,n=t.fetched,l=W(),m=Object(w.a)(),d=Object(s.useState)("DRAFT"),f=Object(i.a)(d,2),h=f[0],I=f[1];Object(s.useEffect)((function(){t.loaded&&!t.connected&&m.history.push("/")}),[t]),console.log({deposit:t.daiDeposit});var j=t.address;console.log({currentVote:t.currentVote,deposit:t.daiDeposit,hasProposal:t.hasProposal,allowVoting:null===t.currentVote&&t.daiDeposit>0&&!1===t.hasProposal});var k=function(){var e=Object(r.a)(o.a.mark((function e(){var a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I("3BOX_VERIFICATION"),e.next=3,E.a.getProfile(t.address);case 3:return a=e.sent,console.log(a),e.next=7,E.a.getVerifiedAccounts(a);case 7:if(n=e.sent,console.log(n),!(n&&n.twitter&&n.twitter.username)){e.next=16;break}return I("3BOX_VERIFIED"),e.next=13,t.contracts.dao.methods.enableTwitterVoting();case 13:I("ENABLED"),e.next=17;break;case 16:I("3BOX_FAILED");case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return u.a.createElement(O.a,{className:l.root,title:"Whoop Together | All Proposals",style:{position:"relative"}},u.a.createElement("div",{style:{position:"absolute",top:0,right:0}},"DRAFT"===h&&!t.enabledTwitter&&u.a.createElement(v.a,{variant:"contained",color:"secondary",size:"small",startIcon:u.a.createElement(g.a,null),onClick:k},"Enable Twitter voting"),"3BOX_VERIFICATION"===h&&u.a.createElement(b.a,{variant:"caption"},"Verifying 3Box twitter"),"3BOX_VERIFIED"===h&&u.a.createElement(b.a,{variant:"caption"},"Enabling twitter voting"),("ENABLED"===h||t.enabledTwitter)&&u.a.createElement(b.a,{variant:"caption"},"You can now vote with twitter"),"3BOX_FAILED"===h&&u.a.createElement(b.a,{variant:"caption",style:{color:"#FF9494"}},"3Box twitter verification failed")),u.a.createElement(A.a,null),0===t.daiDeposit&&u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{style:{margin:16,textAlign:"center"}},u.a.createElement(v.a,{variant:"contained",color:"secondary",size:"large",className:l.button,startIcon:u.a.createElement(p.a,null),onClick:function(){m.history.push("/deposit")}},"Deposit"))),t.daiDeposit>0&&!t.hasProposal&&u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{style:{margin:16,textAlign:"center"}},u.a.createElement(b.a,{variant:"body1"},"You have a deposit of ",t.daiDeposit," DAI"))),null!==t.currentVote&&u.a.createElement(u.a.Fragment,null,u.a.createElement(b.a,{variant:"h5",className:l.title},"Your vote"),u.a.createElement("div",{style:{marginTop:16,marginBottom:16}},u.a.createElement(L,{proposal:t.currentVote,votingAllowed:!1,address:j}))),u.a.createElement(b.a,{variant:"h5",className:l.title},"All Proposals"),u.a.createElement("div",{style:{marginTop:16}},n&&a.length>0&&u.a.createElement(u.a.Fragment,null,u.a.createElement(y.a,{container:!0,justify:"space-evenly",spacing:4},a.map((function(e){return u.a.createElement(y.a,{key:e.id,item:!0},u.a.createElement("div",{className:l.card},u.a.createElement(L,{proposal:e,votingAllowed:null===t.currentVote&&t.daiDeposit>0&&!1===t.hasProposal,vote:t.contracts.dao.methods.vote,address:j})))})))),n&&0===a.length&&u.a.createElement(b.a,{variant:"caption",align:"center"},"No proposals available"),!n&&u.a.createElement(b.a,{variant:"caption",align:"center"},"Loading proposals....")))};a.d(t,"default",(function(){return X}))},902:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(2487),i=a(107),c=function(e){var t=Object(i.a)();return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{marginBottom:16}},o.a.createElement(r.a,{gutterBottom:!0,variant:"h4",style:{marginTop:16,cursor:"pointer"},onClick:function(){t.history.push("/")}},"WhoopTogether"),o.a.createElement(r.a,{variant:"body1",style:{marginTop:16}},"Deposit your DAI. Let your idle interest support community projects. Vote DAO style on twitter for your favourite project every 2 weeks. Interest from the pool is sent to the chosen community project for 2 weeks if selected by the DAO. Withdraw your original DAI at anytime.")))};a.d(t,"a",(function(){return c}))}}]);
//# sourceMappingURL=6.2b83c289.chunk.js.map