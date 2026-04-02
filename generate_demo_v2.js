const fs = require('fs');
const path = require('path');

const members = [
  {
    id: 'sato_kenichi', name: '佐藤 健一', office: '東京本社', role: '営業部長',
    called_short: '佐藤部長・サトケンさん',
    called_full: '佐藤部長、または「サトケンさん」と呼んでもらえると嬉しいです。部長という役職に誇りを持ちつつ、距離感が縮まると仕事がしやすくなります。',
    type: 'ドライバー（主導型）',
    type_desc: '仕事では成果を出すスピードを重視します。全員が納得して動けるよう配慮することも大切にしていますが、結論から話してもらえると、一緒に動きやすくなります。',
    strengths: ['判断力：不測の事態でも現場の混乱を防ぐため、迅速かつ的確な道筋を示すよう意識しています。緊急時に「佐藤さんがいれば大丈夫」と思ってもらえる存在でいたいです。', 'バイタリティ：全国の営業所を飛び回る体力と、困難なプロジェクトでも最後まで完遂させるエネルギーは自信があります。諦めない背中を見せ続けたいと思っています。', '責任感：部下の失敗は自分の責任だと考えています。最後まで逃げずにバックアップすることで、チームが安心して挑戦できる環境をつくりたいです。'],
    hobby: '毎朝5時からのジョギング。皇居周辺を走りながらその日の戦略を練るのが日課で、身体を動かすと頭が整理されてすっきりします。',
    food: '立ち食いそば（春菊天のせ）が最高です。仕事終わりのキリッと冷えた辛口の日本酒と合わせると、1日の疲れが吹き飛びます。',
    motivation: '①誰もが不可能だと思った大型契約を勝ち取ったとき。達成感と同時に、チームへの感謝が湧いてきます。②部下が壁を乗り越えて成長した姿を見たとき。育てた実感があり、また頑張ろうと思えます。③新しい市場を切り拓いている実感があるとき。前人未到の道を歩いている感覚がたまりません。',
    stress: 'サウナで「ととのう」ことです。汗と一緒にすべての悩みを流し、水風呂で頭をリセットすると、翌日の判断が驚くほどクリアになります。',
    value: '「スピードは誠意」。返信の速さや対応の早さこそが、お客様や仲間への一番の敬意だと信じています。',
    support: 'ついつい予定を詰め込みすぎてしまいます。スケジュールに「移動時間」や「休憩」を無理やり差し込んでもらえると、パフォーマンスが上がって助かります。',
    entrust: '他部署とのハードな利害調整や、トラブル発生時の最終責任の引き受けはお任せください。修羅場は得意分野です。最後は必ず何とかします。',
  },
  {
    id: 'ito_yui', name: '伊藤 結衣', office: '横浜営業所', role: '事務リーダー',
    called_short: '結衣さん',
    called_full: '結衣さんと呼んでもらえると嬉しいです。名字だと少し固い印象になるので、名前で呼ばれるほうが自然と話しやすい雰囲気になれる気がします。',
    type: 'エミアブル（協調型）',
    type_desc: '周囲が心地よく働ける空気をつくることを意識しています。相手の表情や声のトーンから言葉にできない不安を察知するのが得意で、穏やかな雰囲気で話しかけてもらえると、私も意見を伝えやすくなります。',
    strengths: ['おもてなし：来客対応はもちろん、社内メンバーが気持ちよく働けるような「見えない気配り」を大切にしています。誰かが「今日の事務所、なんかいい感じだね」と言ってくれる日が一番嬉しいです。', '几帳面：書類の一文字、数字の一桁まで正確に整えることで、営業さんが安心して外回りに専念できるようにしています。正確さが誰かの仕事を楽にする、そこにやりがいを感じています。', '共感力：相手の表情や声のトーンから、言葉にできない不安や不満をいち早く察知して寄り添います。「気づいてもらえた」と感じてもらえる関係をつくりたいです。'],
    hobby: '推しのアイドルのライブ遠征。全国各地の美味しいものを食べ歩くのもセットで楽しんでいて、ライブの翌朝は早起きしてモーニングを探すのが定番です。',
    food: '外側がカリッとしたカヌレと、少し甘めのほうじ茶ラテ。疲れた午後に食べるとリセットされる感じがして、最近の小さな楽しみです。',
    motivation: '①「伊藤さんがいてくれて助かった」と言われたとき。自分の存在が誰かの力になれたと感じると、また頑張れます。②煩雑だった事務フローをスッキリ整理できたとき。仕組みが整うと達成感があります。③営業所のみんなが笑顔で談笑しているとき。いい空気の中で仕事できていると感じると、自然とやる気が湧いてきます。',
    stress: 'お気に入りの入浴剤を入れて長風呂をします。好きな音楽を流しながら無心になる時間が大切で、翌朝は気持ちがリセットされてすっきりします。',
    value: '「心理的安全性の確保」。ミスを隠さず「間違えました」とすぐに相談できる優しい環境でありたいと思っています。',
    support: '急な予定変更やルールの変更には少し動揺してしまうことがあります。変更の理由を添えて早めに伝えていただけると、落ち着いて対応できます。',
    entrust: '備品管理の徹底と、新入社員のメンタルケアはお任せください。小さな変化にもすぐ気づけるのが私の強みです。',
  },
  {
    id: 'takahashi_hiroki', name: '高橋 宏樹', office: '札幌営業所', role: '所長',
    called_short: '高橋所長・ヒロさん',
    called_full: '高橋所長、あるいは「ヒロさん」と呼んでもらえると話しかけやすくなります。どちらでも構いません。',
    type: 'アナリティカル（分析型）',
    type_desc: '正確さや根拠を大切にしており、事前に情報を整理してから慎重に判断するタイプです。データ分析に没頭すると周りの声が聞こえなくなることがあるので、急ぎの用件のときは遠慮なく肩を叩いて呼び止めてください。',
    strengths: ['分析力：市場データや過去の傾向から最も成功率の高い戦略を導き出すことに情熱を注いでいます。「感覚」より「根拠」で動きたいタイプです。', '冷静沈着：どんなトラブルが起きてもパニックにならず、解決策を淡々と考えます。吹雪の中でも現場に向かうときのように、焦らず着実に進むことを心がけています。', '探究心：業界の知識はもちろん、競合の動向や最新の物流システムまで掘り下げて調べるのが好きです。知らないことに出会うとワクワクします。'],
    hobby: '冬キャンプ。マイナス10度の中で焚き火を見つめながら静かに過ごす時間が最高の贅沢です。何も考えずにいられる貴重な時間です。',
    food: '濃厚なジンギスカンと、地元マイクロブルワリーのクラフトビール。北海道ならではの組み合わせで、この味を知ってしまうと他では満足できなくなります。',
    motivation: '①緻密に立てた販売戦略が的中したとき。予測と現実が一致した瞬間は最高です。②データ戦で競合他社に勝ち抜いたとき。数字で証明できる達成感があります。③長年開拓できなかった取引先と信頼を結べたとき。時間をかけた分だけ喜びが大きいです。',
    stress: '誰もいない林道を車でドライブすること。エンジン音だけを聞きながら自然の中に身を置くと、頭の中が整理されてリフレッシュできます。',
    value: '「事実は一つ、解釈は無限」。起きた現象を感情的に捉えず、客観的なデータとして分析し、次の打ち手に活かすことを信条としています。',
    support: 'データの分析に没頭すると周りの声が聞こえなくなります。急ぎの用件のときは遠慮なく声をかけてください。気づかず失礼していたらすみません。',
    entrust: '地域の市場動向のシミュレーションや、複雑な利益率の計算はお任せください。営業所の「勝てる地図」を描くのが私の仕事です。',
  },
  {
    id: 'nakamura_yuki', name: '中村 勇気', office: '名古屋営業所', role: '所長',
    called_short: '中村所長・勇気さん',
    called_full: '中村所長、または「勇気さん」と呼んでください。名前で呼ばれるとぐっと距離が縮まる感じがして、仕事もしやすくなります。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '現場を盛り上げ、賑やかに楽しく仕事をすることをモットーにしています。朝礼でみんなの目が輝いていると、自分もスイッチが入ります。細かい事務作業は壊滅的に苦手なので、ダブルチェックで助けてもらえると泣いて喜びます。',
    strengths: ['チャレンジ精神：前例がないことにも「まずはやってみよう！」とポジティブに飛び込みます。失敗しても笑い話にできるくらいの気持ちで取り組んでいます。', 'ポジティブ思考：失敗しても引きずらず、笑い話に変えて次に活かします。営業所に暗い顔は持ち込まない、それが私のルールです。', '発想力：既存のやり方に捉われず、お客様が驚くような新しい売り方や販路を思いつくのが得意です。「それ面白い！」と言ってもらえる瞬間が最高です。'],
    hobby: '草野球。ベンチからの声出しの大きさだけはリーグNo.1だと自負しています。結果よりも盛り上がりを大切にするタイプです。',
    food: 'ガツンとくる味噌煮込みうどんと、キンキンに冷えたジョッキのハイボール。名古屋に来てからすっかりハマりました。',
    motivation: '①朝礼でみんなの目が輝いているのを見たとき。いい一日の予感がして、自分もエンジンがかかります。②全員で高い壁を乗り越えて「乾杯」するとき。一緒に達成した喜びは格別です。③お客様から「中村さんに任せてよかった」と言われたとき。この一言のためにやっているといっても過言ではありません。',
    stress: 'バッティングセンターで思いっきり打ち込みます。空振りしても笑い飛ばせるのが私流。打てなくてもすっきりします。',
    value: '「楽しくなければ仕事じゃない」。辛いときこそ、あえて面白いことを言って笑い合う。そんな営業所を目指しています。',
    support: '細かい事務作業や書類の整理が壊滅的に苦手です。ダブルチェックでミスを防いでもらえると、その分お客様への熱量を全力で注げます。',
    entrust: '新規顧客への泥臭い飛び込み営業や、営業所のイベント企画。皆をワクワクさせることならお任せください。',
  },
  {
    id: 'kobayashi_keiko', name: '小林 恵子', office: '金沢営業所', role: 'リーダー',
    called_short: '小林さん・お恵さん',
    called_full: '小林さん、または「お恵さん」と呼んでください。「お恵さん」と呼ばれると、ぐっと親しみが増して話しやすくなります。',
    type: 'エミアブル（協調型）',
    type_desc: '相手の話を遮らず、最後までじっくり聞くことを何よりも大切にしています。自分の意見を後回しにしてしまうことがあるので、「小林さんはどう思いますか？」と聞いてもらえると、本音を話しやすいです。',
    strengths: ['傾聴力：社内の相談もお客様の不満も、まずは「聴く」ことに徹します。相手が本当に求めていることは、最後まで聴いてみないとわからないと思っています。', '誠実さ：できないことは正直に伝え、その代わりに何ができるかを一緒に考えます。嘘のない仕事を積み重ねることが、長く続く信頼につながると信じています。', '感謝：日々の小さな助け合いにも必ず「ありがとう」を言葉にします。当たり前のことを当たり前にやり続けることが、チームの空気をあたたかくすると思っています。'],
    hobby: '週末の御朱印集め。静かな境内を歩きながら心を整える時間を大切にしています。旅先でも必ず近くの神社を探してしまいます。',
    food: '近江町市場で食べる新鮮な海鮮丼と、香りの高い濃いめの緑茶。金沢に来てよかったと感じる瞬間のひとつです。',
    motivation: '①揉めていた取引先と納得感のある着地点を見つけたとき。話し合いで解決できた喜びは格別です。②若手が本音の悩みを打ち明けてくれたとき。信頼してもらえた実感があり、またがんばれます。③長年の誠実さが実り、紹介で新しい契約をいただけたとき。信頼が形になった瞬間です。',
    stress: '家中の掃除をします。雑巾がけをしながら無心になると、心の曇りも晴れていく気がします。きれいになった部屋を見ると気持ちが整います。',
    value: '「三方よし」。自社の利益だけでなく、お客様も喜び、地域社会も良くなる。そのバランスを常に追求したいです。',
    support: '空気を読みすぎて自分の意見を後回しにすることがあります。「小林さんはどう思いますか？」と促してもらえると、本音を話しやすいです。',
    entrust: '感情的になっているお客様への対応や、長期的な関係構築が必要な取引先への訪問。じっくり時間をかけて信頼を築きます。',
  },
  {
    id: 'kato_shota', name: '加藤 翔太', office: '大阪営業所', role: '係長',
    called_short: '加藤さん・翔ちゃん',
    called_full: '加藤さんと呼んでください。後輩からは「翔ちゃん」と呼ばれることも多く、距離が縮まると仕事がしやすくなります。',
    type: 'ドライバー（主導型）',
    type_desc: '無駄を省き、いかに効率よく最高の結果を出すかに情熱を燃やしています。結論を急ぐあまり過程の説明を省く癖があるので、「今の話、もう少し詳しく」と突っ込んでもらえると助かります。',
    strengths: ['実行力：決めたことは即行動。停滞している案件を前進させるスピード感は自信があります。「なぜ動かないのか」より「どう動かすか」を考えるタイプです。', '論理的思考：感情論ではなく、数字や事実に基づいたロジックで動きます。「なぜそうするのか」を常に言語化しているので、指示の背景が伝わりやすいと思っています。', '判断力：複数の選択肢の中で利益とリスクのバランスを見極め、迷わずGOサインを出します。決断が早いことで、チームが動きやすくなると考えています。'],
    hobby: '週4回のサウナ。外気浴中に新しいビジネスプランを思いつくことが多く、アイデアノートが手放せません。',
    food: '大阪名物のたこ焼き（塩派）と、朝一番の濃いブラックコーヒー。この組み合わせで一日のスイッチが入ります。',
    motivation: '①誰よりも早く、かつ完璧にタスクを完了させたとき。自分への小さな勝利です。②営業所の売り上げグラフが大きく跳ねたとき。数字が動く瞬間は何度見ても興奮します。③自分の提案した仕組みが全社に採用されたとき。影響範囲が広がる達成感があります。',
    stress: 'ジムでの筋トレ。重いバーベルを持ち上げている間は仕事の雑音を一切忘れられます。終わると頭がクリアになって、解決策が浮かぶことも多いです。',
    value: '「仕組みで解決する」。誰かの根性に依存せず、誰がやっても同じ成果が出る「勝ちパターン」をつくることが使命だと思っています。',
    support: '結論を急ぐあまり過程の説明を省く癖があります。「今の話、もう少し詳しく」と突っ込んでもらえると、丁寧に伝え直します。',
    entrust: '慢性的な残業の削減や、営業プロセスのデジタル化。無駄を根こそぎカットしてみせます。',
  },
  {
    id: 'abe_kento', name: '阿部 健斗', office: '仙台営業所', role: '所長',
    called_short: '阿部所長',
    called_full: '阿部所長と呼んでください。話しかけるときは遠慮なく。気持ちが先走って話が脱線しやすいので、「阿部所長、着地点は？」と優しく軌道修正してもらえると助かります。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '情熱を持って語りかけることで周囲を動かしたいと思っています。自分の失敗談も隠さず話すことで、部下が心を開きやすい雰囲気をつくるようにしています。',
    strengths: ['自己開示：自分の失敗談も隠さず話すことで、部下が心を開きやすい雰囲気をつくっています。「所長でも失敗するんだ」と思ってもらえると、挑戦しやすい空気が生まれます。', '情熱：商品の魅力やビジョンを熱っぽく語ります。「この人と仕事がしたい」と思ってもらえる熱量を持ち続けたいです。', 'チームワーク：一人の力は小さくても、全員が協力し合えば力が何倍にも発揮できると信じています。チームで喜ぶ瞬間のために仕事をしています。'],
    hobby: '釣り（青物狙い）。釣った魚を捌いて営業所の仲間に振る舞うのが楽しみで、「また釣ってきてください」と言われるたびにやる気が上がります。',
    food: '本場の厚切り牛タンと、香ばしい芋焼酎の水割り。仙台に赴任してから完全にハマりました。誰かと食べるともっと美味しい。',
    motivation: '①営業所全員が一つの目標に向かって団結しているのを感じたとき。一体感がある日はなんでもできる気がします。②飲み会でみんなの意外な一面を知ったとき。職場での顔だけじゃない人間性を知れるのが好きです。③結束力でライバル会社に勝利したとき。チームの力を実感できる最高の瞬間です。',
    stress: '仲の良い仲間と昭和歌謡を熱唱します。声を出すと昨日の悩みがどうでもよくなります。翌朝はすっきりしています。',
    value: '「同じ釜の飯を食う」。効率も大事ですが、顔を合わせて話し、一緒に食事をする。そんなウェットな人間関係が最後には強いチームをつくると信じています。',
    support: '気持ちが先走って話が脱線しやすいので、「阿部所長、今の話の着地点は？」と優しく軌道修正をお願いします。',
    entrust: '沈滞して元気のないチームの再建や、重要な商談でのプレゼンテーション。人の心を動かします。',
  },
  {
    id: 'sasaki_mai', name: '佐々木 舞', office: '広島営業所', role: '事務',
    called_short: '舞さん・佐々木ちゃん',
    called_full: '舞さん、または「佐々木ちゃん」と呼んでください。どちらでも嬉しいです。突発的な依頼が重なると優先順位に迷ってしまうので、「これは今日の何時まで」と期限を添えていただけると助かります。',
    type: 'アナリティカル（分析型）',
    type_desc: '正確さや根拠を大切にし、一歩引いて全体を観察してから動くタイプです。突発的な依頼が重なると優先順位に迷うので、期限を指定してもらえると落ち着いて対応できます。',
    strengths: ['几帳面：社内向けの書類でも0.1%のミスも見逃さない緻密さで取り組んでいます。「舞さんが確認したなら大丈夫」と言ってもらえることが、私の誇りです。', '継続力：地味なルーチンワークでも飽きることなく高い質を維持し続けます。毎日同じことを丁寧にやり続けることの大切さを信じています。', '使命感：自分の事務仕事が止まれば営業さんも困る。「後工程に迷惑をかけない」という強い責任感を持って仕事に臨んでいます。'],
    hobby: 'ミステリー小説の読破。伏線が回収される瞬間の快感がたまりません。読み終わると「もう一度最初から読みたい」と思うのが好きな作品の条件です。',
    food: '広島風お好み焼き（イカ天入り）と、最近ハマっているカフェラテ。お好み焼きは広島に来て初めてその奥深さを知りました。',
    motivation: '①複雑な書類を一発で通したとき。「よし」という静かな達成感があります。②作成した資料が「分かりやすい」と褒められたとき。伝わった実感があると次も頑張れます。③自分のサポートで営業さんがスムーズに動けているとき。縁の下の力持ちとしての充実感があります。',
    stress: '文房具店で新しいペンを物色します。きれいな道具に囲まれるだけで幸せな気持ちになれて、不思議と気持ちが前向きになります。',
    value: '「神は細部に宿る」。事務の正確さが会社の信頼の基盤を支えているという自負を常に持っています。',
    support: '突発的な依頼が重なると優先順位に迷ってしまいます。「これは今日の何時まで」と期限を指定してもらえると、落ち着いて対応できます。',
    entrust: '手間のかかる経費精算や業務マニュアルの整備はお任せください。営業所の「整頓」を引き受けます。',
  },
  {
    id: 'kimura_takuya', name: '木村 拓也', office: '福岡営業所', role: '所長',
    called_short: '木村所長・キムさん',
    called_full: '木村所長、または「キムさん」と呼んでください。「キムさん」と呼ばれるとぐっと距離が縮まる感じがして、何でも相談しやすくなります。',
    type: 'エミアブル（協調型）',
    type_desc: '人との関係性や安心感を大切にし、相手の話をよく聞くことを常に心がけています。褒められると伸びるタイプです（笑）。「所長、今日のは良かったです」の一言で三日は徹夜できます。',
    strengths: ['忍耐力：どんな苦境や無理難題を突きつけられても、どっしり構えて解決の糸口を探し続けます。諦めない姿勢がチームに安心感を与えられると思っています。', '思いやり：部下や取引先が何を求めているかを常に考えます。相手の立場に立った行動を積み重ねることで、長く続く信頼関係をつくりたいです。', '失敗を活かす力：部下のミスも「良い経験だ」とポジティブに捉え、一緒に解決策を考えます。失敗した後の関わり方でチームの成長が決まると思っています。'],
    hobby: 'ゴルフとDIY。自宅のウッドデッキを自分で作り直すことに夢中で、完成したときの達成感は仕事の成約に近いものがあります。',
    food: '飲んだ後の〆の長浜ラーメンと、すっきりしたレモンサワー。福岡の夜はこれで締めるのが最高です。',
    motivation: '①部下が初めて自分一人で成約を勝ち取ってきたとき。育てた喜びと誇らしさで胸がいっぱいになります。②家族から応援されたとき。家に帰って「頑張ってね」と言われると、また明日も走れます。③営業所が活気に溢れ、誰かの笑い声が聞こえてきたとき。いい職場だと実感できる瞬間です。',
    stress: '休日に海沿いの道を好きな音楽をかけてドライブします。何も考えない時間がリフレッシュになって、翌週の活力が戻ってきます。',
    value: '「恩送り」。若い頃に先輩から受けた恩を、今の部下たちにそれ以上の形で返していくことを人生の指針にしています。',
    support: '褒められると伸びるタイプです（笑）。「所長、今日のは良かったです」という一言で、三日は徹夜できます。',
    entrust: '地元のベテラン取引先への粘り強い交渉。情理を尽くしてお話しし、長い時間をかけて信頼を築きます。',
  },
  {
    id: 'hayashi_naoki', name: '林 直樹', office: '高松営業所', role: 'リーダー',
    called_short: '林さん・直樹さん',
    called_full: '林さん、または「直樹さん」と呼んでください。独断で進めすぎて周囲への共有が疎かになることがあります。「林さん、一旦ストップして説明を！」と遠慮なくブレーキをかけてください。',
    type: 'ドライバー（主導型）',
    type_desc: '成果を出すためにどう動くかを最優先に考え、指示を待たずに自ら動くスタイルです。独断で進めすぎることがあるので、「一旦ストップ」と止めてもらえると助かります。',
    strengths: ['自律性：上からの指示を待つのではなく、自ら課題を見つけて解決します。「言われたことをやる」だけでなく「やるべきことを見つける」ことが仕事だと思っています。', '向上心：現状に満足せず、もっと効率的な方法や高い成果を常に追い求めています。今の自分より少し上を目指し続けることで成長できると信じています。', '自信：自分の提案や行動に責任と自信を持ち、迷わず突き進みます。その姿勢で周囲を牽引していきたいです。'],
    hobby: 'ロードバイク。瀬戸大橋を眺めながら島々を巡り、足の限界まで追い込むのが好きです。ゴールに着いたときの達成感が仕事への活力になっています。',
    food: '喉越し重視の讃岐うどん（冷やしぶっかけ）と、エナジードリンク。高松に来てから讃岐うどんの奥深さに目覚めました。',
    motivation: '①前例のない難プロジェクトを任せられたとき。「やったことがない」ことへの挑戦がたまらなく好きです。②圧倒的なスピードで成果を出したとき。自分の動きが形になる瞬間の充実感があります。③自分の背中を見て後輩が自発的に動き始めたとき。伝わったんだと感じられる最高の瞬間です。',
    stress: '坂道を必死で駆け上がること。筋肉の痛みを感じている間は仕事のストレスが吹き飛びます。頂上に着いたときにはすっきりしています。',
    value: '「自律型人間でありたい」。自ら考え、自ら動くプロフェッショナル集団でありたいと願っています。',
    support: '独断で進めすぎて周囲への共有が疎かになることがあります。「林さん、一旦ストップして説明を！」と遠慮なくブレーキをかけてください。',
    entrust: '新しい営業拠点の立ち上げや新規事業の開拓。道なきところに道を作るのが得意分野です。',
  },
  {
    id: 'shimizu_sakura', name: '清水 さくら', office: '岡山営業所', role: '事務',
    called_short: 'さくらさん',
    called_full: 'さくらさんと呼んでください。名前で呼んでもらえると、自然と笑顔になれます。',
    type: 'エミアブル（協調型）',
    type_desc: '周囲と協力しながら、みんなが心地よく働ける雰囲気づくりを大切にしています。挨拶や何気ない会話から、みんなの調子を伺うのが得意です。',
    strengths: ['素直さ：新しい知識や周囲のアドバイスをすぐに吸収し、行動に移します。「素直に動ける」ことが、自分の一番の強みだと思っています。', '協調性：周りと協力して物事を進めることが好きです。一人よりみんなでやる方が、結果もプロセスも豊かになると感じています。', 'コミュニケーション：挨拶はもちろん、何気ない会話でみんなの調子を伺うのが得意です。「さくらさんと話すと元気になる」と言ってもらえる日が一番嬉しいです。'],
    hobby: 'フラワーアレンジメント。花を選んで組み合わせていく時間が、集中と癒しを同時にくれます。完成したものを誰かに贈れるのも好きです。',
    food: 'フルーツ（特に岡山の桃）と、甘いカフェオレ。桃の季節はとにかく幸せです。岡山の桃は別格です。',
    motivation: '①自分のちょっとした気遣いで誰かが笑顔になったとき。小さなことでも喜んでもらえると、また頑張れます。②みんなで目標を達成して喜び合ったとき。一緒に喜べる仲間がいることが、仕事のやりがいです。③新しい業務を覚えて一人で完結できたとき。できることが増えた実感がたまりません。',
    stress: '大好きなスイーツを思いっきり食べます！罪悪感なく楽しめるのが、ストレス発散の極意だと思っています。',
    value: '「挨拶から始まる信頼」。毎日の小さな挨拶の積み重ねが、職場のいい空気をつくると信じています。',
    support: '重い荷物の運搬は、若手の皆さんに甘えさせていただけると助かります。その分、事務や気配りで全力でお返しします。',
    entrust: '営業所の美化と、来客への最高の笑顔での対応。明るい雰囲気づくりはお任せください。',
  },
  {
    id: 'okada_jun', name: '岡田 准', office: '京都営業所', role: '所長',
    called_short: '岡田所長',
    called_full: '岡田所長と呼んでください。デジタルツールの最新機能については若い世代に教えてもらいながら学んでいます。遠慮なく教えてください。',
    type: 'アナリティカル（分析型）',
    type_desc: '情報を多角的に整理してから慎重に判断するタイプです。デジタルツールの最新機能は若い世代に教えてもらいながら学んでいます。伝統と変化のバランスを大切にしています。',
    strengths: ['客観性：自分の感情や立場に捉われず、第三者の視点から冷静に状況を判断します。公平な決断を下せることが、チームの信頼につながると思っています。', '慎重さ：一つの行動がどのような影響を及ぼすかを多角的にシミュレーションし、大きな失敗を未然に防ぎます。「転ばぬ先の杖」が私のスタイルです。', '変化への対応：伝統ある京都の街だからこそ、古い慣習を守りながらデジタルの導入など新しい変化にも柔軟に対応していきたいです。'],
    hobby: '寺社仏閣の庭園を眺めること。庭の設計に込められた意図を読み解くのが好きで、仕事の課題解決のヒントをもらうことがあります。',
    food: '上品な和菓子と、丁寧に入れたお煎茶。京都に赴任してから日本茶の奥深さに目覚めました。急いでいるときほど、丁寧にお茶を入れます。',
    motivation: '①伝統ある取引先から「Bloomさんに任せて良かった」と言われたとき。長い時間をかけて築いた信頼が報われる瞬間です。②無駄な会議を省いて業務がスムーズになったとき。効率化の積み重ねが大きな成果につながると感じます。③部下が論理的に成長したとき。考え方が変わった瞬間を見られるのが、所長としての喜びです。',
    stress: '枯山水の庭を眺めて瞑想します。動かない石と砂が織りなす空間を見ていると、自然と心が落ち着いてきます。',
    value: '「温故知新」。過去を大切にしながら新しいことを取り入れる。この姿勢が、変化の激しい時代に一番必要だと思っています。',
    support: 'デジタルツールの最新機能については若い世代に教えていただけると非常に勉強になります。遠慮せず声をかけてください。',
    entrust: '地域の有力者との顔つなぎや、複雑な契約の調整。時間をかけて丁寧に進める交渉はお任せください。',
  },
  {
    id: 'yamaguchi_shinichi', name: '山口 真一', office: '長崎営業所', role: '係長',
    called_short: '山口さん',
    called_full: '山口さんと呼んでください。話が脱線して長くなったら、時計をチラッと見て合図してください（笑）。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '新しいことへの好奇心と行動力で、現場を明るく盛り上げていきたいと思っています。話が脱線しやすいので、時計をチラッと見て合図してもらえると助かります（笑）。',
    strengths: ['好奇心：「これ面白い！」と思ったものにはすぐに首を突っ込んで学びます。知らないことへの興味が仕事のアイデアにつながることが多いです。', '柔軟性：一度決めたことに固執せず、現場の状況に合わせて即座にプランを変更できる身軽さを大切にしています。', '勇気：誰もやりたがらない難しい交渉や失敗するかもしれない挑戦にこそ、一番に手を挙げます。挑戦しなかった後悔よりも、失敗した経験の方が価値があると思っています。'],
    hobby: '街歩きとカメラ。長崎の坂道を撮影するのが好きで、同じ坂でも季節や時間帯によって全く違う表情があります。',
    food: 'ちゃんぽんと、地元の冷たいサイダー。長崎に赴任して初めて食べた本場のちゃんぽんの衝撃は今でも忘れられません。',
    motivation: '①面白いアイデアが採用されたとき。「それいいね！」の一言でテンションが上がります。②イベントが成功して大いに盛り上がったとき。みんなの笑顔を見ると達成感があります。③部下が失敗を恐れず挑戦し始めたとき。自分が背中を見せた甲斐があったと感じます。',
    stress: '夜の海を眺めながらドライブします。長崎の夜景は最高で、どんな悩みも小さく感じられます。',
    value: '「笑う門には福来る」。楽しい雰囲気をつくることが、結果的にいい仕事につながると信じています。',
    support: '話が脱線して長くなったら、時計をチラッと見て合図してください（笑）。気づいたら軌道修正します。',
    entrust: '社内イベントの司会進行や、新規販路のアイデア出し。場を盛り上げることならお任せください。',
  },
  {
    id: 'saito_kenji', name: '斎藤 健二', office: '新潟営業所', role: '所長',
    called_short: '斎藤所長',
    called_full: '斎藤所長と呼んでください。集中すると怖い顔になることがありますが、怒っているわけではないので気軽に声をかけてください。',
    type: 'ドライバー（主導型）',
    type_desc: '大きな目標に向かって、主体的かつ力強く突き進むスタイルです。集中すると怖い顔になることがありますが、怒っているわけではないので気軽に話しかけてください。',
    strengths: ['度胸：大型の商談やトラブル時でも肝が据わっており、ここぞという場面で逃げずに真っ向勝負を仕掛けます。修羅場ほど燃えるタイプです。', '主体性：指示を待たずに自分が何をすべきかを常に考え、真っ先に行動します。「誰かがやってくれる」は禁句です。', '高い志：ただ売るだけでなく「新潟の農業を元気にしたい」という大きな目標を常に心に掲げています。数字の先にある意味を忘れないようにしています。'],
    hobby: '魚釣り（新潟の荒波で）。荒れた海で大物を狙うスリルが最高で、釣れた瞬間の喜びは大型契約の成立に似ています。',
    food: '新米のおむすびと、新潟の銘酒。秋の新米の季節は毎年楽しみで、この味を知ると他の米が食べられなくなります。',
    motivation: '①目標の数字を圧倒的な差で達成したとき。余裕で超えるくらいの成果にこそ価値があると思っています。②部下が「勝ち」にこだわり始めたとき。本気になった目を見ると、こちらも奮い立ちます。③大型の新規契約が決まったとき。長い準備が実を結ぶ瞬間の充実感があります。',
    stress: '温泉の雪見風呂でゆっくりします。雪を眺めながら湯に浸かると、すべての緊張がほどけていきます。',
    value: '「結果が全て」。プロセスも大事にしますが、最後に数字で語れる仕事をしたいです。',
    support: '集中すると怖い顔になることがありますが、怒っているわけではありません。気軽に声をかけてもらえると助かります。',
    entrust: '停滞している目標達成へのラストスパートの鼓舞。チームに火をつけます。',
  },
  {
    id: 'ishii_noriko', name: '石井 典子', office: '鹿児島営業所', role: '事務リーダー',
    called_short: '典子さん',
    called_full: '典子さんと呼んでください。パソコンのシステム不具合などのハード面には少し弱いので、詳しい方はぜひ助けてください。',
    type: 'アナリティカル（分析型）',
    type_desc: '数日先を見越して優先順位を整理し、スムーズな業務の流れをつくることが得意です。パソコンのシステム不具合などのハード面には弱いので、詳しい方はぜひ声をかけてください。',
    strengths: ['段取り：営業所全体の業務が滞らないよう、数日先を見越して優先順位を整理します。「気づいたら準備ができていた」という状態をつくるのが目標です。', '集中力：〆切前の膨大なデータ入力も、驚異的な集中力でミスなく一気に片付けます。集中モードのときは声をかけづらいかもしれませんが、急ぎは遠慮なく。', '几帳面：誰が見ても分かりやすいファイリングや共有データの整理など、細部まで気配りします。「石井さんが整理したデータは見やすい」と言われることが励みです。'],
    hobby: '整理整頓の動画を観ること。プロの収納テクニックに感動して、翌日すぐに実践することがよくあります。',
    food: 'さつま揚げと、熱い緑茶。鹿児島の味が大好きで、出張から帰ってきたときのさつま揚げが最高のご褒美です。',
    motivation: '①自分が組んだ段取り通りに完璧に仕事が回ったとき。計画が実現する達成感があります。②営業さんから「データが見やすくなった」と言われたとき。誰かの仕事が楽になった実感があると嬉しいです。③デスク周りがピカピカになったとき。環境が整うと仕事の質も上がると感じています。',
    stress: '部屋の模様替えを夜通し行います。家具の配置を変えると気分が一新されて、翌朝は別の部屋みたいな清々しさがあります。',
    value: '「備えあれば憂いなし」。トラブルが起きてから慌てるより、起きないようにする準備をすることが私の仕事だと思っています。',
    support: 'パソコンのシステム不具合などのハード面には少し弱いので、詳しい方はぜひ助けてください。その分、事務や資料作成で全力でお返しします。',
    entrust: '複雑な契約書類の不備チェックや、営業所の管理システムの整理。細かい作業はお任せください。',
  },
  {
    id: 'kondo_makoto', name: '近藤 誠', office: '大分営業所', role: 'リーダー',
    called_short: '近藤さん',
    called_full: '近藤さんと呼んでください。頼まれると断れない性格なので、私が抱え込みすぎているように見えたら「手伝おうか？」と声をかけてもらえると救われます。',
    type: 'エミアブル（協調型）',
    type_desc: '一緒に働く仲間を大切にし、思いやりと感謝を持って接することを心がけています。頼まれると断れない性格なので、抱え込みすぎているように見えたら声をかけてください。',
    strengths: ['思いやり：仲間の顔色が悪いときや元気がないときは、そっと差し入れをして声をかけるようにしています。「気づいてくれる人がいる」と思ってもらえる存在でいたいです。', '共感力：失敗して落ち込んでいる人の話を最後まで聴き、自分のことのように心を痛めて一緒に再生を目指します。「話してよかった」と感じてもらえると嬉しいです。', '感謝：周囲の助けがあっての自分だと自覚し、常に謙虚な姿勢と「ありがとう」の言葉を大切にしています。感謝を言葉にし続けることが、チームの空気を変えると信じています。'],
    hobby: '温泉巡り（別府・由布院など）。大分に赴任してから温泉の素晴らしさに目覚め、週末は必ずどこかの湯に浸かっています。',
    food: 'とり天と、冷たい麦茶。大分名物のとり天を初めて食べたとき、なぜ今まで知らなかったんだと思いました。',
    motivation: '①部下が悩みを相談してくれ、解決したときに笑顔が見られたとき。信頼してもらえた実感があります。②自分が教えた後輩が感謝されたとき。間接的に誰かの役に立てた喜びがあります。③みんなで穏やかに食事をしているとき。いい職場だと実感できる瞬間です。',
    stress: '露天風呂でぼーっとします。何も考えずにいられる時間が、翌日への活力をチャージしてくれます。',
    value: '「まずは受け入れる」。相手の話をまず受け入れることで、本当の対話が始まると思っています。',
    support: '頼まれると断れない性格なので、私が抱え込みすぎているように見えたら「手伝おうか？」と声をかけてもらえると救われます。',
    entrust: '営業所の人間関係の円滑化や、新人さんの悩み相談。じっくり話を聴くことならお任せください。',
  },
  {
    id: 'morita_go', name: '森田 剛', office: '静岡営業所', role: '所長',
    called_short: '森田所長',
    called_full: '森田所長と呼んでください。アイデアを出すのは得意ですが誤字脱字が多いので、公的な書類は念入りにチェックをお願いします（笑）。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '既存のやり方に固執せず、常にクリエイティブな発想で現場を盛り上げていきたいと思っています。アイデアは豊富ですが誤字脱字が多いので、書類チェックで助けてもらえると助かります。',
    strengths: ['創造性：野菜の新しい食べ方の提案など、常にクリエイティブな発想を大切にしています。「そんな方法があったのか」と驚いてもらえる瞬間が好きです。', '発想力：一つの物事を多角的に捉え、誰も思いつかないような面白い販促キャンペーンを考えるのが得意です。アイデアは量から質が生まれると思っています。', 'チャレンジ精神：面白いと思ったことは即実行。静岡から全国を驚かせるようなプロジェクトを仕掛けていきたいです。'],
    hobby: '週末のキャンプ。自然の中で料理をしながら過ごす時間が、新しいアイデアをくれます。焚き火を眺めていると頭の中が整理されます。',
    food: 'さわやかのハンバーグと、静岡茶のハイボール。静岡に赴任してから「さわやか」の虜になりました。遠方から訪ねてくれた知人を必ず連れて行きます。',
    motivation: '①自分の出した斬新なアイデアにお客様が「面白い！」と言ってくれたとき。認めてもらえた喜びで次のアイデアが溢れてきます。②誰も見たことがない新しい販路を作ったとき。開拓した実感があります。③営業所が活気に溢れているとき。いい空気の中にいると自然とアイデアが湧いてきます。',
    stress: '波音を聞きながら海辺でコーヒーを飲みます。静岡の海は最高で、ぼーっとしているうちに悩みが小さくなっていきます。',
    value: '「常識を疑う」。当たり前だと思っていることを一度疑ってみることで、新しい答えが見つかると思っています。',
    support: 'アイデアを出すのは得意ですが、誤字脱字が多いです（笑）。公的な書類は念入りにチェックをお願いします。',
    entrust: '新商品のキャッチコピー考案や、他社がやっていない面白い展示の企画。クリエイティブな仕事はお任せください。',
  },
  {
    id: 'maeda_atsushi', name: '前田 敦', office: '宮崎営業所', role: '係長',
    called_short: 'あっちゃん',
    called_full: 'あっちゃんと呼んでください。走りながら考えるため、私の後ろにはいつもやり残した「片付け」があります。そこをフォローしてもらえると最高に助かります。',
    type: 'ドライバー（主導型）',
    type_desc: '考えるよりも先に体が動くタイプです。行動量で現場を引っ張ります。走りながら考えるため片付けが後回しになりがちなので、フォローしてもらえると助かります。',
    strengths: ['実行力：考えるよりも先に体が動きます。圧倒的な行動量で現場を動かし、成果を引き寄せます。「前田がいれば進む」と思ってもらえる存在でいたいです。', '情熱：宮崎の野菜への愛は誰にも負けません。この情熱でお客様を圧倒し、ファンを増やしていきます。', '失敗を活かす力：派手に転ぶこともありますが、そのたびに何かを掴んで立ち上がります。失敗は成功への投資だと思っています。'],
    hobby: 'サーフィン。宮崎の波は最高で、早朝に海に入ると頭が完全にリセットされます。海から上がると仕事のアイデアが溢れてくることが多いです。',
    food: 'チキン南蛮と、宮崎の焼酎。宮崎に来て本物のチキン南蛮を食べたときの衝撃は忘れられません。',
    motivation: '①競合に勝って大型注文を獲ったとき。勝負に勝った達成感が最高です。②「前田さんの熱意に負けたよ」と言われたとき。熱量が伝わった瞬間です。③数字が右肩上がりで伸びているとき。グラフが上を向いているだけでテンションが上がります。',
    stress: '朝の海で波に乗ります。波に乗れた瞬間に集中することで、仕事の悩みが全部吹き飛びます。',
    value: '「明日やろうは馬鹿野郎」。思ったことは今日やる。この一言を座右の銘にしています。',
    support: '走りながら考えるため、私の後ろにはいつもやり残した「片付け」があります。そこをフォローしてもらえると最高に助かります。',
    entrust: '最短時間での配送ルートの最適化や、強気な交渉が必要な場面。スピードと熱量が武器です。',
  },
  {
    id: 'nakajima_mika', name: '中島 美香', office: '神戸営業所', role: 'リーダー',
    called_short: '中島さん・美香さん',
    called_full: '中島さん、または美香さんと呼んでください。感情的に詰め寄られるのが苦手です。相談はSlackやメールで要点をまとめてもらえると、よりスムーズに解決できます。',
    type: 'アナリティカル（分析型）',
    type_desc: '優先順位を瞬時に判断し、論理的に納得した上で最高の結果を目指します。感情的に詰め寄られるのが苦手なので、相談はSlackやメールで要点をまとめてもらえると助かります。',
    strengths: ['冷静沈着：どんなに忙しく電話が鳴り止まない状況でも、優先順位を瞬時に判断し、涼しい顔で仕事をこなします。慌てることで問題は解決しないと思っています。', '論理的思考：「なぜこの業務が必要か」を論理的に納得した上で動きます。曖昧なままで進めることが苦手で、目的と手段を整理してから取り組む姿勢を大切にしています。', 'プレゼンス：発言回数は多くありませんが、ここぞというときに一言で空気を引き締めます。「中島さんが言うなら」と思ってもらえる存在でいたいです。'],
    hobby: 'ジャズ鑑賞とカフェ巡り。神戸の洗練されたカフェでジャズを聴きながら本を読む時間が、最高のリフレッシュです。',
    food: '神戸牛のステーキと、キレのある辛口のワイン。神戸に赴任したことで食の水準が上がりすぎて困っています（笑）。',
    motivation: '①複雑なパズルのような在庫管理を完璧に解いたとき。論理的に解決できた達成感があります。②自分のプレゼン資料で大型クライアントが納得したとき。伝わった手応えがたまりません。③無駄のない洗練された仕事ができたとき。無駄がない状態が一番美しいと思っています。',
    stress: 'ホテルのラウンジで静かに読書します。上質な空間で本を読むと、頭の中が整理されてすっきりします。',
    value: '「洗練と合理性」。美しく、無駄なく、伝わる仕事をすることを目指しています。',
    support: '感情的に詰め寄られるのが苦手です。相談はSlackやメールなどで要点をまとめていただけると、よりスムーズに解決できます。',
    entrust: '重要なプレゼン資料のロジック構築や、営業所全体の数字の管理。精緻な仕事はお任せください。',
  },
  {
    id: 'sakamoto_ryuhei', name: '坂本 龍平', office: '高知営業所', role: '所長',
    called_short: '坂本所長',
    called_full: '坂本所長と呼んでください。夢が大きすぎて足元がおろそかになることがあるので、現実的な「ツッコミ」を随時入れてもらえると助かります。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '大きな夢を本気で語り続け、個性的なメンバーを束ねてうねりをつくっていきたいと思っています。夢が大きすぎて足元がおろそかになることがあるので、現実的なツッコミをお願いします。',
    strengths: ['高い志：高知から農業の歴史を変えたいという大きな夢を常に抱いています。その夢を本気で語り続けることで、周りを動かしていきたいです。', '自己開示：部下に対しても自分の弱みや本音を曝け出します。嘘のない関係から本当の信頼が生まれると思っています。', 'チームワーク：個性的なメンバーを束ねて一つの大きなうねりにするリーダーシップを発揮したいです。バラバラのエネルギーを一点に集めるのが好きです。'],
    hobby: '幕末の歴史探訪。龍馬ゆかりの地を巡るたびに、志を持って動いた人間の力を感じます。歴史から仕事へのヒントをもらうことが多いです。',
    food: 'カツオのタタキと、土佐の強めの地酒。高知の食文化は「豪快」の一言で、初めて食べたときの衝撃は忘れられません。',
    motivation: '①産地の農家さんが素晴らしい野菜を信頼して託してくれたとき。その信頼に応えたいという気持ちが最大の力になります。②飲み会でみんなが志を熱く語り合ったとき。本音で話せる仲間がいる実感があります。③新しい流通の仕組みが成功したとき。誰もやっていないことを形にできた達成感があります。',
    stress: '太平洋を眺めながら「よし！」と心の中で叫びます。大きな海を前にすると、悩みが小さく思えてきます。',
    value: '「改善し続ける」。現状に満足せず、営業所を、会社をより良くし続けることを誓っています。',
    support: '夢が大きすぎて足元がおろそかになることがあります。現実的な「ツッコミ」を随時入れていただけると助かります。',
    entrust: '頑固な取引先との新規提携や、営業所のビジョンづくり。情熱で動かします。',
  },
];

const groupsClean = [
  { label: '東京本社', ids: ['sato_kenichi', 'ito_yui'] },
  { label: '札幌営業所', ids: ['takahashi_hiroki'] },
  { label: '仙台営業所', ids: ['abe_kento'] },
  { label: '新潟営業所', ids: ['saito_kenji'] },
  { label: '名古屋営業所', ids: ['nakamura_yuki'] },
  { label: '金沢営業所', ids: ['kobayashi_keiko'] },
  { label: '京都営業所', ids: ['okada_jun'] },
  { label: '大阪営業所', ids: ['kato_shota'] },
  { label: '神戸営業所', ids: ['nakajima_mika'] },
  { label: '広島営業所', ids: ['sasaki_mai'] },
  { label: '高松営業所', ids: ['hayashi_naoki'] },
  { label: '高知営業所', ids: ['sakamoto_ryuhei'] },
  { label: '福岡営業所', ids: ['kimura_takuya'] },
  { label: '長崎営業所', ids: ['yamaguchi_shinichi'] },
  { label: '宮崎営業所', ids: ['maeda_atsushi'] },
  { label: '大分営業所', ids: ['kondo_makoto'] },
  { label: '静岡営業所', ids: ['morita_go'] },
  { label: '岡山営業所', ids: ['shimizu_sakura'] },
  { label: '鹿児島営業所', ids: ['ishii_noriko'] },
];

const memberMap = {};
members.forEach(m => memberMap[m.id] = m);

function getInitial(name) { return name.replace(/\s/g, '')[0]; }
const colors = ['#1e3a5f','#2c5282','#1a365d','#2b4c7e','#243b55','#1e4d8c','#162d4a'];

// index.html（パスワードページ）は既存のまま流用
const indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHTML, 'utf8');

// list.html
const groupsJSON = JSON.stringify(groupsClean);
const membersJSON = JSON.stringify(members.map(m => ({id:m.id, name:m.name, office:m.office, role:m.role, called_short:m.called_short})));

const listHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>メンバー一覧 | 私のトリセツ</title>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root { --navy:#1e3a5f;--navy-dark:#162d4a;--navy-light:#eef2f7;--gold:#c9a84c;--gold-light:#f5edda;--white:#fff;--text:#1a2535;--text-light:#5a6a80;--border:#dde3ec; }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Noto Sans JP',sans-serif;background:var(--navy-light);min-height:100vh;color:var(--text);padding-bottom:48px}
  header{background:var(--navy);padding:0 20px;height:60px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 2px 16px rgba(30,58,95,.3)}
  .hlogo{width:32px;height:32px;background:var(--gold);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .hlogo svg{width:18px;height:18px;fill:var(--navy)}
  .htitle{font-family:'Shippori Mincho',serif;font-size:17px;font-weight:700;color:white;letter-spacing:.05em}
  .hsub{font-size:10px;color:rgba(255,255,255,.6);letter-spacing:.1em;display:block}
  .search-area{padding:20px 16px 4px;max-width:600px;margin:0 auto;position:relative}
  .search-area input{width:100%;padding:13px 16px 13px 44px;border:1.5px solid var(--border);border-radius:50px;font-size:14px;font-family:'Noto Sans JP',sans-serif;background:white;color:var(--text);outline:none;transition:border-color .2s,box-shadow .2s}
  .search-area input:focus{border-color:var(--navy);box-shadow:0 0 0 3px rgba(30,58,95,.08)}
  .search-icon{position:absolute;left:30px;top:50%;transform:translateY(-18%);font-size:17px;color:var(--text-light);pointer-events:none}
  .count{text-align:center;font-size:11px;color:var(--text-light);padding:8px 0 2px;letter-spacing:.05em}
  .list{padding:8px 16px;max-width:600px;margin:0 auto}
  .group-label{font-family:'Shippori Mincho',serif;font-size:12px;font-weight:700;color:var(--navy);letter-spacing:.1em;padding:16px 4px 6px;display:flex;align-items:center;gap:8px}
  .group-label::after{content:'';flex:1;height:1px;background:var(--border)}
  .card{background:white;border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--text);margin-bottom:8px;box-shadow:0 2px 8px rgba(30,58,95,.06);border:1px solid var(--border);transition:transform .15s,box-shadow .15s,border-color .15s;animation:fadeUp .4s ease both}
  .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(30,58,95,.12);border-color:rgba(30,58,95,.2)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .avatar{width:46px;height:46px;border-radius:50%;background:var(--navy);color:white;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;flex-shrink:0}
  .info{flex:1;min-width:0}
  .name{font-size:15px;font-weight:700;margin-bottom:2px}
  .role{font-size:11px;color:var(--gold);font-weight:700;letter-spacing:.05em;margin-bottom:2px}
  .called{font-size:11px;color:var(--text-light)}
  .arr{color:var(--border);font-size:20px}
  .no-result{text-align:center;padding:60px 20px;color:var(--text-light);font-size:14px;display:none}
</style>
</head>
<body>
<header>
  <div class="hlogo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
  <div><span class="hsub">BLOOM SHOJI CO., LTD.</span><div class="htitle">私のトリセツ</div></div>
</header>
<div class="search-area">
  <span class="search-icon">🔍</span>
  <input type="search" id="q" placeholder="名前・営業所・役職で検索" oninput="search()">
</div>
<p class="count" id="count"></p>
<div class="list" id="list"></div>
<p class="no-result" id="noResult">該当するメンバーが見つかりません</p>
<script>
  if(!sessionStorage.getItem('auth')) location.href='index.html';
  const groups=${groupsJSON};
  const allMembers=${membersJSON};
  const memberMap={};
  allMembers.forEach(m=>memberMap[m.id]=m);
  function initial(name){return name.replace(/\\s/g,'')[0]}
  function cardHTML(m,i){return \`<a class="card" href="\${m.id}.html" style="animation-delay:\${i*.04}s"><div class="avatar">\${initial(m.name)}</div><div class="info"><div class="name">\${m.name}</div><div class="role">\${m.office}　\${m.role}</div><div class="called">「\${m.called_short}」と呼んでください</div></div><div class="arr">›</div></a>\`}
  function renderGroups(){let html='';let total=0;let i=0;groups.forEach(g=>{const ms=g.ids.map(id=>memberMap[id]).filter(Boolean);if(!ms.length)return;html+=\`<div class="group-label">📍 \${g.label}</div>\`;ms.forEach(m=>{html+=cardHTML(m,i++);total++;});});document.getElementById('noResult').style.display='none';document.getElementById('count').textContent=\`\${total}名のトリセツ\`;document.getElementById('list').innerHTML=html;}
  function search(){const q=document.getElementById('q').value.trim();if(!q){renderGroups();return;}const filtered=allMembers.filter(m=>m.name.includes(q)||m.office.includes(q)||m.role.includes(q)||m.called_short.includes(q));document.getElementById('count').textContent=\`\${filtered.length}名\`;if(!filtered.length){document.getElementById('list').innerHTML='';document.getElementById('noResult').style.display='block';}else{document.getElementById('noResult').style.display='none';document.getElementById('list').innerHTML=filtered.map((m,i)=>cardHTML(m,i)).join('');}}
  renderGroups();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'list.html'), listHTML, 'utf8');
console.log('✓ list.html');

// 個人ページ
members.forEach((m, idx) => {
  const color = colors[idx % colors.length];
  const strengthsHTML = m.strengths.map(s => `<li>${s}</li>`).join('');

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${m.name} のトリセツ | Bloom商事</title>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root{--navy:#1e3a5f;--navy-light:#eef2f7;--gold:#c9a84c;--gold-light:#f5edda;--white:#fff;--text:#1a2535;--text-light:#5a6a80;--border:#dde3ec;--accent:${color}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Noto Sans JP',sans-serif;background:var(--navy-light);min-height:100vh;color:var(--text);padding-bottom:48px}
  .hero{background:var(--accent);padding:0 0 28px;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;background:rgba(255,255,255,.06);border-radius:50%}
  .hero::after{content:'';position:absolute;bottom:-80px;left:-40px;width:200px;height:200px;background:rgba(201,168,76,.12);border-radius:50%}
  .back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.8);text-decoration:none;font-size:13px;padding:16px 20px 8px;font-weight:500;position:relative;z-index:1}
  .back:hover{color:white}
  .hero-body{padding:12px 24px 0;position:relative;z-index:1}
  .office-tag{display:inline-block;background:rgba(255,255,255,.18);color:white;font-size:10px;padding:3px 12px;border-radius:50px;margin-bottom:10px;letter-spacing:.08em;font-weight:700}
  .role-tag{display:inline-block;background:var(--gold);color:var(--navy);font-size:10px;padding:3px 10px;border-radius:50px;margin-left:6px;font-weight:700;letter-spacing:.05em}
  .name-row{display:flex;align-items:center;gap:14px}
  .avatar{width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.2);border:3px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:white;flex-shrink:0}
  .hero h1{font-family:'Shippori Mincho',serif;font-size:26px;font-weight:700;color:white;letter-spacing:.05em}
  .content{padding:20px 16px;max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  .sec{background:white;border-radius:14px;padding:18px 20px;box-shadow:0 2px 8px rgba(30,58,95,.06);border:1px solid var(--border);animation:fadeUp .4s ease both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .sec:nth-child(1){animation-delay:.05s}.sec:nth-child(2){animation-delay:.1s}.sec:nth-child(3){animation-delay:.15s}.sec:nth-child(4){animation-delay:.2s}.sec:nth-child(5){animation-delay:.25s}.sec:nth-child(6){animation-delay:.3s}.sec:nth-child(7){animation-delay:.35s}.sec:nth-child(8){animation-delay:.4s}
  .sec-label{font-size:10px;font-weight:700;color:var(--accent);letter-spacing:.12em;margin-bottom:5px}
  .sec-title{font-size:13px;font-weight:700;color:var(--text-light);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:5px}
  .sec-body{font-size:14px;line-height:1.8;color:var(--text)}
  .type-box{background:var(--navy-light);border-left:3px solid var(--accent);border-radius:0 10px 10px 0;padding:12px 14px;margin-bottom:8px}
  .type-name{font-weight:700;font-size:14px;color:var(--accent);margin-bottom:5px}
  .strengths{list-style:none;display:flex;flex-direction:column;gap:8px}
  .strengths li{background:var(--navy-light);border-radius:10px;padding:10px 14px 10px 28px;font-size:13px;line-height:1.65;position:relative}
  .strengths li::before{content:'◆';position:absolute;left:10px;top:12px;color:var(--gold);font-size:8px}
  .gold-highlight{background:var(--gold-light);border-left:3px solid var(--gold);border-radius:0 10px 10px 0;padding:12px 14px;font-size:14px;line-height:1.8;color:var(--text)}
</style>
</head>
<body>
<div class="hero">
  <a class="back" href="list.html">‹ 一覧に戻る</a>
  <div class="hero-body">
    <div><span class="office-tag">${m.office}</span><span class="role-tag">${m.role}</span></div>
    <div class="name-row"><div class="avatar">${getInitial(m.name)}</div><h1>${m.name}</h1></div>
  </div>
</div>
<div class="content">
  <div class="sec">
    <div class="sec-label">A-1</div>
    <div class="sec-title">呼ばれたい名前</div>
    <div class="sec-body">${m.called_full}</div>
  </div>
  <div class="sec">
    <div class="sec-label">A-5</div>
    <div class="sec-title">コミュニケーションスタイル</div>
    <div class="type-box"><div class="type-name">${m.type}</div><div class="sec-body">${m.type_desc}</div></div>
  </div>
  <div class="sec">
    <div class="sec-label">A-6</div>
    <div class="sec-title">持ち味（3つ）</div>
    <ul class="strengths">${strengthsHTML}</ul>
  </div>
  <div class="sec">
    <div class="sec-label">B-1 / B-2</div>
    <div class="sec-title">趣味・好きなもの</div>
    <div class="sec-body"><p style="margin-bottom:8px"><strong>趣味・マイブーム：</strong>${m.hobby}</p><p><strong>好きな食べ物・飲み物：</strong>${m.food}</p></div>
  </div>
  <div class="sec">
    <div class="sec-label">C-1</div>
    <div class="sec-title">やる気がでるとき</div>
    <div class="sec-body">${m.motivation}</div>
  </div>
  <div class="sec">
    <div class="sec-label">D-3</div>
    <div class="sec-title">ストレス発散方法</div>
    <div class="sec-body">${m.stress}</div>
  </div>
  <div class="sec">
    <div class="sec-label">仕事上の価値観</div>
    <div class="sec-title">大切にしていること</div>
    <div class="gold-highlight">${m.value}</div>
  </div>
  <div class="sec">
    <div class="sec-label">サポート情報</div>
    <div class="sec-title">サポートしてもらえると助かること</div>
    <div class="sec-body" style="margin-bottom:14px">${m.support}</div>
    <div class="sec-title" style="margin-top:12px">任せてほしいこと</div>
    <div class="sec-body">${m.entrust}</div>
  </div>
</div>
<script>if(!sessionStorage.getItem('auth'))location.href='index.html';</script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, `${m.id}.html`), html, 'utf8');
  console.log(`✓ ${m.name}`);
});

console.log(`\n完了！`);
