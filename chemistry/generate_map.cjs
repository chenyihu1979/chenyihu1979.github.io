const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'knowledge-map.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'knowledge-map.js' });
const groups = context.window.CHEMISTRY_MAP;
if (!Array.isArray(groups)) throw Error('Missing CHEMISTRY_MAP');
const ids = new Set();
const lines = [
  '# 柳州初中化学知识地图', '',
  '> 参照教育部《义务教育化学课程标准（2022年版）》五个学习主题，按基础薄弱学生的学习先后编排；不等同教材章次或地方逐题考纲。',
  '> 来源：https://www.ictr.edu.cn/download_center/ywjy.html',
  '> 已上线仅表示本仓库存在可用页面，待开发不表示学生已学会。', ''
];
let total = 0, live = 0;
for (const group of groups) {
  lines.push(`## ${group.id} · ${group.title}`, '', `课程主题：${group.theme}`, '');
  for (const [id, name, state, url] of group.items) {
    if (ids.has(id)) throw Error(`Duplicate ID: ${id}`);
    ids.add(id); total++;
    if (state === 'live') {
      live++;
      if (!url || !fs.existsSync(path.resolve(__dirname, url))) throw Error(`Broken published link: ${id}`);
      lines.push(`- **${id}** ${name} — 已上线`);
    } else lines.push(`- **${id}** ${name} — 待开发`);
  }
  lines.push('');
}
lines.splice(6, 0, `共 ${total} 个知识点，其中已上线 ${live} 个；其余保留为明确的开发任务。`, '');
fs.writeFileSync(path.join(__dirname, 'KNOWLEDGE_MAP.md'), lines.join('\n') + '\n');
console.log(`Generated ${total} topics; ${live} live.`);
