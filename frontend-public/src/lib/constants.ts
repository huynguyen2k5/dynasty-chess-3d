export type { General, ShopItem } from '@/types';
import { General, ShopItem } from '@/types';

export const GENERALS: General[] = [
  // =========================================================================
  // 4 ĐẠI DANH TƯỚNG KHAI CUỘC (LAUNCH LEGENDS - METICULOUSLY CRAFTED)
  // =========================================================================
  {
    id: 'zhuge_liang',
    name: 'Gia Cát Lượng',
    title: 'Ngọa Long Tiên Sinh',
    faction: 'shu',
    rarity: 'legendary',
    weapon: 'Bát Quái Vũ Phiến',
    avatarColor: '#059669',
    accentColor: '#10B981',
    portrait: '/assets/generals/zhuge_liang.jpg',
    specialTactic: 'Bát Quái Trận Đồ',
    tacticDesc: 'Khóa chặt long mạch, tăng 15% thời gian suy nghĩ và mở khóa gợi ý nước cờ bí hiểm khi rơi vào thế cờ khó.',
    stats: { tactics: 100, aggression: 55, command: 98, defense: 92 },
    voiceLines: {
      greeting: 'Mưu sự tại nhân, thành sự tại thiên. Kính cẩn thỉnh giáo!',
      check: 'Bát Quái Trận đã khóa chặt long mạch, tướng địch chạy đằng nào?!',
      capture: 'Cờ rơi một nước, vạn dặm tan tành!',
      victory: 'Thiên hạ ba phần, Thục Hán định cờ!',
      defeat: 'Trời không giúp Lượng... mệnh trời đã định.',
      taunt: 'Tâm không tĩnh, nước cờ ắt loạn!'
    },
    priceGold: 0,
    priceSilver: 0,
    unlockedByDefault: true,
    description: 'Thừa tướng Thục Hán, bậc kỳ tài mưu lược cổ kim, thông thiên tri địa, dụng cờ như điều động vạn mã thiên quân.'
  },
  {
    id: 'guan_yu',
    name: 'Quan Vũ',
    title: 'Võ Thánh • Mỹ Nhiệm Công',
    faction: 'shu',
    rarity: 'legendary',
    weapon: 'Thanh Long Yển Nguyệt Đao',
    avatarColor: '#15803d',
    accentColor: '#22c55e',
    portrait: '/assets/generals/guan_yu.jpg',
    specialTactic: 'Thanh Long Phá Trận',
    tacticDesc: 'Kích hoạt đao khí rực lửa, tăng 20% uy lực công phá của Xe và Pháo khi vượt qua sông Sở Hà.',
    stats: { tactics: 78, aggression: 99, command: 95, defense: 88 },
    voiceLines: {
      greeting: 'Quan mỗ tại đây! Kẻ nào dám đương đầu đao phong của ta?!',
      check: 'Chiếu tướng! Đầu tướng địch chỉ còn cách một nhát chém!',
      capture: 'Trảm tướng đoạt kỳ, uy chấn Hoa Hạ!',
      victory: 'Trảm tướng qua năm ải, ai dám cản Quan mỗ?!',
      defeat: 'Đại ý mất Kinh Châu... hổ thẹn cùng đại ca!',
      taunt: 'Trước mắt ta, tướng địch chỉ như lũ rơm rác!'
    },
    priceGold: 1200,
    priceSilver: 15000,
    unlockedByDefault: true,
    description: 'Chiến thần Thục Hán, nghĩa khí ngút trời, xuất đao sắc bén như sấm sét, công phá phòng tuyến đối phương trong chớp mắt.'
  },
  {
    id: 'cao_cao',
    name: 'Tào Tháo',
    title: 'Ngụy Vũ Đế',
    faction: 'wei',
    rarity: 'legendary',
    weapon: 'Ỷ Thiên Kiếm',
    avatarColor: '#4338ca',
    accentColor: '#6366f1',
    portrait: '/assets/generals/cao_cao.jpg',
    specialTactic: 'Thiết Kỵ Trung Nguyên',
    tacticDesc: 'Tăng cường khả năng kiểm soát trung lộ của Mã và Pháo, áp đặt thế trận gọng kìm bóp nghẹt đối thủ.',
    stats: { tactics: 96, aggression: 91, command: 99, defense: 85 },
    voiceLines: {
      greeting: 'Thà ta phụ thiên hạ, chứ quyết không để thiên hạ phụ ta!',
      check: 'Chiếu tướng! Dưới gầm trời này, đâu đâu chẳng là đất của Tào mỗ?!',
      capture: 'Kẻ thức thời mới là trang tuấn kiệt, nộp mạng đi!',
      victory: 'Đăng cao ngâm vịnh, thiên hạ quy tâm!',
      defeat: 'Trời sinh Tháo, sao còn sinh lũ nghịch tặc?!',
      taunt: 'Bàn cờ này, ta mới là kẻ nắm giữ vương quyền!'
    },
    priceGold: 1500,
    priceSilver: 18000,
    unlockedByDefault: false,
    description: 'Gian hùng thời loạn, anh hùng thời bình. Mưu lược thâm sâu, khí phách bá đạo ngút trời, bậc thầy điều binh khiển tướng.'
  },
  {
    id: 'lu_bu',
    name: 'Lữ Bố',
    title: 'Chiến Thần Vô Song',
    faction: 'neutral',
    rarity: 'mythic',
    weapon: 'Phương Thiên Họa Kích & Xích Thố Mã',
    avatarColor: '#be123c',
    accentColor: '#f43f5e',
    portrait: '/assets/generals/lu_bu.jpg',
    specialTactic: 'Vô Song Cuồng Nộ',
    tacticDesc: 'Kích hoạt hiệu ứng lôi điện cuồng nộ đỏ rực mỗi khi chiếu tướng, tạo áp lực tâm lý cực độ khiến đối phương dễ phạm sai lầm.',
    stats: { tactics: 65, aggression: 100, command: 85, defense: 80 },
    voiceLines: {
      greeting: 'Nhân trung Lữ Bố, mã trung Xích Thố! Kẻ nào dám cản ta?!',
      check: 'Kích xuất như sấm sét, đầu tướng rơi xuống!',
      capture: 'Chết dưới kích của Lữ Phụng Tiên là vinh hạnh của ngươi!',
      victory: 'Thiên hạ vô địch! Ai dám cùng ta đối chiến?!',
      defeat: 'Đồ tiện nhân phản bội ta... Bạch Môn Lâu hận thù!',
      taunt: 'Cả thiên hạ gom lại cũng không đỡ nổi một kích của ta!'
    },
    priceGold: 2500,
    priceSilver: 30000,
    unlockedByDefault: false,
    description: 'Vô song chiến thần Tam Quốc, sức mạnh cơ bắp tuyệt đỉnh vô địch thiên hạ, công kích bạt sơn cái thế phá tan mọi thế trận.'
  },

  // =========================================================================
  // CÁC DANH TƯỚNG SẮP CẬP NHẬT (UPCOMING IN SEASON 2)
  // =========================================================================
  {
    id: 'zhao_yun',
    name: 'Triệu Vân',
    title: 'Thường Thắng Tướng Quân',
    faction: 'shu',
    rarity: 'epic',
    weapon: 'Long Đảm Lượng Ngân Thương',
    avatarColor: '#0369a1',
    accentColor: '#0ea5e9',
    stats: { tactics: 82, aggression: 92, command: 89, defense: 94 },
    voiceLines: {
      greeting: 'Thường Sơn Triệu Tử Long sẵn sàng trợ chiến!',
      check: 'Long đảm thương xuất, phá tan phòng tuyến!',
      capture: 'Một thương đoạt mạng, không chút do dự!',
      victory: 'Bảy進bảy xuất Đương Dương, toàn thắng trở về!',
      defeat: 'Tử Long đã tận lực, xin Chúa công trách phạt.',
      taunt: 'Muốn qua ải này, trước hãy hỏi thương của ta!'
    },
    priceGold: 800,
    priceSilver: 9500,
    description: 'Dũng tướng áo trắng Thường Sơn, một đời chinh chiến chưa từng nếm mùi thất bại, công thủ toàn diện.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  },
  {
    id: 'zhang_fei',
    name: 'Trương Phi',
    title: 'Vạn Nhân Địch',
    faction: 'shu',
    rarity: 'epic',
    weapon: 'Bát Xà Mâu',
    avatarColor: '#b45309',
    accentColor: '#f59e0b',
    stats: { tactics: 70, aggression: 100, command: 92, defense: 85 },
    voiceLines: {
      greeting: 'Yên Nhân Trương Dực Đức ở đây! Kẻ nào dám cùng ta quyết chiến?!',
      check: 'Chiếu tướng! Tiếng thét cầu Trường Bản làm kinh hồn táng đởm!',
      capture: 'Một mâu xuyên tim, rớt đài đoạt mạng!',
      victory: 'Ha ha ha! Đại thắng! Uống cạn trăm vò rượu mừng!',
      defeat: 'Khốn kiếp! Ta sơ suất trúng kế kẻ tiểu nhân!',
      taunt: 'Lũ chuột nhắt, có gan thì xông lên một thể!'
    },
    priceGold: 900,
    priceSilver: 10500,
    description: 'Dũng tướng Thục Hán, tính tình cương trực, tiếng thét cầu Trường Bản làm vỡ mật tướng giặc.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  },
  {
    id: 'zhou_yu',
    name: 'Chu Du',
    title: 'Mỹ Chu Lang',
    faction: 'wu',
    rarity: 'legendary',
    weapon: 'Hỏa Diệm Bạch Ngọc Tiêu',
    avatarColor: '#d97706',
    accentColor: '#f59e0b',
    stats: { tactics: 95, aggression: 89, command: 97, defense: 82 },
    voiceLines: {
      greeting: 'Gió đông đã nổi, hỏa thiêu Xích Bích trận!',
      check: 'Chiếu! Một mồi lửa thiêu rụi chiến thuyền địch!',
      capture: 'Tro tàn bay tán loạn, không chừa mảnh giáp!',
      victory: 'Đông Ngô định quốc, ca khúc khải hoàn!',
      defeat: 'Trời đã sinh Du... sao còn sinh Lượng?!',
      taunt: 'Đối diện hỏa công, ngươi chỉ là tàn tro!'
    },
    priceGold: 1200,
    priceSilver: 14000,
    description: 'Đại đô đốc Đông Ngô, phong lưu tài tử, tinh thông âm luật và binh pháp thủy chiến tuyệt luân.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  },
  {
    id: 'sima_yi',
    name: 'Tư Mã Ý',
    title: 'Chủng Hổ',
    faction: 'wei',
    rarity: 'epic',
    weapon: 'Hắc Vũ Huyền Phiến',
    avatarColor: '#4338ca',
    accentColor: '#6366f1',
    stats: { tactics: 98, aggression: 70, command: 96, defense: 99 },
    voiceLines: {
      greeting: 'Nhẫn nhịn mười năm, chỉ đợi xuất một kiếm quyết định.',
      check: 'Độc kế đã thành, ngươi đã vào bẫy của ta!',
      capture: 'Cười người hôm trước, hôm sau mất cờ.',
      victory: 'Kẻ cười cuối cùng mới là kẻ chiến thắng!',
      defeat: 'Lùi một bước để chờ thời cơ lớn hơn...',
      taunt: 'Sự nóng vội chính là nấm mồ chôn ngươi!'
    },
    priceGold: 950,
    priceSilver: 11000,
    description: 'Bậc thầy nhẫn nại của Tào Ngụy, phòng ngự vững như bàn thạch, phản kích hiểm hóc đoạt mạng.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  },
  {
    id: 'lu_xun',
    name: 'Lục Tốn',
    title: 'Giang Đông Thư Sinh',
    faction: 'wu',
    rarity: 'epic',
    weapon: 'Thư Quyển & Thanh Phong Kiếm',
    avatarColor: '#c2410c',
    accentColor: '#ea580c',
    stats: { tactics: 97, aggression: 78, command: 96, defense: 94 },
    voiceLines: {
      greeting: 'Ẩn mình giấu tài, lúc cần xuất chiêu ắt định giang sơn.',
      check: 'Chiếu! Bảy trăm dặm liên doanh đã rơi vào biển lửa!',
      capture: 'Dụ địch vào sâu, nhất tiễn song điêu!',
      victory: 'Di Lăng toàn thắng, giữ vững bờ cõi Giang Đông!',
      defeat: 'Bát Trận Đồ của Gia Cát quả thực quỷ khốc thần sầu...',
      taunt: 'Nóng vội chính là ngòi nổ tự thiêu chính mình!'
    },
    priceGold: 1100,
    priceSilver: 13000,
    description: 'Đại đô đốc trẻ tuổi của Đông Ngô, mưu trí trác tuyệt, thiêu rụi 700 dặm liên doanh Thục quân tại Di Lăng.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  },
  {
    id: 'diao_chan',
    name: 'Điêu Thuyền',
    title: 'Bế Nguyệt Tuyệt Sắc',
    faction: 'neutral',
    rarity: 'epic',
    weapon: 'Song Nguyệt Nghê Thường Vũ',
    avatarColor: '#db2777',
    accentColor: '#ec4899',
    stats: { tactics: 90, aggression: 60, command: 75, defense: 88 },
    voiceLines: {
      greeting: 'Một điệu vũ khuynh thành, ngàn tướng sĩ ngả nghiêng.',
      check: 'Chiếu tướng... Người có nỡ ra tay với thiếp không?',
      capture: 'Mê hoặc tâm can, cờ tàn mạng dứt.',
      victory: 'Anh hùng khó qua ải mỹ nhân...',
      defeat: 'Hồng nhan bạc mệnh, phận liễu mong manh.',
      taunt: 'Tâm đã loạn theo điệu múa, cờ sao giữ được?'
    },
    priceGold: 850,
    priceSilver: 10000,
    description: 'Tứ đại mỹ nhân cổ đại, dùng liên hoàn kế khuynh đảo quần hùng, chiêu thức uyển chuyển biến ảo khôn lường.',
    isUpcoming: true,
    releaseSeason: 'Mùa 2: Xích Bích'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'gen_lu_bu',
    category: 'generals',
    name: 'Lữ Bố - Chiến Thần Vô Song',
    rarity: 'mythic',
    priceGold: 2500,
    priceSilver: 30000,
    description: 'Mở khóa Chiến Thần Lữ Bố với vũ khí Phương Thiên Họa Kích và câu thoại hào sảng độc quyền.',
    imageTheme: 'linear-gradient(135deg, #881337 0%, #E11D48 100%)',
    badge: 'HOT - VÔ SONG',
    relatedGeneralId: 'lu_bu'
  },
  {
    id: 'gen_cao_cao',
    category: 'generals',
    name: 'Tào Tháo - Ngụy Vũ Đế',
    rarity: 'legendary',
    priceGold: 1500,
    priceSilver: 18000,
    description: 'Mở khóa Tào Tháo với thanh bảo kiếm Ỷ Thiên và phong thái đế vương bá đạo.',
    imageTheme: 'linear-gradient(135deg, #1E1B4B 0%, #6366F1 100%)',
    badge: 'LEGENDARY',
    relatedGeneralId: 'cao_cao'
  },
  {
    id: 'board_xibi',
    category: 'boards',
    name: 'Bàn Cờ Hỏa Diệm Xích Bích',
    rarity: 'legendary',
    priceGold: 1000,
    priceSilver: 12000,
    description: 'Giao diện bàn cờ dung nham đỏ rực, sông bốc khói mờ ảo và hiệu ứng lửa cháy rực rỡ.',
    imageTheme: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)',
    badge: 'SKIN BÀN CỜ'
  },
  {
    id: 'board_mun_gold',
    category: 'boards',
    name: 'Bàn Cờ Gỗ Mun Hoàng Cung',
    rarity: 'epic',
    priceGold: 600,
    priceSilver: 8000,
    description: 'Gỗ mun cổ thụ đen tuyền điểm xuyết viền vàng hoàng tộc quý phái và uy nghiêm.',
    imageTheme: 'linear-gradient(135deg, #09090B 0%, #27272A 100%)',
    badge: 'HOÀNG GIA'
  },
  {
    id: 'pieces_jade',
    category: 'pieces',
    name: 'Quân Cờ Bạch Ngọc Thần Điêu',
    rarity: 'legendary',
    priceGold: 1200,
    priceSilver: 15000,
    description: 'Bộ quân cờ tạc từ ngọc bích nguyên khối phát sáng mờ ảo khi di chuyển.',
    imageTheme: 'linear-gradient(135deg, #064E3B 0%, #10B981 100%)',
    badge: 'QUÂN CỜ NGỌC'
  },
  {
    id: 'pieces_gold',
    category: 'pieces',
    name: 'Quân Cờ Hoàng Kim Giáp',
    rarity: 'epic',
    priceGold: 750,
    priceSilver: 9000,
    description: 'Bộ quân cờ đúc bằng vàng ròng chạm khắc chữ Hán cổ thư pháp tinh xảo.',
    imageTheme: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)',
    badge: 'HOÀNG KIM'
  }
];


export interface FactionLore {
  id: 'shu' | 'wei' | 'wu' | 'neutral';
  name: string;
  character: string;
  badge: string;
  bannerColor: string;
  accentColor: string;
  glowColor: string;
  motto: string;
  leader: string;
  capital: string;
  philosophy: string;
  chessStyle: string;
  signatureGenerals: string[];
  winRate: number;
  territoryShare: number;
  lore: string;
}

export const FACTIONS_LORE: FactionLore[] = [
  {
    id: 'shu',
    name: 'Thục Hán (蜀)',
    character: '蜀',
    badge: 'Nhân Nghĩa • Trí Lược',
    bannerColor: 'from-emerald-950/80 via-emerald-900/40 to-black',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    motto: 'Thuận thiên ưng nhân, phục hưng Hán thất!',
    leader: 'Hán Chiêu Liệt Đế Lưu Bị & Thừa Tướng Gia Cát Lượng',
    capital: 'Thành Đô (Ích Châu)',
    philosophy: 'Lấy nhân nghĩa cảm hóa lòng người, lấy mưu lược nghịch chuyển càn khôn. Bát Quái Trận biến hóa khôn lường, công thủ toàn diện.',
    chessStyle: 'Phong cách điềm tĩnh, công thủ nhịp nhàng, giăng bẫy sâu kín nhử địch vào bẫy rồi phản kích dứt điểm bằng đòn phối hợp Xe - Pháo - Mã.',
    signatureGenerals: ['Gia Cát Lượng', 'Quan Vũ', 'Triệu Vân', 'Trương Phi'],
    winRate: 53.4,
    territoryShare: 36,
    lore: 'Khởi đầu từ ba anh em Đào Viên kết nghĩa, hai bàn tay trắng dựng nên cơ nghiệp. Được Ngọa Long tiên sinh dốc lòng phò tá với Long Trung Đối Sách, lập nên nhà Thục Hán hiểm trở nơi đất Thục, khắc ghi tinh thần trung nghĩa muôn đời.'
  },
  {
    id: 'wei',
    name: 'Tào Ngụy (魏)',
    character: '魏',
    badge: 'Bá Quyền • Thiết Huyết',
    bannerColor: 'from-indigo-950/80 via-indigo-900/40 to-black',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    motto: 'Thà ta phụ người thiên hạ, quyết không để thiên hạ phụ ta!',
    leader: 'Ngụy Vũ Đế Tào Tháo & Thái Sư Tư Mã Ý',
    capital: 'Lạc Dương / Hứa Xương',
    philosophy: 'Thiết quân luật nghiêm minh, hiệu lệnh chư hầu. Tập trung ưu thế binh lực kỵ binh Trung Nguyên tạo nên sức mạnh xuyên phá vô tiền khoáng hậu.',
    chessStyle: 'Lối chơi vũ bão, Xe Pháo áp đảo trực diện, chủ động tấn công trung lộ, ép đối thủ vào thế bế tắc và sai lầm dưới áp lực thời gian.',
    signatureGenerals: ['Tào Tháo', 'Tư Mã Ý'],
    winRate: 51.8,
    territoryShare: 38,
    lore: 'Nắm giữ vùng đồng bằng Trung Nguyên trù phú, Tào Tháo diệt Viên Thiệu, bình định phương Bắc, xây dựng quốc lực hùng mạnh nhất Tam Quốc. Dưới trướng mưu sĩ như mây, mãnh tướng như mưa, kỷ luật sắt đá.'
  },
  {
    id: 'wu',
    name: 'Đông Ngô (吳)',
    character: '吳',
    badge: 'Thủy Chiến • Hỏa Công',
    bannerColor: 'from-amber-950/80 via-amber-900/40 to-black',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    motto: 'Giang Đông hiểm trở, vạn dặm sóng cồn!',
    leader: 'Ngô Đại Đế Tôn Quyền & Đô Đốc Chu Du',
    capital: 'Kiến Nghiệp (Giang Đông)',
    philosophy: 'Dựa vào thiên hiểm Trường Giang, phát huy tối đa sở trường thủy chiến, bậc thầy chiến thuật phục kích và liên hoàn hỏa công.',
    chessStyle: 'Lối chơi uyển chuyển, kiên nhẫn phòng thủ dẻo dai bên bờ sông Sở Hà, dụ đối phương qua sông rồi bẻ gãy cánh quân, dùng Pháo hỏa công dọn sạch bàn cờ.',
    signatureGenerals: ['Chu Du', 'Lục Tốn'],
    winRate: 49.6,
    territoryShare: 26,
    lore: 'Ba đời họ Tôn gây dựng giang sơn vùng Giang Đông màu mỡ. Trận Xích Bích nổi danh muôn thuở khi Chu Du dùng hỏa công thiêu rụi tám mươi vạn quân Tào, định hình thế chân vạc Tam Quốc vững như bàn thạch.'
  },
  {
    id: 'neutral',
    name: 'Quần Hùng (群)',
    character: '群',
    badge: 'Chiến Thần • Vô Song',
    bannerColor: 'from-rose-950/80 via-rose-900/40 to-black',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    motto: 'Chiến Thần xuất kích, quét sạch quần hào!',
    leader: 'Ôn Hầu Lữ Bố & Tuyệt Thế Mỹ Nhân Điêu Thuyền',
    capital: 'Lữ Dương / Trường An',
    philosophy: 'Sức mạnh cá nhân đạt cảnh giới cực hạn, dũng mãnh vô địch phá vỡ mọi khuôn phép chiến thuật truyền thống.',
    chessStyle: 'Tấn công cuồng bạo liều lĩnh, sẵn sàng phế quân tranh tiên, một đòn quyết định sinh tử khiến đối phương bất ngờ trở tay không kịp.',
    signatureGenerals: ['Lữ Bố', 'Điêu Thuyền'],
    winRate: 50.2,
    territoryShare: 10,
    lore: 'Thời loạn lạc xuất hiện những kiêu hùng cái thế. Lữ Bố với Phương Thiên Họa Kích và ngựa Xích Thố một mình tung hoành trước Hổ Lao Quan, Điêu Thuyền với liên hoàn mỹ nhân kế khuynh đảo cả vương triều Đổng Trác.'
  }
];

export interface GameMechanic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
  description: string;
  details: string[];
}

export const GAME_MECHANICS: GameMechanic[] = [
  {
    id: 'rules',
    title: 'Chuẩn Luật Cờ Tướng Quốc Tế',
    subtitle: '7 Binh Chủng • Cung Cấm • Sở Hà',
    icon: 'Scroll',
    tag: 'Cốt Lõi',
    description: 'Bộ quy tắc cờ tướng chuẩn 100% theo Liên đoàn Cờ tướng Quốc tế (WXF) và truyền thống Á Đông, kiểm soát nghiêm ngặt từng nước đi.',
    details: [
      '7 Binh chủng: Tướng (Soái), Sĩ, Tượng, Xe, Pháo, Mã, Tốt mang đậm tinh thần binh pháp',
      'Quy tắc Cung Cấm (Cửu Cung 3x3) hạn chế Tướng và Sĩ bảo vệ đầu não',
      'Sông Sở Hà Hán Giới ngăn Tượng vượt sông, Tốt qua sông được phép đi ngang',
      'Quy tắc Lộ Mặt Tướng: Hai Tướng tuyệt đối không được nhìn thấy nhau trên cùng một cột mà không có quân cản',
      'Quy tắc cản chân Mã và cản mắt Tượng tái hiện địa hình chiến trận hiểm trở'
    ]
  },
  {
    id: 'ai',
    title: 'Trí Tuệ Nhân Tạo MiniMax AI',
    subtitle: 'Alpha-Beta Pruning • 4 Cấp Độ',
    icon: 'Bot',
    tag: 'Thuật Toán',
    description: 'Hệ thống bot AI tính toán nước đi thông minh dựa trên thuật toán MiniMax tối ưu cắt tỉa Alpha-Beta cùng bảng lượng giá thế trận sâu.',
    details: [
      'Cấp 1 - Tân Thủ: Nước đi ngẫu nhiên có định hướng, phù hợp người mới làm quen',
      'Cấp 2 - Kỳ Thủ: Tính toán 2 nước tới, biết bảo vệ quân và ăn quân sơ hở',
      'Cấp 3 - Cao Thủ: Tìm kiếm 3-4 nước sâu, phối hợp Xe Pháo Mã bài bản',
      'Cấp 4 - Đại Sư: Định giá vị trí kiểm soát trung lộ, bẫy cờ tàn sắc bén'
    ]
  },
  {
    id: 'general_interaction',
    title: 'Danh Tướng 3D Tương Tác Sống Động',
    subtitle: 'Cảm Xúc • Vũ Khí • Voice Thoại',
    icon: 'Swords',
    tag: 'Độc Bản 3D',
    description: 'Lần đầu tiên trong cờ tướng trực tuyến, mỗi danh tướng Tam Quốc là một thực thể 3D đồng hành, có cảm xúc và tương tác theo diễn biến ván cờ.',
    details: [
      'Phản ứng vui mừng khi ăn quân lớn (Xe, Pháo, Mã) với hiệu ứng vung vũ khí hào nhoáng',
      'Hô vang khẩu hiệu xuất trận và thoại chiến trường đặc trưng bằng giọng lồng tiếng bi tráng',
      'Cảnh giác khi bị đối phương chiếu tướng, kích hoạt hào quang phòng thủ',
      'Tuyên bố chiến thắng oanh liệt khi chiếu bí hoặc tiếc nuối khi đầu hàng'
    ]
  },
  {
    id: 'realtime_pvp',
    title: 'Hạ Tầng WebSocket Siêu Tốc',
    subtitle: 'Độ Trễ < 20ms • Anti-Cheat Radar',
    icon: 'Zap',
    tag: 'Công Nghệ',
    description: 'Kiến trúc máy chủ FastAPI + Redis Pub/Sub đồng bộ tức thời, chống rớt gói tin và tích hợp radar chống gian lận kiểm duyệt nước đi.',
    details: [
      'Đồng bộ nước đi thời gian thực hai chiều độ trễ chỉ 0.02 giây',
      'Hệ thống ghép cặp thông minh theo chỉ số ELO Rank cân bằng trình độ',
      'Cơ chế kết nối lại tự động khi mất sóng mạng di động không bị xử thua oan',
      'Radar giám sát phân tích tần suất nước đi, ngăn chặn bot can thiệp'
    ]
  }
];
