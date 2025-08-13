(() => {
  // ====== CONFIG ======
  const USE_DYNAMIC_GENERATION = false; // set true only if you connect a backend

  // ====== Caption Templates ======
  const CAPTION_DB = {
    Witty: [
      "{product} just dropped! Grab it before it trends on someone else's feed. #{product} #DontSleepOnThis",
      "If your day needs a plot twist, {product} is it. #{product} #PlotTwist",
      "Not to brag, but {product} makes mornings behave. #{product} #MorningWin",
      "Buy {product}. Your future self will high-five you. #{product} #TreatYourself",
      "New drop: {product}. Because basic is boring. #{product} #BeDifferent",
      "{product} — because your routine deserves a mic drop. #{product} #MicDrop",
      "This is the sign to finally try {product}. You're welcome. #{product} #JustDoIt",
      "Make them ask where you got it. {product}. #{product} #WhereToCop",
      "Small box, big mood. {product} changes things. #{product} #SmallBoxBigMood",
      "Your captions were missing {product}. Fixed. #{product} #CaptionUpgrade",
      "Ever seen perfection? Meet {product}. #{product} #PerfectionFound",
      "Turn heads, start trends — {product}. #{product} #TrendSetter",
      "Life’s too short for boring. {product}. #{product} #SpiceItUp",
      "Plot twist: {product} is all you needed. #{product} #DailyUpgrade",
      "Serving main-character energy with {product}. #{product} #MainCharacter",
      "Because your feed deserves {product}. #{product} #FeedGoals",
      "Add to cart, add to life — {product}. #{product} #CartGoals",
      "Looks, style, vibes: {product}. #{product} #VibeDealer",
      "Screaming, crying, obsessed — {product}. #{product} #Obsessed"
    ],
    Luxe: [
      "Elevate your routine with {product}. Pure sophistication awaits. #{product} #LuxuryLiving",
      "Minimal effort, maximum elegance — {product}. #{product} #Refined",
      "Curated for connoisseurs: {product}. #{product} #PremiumPick",
      "Where design meets ritual — {product}. #{product} #Elegance",
      "An investment in your presence: {product}. #{product} #Timeless",
      "{product} — the finishing touch your morning deserved. #{product} #Polish",
      "Indulge in quiet luxury with {product}. #{product} #QuietLuxury",
      "Crafted to perfection: {product}. #{product} #Exquisite",
      "Savor the details — {product}. #{product} #LuxuryDefined",
      "Where class meets comfort — {product}. #{product} #EffortlessLuxury"
    ],
    GenZ: [
      "Lowkey obsessed with {product}. Try it and thank me later. #{product} #VibeCheck",
      "POV: You found {product} and your feed improved. #{product} #FYP",
      "This one slaps. {product} for the win. #{product} #Slaps",
      "No cap — {product} is a mood. #{product} #NoCap",
      "If it ain't {product}, it ain't worth the swipe. #{product} #WorthIt",
      "Hot take: {product} is the upgrade your cart needed. #{product} #CartUpgrade",
      "Main character energy? That’s {product}. #{product} #MCEnergy",
      "Just dropped: {product}. Now go break the internet. #{product} #DropAlert",
      "Not me, but {product} stealing the spotlight. #{product} #StealTheShow",
      "Outfit check: incomplete without {product}. #{product} #OOTD"
    ],
    Wellness: [
      "Nourish from the outside in — {product}. #{product} #SelfCare",
      "Soothe your routine with {product}. Gentle, effective, kind. #{product} #Wellness",
      "Small steps, big results: add {product} to your ritual. #{product} #Ritual",
      "Because your body deserves gentle care: {product}. #{product} #Holistic",
      "Pause. Breathe. Apply {product}. #{product} #MindfulMoments",
      "{product} — crafted to support your daily calm. #{product} #DailyCalm",
      "Center your mind, refresh your skin — {product}. #{product} #MindBodyGlow",
      "Your wellness journey starts with {product}. #{product} #StartToday",
      "Daily dose of calm: {product}. #{product} #CalmVibes",
      "Balance restored with {product}. #{product} #FindYourBalance"
    ],
    ROAST: [
      "Launching a new {product}? Cool. Just don't call it game-changing unless it plays one. #{product} #BeReal",
      "{product}? Bold move. Now make your vibe match that ambition. #{product} #StepItUp",
      "Nice packaging, but does {product} do the job? Let's see. #{product} #ProveIt",
      "If {product} had standards, they'd be higher. Time to prove it. #{product} #ComeCorrect",
      "Everyone's hyping {product} — we'll judge once it's earned it. #{product} #HypeCheck",
      "Bold claim, but {product} better deliver. #{product} #TalkIsCheap",
      "{product} has potential… if you can back it up. #{product} #ProveYourWorth",
      "Seen better. But hey, maybe {product} will surprise us. #{product} #PlotTwistNeeded"
    ]
  };

  const EMOJI_DB = {
    Witty: ['😏','🔥','😉','🎉','✨','💥','👏','🤩','🫶','💫'],
    Luxe: ['💎','✨','🌙','🥂','🖤','👑','🌟','🏷️','💫','🕊️'],
    GenZ: ['💅','😎','📸','🤌','⚡','🎧','🫡','🤳','🔥','💥'],
    Wellness: ['🌿','🧘','💧','🌸','☕','🌞','🕊️','🍃','🫧','✨'],
    ROAST: ['😏','🤨','😬','😅','🔥','👀','🙃','🫢','💥','🤌']
  };

  const CTA_PHRASES = [
    "Shop now", "Tap to shop", "Limited offer", "Grab yours", 
    "Don’t miss out", "In stores now", "Link in bio", 
    "Add to cart", "Your move", "Get it today"
  ];

  // ===== Helper functions =====
  const $ = id => document.getElementById(id);

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function cleanTag(text = "") {
    return text.trim().replace(/[^\w\s]/gi,'').replace(/\s+/g,'');
  }

  function generateHashtags(product, tone, occasion, count = 25) {
    const base = cleanTag(product);
    const tags = new Set();
    tags.add(base);
    tags.add(`${base}Official`);
    if (occasion) tags.add(cleanTag(occasion));
    const generic = [
      'ShopNow','InstaFinds','NewArrival','DailyEssentials','MustHave',
      'SmallBusiness','MadeForYou','TrendingNow','StyleInspo','GiftGuide',
      'TopPick','LimitedEdition','SelfCare','BeautyRoutine','GlowUp'
    ];
    shuffle(generic).forEach(t => tags.add(t));
    while (tags.size < count) tags.add(`${base}${Math.floor(Math.random()*100)}`);
    return Array.from(tags).slice(0, count);
  }

  function generateEmojis(tone, count = 5) {
    const bank = EMOJI_DB[tone] || EMOJI_DB.Witty;
    return shuffle(bank).slice(0, count);
  }

  function formatTemplate(tpl, product, occasion) {
    return tpl.replace(/\{product\}/g, product).replace(/\{occasion\}/g, occasion || '');
  }

  function generateCaptions(product, tone, occasion, roast) {
    const pickTone = roast ? 'ROAST' : tone;
    let templates = CAPTION_DB[pickTone] || [];
    Object.keys(CAPTION_DB).forEach(k => {
      if (k !== pickTone) templates = templates.concat(CAPTION_DB[k]);
    });
    templates = shuffle(templates);
    const output = [];
    const used = new Set();
    let i = 0;
    while (output.length < 23 && i < templates.length) {
      const tpl = templates[i];
      if (!used.has(tpl)) {
        used.add(tpl);
        const captionText = `${formatTemplate(tpl, product, occasion)} ${generateEmojis(pickTone, 5).join(' ')}\n\n${CTA_PHRASES[Math.floor(Math.random()*CTA_PHRASES.length)]}.`;
        output.push({
          id: `c-${output.length+1}`,
          caption: captionText,
          hashtags: generateHashtags(product, tone, occasion),
          emojis: generateEmojis(pickTone)
        });
      }
      i++;
    }
    return output;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = $("captionForm");
    const captionsSection = $("captionsSection");
    const captionsContainer = $("captionsContainer");

    function renderCaptions(captions) {
      captionsContainer.innerHTML = "";
      captions.forEach(item => {
        const el = document.createElement('div');
        el.className = "p-4 rounded-lg bg-white border border-gray-100 fade-in";
        el.innerHTML = `
          <div class="flex justify-between items-start gap-3">
            <div class="flex-1">
              <div class="text-sm text-gray-700 whitespace-pre-wrap">${item.caption}</div>
              <div class="mt-3 text-xs text-gray-500"><strong>Hashtags:</strong> ${item.hashtags.map(h=>`#${h}`).join(' ')}</div>
            </div>
            <div>
              <button data-copy="${item.caption}" class="copyBtn bg-[#01772C] text-white px-3 py-1 rounded text-sm hover:opacity-90">Copy</button>
            </div>
          </div>
        `;
        captionsContainer.appendChild(el);
      });

      captionsContainer.querySelectorAll('.copyBtn').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(btn.dataset.copy);
            btn.textContent = "Copied!";
            setTimeout(()=>btn.textContent = "Copy", 1000);
          } catch {
            alert("Copy not supported. Please select and copy manually.");
          }
        });
      });
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      const product = $("productName").value.trim();
      const tone = $("tone").value;
      const occasion = $("occasion").value.trim();
      const roast = $("roastToggle").checked;
      if (!product) return;
      const captions = generateCaptions(product, tone, occasion, roast);
      renderCaptions(captions);
      captionsSection.classList.remove("hidden");
    });

    $("regenerateBtn").addEventListener("click", () => {
      const product = $("productName").value.trim();
      const tone = $("tone").value;
      const occasion = $("occasion").value.trim();
      const roast = $("roastToggle").checked;
      if (!product) return;
      const captions = generateCaptions(product, tone, occasion, roast);
      renderCaptions(captions);
    });

    $("downloadBtn").addEventListener("click", () => {
      const data = [];
      captionsContainer.querySelectorAll('.text-sm.text-gray-700').forEach(div => {
        data.push(div.innerText);
      });
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "captions.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    $("clearBtn").addEventListener("click", () => {
      $("productName").value = '';
      $("occasion").value = '';
      $("roastToggle").checked = false;
      captionsContainer.innerHTML = '';
      captionsSection.classList.add('hidden');
    });
  });
})();
