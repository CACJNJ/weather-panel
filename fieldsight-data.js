// ============================================================
// 静态数据层 — 由定时任务/人工定期刷新
// 最后更新: 2026-07-14 (数据来源见各板块)
// ============================================================
const STATIC_UPDATED = '2026-08-06';

// ---------- ENSO 总览【静态/人工维护 · 官方指数快照，来源核对: 2026-08-06】 ----------
// 数值均取自下方各项 sources 列出的固定权威来源；无法核实者标注"未核实"，不凭记忆/模型生成
// 2026-08-06 核对结果：★CPC NAO 已发布 7 月值 = −0.3134（6月为 +0.1014），由近中性转为弱负——
//     这是自 7/28 BOM 更新以来第一项真正变化的官方数据，已同步更新下方 NAO 条目与海洋指数卡。
//   BOM 仍为 7/28 期(观测周至7/26：相对NINO3.4 +1.94、30天SOI −28.0、IOD +0.44)，下期约 8/11；
//   NOAA 讨论仍为 7/9 期(周值 NINO3.4 +1.2)，下期 8/13；
//   JMA PDO 末行仍为 2026-06 −0.9372 —— 7月值仍未发布（NAO 已出而 PDO 未出，两者节奏本就不同步，
//     勿因 NAO 已更新而推算或填补 PDO 的 7 月值）。
const SOURCE_CHECKED = '2026-08-06';
const ensoOverview = [
  { value:'+1.94°C', label:'相对NINO3.4 (BOM 至7/26)',      status:'两周升约0.5°C · NOAA 7/9期为+1.2' },
  { value:'−28.0',   label:'SOI 30天 (BOM Troup 至7/26)',   status:'强负值加深(前值−25.8)' },
  { value:'+0.44',   label:'IOD 周值 (BOM 至7/26)',          status:'★首次触及正IOD阈值(+0.4)' },
  { value:'强-极强', label:'预测峰值强度 (BOM 7/28)',        status:'或达/超1950年以来最高' },
];

// ---------- 气候概览分析【静态/人工维护 · 仅气候指数，每项须有来源+日期，需定期核对】 ----------
// 范围: 仅 ENSO/PDO/NAO/IOD 等气候指数; 天气事件(台风/高温/霜冻)见"伍 特殊天气事件"章节
const alerts = [
  {
    level:'danger', title:'🌊 ENSO 厄尔尼诺(El Niño)已确立并持续增强',
    observed:'★BOM 7/28 新一期显著上修：相对 NINO3.4 升至 +1.94°C(观测周至7/26，两周升约0.5°C)、30天 SOI −28.0(至7/26，前值−25.8)；信风在西太反转或偏弱、国际日期变更线附近对流增强而海洋性大陆受抑，海气耦合特征完整。NOAA(7/9讨论，未更新)周值 NINO3.4 +1.2°C、NINO1+2 +2.7°C、NINO4 +0.5°C，赤道次表层因下沉 Kelvin 波增暖。',
    outlook:'BOM(7/28)：预测指向强-极强事件，多数模式认为峰值将"达到或超过1950年以来的最高值"，料在(南半球)晚春至夏季见顶，并*可能*延续到2027年秋季。NOAA(7/9)：97% 概率维持到 2027 年初春，10-12月 81% 概率达强/极强。下次 NOAA 讨论 2026-08-13，下次 BOM 约两周后。',
    implication:'若强 El Niño 兑现，历史上*倾向于*东南亚/澳洲偏干、南美偏湿，对棕榈油、澳麦、南美大豆/玉米有潜在供给扰动。BOM 同时提醒：NINO3.4 的强信号不必然等于对澳洲气候的强影响，ENSO 只是众多因子之一。此为条件性推断，不能单独决定天气、单产或价格。',
    cadence:'每周指数更新 · 每月官方讨论', obsPeriod:'BOM周值至 2026-07-26 / NOAA讨论 2026-07-09', updated:'BOM 2026-07-28；NOAA 2026-07-09（8/5重查仍无新发布，下期约 BOM 8/11、NOAA 8/13）', checked:'2026-08-06',
    sources:[{l:'NOAA CPC ENSO讨论',u:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'},{l:'NOAA CPC 指数',u:'https://www.cpc.ncep.noaa.gov/data/indices/'},{l:'BOM ENSO',u:'http://www.bom.gov.au/climate/enso/'}]
  },
  {
    level:'warn', title:'🌊 PDO 太平洋年代际振荡：负相位延续',
    observed:'JMA 月度 PDO 指数 2026年6月 −0.94（最新可得），较5月 −0.79 更负；2025年7月曾探底 −3.23。自2020年以来负相位主导。',
    outlook:'PDO 为月度指数、无逐日实时值；当前趋势维持负相位。注：NOAA PSL 的 PDO 序列目前仅更新至 2025年8月，故此处采用 JMA 月度官方值。',
    implication:'负 PDO *可能*增强冬季经向环流与西伯利亚高压，与 El Niño 叠加时冬季环流形势复杂。属长期背景因子，条件性推断。',
    cadence:'月度官方更新', obsPeriod:'月值 2026-06（最新可得）', updated:'JMA 2026-06 值', checked:'2026-08-06',
    sources:[{l:'JMA 月度PDO',u:'https://ds.data.jma.go.jp/tcc/tcc/products/elnino/decadal/pdo_month.html'}]
  },
  {
    level:'info', title:'🌀 NAO 北大西洋涛动：★7月转为弱负相位',
    observed:'NOAA CPC 月度 NAO 已发布 <b>2026年7月 −0.31</b>（本次核对新增）。回溯序列：3月 +2.69（春季高值）、4月 +1.39、5月 −0.74、6月 +0.10、7月 −0.31。即春季强正相位消退后，6月短暂回到近中性，7月再度转负。',
    outlook:'月度指数，8月值预计9月初发布。当前为弱负相位，绝对值不大（|NAO|<0.5），信号强度仍属偏弱一档，不宜过度解读单月波动。',
    implication:'负 NAO *倾向于*使北大西洋急流南压、欧洲西北部偏干而地中海-黑海一带降水机会增多。在欧盟已下调26/27谷物总产（−9.4%）的背景下，这一项属于需要跟踪但尚不足以独立支撑判断的边际因素。条件性推断。',
    cadence:'月度更新', obsPeriod:'月值 2026-07（本次新发布）', updated:'NOAA CPC 2026-07 值（8/6核对时新增）', checked:'2026-08-06',
    sources:[{l:'NOAA CPC NAO',u:'https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/nao.shtml'}]
  },
  {
    level:'warn', title:'🌏 IOD 印度洋偶极子：★首次触及正IOD阈值(仍未成事件)',
    observed:'BOM(7/28更新) 周度 IOD 指数 2026年7月26日 +0.44°C，两周升约0.5°C(前值 7/12 为 −0.06°C)。这是本轮首次达到正 IOD 阈值(+0.4°C)。',
    outlook:'BOM 明确：需要指数"持续"高于阈值才算正 IOD 事件成立，单周触及不构成事件，官方现仍表述为"中性"。模式预测南半球冬季*可能*发展为正 IOD 并持续到春季，时间与强度仍有分歧。',
    implication:'正 IOD 与 El Niño 叠加，历史上*倾向于*加剧东南亚/澳洲干旱，对棕榈油、澳麦为潜在上行风险；但当前仅为单周触线、事件未确立，不应据此认定减产。条件性推断，建议观察后续两周是否持续。',
    cadence:'每两周更新', obsPeriod:'至 2026-07-26', updated:'BOM 2026-07-28（新）', checked:'2026-08-06',
    sources:[{l:'BOM IOD',u:'https://www.bom.gov.au/climate/iod/'}]
  },
];

// ---------- 海洋指数【静态/人工维护 · ENSO/PDO/NAO/IOD, 每项标观测期与来源, 核对 2026-08-06】 ----------
const oceanIndices = [
  {
    name:'🌊 ENSO 厄尔尼诺-南方涛动', borderColor:'#ef4444',
    metrics:[{v:'+1.94°C',l:'相对NINO3.4(BOM 至7/26)',c:'hi-temp'},{v:'El Niño',l:'当前相位',c:'hi-temp'},{v:'−28.0',l:'SOI(BOM 至7/26)',c:'hi-temp'},{v:'+1.2°C',l:'NINO3.4(NOAA 7/9期)'}],
    risks:[{label:'高风险',cls:'risk-high'},{label:'加速增强',cls:'risk-severe'}],
    dir:'★两周升约+0.5°C(+1.47→+1.94)；SOI −25.8→−28.0',
    detail:'官方 El Niño Advisory。BOM(7/28新一期):相对NINO3.4 +1.94(观测周至7/26)、SOI −28.0,信风反转/偏弱、日界线对流增强,多数模式预计峰值"达到或超过1950年以来最高值",晚春-夏季见顶、或延续至2027年秋。NOAA(7/9,未更新):NINO1+2 +2.7°C、NINO4 +0.5°C、次表层增暖(下沉Kelvin波),97%持续至27初春、10-12月81%为强/极强。',
    cadence:'每周指数 / 每月讨论', obsPeriod:'BOM周值至7/26 · NOAA讨论7/9', checked:'2026-08-06',
    sources:[{l:'BOM(7/28新)',u:'http://www.bom.gov.au/climate/enso/'},{l:'NOAA CPC ENSO讨论',u:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'},{l:'NOAA CPC 指数',u:'https://www.cpc.ncep.noaa.gov/data/indices/'}]
  },
  {
    name:'🌊 PDO 太平洋年代际振荡', borderColor:'#f59e0b',
    metrics:[{v:'负相位',l:'当前相位'},{v:'−0.94',l:'2026年6月(JMA)',c:'hi-temp'},{v:'−0.79',l:'2026年5月'},{v:'−3.23',l:'2025年7月极值'}],
    risks:[{label:'中风险',cls:'risk-mid'},{label:'长期影响',cls:'risk-high'}],
    dir:'6月(−0.94)较5月(−0.79)更负',
    detail:'JMA 月度指数；负相位自2020年延续，负PDO通常增强西伯利亚高压、影响北太平洋风暴路径。(NOAA PSL 序列现止于2025-08，故采用 JMA 月度值)',
    cadence:'月度官方更新', obsPeriod:'月值 2026-06（最新可得）', checked:'2026-08-06',
    sources:[{l:'JMA 月度PDO',u:'https://ds.data.jma.go.jp/tcc/tcc/products/elnino/decadal/pdo_month.html'}]
  },
  {
    name:'🌀 NAO 北大西洋涛动', borderColor:'#8b5cf6',
    metrics:[{v:'弱负',l:'当前相位'},{v:'−0.31',l:'2026年7月(新)',c:'hi-temp'},{v:'+0.10',l:'2026年6月'},{v:'+2.69',l:'3月春季峰值'}],
    risks:[{label:'当前低风险',cls:'risk-low'},{label:'季节性',cls:'risk-mid'}],
    dir:'★6月+0.10 → 7月−0.31，转弱负',
    detail:'NOAA CPC 月度指数；7月值 −0.31 为本次核对新发布。3月强正(+2.69)后逐月回落，6月近中性、7月转负但绝对值仍小(<0.5)，属弱信号。负NAO倾向使北大西洋急流南压、欧洲西北偏干而地中海-黑海降水机会增多，对欧洲/黑海麦区为边际因素。',
    cadence:'月度更新', obsPeriod:'月值 2026-07（本次新发布）', checked:'2026-08-06',
    sources:[{l:'NOAA CPC NAO',u:'https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/nao.shtml'}]
  },
  {
    name:'🌏 IOD 印度洋偶极子', borderColor:'#10b981',
    metrics:[{v:'中性',l:'官方表述(事件未立)'},{v:'+0.44',l:'DMI (7/26)',c:'hi-temp'},{v:'+0.4',l:'正IOD阈值(首次触及)'},{v:'需持续',l:'成立条件'}],
    risks:[{label:'转为关注',cls:'risk-mid'},{label:'与EN叠加风险',cls:'risk-high'}],
    dir:'★两周升约+0.5(−0.06→+0.44)，首次触线',
    detail:'BOM(7/28新一期);周值 +0.44(至7/26),为本轮首次达到正IOD阈值(+0.4)。但BOM强调需"持续"高于阈值方可判定事件成立,故官方现仍表述为中性。模式预测南半球冬季或发展正IOD并持续到春季,时间与强度仍有分歧。正IOD+El Niño→东南亚/澳洲干旱潜在加剧,建议观察后续两周能否维持。',
    cadence:'每两周更新', obsPeriod:'至 2026-07-26', checked:'2026-08-06',
    sources:[{l:'BOM ENSO/IOD(7/28新)',u:'http://www.bom.gov.au/climate/enso/'},{l:'BOM IOD',u:'https://www.bom.gov.au/climate/iod/'}]
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
// 美国各行的进度与优良率数字均取自 USDA Crop Progress 原始件(截至2026-08-02，8/3发布)，Good+Excellent 由本站自行相加；
// 中国/巴西等无对应官方周度数字的行，只描述物候阶段与定性风险，不填未经核实的百分比。
const cropCalendar = [
  { crop:'🌴 棕榈油', region:'马来西亚/印尼', season:'全年生长', sensitive:'果实膨大/授粉', risk:'厄尔尼诺干旱→果粒变小、含油率下降（滞后6-12个月显现）', enso:'EN已确立(BOM 7/28上修)+IOD首触正阈值→东南亚干旱风险组合最强' },
  { crop:'🧵 棉花', region:'中国新疆', season:'花铃期(盛铃)', sensitive:'高温与水分', risk:'花铃期持续高温影响成铃与铃重；需关注灌溉保障', enso:'北半球夏季偏暖' },
  { crop:'🌽 玉米', region:'中国东北', season:'抽雄吐丝-灌浆初期', sensitive:'吐丝授粉期水分与高温', risk:'授粉窗口已进入或临近尾声，转入灌浆定粒；重点转为8月水分与积温', enso:'东北积温正常偏有利' },
  { crop:'🌽 玉米', region:'黄淮海(夏玉米)', season:'拔节-大喇叭口期', sensitive:'大喇叭口至抽雄的水分与高温', risk:'即将进入抽雄授粉关键窗口，35°C+高温叠加干旱最不利', enso:'黄淮盛夏偏热风险' },
  { crop:'🌽 玉米', region:'美国玉米带', season:'乳熟43%、凹陷6%(截至8/2，均快于5年均值38%/5%)', sensitive:'灌浆定粒期水分', risk:'优良率61%(8/2)，周降2点、创季内新低且低于去年73%；48州表层墒情短缺48%未改善。授粉已收尾，8月水分决定粒重', enso:'近期转湿；但CPC(8/5发布)指向8/13-8/19美本土大部偏热' },
  { crop:'🫘 大豆', region:'中国东北', season:'开花-结荚期', sensitive:'结荚鼓粒期水分', risk:'进入产量形成关键期，8月水分为核心变量', enso:'关注8月干旱风险' },
  { crop:'🫘 大豆', region:'美国中西部', season:'结荚62%(截至8/2，快于5年均值55%)', sensitive:'结荚-鼓粒期水分与温度', risk:'优良率63%(8/2)持平前周、未随玉米下滑；但鼓粒期恰逢CPC预示的8月中旬偏热窗口，为当前最大单一风险', enso:'中国新作累计采购278万吨提供需求支撑；巴西出口纪录1.154亿吨压制' },
  { crop:'🌾 小麦', region:'中国黄淮海', season:'已收获', sensitive:'—', risk:'收获完毕，腾茬夏播', enso:'新麦上市，关注质量' },
  { crop:'🌾 小麦', region:'美国春麦', season:'收获5%(截至8/2，慢于5年均值8%)', sensitive:'收获期降水与旱区分布', risk:'优良率55%(8/2)较前周回升2点且高于去年48%；但干旱面积口径(7/28)仍达42%，两口径背离，以评级与收获进度为准', enso:'—' },
  { crop:'🌾 小麦', region:'澳大利亚', season:'营养生长-分蘖期', sensitive:'冬春降水', risk:'厄尔尼诺→澳洲干旱是最大风险；但USDA已上调澳麦26/27至3100万吨，短期与EN逻辑相左', enso:'BOM上修EN峰值"或超1950年以来最高"，下半程风险不宜提前解除' },
  { crop:'🌾 小麦', region:'黑海(俄/乌)', season:'收获推进期', sensitive:'收获与出口物流', risk:'风险已由天气转为战争——俄乌互袭港口、粮食码头与船只，黑海部分码头限制接粮；Rusagrotrans下调俄7月出口至190万吨', enso:'间接影响较弱' },
  { crop:'☕ 咖啡', region:'巴西米纳斯', season:'采收期后段(5-9月)', sensitive:'霜冻窗口 / 9-10月开花期降水', risk:'7-8月南部霜冻窗口仍开但当前预报无重大霜冻风险；采收推进压制近月', enso:'EN或令9-10月(下季)开花期偏干，为中期支撑' },
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
  // ---------- 菜籽/油菜籽 (Rapeseed/Canola) ----------
  // 产地依据: 加拿大 StatCan(SK>AB>MB 三省占全国绝大多数)；EU FR/DE/PL/RO/CZ 为主产国；澳洲 WA 占全国>50%(Esperance 单区最大), 次为 VIC/NSW/SA。
  // 物候: 加拿大春油菜(5月播/7月开花-结荚); 欧盟冬油菜(上年秋播/7月收获, gddStart=null 走滚动窗口); 澳洲冬油菜(4-5月播/8-9月开花, 当前营养-抽薹期)。代表点为各产带主要种植/气象站城市。
  { crop:'canola', icon:'🌼', name:'菜籽产区气象监测', color:'#facc15',
    groups:[
      { province:'加拿大·萨斯喀彻温', regions:[
        { name:'里贾纳', lat:50.45, lon:-104.62, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期(5月播种)。全国最大产省，7-8月花期高温(>30°C)/干旱影响结实与含油率。' },
        { name:'萨斯卡通', lat:52.13, lon:-106.67, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。中萨主产带。' },
        { name:'约克顿', lat:51.21, lon:-102.46, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。东萨油菜与压榨集散地。' },
        { name:'阿尔伯特王子城', lat:53.20, lon:-105.75, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。北部黑土带。' },
      ]},
      { province:'加拿大·艾伯塔', regions:[
        { name:'红鹿市', lat:52.27, lon:-113.81, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。中艾伯塔核心油菜带。' },
        { name:'大草原城', lat:55.17, lon:-118.80, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。北部和平河(Peace)主产区。' },
        { name:'莱斯布里奇', lat:49.69, lon:-112.83, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。南部(含灌溉)产区。' },
      ]},
      { province:'加拿大·马尼托巴', regions:[
        { name:'布兰登', lat:49.85, lon:-99.95, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。西南曼省主产带。' },
        { name:'波蒂奇拉普雷里', lat:49.97, lon:-98.29, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。红河谷产区。' },
        { name:'多芬', lat:51.15, lon:-100.05, gddStart:'2026-05-10', phase:'<b>发育期</b>：春油菜开花-结荚期。西北曼省产区。' },
      ]},
      { province:'法国', regions:[
        { name:'奥尔良(中央-卢瓦尔河谷)', lat:47.90, lon:1.90, gddStart:null, phase:'<b>物候</b>：冬油菜收获期(上年秋播)。法国主产带，关注收割窗口降水。' },
        { name:'沙特尔(博斯)', lat:48.44, lon:1.49, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。博斯(Beauce)大田油料带。' },
        { name:'第戎(勃艮第-弗朗什孔泰)', lat:47.32, lon:5.04, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。勃艮第油菜带。' },
      ]},
      { province:'德国', regions:[
        { name:'罗斯托克(梅前州)', lat:54.09, lon:12.14, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。梅克伦堡-前波美拉尼亚为德国第一大油菜州。' },
        { name:'马格德堡(萨安州)', lat:52.12, lon:11.63, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。萨克森-安哈尔特黑土油料带。' },
        { name:'科特布斯(勃兰登堡)', lat:51.76, lon:14.33, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。勃兰登堡产区。' },
      ]},
      { province:'波兰', regions:[
        { name:'波兹南(大波兰省)', lat:52.41, lon:16.93, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。大波兰为主产区之一。' },
        { name:'比得哥什(库亚瓦-滨海省)', lat:53.12, lon:18.01, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。库亚瓦油料带。' },
        { name:'弗罗茨瓦夫(下西里西亚)', lat:51.11, lon:17.03, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。下西里西亚肥沃产区。' },
      ]},
      { province:'罗马尼亚', regions:[
        { name:'蒂米什瓦拉(巴纳特)', lat:45.75, lon:21.23, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。西部巴纳特平原油料带。' },
        { name:'康斯坦察(多布罗加)', lat:44.18, lon:28.63, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。多布罗加(黑海沿岸)产区。' },
        { name:'克拉约瓦(奥尔特尼亚)', lat:44.33, lon:23.79, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。南部瓦拉几亚平原产区。' },
      ]},
      { province:'捷克', regions:[
        { name:'布尔诺(南摩拉维亚)', lat:49.20, lon:16.61, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。南摩拉维亚主产油料区。' },
        { name:'奥洛穆茨(哈纳)', lat:49.59, lon:17.25, gddStart:null, phase:'<b>物候</b>：冬油菜收获期。哈纳(Haná)肥沃平原。' },
      ]},
      { province:'澳大利亚·西澳', regions:[
        { name:'埃斯佩兰斯', lat:-33.86, lon:121.89, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期(4-5月播)。南海岸单区产量全国最大；需350-500mm冬春降水。' },
        { name:'卡塔宁(大南部)', lat:-33.69, lon:117.56, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。大南部主产带。' },
        { name:'杰拉尔顿', lat:-28.77, lon:114.61, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。北部麦区，早播早熟、旱情敏感。' },
        { name:'莫拉瓦', lat:-29.21, lon:116.01, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。北部内陆麦区。' },
      ]},
      { province:'澳大利亚·新南威尔士', regions:[
        { name:'沃加沃加(里韦里纳)', lat:-35.11, lon:147.37, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。里韦里纳为NSW油菜核心带。' },
        { name:'特莫拉', lat:-34.45, lon:147.53, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。南部坡地油菜带。' },
        { name:'达博', lat:-32.24, lon:148.60, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。中部西坡产区。' },
      ]},
      { province:'澳大利亚·维多利亚', regions:[
        { name:'霍舍姆(威默拉)', lat:-36.71, lon:142.20, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。威默拉大田油菜带。' },
        { name:'阿拉拉特(西南维州)', lat:-37.28, lon:142.93, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。西南维州为全州最大油菜产区。' },
      ]},
      { province:'澳大利亚·南澳', regions:[
        { name:'纳拉库特(石灰岩海岸)', lat:-36.96, lon:140.74, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。东南石灰岩海岸产区。' },
        { name:'克莱尔(中北部)', lat:-33.83, lon:138.61, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。中北部谷地产区。' },
        { name:'卡明斯(艾尔半岛)', lat:-34.26, lon:135.72, gddStart:'2026-05-01', phase:'<b>发育期</b>：冬油菜营养-抽薹期。艾尔半岛(Eyre)主产带。' },
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
    title: '★气候层出现一周来首项真实变化：NOAA CPC 已发布 <b>NAO 月度指数 2026年7月值 −0.31</b>(6月为 +0.10)，由近中性转为弱负。序列为 3月+2.69→4月+1.39→5月−0.74→6月+0.10→7月−0.31。绝对值仍小于0.5属弱信号，不宜过度解读单月波动；负NAO倾向使北大西洋急流南压、欧洲西北偏干而地中海-黑海降水机会增多，在欧盟已下调26/27谷物总产9.4%的背景下属需跟踪的边际因素。同期 JMA 的 PDO 7月值仍未发布，两者发布节奏本就不同步',
    link: 'https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/nao.shtml',
    ts: '2026-08-06T06:40:00+08:00', date: '8/6 06:40', source: 'NOAA CPC 月度序列', sourceClass: 'usda',
  },
  {
    title: '周三(8/5)玉米连续第三日下跌并创新低：9月玉米4.36¾(−5½)，9月大豆11.56½(−2¼)跌幅明显收窄，9月豆粕310.20(−2.50)、豆油67.72(−48点)。<b>小麦逆势收高</b>——9月芝加哥6.42¼(+3¾)，12月棉花83.02(+56点)连续第二日上涨。谷物内部开始分化：玉米独自承压，小麦与棉花已止跌',
    link: 'https://www.brownfieldagnews.com/market-news/closing-grain-and-livestock-futures-august-5-2026/',
    ts: '2026-08-06T04:12:00+08:00', date: '8/6 04:12', source: 'Brownfield Ag News', sourceClass: 'usda',
  },
  {
    title: '★中期偏热信号连续第二期确认：NOAA CPC 于8月5日发布的6-10天(有效期8/11-8/15)与8-14天(8/13-8/19)展望，仍使用与前一日完全相同的表述——"北美大部上空大范围的正高度距平，使美国本土绝大部分地区与阿拉斯加倾向于偏高气温"。连续两期同向意味着这不是单次模式噪音；该窗口恰好覆盖美豆鼓粒期，是当前最需跟踪的反向风险。同期展望并未给出玉米带的偏干信号(偏少降水仅指向佛罗里达部分地区)',
    link: 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/fxus06.html',
    ts: '2026-08-06T06:30:00+08:00', date: '8/6 06:30', source: 'NOAA CPC 预报讨论原文', sourceClass: 'usda',
  },
  {
    title: '资金面：原油跌势显著放缓，9月原油仅跌0.55美元至75.22(此前两日累跌约9美元)，能源对谷物的拖累边际减弱。但黄金单日暴涨155.40美元至4,308，道指再涨263点至54,349——避险与权益同涨的组合较为少见，显示宏观资金仍在农产品之外寻找方向，谷物缺乏增量资金承接',
    link: 'https://www.brownfieldagnews.com/market-news/closing-grain-and-livestock-futures-august-5-2026/',
    ts: '2026-08-06T04:20:00+08:00', date: '8/6 04:20', source: 'Brownfield Ag News', sourceClass: 'usda',
  },
  {
    title: '后续观察：①8月WASDE(市场关注的8/12当期报告)将首次纳入实地调查单产，在"评级创新低而价格续跌"的背离下，该单产数字将直接裁决市场的乐观定价是否成立，为本月最大单一事件风险；②下期作物生长报告(8/10当周)验证降水能否转化为评级企稳；③玉米三连跌后与小麦/棉花的分化能否延续，是判断本轮下跌属板块性还是玉米独有的关键',
    link: 'https://www.nass.usda.gov/Publications/National_Crop_Progress/',
    ts: '2026-08-06T06:50:00+08:00', date: '8/6 06:50', source: '本站综合 · USDA', sourceClass: 'usda',
  },
];

// ============================================================
// 特殊天气事件 — 台风/高温/强降水/霜冻等重大天气（静态参考, 更新于 2026-08-06）
// severity 用 tag 分级: severe(白字红底)/high(红)/mid(琥珀)/low(墨绿)
// ============================================================
const SPECIAL_EVENTS = [
  {
    icon:'🌡️', title:'近期转湿 vs 中旬高压脊回归——8月中的两段式风险', severity:'先湿后热', cls:'mid', status:'评级61%但市场看修复',
    region:'全玉米带(整月高压脊) · 北部平原与西部(重旱)',
    time:'7月整月 · 8月为定产窗口',
    detail:'DTN(7/27)：7月美玉米产区加权降水仅3.42英寸，为2014年(2.48英寸)以来最少、2012年以来第三低，去年同期5.17英寸；加权均温78.15°F高于去年。夏季高压脊整月盘踞玉米带压制降水。USDA(截至7/26)玉米优良率随之降至63%(周降4个百分点、季内新低，属7月单周最大跌幅之一，西玉米带主导)、大豆63%(−3)，而吐丝78%/乳熟25%/大豆结荚47%均快于均值——"抢生育期但缺水"。<b>8/5更新：8月中旬呈"先湿后热"两段式</b>。第一段——市场预期中西部本周至下周中出现大范围乃至浸透性降水，玉米授粉已收尾、大豆正值结荚，此时补水对单产贡献直接，这是周二谷物全线下跌(9月玉米−7、大豆−15、小麦−12½)的主因。第二段——<b>NOAA CPC 连续两期(8/4、8/5发布)给出同向信号</b>：最新一期(8/5发布，6-10天有效期8/11-8/15、8-14天8/13-8/19)仍写明"北美大部上空大范围正高度距平使美国本土绝大部分地区倾向偏高气温"。连续两期措辞一致，说明并非单次模式噪音，高压脊与偏热格局在8月中旬回归的概率上升，恰逢大豆鼓粒期。需注意：该展望并未给出玉米带的偏干信号(偏少降水仅指向佛罗里达部分地区)，故为"偏热但未必偏干"。<br>背景仍是7月的既成损伤：USDA(截至8/2)玉米优良率61%为季内新低、48州表层墒情短缺48%(前周47%)。但市场已明确选择交易"未来两周修复"而非"过去一周损伤"——季内最低评级完全未获买盘接走。故本卡的观察重心为：第一段降水的实际落区与雨量，以及第二段热度是否兑现。',
    sources:[ { l:'DTN 7月降水12年最低', u:'https://www.dtnpf.com/agriculture/web/ag/blogs/ag-weather-forum/blog-post/2026/07/27/july-brought-12-year-low-us-corn' }, { l:'USDA Crop Progress 7/27', u:'https://esmis.nal.usda.gov/sites/default/release-files/795995/prog3026.pdf' }, { l:'NOAA CPC 8-14天', u:'https://www.cpc.ncep.noaa.gov/products/predictions/814day/' } ],
  },
  {
    icon:'🏜️', title:'春麦旱区面积仍高(42%)，但评级已现回升——两口径出现背离', severity:'旱区大但评级回升', cls:'mid', status:'旱区42% · 评级55%(+2)',
    region:'北部平原(春麦带) · 内布拉斯加/达科他 · 冬麦带',
    time:'旱区口径截至7/28 · 评级口径截至8/2',
    detail:'<b>USDA(截至7/28)：美国春小麦种植面积处于干旱的比例由前周25%升至42%，单周扩大17个百分点</b>，为罕见跳升幅度；冬小麦旱区同步增1个百分点至48%。此数据与本周两项证据相互印证：①USDA周度报告墒情项(截至7/26)48州表层土壤"短缺+严重短缺"合计47%(前周41%、去年26%)、深层45%；分州怀俄明86%、科罗拉多89%、南达科他75%、内布拉斯加72%、北达科他62%；②春麦优良率虽整体持平53%，但北达科他仅52%、南达科他27%，旱区高度集中于产量权重最大的两州。全美草场优良率29%(去年45%)。<b>8/4更新——出现口径背离，须谨慎解读</b>：干旱面积口径(截至7/28)仍显示春麦旱区42%，但作物评级口径(截至8/2)春麦优良率反而由53%回升至55%、且高于去年同期48%。两者并不矛盾：干旱面积衡量"有多少地在旱区"，评级衡量"作物长得怎样"，后者含品种耐旱性、生育阶段与近期降水。当前证据不支持"春麦已确定减产"的结论，建议以评级与后续收获进度(现为5%、慢于均值8%)为准，旱区面积仅作背景风险。玉米大豆与春麦仍应分开看待。',
    sources:[ { l:'USDA Crop Progress 7/27(墒情表)', u:'https://esmis.nal.usda.gov/sites/default/release-files/795995/prog3026.pdf' }, { l:'US Drought Monitor', u:'https://droughtmonitor.unl.edu/' } ],
  },
  {
    icon:'🔥', title:'欧洲高温致麦类减产', severity:'高温减产', cls:'high', status:'减产确认',
    region:'德国 · 法国',
    time:'2026收获季',
    detail:'德国合作社DRV：2026年小麦产量预估同比-12%至19.9MMT(高温致早熟、粒重与单产下降)。法国亦受热浪减产(单产估降约7%)，但因欧盟外销售强劲，FranceAgriMer 上调25/26出口至15.4MMT(同比约+48%)。',
    sources:[ { l:'Reuters/DRV', u:'https://www.reuters.com/markets/commodities/' }, { l:'FranceAgriMer', u:'https://www.franceagrimer.fr/' } ],
  },
  {
    icon:'❄️', title:'巴西南部霜冻窗口(当前风险低)', severity:'霜冻窗口·尾部风险', cls:'mid', status:'当前风险低',
    region:'南米纳斯 · 塞拉多 · 圣保罗 · 巴拉那',
    time:'7-8月霜冻窗口',
    detail:'7-8月南部霜冻窗口仍开，但近期预报主产区无霜冻、严重寒潮风险低。采收恢复(约52%完成、仍偏慢)压制价格，阿拉比卡7/16跌约4%至约$3.14/磅后维持弱势。中期支撑更多转向 El Niño 对9-10月开花期(下季作物)可能偏干的影响。',
    sources:[ { l:'INMET(巴西气象)', u:'https://portal.inmet.gov.br/' }, { l:'TradingEconomics 咖啡', u:'https://tradingeconomics.com/commodity/coffee' } ],
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

// ---------- 中国农业实况：土壤墒情 + 逐时气温【图像自动探测 · 近实时】 ----------
// 与降水/雷达同源(image.nmc.cn)，时间戳同一规律：{日期}{起报HHmm(UTC)}{时效FFF}00
//  · AMSM 土壤相对湿度(墒情)：每日 0000UTC(北京时08时)一张，分 10/20/30/40/50cm 五个层次
//    样本: .../2026/07/27/AMSM/medium/SEVP_NMC_AMSM_CAGMSS_ESRH_ACHN_L10CM_PS_20260727000000000.jpg
//  · STFC/ET0 全国逐时气温实况：每小时一张(UTC整点) → 多帧动画
//    样本: .../2026/05/16/STFC/medium/SEVP_NMC_STFC_SFER_ET0_ACHN_L88_PB_20260516030000000.jpg
// 图片URL仅前端引用官方公开地址，不本地缓存；官方源链接作兜底。
const CN_OBS_CONFIG = {
  soil: {
    title:'全国土壤相对湿度（墒情）实况',
    srcPage:'https://www.nmc.cn/publish/soil-moisture/10cm.html',
    depths:[
      { cm:'10', label:'10 厘米（表层墒情）', page:'https://www.nmc.cn/publish/soil-moisture/10cm.html' },
      { cm:'20', label:'20 厘米', page:'https://www.nmc.cn/publish/soil-moisture/20cm.html' },
      { cm:'30', label:'30 厘米（根层墒情）', page:'https://www.nmc.cn/publish/soil-moisture/30cm.html' },
      { cm:'40', label:'40 厘米', page:'https://www.nmc.cn/publish/soil-moisture/40cm.html' },
      { cm:'50', label:'50 厘米（深层墒情）', page:'https://www.nmc.cn/publish/soil-moisture/50cm.html' },
    ],
    lookbackDays:8,   // 逐日发布, 遇缺测向前回溯
    note:'土壤相对湿度＝实测土壤含水量占田间持水量的百分比。一般 <40% 为重旱、40–60% 偏旱、60–90% 适宜、>90% 偏涝(渍害风险)。表层(10cm)反映近期降水与蒸发,30–50cm 反映根层可用水,判断旱情持续性应以深层为准。',
  },
  // 气温预报(1-7天)：与降水预报图同构的7宫格。产品 RFFC/ETM(最高气温)，每日北京时08/20时起报。
  // 样本 24h : .../2026/07/28/RFFC/medium/SEVP_NMC_RFFC_SNWFD_ETM_ACHN_L88_P9_20260728080002412.jpg
  // 样本 168h: .../2026/07/28/RFFC/medium/SEVP_NMC_RFFC_SNWFD_ETM_ACHN_L88_P9_20260728080016812.jpg
  // 规律 {日期}{起报HHmm(北京时)}{时效FFF}12 —— 与降水图同长(17位)，仅末两位常量由 00 变 12。
  // ⚠️ 此产品起报时次写的是北京时(非UTC)，故日期须按北京时计算，勿套用降水/雷达的 UTC 逻辑。
  tempFc: {
    title:'全国最高气温预报',
    srcPage:'https://www.nmc.cn/publish/temperature/hight/24hour.html',
    inits:['2000','0800'],  // 北京时起报时次, 新→旧探测
    lookbackDays:1,
    hours:[
      { fff:'024', label:'24小时 (第1天)' },
      { fff:'048', label:'48小时 (第2天)' },
      { fff:'072', label:'72小时 (第3天)' },
      { fff:'096', label:'96小时 (第4天)' },
      { fff:'120', label:'120小时 (第5天)' },
      { fff:'144', label:'144小时 (第6天)' },
      { fff:'168', label:'168小时 (第7天)' },
    ],
    note:'中央气象台最高气温预报，逐日北京时08/20时起报，图片时次由前端自动探测。农业关注：黄淮/华北夏玉米授粉期连续 35°C 以上高温会显著影响结实率；新疆棉区花铃期高温与昼夜温差；长江流域伏旱高温叠加。',
  },
  temp: {
    title:'全国逐时气温实况',
    srcPage:'https://www.nmc.cn/publish/observations/hourly-temperature.html',
    stepMin:60, lookbackMin:900, maxFrames:12,
    links:[
      { t:'全国逐日气温', u:'https://www.nmc.cn/publish/observations/day-temperature/avg.html' },
      { t:'近30天最高气温', u:'https://www.nmc.cn/publish/observations/high-30days.html' },
      { t:'近30天最低气温', u:'https://www.nmc.cn/publish/observations/low-30days.html' },
      { t:'近30天平均气温距平', u:'https://www.nmc.cn/publish/observations/mta-30days.html' },
    ],
    note:'逐小时实况气温(非预报)。夏季关注黄淮/华北夏玉米授粉期 35°C 以上高温时段、以及新疆棉区昼夜温差;冬季关注冬麦区霜冻与越冬条件。距平类产品见下方链接。',
  },
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
    { key:'warn', label:'静态警报图', type:'image', title:'JTWC 西北太平洋 活动风暴警报图',
      src:'https://www.metoc.navy.mil/jtwc/products/wp0926.gif', srcName:'JTWC', srcUrl:'https://www.metoc.navy.mil/jtwc/jtwc.html',
      note:'联合台风警报中心警报图，随每报更新。当前西北太平洋无命名活动风暴(台风"巴威"已于7月中消散)，此图可能为空，请以"官方路径"图层及来源为准' },
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
