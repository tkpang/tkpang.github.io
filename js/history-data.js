// 世界历史文明数据
// 时间单位：年份（负数表示公元前）

const historyData = {
    // 东亚文明
    eastAsia: [
        {
            name: "夏朝",
            region: "eastAsia",
            startYear: -2070,
            endYear: -1600,
            color: "#e74c3c",
            description: "中国第一个世袭制王朝，标志着中国进入阶级社会。",
            events: [
                "禹建立夏朝，开启世袭制度",
                "太康失国，后羿代夏",
                "少康中兴，夏朝复兴"
            ]
        },
        {
            name: "商朝",
            region: "eastAsia",
            startYear: -1600,
            endYear: -1046,
            color: "#c0392b",
            description: "中国历史上第一个有文字记载的王朝，甲骨文出现。",
            events: [
                "商汤灭夏建商",
                "盘庚迁都于殷",
                "甲骨文成熟应用",
                "青铜器铸造技术高度发达"
            ]
        },
        {
            name: "西周",
            region: "eastAsia",
            startYear: -1046,
            endYear: -771,
            color: "#e67e22",
            description: "周武王灭商建周，实行分封制和井田制。",
            events: [
                "武王伐纣，建立周朝",
                "周公制礼作乐",
                "分封诸侯，宗法制度",
                "犬戎攻破镐京"
            ]
        },
        {
            name: "春秋时期",
            region: "eastAsia",
            startYear: -770,
            endYear: -476,
            color: "#f39c12",
            description: "诸侯争霸，百家争鸣，中国思想文化的黄金时代。",
            events: [
                "齐桓公首霸",
                "孔子创立儒学",
                "老子著《道德经》",
                "吴越争霸"
            ]
        },
        {
            name: "战国时期",
            region: "eastAsia",
            startYear: -475,
            endYear: -221,
            color: "#d35400",
            description: "七国争雄，商鞅变法，百家争鸣达到高峰。",
            events: [
                "商鞅变法",
                "孟子、荀子发展儒学",
                "长平之战",
                "都江堰建成"
            ]
        },
        {
            name: "秦朝",
            region: "eastAsia",
            startYear: -221,
            endYear: -206,
            color: "#2c3e50",
            description: "中国第一个统一的中央集权封建王朝。",
            events: [
                "秦始皇统一六国",
                "统一文字、货币、度量衡",
                "修筑万里长城",
                "焚书坑儒"
            ]
        },
        {
            name: "西汉",
            region: "eastAsia",
            startYear: -206,
            endYear: 9,
            color: "#e74c3c",
            description: "刘邦建立的汉朝，开创丝绸之路，独尊儒术。",
            events: [
                "刘邦建立汉朝",
                "文景之治",
                "汉武帝独尊儒术",
                "张骞通西域，开辟丝绸之路"
            ]
        },
        {
            name: "新朝",
            region: "eastAsia",
            startYear: 9,
            endYear: 23,
            color: "#95a5a6",
            description: "王莽篡汉建立的短暂王朝。",
            events: [
                "王莽改制",
                "绿林赤眉起义"
            ]
        },
        {
            name: "东汉",
            region: "eastAsia",
            startYear: 25,
            endYear: 220,
            color: "#c0392b",
            description: "刘秀中兴汉室，佛教传入中国。",
            events: [
                "光武中兴",
                "佛教传入中国",
                "蔡伦改进造纸术",
                "黄巾起义"
            ]
        },
        {
            name: "三国时期",
            region: "eastAsia",
            startYear: 220,
            endYear: 280,
            color: "#34495e",
            description: "魏蜀吴三国鼎立，英雄辈出。",
            events: [
                "曹丕称帝建魏",
                "刘备建蜀汉",
                "孙权建东吴",
                "诸葛亮六出祁山"
            ]
        },
        {
            name: "西晋",
            region: "eastAsia",
            startYear: 265,
            endYear: 316,
            color: "#7f8c8d",
            description: "司马炎统一三国，短暂统一后陷入八王之乱。",
            events: [
                "司马炎统一三国",
                "八王之乱",
                "永嘉之乱"
            ]
        },
        {
            name: "东晋",
            region: "eastAsia",
            startYear: 317,
            endYear: 420,
            color: "#95a5a6",
            description: "司马睿南渡建立东晋，与北方十六国对峙。",
            events: [
                "司马睿建东晋",
                "淝水之战",
                "书圣王羲之《兰亭序》",
                "陶渊明隐居"
            ]
        },
        {
            name: "南北朝",
            region: "eastAsia",
            startYear: 420,
            endYear: 589,
            color: "#e67e22",
            description: "南朝四个朝代与北朝对峙，民族大融合。",
            events: [
                "南朝：宋齐梁陈",
                "北朝：北魏、东魏、西魏、北齐、北周",
                "北魏孝文帝改革",
                "佛教大兴"
            ]
        },
        {
            name: "隋朝",
            region: "eastAsia",
            startYear: 581,
            endYear: 618,
            color: "#d35400",
            description: "结束长期分裂，开创科举制度。",
            events: [
                "隋文帝统一南北",
                "开创科举制度",
                "修建大运河",
                "三征高句丽失败"
            ]
        },
        {
            name: "唐朝",
            region: "eastAsia",
            startYear: 618,
            endYear: 907,
            color: "#e74c3c",
            description: "中国历史上最强盛的朝代之一，万国来朝。",
            events: [
                "贞观之治",
                "武则天称帝",
                "开元盛世",
                "安史之乱",
                "唐诗繁荣"
            ]
        },
        {
            name: "五代十国",
            region: "eastAsia",
            startYear: 907,
            endYear: 960,
            color: "#7f8c8d",
            description: "唐末至宋初的分裂时期。",
            events: [
                "后梁、后唐、后晋、后汉、后周",
                "南方十国割据",
                "赵匡胤黄袍加身"
            ]
        },
        {
            name: "北宋",
            region: "eastAsia",
            startYear: 960,
            endYear: 1127,
            color: "#3498db",
            description: "赵匡胤建立，经济文化高度发达。",
            events: [
                "杯酒释兵权",
                "王安石变法",
                "活字印刷术发明",
                "靖康之变"
            ]
        },
        {
            name: "南宋",
            region: "eastAsia",
            startYear: 1127,
            endYear: 1279,
            color: "#2980b9",
            description: "偏安江南，经济文化继续发展。",
            events: [
                "岳飞抗金",
                "理学兴盛",
                "火药武器应用",
                "蒙古灭宋"
            ]
        },
        {
            name: "元朝",
            region: "eastAsia",
            startYear: 1271,
            endYear: 1368,
            color: "#16a085",
            description: "蒙古帝国在中国建立的王朝，疆域空前辽阔。",
            events: [
                "忽必烈定国号元",
                "马可波罗游记",
                "行省制度",
                "红巾军起义"
            ]
        },
        {
            name: "明朝",
            region: "eastAsia",
            startYear: 1368,
            endYear: 1644,
            color: "#e74c3c",
            description: "朱元璋建立，最后一个汉族王朝。",
            events: [
                "朱元璋建明",
                "郑和下西洋",
                "永乐盛世",
                "戚继光抗倭",
                "李自成攻破北京"
            ]
        },
        {
            name: "清朝",
            region: "eastAsia",
            startYear: 1644,
            endYear: 1912,
            color: "#f39c12",
            description: "中国最后一个封建王朝，由满族建立。",
            events: [
                "康乾盛世",
                "闭关锁国",
                "鸦片战争",
                "洋务运动",
                "戊戌变法",
                "辛亥革命"
            ]
        },
        {
            name: "中华民国",
            region: "eastAsia",
            startYear: 1912,
            endYear: 1949,
            color: "#3498db",
            description: "孙中山领导辛亥革命建立的共和国。",
            events: [
                "辛亥革命成功",
                "五四运动",
                "北伐战争",
                "抗日战争",
                "国共内战"
            ]
        },
        {
            name: "中华人民共和国",
            region: "eastAsia",
            startYear: 1949,
            endYear: 2024,
            color: "#e74c3c",
            description: "中国共产党领导建立的社会主义国家。",
            events: [
                "新中国成立",
                "改革开放",
                "加入WTO",
                "港澳回归",
                "一带一路"
            ]
        }
    ],

    // 南亚文明
    southAsia: [
        {
            name: "印度河流域文明",
            region: "southAsia",
            startYear: -2600,
            endYear: -1900,
            color: "#3498db",
            description: "世界四大古文明之一，以哈拉帕和摩亨佐达罗为代表。",
            events: [
                "城市规划发达",
                "文字尚未破译",
                "青铜器使用"
            ]
        },
        {
            name: "吠陀时期",
            region: "southAsia",
            startYear: -1500,
            endYear: -500,
            color: "#2980b9",
            description: "雅利安人入侵印度，创作《吠陀经》，种姓制度形成。",
            events: [
                "雅利安人入侵",
                "《吠陀经》形成",
                "种姓制度建立",
                "婆罗门教兴起"
            ]
        },
        {
            name: "列国时代",
            region: "southAsia",
            startYear: -600,
            endYear: -321,
            color: "#3498db",
            description: "十六大国并立，佛教和耆那教诞生。",
            events: [
                "释迦牟尼创立佛教",
                "大雄创立耆那教",
                "摩揭陀国崛起"
            ]
        },
        {
            name: "孔雀王朝",
            region: "southAsia",
            startYear: -321,
            endYear: -185,
            color: "#2980b9",
            description: "印度历史上第一个统一的大帝国。",
            events: [
                "旃陀罗笈多统一北印度",
                "阿育王推广佛教",
                "佛教传播至东南亚"
            ]
        },
        {
            name: "贵霜帝国",
            region: "southAsia",
            startYear: 30,
            endYear: 375,
            color: "#3498db",
            description: "丝绸之路上的重要帝国，佛教艺术繁荣。",
            events: [
                "迦腻色迦一世在位",
                "犍陀罗艺术繁荣",
                "佛教大乘派兴起"
            ]
        },
        {
            name: "笈多王朝",
            region: "southAsia",
            startYear: 320,
            endYear: 550,
            color: "#2980b9",
            description: "印度古典文化的黄金时代。",
            events: [
                "印度教复兴",
                "梵语文学繁荣",
                "数学和天文学发达",
                "阿拉伯数字起源"
            ]
        },
        {
            name: "戒日王朝",
            region: "southAsia",
            startYear: 606,
            endYear: 647,
            color: "#3498db",
            description: "北印度短暂统一，玄奘西游取经。",
            events: [
                "戒日王统一北印度",
                "玄奘访印",
                "那烂陀寺鼎盛"
            ]
        },
        {
            name: "德里苏丹国",
            region: "southAsia",
            startYear: 1206,
            endYear: 1526,
            color: "#2ecc71",
            description: "穆斯林在印度建立的政权。",
            events: [
                "伊斯兰教传入印度",
                "印度-伊斯兰文化融合",
                "德里成为政治中心"
            ]
        },
        {
            name: "莫卧儿帝国",
            region: "southAsia",
            startYear: 1526,
            endYear: 1857,
            color: "#27ae60",
            description: "印度历史上最强盛的伊斯兰王朝。",
            events: [
                "巴布尔建立帝国",
                "阿克巴大帝宗教宽容",
                "泰姬陵建成",
                "英国东印度公司侵入"
            ]
        },
        {
            name: "英属印度",
            region: "southAsia",
            startYear: 1858,
            endYear: 1947,
            color: "#16a085",
            description: "英国殖民统治时期。",
            events: [
                "印度民族大起义",
                "甘地非暴力不合作运动",
                "印度国大党成立"
            ]
        },
        {
            name: "印度共和国",
            region: "southAsia",
            startYear: 1947,
            endYear: 2024,
            color: "#f39c12",
            description: "独立后的印度民主共和国。",
            events: [
                "印巴分治",
                "尼赫鲁任总理",
                "经济改革开放",
                "成为IT大国"
            ]
        }
    ],

    // 西亚文明
    westAsia: [
        {
            name: "苏美尔文明",
            region: "westAsia",
            startYear: -3500,
            endYear: -2000,
            color: "#2ecc71",
            description: "人类最早的文明之一，楔形文字的发明者。",
            events: [
                "楔形文字发明",
                "城邦国家出现",
                "《吉尔伽美什史诗》",
                "六十进制计数法"
            ]
        },
        {
            name: "古巴比伦王国",
            region: "westAsia",
            startYear: -1894,
            endYear: -1595,
            color: "#27ae60",
            description: "汉谟拉比统治时期达到鼎盛，《汉谟拉比法典》诞生。",
            events: [
                "汉谟拉比统一两河流域",
                "《汉谟拉比法典》颁布",
                "巴比伦城繁荣"
            ]
        },
        {
            name: "亚述帝国",
            region: "westAsia",
            startYear: -911,
            endYear: -609,
            color: "#16a085",
            description: "古代西亚军事强国。",
            events: [
                "铁器时代来临",
                "征服两河流域",
                "尼尼微图书馆建立"
            ]
        },
        {
            name: "新巴比伦王国",
            region: "westAsia",
            startYear: -626,
            endYear: -539,
            color: "#2ecc71",
            description: "尼布甲尼撒二世时期最强盛，建造空中花园。",
            events: [
                "摧毁犹太王国",
                "巴比伦空中花园",
                "天文学发达"
            ]
        },
        {
            name: "波斯帝国（阿契美尼德）",
            region: "westAsia",
            startYear: -550,
            endYear: -330,
            color: "#27ae60",
            description: "古代最大的帝国之一，横跨亚欧非三洲。",
            events: [
                "居鲁士大帝建国",
                "大流士一世改革",
                "波斯战争",
                "亚历山大征服波斯"
            ]
        },
        {
            name: "塞琉古帝国",
            region: "westAsia",
            startYear: -312,
            endYear: -63,
            color: "#1abc9c",
            description: "亚历山大帝国分裂后的希腊化王国。",
            events: [
                "希腊文化传播",
                "与印度贵霜帝国交流"
            ]
        },
        {
            name: "帕提亚帝国",
            region: "westAsia",
            startYear: -247,
            endYear: 224,
            color: "#16a085",
            description: "与罗马帝国对峙的东方强国。",
            events: [
                "丝绸之路中转站",
                "与罗马长期战争"
            ]
        },
        {
            name: "萨珊波斯",
            region: "westAsia",
            startYear: 224,
            endYear: 651,
            color: "#27ae60",
            description: "波斯帝国的最后辉煌，琐罗亚斯德教国教化。",
            events: [
                "与罗马/拜占庭对峙",
                "琐罗亚斯德教繁荣",
                "阿拉伯征服波斯"
            ]
        },
        {
            name: "阿拉伯帝国（倭马亚）",
            region: "westAsia",
            startYear: 661,
            endYear: 750,
            color: "#2ecc71",
            description: "伊斯兰教迅速扩张时期。",
            events: [
                "穆阿维叶建立倭马亚王朝",
                "征服北非和伊比利亚",
                "大马士革为首都"
            ]
        },
        {
            name: "阿拉伯帝国（阿拔斯）",
            region: "westAsia",
            startYear: 750,
            endYear: 1258,
            color: "#27ae60",
            description: "伊斯兰黄金时代，科学文化高度发达。",
            events: [
                "巴格达建都",
                "阿拉伯数字传播",
                "《一千零一夜》",
                "蒙古西征灭阿拔斯"
            ]
        },
        {
            name: "奥斯曼帝国",
            region: "westAsia",
            startYear: 1299,
            endYear: 1922,
            color: "#e74c3c",
            description: "横跨欧亚非的伊斯兰帝国。",
            events: [
                "攻陷君士坦丁堡",
                "苏莱曼大帝时期",
                "维也纳之战",
                "一战后解体"
            ]
        }
    ],

    // 欧洲文明
    europe: [
        {
            name: "古希腊文明",
            region: "europe",
            startYear: -800,
            endYear: -146,
            color: "#f39c12",
            description: "西方文明的摇篮，民主制度和哲学的诞生地。",
            events: [
                "雅典民主制",
                "苏格拉底、柏拉图、亚里士多德",
                "希波战争",
                "伯罗奔尼撒战争",
                "亚历山大东征"
            ]
        },
        {
            name: "罗马共和国",
            region: "europe",
            startYear: -509,
            endYear: -27,
            color: "#e67e22",
            description: "从城邦到统一地中海的共和国。",
            events: [
                "十二铜表法",
                "布匿战争",
                "恺撒崛起",
                "屋大维建立元首制"
            ]
        },
        {
            name: "罗马帝国",
            region: "europe",
            startYear: -27,
            endYear: 476,
            color: "#d35400",
            description: "地中海霸主，西方古典文明的巅峰。",
            events: [
                "奥古斯都和平时期",
                "基督教诞生并传播",
                "戴克里先改革",
                "帝国东西分裂",
                "西罗马帝国灭亡"
            ]
        },
        {
            name: "拜占庭帝国",
            region: "europe",
            startYear: 395,
            endYear: 1453,
            color: "#9b59b6",
            description: "东罗马帝国，保存了古典文明。",
            events: [
                "查士丁尼大帝",
                "《查士丁尼法典》",
                "希腊火发明",
                "圣像破坏运动",
                "奥斯曼攻陷君士坦丁堡"
            ]
        },
        {
            name: "法兰克王国",
            region: "europe",
            startYear: 481,
            endYear: 843,
            color: "#3498db",
            description: "西欧封建制度的起源。",
            events: [
                "克洛维皈依基督教",
                "查理曼加冕",
                "《凡尔登条约》三分王国"
            ]
        },
        {
            name: "神圣罗马帝国",
            region: "europe",
            startYear: 962,
            endYear: 1806,
            color: "#2980b9",
            description: "德意志民族的神圣罗马帝国。",
            events: [
                "奥托一世加冕",
                "教权与皇权之争",
                "三十年战争",
                "拿破仑解散帝国"
            ]
        },
        {
            name: "中世纪欧洲",
            region: "europe",
            startYear: 500,
            endYear: 1500,
            color: "#7f8c8d",
            description: "封建制度主导的时期。",
            events: [
                "封建庄园制度",
                "十字军东征",
                "黑死病",
                "百年战争",
                "文艺复兴开始"
            ]
        },
        {
            name: "文艺复兴",
            region: "europe",
            startYear: 1400,
            endYear: 1600,
            color: "#e67e22",
            description: "欧洲文化艺术的复兴运动。",
            events: [
                "但丁、达芬奇、米开朗基罗",
                "人文主义兴起",
                "古腾堡印刷术",
                "哥伦布发现新大陆"
            ]
        },
        {
            name: "宗教改革",
            region: "europe",
            startYear: 1517,
            endYear: 1648,
            color: "#34495e",
            description: "马丁路德发起的宗教改革运动。",
            events: [
                "路德发表《九十五条论纲》",
                "新教诞生",
                "三十年战争",
                "《威斯特伐利亚和约》"
            ]
        },
        {
            name: "启蒙时代",
            region: "europe",
            startYear: 1650,
            endYear: 1800,
            color: "#f39c12",
            description: "理性主义和科学革命时期。",
            events: [
                "牛顿力学",
                "伏尔泰、卢梭、孟德斯鸠",
                "百科全书派",
                "科学革命"
            ]
        },
        {
            name: "法国大革命",
            region: "europe",
            startYear: 1789,
            endYear: 1799,
            color: "#3498db",
            description: "推翻封建君主制的资产阶级革命。",
            events: [
                "攻占巴士底狱",
                "《人权宣言》",
                "雅各宾派专政",
                "拿破仑上台"
            ]
        },
        {
            name: "工业革命",
            region: "europe",
            startYear: 1760,
            endYear: 1840,
            color: "#95a5a6",
            description: "从农业社会到工业社会的转变。",
            events: [
                "蒸汽机发明",
                "纺织业革新",
                "铁路兴建",
                "工业资本主义兴起"
            ]
        },
        {
            name: "维也纳体系",
            region: "europe",
            startYear: 1815,
            endYear: 1914,
            color: "#7f8c8d",
            description: "拿破仑战争后的欧洲秩序。",
            events: [
                "维也纳会议",
                "民族主义兴起",
                "德意志统一",
                "意大利统一"
            ]
        },
        {
            name: "第一次世界大战",
            region: "europe",
            startYear: 1914,
            endYear: 1918,
            color: "#e74c3c",
            description: "人类历史上第一次世界大战。",
            events: [
                "萨拉热窝事件",
                "堑壕战",
                "俄国十月革命",
                "《凡尔赛条约》"
            ]
        },
        {
            name: "两战之间",
            region: "europe",
            startYear: 1918,
            endYear: 1939,
            color: "#95a5a6",
            description: "一战和二战之间的动荡时期。",
            events: [
                "国际联盟成立",
                "经济大萧条",
                "法西斯主义兴起",
                "西班牙内战"
            ]
        },
        {
            name: "第二次世界大战",
            region: "europe",
            startYear: 1939,
            endYear: 1945,
            color: "#c0392b",
            description: "人类历史上最惨烈的战争。",
            events: [
                "德国闪击波兰",
                "法国沦陷",
                "不列颠空战",
                "斯大林格勒战役",
                "诺曼底登陆",
                "德国投降"
            ]
        },
        {
            name: "冷战时期",
            region: "europe",
            startYear: 1947,
            endYear: 1991,
            color: "#34495e",
            description: "美苏两极对峙时期。",
            events: [
                "铁幕演说",
                "北约与华约",
                "柏林墙",
                "欧洲一体化",
                "苏联解体"
            ]
        },
        {
            name: "现代欧洲",
            region: "europe",
            startYear: 1991,
            endYear: 2024,
            color: "#3498db",
            description: "欧盟成立后的欧洲。",
            events: [
                "欧盟成立",
                "欧元诞生",
                "东欧国家加入欧盟",
                "英国脱欧"
            ]
        }
    ],

    // 非洲文明
    africa: [
        {
            name: "古埃及文明",
            region: "africa",
            startYear: -3100,
            endYear: -30,
            color: "#9b59b6",
            description: "世界最古老文明之一，金字塔和法老统治。",
            events: [
                "上下埃及统一",
                "金字塔建造",
                "象形文字",
                "图坦卡蒙",
                "克利奥帕特拉七世",
                "罗马吞并埃及"
            ]
        },
        {
            name: "库什王国",
            region: "africa",
            startYear: -1070,
            endYear: 350,
            color: "#8e44ad",
            description: "努比亚地区的强大王国。",
            events: [
                "征服埃及建立第25王朝",
                "麦罗埃文化繁荣"
            ]
        },
        {
            name: "迦太基",
            region: "africa",
            startYear: -814,
            endYear: -146,
            color: "#9b59b6",
            description: "北非腓尼基人建立的海洋强国。",
            events: [
                "汉尼拔远征罗马",
                "布匿战争",
                "罗马摧毁迦太基"
            ]
        },
        {
            name: "阿克苏姆王国",
            region: "africa",
            startYear: 100,
            endYear: 940,
            color: "#8e44ad",
            description: "东非埃塞俄比亚地区的古国。",
            events: [
                "皈依基督教",
                "与罗马、波斯贸易",
                "方尖碑文化"
            ]
        },
        {
            name: "加纳帝国",
            region: "africa",
            startYear: 700,
            endYear: 1240,
            color: "#9b59b6",
            description: "西非第一个黑人帝国。",
            events: [
                "黄金贸易繁荣",
                "伊斯兰教传入",
                "跨撒哈拉贸易"
            ]
        },
        {
            name: "马里帝国",
            region: "africa",
            startYear: 1235,
            endYear: 1600,
            color: "#8e44ad",
            description: "西非最富有的帝国。",
            events: [
                "曼萨穆萨朝圣",
                "廷巴克图文化中心",
                "黄金和盐贸易"
            ]
        },
        {
            name: "桑海帝国",
            region: "africa",
            startYear: 1464,
            endYear: 1591,
            color: "#9b59b6",
            description: "西非最后的大帝国。",
            events: [
                "索尼阿里扩张",
                "廷巴克图鼎盛",
                "摩洛哥入侵"
            ]
        },
        {
            name: "殖民时期",
            region: "africa",
            startYear: 1880,
            endYear: 1960,
            color: "#7f8c8d",
            description: "欧洲列强瓜分非洲。",
            events: [
                "柏林会议瓜分非洲",
                "殖民地经济掠夺",
                "反殖民斗争"
            ]
        },
        {
            name: "独立浪潮",
            region: "africa",
            startYear: 1960,
            endYear: 2024,
            color: "#2ecc71",
            description: "非洲国家纷纷独立。",
            events: [
                "非洲独立年（1960）",
                "曼德拉与种族隔离斗争",
                "非洲联盟成立",
                "经济发展挑战"
            ]
        }
    ],

    // 美洲文明
    americas: [
        {
            name: "奥尔梅克文明",
            region: "americas",
            startYear: -1200,
            endYear: -400,
            color: "#1abc9c",
            description: "中美洲最早的文明，玛雅文明的前身。",
            events: [
                "巨石头像雕刻",
                "历法和文字起源",
                "橡胶球游戏"
            ]
        },
        {
            name: "玛雅文明",
            region: "americas",
            startYear: -2000,
            endYear: 1500,
            color: "#16a085",
            description: "中美洲高度发达的文明，天文历法精确。",
            events: [
                "象形文字系统",
                "玛雅历法",
                "金字塔建筑",
                "城邦制度",
                "神秘消失"
            ]
        },
        {
            name: "特奥蒂瓦坎",
            region: "americas",
            startYear: 100,
            endYear: 750,
            color: "#1abc9c",
            description: "墨西哥古城，太阳金字塔所在地。",
            events: [
                "太阳金字塔",
                "月亮金字塔",
                "羽蛇神崇拜"
            ]
        },
        {
            name: "托尔特克文明",
            region: "americas",
            startYear: 900,
            endYear: 1168,
            color: "#16a085",
            description: "墨西哥中部的军事文明。",
            events: [
                "图拉城繁荣",
                "武士文化",
                "影响阿兹特克"
            ]
        },
        {
            name: "阿兹特克帝国",
            region: "americas",
            startYear: 1345,
            endYear: 1521,
            color: "#1abc9c",
            description: "墨西哥最强大的帝国，以活人祭祀闻名。",
            events: [
                "特诺奇蒂特兰建城",
                "三国同盟",
                "活人祭祀仪式",
                "科尔特斯征服"
            ]
        },
        {
            name: "印加帝国",
            region: "americas",
            startYear: 1438,
            endYear: 1533,
            color: "#16a085",
            description: "南美洲最大的帝国，以精湛石工技艺闻名。",
            events: [
                "库斯科为首都",
                "马丘比丘建造",
                "结绳记事",
                "精密石工",
                "皮萨罗征服"
            ]
        },
        {
            name: "殖民时期",
            region: "americas",
            startYear: 1492,
            endYear: 1810,
            color: "#95a5a6",
            description: "欧洲殖民者统治美洲。",
            events: [
                "哥伦布发现新大陆",
                "西班牙征服者",
                "黑奴贸易",
                "殖民地经济"
            ]
        },
        {
            name: "拉美独立运动",
            region: "americas",
            startYear: 1810,
            endYear: 1830,
            color: "#3498db",
            description: "拉丁美洲国家独立运动。",
            events: [
                "玻利瓦尔解放运动",
                "圣马丁远征",
                "墨西哥独立",
                "巴西独立"
            ]
        },
        {
            name: "美国独立与发展",
            region: "americas",
            startYear: 1776,
            endYear: 2024,
            color: "#3498db",
            description: "美利坚合众国的诞生与崛起。",
            events: [
                "美国独立战争",
                "《独立宣言》",
                "南北战争",
                "西进运动",
                "两次世界大战",
                "冷战",
                "超级大国"
            ]
        },
        {
            name: "现代拉丁美洲",
            region: "americas",
            startYear: 1900,
            endYear: 2024,
            color: "#2ecc71",
            description: "独立后的拉美国家发展。",
            events: [
                "墨西哥革命",
                "古巴革命",
                "军政府时期",
                "民主化进程",
                "经济一体化"
            ]
        }
    ]
};

// 地区颜色映射
const regionColors = {
    eastAsia: "#e74c3c",
    southAsia: "#3498db",
    westAsia: "#2ecc71",
    europe: "#f39c12",
    africa: "#9b59b6",
    americas: "#1abc9c"
};

// 地区中文名称
const regionNames = {
    eastAsia: "东亚",
    southAsia: "南亚",
    westAsia: "西亚",
    europe: "欧洲",
    africa: "非洲",
    americas: "美洲"
};
