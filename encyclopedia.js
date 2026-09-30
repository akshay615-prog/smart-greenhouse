/* =========================================================
   SMART GREENHOUSE AI — ADVANCED ENCYCLOPEDIA
   ========================================================= */

const ENCYCLOPEDIA_DATA = [

    // =====================================================
    // CROPS
    // =====================================================

    {
        id: "tomato",
        name: "Tomato",
        scientific: "Solanum lycopersicum",
        type: "Crop",
        category: "crop",
        icon: "🍅",

        overview:
            "A warm-season fruit crop widely grown under protected cultivation. Greenhouse tomatoes need careful control of irrigation, nutrition, airflow, temperature and pollination.",

        conditions: {
            temperature: "18–30°C",
            humidity: "60–80%",
            light: "High light",
            water: "Consistent moisture; avoid waterlogging",
            soil: "Well-drained loam or suitable soilless media",
            ph: "5.5–7.0"
        },

        growth:
            "Indeterminate greenhouse types can continue producing over a long crop cycle when trained and maintained.",

        nutrition:
            "Balanced nitrogen, phosphorus and potassium are required, with calcium and magnesium also important.",

        pests: [
            "Aphid",
            "Whitefly",
            "Fungus gnat",
            "Tomato hornworm",
            "Two-spotted spider mite",
            "Thrips",
            "Stink bug"
        ],

        diseases: [
            "Early blight",
            "Late blight",
            "Septoria leaf spot",
            "Powdery mildew",
            "Botrytis gray mold",
            "Fusarium wilt",
            "Verticillium wilt",
            "Bacterial spot",
            "Bacterial canker",
            "Mosaic viruses"
        ],

        symptoms:
            "Watch for leaf spots, yellowing, wilting, curling, stunting, unusual fruit spots or cracking and sticky honeydew.",

        prevention:
            "Use clean planting material, sanitize tools and surfaces, remove diseased material, manage humidity and leaf wetness, scout regularly and use resistant cultivars where available.",

        greenhouse:
            "Train and prune appropriately, maintain airflow, monitor root-zone moisture and record temperature, humidity, irrigation and pest observations.",

        ai:
            "Useful clues include compound leaves, yellow flowers, green/red fruit and characteristic leaf or fruit lesions."
    },


    {
        id: "wheat",
        name: "Wheat",
        scientific: "Triticum aestivum",
        type: "Crop",
        category: "crop",
        icon: "🌾",

        overview:
            "A cool-season cereal crop. Temperature, light, root-zone moisture and nutrient balance strongly influence growth.",

        conditions: {
            temperature: "10–25°C",
            humidity: "Moderate; avoid prolonged leaf wetness",
            light: "High light",
            water: "Moderate and even",
            soil: "Fertile, well-drained soil",
            ph: "About 6.0–7.5"
        },

        growth:
            "Germination is followed by tillering, stem elongation, heading, flowering and grain filling.",

        nutrition:
            "Nitrogen is important for vegetative growth and yield; phosphorus and potassium support roots and development.",

        pests: [
            "Aphids",
            "Armyworms",
            "Cutworms",
            "Thrips"
        ],

        diseases: [
            "Powdery mildew",
            "Rusts",
            "Fusarium head blight",
            "Septoria leaf blotch"
        ],

        symptoms:
            "Yellowing, stunting, poor tillering, leaf lesions or rust-colored pustules can indicate stress or disease.",

        prevention:
            "Use clean seed, good sanitation, appropriate moisture management and locally suitable resistant varieties.",

        greenhouse:
            "Less common as a greenhouse crop; controlled environments are more useful for research and experiments."
    },


    {
        id: "rice",
        name: "Rice",
        scientific: "Oryza sativa",
        type: "Crop",
        category: "crop",
        icon: "🌾",

        overview:
            "A warm-season cereal requiring high water availability and warm temperatures.",

        conditions: {
            temperature: "20–35°C",
            humidity: "Moderate–high",
            light: "High light",
            water: "High; system-dependent",
            soil: "Clay loam to loam",
            ph: "About 5.5–6.5"
        },

        growth:
            "Important stages include germination, seedling establishment, tillering, panicle initiation, flowering and grain filling.",

        nutrition:
            "Nitrogen strongly affects growth and yield; phosphorus and potassium are also important.",

        pests: [
            "Rice stem borer",
            "Brown planthopper",
            "Rice hispa",
            "Leaf folder"
        ],

        diseases: [
            "Rice blast",
            "Bacterial leaf blight",
            "Sheath blight",
            "Brown spot"
        ],

        symptoms:
            "Leaf lesions, dead leaf areas, stunting, hopper damage and poor panicle development are warning signs.",

        prevention:
            "Use healthy seed, manage water and nutrients, scout frequently and use resistant varieties and IPM.",

        greenhouse:
            "For controlled experiments, carefully manage temperature, water level, humidity and light."
    },


    {
        id: "cucumber",
        name: "Cucumber",
        scientific: "Cucumis sativus",
        type: "Crop",
        category: "crop",
        icon: "🥒",

        overview:
            "A fast-growing cucurbit commonly grown in greenhouses. Many greenhouse types are parthenocarpic and can produce fruit without pollination.",

        conditions: {
            temperature: "18–32°C",
            humidity: "Moderate–high with good airflow",
            light: "High light",
            water: "Regular, consistent moisture",
            soil: "Well-drained moisture-retentive medium",
            ph: "About 6.0–6.5"
        },

        growth:
            "Vining plants are commonly trellised and may need training, pruning and canopy management.",

        nutrition:
            "Balanced nutrients are needed; excessive nitrogen can create overly vegetative growth.",

        pests: [
            "Whitefly",
            "Aphid",
            "Spider mite",
            "Thrips",
            "Cucumber beetle",
            "Fungus gnat"
        ],

        diseases: [
            "Powdery mildew",
            "Downy mildew",
            "Bacterial wilt",
            "Anthracnose",
            "Angular leaf spot",
            "Damping-off",
            "Virus diseases"
        ],

        symptoms:
            "Mosaic patterns, wilt, leaf spots, powdery growth, distorted leaves and reduced fruit production.",

        prevention:
            "Maintain airflow, avoid prolonged leaf wetness, use suitable irrigation, remove infected debris and scout regularly.",

        greenhouse:
            "Use trellising and humidity control. Parthenocarpic types generally do not need pollination."
    },


    {
        id: "pepper",
        name: "Pepper / Capsicum",
        scientific: "Capsicum annuum",
        type: "Crop",
        category: "crop",
        icon: "🌶️",

        overview:
            "A warm-season fruiting crop suitable for protected cultivation. Stable temperatures, strong light and balanced nutrition are important.",

        conditions: {
            temperature: "18–32°C",
            humidity: "Moderate",
            light: "High light",
            water: "Even moisture",
            soil: "Well-drained fertile soil or soilless media",
            ph: "About 5.5–7.0"
        },

        growth:
            "Plants branch and flower repeatedly, producing fruits that change size and color as they mature.",

        nutrition:
            "Balanced N-P-K with adequate calcium and magnesium supports growth and fruiting.",

        pests: [
            "Aphid",
            "Whitefly",
            "Thrips",
            "Spider mite",
            "Fungus gnat"
        ],

        diseases: [
            "Powdery mildew",
            "Botrytis gray mold",
            "Bacterial spot",
            "Phytophthora blight",
            "Tomato spotted wilt virus",
            "Cucumber mosaic virus"
        ],

        symptoms:
            "Leaf curling, mottling, spots, wilting, blossom problems and fruit lesions.",

        prevention:
            "Maintain sanitation, airflow and balanced irrigation; inspect undersides of leaves.",

        greenhouse:
            "Support plants where needed and manage canopy density and humidity."
    },


    {
        id: "potato",
        name: "Potato",
        scientific: "Solanum tuberosum",
        type: "Crop",
        category: "crop",
        icon: "🥔",

        overview:
            "A cool-season tuber crop. Root-zone temperature, moisture and soil structure are important because edible tubers form underground.",

        conditions: {
            temperature: "15–24°C",
            humidity: "Moderate",
            light: "High light for foliage",
            water: "Even moisture during tuber development",
            soil: "Loose, well-drained soil",
            ph: "About 5.0–6.5"
        },

        growth:
            "Plants form shoots, leaves, stolons and tubers.",

        nutrition:
            "Balanced fertility is important; excessive nitrogen can favor foliage over tuber production.",

        pests: [
            "Aphid",
            "Flea beetle",
            "Colorado potato beetle",
            "Cutworm",
            "Leafhopper"
        ],

        diseases: [
            "Late blight",
            "Early blight",
            "Rhizoctonia",
            "Common scab",
            "Bacterial wilt",
            "Virus diseases"
        ],

        symptoms:
            "Leaf spots, wilting, insect feeding and tuber lesions.",

        prevention:
            "Use healthy seed tubers, sanitation, appropriate moisture and regular scouting.",

        greenhouse:
            "Use deep, well-drained beds or containers and monitor the root zone."
    },


    {
        id: "onion",
        name: "Onion",
        scientific: "Allium cepa",
        type: "Crop",
        category: "crop",
        icon: "🧅",

        overview:
            "A bulb-forming crop whose development is influenced by temperature, day length, nutrition and water.",

        conditions: {
            temperature: "13–25°C for many stages",
            humidity: "Moderate with good airflow",
            light: "Strong light",
            water: "Regular during bulb development",
            soil: "Loose, fertile and well-drained",
            ph: "About 6.0–7.0"
        },

        growth:
            "Leaves develop first, followed by bulb enlargement.",

        nutrition:
            "Nitrogen supports early growth; balanced phosphorus, potassium and sulfur are also important.",

        pests: [
            "Thrips",
            "Onion maggot",
            "Aphid",
            "Leafminer"
        ],

        diseases: [
            "Downy mildew",
            "Botrytis neck rot",
            "Purple blotch",
            "Fusarium basal rot"
        ],

        symptoms:
            "Silvering or curling leaves, purple lesions, tip dieback and bulb rot.",

        prevention:
            "Clean planting material, controlled irrigation, airflow and no standing water.",

        greenhouse:
            "Avoid excessive humidity and leaf wetness in dense canopies."
    },


    {
        id: "carrot",
        name: "Carrot",
        scientific: "Daucus carota",
        type: "Crop",
        category: "crop",
        icon: "🥕",

        overview:
            "A root crop requiring loose soil and consistent moisture for straight, well-developed roots.",

        conditions: {
            temperature: "15–24°C",
            humidity: "Moderate",
            light: "Good light",
            water: "Consistent moisture",
            soil: "Deep, loose, stone-free soil",
            ph: "About 6.0–6.8"
        },

        growth:
            "The edible taproot enlarges as foliage develops.",

        nutrition:
            "Balanced nutrition is preferred; excessive nitrogen can favor foliage over root quality.",

        pests: [
            "Aphid",
            "Carrot rust fly",
            "Leafhopper",
            "Cutworm"
        ],

        diseases: [
            "Alternaria leaf blight",
            "Cercospora leaf blight",
            "Root rots",
            "Powdery mildew"
        ],

        symptoms:
            "Leaf spots, yellowing and malformed or rotting roots.",

        prevention:
            "Use clean media, good drainage, crop rotation and controlled irrigation.",

        greenhouse:
            "Use sufficiently deep containers and avoid compaction."
    },


    {
        id: "spinach",
        name: "Spinach",
        scientific: "Spinacia oleracea",
        type: "Crop",
        category: "crop",
        icon: "🥬",

        overview:
            "A leafy crop preferring cooler conditions. Excessive heat can cause bolting and quality loss.",

        conditions: {
            temperature: "10–24°C",
            humidity: "Moderate",
            light: "Good light",
            water: "Regular moisture",
            soil: "Fertile, well-drained soil",
            ph: "About 6.0–7.5"
        },

        growth:
            "Rapid leaf production is followed by flowering and seed formation when plants bolt.",

        nutrition:
            "Nitrogen supports leaf production, with balanced nutrition still important.",

        pests: [
            "Aphid",
            "Leafminer",
            "Flea beetle",
            "Caterpillar"
        ],

        diseases: [
            "Downy mildew",
            "White rust",
            "Damping-off"
        ],

        symptoms:
            "Leaf spots, yellowing, holes, mines and rapid flowering.",

        prevention:
            "Use resistant varieties where available, maintain airflow and avoid excessive leaf wetness.",

        greenhouse:
            "Ventilate during warm periods and schedule irrigation to reduce prolonged leaf wetness."
    },


    {
        id: "lettuce",
        name: "Lettuce",
        scientific: "Lactuca sativa",
        type: "Crop",
        category: "crop",
        icon: "🥬",

        overview:
            "A cool-season leafy crop well suited to controlled environments. Heat can cause bolting and quality loss.",

        conditions: {
            temperature: "10–24°C",
            humidity: "Moderate",
            light: "Moderate–high",
            water: "Frequent but controlled",
            soil: "Fertile, well-drained",
            ph: "About 6.0–7.0"
        },

        growth:
            "Forms loose leaves or heads depending on cultivar.",

        nutrition:
            "Balanced nutrition with adequate nitrogen supports leaf growth.",

        pests: [
            "Aphid",
            "Thrips",
            "Fungus gnat",
            "Caterpillar",
            "Slugs"
        ],

        diseases: [
            "Downy mildew",
            "Botrytis gray mold",
            "Damping-off",
            "Sclerotinia"
        ],

        symptoms:
            "Wilting, leaf spots, holes, mold and poor head formation.",

        prevention:
            "Keep foliage dry where possible, maintain airflow and remove diseased material.",

        greenhouse:
            "Ventilation and careful irrigation are important because high humidity can favor disease."
    },


    {
        id: "eggplant",
        name: "Eggplant / Brinjal",
        scientific: "Solanum melongena",
        type: "Crop",
        category: "crop",
        icon: "🍆",

        overview:
            "A warm-season fruiting crop related to tomato and pepper and commonly grown under protected cultivation.",

        conditions: {
            temperature: "18–32°C",
            humidity: "Moderate",
            light: "High",
            water: "Consistent moisture",
            soil: "Well-drained fertile soil/media",
            ph: "About 5.5–6.8"
        },

        growth:
            "Plants branch and flower repeatedly, producing fruits according to cultivar.",

        nutrition:
            "Balanced N-P-K plus adequate calcium and magnesium supports growth and fruiting.",

        pests: [
            "Aphid",
            "Whitefly",
            "Thrips",
            "Spider mite",
            "Flea beetle"
        ],

        diseases: [
            "Verticillium wilt",
            "Fusarium wilt",
            "Phytophthora blight",
            "Powdery mildew",
            "Bacterial wilt"
        ],

        symptoms:
            "Leaf curling, yellowing, wilting, spots and fruit lesions.",

        prevention:
            "Clean planting material, sanitation, airflow, scouting and resistant cultivars where available.",

        greenhouse:
            "Manage canopy density and humidity; inspect leaf undersides."
    },


    {
        id: "okra",
        name: "Okra",
        scientific: "Abelmoschus esculentus",
        type: "Crop",
        category: "crop",
        icon: "🌿",

        overview:
            "A warm-season vegetable producing edible immature pods.",

        conditions: {
            temperature: "22–35°C",
            humidity: "Moderate",
            light: "High",
            water: "Regular moisture",
            soil: "Well-drained fertile soil",
            ph: "About 6.0–7.5"
        },

        growth:
            "Plants grow upright and produce flowers followed by rapidly developing pods.",

        nutrition:
            "Balanced fertility supports vegetative growth and repeated pod production.",

        pests: [
            "Aphid",
            "Whitefly",
            "Spider mite",
            "Caterpillar",
            "Flea beetle"
        ],

        diseases: [
            "Powdery mildew",
            "Fusarium wilt",
            "Damping-off",
            "Leaf spots"
        ],

        symptoms:
            "Yellowing, wilting, holes and powdery growth.",

        prevention:
            "Maintain airflow, scout regularly, remove infected material and avoid waterlogging.",

        greenhouse:
            "Provide adequate vertical space and ventilation."
    },


    {
        id: "cabbage",
        name: "Cabbage",
        scientific: "Brassica oleracea var. capitata",
        type: "Crop",
        category: "crop",
        icon: "🥬",

        overview:
            "A cool-season brassica that forms a compact head.",

        conditions: {
            temperature: "10–24°C",
            humidity: "Moderate",
            light: "High",
            water: "Consistent moisture",
            soil: "Fertile, well-drained",
            ph: "About 6.0–7.5"
        },

        growth:
            "Leaves expand around a central growing point to form the head.",

        nutrition:
            "Good fertility, especially nitrogen during vegetative growth, plus balanced potassium and other nutrients.",

        pests: [
            "Cabbage aphid",
            "Cabbage looper",
            "Diamondback moth",
            "Flea beetle",
            "Caterpillar"
        ],

        diseases: [
            "Downy mildew",
            "Black rot",
            "Clubroot",
            "Alternaria leaf spot"
        ],

        symptoms:
            "Chewed leaves, holes, yellowing, dark leaf veins and stunting.",

        prevention:
            "Crop rotation, sanitation, insect exclusion and resistant varieties where available.",

        greenhouse:
            "Use insect screening where practical and inspect new plants before introduction."
    },


    // =====================================================
    // INSECTS / PESTS
    // =====================================================

    {
        id: "aphid",
        name: "Aphid",
        scientific: "Aphididae",
        type: "Pest",
        category: "insect",
        icon: "🐞",

        overview:
            "Small sap-feeding insects that often cluster on tender shoots and leaf undersides.",

        identification:
            "Soft-bodied, pear-shaped insects; many species have cornicles at the rear. Colors vary.",

        hosts:
            "Many vegetables and ornamentals.",

        damage:
            "Curling, yellowing, stunting and reduced vigor. Honeydew can support sooty mold and some aphids transmit viruses.",

        monitoring:
            "Inspect new growth and leaf undersides. Sticky cards can help detect winged adults.",

        prevention:
            "Inspect incoming plants, remove heavily infested material when appropriate, control weeds and use beneficial organisms as part of IPM.",

        greenhouse:
            "Biological control and exclusion can be useful components of greenhouse IPM."
    },


    {
        id: "whitefly",
        name: "Greenhouse Whitefly",
        scientific: "Trialeurodes vaporariorum",
        type: "Pest",
        category: "insect",
        icon: "🦋",

        overview:
            "A small sap-feeding pest that can become serious in protected cultivation.",

        identification:
            "Tiny white adults fly when foliage is disturbed; immature stages occur on leaf undersides.",

        hosts:
            "Tomato, cucumber, pepper, eggplant and many ornamentals.",

        damage:
            "Sap feeding causes yellowing and weakening; honeydew can lead to sooty mold.",

        monitoring:
            "Inspect leaf undersides and use sticky cards for adult monitoring.",

        prevention:
            "Quarantine incoming plants, use screening where practical, remove weeds and use IPM.",

        greenhouse:
            "Beneficial parasitoids and predators can be part of biological control."
    },


    {
        id: "spider-mite",
        name: "Two-Spotted Spider Mite",
        scientific: "Tetranychus urticae",
        type: "Pest",
        category: "insect",
        icon: "🕷️",

        overview:
            "A tiny mite rather than a true insect. Hot, dry conditions can favor rapid population growth.",

        identification:
            "Very small mites; fine webbing and pale stippling are useful clues.",

        hosts:
            "Many greenhouse crops.",

        damage:
            "Stippling, yellowing, bronzing, leaf drop and webbing in severe infestations.",

        monitoring:
            "Inspect leaf undersides with a hand lens.",

        prevention:
            "Avoid plant stress, maintain appropriate humidity and use biological control where suitable.",

        greenhouse:
            "Predatory mites are commonly used in integrated biological-control programs."
    },


    {
        id: "thrips",
        name: "Thrips",
        scientific: "Thysanoptera",
        type: "Pest",
        category: "insect",
        icon: "🪲",

        overview:
            "Tiny slender insects that scrape and feed on plant tissue. Some species transmit viruses.",

        identification:
            "Very small narrow-bodied insects; feeding can create silvery streaks and distorted growth.",

        hosts:
            "Pepper, tomato, cucumber, lettuce and many ornamentals.",

        damage:
            "Silvering, scarring, distorted flowers and fruit.",

        monitoring:
            "Inspect flowers and young leaves; sticky cards can detect adults.",

        prevention:
            "Screen openings where practical, remove weeds and inspect incoming plants.",

        greenhouse:
            "Use integrated pest management and biological control where appropriate."
    },


    {
        id: "fungus-gnat",
        name: "Fungus Gnat",
        scientific: "Sciaridae",
        type: "Pest",
        category: "insect",
        icon: "🪰",

        overview:
            "Small flies whose larvae live in moist growing media and can damage roots, especially seedlings.",

        identification:
            "Small dark adults around media; larvae live in the root zone.",

        hosts:
            "Seedlings, herbs, vegetables and ornamentals.",

        damage:
            "Root feeding weakens seedlings and can increase opportunities for root pathogens.",

        monitoring:
            "Yellow sticky cards and inspection of moist media.",

        prevention:
            "Avoid chronically wet media, remove algae and debris and maintain sanitation.",

        greenhouse:
            "Biological controls can be useful alongside irrigation management."
    },


    {
        id: "hornworm",
        name: "Tomato Hornworm",
        scientific: "Manduca spp.",
        type: "Pest",
        category: "insect",
        icon: "🐛",

        overview:
            "Large caterpillars capable of rapidly defoliating tomato, pepper and related plants.",

        identification:
            "Large green caterpillars with distinctive markings and a horn-like rear structure.",

        hosts:
            "Tomato, pepper and related Solanaceae.",

        damage:
            "Large holes and rapid loss of leaves.",

        monitoring:
            "Inspect foliage and stems for caterpillars and feeding damage.",

        prevention:
            "Hand removal where practical, sanitation and IPM.",

        greenhouse:
            "Frequent scouting is useful because a few caterpillars can consume substantial foliage."
    },


    {
        id: "cucumber-beetle",
        name: "Cucumber Beetle",
        scientific: "Diabrotica / Acalymma spp.",
        type: "Pest",
        category: "insect",
        icon: "🪲",

        overview:
            "Important cucurbit pests. Adults feed on foliage and flowers and some species can transmit bacterial wilt.",

        identification:
            "Small beetles with species-specific stripes or spots.",

        hosts:
            "Cucumber, squash, melon and related cucurbits.",

        damage:
            "Leaf and flower feeding, seedling injury and disease transmission.",

        monitoring:
            "Inspect seedlings and flowers.",

        prevention:
            "Use exclusion and IPM; remove weeds and scout early.",

        greenhouse:
            "Protect young plants and identify the pest early."
    },


    {
        id: "leafminer",
        name: "Leafminer",
        scientific: "Agromyzidae and other leaf-mining insects",
        type: "Pest",
        category: "insect",
        icon: "🍃",

        overview:
            "Larvae tunnel between leaf surfaces, creating winding mines.",

        identification:
            "Winding or blotchy tunnels inside leaves.",

        hosts:
            "Many vegetables and ornamentals.",

        damage:
            "Reduced photosynthetic area and cosmetic damage.",

        monitoring:
            "Inspect new leaves for mines and adults.",

        prevention:
            "Remove heavily infested leaves when appropriate and inspect incoming plants.",

        greenhouse:
            "Exclusion and biological control may be useful."
    },


    // =====================================================
    // DISEASES
    // =====================================================

    {
        id: "early-blight",
        name: "Early Blight",
        scientific: "Alternaria spp.",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A fungal disease commonly affecting tomato and related crops.",

        symptoms:
            "Brown leaf spots, often with concentric rings, commonly beginning on older foliage.",

        favorable:
            "Leaf wetness, warm conditions and infected debris can favor disease development.",

        affected:
            "Tomato, potato and related crops.",

        prevention:
            "Sanitation, airflow, appropriate irrigation, rotation and resistant varieties where available.",

        greenhouse:
            "Reduce prolonged leaf wetness and remove infected debris."
    },


    {
        id: "late-blight",
        name: "Late Blight",
        scientific: "Phytophthora infestans",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A destructive disease of tomato and potato that can spread rapidly under favorable conditions.",

        symptoms:
            "Water-soaked or dark lesions on leaves and stems; fruit can develop firm brown lesions.",

        favorable:
            "Cool temperatures and prolonged moisture.",

        affected:
            "Tomato and potato.",

        prevention:
            "Use clean material, monitor conditions, reduce leaf wetness and follow local plant-health guidance.",

        greenhouse:
            "Ventilation and humidity management are important."
    },


    {
        id: "powdery-mildew",
        name: "Powdery Mildew",
        scientific: "Several powdery mildew fungi",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A group of fungal diseases characterized by white powdery growth on plant surfaces.",

        symptoms:
            "White powdery patches, leaf distortion, yellowing and premature leaf loss.",

        favorable:
            "Moderate temperatures, susceptible hosts and poor airflow can contribute.",

        affected:
            "Many greenhouse crops including cucumber, tomato and pepper.",

        prevention:
            "Use resistant varieties where available, improve airflow and manage canopy density.",

        greenhouse:
            "Avoid excessive nitrogen and maintain suitable ventilation and humidity."
    },


    {
        id: "downy-mildew",
        name: "Downy Mildew",
        scientific: "Various oomycetes",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A group of diseases that cause leaf lesions and sporulation under humid conditions.",

        symptoms:
            "Yellow or pale angular leaf lesions; fuzzy growth may appear underneath leaves.",

        favorable:
            "High humidity and prolonged leaf wetness.",

        affected:
            "Cucumber, lettuce, spinach and other crops depending on pathogen.",

        prevention:
            "Ventilation, reduced leaf wetness, sanitation and resistant varieties where available.",

        greenhouse:
            "Manage humidity and airflow carefully, especially overnight."
    },


    {
        id: "botrytis",
        name: "Botrytis Gray Mold",
        scientific: "Botrytis cinerea",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A common greenhouse fungal disease affecting leaves, stems, flowers and fruit.",

        symptoms:
            "Soft brown lesions and characteristic gray fuzzy mold.",

        favorable:
            "High humidity, cool conditions and dead plant tissue.",

        affected:
            "Tomato, cucumber, pepper, lettuce and many ornamentals.",

        prevention:
            "Remove dead tissue, improve airflow, reduce condensation and avoid prolonged wetness.",

        greenhouse:
            "Ventilation and sanitation are especially important."
    },


    {
        id: "fusarium-wilt",
        name: "Fusarium Wilt",
        scientific: "Fusarium oxysporum species complexes",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A soil- or root-associated wilt disease affecting crop-specific hosts.",

        symptoms:
            "Yellowing, progressive wilting, vascular discoloration and stunting.",

        favorable:
            "Warm root-zone conditions and contaminated soil or planting material.",

        affected:
            "Tomato, cucumber and many other crops depending on the pathogen.",

        prevention:
            "Resistant cultivars where available, clean media, sanitation and avoiding contaminated soil movement.",

        greenhouse:
            "Sanitation remains important in soilless systems because pathogens can move through water, tools and plant material."
    },


    {
        id: "bacterial-wilt",
        name: "Bacterial Wilt",
        scientific: "Ralstonia solanacearum species complex",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A bacterial vascular disease that can cause rapid wilt, especially in warm conditions.",

        symptoms:
            "Sudden wilting and vascular discoloration; symptoms vary by host.",

        favorable:
            "Warm temperatures and contaminated water or soil.",

        affected:
            "Tomato, pepper, eggplant, potato and other hosts.",

        prevention:
            "Clean planting material and water, sanitation, resistant varieties where available and prevent movement of contaminated soil.",

        greenhouse:
            "Remove infected plants and sanitize tools and surfaces using appropriate plant-health practices."
    },


    {
        id: "septoria",
        name: "Septoria Leaf Spot",
        scientific: "Septoria lycopersici",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A fungal leaf disease particularly associated with tomato.",

        symptoms:
            "Small circular leaf spots with darker margins, often beginning on older leaves.",

        favorable:
            "Leaf wetness and splashing water.",

        affected:
            "Tomato primarily.",

        prevention:
            "Reduce leaf wetness, remove infected debris, maintain airflow and avoid overhead irrigation where possible.",

        greenhouse:
            "Sanitation and humidity management are important."
    },


    {
        id: "damping-off",
        name: "Damping-Off",
        scientific: "Pythium, Rhizoctonia and other pathogens",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "A seedling disease that can cause poor emergence and collapse near the soil line.",

        symptoms:
            "Poor emergence or young seedlings becoming water-soaked, thin and collapsing.",

        favorable:
            "Overwatering, poor drainage, contaminated media and high humidity.",

        affected:
            "Many seedlings.",

        prevention:
            "Clean media and trays, controlled watering, drainage, airflow and avoiding overcrowding.",

        greenhouse:
            "Seedling sanitation and irrigation control are especially important."
    },


    {
        id: "mosaic-virus",
        name: "Mosaic Virus Diseases",
        scientific: "Several plant viruses",
        type: "Disease",
        category: "disease",
        icon: "🦠",

        overview:
            "Virus diseases can cause mottling, distortion, stunting and yield reduction. Exact symptoms depend on the virus and host.",

        symptoms:
            "Mosaic or mottled leaves, curling, stunting and distorted growth.",

        favorable:
            "Vectors, infected plant material, contaminated tools and mechanical contact can spread some viruses.",

        affected:
            "Many vegetable crops.",

        prevention:
            "Use clean planting material, manage vectors, remove infected plants when recommended and sanitize tools.",

        greenhouse:
            "Prevention is critical because virus infections generally cannot be cured after infection."
    },


    // =====================================================
    // SOIL
    // =====================================================

    {
        id: "soil-ph",
        name: "Soil pH",
        scientific: "Root-zone chemistry",
        type: "Soil",
        category: "soil",
        icon: "🧪",

        overview:
            "pH describes how acidic or alkaline a growing medium is. It affects nutrient availability and root health.",

        key:
            "Many vegetables perform well in a mildly acidic to near-neutral range, but the target depends on crop and production system.",

        monitoring:
            "Use a properly calibrated pH meter or reliable test method and sample consistently.",

        prevention:
            "Adjust pH from test results and crop requirements rather than guessing."
    },


    {
        id: "soil-moisture",
        name: "Soil Moisture",
        scientific: "Root-zone water availability",
        type: "Soil",
        category: "soil",
        icon: "💧",

        overview:
            "Root-zone moisture determines water availability and influences oxygen around roots.",

        key:
            "Both drought stress and prolonged saturation can harm plants.",

        monitoring:
            "Use sensors, substrate weight, visual checks and crop response together.",

        prevention:
            "Match irrigation frequency and volume to crop, media, weather and growth stage."
    },


    {
        id: "nitrogen",
        name: "Nitrogen",
        scientific: "N",
        type: "Soil",
        category: "soil",
        icon: "🌿",

        overview:
            "A major plant nutrient needed for leaves, stems and chlorophyll production.",

        key:
            "Too little can cause pale slow growth; too much can create excessive vegetative growth.",

        monitoring:
            "Use soil/media tests and crop observations.",

        prevention:
            "Base fertilizer decisions on crop demand and test results."
    },


    {
        id: "phosphorus",
        name: "Phosphorus",
        scientific: "P",
        type: "Soil",
        category: "soil",
        icon: "🌱",

        overview:
            "A nutrient involved in energy transfer, root development and reproductive growth.",

        key:
            "Availability is strongly influenced by pH and root-zone conditions.",

        monitoring:
            "Use soil or media testing rather than relying only on visual diagnosis.",

        prevention:
            "Apply according to crop needs and test results."
    },


    {
        id: "potassium",
        name: "Potassium",
        scientific: "K",
        type: "Soil",
        category: "soil",
        icon: "🍃",

        overview:
            "A major nutrient involved in water regulation, enzyme activity and overall plant performance.",

        key:
            "Deficiency can reduce vigor and cause leaf-edge symptoms; confirm suspected deficiency with testing.",

        monitoring:
            "Combine tissue/media testing with crop observations.",

        prevention:
            "Maintain balanced fertility and avoid excessive single-nutrient applications."
    },


    {
        id: "drainage",
        name: "Drainage & Root Oxygen",
        scientific: "Root-zone physical conditions",
        type: "Soil",
        category: "soil",
        icon: "🪨",

        overview:
            "Roots need both water and oxygen. Poor drainage can reduce oxygen and encourage root diseases.",

        key:
            "Good structure and appropriate irrigation help maintain a healthy air-water balance.",

        monitoring:
            "Observe drainage, container weight and root-zone moisture sensors.",

        prevention:
            "Use suitable media, drainage holes and irrigation scheduling."
    },


    {
        id: "salinity",
        name: "Salinity & EC",
        scientific: "Electrical conductivity",
        type: "Soil",
        category: "soil",
        icon: "⚡",

        overview:
            "Electrical conductivity is commonly used as an indicator of dissolved salts in soil or nutrient solution.",

        key:
            "Excessive salinity can make water harder for roots to take up and can cause crop-specific injury.",

        monitoring:
            "Use an EC meter suitable for the production system.",

        prevention:
            "Monitor fertilizer concentration and irrigation-water quality."
    }
];


// =====================================================
// INITIALIZE
// =====================================================

function initializeEncyclopedia() {

    const grid =
        document.getElementById("encyclopediaGrid");

    const search =
        document.getElementById("encyclopediaSearch");

    const buttons =
        document.querySelectorAll(".category-button");

    if (!grid) return;


    function render() {

        const query =
            (search?.value || "")
                .trim()
                .toLowerCase();

        const activeButton =
            document.querySelector(
                ".category-button.active"
            );

        const category =
            activeButton?.dataset.category || "all";


        const filtered =
            ENCYCLOPEDIA_DATA.filter(item => {

                const matchesCategory =
                    category === "all" ||
                    item.category === category;

                const searchableText =
                    JSON.stringify(item)
                        .toLowerCase();

                return (
                    matchesCategory &&
                    searchableText.includes(query)
                );
            });


        if (filtered.length === 0) {

            grid.innerHTML = `
                <div class="encyclopedia-empty">
                    <h2>No results found</h2>
                    <p>
                        Try another search or category.
                    </p>
                </div>
            `;

            return;
        }


        grid.innerHTML =
            filtered.map(cardHTML).join("");


        grid.querySelectorAll(".learn-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const item =
                            ENCYCLOPEDIA_DATA.find(
                                x =>
                                    x.id ===
                                    button.dataset.id
                            );

                        openEncyclopediaModal(item);
                    }
                );
            });
    }


    function cardHTML(item) {

        return `
            <article
                class="knowledge-card advanced-card"
                data-category="${item.category}"
            >

                <div class="knowledge-icon">
                    ${item.icon}
                </div>

                <div class="advanced-card-content">

                    <span class="knowledge-type">
                        ${escapeHTML(
                            item.type.toUpperCase()
                        )}
                    </span>

                    <h2>
                        ${escapeHTML(item.name)}
                    </h2>

                    <p class="scientific-name">
                        ${escapeHTML(
                            item.scientific || ""
                        )}
                    </p>

                    <p>
                        ${escapeHTML(item.overview)}
                    </p>

                    <button
                        class="learn-button"
                        data-id="${item.id}"
                    >
                        View Full Details →
                    </button>

                </div>

            </article>
        `;
    }


    if (search) {

        search.addEventListener(
            "input",
            render
        );
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                render();
            }
        );
    });


    render();
}


// =====================================================
// MODAL
// =====================================================

function openEncyclopediaModal(item) {

    if (!item) return;


    let modal =
        document.getElementById(
            "encyclopediaModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "encyclopediaModal";

        modal.className =
            "encyclopedia-modal hidden";

        document.body.appendChild(modal);
    }


    modal.innerHTML = `

        <div class="encyclopedia-backdrop"></div>

        <div class="encyclopedia-modal-card">

            <button
                class="encyclopedia-close"
                aria-label="Close"
            >
                ×
            </button>


            <div class="modal-title">

                <div class="modal-icon">
                    ${item.icon}
                </div>

                <div>

                    <span class="knowledge-type">
                        ${escapeHTML(
                            item.type.toUpperCase()
                        )}
                    </span>

                    <h2>
                        ${escapeHTML(item.name)}
                    </h2>

                    <p class="scientific-name">
                        ${escapeHTML(
                            item.scientific || ""
                        )}
                    </p>

                </div>

            </div>


            <div class="modal-body">

                ${detailSection(
                    "Overview",
                    item.overview
                )}

                ${
                    item.conditions
                        ? conditionsSection(
                            item.conditions
                        )
                        : ""
                }

                ${
                    item.growth
                        ? detailSection(
                            "Growth & Development",
                            item.growth
                        )
                        : ""
                }

                ${
                    item.nutrition
                        ? detailSection(
                            "Nutrition",
                            item.nutrition
                        )
                        : ""
                }

                ${
                    item.identification
                        ? detailSection(
                            "Identification",
                            item.identification
                        )
                        : ""
                }

                ${
                    item.hosts
                        ? detailSection(
                            "Common Hosts",
                            item.hosts
                        )
                        : ""
                }

                ${
                    item.damage
                        ? detailSection(
                            "Damage / Impact",
                            item.damage
                        )
                        : ""
                }

                ${
                    item.symptoms
                        ? detailSection(
                            "Symptoms",
                            item.symptoms
                        )
                        : ""
                }

                ${
                    item.favorable
                        ? detailSection(
                            "Favorable Conditions",
                            item.favorable
                        )
                        : ""
                }

                ${
                    item.affected
                        ? detailSection(
                            "Affected Crops",
                            item.affected
                        )
                        : ""
                }

                ${
                    item.monitoring
                        ? detailSection(
                            "Monitoring",
                            item.monitoring
                        )
                        : ""
                }

                ${
                    item.pests?.length
                        ? listSection(
                            "Common Pests",
                            item.pests
                        )
                        : ""
                }

                ${
                    item.diseases?.length
                        ? listSection(
                            "Common Diseases",
                            item.diseases
                        )
                        : ""
                }

                ${
                    item.prevention
                        ? detailSection(
                            "Prevention & IPM",
                            item.prevention
                        )
                        : ""
                }

                ${
                    item.greenhouse
                        ? detailSection(
                            "Greenhouse Management",
                            item.greenhouse
                        )
                        : ""
                }

                ${
                    item.ai
                        ? detailSection(
                            "AI Identification Notes",
                            item.ai
                        )
                        : ""
                }

                ${
                    item.key
                        ? detailSection(
                            "Key Information",
                            item.key
                        )
                        : ""
                }

            </div>

        </div>
    `;


    modal.classList.remove("hidden");


    modal.querySelector(
        ".encyclopedia-backdrop"
    ).onclick =
        closeEncyclopediaModal;


    modal.querySelector(
        ".encyclopedia-close"
    ).onclick =
        closeEncyclopediaModal;
}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeEncyclopediaModal() {

    const modal =
        document.getElementById(
            "encyclopediaModal"
        );

    if (modal) {
        modal.classList.add("hidden");
    }
}


// =====================================================
// DETAIL SECTION
// =====================================================

function detailSection(title, text) {

    return `

        <section
            class="encyclopedia-detail-section"
        >

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(text)}
            </p>

        </section>

    `;
}


// =====================================================
// LIST SECTION
// =====================================================

function listSection(title, list) {

    return `

        <section
            class="encyclopedia-detail-section"
        >

            <h3>
                ${escapeHTML(title)}
            </h3>

            <div class="detail-tags">

                ${list.map(item => `

                    <span>
                        ${escapeHTML(item)}
                    </span>

                `).join("")}

            </div>

        </section>

    `;
}


// =====================================================
// CONDITIONS
// =====================================================

function conditionsSection(conditions) {

    const rows = [

        [
            "🌡️",
            "Temperature",
            conditions.temperature
        ],

        [
            "💦",
            "Humidity",
            conditions.humidity
        ],

        [
            "☀️",
            "Light",
            conditions.light
        ],

        [
            "💧",
            "Water",
            conditions.water
        ],

        [
            "🪨",
            "Soil / Media",
            conditions.soil
        ],

        [
            "🧪",
            "pH",
            conditions.ph
        ]

    ];


    return `

        <section
            class="encyclopedia-detail-section"
        >

            <h3>
                Growing Conditions
            </h3>

            <div class="condition-grid">

                ${rows.map(row => `

                    <div class="condition-box">

                        <span>
                            ${row[0]}
                        </span>

                        <div>

                            <small>
                                ${escapeHTML(row[1])}
                            </small>

                            <strong>
                                ${escapeHTML(row[2])}
                            </strong>

                        </div>

                    </div>

                `).join("")}

            </div>

        </section>

    `;
}


// =====================================================
// SECURITY / TEXT ESCAPING
// =====================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            character => ({

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[character])
        );
}
document.addEventListener("DOMContentLoaded", initializeEncyclopedia);