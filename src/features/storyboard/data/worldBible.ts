/**
 * AI Magic Story — World Bible & Blueprint Library
 * =================================================
 * SINGLE SOURCE OF TRUTH — imported by both frontend AND backend.
 * 
 * To add a new template: push a new StoryBlueprint to BLUEPRINTS.
 * To add a new biome/NPC: add to BIOMES/GUARDIANS arrays.
 */

import type { Biome, Guardian, StoryBlueprint, EducationPillar } from '../types';

// ─── VISUAL STYLE (from visual.md) ───────────────────────────────────────────
// "Deconstructed Ghibli" — lush watercolor storybook, legally safe
export const VISUAL_STYLE_SHELL = 'whimsical 2D anime background art, lush vibrant watercolor painting, cel-shaded smooth characters, magical realism, highly detailed foliage, soft warm glowing light, fluffy clouds, storybook illustration, breathtaking and cute';

export const VISUAL_NEGATIVE = 'photorealistic, hyper-realistic, 8k resolution, cinematic lighting, dramatic shadows, 3D render, octane render, plastic, text, watermarks, fonts, signatures, creepy, deformed, scary, dark, muted colors, weapons, blood';

// ─── THE 5 BIOMES ─────────────────────────────────────────────────────────────

export const BIOMES: Biome[] = [
    {
        id: 'whispering_forest',
        name: 'Khu Rừng Thì Thầm',
        name_en: 'The Whispering Forest',
        icon: '🌳',
        landmarks: ['Cây Tri Thức', 'Suối Gợi Ý'],
        visualPrompt: 'lush magical forest, giant glowing mushrooms, volumetric sunlight rays filtering through enormous trees, safe and friendly atmosphere, fireflies, moss-covered stones',
    },
    {
        id: 'candy_valley',
        name: 'Thung Lũng Kẹo Ngọt',
        name_en: 'Sweet Candy Valley',
        icon: '🍬',
        landmarks: ['Dòng Sông Sữa', 'Núi Bánh Quy'],
        visualPrompt: 'surreal landscape made of sweets, cotton candy clouds, chocolate rivers, candy cane trees, bright pastel lighting, very cute and soft, gummy bear rocks',
    },
    {
        id: 'cloud_city',
        name: 'Thành Phố Mây Khổng Lồ',
        name_en: 'Giant Cloud City',
        icon: '☁️',
        landmarks: ['Cầu Vồng Dệt', 'Đài Quan Sát Gió'],
        visualPrompt: 'soft fluffy cloud architecture, rainbow bridges, clear blue sky, floating islands made of clouds, gentle breeze, birds flying around',
    },
    {
        id: 'space_station',
        name: 'Trạm Vũ Trụ Ánh Sao',
        name_en: 'Starlight Space Station',
        icon: '🚀',
        landmarks: ['Phòng Thí Nghiệm Vui Sự', 'Vườn Sao'],
        visualPrompt: 'friendly colorful space station interior, glowing buttons and screens, big windows showing starry outer space, toy-like cute machinery, planets visible outside',
    },
    {
        id: 'crystal_ocean',
        name: 'Đại Dương Pha Lê',
        name_en: 'Crystal Ocean',
        icon: '🐚',
        landmarks: ['Rạn San Hô Phát Sáng', 'Nhạc Hội Dưới Đáy Biển'],
        visualPrompt: 'colorful underwater world, glowing crystal coral reefs, clear turquoise water, shafts of light from above, friendly sea life, bubbles, seashells',
    },
];

// ─── THE 5 GUARDIANS (NPCs) ──────────────────────────────────────────────────

export const GUARDIANS: Guardian[] = [
    {
        id: 'professor_owl',
        name: 'Bác Cú Thông Thái',
        name_en: 'Professor Owl',
        icon: '🦉',
        home: 'whispering_forest',
        personality: 'Wise, asks lots of questions, sometimes loses his glasses. Speaks gently.',
        visualPrompt: 'cute cartoon owl wearing oversized round glasses, holding a glowing green book, fluffy brown feathers, kind wise eyes',
    },
    {
        id: 'tiny_rabbit',
        name: 'Thỏ Út Ít',
        name_en: 'Tiny Rabbit',
        icon: '🐰',
        home: 'candy_valley',
        personality: 'Sweet, clumsy, easily scared but very thankful. Always carries a magical oversized carrot.',
        visualPrompt: 'tiny fluffy white rabbit, incredibly expressive cute eyes, holding a comically large orange carrot, pink inner ears',
    },
    {
        id: 'clanky_robot',
        name: 'Rô-bốt Lạch Cạch',
        name_en: 'Clanky the Robot',
        icon: '🤖',
        home: 'space_station',
        personality: 'Enthusiastic but his inventions always break down. Speaks in funny beeps.',
        visualPrompt: 'friendly square-shaped robot made of colorful plastic toy blocks, glowing blue face screen showing a smiley face, small antenna on top',
    },
    {
        id: 'fanny_fox',
        name: 'Cáo Nghệ Sĩ',
        name_en: 'Fanny the Fox',
        icon: '🦊',
        home: 'cloud_city',
        personality: 'Dramatic, highly emotional, loves painting and singing. Very expressive.',
        visualPrompt: 'adorable orange fox wearing a small beret, paint smudges on cheeks, holding a magical glowing paintbrush, fluffy tail',
    },
    {
        id: 'happy_turtle',
        name: 'Rùa Lạc Quan',
        name_en: 'Happy Turtle',
        icon: '🐢',
        home: 'crystal_ocean',
        personality: 'Very slow, extremely chill, always has the answer if you wait long enough.',
        visualPrompt: 'round cute sea turtle, wearing a tiny red neckerchief, shell shines like polished opal, gentle kind smile',
    },
];

// ─── HELPER: Find biome/guardian by ID ─────────────────────────────────────────

export const getBiome = (id: string): Biome => BIOMES.find(b => b.id === id) || BIOMES[0];
export const getGuardian = (id: string): Guardian => GUARDIANS.find(g => g.id === id) || GUARDIANS[0];

// ─── THE 12 STORY BLUEPRINTS ──────────────────────────────────────────────────
// Each blueprint has:
// - Choices with CONSEQUENCES (different routes → different scenes)
// - Per-blueprint EMPATHY choices (specific to the story, not generic)
// - EDUCATIONAL GOALS that Gemini uses for the final nhận xét

export const BLUEPRINTS: StoryBlueprint[] = [
    // ══════════════════════════════════════════════════════════════════════════
    // PILLAR 1: STEM, Logic & Problem Solving
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'action_adventure',
        name: 'Cuộc Phiêu Lưu Kỳ Thú',
        pillar: 'stem',
        interactionType: 'draw',
        educationalGoal: 'Phân tích vấn đề & Khả năng phục hồi - Đánh giá cách trẻ phản ứng và tìm kiếm giải pháp khi đối mặt với rào cản',
        educationalGoal_en: 'Problem Analysis & Resilience - Evaluates how children react and seek solutions when facing obstacles',
        challengePrompt: 'Ôi không! Có một con sông rất rộng ở phía trước. Nước chảy xiết quá! Làm sao để qua sông đây? Bé hãy vẽ thứ gì đó giúp nhé!',
        challengePrompt_en: 'Oh no! There is a very wide river ahead with rushing water! How can we cross? Draw something to help!',
        drawInstruction: 'Bé vẽ một thứ giúp qua sông nhé! (Cầu, thuyền, cánh...)',
        drawInstruction_en: 'Draw something to cross the river! (Bridge, boat, wings...)',
                empathyPrompt: 'Ôi kìa! Có một bạn cá nhỏ đang buồn bã vì không biết bơi qua vùng nước xiết. Con sẽ làm gì để giúp bạn?',
        empathyPrompt_en: 'Oh look! A baby fish is sad because it does not know how to swim through the rushing water. What will you do?',
        empathyChoices: [
            { id: 'teach_fish', icon: '🐟', label: 'Dạy bạn cá nhỏ cách nhảy qua đá', label_en: 'Teach baby fish to jump over rocks', consequence: 'Character patiently teaches the fish — shows teaching is a form of caring' },
            { id: 'build_dam', icon: '🧱', label: 'Xây đập nhỏ để bạn cá có hồ bơi', label_en: 'Build a small dam so fish has a pool', consequence: 'Character builds something for the fish — shows using skills to help others' },
            { id: 'sing_song', icon: '🎵', label: 'Hát bài hát vui để bạn cá hết buồn', label_en: 'Sing a happy song for the sad fish', consequence: 'Character comforts through art — shows emotional support matters' },
        ],
        guardianId: 'clanky_robot',
        preferredBiome: 'whispering_forest',
        rewardSticker: 'Kỹ Sư Sáng Tạo',
        rewardSticker_en: 'Creative Engineer',
    },
    {
        id: 'the_builder',
        name: 'Kiến Trúc Sư Nhí',
        pillar: 'stem',
        interactionType: 'draw',
        educationalGoal: 'Tư duy hệ thống & Lập kế hoạch - Đo lường khả năng dự đoán vấn đề và lên kế hoạch phòng ngừa',
        educationalGoal_en: 'Systems Thinking & Planning - Measures the ability to anticipate problems and plan preventive measures',
        challengePrompt: 'Trời sắp mưa to rồi! Có tiếng sấm ầm ầm! Bé hãy vẽ một cái mái nhà thật vững chắc để trú mưa nhé! Nhớ vẽ chắc chắn nha!',
        challengePrompt_en: 'A big thunderstorm is coming! Draw a strong, sturdy roof to keep everyone dry! Make it strong!',
        drawInstruction: 'Bé vẽ mái nhà hoặc chỗ trú mưa nhé! (Hình tam giác, tròn, vuông...)',
        drawInstruction_en: 'Draw a roof or shelter! (Triangle, round, square...)',
                empathyPrompt: 'Trong lúc trú mưa, có một bạn bọ rùa nhỏ bay đến, cánh ướt sũng vì mưa. Bọ rùa đang rất lạnh. Con sẽ làm gì?',
        empathyPrompt_en: 'While sheltering from the rain, a tiny ladybug flies in with wet wings. It is very cold. What will you do?',
        empathyChoices: [
            { id: 'share_shelter', icon: '🏠', label: 'Mời tất cả bạn vào trú cùng', label_en: 'Invite everyone to share the shelter', consequence: 'Character shares their creation generously — teaches sharing' },
            { id: 'fix_old', icon: '🔧', label: 'Sửa nhà cũ của bạn Cú bị hỏng', label_en: 'Fix Professor Owl broken old house', consequence: 'Character uses building skills to help — teaches service' },
            { id: 'teach_build', icon: '📐', label: 'Dạy Bác Cú cách xây nhà mới', label_en: 'Teach Owl how to build a new one', consequence: 'Character empowers others with knowledge — teaches mentorship' },
        ],
        guardianId: 'professor_owl',
        preferredBiome: 'cloud_city',
        rewardSticker: 'Kiến Trúc Sư',
        rewardSticker_en: 'Master Architect',
    },
    {
        id: 'speed_race',
        name: 'Cuộc Đua Tốc Độ',
        pillar: 'stem',
        interactionType: 'draw',
        educationalGoal: 'Tư duy logic & Sáng tạo giải pháp - Đánh giá mức độ linh hoạt trong việc tạo ra công cụ để đạt mục tiêu',
        educationalGoal_en: 'Logical Thinking & Solution Creation - Evaluates flexibility in creating tools to achieve goals',
        challengePrompt: 'Cuộc đua vũ trụ sắp bắt đầu rồi! Bạn Rô-bốt đang chờ kìa! Bé hãy vẽ một chiếc xe thật nhanh, thật멋 nhé!',
        challengePrompt_en: 'The space race is about to start! Clanky Robot is waiting! Draw a super fast, super cool vehicle!',
        drawInstruction: 'Bé vẽ xe đua, tên lửa, hoặc bất cứ thứ gì nhanh nhất! Càng lạ càng hay!',
        drawInstruction_en: 'Draw a race car, rocket, or anything super fast! The weirder the better!',
                empathyPrompt: 'Đang đua thì con thấy bạn Rô-bốt Lạch Cạch bị hỏng bánh xe, phải đứng lại giữa đường. Con sẽ làm gì?',
        empathyPrompt_en: 'During the race, you see Clanky the Robot stuck with a broken wheel. What will you do?',
        empathyChoices: [
            { id: 'wait_friend', icon: '⏳', label: 'Dừng lại chờ bạn Rô-bốt bị hỏng xe', label_en: 'Stop and wait for broken-down Robot',
              consequence: 'Character sacrifices winning to help a friend — teaches sportsmanship over winning',
              consequence_vi: 'Bé đặt tình bạn lên trên chiến thắng. Đây là biểu hiện rõ ràng của EQ cao — bé hiểu rằng ý nghĩa của cuộc đua không phải là về nhất, mà là về việc không bỏ lại bạn bè.' },
            { id: 'share_fuel', icon: '⛽', label: 'Chia sẻ nhiên liệu cho bạn Rô-bốt', label_en: 'Share fuel with Robot friend',
              consequence: 'Character shares resources — teaches generosity even in competition',
              consequence_vi: 'Ngay cả khi đang cạnh tranh, bé vẫn chủ động chia sẻ. Điều này cho thấy bé không có tính ích kỷ và biết rằng sự công bằng quan trọng hơn lợi thế cá nhân.' },
            { id: 'finish_together', icon: '🤝', label: 'Kéo xe bạn cùng về đích!', label_en: 'Tow friend car to finish together!',
              consequence: 'Character chooses friendship over glory — teaches that winning together is better',
              consequence_vi: 'Bé tìm ra cách để AI HAI cùng thắng — không bỏ bạn, cũng không bỏ cuộc. Đây là tư duy hợp tác (win-win) rất tích cực, cho thấy bé sáng tạo trong cách giải quyết xung đột.' },
        ],
        guardianId: 'clanky_robot',
        preferredBiome: 'space_station',
        rewardSticker: 'Nhanh Như Chớp',
        rewardSticker_en: 'Lightning Fast',
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PILLAR 2: Social-Emotional Learning (EQ)
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'empathy_test',
        name: 'Bài Học Yêu Thương',
        pillar: 'eq',
        interactionType: 'choice',
        educationalGoal: 'Sự đồng cảm & Lòng vị tha - Đánh giá khả năng hy sinh sự thoải mái cá nhân để chăm sóc người khác',
        educationalGoal_en: 'Empathy & Altruism - Evaluates the ability to sacrifice personal comfort to care for others',
        challengePrompt: 'Bạn Thỏ Út Ít đang ngồi co ro dưới gốc cây, run run vì lạnh. Trời mưa to quá! Mắt bạn ấy đỏ hoe. Con muốn giúp bạn thế nào?',
        challengePrompt_en: 'Tiny Rabbit is curled up under a tree, shivering from the cold. It is raining hard! Her eyes are red. How do you want to help?',
        choices: [
            { id: 'give_scarf', icon: '🧣', label: 'Đưa khăn ấm của mình cho bạn', label_en: 'Give your own warm scarf',
              consequence: 'Character takes off their scarf and wraps it around the rabbit.',
              consequence_en: 'Self-sacrifice: giving up personal comfort — teaches SHARING',
              consequence_vi: 'Bé sẵn sàng hi sinh sự thoải mái của bản thân để bạn được ấm. Đây là dấu hiệu của lòng vị tha và đồng cảm sâu sắc — bé đặt cảm xúc của người khác lên trước.' },
            { id: 'build_shelter', icon: '🏠', label: 'Xây nhà lá để cùng trú mưa', label_en: 'Build a leaf shelter together',
              consequence: 'Character gathers giant colorful leaves and builds a creative shelter.',
              consequence_en: 'Problem-solving: using creativity to help — teaches RESOURCEFULNESS',
              consequence_vi: 'Bé không chỉ muốn giúp, mà còn chủ động TÌM CÁCH giúp. Điều này cho thấy tư duy sáng tạo khi giải quyết vấn đề và bản năng chăm sóc người khác bằng hành động cụ thể.' },
            { id: 'call_friends', icon: '📢', label: 'Gọi tất cả bạn đến giúp!', label_en: 'Call all friends to come help!',
              consequence: 'Character cups hands and calls out loudly. A parade of forest animals rushes in.',
              consequence_en: 'Leadership: organizing a group to help — teaches TEAMWORK',
              consequence_vi: 'Bé hiểu rằng khi tập hợp mọi người lại, sức mạnh sẽ lớn hơn. Đây là biểu hiện của khả năng lãnh đạo tự nhiên và niềm tin vào cộng đồng — bé thích giải quyết vấn đề theo nhóm.' },
        ],
                empathyPrompt: 'Trước khi chia tay, Thỏ Út Ít muốn tặng con một món quà nhỏ để cảm ơn. Con sẽ làm gì để đáp lại tình cảm này?',
        empathyPrompt_en: 'Before saying goodbye, Tiny Rabbit wants to give you a small gift to say thank you. How will you respond?',
        empathyChoices: [
            { id: 'gift', icon: '🎁', label: 'Tặng bạn một món quà kỷ niệm', label_en: 'Give a keepsake gift',
              consequence: 'Generosity — giving something precious to show lasting care',
              consequence_vi: 'Bé muốn tình bạn được ghi nhớ bằng một vật cụ thể. Điều này cho thấy bé coi trọng các mối quan hệ và muốn để lại ấn tượng ấm áp lâu dài.' },
            { id: 'teach', icon: '📖', label: 'Dạy bạn cách giữ ấm lần sau', label_en: 'Teach friend how to stay warm next time',
              consequence: 'Knowledge sharing — empowering the friend to help themselves',
              consequence_vi: 'Bé không chỉ giải quyết vấn đề trước mắt mà còn nghĩ đến tương lai của bạn. Đây là tư duy chăm sóc có chiều sâu — bé muốn trao đi sự tự lập, không phải sự phụ thuộc.' },
            { id: 'promise', icon: '🤙', label: 'Hứa sẽ luôn ghé thăm bạn', label_en: 'Promise to always visit',
              consequence: 'Commitment — showing that friendship is a lasting bond',
              consequence_vi: 'Bé xem tình bạn là một cam kết lâu dài, không phải chỉ một khoảnh khắc. Điều này cho thấy bé có sự trung thành và khả năng duy trì các mối quan hệ sâu sắc.' },
        ],
        guardianId: 'tiny_rabbit',
        preferredBiome: 'whispering_forest',
        rewardSticker: 'Quả Sồi Yêu Thương',
        rewardSticker_en: 'Kindness Acorn',
    },
    {
        id: 'the_mystery',
        name: 'Bí Ẩn Trong Rừng',
        pillar: 'eq',
        interactionType: 'choice',
        educationalGoal: 'Quản lý cảm xúc & Lòng dũng cảm - Đo lường khả năng vượt qua nỗi sợ hãi và đối mặt với điều chưa biết',
        educationalGoal_en: 'Emotional Management & Courage - Measures the ability to overcome fear and face the unknown',
        challengePrompt: 'Có tiếng động lạ phía sau bụi cây! Nghe giống tiếng ai đó kêu "hu hu" rất buồn. Bóng tối nhẹ nhẹ quanh đó. Con muốn làm gì?',
        challengePrompt_en: 'There is a strange sound from the bushes! It sounds like someone sadly crying "boo hoo". There are gentle shadows around. What should we do?',
        choices: [
            { id: 'sneak_look', icon: '🔍', label: 'Rón rén tới xem là ai', label_en: 'Sneak over to see who it is',
              consequence: 'Character carefully tip-toes through the bushes.',
              consequence_en: 'Curiosity: carefully investigating before reacting — teaches OBSERVATION',
              consequence_vi: 'Bé không hành động bốc đồng — bé quan sát trước khi hành động. Đây là dấu hiệu của khả năng kiểm soát cảm xúc tốt và tư duy thận trọng, rất đáng khuyến khích ở trẻ.' },
            { id: 'brave_step', icon: '🦁', label: 'Dũng cảm bước tới giúp liền!', label_en: 'Bravely walk over to help right away!',
              consequence: 'Character marches forward confidently.',
              consequence_en: 'Bravery: acting without hesitation — teaches COURAGE',
              consequence_vi: 'Bé không để nỗi sợ cản trở hành động giúp đỡ. Sự dũng cảm này — dù bé chưa biết điều gì chờ đợi — là một phẩm chất lãnh đạo rất đặc biệt.' },
            { id: 'call_out', icon: '🗣️', label: 'Gọi to: "Bạn ơi, đừng sợ!"', label_en: 'Call out: "Don\'t be scared, friend!"',
              consequence: 'Character shouts reassuring words into the dark.',
              consequence_en: 'Communication: using words to comfort — teaches VERBAL REASSURANCE',
              consequence_vi: 'Bé dùng LỜI NÓI để xoa dịu nỗi sợ thay vì hành động trực tiếp. Đây là trí tuệ cảm xúc ngôn ngữ — bé hiểu sức mạnh của lời nói trong việc an ủi người khác.' },
        ],
                empathyPrompt: 'Người bạn mới muốn đi về nhà nhưng trời đã tối. Bạn ấy vẫn còn hơi rụt rè. Con sẽ làm gì để giúp bạn?',
        empathyPrompt_en: 'The new friend wants to go home but it is dark. They are still a bit shy. What will you do to help?',
        empathyChoices: [
            { id: 'stay_night', icon: '🌙', label: 'Ở lại qua đêm cùng bạn mới', label_en: 'Stay overnight with new friend',
              consequence: 'Sacrifice personal comfort to ensure a friend feels safe',
              consequence_vi: 'Bé hi sinh sự thoải mái của mình để bạn không cảm thấy cô đơn. Điều này thể hiện sự đồng cảm sâu sắc — bé cảm nhận được nỗi sợ của bạn như thể nỗi sợ của chính mình.' },
            { id: 'light_way', icon: '🔦', label: 'Thắp sáng đường cho bạn về nhà', label_en: 'Light the way home for friend',
              consequence: 'Guide others safely — practical help with personal effort',
              consequence_vi: 'Bé muốn đảm bảo bạn về nhà AN TOÀN. Đây là tình yêu thương thiết thực — bé không chỉ nói mà còn hành động để bảo vệ người khác.' },
            { id: 'introduce', icon: '👋', label: 'Giới thiệu bạn với nhóm của mình', label_en: 'Introduce friend to your group',
              consequence: 'Social inclusion — making sure no one is left alone',
              consequence_vi: 'Bé muốn người bạn mới được hoà nhập và có thêm bạn bè. Đây là dấu hiệu của tính bao dung và khả năng xây dựng cộng đồng — bé không để ai cảm thấy bị bỏ rơi.' },
        ],
        guardianId: 'professor_owl',
        preferredBiome: 'whispering_forest',
        rewardSticker: 'Nhà Thám Hiểm Dũng Cảm',
        rewardSticker_en: 'Brave Explorer',
    },
    {
        id: 'great_rescue',
        name: 'Giải Cứu Bạn Nhỏ',
        pillar: 'eq',
        interactionType: 'draw',
        educationalGoal: 'Sự sẵn sàng hợp tác & Hỗ trợ cộng đồng - Đánh giá mức độ chủ động trong việc giúp đỡ người yếu thế',
        educationalGoal_en: 'Cooperation & Community Support - Evaluates proactiveness in helping the vulnerable',
        challengePrompt: 'Ôi! Một bạn sao nhỏ bị kẹt trên ngọn cây kẹo cao chót vót! Bạn ấy khóc nhè nhè vì sợ. Làm sao để với tới đỉnh cây đây? Bé vẽ thứ gì đó giúp nhé!',
        challengePrompt_en: 'Oh no! A baby star is stuck on top of a very tall candy tree! She is crying because she is scared. How do we reach the top? Draw something to help!',
        drawInstruction: 'Bé vẽ thang, tàu bay, bóng bay, hoặc bất cứ thứ gì để cứu bạn sao!',
        drawInstruction_en: 'Draw a ladder, airplane, balloon, or anything to rescue the star!',
                empathyPrompt: 'Bé đã cứu được bạn sao nhỏ xuống đất an toàn, nhưng bạn ấy lại không biết đường về nhà. Con sẽ làm gì?',
        empathyPrompt_en: 'You rescued the baby star safely to the ground, but she does not know the way home. What will you do?',
        empathyChoices: [
            { id: 'carry_home', icon: '🏡', label: 'Bế bạn sao về nhà an toàn', label_en: 'Carry baby star safely home',
              consequence: 'Personal responsibility — taking full care of someone fragile',
              consequence_vi: 'Bé tự nhận trách nhiệm đưa bạn về tận nhà — không giao phó cho ai khác. Đây là sự tận tâm và tinh thần bảo vệ người yếu thế rất đáng trân trọng.' },
            { id: 'find_family', icon: '👨‍👩‍👧', label: 'Giúp bạn sao tìm lại gia đình', label_en: 'Help star find her family',
              consequence: 'Reuniting families — understanding the importance of belonging',
              consequence_vi: 'Bé hiểu rằng điều bạn nhỏ thực sự cần là được ở bên gia đình. Đây là sự đồng cảm sâu sắc — bé không chỉ giải quyết triệu chứng mà còn tìm đến nguồn gốc của vấn đề.' },
            { id: 'make_nest', icon: '🪺', label: 'Xây tổ mới ở nơi thấp hơn', label_en: 'Build a new nest somewhere lower',
              consequence: 'Creating safe spaces — preventing future problems',
              consequence_vi: 'Bé không chỉ cứu bạn lần này mà còn nghĩ đến việc ngăn ngừa tai nạn trong tương lai. Đây là tư duy phòng ngừa rất trưởng thành — bé là người giải quyết vấn đề tận gốc.' },
        ],
        guardianId: 'tiny_rabbit',
        preferredBiome: 'candy_valley',
        rewardSticker: 'Anh Hùng Nhí',
        rewardSticker_en: 'Little Hero',
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PILLAR 3: Arts, Expression & Sensory
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'talent_show',
        name: 'Đêm Hội Tài Năng',
        pillar: 'arts',
        interactionType: 'draw',
        educationalGoal: 'Sự tự tin & Khẳng định bản thân - Đánh giá mức độ sẵn sàng thể hiện cá tính và năng lực trước đám đông',
        educationalGoal_en: 'Self-Confidence & Self-Assertion - Evaluates readiness to express personality and abilities in public',
        challengePrompt: 'Hôm nay có lễ hội âm nhạc lớn trong thành phố mây! Khán giả đang chờ! Bé hãy vẽ một nhạc cụ kỳ diệu để biểu diễn trên sân khấu nhé!',
        challengePrompt_en: 'Today there is a big music festival in Cloud City! The audience is waiting! Draw a magical instrument to perform on stage!',
        drawInstruction: 'Bé vẽ nhạc cụ yêu thích! Guitar, trống, sáo, hoặc nhạc cụ tự sáng tạo!',
        drawInstruction_en: 'Draw your favorite instrument! Guitar, drum, flute, or invent your own!',
                empathyPrompt: 'Cáo Nghệ Sĩ chuẩn bị lên sân khấu nhưng lại đang run rẩy vì quá sợ đám đông. Con sẽ làm gì để giúp bạn?',
        empathyPrompt_en: 'Fanny the Fox is about to go on stage but is trembling with stage fright. How will you help?',
        empathyChoices: [
            { id: 'duet', icon: '🎵', label: 'Mời Cáo Nghệ Sĩ song ca cùng', label_en: 'Invite Fanny Fox to perform a duet', consequence: 'Collaboration in art — performing together creates something bigger' },
            { id: 'teach_music', icon: '🎶', label: 'Dạy bạn Cáo chơi nhạc cụ mới', label_en: 'Teach Fox to play the new instrument', consequence: 'Sharing artistic skills — empowering others through knowledge' },
            { id: 'cheer_fox', icon: '👏', label: 'Cổ vũ bạn Cáo diễn trước', label_en: 'Cheer for Fox to perform first', consequence: 'Supporting others spotlight — putting a friends confidence first' },
        ],
        guardianId: 'fanny_fox',
        preferredBiome: 'cloud_city',
        rewardSticker: 'Ngôi Sao Nhí',
        rewardSticker_en: 'Super Star',
    },
    {
        id: 'magical_transformation',
        name: 'Phép Biến Hình Kỳ Diệu',
        pillar: 'arts',
        interactionType: 'choice',
        educationalGoal: 'Tư duy linh hoạt & Thử nghiệm - Đo lường sự tò mò và sẵn sàng chấp nhận kết quả bất ngờ',
        educationalGoal_en: 'Flexible Thinking & Experimentation - Measures curiosity and readiness to accept unexpected outcomes',
        challengePrompt: 'Cần pha một lọ thuốc phép kỳ diệu để vượt qua Dòng Sông Buồn Ngủ mà không đánh thức chú ếch khổng lồ đang ngủ! Mỗi màu có phép thuật khác nhau! Bé muốn pha màu gì?',
        challengePrompt_en: 'We need a magic potion to cross the Sleepy River without waking the giant sleeping frog! Each color has a different spell! What color potion?',
        choices: [
            { id: 'red', icon: '🔴', label: 'Đỏ — Biến thành Siêu Nhỏ', label_en: 'Red — Shrink Super Tiny', consequence: 'Character drinks and shrinks to ant-size! They ride on a leaf boat across the river like a tiny adventure. The frog doesn\'t notice them at all!', consequence_en: 'Perspective change — seeing the world from a new vantage point' },
            { id: 'blue', icon: '🔵', label: 'Xanh Dương — Biến thành cá bơi qua', label_en: 'Blue — Transform into a swimming fish', consequence: 'Character transforms into a beautiful sparkling fish! They swim under the sleeping frog, seeing the magical underwater world. Coral and jellyfish wave hello!', consequence_en: 'Adaptation — changing form to match the environment' },
            { id: 'yellow', icon: '🟡', label: 'Vàng — Mọc cánh bay lên trời', label_en: 'Yellow — Grow wings and fly', consequence: 'Character sprouts golden butterfly wings and floats gently over the river! They can see the whole forest from above — everything looks so small and beautiful!', consequence_en: 'Freedom and perspective — rising above obstacles literally' },
        ],
                empathyPrompt: 'Cáo Nghệ Sĩ cũng muốn đi cùng nhưng bạn ấy không có thuốc phép. Con sẽ làm gì?',
        empathyPrompt_en: 'Fanny the Fox also wants to come along but does not have any magic potion. What will you do?',
        empathyChoices: [
            { id: 'share_potion', icon: '🧪', label: 'Chia thuốc phép cho Cáo Nghệ Sĩ', label_en: 'Share potion with Fanny Fox', consequence: 'Sharing rare resources — even magical things are better when shared' },
            { id: 'make_extra', icon: '✨', label: 'Pha thêm một lọ cho mọi người', label_en: 'Brew extra potions for everyone', consequence: 'Going the extra mile — putting in effort to include others' },
            { id: 'teach_recipe', icon: '📋', label: 'Dạy bạn cách pha thuốc phép', label_en: 'Teach the potion recipe', consequence: 'Knowledge transfer — the most powerful gift is teaching how' },
        ],
        guardianId: 'fanny_fox',
        preferredBiome: 'crystal_ocean',
        rewardSticker: 'Nhà Giả Kim',
        rewardSticker_en: 'Magic Alchemist',
    },
    {
        id: 'dream_world',
        name: 'Thế Giới Trong Mơ',
        pillar: 'arts',
        interactionType: 'choice',
        educationalGoal: 'Trí tưởng tượng phong phú & Biểu đạt nội tâm - Đánh giá khả năng chuyển hóa cảm xúc và suy nghĩ thành hình ảnh',
        educationalGoal_en: 'Rich Imagination & Inner Expression - Evaluates the ability to transform emotions and thoughts into images',
        challengePrompt: 'Nhân vật của bé nằm ngủ thiếp đi dưới bầu trời sao lung linh. Giấc mơ kỳ diệu sắp bắt đầu! Mỗi giấc mơ sẽ hoàn toàn khác nhau. Bé muốn mơ thấy gì?',
        challengePrompt_en: 'Your character falls asleep under the sparkling starry sky. A magical dream is about to begin! Each dream is completely different. What do you want to dream about?',
        choices: [
            { id: 'candy_fireworks', icon: '🎆', label: 'Kẹo Bông Gòn Bắn Pháo Hoa', label_en: 'Cotton Candy Fireworks', consequence: 'The sky fills with cotton candy explosions! Pink, blue, and yellow cotton candy rains down. Character catches pieces in their mouth! Everything tastes sweet and magical.', consequence_en: 'Sensory imagination — taste, sight, touch all combined' },
            { id: 'flying_whales', icon: '🐋', label: 'Cá Voi Bay Giữa Các Ngôi Sao', label_en: 'Whales Flying Among Stars', consequence: 'Enormous gentle whales glide through space, singing deep songs. Character rides on a whale\'s back through galaxies. Stars brush their fingers like warm glitter.', consequence_en: 'Scale and wonder — appreciating creatures much bigger than us' },
            { id: 'dancing_stars', icon: '⭐', label: 'Các Ngôi Sao Nhảy Tango', label_en: 'Stars Dancing Tango', consequence: 'Stars come alive and dance in pairs! They invite the character to join. The whole sky becomes a grand ballroom of swirling golden light and music.', consequence_en: 'Rhythm and movement — understanding dance as universal expression' },
        ],
                empathyPrompt: 'Bé thấy bạn Rùa Lạc Quan đang khó ngủ, cứ trằn trọc mãi không ngủ được. Con sẽ làm gì để giúp Rùa?',
        empathyPrompt_en: 'You see Happy Turtle tossing and turning, unable to fall asleep. What will you do to help?',
        empathyChoices: [
            { id: 'share_dream', icon: '💭', label: 'Mời Rùa Lạc Quan vào giấc mơ cùng', label_en: 'Invite Happy Turtle into the dream', consequence: 'Inclusive imagination — dreams are better when shared' },
            { id: 'paint_dream', icon: '🎨', label: 'Vẽ lại giấc mơ tặng bạn Rùa', label_en: 'Paint the dream as a gift for Turtle', consequence: 'Artistic expression — turning inner experience into a gift' },
            { id: 'lullaby', icon: '🌙', label: 'Hát ru bạn Rùa ngủ cùng', label_en: 'Sing a lullaby for Turtle too', consequence: 'Nurturing — creating peaceful moments for others' },
        ],
        guardianId: 'happy_turtle',
        preferredBiome: 'crystal_ocean',
        rewardSticker: 'Người Dệt Giấc Mơ',
        rewardSticker_en: 'Dream Weaver',
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PILLAR 4: Language & Communication (Ngôn ngữ & Giao tiếp)
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'silly_mishap',
        name: 'Chiếc Còi Khẩn Cấp',
        pillar: 'vocabulary',
        interactionType: 'draw',
        educationalGoal: 'Giao tiếp & Làm việc nhóm - Đánh giá khả năng sử dụng ngôn ngữ và tín hiệu để kêu gọi sự giúp đỡ',
        educationalGoal_en: 'Communication & Teamwork - Evaluates the ability to use language and signals to call for help',
        challengePrompt: 'Ôi trời ơi! Bạn Robot đang kẹt trên một cành cây cao! Bạn ấy không thể tự xuống được và đang rất hoảng sợ! Làm sao để giúp bạn ấy gọi người tới cứu? Bé hãy vẽ một công cụ để phát tín hiệu nhé!',
        challengePrompt_en: 'Oh no! Clanky Robot is stuck on a high branch! He can\'t get down and is scared! How can we call for help? Draw a signaling tool!',
        drawInstruction: 'Bé hãy vẽ một công cụ giao tiếp! (Ví dụ: Một chiếc loa, một cái còi, hoặc pháo sáng!)',
        drawInstruction_en: 'Draw a communication tool! (A megaphone, a whistle, or a flare!)',
                empathyPrompt: 'Trong lúc chờ đội cứu hộ đến, Bác Cú Thông Thái vẫn còn hơi hoảng hốt vì sự cố máy móc. Con sẽ làm gì?',
        empathyPrompt_en: 'While waiting for the rescue team, Professor Owl is still a bit panicked from the machine accident. What will you do?',
        empathyChoices: [
            { id: 'sing_lullaby', icon: '🎵', label: 'Hát một bài nhẹ nhàng để an ủi bạn', label_en: 'Sing a gentle song to comfort him', consequence: 'Emotional communication - using voice to soothe and de-escalate fear' },
            { id: 'call_friends', icon: '📢', label: 'Gọi to tên bạn bè để cùng tìm cách', label_en: 'Call friends to help find a solution', consequence: 'Community rallying - using language to gather collective intelligence' },
            { id: 'tell_joke', icon: '😂', label: 'Kể một câu chuyện cười để bạn hết sợ', label_en: 'Tell a joke to make him stop crying', consequence: 'Humor and defusion - using comedy as a coping mechanism' },
        ],
        guardianId: 'clanky_robot',
        preferredBiome: 'whispering_forest',
        rewardSticker: 'Loa Phát Thanh Nhí',
        rewardSticker_en: 'Little Megaphone',
    },
    {
        id: 'hide_and_seek',
        name: 'Thuyết Phục Bạn Rùa',
        pillar: 'vocabulary',
        interactionType: 'choice',
        educationalGoal: 'Thương lượng & Thuyết phục - Đo lường cách trẻ dùng lời nói để giải quyết tình huống xã hội',
        educationalGoal_en: 'Negotiation & Persuasion - Measures how children use words to resolve social situations',
        challengePrompt: 'Bạn Rùa đang trốn trong vỏ vì quá nhút nhát và không dám ra ngoài chơi cùng mọi người! Rùa sợ bên ngoài có nguy hiểm. Bé sẽ nói gì để thuyết phục bạn Rùa ra ngoài chơi?',
        challengePrompt_en: 'Happy Turtle is hiding in his shell because he is too shy to play with everyone! He thinks it is dangerous outside. What will you say to persuade him?',
        choices: [
            { id: 'compliment', icon: '✨', label: 'Nói lời khen ngợi bạn Rùa', label_en: 'Give a compliment', consequence: 'Character uses positive reinforcement to build the turtle\'s confidence. The turtle blushes and peeks out!', consequence_en: 'Positive reinforcement - building self-esteem in others' },
            { id: 'explain_safe', icon: '🛡️', label: 'Giải thích rằng bên ngoài rất an toàn', label_en: 'Explain it is safe outside', consequence: 'Character logically explains the safety of the environment, pointing out the soft grass. Turtle nods and feels secure.', consequence_en: 'Logical persuasion - using facts to alleviate anxiety' },
            { id: 'offer_game', icon: '🎮', label: 'Đề nghị chơi trò mà Rùa thích nhất', label_en: 'Offer to play Turtle\'s favorite game', consequence: 'Character proposes a compromise by playing a slow, quiet game. Turtle happily agrees and comes out!', consequence_en: 'Compromise - finding mutual ground in social settings' },
        ],
                empathyPrompt: 'Bạn Rùa vẫn chưa chịu chui ra khỏi mai, có vẻ bạn ấy cần thêm chút thời gian. Con sẽ làm gì để thể hiện sự kiên nhẫn?',
        empathyPrompt_en: 'The Turtle still has not come out of its shell, it seems to need a bit more time. What will you do to show patience?',
        empathyChoices: [
            { id: 'introduce_others', icon: '🤝', label: 'Dẫn bạn Rùa đi làm quen từng người', label_en: 'Introduce Turtle to others one by one', consequence: 'Social facilitation - acting as a bridge for a shy friend' },
            { id: 'make_captain', icon: '👑', label: 'Nhường cho bạn Rùa làm đội trưởng', label_en: 'Let Turtle be the team captain', consequence: 'Empowerment - stepping back to let others lead' },
            { id: 'tell_secret', icon: '🤫', label: 'Kể cho bạn Rùa nghe một bí mật nhỏ', label_en: 'Tell Turtle a small secret', consequence: 'Vulnerability - sharing personal info to build trust' },
        ],
        guardianId: 'happy_turtle',
        preferredBiome: 'candy_valley',
        rewardSticker: 'Sứ Giả Hòa Bình',
        rewardSticker_en: 'Peace Envoy',
    },
    {
        id: 'hungry_chef',
        name: 'Giải Quyết Xung Đột',
        pillar: 'vocabulary',
        interactionType: 'draw',
        educationalGoal: 'Hòa giải & Đàm phán - Đánh giá khả năng dùng ngôn ngữ để giải quyết mâu thuẫn giữa bạn bè',
        educationalGoal_en: 'Mediation & Negotiation - Evaluates the ability to use language to resolve conflicts between friends',
        challengePrompt: 'Bác Cáo và Thỏ đang cãi nhau ầm ĩ vì cả hai đều muốn ăn quả táo phép thuật duy nhất còn lại! Không ai chịu nhường ai. Bé hãy vẽ một công cụ hoặc món quà để giúp hai bạn hòa giải nhé!',
        challengePrompt_en: 'Fanny Fox and Tiny Rabbit are arguing loudly because they both want the last magic apple! Nobody will compromise. Draw a tool or gift to help them make peace!',
        drawInstruction: 'Vẽ một món quà hòa giải! (Một con dao để chia đôi, cờ hòa bình, hoặc đồ chơi để đổi!)',
        drawInstruction_en: 'Draw a peace offering! (A knife to split it, a peace flag, or a toy to trade!)',
                empathyPrompt: 'Sau khi vấn đề được giải quyết, Cáo và Thỏ vẫn còn hơi ngượng ngùng và chưa dám nói chuyện lại với nhau. Con sẽ làm gì?',
        empathyPrompt_en: 'After the problem is solved, Fox and Rabbit are still a bit awkward and have not started talking again. What will you do?',
        empathyChoices: [
            { id: 'listen_both', icon: '👂', label: 'Lắng nghe cả hai bạn kể chuyện', label_en: 'Listen to both sides of the story', consequence: 'Active listening - gathering all perspectives before judging' },
            { id: 'fair_contest', icon: '⚖️', label: 'Đề nghị một cuộc thi công bằng', label_en: 'Propose a fair contest', consequence: 'Structured resolution - creating rules to solve a dispute' },
            { id: 'split_apple', icon: '🔪', label: 'Chia quả táo thành hai phần bằng nhau', label_en: 'Split the apple into two equal parts', consequence: 'Equity - finding the most balanced mathematical compromise' },
        ],
        guardianId: 'fanny_fox',
        preferredBiome: 'cloud_city',
        rewardSticker: 'Nhà Đàm Phán Nhí',
        rewardSticker_en: 'Little Negotiator',
    },
];

// ─── UTILITY ──────────────────────────────────────────────────────────────────

export const getRandomBlueprint = (pillarFilter?: EducationPillar): StoryBlueprint => {
    const pool = pillarFilter
        ? BLUEPRINTS.filter(b => b.pillar === pillarFilter)
        : BLUEPRINTS;
    return pool[Math.floor(Math.random() * pool.length)];
};

export const getRandomBiome = (): Biome => {
    return BIOMES[Math.floor(Math.random() * BIOMES.length)];
};
