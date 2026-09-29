window.LESSON={
  id:'C01-08',title:'对照实验、变量与误差',
  intro:'接着上一课的方糖溶解问题：亲手设置两组条件，找出唯一改变的变量，再判断数据波动和异常值。',
  safety:'本课时间与结果均为教学模拟，不是实际测量。真实实验按教师要求进行；不要饮用实验用品。',
  next:'../index.html',
  finish:'你能设计只改变一个条件的对照，记录测量差异，并在异常值出现时先核查与重测。',
  steps:[
    {title:'只改变水温',prompt:'甲组固定：20 ℃、100 mL 水、同样一块方糖、不搅拌。要比较水温，乙组该怎样设置？',
      controls:[
        {id:'temp',label:'乙组水温',options:['40 ℃','20 ℃']},
        {id:'water',label:'乙组水量',options:['200 mL','100 mL']}
      ],
      scene:(v,{tile})=>{
        const temp=v.temp===null?'待选择':v.temp===0?'40 ℃':'20 ℃';
        const water=v.water===null?'待选择':v.water===0?'200 mL':'100 mL';
        const differences=(v.temp===0?1:0)+(v.water===0?1:0);
        return `<div class="tiles">${tile('甲组','20 ℃ · 100 mL','方糖 1 块 · 不搅拌')}${tile('乙组',`${temp} · ${water}`,'方糖 1 块 · 不搅拌')}</div><div class="tiles">${tile('目前不同的条件',v.temp===null||v.water===null?'设置两组后显示':`${differences} 项`,v.temp===null||v.water===null?'完成两组设置再判断':v.temp===0&&v.water===1?'只改变水温，可以比较':differences===2?'水温和水量一起变，原因混淆':differences===0?'没有改变水温':'再核对水温与水量')}</div>`;
      },
      evaluate:v=>({ok:v.temp===0&&v.water===1,message:v.temp===0&&v.water===1?'乙组只改水温，水量、方糖和搅拌方式保持相同。':'比较水温时，乙组要有不同温度，其他条件保持一致。'}),
      hint:'乙组水量仍为 100 mL，温度设为 40 ℃。',takeaway:'对照实验只改变要研究的条件，其余重要条件保持相同。'},
    {title:'发现混在一起的原因',prompt:'有人发现温水组更快，但温水组也搅拌、把方糖压碎了。怎样修正实验？',
      controls:[
        {id:'stir',label:'温水组搅拌',options:['搅拌，常温组不搅拌','与常温组一样不搅拌']},
        {id:'shape',label:'温水组方糖形态',options:['改用糖粉','与常温组同样的整块方糖']}
      ],
      scene:(v,{tile})=>{
        const changes=['水温'];if(v.stir===0)changes.push('搅拌');if(v.shape===0)changes.push('颗粒大小');
        return `<div class="tiles">${tile('常温组','20 ℃ · 不搅拌 · 整块方糖')}${tile('温水组',`40 ℃ · ${v.stir===null?'搅拌待定':v.stir===0?'搅拌':'不搅拌'} · ${v.shape===null?'形态待定':v.shape===0?'糖粉':'整块方糖'}`)}</div><div class="tiles">${tile('改变的条件',v.stir===null||v.shape===null?'先完成设置':changes.join('、'),v.stir===null||v.shape===null?'完成两项设置再判断':changes.length===1?'能单独讨论水温':'不能把快慢只归因于水温')}</div>`;
      },
      evaluate:v=>({ok:v.stir===1&&v.shape===1,message:v.stir===1&&v.shape===1?'两组仅水温不同，才能检验“水温是否影响溶解时间”。':'搅拌和颗粒大小也会影响结果；让两组在这些方面一致。'}),
      hint:'两组都不搅拌，且使用一样的整块方糖。',takeaway:'同时改变搅拌或颗粒大小，会让水温的影响无法单独判断。'},
    {title:'数据有波动怎么办',prompt:'同一条件三次计时为 39、42、45 秒；另一次是 120 秒。选出对数据负责的处理与结论。',
      controls:[
        {id:'outlier',label:'处理 120 秒',options:['直接删掉，不在记录里提','保留记录，检查计时和操作，必要时重测']},
        {id:'claim',label:'对 39、42、45 秒的理解',options:['有几秒波动是测量差异，记录并比较','三次不同说明实验全部失败']}
      ],
      scene:(v,{tile})=>`<div class="tiles">${tile('三次记录','39 秒 · 42 秒 · 45 秒','平均 42 秒')}${tile('另一条记录','120 秒',v.outlier===1?'异常较大：标记并核查':v.outlier===0?'直接删除会丢失证据':'暂不处理')}</div><div class="meter"><span style="width:35%;background:#e99551"></span></div><div class="meter"><span style="width:100%;background:#b8614c"></span></div><small>条形仅比较模拟计时。误差可来自计时读数或操作差异；120 秒的原因不能凭数字直接断定。</small>`,
      evaluate:v=>({ok:v.outlier===1&&v.claim===0,message:v.outlier===1&&v.claim===0?'记录正常波动；对明显异常的 120 秒先核查程序和计时，再决定是否重测或说明。':'数据不完全相同是常见的测量差异；异常值不能无说明地删去。'}),
      hint:'保留原始记录并核查；39、42、45 秒的平均值为 42 秒。',takeaway:'误差使重复测量略有差异；异常值须核查、说明和必要时重测。'}
  ]
};
