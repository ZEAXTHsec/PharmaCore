/* =====================================================
   LASTDAY.JS — Last Day Exam Survival Guide
   PharmaCore · D.Pharma Year 1
   Two modes: 'english' and 'hinglish'
   ===================================================== */

window.lastDayData = {

  subjects: [
    {
      id: 'pharmaceutics',
      label: 'Pharmaceutics',
      icon: '💊',
      color: '#4f8ef7',
      topics: [

        {
          id: 'ld_ph_1',
          title: 'Tablet Types',
          emoji: '💊',
          tags: ['4yr', 'Part A', 'MCQ'],
          english: {
            hook: 'EVERY year asks this. 9 types. One sentence each.',
            points: [
              { text: 'Compressed — basic tablet, direct pressure', highlight: true },
              { text: 'Sugar coated — outer sugar layer, bitter drugs (disintegrates in 60 min)', highlight: false },
              { text: 'Film coated — thin polymer film, faster than sugar coat', highlight: false },
              { text: 'Enteric coated — dissolves in INTESTINE, not stomach (protects stomach)', highlight: true },
              { text: 'Effervescent — dissolves in water releasing CO₂ (acid + base + drug)', highlight: false },
              { text: 'Sustained release — slow drug release over time', highlight: true },
              { text: 'Dispersible — disperses in water before swallowing', highlight: false },
              { text: 'Chewable — chewed, no water needed (antacids, vitamins)', highlight: false },
              { text: 'Buccal/Sublingual — placed under tongue or cheek, bypasses liver', highlight: true },
            ],
            memory_trick: '🧠 Memory trick: "Compressed Sugar Film Enters Every Sustain Daily Chewing Buccally" — first letter of each type!',
            exam_tip: '⚡ Exam tip: Enteric coated = intestine (never stomach). Sugar coat = 60 min disintegration. Both come every year!',
          },
          hinglish: {
            hook: 'Bhai ye toh seedha question hai — 9 types yaad karo, marks pakke!',
            points: [
              { text: 'Compressed — simple wali tablet, pressure se banti hai', highlight: true },
              { text: 'Sugar coated — upar se meetha, andar kadwa — 60 min mein dissolve hoti hai pet mein', highlight: false },
              { text: 'Film coated — pati si layer, sugar coat se jaldi dissolve', highlight: false },
              { text: 'Enteric coated — AANTEIN mein dissolve hoti hai, pet mein nahi — stomach protect karta hai', highlight: true },
              { text: 'Effervescent — paani mein daalo, CO₂ nikle, fizz ho jaye', highlight: false },
              { text: 'Sustained release — dheere dheere dawai deta hai', highlight: true },
              { text: 'Dispersible — paani mein ghulao phir peeyo', highlight: false },
              { text: 'Chewable — chabaane wali, paani nahi chahiye (antacid, vitamin)', highlight: false },
              { text: 'Buccal/Sublingual — tongue ke neeche ya gaal mein — liver bypass karta hai', highlight: true },
            ],
            memory_trick: '🧠 Trick: "Compressed Sugar Film Enters Every Sustain Daily Chewing Buccally" — pehla letter lelo har type ka, aur yaad ho jayega!',
            exam_tip: '⚡ Yaad rakho: Enteric = aantein. Sugar coat = 60 min. Dono har saal aate hain!',
          }
        },

        {
          id: 'ld_ph_2',
          title: 'Manufacturing Methods of Tablets',
          emoji: '🏭',
          tags: ['4yr', 'Part A'],
          english: {
            hook: '3 methods only. Learn the difference — it\'s always Part A.',
            points: [
              { text: 'Wet Granulation — Mix → Granulate (wet) → Dry → Compress. Most common method.', highlight: true },
              { text: 'Dry Granulation (Slugging) — No liquid used. For moisture-sensitive drugs. Powder → Slugs → Break → Compress', highlight: true },
              { text: 'Direct Compression — Just mix and compress. Fastest. Needs good flow. (eg: aspirin, paracetamol)', highlight: true },
              { text: 'Tablet evaluation tests: Weight variation, Hardness, Friability, Disintegration, Dissolution', highlight: false },
            ],
            memory_trick: '🧠 WDD — Wet, Dry, Direct. Wet = most common. Dry = no water. Direct = fastest.',
            exam_tip: '⚡ Wet granulation steps in order: Mixing → Granulation → Drying → Compression → Coating',
          },
          hinglish: {
            hook: 'Sirf 3 tarike hain — WDD. Bhai ek baar dhang se padh lo, Part A pakka hai!',
            points: [
              { text: 'Wet Granulation — Mix karo → Geelapan se granule banao → Sukha lo → Compress karo. Sabse zyada use hota hai.', highlight: true },
              { text: 'Dry Granulation (Slugging) — Paani nahi dalte. Kyon? Kyunki dawai paani se kharab ho jaati. Powder → Slugs → Todo → Compress', highlight: true },
              { text: 'Direct Compression — Seedha mix karo aur daba do. Fastest! Aspirin, paracetamol aise bante hain.', highlight: true },
              { text: 'Testing: Weight variation, Hardness, Friability (tootna), Disintegration, Dissolution', highlight: false },
            ],
            memory_trick: '🧠 WDD yaad karo — Wet, Dry, Direct. Wet = sabse common. Dry = paani nahi. Direct = sabse fast.',
            exam_tip: '⚡ Wet granulation ka order: Mixing → Granulation → Drying → Compression → Coating — seedha likh dena!',
          }
        },

        {
          id: 'ld_ph_3',
          title: 'Emulsions — Types & Ratios',
          emoji: '🧴',
          tags: ['4yr', 'MCQ', 'Part B'],
          english: {
            hook: 'The 4:2:1 ratio is asked EVERY single year. Never forget it.',
            points: [
              { text: 'Emulsion = two immiscible liquids (oil + water) + emulsifying agent', highlight: false },
              { text: 'Fixed oil emulsion ratio — Oil : Water : Gum = 4 : 2 : 1', highlight: true },
              { text: 'Volatile oil emulsion ratio — Oil : Water : Gum = 2 : 2 : 1', highlight: true },
              { text: 'O/W emulsion (Oil in Water) — oil drops in water. Washable, non-greasy. Example: milk', highlight: false },
              { text: 'W/O emulsion (Water in Oil) — water drops in oil. Greasy feel. Example: cold cream, butter', highlight: false },
              { text: 'HLB value: O/W needs high HLB (8-16), W/O needs low HLB (3-6)', highlight: true },
              { text: 'Emulsifying agents: Acacia (gum), Tragacanth, Beeswax, Lecithin', highlight: false },
            ],
            memory_trick: '🧠 Fixed oil = 4:2:1 (four-two-one). Volatile = 2:2:1 (two-two-one). Fixed has MORE oil so MORE gum!',
            exam_tip: '⚡ MCQ favourite: Fixed oil = 4:2:1. This alone can get you 1 mark every year!',
          },
          hinglish: {
            hook: '4:2:1 ratio har saal aata hai bhai — ek baar dil mein bitha lo, marks free mein aayenge!',
            points: [
              { text: 'Emulsion = tel + paani + emulsifier mix karo. Dono ghulte nahi toh emulsifier lagta hai!', highlight: false },
              { text: 'Fixed oil ka ratio — Tel : Paani : Gum = 4 : 2 : 1', highlight: true },
              { text: 'Volatile oil ka ratio — Tel : Paani : Gum = 2 : 2 : 1', highlight: true },
              { text: 'O/W emulsion — tel ki boondein paani mein. Dhoye ja sake. Dudh jaisa!', highlight: false },
              { text: 'W/O emulsion — paani ki boondein tel mein. Chikna feel. Cold cream, butter jaisa!', highlight: false },
              { text: 'HLB value: O/W ke liye zyada (8-16), W/O ke liye kam (3-6)', highlight: true },
            ],
            memory_trick: '🧠 Fixed = 4:2:1 yaad karo — "Char Do Ek". Volatile = 2:2:1 — "Do Do Ek". Simple hai!',
            exam_tip: '⚡ MCQ mein Fixed oil = 4:2:1 seedha likho — guaranteed 1 mark!',
          }
        },

        {
          id: 'ld_ph_4',
          title: 'Filtration — Darcy\'s Law',
          emoji: '🔬',
          tags: ['4yr', 'MCQ'],
          english: {
            hook: 'One law, asked every year. Darcy\'s Law. Done.',
            points: [
              { text: 'Filtration theory is based on Darcy\'s Law', highlight: true },
              { text: 'Darcy\'s Law: Rate of filtration ∝ Pressure × Area / (Viscosity × Filter cake thickness)', highlight: false },
              { text: 'Sintered glass filter Grade 4 = used for sterile filtration', highlight: true },
              { text: 'Filtration equipment: Plate and frame filter press, Sparkler filter, Membrane filter', highlight: false },
              { text: 'Cyclone separator = used for size separation (not filtration but asked with it)', highlight: false },
            ],
            memory_trick: '🧠 Darcy = Filtration. Done. Write "Darcy\'s Law" and explain: more pressure → more filtration rate.',
            exam_tip: '⚡ MCQ: Filtration theory = Darcy\'s Law (NOT Stoke\'s law, NOT Kick\'s law)',
          },
          hinglish: {
            hook: 'Ek hi law hai bhai — Darcy\'s Law. Likhna aa jaye toh 1 mark pakka!',
            points: [
              { text: 'Filtration theory = Darcy\'s Law — bas itna yaad rakho!', highlight: true },
              { text: 'Matlab: jitna zyada pressure, utna zyada filtration', highlight: false },
              { text: 'Sterile filtration ke liye Grade 4 sintered glass filter use hota hai', highlight: true },
              { text: 'Cyclone separator = size alag karne ke liye use hota hai', highlight: false },
            ],
            memory_trick: '🧠 "Darcy ne filter ki theory di" — bas yahi yaad rakho. MCQ mein Darcy\'s Law select karo.',
            exam_tip: '⚡ Dhyan rakho: Darcy = Filtration. Stoke\'s = particle settling. Confuse mat karna!',
          }
        },

        {
          id: 'ld_ph_5',
          title: 'Parenterals & Pyrogens',
          emoji: '💉',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'Parenterals = injections. 3 key things to remember.',
            points: [
              { text: 'Parenterals = sterile dosage forms given by injection (bypasses GI tract)', highlight: false },
              { text: 'Large Volume Parenterals (LVP) = Infusion fluids (>100 ml, e.g., IV drips)', highlight: true },
              { text: 'Small Volume Parenterals (SVP) = <100 ml (injections, ampoules)', highlight: false },
              { text: 'Pyrogens = metabolic products of microbial growth → cause FEVER', highlight: true },
              { text: 'Pyrogen test = Rabbit test (LAL test = Limulus Amebocyte Lysate test)', highlight: true },
              { text: 'Glass for injectables = Type I glass (Neutral borosilicate glass)', highlight: true },
              { text: 'Ophthalmic preparations = must be ISOTONIC with lachrymal secretions', highlight: false },
            ],
            memory_trick: '🧠 "P for Pyrogen = P for Pyrexia (fever)". Type I glass = #1 for injections.',
            exam_tip: '⚡ pyrogens = fever-causing. Glass = Type I. LVP = infusion fluids (>100ml). These 3 cover all MCQs on parenterals.',
          },
          hinglish: {
            hook: 'Injection wali dawaiyan = Parenterals. 3 cheezein yaad karo, MCQ guaranteed!',
            points: [
              { text: 'Parenteral = injection se dete hain, pet bypass hota hai', highlight: false },
              { text: 'Large Volume (LVP) = 100ml se zyada = IV drip = Infusion fluids', highlight: true },
              { text: 'Small Volume (SVP) = 100ml se kam = ampoules, injections', highlight: false },
              { text: 'Pyrogens = bacteria ke waste products = BUKHAR aa jaata hai', highlight: true },
              { text: 'Pyrogen test = Rabbit test ya LAL test (Limulus Amebocyte Lysate)', highlight: true },
              { text: 'Injection ke liye glass = Type I glass (Neutral glass)', highlight: true },
            ],
            memory_trick: '🧠 "Pyrogen = Pyrexia = Bukhar" — P se P! Type I glass = injection mein number 1!',
            exam_tip: '⚡ Teen yaad karo: Pyrogens → bukhar. Glass → Type I. LVP → IV drip (100ml se zyada).',
          }
        },

        {
          id: 'ld_ph_6',
          title: 'Powders & Sieve Numbers',
          emoji: '⚗️',
          tags: ['4yr', 'MCQ'],
          english: {
            hook: 'Sieve numbers trip everyone. Here\'s the pattern.',
            points: [
              { text: 'Coarse powder — passes sieve #22', highlight: false },
              { text: 'Moderately coarse — passes sieve #44', highlight: false },
              { text: 'Fine powder — passes sieve #85', highlight: true },
              { text: 'Very fine powder — passes sieve #120', highlight: true },
              { text: 'Sieves arranged in ASCENDING order during sieving (smallest first)', highlight: true },
              { text: 'Uses: Powders for injection, dusting powders, oral powders', highlight: false },
            ],
            memory_trick: '🧠 22 → 44 → 85 → 120. Go from coarse to fine as numbers increase. Very fine = 120 (asked most!)',
            exam_tip: '⚡ MCQ answer: Very fine = sieve 120. Ascending order for arrangement. Both come every year.',
          },
          hinglish: {
            hook: 'Sieve numbers ghap lo yaaro — ek baar yaad ho gaye toh MCQ guaranteed!',
            points: [
              { text: 'Coarse (mota) powder — sieve no. 22 se guzarta hai', highlight: false },
              { text: 'Moderately coarse (thoda mota) — sieve no. 44', highlight: false },
              { text: 'Fine (barik) powder — sieve no. 85', highlight: true },
              { text: 'Very fine (bahut barik) — sieve no. 120', highlight: true },
              { text: 'Sieve lagane ka order = ASCENDING (chota pehle, bada baad mein)', highlight: true },
            ],
            memory_trick: '🧠 "22, 44, 85, 120" — yaad karo jaise phone ka lock code! Very fine = 120 (sabse zyada MCQ mein aata hai).',
            exam_tip: '⚡ MCQ: Very fine = 120. Order = ascending. Dono aate hain har saal!',
          }
        },

        {
          id: 'ld_ph_7',
          title: 'cGMP, IP & Pharmacy Act',
          emoji: '📋',
          tags: ['4yr', 'Part B', 'MCQ'],
          english: {
            hook: 'Definitions and dates — quick marks if you know these.',
            points: [
              { text: 'cGMP = Current Good Manufacturing Practice — ensures quality in drug manufacturing', highlight: true },
              { text: 'Indian Pharmacopoeia (IP) — First edition: 1955. Latest: 8th edition (2018)', highlight: true },
              { text: 'Extra Pharmacopoeia = Martindale\'s (unofficial but comprehensive reference)', highlight: false },
              { text: 'FIP = International Pharmaceutical Federation', highlight: true },
              { text: 'Pharmacy Act 1948 — minimum qualification: D.Pharm for registration', highlight: true },
              { text: 'Excipients = non-drug components in a formulation', highlight: false },
              { text: 'HLB = Hydrophilic Lipophilic Balance (for emulsifiers)', highlight: false },
            ],
            memory_trick: '🧠 IP first edition = 1955 (10 years after independence). Pharmacy Act = 1948 (year after independence). Dates are easy!',
            exam_tip: '⚡ FIP = International Pharma Federation. cGMP = Current Good Manufacturing Practice. Both asked as fill-in-the-blanks!',
          },
          hinglish: {
            hook: 'Definitions aur dates = free marks hain bhai! Ek minute dedo, set ho jaayenge!',
            points: [
              { text: 'cGMP = Current Good Manufacturing Practice — dawai banane ka sahi tarika', highlight: true },
              { text: 'Indian Pharmacopoeia = 1955 mein pehli baar aayi (azaadi ke 10 saal baad!)', highlight: true },
              { text: 'Extra Pharmacopoeia = Martindale\'s — unofficial reference book', highlight: false },
              { text: 'FIP = International Pharmaceutical Federation', highlight: true },
              { text: 'Pharmacy Act 1948 — D.Pharm chahiye registration ke liye (azaadi ke ek saal baad)', highlight: true },
            ],
            memory_trick: '🧠 "1947 azaadi, 1948 Pharmacy Act, 1955 IP" — chronological yaad karo! Ekdum simple!',
            exam_tip: '⚡ Fill in the blank: FIP = International Pharmaceutical Federation. cGMP = Current Good Manufacturing Practice. Dono har saal!',
          }
        },

      ]
    },

    {
      id: 'pharmacognosy',
      label: 'Pharmacognosy',
      icon: '🌿',
      color: '#2ecc8a',
      topics: [

        {
          id: 'ld_pg_1',
          title: 'Alkaloids — The Big One',
          emoji: '🌱',
          tags: ['4yr', 'Part A'],
          english: {
            hook: 'Alkaloids = 9 questions in the bank. This topic alone can score you 10+ marks.',
            points: [
              { text: 'Alkaloids = naturally occurring basic nitrogenous compounds of plant origin', highlight: true },
              { text: 'Quinine → from Cinchona bark → treats Malaria', highlight: true },
              { text: 'Morphine → from Papaver somniferum (opium poppy) → pain killer', highlight: true },
              { text: 'Atropine → from Belladonna → pre-anaesthetic, reduces secretions', highlight: true },
              { text: 'Reserpine → from Rauwolfia serpentina → antihypertensive', highlight: true },
              { text: 'Caffeine → from Coffee → CNS stimulant', highlight: false },
              { text: 'Nicotine → from Tobacco (Nicotiana) → stimulant/toxic', highlight: false },
              { text: 'Allicin → from Garlic (Allium sativum) → antibacterial', highlight: true },
              { text: 'Digoxin → from Digitalis → cardiac glycoside (heart)', highlight: false },
            ],
            memory_trick: '🧠 "Queen Mary Ate Raspberries, Causing Nausea And Dizziness" — Q=Quinine, M=Morphine, A=Atropine, R=Reserpine, C=Caffeine, N=Nicotine, A=Allicin, D=Digoxin',
            exam_tip: '⚡ Most asked: Quinine=Cinchona=Malaria. Morphine=Papaver. Atropine=Belladonna. These 3 are guaranteed!',
          },
          hinglish: {
            hook: '9 sawaal sirf alkaloids pe hain! Bhai ye topic pakad lo — 10 marks toh pakke hain!',
            points: [
              { text: 'Alkaloids = plants mein paye jaane wale nitrogen-wale compounds — natural hain', highlight: true },
              { text: 'Quinine → Cinchona ki chhaal se → Malaria ka ilaaj', highlight: true },
              { text: 'Morphine → Afeem ke paudhe (Papaver somniferum) se → dard khatam kare', highlight: true },
              { text: 'Atropine → Belladonna se → anesthesia se pehle dete hain', highlight: true },
              { text: 'Reserpine → Sarpagandha (Rauwolfia) se → BP kam kare', highlight: true },
              { text: 'Caffeine → Coffee se → brain jagata hai', highlight: false },
              { text: 'Nicotine → Tobacco (tambaku) se → stimulant, zahar bhi', highlight: false },
              { text: 'Allicin → Lahsun (Garlic) se → bacteria maare', highlight: true },
              { text: 'Digoxin → Digitalis se → dil ki dawai', highlight: false },
            ],
            memory_trick: '🧠 "Queen Morphine Atka Rahi, Coffee Nahi Aaye Digestive" — Q, M, A, R, C, N, A, D! Bakwaas sentence hai lekin yaad ho jayega!',
            exam_tip: '⚡ Ye 3 guaranteed hain: Quinine=Cinchona=Malaria. Morphine=Papaver. Atropine=Belladonna. Har saal aate hain!',
          }
        },

        {
          id: 'ld_pg_2',
          title: 'Tannins, Resins & Volatile Oils',
          emoji: '🧪',
          tags: ['4yr', 'Part B'],
          english: {
            hook: '3 groups, easy to confuse — here\'s the clean version.',
            points: [
              { text: 'Tannins — with FeCl₃: Hydrolysable = Blue-black. Condensed = Green-black', highlight: true },
              { text: 'Tannins used as: Astringent, antidiarrheal, haemostatic', highlight: false },
              { text: 'Tannic acid = hydrolysable tannin (most common example)', highlight: false },
              { text: 'Resins = solid/semi-solid oxidation products of terpenes', highlight: true },
              { text: 'True resin (no oil, no gum) = Colophony (Rosin), Jalap', highlight: false },
              { text: 'Oleoresin (resin + volatile oil) = Turpentine, Ginger, Capsicum', highlight: true },
              { text: 'Balsam (resin + benzoic/cinnamic acid) = Benzoin, Tolu balsam, Peru balsam', highlight: true },
              { text: 'Volatile oils = aromatic, evaporate easily. Eugenol = clove oil. Menthol = peppermint', highlight: true },
            ],
            memory_trick: '🧠 Tannins colour test: Hydrolysable = "Blue" (H for Hydro, B for Blue). Condensed = "Green" (C for Condensed, G for Green).',
            exam_tip: '⚡ Eugenol = clove oil. Menthol = peppermint oil. Both asked as MCQs. Oleoresin = resin + volatile oil (Turpentine).',
          },
          hinglish: {
            hook: 'Tannins, Resins, Volatile oils — teen alag hain! Confuse mat hona, seedha samjhao!',
            points: [
              { text: 'Tannins — FeCl₃ se colour test: Hydrolysable = Neela-kala. Condensed = Hara-kala', highlight: true },
              { text: 'Tannins use: Astringent (skin tight kare), diarrhea rokna, bleeding rokna', highlight: false },
              { text: 'Tannic acid = hydrolysable tannin ka example', highlight: false },
              { text: 'Resins = terpenes ke oxidation se bane solid/semi-solid products', highlight: true },
              { text: 'True resin (sirf resin) = Colophony, Jalap', highlight: false },
              { text: 'Oleoresin = resin + volatile oil = Turpentine, Adrak, Mirch', highlight: true },
              { text: 'Balsam = resin + benzoic/cinnamic acid = Benzoin, Peru balsam', highlight: true },
              { text: 'Volatile oils = khushbu wala, udh jaate hain. Eugenol = laung ka tel. Menthol = pudina', highlight: true },
            ],
            memory_trick: '🧠 Hydrolysable = H se Hara? Nahi! H se Blue (yaad karo "Hydro = Blue water"). Condensed = C se Green (C = Chhota, green).',
            exam_tip: '⚡ Eugenol = laung (clove). Menthol = pudina (peppermint). MCQ mein 100% aate hain! Oleoresin = resin + volatile oil.',
          }
        },

        {
          id: 'ld_pg_3',
          title: 'Adulteration Types',
          emoji: '🚫',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'Adulteration = adding impurities. 5 types, super important.',
            points: [
              { text: 'Substitution with inferior drugs — same drug, lower quality. E.g., wild plants', highlight: false },
              { text: 'Admixture of foreign matter — sand, stones added', highlight: false },
              { text: 'Sophistication — intentional addition of similar-looking but worthless material', highlight: true },
              { text: 'Exhausted drugs — active constituents removed, shell sold. Example: exhausted clove', highlight: true },
              { text: 'Artificial addition — fake dyes, colours added to improve appearance', highlight: false },
              { text: 'Detection: Organoleptic, microscopic, chemical, biological tests', highlight: false },
            ],
            memory_trick: '🧠 Exhausted drug = empty shell. Like squeezing a tube of toothpaste completely and selling the empty tube!',
            exam_tip: '⚡ Exhausted drug = sophistication by removal. Adulteration is asked in Part B almost every year.',
          },
          hinglish: {
            hook: 'Milavat ke 5 tarike — seedha yaad karo, Part B mein aye toh 3 marks guaranteed!',
            points: [
              { text: 'Ghati dawai se badlaav — same drug, par quality kharab. Jaise jungle ke random paudhe', highlight: false },
              { text: 'Bahari cheez milana — ret, pathar daal do', highlight: false },
              { text: 'Sophistication — jaanbujhkar milti-julti cheez milana. Dhoka hai!', highlight: true },
              { text: 'Exhausted drug — active cheez nikal lo, khali chhilka becho. Jaise nichode hue laung', highlight: true },
              { text: 'Artificial rang — dikhne mein accha lagay isliye colour add karo', highlight: false },
              { text: 'Pakad kaise hogi: dekhke, microscope se, chemical test, biological test', highlight: false },
            ],
            memory_trick: '🧠 Exhausted drug = khali tube! Colgate nikal ke khali tube bechna — yahi hai exhausted drug!',
            exam_tip: '⚡ Exhausted drug = sophistication through removal. Part B mein har saal aata hai adulteration!',
          }
        },

        {
          id: 'ld_pg_4',
          title: 'Pharmacognosy Definitions & Scope',
          emoji: '📖',
          tags: ['4yr', 'Part A'],
          english: {
            hook: 'The most basic question — define pharmacognosy. But write it properly!',
            points: [
              { text: 'Pharmacognosy coined by C.A. Seydler in 1815', highlight: true },
              { text: 'Definition: Science of crude drugs of natural (plant, animal, mineral) origin', highlight: true },
              { text: 'Scope: Identification, evaluation, collection, cultivation of crude drugs', highlight: false },
              { text: 'Nutraceutical coined by Stephen DeFelice (1989) — food with pharmaceutical benefits', highlight: true },
              { text: 'Punarnava = Boerhavia diffusa = diuretic drug', highlight: false },
              { text: 'Castor oil = from Ricinus communis = cathartic (purgative)', highlight: false },
              { text: 'Organised drugs = from organised plant tissues (leaves, bark, root). Example: Cloves = flower buds', highlight: true },
              { text: 'Unorganised drugs = secretions/exudates. Example: Asafoetida = oleo-gum-resin', highlight: true },
            ],
            memory_trick: '🧠 Seydler 1815 = S1815. DeFelice 1989 = D1989. Organised = has plant structure. Unorganised = no clear structure.',
            exam_tip: '⚡ Cloves = flower buds (not leaves, not bark). Asafoetida = unorganised. Both MCQ favourites!',
          },
          hinglish: {
            hook: 'Definition likhna sabse zyada aata hai exam mein — achi tarah likhna seekh lo!',
            points: [
              { text: 'Pharmacognosy naam diya C.A. Seydler ne 1815 mein', highlight: true },
              { text: 'Definition: Prakritik (plant, animal, mineral) crude drugs ka vigyan', highlight: true },
              { text: 'Nutraceutical = Stephen DeFelice ne 1989 mein diya — food jo dawai ka kaam kare', highlight: true },
              { text: 'Punarnava = Boerhavia diffusa = peshab saaf karne wali dawai (diuretic)', highlight: false },
              { text: 'Organised drugs = plant ke parts hain — tissue structure hoti hai. Laung = flower bud', highlight: true },
              { text: 'Unorganised drugs = plant ka rasa ya secretion — koi structure nahi. Hing = oleo-gum-resin', highlight: true },
            ],
            memory_trick: '🧠 Seydler = 1815. DeFelice = 1989. Organised = organized structure (tissue hai). Unorganised = koi structure nahi (rasa/secretion).',
            exam_tip: '⚡ Laung = flower buds (MCQ trap hai — bark nahi, leaf nahi, FLOWER BUD!). Hing = unorganised drug.',
          }
        },

      ]
    },

    {
      id: 'pharm-chemistry',
      label: 'Pharm Chemistry',
      icon: '🧪',
      color: '#f5b942',
      topics: [

        {
          id: 'ld_pc_1',
          title: 'Limit Tests — The Guaranteed Questions',
          emoji: '⚗️',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'Limit tests = 6 questions in the bank. Learn Chloride + Arsenic perfectly.',
            points: [
              { text: 'Limit test = detects and limits the amount of impurities in drugs', highlight: true },
              { text: 'Limit test for Chloride: Sample + HNO₃ + AgNO₃ → White opalescence (AgCl). Compare with standard.', highlight: true },
              { text: 'Limit test for Arsenic (Gutzeit method): Sample + Zinc + HCl → AsH₃ gas → yellow stain on HgBr₂ paper', highlight: true },
              { text: 'Gutzeit apparatus = specifically for Arsenic limit test', highlight: true },
              { text: 'Limit test for Sulphate: Sample + HCl + BaCl₂ → White turbidity (BaSO₄)', highlight: true },
              { text: 'Limit test for Iron: Sample + Thioglycollic acid → Pink colour', highlight: false },
              { text: 'Nessler\'s cylinder = used for comparing turbidity/color in limit tests', highlight: true },
            ],
            memory_trick: '🧠 Chloride = Silver nitrate (Ag + Cl = AgCl = WHITE). Sulphate = Barium chloride (Ba + SO₄ = BaSO₄ = WHITE). Arsenic = Yellow stain. Colours are the key!',
            exam_tip: '⚡ Gutzeit = Arsenic only. AgNO₃ = Chloride only. BaCl₂ = Sulphate only. Match them correctly — MCQs love mixing these up!',
          },
          hinglish: {
            hook: 'Limit tests = 6 sawaal hain! Chloride aur Arsenic dhang se yaad karo, marks aa jayenge!',
            points: [
              { text: 'Limit test = dawai mein milawat kitni hai ye measure karta hai', highlight: true },
              { text: 'Chloride ka test: Sample + HNO₃ + AgNO₃ → Safed color (AgCl). Standard se milao.', highlight: true },
              { text: 'Arsenic ka test (Gutzeit method): Zinc + HCl → AsH₃ gas banta hai → HgBr₂ paper pe peela daag', highlight: true },
              { text: 'Gutzeit apparatus = sirf Arsenic ke liye banaya gaya hai', highlight: true },
              { text: 'Sulphate ka test: HCl + BaCl₂ → Safed gandlapan (BaSO₄)', highlight: true },
              { text: 'Nessler\'s cylinder = turbidity aur colour compare karne ke liye', highlight: true },
            ],
            memory_trick: '🧠 Chloride = Chandi (Silver = AgNO₃) = SAFED. Sulphate = Barium = SAFED. Arsenic = Gutzeit = PEELA. Rang yaad karo, sab yaad ho jayega!',
            exam_tip: '⚡ Gutzeit = SIRF Arsenic. AgNO₃ = SIRF Chloride. BaCl₂ = SIRF Sulphate. MCQ mein ek doosre mein mat dena!',
          }
        },

        {
          id: 'ld_pc_2',
          title: 'Drug Classification Quick List',
          emoji: '💊',
          tags: ['4yr', 'MCQ', 'Part B'],
          english: {
            hook: '1 drug, 1 class, 1 use. Memorize this table and you\'re set.',
            points: [
              { text: 'Aspirin = NSAID (Non-steroidal anti-inflammatory). Chemical name: Acetylsalicylic acid', highlight: true },
              { text: 'Paracetamol = Non-opioid analgesic / para-aminophenol derivative', highlight: true },
              { text: 'Phenytoin = Anticonvulsant/Antiepileptic. Chemical: 5,5-diphenyl hydantoin', highlight: true },
              { text: 'Chloroquine = Antimalarial. 4-aminoquinoline group', highlight: false },
              { text: 'Glibenclamide = Antidiabetic. 2nd generation sulfonylurea', highlight: true },
              { text: 'Griseofulvin = Antifungal', highlight: false },
              { text: 'Propranolol = Beta blocker = Antihypertensive', highlight: true },
              { text: 'Enalapril = ACE inhibitor = Antihypertensive', highlight: false },
              { text: 'Furosemide = Loop diuretic', highlight: false },
              { text: 'Chlorpheniramine = 1st generation antihistamine (causes sedation)', highlight: true },
              { text: 'Penicillin = inhibits cell wall synthesis (transpeptidase enzyme)', highlight: true },
              { text: 'Tetracyclines = inhibit protein synthesis (30S ribosome)', highlight: false },
              { text: 'Sulfonamides = structural analogues of PABA, inhibit folic acid synthesis', highlight: true },
            ],
            memory_trick: '🧠 Penicillin = Wall builder stopper. Tetracycline = Protein factory stopper. Sulfonamide = Folic acid stopper.',
            exam_tip: '⚡ Glibenclamide = 2nd gen sulfonylurea (not 1st). Chlorpheniramine = 1st gen (sedating). Paracetamol = para-aminophenol. Watch for these traps!',
          },
          hinglish: {
            hook: 'Ek dawai, ek class, ek use — ye table ghap lo aur MCQ mein full marks lo!',
            points: [
              { text: 'Aspirin = NSAID. Chemical naam: Acetylsalicylic acid', highlight: true },
              { text: 'Paracetamol = Non-opioid analgesic. Para-aminophenol family ka hai', highlight: true },
              { text: 'Phenytoin = Anti-epileptic/Anti-seizure. Chemical: 5,5-diphenyl hydantoin', highlight: true },
              { text: 'Chloroquine = Malaria ki dawai. 4-aminoquinoline group', highlight: false },
              { text: 'Glibenclamide = Sugar ki dawai (diabetes). 2nd generation sulfonylurea', highlight: true },
              { text: 'Griseofulvin = Fungus ki dawai (antifungal)', highlight: false },
              { text: 'Propranolol = Beta blocker = BP ki dawai', highlight: true },
              { text: 'Furosemide = Loop diuretic = peshab barhane ki dawai', highlight: false },
              { text: 'Chlorpheniramine = 1st generation antihistamine = neend bhi aati hai', highlight: true },
              { text: 'Penicillin = cell wall banaane se rokta hai (transpeptidase enzyme)', highlight: true },
              { text: 'Sulfonamides = folic acid banana rokta hai (PABA ka dushman hai)', highlight: true },
            ],
            memory_trick: '🧠 Penicillin = deewaar band karo. Tetracycline = protein factory band karo. Sulfonamide = folic acid factory band karo.',
            exam_tip: '⚡ Dhyan rakho: Glibenclamide = 2nd gen (1st nahi!). Chlorpheniramine = 1st gen (neend laata hai). Paracetamol = para-aminophenol. Ye traps hain!',
          }
        },

        {
          id: 'ld_pc_3',
          title: 'Anti-TB Drugs — DOTS & RIP',
          emoji: '🫁',
          tags: ['4yr', 'MCQ', 'Part B'],
          english: {
            hook: 'TB drugs come every year. RIP = the 3 main drugs. DOTS = the therapy.',
            points: [
              { text: 'DOTS = Directly Observed Treatment Short-course (WHO TB strategy)', highlight: true },
              { text: 'RIP combination: Rifampicin + Isoniazid (INH) + Pyrazinamide', highlight: true },
              { text: 'First-line TB drugs: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, Streptomycin', highlight: false },
              { text: 'Rifampicin = turns urine/sweat/tears ORANGE (harmless)', highlight: true },
              { text: 'Isoniazid = can cause peripheral neuropathy (treat with Vitamin B6/Pyridoxine)', highlight: true },
              { text: 'Streptomycin = aminoglycoside antibiotic', highlight: false },
            ],
            memory_trick: '🧠 RIP = Rifampicin + Isoniazid + Pyrazinamide. Remember: they "RIP" the TB bacteria! Rifampicin = RED/ORANGE urine.',
            exam_tip: '⚡ DOTS full form always comes in fill-in-the-blank. RIP drugs always MCQ. Rifampicin = orange urine = unique side effect.',
          },
          hinglish: {
            hook: 'TB ki dawaiyan har saal aati hain! RIP yaad karo — aur TB bacteria ko RIP kar do!',
            points: [
              { text: 'DOTS = Directly Observed Treatment Short-course — WHO ka TB treatment plan', highlight: true },
              { text: 'RIP combination: Rifampicin + Isoniazid (INH) + Pyrazinamide', highlight: true },
              { text: 'First-line TB drugs: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, Streptomycin', highlight: false },
              { text: 'Rifampicin = peshab NARANGI/LAAL ho jaata hai — ghabrana nahi!', highlight: true },
              { text: 'Isoniazid = nerves ko nuksaan pohuncha sakta hai — Vitamin B6 se theek hota hai', highlight: true },
            ],
            memory_trick: '🧠 RIP = Rifampicin, Isoniazid, Pyrazinamide. "TB bacteria ko RIP karo!" Rifampicin = narangi peshab = ekdum unique!',
            exam_tip: '⚡ DOTS ka full form fill-in-blank mein aata hai. RIP drugs MCQ mein. Rifampicin = narangi peshab = unique side effect yaad rakho!',
          }
        },

        {
          id: 'ld_pc_4',
          title: 'EDTA Titration & Volumetric Analysis',
          emoji: '🧫',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'EDTA titration = complexometric titration. 3 things to know.',
            points: [
              { text: 'EDTA = Ethylene Diamine Tetra-acetic Acid = chelating agent', highlight: true },
              { text: 'EBT (Eriochrome Black T) = indicator for EDTA titration. Wine-red → Blue at endpoint', highlight: true },
              { text: 'Thioglycollic acid = added to mask iron interference in EDTA titrations', highlight: true },
              { text: 'Disodium EDTA = chelating agent in formulations (prevents metal ion contamination)', highlight: false },
              { text: 'Nessler\'s cylinders = used to compare turbidity/colour in limit tests', highlight: false },
            ],
            memory_trick: '🧠 EBT colour change: Wine red → Blue (easy: W before B, like W comes before B in alphabet!)',
            exam_tip: '⚡ EBT = EDTA indicator. Thioglycolic acid = removes iron interference. Both are MCQ favourites!',
          },
          hinglish: {
            hook: 'EDTA titration = 3 cheezein yaad karo, Part B ke marks pakke!',
            points: [
              { text: 'EDTA = Ethylene Diamine Tetra-acetic Acid = chelating agent (metals ko pakad leti hai)', highlight: true },
              { text: 'EBT = Eriochrome Black T = indicator. Colour change: Wine-red → Neela (endpoint pe)', highlight: true },
              { text: 'Thioglycollic acid = iron ka interference rokti hai EDTA titration mein', highlight: true },
              { text: 'Disodium EDTA = formulations mein chelating agent ke roop mein use hota hai', highlight: false },
            ],
            memory_trick: '🧠 EBT colour: Wine-red se Neela. "W pehle, B baad mein — jaisa alphabet mein hota hai!" Simple!',
            exam_tip: '⚡ EBT = EDTA ka indicator. Thioglycolic acid = iron ko rok do. Dono MCQ mein pakke aate hain!',
          }
        },

      ]
    },

    {
      id: 'anatomy',
      label: 'Anatomy',
      icon: '🫀',
      color: '#f0545a',
      topics: [

        {
          id: 'ld_an_1',
          title: 'Blood — Everything',
          emoji: '🩸',
          tags: ['4yr', 'MCQ', 'Part B'],
          english: {
            hook: '8 blood questions in the bank. Master this = guaranteed marks.',
            points: [
              { text: 'Blood group discovered by Karl Landsteiner (1901)', highlight: true },
              { text: 'Universal donor = Blood group O (no antigens)', highlight: true },
              { text: 'Universal recipient = Blood group AB (no antibodies)', highlight: true },
              { text: 'Blood consists of: RBC (Erythrocytes), WBC (Leukocytes), Platelets, Plasma', highlight: false },
              { text: 'Haemoglobin in RBC carries oxygen. Normal Hb: Male=13-17g/dl, Female=12-16g/dl', highlight: false },
              { text: 'Blood circulation discovered by William Harvey', highlight: true },
              { text: 'Radial artery in wrist = pulse felt here', highlight: true },
              { text: 'ESR = Erythrocyte Sedimentation Rate = used to detect inflammation', highlight: false },
            ],
            memory_trick: '🧠 O = zero antigens = gives to all = Donor. AB = has both antigens, no antibodies = takes from all = Recipient. O for Open (gives), AB for All-inclusive (takes).',
            exam_tip: '⚡ Landsteiner = blood group (1901). Harvey = circulation. O = donor. AB = recipient. Radial artery = wrist pulse. 5 guaranteed MCQ facts!',
          },
          hinglish: {
            hook: 'Blood ke 8 sawaal hain bhai! Ye topic cover karo, MCQ mein set ho jaoge!',
            points: [
              { text: 'Blood groups ki khoj Karl Landsteiner ne 1901 mein ki', highlight: true },
              { text: 'Universal donor = Group O (koi antigen nahi, sab ko de sakta hai)', highlight: true },
              { text: 'Universal recipient = Group AB (koi antibody nahi, sab se le sakta hai)', highlight: true },
              { text: 'Blood mein kya hai: RBC (lal), WBC (safed), Platelets, Plasma', highlight: false },
              { text: 'Blood circulation ki khoj William Harvey ne ki', highlight: true },
              { text: 'Radial artery = kalai (wrist) pe pulse feel hoti hai', highlight: true },
            ],
            memory_trick: '🧠 O = Zero antigen = sab ko de sakte hain = Donor. AB = Antigen Both = sab se le sakte hain = Recipient. Ekdum seedha!',
            exam_tip: '⚡ Ye 5 pakke hain: Landsteiner=blood group. Harvey=circulation. O=donor. AB=recipient. Radial artery=pulse. Roz dohraao!',
          }
        },

        {
          id: 'ld_an_2',
          title: 'Heart & Nervous System',
          emoji: '❤️',
          tags: ['4yr', 'Part A', 'MCQ'],
          english: {
            hook: 'Heart has 6 questions. Learn the basics first.',
            points: [
              { text: 'Heart rate regulation = Medulla oblongata (Cardiac centre)', highlight: true },
              { text: 'ECG: P wave = atrial depolarisation. QRS = ventricular. T wave = ventricular relaxation', highlight: true },
              { text: 'T wave = relaxation period (asked in MCQ)', highlight: true },
              { text: 'Coronary artery blockage = heart attack (myocardial infarction)', highlight: true },
              { text: 'Pacemaker of heart = SA node (sinoatrial node)', highlight: true },
              { text: 'Largest part of brain = Cerebrum (higher functions)', highlight: true },
              { text: 'Middle ear bones (lateral to medial): Malleus → Incus → Stapes', highlight: true },
              { text: 'Gustatory cells = taste buds (in tongue)', highlight: false },
            ],
            memory_trick: '🧠 Middle ear bones: "My Icky Stapes" = Malleus, Incus, Stapes. SA node = heart\'s own pacemaker. T wave = relaxaTion.',
            exam_tip: '⚡ T wave = relaxation (MCQ: T for relax!). Medulla = heart rate. SA node = pacemaker. Middle ear = Malleus, Incus, Stapes in order.',
          },
          hinglish: {
            hook: 'Dil ke 6 sawaal hain! Basics yaad karo, marks milenge!',
            points: [
              { text: 'Heartbeat control karta hai = Medulla oblongata (brain ka ek hissa)', highlight: true },
              { text: 'ECG: T wave = dil ka rest karna (relaxation) — MCQ mein yehi poochhte hain!', highlight: true },
              { text: 'Coronary artery band = Heart attack (dil ka daura)', highlight: true },
              { text: 'Dil ka pacemaker = SA node (khud ka natural pacemaker)', highlight: true },
              { text: 'Brain ka sabse bada hissa = Cerebrum (sochne ka kaam karta hai)', highlight: true },
              { text: 'Kaan ki haddiyan (bahar se andar): Malleus → Incus → Stapes', highlight: true },
              { text: 'Gustatory cells = taste buds = jeebh mein hoti hain', highlight: false },
            ],
            memory_trick: '🧠 Kaan ki haddiyan: "MIS" = Malleus, Incus, Stapes. SA node = heart ka khud ka pacemaker. T wave = T for "Take rest!"',
            exam_tip: '⚡ T wave = rest karna. Medulla = dil ki rate. SA node = pacemaker. Middle ear = MIS (Malleus Incus Stapes). Ye 4 MCQ mein pakke hain!',
          }
        },

        {
          id: 'ld_an_3',
          title: 'Endocrine & Digestive System',
          emoji: '🦋',
          tags: ['4yr', 'Part A'],
          english: {
            hook: 'Liver + hormones = asked in Part A every year. Don\'t skip this.',
            points: [
              { text: 'Islets of Langerhans (in pancreas): Alpha cells = Glucagon, Beta cells = Insulin', highlight: true },
              { text: 'Estrogen + Progesterone = secreted by OVARY', highlight: true },
              { text: 'Bile = stored in gall bladder, produced by LIVER', highlight: true },
              { text: 'Liver functions: Bile production, Glycogen storage, Protein synthesis, Detoxification, Vitamin storage (A,D,B12,K), Fat metabolism, Iron storage, Urea synthesis', highlight: true },
              { text: 'Exchange of gases in lungs = External respiration', highlight: true },
              { text: 'Ball and socket joint = hip joint, shoulder joint (most mobile)', highlight: false },
              { text: 'Henle\'s loop = U-shaped structure in kidney nephron', highlight: true },
              { text: 'Lactic acid accumulation in muscles = muscle fatigue', highlight: true },
            ],
            memory_trick: '🧠 Liver functions: "Big Gorilla Puts Dangerous Vitamins For Iron Under Shelves" = Bile, Glycogen, Protein, Detox, Vitamins, Fat, Iron, Urea, Storage.',
            exam_tip: '⚡ Islets of Langerhans: Alpha=Glucagon, Beta=Insulin. Bile=gall bladder storage. External respiration=lungs. Lactic acid=fatigue.',
          },
          hinglish: {
            hook: 'Liver aur hormones = Part A mein pakka aata hai! Skip mat karna yaar!',
            points: [
              { text: 'Islets of Langerhans (pancreas mein): Alpha = Glucagon, Beta = Insulin', highlight: true },
              { text: 'Estrogen + Progesterone = OVARY se aate hain (mahila ke andaruni ango se)', highlight: true },
              { text: 'Bile = Gall bladder mein store hoti hai, banaata hai LIVER', highlight: true },
              { text: 'Liver ka kaam (10 kaam): Bile banana, Glycogen store karna, Protein synthesis, Zahar nikalna (detox), Vitamins store (A,D,B12,K), Fat metabolism, Iron store, Urea banana', highlight: true },
              { text: 'Phaephon mein gas exchange = External respiration kehte hain', highlight: true },
              { text: 'Henle\'s loop = kidney mein U ke shape ka hissa', highlight: true },
              { text: 'Muscles thak jaati hain jab lactic acid jam jaata hai', highlight: true },
            ],
            memory_trick: '🧠 Liver ke kaam: "Bade Gorille Protein Detox Vitamins For Iron Under Saayein" = B(ile), G(lycogen), P(rotein), D(etox), V(itamins), F(at), I(ron), U(rea). Bakwaas sentence, lekin kaam karega!',
            exam_tip: '⚡ Alpha=Glucagon, Beta=Insulin (beta = behtar, insulin deta hai). Bile = gall bladder mein. External respiration = phaephon mein. Lactic acid = thakan.',
          }
        },

        {
          id: 'ld_an_4',
          title: 'Cell & Skeletal System',
          emoji: '🦴',
          tags: ['4yr', 'MCQ'],
          english: {
            hook: 'Cell organelles and bone counts — quick MCQ marks.',
            points: [
              { text: 'Powerhouse of cell = Mitochondria', highlight: true },
              { text: 'Human body bones = 206 bones total', highlight: true },
              { text: 'Lens opacity = Cataract (loss of transparency)', highlight: true },
              { text: 'Tendon = muscle to bone. Ligament = bone to bone', highlight: true },
              { text: 'A tendon JOINS muscle to bone', highlight: true },
              { text: 'Menstrual cycle = 28 days', highlight: false },
              { text: 'Bile stored in = Gall bladder (NOT liver)', highlight: false },
            ],
            memory_trick: '🧠 "Mitochondria is the Powerhouse" — everyone knows this! 206 bones = roughly "2 zero 6" = 20 toes + 6? Just rote! Tendon=Ties Muscle. Ligament=Links bones.',
            exam_tip: '⚡ Cataract = lens opacity. Tendon = muscle-bone. 206 bones. Mitochondria = powerhouse. 4 classic MCQ answers!',
          },
          hinglish: {
            hook: 'Cell ke parts aur haddiyan — MCQ mein seedhe marks milenge!',
            points: [
              { text: 'Cell ka powerhouse = Mitochondria', highlight: true },
              { text: 'Human body mein total haddiyan = 206', highlight: true },
              { text: 'Aankhon ka lens dhundla ho jaaye = Cataract (motia)', highlight: true },
              { text: 'Tendon = muscle ko haddi se jodta hai. Ligament = haddi ko haddi se', highlight: true },
              { text: 'Menstrual cycle = 28 din ka hota hai', highlight: false },
              { text: 'Bile kahan store hoti hai = Gall bladder (liver nahi!)', highlight: false },
            ],
            memory_trick: '🧠 Mitochondria = powerhouse — ye toh sabko pata hai! 206 haddiyan = "Do Sau Chhah". Tendon = "T for Tie" (muscle tied to bone). Ligament = "L for Link" (bones linked).',
            exam_tip: '⚡ Cataract = aankhon ka lens. Tendon = muscle-haddi. 206 haddiyan. Mitochondria = powerhouse. 4 pakke MCQ answers!',
          }
        },

      ]
    },

    {
      id: 'social-pharmacy',
      label: 'Social Pharmacy',
      icon: '🏥',
      color: '#a78bfa',
      topics: [

        {
          id: 'ld_sp_1',
          title: 'Communicable Diseases — Key Facts',
          emoji: '🦠',
          tags: ['4yr', 'Part A', 'Part B'],
          english: {
            hook: 'Diseases, causative agents, routes — one row each. Fast and effective.',
            points: [
              { text: 'Tuberculosis (TB): Mycobacterium tuberculosis. Spread: Droplet. Prevention: BCG vaccine', highlight: true },
              { text: 'Malaria: Plasmodium parasite. Vector: Female Anopheles mosquito. Drug: Chloroquine', highlight: true },
              { text: 'Typhoid: Salmonella typhi. Spread: Contaminated food/water. Vaccine available', highlight: true },
              { text: 'Cholera: Vibrio cholerae. Spread: Contaminated water. Rice-water stools', highlight: true },
              { text: 'Leprosy: Mycobacterium leprae. Spread: Prolonged contact. MDT treatment', highlight: false },
              { text: 'Polio: Poliovirus. Spread: Feco-oral route. OPV (oral) and IPV vaccines', highlight: true },
              { text: 'AIDS: HIV virus. Spread: Blood/sexual/mother-to-child. No cure, ART treatment', highlight: true },
            ],
            memory_trick: '🧠 Mosquito diseases: MAD = Malaria (Anopheles), Dengue (Aedes), Filaria (Culex). Anopheles = malaria only!',
            exam_tip: '⚡ BCG = TB. OPV = Polio. Anopheles = Malaria. These 3 vaccine-disease pairs always come in MCQs!',
          },
          hinglish: {
            hook: 'Bimariyan, kaaran, dawai — ek line mein sab! Fast revision ke liye perfect!',
            points: [
              { text: 'TB: Mycobacterium tuberculosis. Khaansi se faili. Rokne ke liye: BCG vaccine', highlight: true },
              { text: 'Malaria: Plasmodium. Phailata hai: Female Anopheles mosquito. Dawai: Chloroquine', highlight: true },
              { text: 'Typhoid: Salmonella typhi. Ganda paani/khaana se faili', highlight: true },
              { text: 'Cholera: Vibrio cholerae. Ganda paani. Chawal ke paani jaisa daast', highlight: true },
              { text: 'Polio: Poliovirus. Muh-gand se faili (feco-oral). OPV vaccine', highlight: true },
              { text: 'AIDS: HIV virus. Khoon, sambandh, maa se bachche ko. ART treatment', highlight: true },
            ],
            memory_trick: '🧠 Machchar wali bimariyan: "MAD" = Malaria (Anopheles), Aedes (Dengue), Culex (Filaria). Anopheles = sirf Malaria!',
            exam_tip: '⚡ BCG = TB. OPV = Polio. Anopheles = Malaria. Ye 3 vaccine-disease pairs MCQ mein guaranteed hain!',
          }
        },

        {
          id: 'ld_sp_2',
          title: 'Nutrition & Deficiency Diseases',
          emoji: '🥗',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'Vitamins + deficiency = 1 question per year minimum. Learn the pairs.',
            points: [
              { text: 'Vitamin A (Retinol): Deficiency = Night blindness, Xerophthalmia', highlight: true },
              { text: 'Vitamin B1 (Thiamine): Deficiency = Beriberi (nervous system)', highlight: true },
              { text: 'Vitamin B3 (Niacin): Deficiency = Pellagra (3 Ds: Dermatitis, Diarrhoea, Dementia)', highlight: true },
              { text: 'Vitamin B12: Deficiency = Pernicious anaemia', highlight: false },
              { text: 'Vitamin C (Ascorbic acid): Deficiency = Scurvy (bleeding gums)', highlight: true },
              { text: 'Vitamin D (Calciferol): Deficiency = Rickets (children), Osteomalacia (adults)', highlight: true },
              { text: 'Vitamin K: Deficiency = Bleeding disorder (needed for clotting factors)', highlight: false },
              { text: 'Iron deficiency = Anaemia. Iodine deficiency = Goitre', highlight: true },
            ],
            memory_trick: '🧠 "A = Eyes (A for Acuity). B1 = Beriberi (B1 = Beri). C = Scurvy (C = Cut gums). D = Rickets (D for Defective bones)"',
            exam_tip: '⚡ Vitamin C = Scurvy. Vitamin D = Rickets. Vitamin A = Night blindness. These 3 are asked every year without fail!',
          },
          hinglish: {
            hook: 'Vitamin aur kami ki bimari — ek saal mein ek baar toh aata hi hai! Yaad karo!',
            points: [
              { text: 'Vitamin A: Kami se raat ko andhera ho jaata hai (Night blindness)', highlight: true },
              { text: 'Vitamin B1 (Thiamine): Kami se Beriberi (nerves kharab)', highlight: true },
              { text: 'Vitamin B3 (Niacin): Kami se Pellagra (3D: Daane, Daast, Dimag)', highlight: true },
              { text: 'Vitamin C: Kami se Scurvy (maadhon se khoon nikle)', highlight: true },
              { text: 'Vitamin D: Kami se Rickets (bachche — haddiyan tedhi) ya Osteomalacia (bade)', highlight: true },
              { text: 'Iron ki kami = Anaemia. Iodine ki kami = Goitre (gale ki ganth)', highlight: true },
            ],
            memory_trick: '🧠 "A = Aankhein. B1 = Beriberi. C = Cut (maadhe se khoon). D = Dhancha (haddiyan)" — yaad karo!',
            exam_tip: '⚡ Vitamin C = Scurvy. D = Rickets. A = Night blindness. Ye 3 har saal poochhe jaate hain, kabhi miss mat karna!',
          }
        },

        {
          id: 'ld_sp_3',
          title: 'Family Planning & National Health Programmes',
          emoji: '👨‍👩‍👧',
          tags: ['4yr', 'Part B'],
          english: {
            hook: 'Family planning MCQs are easy if you know 5 terms.',
            points: [
              { text: 'India launched National Family Planning Programme in 1952 (first in the world!)', highlight: true },
              { text: 'Contraceptive methods: Barrier (condom, diaphragm), Hormonal (pills), IUD, Surgical (tubectomy, vasectomy)', highlight: false },
              { text: 'OCP (Oral contraceptive pill) = hormonal, contains estrogen + progesterone', highlight: true },
              { text: 'IUCD/IUD = Intrauterine Contraceptive Device (copper-T) = non-hormonal, highly effective', highlight: true },
              { text: 'IMR = Infant Mortality Rate. MMR = Maternal Mortality Rate. Both health indicators', highlight: true },
              { text: 'National Health Mission (NHM) = combines NRHM + NUHM', highlight: false },
              { text: 'Pharmacovigilance = monitoring adverse drug reactions (ADRs) after marketing', highlight: true },
            ],
            memory_trick: '🧠 India = FIRST country to have national family planning programme (1952). Remember: independent 1947, planning 1952 (5 years later).',
            exam_tip: '⚡ India first family planning 1952. IUD = copper-T = non-hormonal. Pharmacovigilance = ADR monitoring. 3 guaranteed questions!',
          },
          hinglish: {
            hook: 'Family planning ke sawaal easy hain — 5 cheezein yaad karo, marks free!',
            points: [
              { text: 'India ne 1952 mein National Family Planning Programme shuru kiya — duniya mein PEHLA!', highlight: true },
              { text: 'Contraception ke tarike: Condom, Diaphragm, Pills, IUD, Tubectomy, Vasectomy', highlight: false },
              { text: 'OCP (Goli) = hormonal = estrogen + progesterone dono hote hain', highlight: true },
              { text: 'IUD/IUCD = Copper-T = hormones nahi, phir bhi kaam karta hai, bahut effective', highlight: true },
              { text: 'IMR = Infant Mortality Rate (shishu mrityu dar). MMR = Maternal Mortality Rate', highlight: true },
              { text: 'Pharmacovigilance = dawai market mein aane ke baad uske side effects monitor karna', highlight: true },
            ],
            memory_trick: '🧠 India = duniya mein pehla family planning wala desh (1952). "Azaadi 1947, planning 1952 — paanch saal baad plan kiya!"',
            exam_tip: '⚡ India pehla = 1952. IUD = copper-T = hormones nahi. Pharmacovigilance = ADR monitor. Ye 3 pakke aate hain!',
          }
        },

      ]
    },

  ]

};
