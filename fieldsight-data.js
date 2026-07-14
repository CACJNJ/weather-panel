// ============================================================
// 静态数据层 — 由定时任务/人工定期刷新
// 最后更新: 2026-07-14 (数据来源见各板块)
// ============================================================
const STATIC_UPDATED = '2026-07-14';

// ---------- ENSO 总览【静态/人工维护 · 官方指数快照，需定期刷新】 ----------
const ensoOverview = [
  { value:'+1.7°C',   label:'NINO3.4 周值 (6/17当周)', status:'厄尔尼诺已确立，持续增强' },
  { value:'-21.9',    label:'SOI 30天值 (至6/20)',      status:'强负值，大气海洋耦合确认' },
  { value:'100%',     label:'JJA-SON 厄尔尼诺概率',      status:'OND-DJF 仍高达99%' },
  { value:'中-强',    label:'预测峰值强度',              status:'次表层暖异常最高达+6°C' },
];

// ---------- 异常提醒（【静态/人工维护】首项=当前最高公共影响天气，人工/研究定期刷新，非自动计算） ----------
const alerts = [
  { level:'danger', title:'🔥 美玉米带"热盖"压顶授粉期，玉米大豆创月内最大单日涨幅', detail:'一轮热盖(heat dome)正自美国东部向平原与中西部西扩，NWS延伸期预报显示高温将持续并笼罩玉米授粉核心期；8-14天展望全美气温偏高，中西部腹地7月下半月出现"干袋(dry pocket)"。玉米正进入授粉盛期(未来两周)，热干叠加直接威胁单产。7月13日盘面录得自6月种植面积报告以来最大单日涨幅：大豆主力涨约43-49美分、玉米涨13-15美分、小麦涨7-12美分。新作玉米/大豆结转本已走低，单产小幅下修即可令平衡表由宽松转紧。', hint:'授粉期(7月中下旬)西部/中西部热盖强度与"干袋"落区是玉米单产与天气升水核心；期价处相对低位，天气升水弹性大于利空' },
  { level:'danger', title:'🔥 厄尔尼诺已确立并持续增强', detail:'NINO3.4周值已升至+1.7°C（6月17日当周），SOI 30天值-21.9，大气-海洋耦合确认。150°W-80°W次表层50-150m暖异常最高达+6°C，为持续增强提供能量。JJA-SON厄尔尼诺概率100%，预计至少持续至2026年10月，强度中等至强。', hint:'关注东南亚/澳洲干旱、印度季风减弱、南美异常降水对棕榈油、小麦、咖啡的供给冲击；峰值预计2026年秋冬' },
  { level:'warn', title:'🌀 台风"巴威"登陆后消散：华东转入灾后恢复，残余雨带影响江淮—黄淮', detail:'"巴威"7月11日在浙江玉环/乐清登陆后减弱为热带风暴、西北移入内陆并逐步消散，浙江累计疏散逾220万人。当前浙东/闽东北转入洪涝退水与灾后恢复；残余水汽与季风雨带影响江淮、黄淮(苏皖北部、河南等)，需关注农田渍涝与夏玉米/花生墒情。上周WASDE(7/10)已下调新作玉米结转库存、并预估大豆丰产但结转偏紧，天气升水放大。', hint:'华东关注灾后农业与港口物流恢复；黄淮海产区留意持续降雨对夏播作物墒情影响' },
  { level:'warn', title:'☕ 巴西霜冻担忧升温，阿拉比卡单日跳涨约10%重上$3/磅', detail:'巴西2026/27采收进度偏慢，截至7月初仅约52%采收完成（落后去年及五年均值），近期强降雨扰乱采收并或影响豆质，中旬预计再有降水。叠加7-8月南部霜冻高风险窗口（南米纳斯/塞拉多/圣保罗/巴拉那），投机资金对寒潮高度敏感，阿拉比卡期价单日跳涨近10%、创年初以来新高并重上$3/磅。', hint:'逐日跟踪巴西南部最低气温预报；EN年南部霜冻概率变化叠加缓慢采收是当前咖啡定价主线' },
  { level:'warn', title:'🌊 PDO 持续负相位', detail:'JMA月度PDO指数2026年5月为-0.83，自2020年以来负相位主导；2025年7月曾探底-3.23。负相位叠加厄尔尼诺，冬季环流形势复杂。', hint:'负PDO增强西伯利亚高压，冬季冷空气南下频率可能增加' },
  { level:'warn', title:'⚠️ IOD 中性，模型预测7-8月起或发展正IOD', detail:'IOD指数-0.02（6月27日），当前中性。BOM最新展望：模型预测正IOD可能于2026年7-8月开始发展，南半球冬春季正IOD事件概率较高，但各模式对时间与强度分歧仍大。', hint:'正IOD+厄尔尼诺→东南亚/澳洲干旱加剧，棕榈油、澳麦风险放大' },
];

// ---------- 海洋指数【静态/人工维护 · ENSO/PDO/NAO/IOD 指数快照，需定期刷新】 ----------
const oceanIndices = [
  {
    name:'🔥 ENSO 厄尔尼诺-南方涛动', borderColor:'#ef4444',
    metrics:[{v:'+1.7°C',l:'NINO3.4 周值 6/17',c:'hi-temp'},{v:'厄尔尼诺',l:'当前相位',c:'hi-temp'},{v:'-21.9',l:'SOI (至6/20)',c:'hi-temp'},{v:'100%',l:'JJA-SON概率'}],
    risks:[{label:'高风险',cls:'risk-high'},{label:'持续增强',cls:'risk-severe'}],
    detail:'2026年6-7月完成向厄尔尼诺转换，多数模式预测中等至强事件，至少持续至10月，大概率跨入2027年初。次表层暖异常（最高+6°C）支撑继续增强。',
    sources:[{l:'IRI ENSO Forecast',u:'https://iri.columbia.edu/our-expertise/climate/forecasts/enso/current/'},{l:'NOAA CPC',u:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'},{l:'BOM',u:'https://www.bom.gov.au/climate/enso/'}]
  },
  {
    name:'🌊 PDO 太平洋年代际振荡', borderColor:'#f59e0b',
    metrics:[{v:'负相位',l:'当前相位'},{v:'-0.83',l:'2026年5月 (JMA)',c:'hi-temp'},{v:'-3.23',l:'2025年7月极值'},{v:'2020年起',l:'负相位主导'}],
    risks:[{label:'中风险',cls:'risk-mid'},{label:'长期影响',cls:'risk-high'}],
    detail:'JMA月度指数2026年1-5月为-0.57/-0.27/-0.53/-0.47/-0.83，负相位延续。负PDO通常增强西伯利亚高压、影响北太平洋风暴路径。',
    sources:[{l:'JMA PDO',u:'https://ds.data.jma.go.jp/tcc/tcc/products/elnino/decadal/pdo_month.html'},{l:'NOAA NCEI PDO',u:'https://www.ncei.noaa.gov/access/monitoring/pdo/'}]
  },
  {
    name:'🌀 NAO 北大西洋振荡', borderColor:'#8b5cf6',
    metrics:[{v:'正相位',l:'2026年春季'},{v:'+2.69',l:'2026年3月'},{v:'+1.39',l:'2026年4月'},{v:'关注',l:'夏季走向'}],
    risks:[{label:'中风险',cls:'risk-mid'},{label:'季节性',cls:'risk-low'}],
    detail:'2026年春季NAO强正相位（3月+2.69为近年高值）。正NAO→美东偏暖、南欧偏干；对黑海、欧洲麦区降水格局有间接影响。',
    sources:[{l:'NOAA CPC NAO',u:'https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/nao.shtml'}]
  },
  {
    name:'🌏 IOD 印度洋偶极子', borderColor:'#10b981',
    metrics:[{v:'中性',l:'当前相位'},{v:'-0.02',l:'DMI (6/27)'},{v:'7-8月',l:'或开始转正'},{v:'需关注',l:'与EN叠加'}],
    risks:[{label:'当前低风险',cls:'risk-low'},{label:'潜在风险',cls:'risk-mid'}],
    detail:'当前中性。BOM最新展望(7月上旬)：模型预测正IOD可能于7-8月开始发展，南半球冬春季正IOD概率较高，但时间与强度模式间分歧大。正IOD+厄尔尼诺→东南亚/澳洲干旱显著加剧。',
    sources:[{l:'BOM IOD',u:'https://www.bom.gov.au/climate/iod/'}]
  },
];

// ============================================================
// 美国天气图集 — 全部 NOAA/官方稳定外链，无运行ID，免维护
// 【图源自动/近实时】图片由官方每日/近实时更新，前端直接引用固定URL，非静态文字，勿改URL逻辑
// ============================================================
const usWeatherImages = [
  { group:'🛰️ 实时卫星与雷达 (GOES / NWS)', source:'NOAA STAR GOES-East · NWS RIDGE · 近实时（约5-15分钟刷新）',
    images:[
      { title:'GOES-East 真彩云图 (CONUS)', url:'https://cdn.star.nesdis.noaa.gov/GOES19/ABI/CONUS/GEOCOLOR/1250x750.jpg', note:'GOES-19 GeoColor 全美近实时真彩合成（约5分钟一帧），白天识别云系最直观' },
      { title:'GOES-East 红外云图 (CONUS)', url:'https://cdn.star.nesdis.noaa.gov/GOES19/ABI/CONUS/13/1250x750.jpg', note:'Band 13 洁净红外，昼夜可用，云顶越白代表对流越强' },
      { title:'全美雷达反射率拼图', url:'https://radar.weather.gov/ridge/standard/CONUS-LARGE_0.gif', note:'NWS RIDGE 全国雷达拼图，近实时降水回波（加载失败可点下方原图链接）' },
    ]
  },
  { group:'🌧️ 美国降水预报 (WPC QPF)', source:'NOAA Weather Prediction Center · 每日自动更新',
    images:[
      { title:'Day 1 累计降水', url:'https://www.wpc.ncep.noaa.gov/qpf/fill_94qwbg.gif', note:'未来24小时定量降水预报（彩色填充）' },
      { title:'Day 2 累计降水', url:'https://www.wpc.ncep.noaa.gov/qpf/fill_98qwbg.gif', note:'第2个24小时定量降水预报（彩色填充）' },
      { title:'Day 3 累计降水', url:'https://www.wpc.ncep.noaa.gov/qpf/fill_99qwbg.gif', note:'第3个24小时定量降水预报（彩色填充）' },
      { title:'7天累计降水', url:'https://www.wpc.ncep.noaa.gov/qpf/p168i.gif', note:'未来7天累计降水总量，玉米带墒情核心参考' },
    ]
  },
  { group:'🌡️ 美国温度预报 (NWS NDFD)', source:'National Weather Service · 每日自动更新',
    images:[
      { title:'Day 1 最高气温', url:'https://graphical.weather.gov/images/conus/MaxT1_conus.png', note:'全美最高气温格点预报' },
      { title:'Day 1 最低气温', url:'https://graphical.weather.gov/images/conus/MinT1_conus.png', note:'全美最低气温格点预报' },
      { title:'Day 3 最高气温', url:'https://graphical.weather.gov/images/conus/MaxT3_conus.png', note:'第3天最高气温' },
      { title:'Day 5 最高气温', url:'https://graphical.weather.gov/images/conus/MaxT5_conus.png', note:'第5天最高气温' },
    ]
  },
  { group:'⛈️ 美国强对流天气展望 (SPC)', source:'NOAA Storm Prediction Center · 每日自动更新',
    images:[
      { title:'Day 1 强对流风险', url:'https://www.spc.noaa.gov/products/outlook/day1otlk.png', note:'绿=雷暴/黄=轻微/橙=增强/红=中度/紫=高风险' },
      { title:'Day 2 强对流风险', url:'https://www.spc.noaa.gov/products/outlook/day2otlk.png', note:'未来第2天展望' },
      { title:'Day 3 强对流风险', url:'https://www.spc.noaa.gov/products/outlook/day3otlk.png', note:'未来第3天展望' },
      { title:'Day 1 龙卷概率', url:'https://www.spc.noaa.gov/products/outlook/day1probotlk_torn.png', note:'龙卷风发生概率 (%)' },
      { title:'Day 1 大风概率', url:'https://www.spc.noaa.gov/products/outlook/day1probotlk_wind.png', note:'灾害性大风概率 (%)' },
      { title:'Day 1 冰雹概率', url:'https://www.spc.noaa.gov/products/outlook/day1probotlk_hail.png', note:'大冰雹概率 (%)，收获期棉花/玉米重点关注' },
    ]
  },
  { group:'📅 美国中期展望 (CPC)', source:'NOAA Climate Prediction Center · 每日自动更新',
    images:[
      { title:'6-10天温度概率', url:'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610temp.new.gif', note:'橙红=偏暖概率/蓝=偏冷概率' },
      { title:'6-10天降水概率', url:'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610prcp.new.gif', note:'绿=偏湿概率/棕=偏干概率' },
      { title:'8-14天温度概率', url:'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814temp.new.gif', note:'授粉期温度趋势前瞻' },
      { title:'8-14天降水概率', url:'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814prcp.new.gif', note:'授粉期降水趋势前瞻' },
    ]
  },
  { group:'🏜️ 美国干旱监测 (USDM)', source:'US Drought Monitor · 每周四更新',
    images:[
      { title:'当前干旱监测图', url:'https://droughtmonitor.unl.edu/data/png/current/current_usdm.png', note:'D0异常干燥 → D4极端干旱，农业干旱定级权威图' },
    ]
  },
];

// ============================================================
// World Ag Weather — GEFS 集合预报图 (运行ID自动探测)
// 锚点: 2026-07-02 时 ID=3121; 每天约递增2-4个, 旧图保留
// 页面加载时从估算上界向下探测第一个可用ID
// ============================================================
const WAW_CONFIG = {
  anchorId: 3121,
  anchorDate: '2026-07-02',
  perDay: 4,        // 每日ID增量上限估计
  margin: 6,        // 探测上界额外余量
  maxProbe: 60,     // 最多向下探测次数
  probeTpl: 'https://www.worldagweather.com/fcstwx/pcp_gefs_day1_q50_us_{ID}.png',
  groups: [
    { group:'🌧️ 美国7天降水预报 (GEFS集合)', source:'World Ag Weather · 运行ID自动探测',
      images:[
        { title:'第1天累计降水', tpl:'https://www.worldagweather.com/fcstwx/pcp_gefs_day1_q50_us_{ID}.png', note:'GEFS 21成员集合预报中位数' },
        { title:'第3天累计降水', tpl:'https://www.worldagweather.com/fcstwx/pcp_gefs_day3_q50_us_{ID}.png', note:'GEFS 集合预报第3天' },
        { title:'第7天累计降水', tpl:'https://www.worldagweather.com/fcstwx/pcp_gefs_day7_q50_us_{ID}.png', note:'GEFS 集合预报第7天' },
      ]
    },
    { group:'🌡️ 美国7天温度预报 (GEFS集合)', source:'World Ag Weather · 运行ID自动探测',
      images:[
        { title:'7天平均温度', tpl:'https://www.worldagweather.com/fcstwx/tmp_gefs_day7_us_{ID}.png', note:'GEFS 集合预报平均温度' },
        { title:'7天最高温度', tpl:'https://www.worldagweather.com/fcstwx/tmax_gefs_day7_us_{ID}.png', note:'GEFS 集合预报最高温' },
        { title:'7天最低温度', tpl:'https://www.worldagweather.com/fcstwx/tmin_gefs_day7_us_{ID}.png', note:'GEFS 集合预报最低温' },
      ]
    },
    { group:'📊 美国降水距平 (GFS)', source:'World Ag Weather · 固定URL无需ID',
      images:[
        { title:'GFS 降水距平', tpl:'https://www.worldagweather.com/fcstwx/fcstpcp_anom_gfs_us.png', note:'GFS模型降水与气候态对比，红=偏干/蓝=偏湿' },
      ]
    },
  ]
};

// ---------- 生育期日历【静态/人工维护 · 发育阶段与风险为人工评估；表内"实时气象"列由前端按代表站Open-Meteo数据自动填充】 ----------
const cropCalendar = [
  { crop:'🌴 棕榈油', region:'马来西亚/印尼', season:'全年生长', sensitive:'果实膨大/授粉', risk:'厄尔尼诺干旱→果粒变小、含油率下降（滞后6-12个月显现）', enso:'EN已确立→东南亚干旱风险最高' },
  { crop:'🧵 棉花', region:'中国新疆', season:'花铃期', sensitive:'高温干旱', risk:'花铃期高温影响授粉与铃重', enso:'北半球夏季偏暖' },
  { crop:'🌽 玉米', region:'中国东北', season:'拔节期', sensitive:'7月下旬抽雄授粉', risk:'当前光热适宜，关注后期高温', enso:'东北积温正常有利' },
  { crop:'🌽 玉米', region:'黄淮海', season:'苗期(三叶-七叶)', sensitive:'高温影响幼苗', risk:'35°C+高温不利壮苗', enso:'黄淮盛夏偏热风险' },
  { crop:'🌽 玉米', region:'美国玉米带', season:'抽雄-吐丝期(16%已吐丝)', sensitive:'授粉主体7/15-30', risk:'优良率67%；8-14天展望东带偏湿、西带偏热干至7/19', enso:'雨热分歧成定价焦点；北伊/东爱/南明局地雨水过多' },
  { crop:'🫘 大豆', region:'中国东北', season:'分枝-初花期', sensitive:'开花结荚期水分', risk:'当前墒情适宜', enso:'关注8月干旱风险' },
  { crop:'🫘 大豆', region:'美国中西部', season:'开花初期', sensitive:'高温干旱', risk:'热浪影响开花', enso:'当前整体有利，后期关注' },
  { crop:'🌾 小麦', region:'中国黄淮海', season:'已收获', sensitive:'—', risk:'收获完毕，腾茬夏播', enso:'新麦上市，关注质量' },
  { crop:'🌾 小麦', region:'澳大利亚', season:'播种-分蘖期', sensitive:'冬春降水', risk:'厄尔尼诺→澳洲干旱是最大风险', enso:'EN年澳麦减产概率大' },
  { crop:'🌾 小麦', region:'黑海(俄/乌)', season:'灌浆-收获期', sensitive:'收获期降水/高温', risk:'收获窗口天气', enso:'间接影响较弱' },
  { crop:'☕ 咖啡', region:'巴西米纳斯', season:'采收期(5-9月，进度约52%偏慢)', sensitive:'霜冻', risk:'霜冻担忧升温，阿拉比卡单日跳涨约10%重上$3/磅；中旬再有降水扰动采收', enso:'EN年巴西南部霜冻概率变化需跟踪' },
  { crop:'🍬 白糖', region:'中国广西', season:'甘蔗伸长期', sensitive:'7-9月需水关键期', risk:'伸长期干旱直接损失蔗茎产量', enso:'EN年华南秋冬偏干需警惕' },
  { crop:'🍬 白糖', region:'印度/泰国', season:'季风生长期', sensitive:'季风降水', risk:'印度7月初季风转入降水盈余，产量预期改善；泰国仍偏干', enso:'EN年季风后期仍可能转弱，中期风险未除' },
];

// ============================================================
// 产区配置 — 按省份/国家分组; gddStart=生长季起始日(null=多年生/非生长季, 用滚动37天)
// 【坐标/gddStart 为固定配置，勿增删产区】phase 字段为静态人工描述；各产区的气温/降水/积温/风险标签由前端按 Open-Meteo 实况+预报【自动计算】(见 calcMetrics/assessRisks)
// ============================================================
const cropRegions = [
  { crop:'palm', icon:'🌴', name:'棕榈油产区气象监测', color:'#f59e0b',
    groups:[
      { province:'马来西亚', regions:[
        { name:'马来半岛(彭亨/雪兰莪)', lat:3.14, lon:101.69, gddStart:null, phase:'<b>物候</b>：多年生全年结果。厄尔尼诺干旱对产量的冲击滞后6-12个月显现。' },
        { name:'沙巴(山打根)', lat:5.84, lon:118.12, gddStart:null, phase:'<b>物候</b>：东马主产区，沙巴占马来西亚产量约1/4。' },
        { name:'砂拉越(民都鲁)', lat:3.17, lon:113.04, gddStart:null, phase:'<b>物候</b>：东马新兴种植区。' },
      ]},
      { province:'印度尼西亚', regions:[
        { name:'苏门答腊(北干巴鲁)', lat:0.53, lon:101.45, gddStart:null, phase:'<b>物候</b>：印尼第一大产区。EN年干旱+烟霾风险最高。' },
        { name:'加里曼丹(帕朗卡拉亚)', lat:-2.21, lon:113.92, gddStart:null, phase:'<b>物候</b>：印尼第二大产区。EN年泥炭地火灾/烟霾风险。' },
      ]},
      { province:'泰国', regions:[ { name:'泰国南部(合艾)', lat:7.01, lon:100.47, gddStart:null, phase:'' } ]},
    ]
  },
  { crop:'cotton', icon:'🧵', name:'棉花产区气象监测', color:'#8b5cf6',
    groups:[
      { province:'新疆', regions:[ { name:'阿克苏', lat:41.17, lon:80.26, gddStart:'2026-04-15', phase:'<b>发育期</b>：花铃期关键阶段。<b>风险</b>：高温影响授粉坐铃，关注膜下滴灌水源。' } ]},
      { province:'河北', regions:[ { name:'石家庄', lat:38.04, lon:114.51, gddStart:'2026-04-25', phase:'<b>发育期</b>：现蕾-开花期。' } ]},
      { province:'山东', regions:[ { name:'济南', lat:36.65, lon:117.12, gddStart:'2026-04-25', phase:'<b>发育期</b>：现蕾-开花期。' } ]},
      { province:'河南', regions:[ { name:'郑州', lat:34.75, lon:113.63, gddStart:'2026-04-25', phase:'<b>发育期</b>：现蕾-开花期。' } ]},
      { province:'印度·马哈拉施特拉邦', regions:[
        { name:'那格浦尔', lat:21.15, lon:79.09, gddStart:'2026-06-15', phase:'<b>发育期</b>：维达巴雨养棉，季风播种-苗期。EN年季风偏弱是最大风险。' },
        { name:'阿科拉', lat:20.70, lon:77.02, gddStart:'2026-06-15', phase:'<b>发育期</b>：维达巴棉区，季风播种-苗期。' },
        { name:'亚沃特马尔', lat:20.39, lon:78.13, gddStart:'2026-06-15', phase:'<b>发育期</b>：维达巴核心棉区，季风播种-苗期。' },
      ]},
      { province:'印度·古吉拉特邦', regions:[
        { name:'拉杰果德', lat:22.30, lon:70.80, gddStart:'2026-06-15', phase:'<b>发育期</b>：索拉施特拉主产棉区，季风播种-苗期。' },
        { name:'艾哈迈达巴德', lat:23.03, lon:72.58, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
        { name:'巴夫纳加尔', lat:21.76, lon:72.15, gddStart:'2026-06-15', phase:'<b>发育期</b>：索拉施特拉棉区，季风播种-苗期。' },
      ]},
      { province:'印度·特伦甘纳邦', regions:[
        { name:'瓦朗加尔', lat:17.97, lon:79.59, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
        { name:'阿迪拉巴德', lat:19.67, lon:78.53, gddStart:'2026-06-15', phase:'<b>发育期</b>：北特伦甘纳棉区，季风播种-苗期。' },
        { name:'海得拉巴', lat:17.38, lon:78.49, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
      ]},
      { province:'印度·安得拉邦', regions:[
        { name:'贡土尔', lat:16.31, lon:80.44, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
        { name:'库努尔', lat:15.83, lon:78.04, gddStart:'2026-06-15', phase:'<b>发育期</b>：拉亚拉西马棉区，季风播种-苗期。' },
      ]},
      { province:'印度·卡纳塔克邦', regions:[
        { name:'胡布利', lat:15.36, lon:75.12, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
        { name:'赖久尔', lat:16.21, lon:77.36, gddStart:'2026-06-15', phase:'<b>发育期</b>：北卡棉区，季风播种-苗期。' },
      ]},
      { province:'印度·中央邦', regions:[
        { name:'印多尔', lat:22.72, lon:75.86, gddStart:'2026-06-15', phase:'<b>发育期</b>：季风播种-苗期。' },
        { name:'肯德瓦', lat:21.83, lon:76.35, gddStart:'2026-06-15', phase:'<b>发育期</b>：尼马尔棉区，季风播种-苗期。' },
      ]},
      { province:'印度·拉贾斯坦邦', regions:[
        { name:'斯里根根格尔', lat:29.92, lon:73.88, gddStart:'2026-05-01', phase:'<b>发育期</b>：北部灌溉棉，现蕾-开花期。' },
        { name:'科塔', lat:25.21, lon:75.86, gddStart:'2026-05-15', phase:'<b>发育期</b>：现蕾-开花期。' },
      ]},
      { province:'印度·旁遮普-哈里亚纳', regions:[
        { name:'巴丁达(旁遮普)', lat:30.21, lon:74.95, gddStart:'2026-05-01', phase:'<b>发育期</b>：北部灌溉棉，现蕾-花铃期。' },
        { name:'希萨尔(哈里亚纳)', lat:29.15, lon:75.72, gddStart:'2026-05-01', phase:'<b>发育期</b>：北部灌溉棉，现蕾-花铃期。' },
      ]},
      { province:'巴西', regions:[ { name:'马托格罗索(库亚巴)', lat:-15.60, lon:-56.10, gddStart:null, phase:'<b>发育期</b>：二季棉吐絮-采收期，干燥天气有利收获。' } ]},
      { province:'美国', regions:[ { name:'密西西比河谷(阿肯色)', lat:34.75, lon:-92.29, gddStart:'2026-05-05', phase:'<b>发育期</b>：现蕾期。' } ]},
    ]
  },
  { crop:'corn', icon:'🌽', name:'玉米产区气象监测', color:'#eab308',
    groups:[
      { province:'黑龙江', regions:[
        { name:'哈尔滨', lat:45.75, lon:126.63, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。<b>墒情</b>：东北光热适宜，大部墒情适宜。' },
        { name:'齐齐哈尔', lat:47.35, lon:123.92, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。' },
        { name:'佳木斯', lat:46.81, lon:130.33, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。' },
      ]},
      { province:'吉林', regions:[
        { name:'长春', lat:43.88, lon:125.32, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。' },
        { name:'白城', lat:45.62, lon:122.84, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。吉林西部易旱区，重点监测降水。' },
      ]},
      { province:'辽宁', regions:[
        { name:'沈阳', lat:41.80, lon:123.43, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。' },
        { name:'铁岭', lat:42.29, lon:123.84, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。辽北主产区。' },
      ]},
      { province:'内蒙古', regions:[
        { name:'通辽', lat:43.62, lon:122.26, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。西辽河灌区，"内蒙古粮仓"，易旱区。' },
        { name:'兴安盟(乌兰浩特)', lat:46.08, lon:122.05, gddStart:'2026-05-01', phase:'<b>发育期</b>：春玉米拔节期。' },
      ]},
      { province:'河北', regions:[
        { name:'石家庄', lat:38.04, lon:114.51, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米出苗-三叶期。' },
        { name:'衡水', lat:37.74, lon:115.67, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米出苗-三叶期。黑龙港流域，地下水限采区。' },
        { name:'邢台', lat:37.07, lon:114.49, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米出苗-三叶期。' },
      ]},
      { province:'山东', regions:[
        { name:'济南', lat:36.65, lon:117.12, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。<b>风险</b>：35°C+高温不利壮苗。' },
        { name:'菏泽', lat:35.23, lon:115.48, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'聊城', lat:36.46, lon:115.99, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'德州', lat:37.44, lon:116.36, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'枣庄', lat:34.81, lon:117.32, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
      ]},
      { province:'河南', regions:[
        { name:'郑州', lat:34.75, lon:113.63, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'新乡', lat:35.30, lon:113.93, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'南阳', lat:32.99, lon:112.53, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'周口', lat:33.63, lon:114.70, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
        { name:'驻马店', lat:32.98, lon:114.03, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米三叶-七叶期。' },
      ]},
      { province:'安徽', regions:[
        { name:'亳州', lat:33.88, lon:115.78, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米出苗-三叶期。' },
        { name:'阜阳', lat:32.90, lon:115.81, gddStart:'2026-06-10', phase:'<b>发育期</b>：夏玉米出苗-三叶期。' },
      ]},
      { province:'美国', regions:[
        { name:'爱荷华(得梅因)', lat:41.59, lon:-93.62, gddStart:'2026-05-01', phase:'<b>发育期</b>：8%已吐丝，7月中下旬进入授粉关键期。<b>墒情</b>：近日强降雨补墒，优良率约78%。' },
        { name:'伊利诺伊(斯普林菲尔德)', lat:39.78, lon:-89.65, gddStart:'2026-05-01', phase:'<b>发育期</b>：17%已吐丝。优良率约58%(好+优)。' },
        { name:'内布拉斯加(奥马哈)', lat:41.26, lon:-96.01, gddStart:'2026-05-01', phase:'<b>发育期</b>：拔节-抽雄前期。' },
      ]},
      { province:'乌克兰', regions:[
        { name:'基辅', lat:50.45, lon:30.52, gddStart:'2026-04-25', phase:'<b>发育期</b>：拔节-抽雄前。' },
      ]},
      { province:'巴西', regions:[
        { name:'马托格罗索(库亚巴)', lat:-15.60, lon:-56.10, gddStart:null, phase:'<b>发育期</b>：二季玉米(Safrinha)成熟-收获期，干燥有利收割。' },
      ]},
    ]
  },
  { crop:'soybean', icon:'🫘', name:'大豆产区气象监测', color:'#10b981',
    groups:[
      { province:'黑龙江', regions:[
        { name:'哈尔滨', lat:45.75, lon:126.63, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝-初花期。<b>墒情</b>：大部适宜。' },
        { name:'绥化', lat:46.65, lon:126.98, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝-初花期。全国大豆主产核心区。' },
        { name:'黑河', lat:50.25, lon:127.53, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝期。高纬产区，积温是关键限制因子。' },
        { name:'齐齐哈尔', lat:47.35, lon:123.92, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝-初花期。' },
      ]},
      { province:'内蒙古', regions:[
        { name:'兴安盟(乌兰浩特)', lat:46.08, lon:122.05, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝期。' },
        { name:'呼伦贝尔(海拉尔)', lat:49.21, lon:119.77, gddStart:'2026-05-05', phase:'<b>发育期</b>：分枝期。高纬产区，警惕低温。' },
      ]},
      { province:'安徽', regions:[
        { name:'宿州', lat:33.65, lon:116.96, gddStart:'2026-06-15', phase:'<b>发育期</b>：夏大豆出苗-真叶期。' },
        { name:'亳州', lat:33.88, lon:115.78, gddStart:'2026-06-15', phase:'<b>发育期</b>：夏大豆出苗-真叶期。' },
        { name:'阜阳', lat:32.90, lon:115.81, gddStart:'2026-06-15', phase:'<b>发育期</b>：夏大豆出苗-真叶期。' },
      ]},
      { province:'河南', regions:[
        { name:'周口', lat:33.63, lon:114.70, gddStart:'2026-06-15', phase:'<b>发育期</b>：夏大豆出苗-真叶期。' },
      ]},
      { province:'美国', regions:[
        { name:'伊利诺伊', lat:39.78, lon:-89.65, gddStart:'2026-05-10', phase:'<b>发育期</b>：开花期(R1)，33%开花8%结荚。近日降雨改善墒情。' },
        { name:'爱荷华', lat:41.59, lon:-93.62, gddStart:'2026-05-10', phase:'<b>发育期</b>：开花期(R1)，约37%开花。' },
        { name:'印第安纳', lat:39.77, lon:-86.16, gddStart:'2026-05-10', phase:'' },
        { name:'俄亥俄', lat:39.96, lon:-83.00, gddStart:'2026-05-10', phase:'' },
        { name:'明尼苏达', lat:44.98, lon:-93.27, gddStart:'2026-05-10', phase:'' },
        { name:'内布拉斯加', lat:41.26, lon:-96.01, gddStart:'2026-05-10', phase:'' },
        { name:'密苏里', lat:38.58, lon:-92.17, gddStart:'2026-05-10', phase:'' },
        { name:'南达科他', lat:44.37, lon:-100.35, gddStart:'2026-05-10', phase:'' },
      ]},
      { province:'巴西', regions:[
        { name:'马托格罗索', lat:-15.60, lon:-56.10, gddStart:null, phase:'<b>发育期</b>：已收获（休耕/二季作物季），监测供下季播种参考。' },
        { name:'帕拉纳', lat:-25.43, lon:-49.27, gddStart:null, phase:'' },
        { name:'南里奥格兰德', lat:-30.03, lon:-51.23, gddStart:null, phase:'' },
      ]},
      { province:'阿根廷', regions:[
        { name:'布宜诺斯艾利斯省', lat:-34.60, lon:-58.38, gddStart:null, phase:'<b>发育期</b>：已收获（南半球冬季）。' },
        { name:'科尔多瓦省', lat:-31.42, lon:-64.18, gddStart:null, phase:'' },
      ]},
    ]
  },
  { crop:'wheat', icon:'🌾', name:'小麦产区气象监测', color:'#d97706',
    groups:[
      { province:'河北', regions:[
        { name:'衡水', lat:37.74, lon:115.67, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获，腾茬夏播。监测墒情供夏玉米/秋播参考。' },
        { name:'邢台', lat:37.07, lon:114.49, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
      ]},
      { province:'山东', regions:[
        { name:'济南', lat:36.65, lon:117.12, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'聊城', lat:36.46, lon:115.99, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'德州', lat:37.44, lon:116.36, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'枣庄', lat:34.81, lon:117.32, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
      ]},
      { province:'河南', regions:[
        { name:'郑州', lat:34.75, lon:113.63, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获，新麦上市。' },
        { name:'新乡', lat:35.30, lon:113.93, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'南阳', lat:32.99, lon:112.53, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'周口', lat:33.63, lon:114.70, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'驻马店', lat:32.98, lon:114.03, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
      ]},
      { province:'安徽', regions:[
        { name:'亳州', lat:33.88, lon:115.78, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
        { name:'阜阳', lat:32.90, lon:115.81, gddStart:null, phase:'<b>发育期</b>：冬小麦已收获。' },
      ]},
      { province:'俄罗斯', regions:[
        { name:'黑土带(沃罗涅日)', lat:51.67, lon:39.21, gddStart:'2026-04-05', phase:'<b>发育期</b>：冬小麦灌浆-成熟期，7月收获陆续展开。<b>风险</b>：收获期降水/干热风。' },
      ]},
      { province:'乌克兰', regions:[
        { name:'基辅', lat:50.45, lon:30.52, gddStart:'2026-04-05', phase:'<b>发育期</b>：冬小麦灌浆-成熟期。' },
      ]},
      { province:'加拿大', regions:[
        { name:'萨斯喀彻温(萨斯卡通)', lat:52.13, lon:-106.67, gddStart:'2026-05-10', phase:'<b>发育期</b>：春小麦分蘖-拔节期。' },
        { name:'阿尔伯塔(埃德蒙顿)', lat:53.55, lon:-113.49, gddStart:'2026-05-10', phase:'<b>发育期</b>：春小麦分蘖-拔节期。' },
      ]},
      { province:'澳大利亚', regions:[
        { name:'新南威尔士(悉尼以西麦区)', lat:-33.87, lon:151.21, gddStart:'2026-05-15', phase:'<b>发育期</b>：播种-分蘖期。<b>风险</b>：厄尔尼诺→冬春干旱是澳麦最大威胁。' },
        { name:'维多利亚(墨尔本以北麦区)', lat:-37.81, lon:144.96, gddStart:'2026-05-15', phase:'<b>发育期</b>：播种-分蘖期。' },
        { name:'南澳(阿德莱德)', lat:-34.93, lon:138.60, gddStart:'2026-05-15', phase:'<b>发育期</b>：播种-分蘖期。' },
      ]},
    ]
  },
  { crop:'coffee', icon:'☕', name:'咖啡产区气象监测', color:'#78350f',
    groups:[
      { province:'中国云南', regions:[
        { name:'普洱', lat:22.78, lon:100.97, gddStart:null, phase:'<b>物候</b>：果实发育期（雨季）。' },
        { name:'保山', lat:25.11, lon:99.17, gddStart:null, phase:'<b>物候</b>：果实发育期。' },
      ]},
      { province:'巴西', regions:[
        { name:'米纳斯吉拉斯', lat:-19.92, lon:-43.94, gddStart:null, phase:'<b>物候</b>：采收期(5-9月)。<b>风险</b>：7-8月为霜冻高风险窗口，最低温是核心指标。' },
        { name:'圣保罗', lat:-23.55, lon:-46.63, gddStart:null, phase:'<b>物候</b>：采收期。警惕寒潮霜冻。' },
      ]},
      { province:'哥伦比亚', regions:[
        { name:'MAM产区(麦德林)', lat:6.25, lon:-75.56, gddStart:null, phase:'' },
        { name:'考卡省', lat:2.44, lon:-76.61, gddStart:null, phase:'' },
        { name:'娜玲珑省', lat:1.21, lon:-77.28, gddStart:null, phase:'' },
        { name:'慧兰省', lat:2.93, lon:-75.29, gddStart:null, phase:'' },
      ]},
      { province:'埃塞俄比亚', regions:[
        { name:'耶加雪菲', lat:6.16, lon:38.21, gddStart:null, phase:'<b>物候</b>：果实发育期（主雨季)。' },
        { name:'西达摩', lat:6.69, lon:38.42, gddStart:null, phase:'' },
        { name:'哈拉尔', lat:9.31, lon:42.13, gddStart:null, phase:'' },
      ]},
    ]
  },
  { crop:'sugar', icon:'🍬', name:'白糖(甘蔗)产区气象监测', color:'#ec4899',
    groups:[
      { province:'中国广西', regions:[
        { name:'崇左', lat:22.38, lon:107.36, gddStart:'2026-03-01', phase:'<b>发育期</b>：甘蔗伸长期，7-9月为需水最关键期。崇左为全国最大蔗区。' },
        { name:'南宁', lat:22.82, lon:108.37, gddStart:'2026-03-01', phase:'<b>发育期</b>：甘蔗伸长期。' },
        { name:'柳州', lat:24.31, lon:109.41, gddStart:'2026-03-01', phase:'<b>发育期</b>：甘蔗伸长期。' },
        { name:'来宾', lat:23.75, lon:109.23, gddStart:'2026-03-01', phase:'<b>发育期</b>：甘蔗伸长期。' },
      ]},
      { province:'巴西', regions:[
        { name:'圣保罗州(里贝朗普雷图)', lat:-21.18, lon:-47.81, gddStart:null, phase:'<b>物候</b>：压榨季(4-11月)。干燥利于收割与出糖率，但过旱损害下季宿根。' },
      ]},
      { province:'印度·北方邦', regions:[
        { name:'勒克瑙', lat:26.85, lon:80.95, gddStart:null, phase:'<b>物候</b>：季风生长期。印度最大产糖邦。<b>风险</b>：EN年季风偏弱→单产与出糖率下调。' },
        { name:'密拉特', lat:28.98, lon:77.71, gddStart:null, phase:'<b>物候</b>：西北方邦蔗区，季风生长期。' },
        { name:'戈勒克布尔', lat:26.76, lon:83.37, gddStart:null, phase:'<b>物候</b>：东方邦蔗区，季风生长期。' },
      ]},
      { province:'印度·马哈拉施特拉邦', regions:[
        { name:'科尔哈普尔', lat:16.70, lon:74.24, gddStart:null, phase:'<b>物候</b>：主产蔗区，季风生长期。<b>风险</b>：EN年季风偏弱→单产与出糖率下调。' },
        { name:'艾哈迈德讷格尔', lat:19.09, lon:74.74, gddStart:null, phase:'<b>物候</b>：主产蔗区，季风生长期。' },
        { name:'索拉普尔', lat:17.66, lon:75.91, gddStart:null, phase:'<b>物候</b>：季风生长期，易受干旱影响。' },
      ]},
      { province:'印度·卡纳塔克邦', regions:[
        { name:'贝尔高姆', lat:15.85, lon:74.50, gddStart:null, phase:'<b>物候</b>：北卡主产蔗区，季风生长期。' },
        { name:'曼迪亚', lat:12.52, lon:76.90, gddStart:null, phase:'<b>物候</b>：南卡灌溉蔗区，生长期。' },
      ]},
      { province:'印度·泰米尔纳德邦', regions:[
        { name:'哥印拜陀', lat:11.02, lon:76.96, gddStart:null, phase:'<b>物候</b>：灌溉蔗区，生长期。' },
        { name:'埃罗德', lat:11.34, lon:77.72, gddStart:null, phase:'<b>物候</b>：灌溉蔗区，生长期。' },
      ]},
      { province:'印度·古吉拉特邦', regions:[
        { name:'苏拉特', lat:21.17, lon:72.83, gddStart:null, phase:'<b>物候</b>：南古吉拉特蔗区，季风生长期。' },
        { name:'巴多利', lat:21.12, lon:73.11, gddStart:null, phase:'<b>物候</b>：南古吉拉特蔗区，季风生长期。' },
      ]},
      { province:'印度·比哈尔邦', regions:[
        { name:'穆扎法尔普尔', lat:26.12, lon:85.39, gddStart:null, phase:'<b>物候</b>：北比哈尔蔗区，季风生长期。' },
        { name:'西查姆帕兰(贝蒂亚)', lat:26.80, lon:84.50, gddStart:null, phase:'<b>物候</b>：蔗区，季风生长期。' },
      ]},
      { province:'泰国', regions:[
        { name:'东北部(孔敬)', lat:16.44, lon:102.84, gddStart:null, phase:'<b>物候</b>：雨季生长期。<b>风险</b>：EN年泰国降水偏少→出口量收缩。' },
        { name:'北部(甘烹碧)', lat:16.48, lon:99.52, gddStart:null, phase:'<b>物候</b>：雨季生长期。' },
        { name:'中部(北碧)', lat:14.02, lon:99.53, gddStart:null, phase:'<b>物候</b>：雨季生长期。' },
      ]},
    ]
  },
];

// ============================================================
// 农业新闻【静态/人工维护】— 仅保留 12 小时内消息
// 渲染(renderNews)按 ts 实时过滤：距当前 > NEWS_WINDOW_HOURS 小时的条目自动隐藏；全部过期则显示空状态。
// 每条须含真实链接与 ISO 时间戳 ts(北京时 +08:00)；不得编造，无新消息则留空数组即可。
// ============================================================
const NEWS_WINDOW_HOURS = 12;
const AG_NEWS = [
  {
    title: '美玉米带"热盖"压顶授粉期：玉米大豆创6月种植面积报告以来最大单日涨幅(豆+43~49美分、玉米+13~15美分)',
    link: 'https://www.farmprogress.com/markets-and-quotes/morning-market-review',
    ts: '2026-07-14T07:50:00+08:00', date: '7/14 07:50', source: 'Farm Progress', sourceClass: 'usda',
  },
  {
    title: 'NWS 8-14天展望：全美气温偏高，中西部腹地7月下半月现"干袋"，直击玉米授粉核心期',
    link: 'https://www.farmprogress.com/marketing/july-heat-dry-periods-threaten-corn-pollination',
    ts: '2026-07-14T07:10:00+08:00', date: '7/14 07:10', source: 'Farm Progress', sourceClass: 'usda',
  },
  {
    title: '台风"巴威"登陆后消散：华东进入灾后恢复(浙江疏散逾220万)，残余雨带影响江淮—黄淮',
    link: 'https://www.washingtontimes.com/news/2026/jul/12/weakening-typhoon-bavi-still-brings-strong-winds-rain-china/',
    ts: '2026-07-14T06:40:00+08:00', date: '7/14 06:40', source: 'Washington Times', sourceClass: 'fao',
  },
];

// ============================================================
// 特殊天气事件 — 台风/高温/强降水/霜冻等重大天气（静态参考, 更新于 2026-07-14）
// severity 用 tag 分级: severe(白字红底)/high(红)/mid(琥珀)/low(墨绿)
// ============================================================
const SPECIAL_EVENTS = [
  {
    icon:'🌀', title:'台风"巴威"(Bavi) 已消散', severity:'已消散·灾后恢复', cls:'mid', status:'灾后恢复',
    region:'浙江(登陆) → 内陆消散；残余雨带→江淮·黄淮',
    time:'7/11浙江登陆，7/13前后消散',
    detail:'7月11日在浙江玉环/乐清登陆后减弱为热带风暴、西北移入内陆并逐步消散；浙江累计疏散逾220万人。浙东/闽东北转入洪涝退水与灾后恢复，残余水汽/季风雨带影响江淮、黄淮(苏皖北部、河南等)，关注农田渍涝与夏玉米/花生墒情。',
    sources:[ { l:'中央气象台台风网', u:'https://typhoon.nmc.cn/web.html' }, { l:'The Watchers', u:'https://watchers.news/2026/07/11/typhoon-bavi-landfall-zhejiang-china-damage-aftermath-july-2026/' } ],
  },
  {
    icon:'❄️', title:'巴西南部霜冻风险', severity:'霜冻窗口·尾部风险', cls:'high', status:'高风险窗口临近',
    region:'南米纳斯 · 塞拉多 · 圣保罗 · 巴拉那',
    time:'7-8月霜冻高风险期',
    detail:'巴西2026/27咖啡采收偏慢（截至7月初约52%，落后去年及五年均值），近期强降雨扰乱采收；叠加7-8月南部霜冻高风险窗口，投机资金对寒潮高度敏感，阿拉比卡期价单日一度跳涨近10%、重上$3/磅。需逐日跟踪南部最低气温预报。',
    sources:[ { l:'Rio Times', u:'https://www.riotimesonline.com/coffee-prices-2026-brazil-weather-spike/' }, { l:'INMET(巴西气象)', u:'https://portal.inmet.gov.br/' } ],
  },
  {
    icon:'🔥', title:'美国玉米带"热盖"压顶授粉期', severity:'热盖压顶·期价大涨', cls:'severe', status:'压顶授粉期',
    region:'美国东部→平原/中西部 · 玉米带腹地',
    time:'7月下半月高温+干袋',
    detail:'热盖(heat dome)自美东西扩至平原与中西部，8-14天展望全美偏热、中西部腹地7月下半月现"干袋"，正压玉米授粉核心期。7/13盘面创6月种植面积报告以来最大单日涨幅(豆+43~49美分、玉米+13~15美分)。新作结转偏低，单产小幅下修即由宽松转紧。',
    sources:[ { l:'NOAA CPC 8-14天', u:'https://www.cpc.ncep.noaa.gov/products/predictions/814day/' }, { l:'NWS WPC', u:'https://www.wpc.ncep.noaa.gov/' } ],
  },
  {
    icon:'⛈️', title:'美国东玉米带强降水(局地过湿)', severity:'强降水', cls:'mid', status:'临近',
    region:'东玉米带 · 北伊利诺伊 · 东中爱荷华 · 南明尼苏达',
    time:'7/9-15偏湿',
    detail:'8-14天展望显示7/9-15东玉米带偏湿，北伊利诺伊、东中爱荷华、南明尼苏达局地雨水过多，需关注渍涝与病害风险；与西部偏干形成"东湿西热"分化格局。',
    sources:[ { l:'WPC 定量降水预报', u:'https://www.wpc.ncep.noaa.gov/qpf/qpf2.shtml' } ],
  },
];

// ============================================================
// 中国·预报图 — 中央气象台全国降水量预报图 (URL时间戳自动探测)
// 样本1: .../2026/07/03/STFC/medium/SEVP_NMC_STFC_SFER_ER24_ACHN_L88_P9_20260703060002400.JPG (0600起报+024时效)
// 样本2: .../2026/06/17/STFC/medium/SEVP_NMC_STFC_SFER_ER24_ACHN_L88_P9_20260617000007200.JPG (0000起报+072时效)
// 规律: {日期}{起报HHmm(UTC)}{时效FFF}00, 产品代码固定 ER24
// ============================================================
const NMC_PRECIP_HOURS = [
  { fff:'024', label:'24小时 (第1天)' },
  { fff:'048', label:'48小时 (第2天)' },
  { fff:'072', label:'72小时 (第3天)' },
  { fff:'096', label:'96小时 (第4天)' },
  { fff:'120', label:'120小时 (第5天)' },
  { fff:'144', label:'144小时 (第6天)' },
  { fff:'168', label:'168小时 (第7天)' },
];
const NMC_INIT_TIMES = ['1200', '0600', '0000']; // UTC起报时次, 对应北京时20/14/08时, 新→旧探测
function nmcPrecipUrl(y, m, d, hhmm, fff) {
  return `https://image.nmc.cn/product/${y}/${m}/${d}/STFC/medium/SEVP_NMC_STFC_SFER_ER24_ACHN_L88_P9_${y}${m}${d}${hhmm}${fff}00.JPG`;
}

// ---------- 中央气象台官方预报图导航 (国内直连, 图片URL带时间戳无法外链, 故做一键直达) ----------
const CN_OFFICIAL_LINKS = [
  { t:'24小时降水量预报', u:'http://www.nmc.cn/publish/precipitation/1-day.html', d:'每日约08/20时更新 · 页内可切换6h分段' },
  { t:'48–168小时降水预报', u:'http://www.nmc.cn/publish/precipitation/2-day.html', d:'页内可切换48/72/96/120/144/168小时' },
  { t:'最高气温预报', u:'http://www.nmc.cn/publish/temperature/hight/24hour.html', d:'高温热害监控 · 黄淮夏玉米/新疆棉区重点' },
  { t:'强对流天气预报', u:'http://www.nmc.cn/publish/bulletin/swpc.html', d:'雷暴大风/冰雹落区' },
  { t:'台风路径预报', u:'http://typhoon.nmc.cn', d:'台风综合信息 · EN年台风偏强关注华东' },
  { t:'中期天气公报(4-10天)', u:'http://www.nmc.cn/publish/bulletin/mid-range.htm', d:'环流趋势与过程预报' },
  { t:'农业干旱综合监测', u:'http://www.nmc.cn/publish/agro/disastersmonitoring/Agricultural_Drought_Monitoring.htm', d:'农业气象板块 · 每周更新' },
  { t:'土壤水分监测(10cm)', u:'http://www.nmc.cn/publish/agro/soil-moisture-monitoring-10cm.html', d:'产区墒情实况' },
  { t:'作物发育期监测', u:'http://www.nmc.cn/publish/agro/information/soybean.html', d:'大豆/玉米/棉花发育期地图' },
  { t:'农业气象周报', u:'http://www.nmc.cn/publish/agro/ten-week/index.html', d:'生育期表静态描述的官方来源' },
  { t:'雷达拼图(实况)', u:'http://www.nmc.cn/publish/radar/chinaall.html', d:'全国雷达回波' },
  { t:'FY-4B卫星云图', u:'http://www.nmc.cn/publish/satellite/fy4b-visible.htm', d:'可见光云图' },
];

// ---------- 中国强对流天气监测【图像自动探测 · 近实时】 ----------
// 三类NMC真实产品图，前端用 probeImage/pool 探测最新可用时次(与降水图同源逻辑；时间戳均为UTC)：
//  · CSPB 强对流预报(4张 base64_1..4；UTC起报 0000/0600/1000/2200)
//  · RDCP 全国雷达拼图(约6分钟一帧 → 多帧动画)
//  · WXBL FY-4B可见光云图(约15分钟一帧 → 多帧动画；夜间可能缺测)
// 图片URL仅前端引用官方公开地址，不本地缓存；官方源链接仅作兜底(小字"查看来源")。
const CN_CONV_CONFIG = {
  convective: { title:'强对流天气预报', srcPage:'http://www.nmc.cn/publish/bulletin/swpc.html',
    issues:['2200','1000','0600','0000'], count:4,
    labels:['强对流预报图 1','强对流预报图 2','强对流预报图 3','强对流预报图 4'] },
  radar:     { title:'全国雷达拼图（实况）', srcPage:'http://www.nmc.cn/publish/radar/chinaall.html',
    stepMin:6, lookbackMin:180, maxFrames:12 },
  satellite: { title:'FY-4B 可见光云图', srcPage:'http://www.nmc.cn/publish/satellite/fy4b-visible.htm',
    stepMin:15, lookbackMin:420, maxFrames:8 },
};

// ---------- 台风监测面板【嵌入动画/交互地图 · 图层切换】 ----------
// 主体为真实嵌入地图(iframe/动图)，非链接卡；顶部工具栏切换图层，链接仅兜底。
// 图层顺序：Ventusky风场 → Ventusky雨/雷达 → 中央气象台台风路径(交互) → JTWC警报图(静态兜底)。
// 注：Zoom Earth 用 SAMEORIGIN 禁止跨站iframe，故不作嵌入源(仅可外链)。
const TYPHOON_MONITOR = {
  note:'台风路径与强度以官方发布为准。面板嵌入实时/交互地图；若某图层空白或被浏览器拦截，请切换其他图层或点“打开来源”。JTWC 警报图为静态兜底(风暴消散后会失效)。',
  defaultLayer:'wind',
  layers:[
    { key:'wind', label:'风场', type:'iframe', title:'Ventusky 西北太平洋 风场(动画)',
      src:'https://www.ventusky.com/?p=23;125;4&l=wind-10m', srcName:'Ventusky', srcUrl:'https://www.ventusky.com/?p=23;125;4&l=wind-10m',
      alt:{ name:'earth.nullschool 风场动画', url:'https://earth.nullschool.net/#current/wind/surface/level/orthographic=125.00,23.00,1200' } },
    { key:'rain', label:'雨 · 雷达', type:'iframe', title:'Ventusky 西北太平洋 降水/雷达(动画)',
      src:'https://www.ventusky.com/?p=23;125;4&l=rain-3h', srcName:'Ventusky', srcUrl:'https://www.ventusky.com/?p=23;125;4&l=rain-3h' },
    { key:'track', label:'官方路径', type:'iframe', title:'中央气象台 台风路径(交互地图)',
      src:'https://typhoon.nmc.cn/web.html', srcName:'中央气象台台风网', srcUrl:'https://typhoon.nmc.cn/web.html' },
    { key:'warn', label:'静态警报图', type:'image', title:'JTWC 西北太平洋 第09号(巴威/Bavi)警报图',
      src:'https://www.metoc.navy.mil/jtwc/products/wp0926.gif', srcName:'JTWC', srcUrl:'https://www.metoc.navy.mil/jtwc/jtwc.html',
      note:'联合台风警报中心警报图，随每报更新；风暴消散后此图将失效，届时以官方路径为准' },
  ],
  cards:[
    { icon:'🌀', t:'中央气象台台风网', kind:'官方 · 实时路径/预报/集合', u:'http://typhoon.nmc.cn', d:'国内直连：实时定位、强度、预报路径与集合预报、警报信息', primary:true },
    { icon:'💨', t:'earth.nullschool 风场', kind:'全球风场动画', u:'https://earth.nullschool.net/#current/wind/surface/level/orthographic=125.00,23.00,1200', d:'西北太平洋近地面风场动画(备用)' },
    { icon:'🛰️', t:'JTWC 联合台风警报中心', kind:'西北太平洋警报图(英文)', u:'https://www.metoc.navy.mil/jtwc/jtwc.html', d:'警报、路径图与技术报文' },
  ],
};

// ---------- World Ag Weather 作物区15天预报图【图像 · ID自动探测】 ----------
// 仅对"当前 cropRegions 已存在 且 WAW 支持"的美国玉米/大豆产区嵌入(温度+降水两图)；不新增任何产区。
// key = `${crop}|${region.name}`（crop 用 cropRegions 的 crop 字段：玉米=corn、大豆=soybean）。
// 图片ID随时间变化：前端从锚点ID附近探测最新可用ID(probeImage)，失败则回退锚点。
const WAW_CROP_ANCHOR = { id:5095, margin:8, maxProbe:40 };
const WAW_CROP_CHARTS = {
  'corn|爱荷华(得梅因)':        { crop:'corn',     sub:'iowa' },
  'corn|伊利诺伊(斯普林菲尔德)': { crop:'corn',     sub:'illinois' },
  'corn|内布拉斯加(奥马哈)':     { crop:'corn',     sub:'nebraska' },
  'soybean|伊利诺伊':            { crop:'soybeans', sub:'illinois' },
  'soybean|爱荷华':              { crop:'soybeans', sub:'iowa' },
  'soybean|印第安纳':            { crop:'soybeans', sub:'indiana' },
  'soybean|明尼苏达':            { crop:'soybeans', sub:'minnesota' },
  'soybean|内布拉斯加':          { crop:'soybeans', sub:'nebraska' },
};
