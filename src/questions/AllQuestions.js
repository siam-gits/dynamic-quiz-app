const AllQuestions = [
    {
      "id": 1,
      "category": "English",
      "question": "Choose the synonym for ‘fright’.",
      "options": ["placidity", "composure", "apprehension", "equanimity"],
      "correct": "apprehension"
    },
    {
      "id": 2,
      "category": "Bengali Literature",
      "question": "‘কম-দামে কেনা বেশী দামে বেচা আমাদের স্বাধীনতা’- বইটির লেখক কে?",
      "options": ["আবুল কালাম শামসুদ্দীন", "আবুল মনসুর আহমদ", "শামসুদ্দিন আবুল কালাম", "এস ওয়াজেদ আলী"],
      "correct": "আবুল মনসুর আহমদ"
    },
    {
      "id": 3,
      "category": "English Literature",
      "question": "“… I cannot but conclude the Bulk of your Natives, to be the most pernicious race of little odious vermin that Nature ever suffered to crawl upon the surface of the Earth”- the statement occurs in",
      "options": ["Robinson Crusoe", "A Doll’s House", "Vanity Fair", "Gulliver’s Travels"],
      "correct": "Gulliver’s Travels"
    },
    {
      "id": 4,
      "category": "Bangladesh Affairs",
      "question": "বাংলাদেশের জুলাই বিপ্লবের শহীদ আবু সাঈদ কোন বিশ্ববিদ্যালয়ের ছাত্র ছিলেন?",
      "options": ["ঢাকা বিশ্ববিদ্যালয়", "রংপুর বিশ্ববিদ্যালয়", "রাজশাহী বিশ্ববিদ্যালয়", "বেগম রোকেয়া বিশ্ববিদ্যালয়"],
      "correct": "বেগম রোকেয়া বিশ্ববিদ্যালয়"
    },
    {
      "id": 5,
      "category": "Science & Environment",
      "question": "ODS (Ozone Depleting Substances) এর ব্যবহার কমানোর জন্য কোন চুক্তি সাক্ষরিত হয়?",
      "options": ["কিয়োটো প্রোটোকল", "মন্ট্রিল প্রোটোকল", "প্যারিস চুক্তি", "রামসার কনভেনশন"],
      "correct": "মন্ট্রিল প্রোটোকল"
    },
    {
      "id": 6,
      "category": "English Literature",
      "question": "“Rubiyat of Khayyam” is attributed to",
      "options": ["Edward FitzGerald", "Scott Fitzgerald", "Thomas Fitzgerald", "William Fitzgerald"],
      "correct": "Edward FitzGerald"
    },
    {
      "id": 7,
      "category": "History",
      "question": "আশিষ নন্দী, শশী থারুর প্রমুখ লেখকের মতে দ্বি-জাতি তত্ত্বের প্রথম প্রবক্তা কোন্ সংগঠনটি?",
      "options": ["মুসলিম লীগ", "সর্ব ভারতীয় জাতীয় কংগ্রেস", "আর.এস.এস", "জমিয়তে-ই-হিন্দ"],
      "correct": "মুসলিম লীগ"
    },
    {
      "id": 8,
      "category": "Bengali Grammar",
      "question": "ভাষার অর্থযুক্ত ক্ষুদ্রতম একক কোনটি?",
      "options": ["অক্ষর", "রূপমূল", "শব্দ", "বর্গ"],
      "correct": "রূপমূল"
    },
    {
      "id": 9,
      "category": "Geography",
      "question": "গ্রিনল্যান্ড নিচের কোন রাষ্ট্রের অন্তর্ভুক্ত?",
      "options": ["সুইডেন", "ডেনমার্ক", "নরওয়ে", "ফিনল্যান্ড"],
      "correct": "ডেনমার্ক"
    },
    {
      "id": 10,
      "category": "Bengali Grammar",
      "question": "ধ্বনি ও বর্ণের পার্থক্য কোথায়?",
      "options": ["লেখার ধরনে", "উচ্চারণের বিশিষ্টতায়", "সংখ্যাগত পরিমানে", "ইন্দ্রিয় গ্রাহ্যে"],
      "correct": "ইন্দ্রিয় গ্রাহ্যে"
    },
    {
      "id": 11,
      "category": "Mathematics",
      "question": "PQR ত্রিভুজের ∠Q=90° এবং ∠P=2∠R হলে নিচের কোনটি সঠিক?",
      "options": ["PR=2QR", "PQ=2R", "PR=2PQ", "QR=2PQ"],
      "correct": "PR=2PQ"
    },
    {
      "id": 12,
      "category": "Bengali Grammar",
      "question": "‘সত্যকে স্বীকার করতে অনেক ব্যক্তিরাই চায়না’- এখানে ভুল ঘটেছে –",
      "options": ["বানান ও প্রত্যয়ের", "অর্থ ও বচনের", "অর্থ ও প্রত্যয়ের", "বানান ও বচনের"],
      "correct": "বানান ও বচনের"
    },
    {
      "id": 13,
      "category": "Bengali Literature",
      "question": "‘মৃগয়া’ শব্দের মৃগ বলতে কি বোঝানো হয়?",
      "options": ["বানর", "সিংহ", "পশু", "বন"],
      "correct": "পশু"
    },
    {
      "id": 14,
      "category": "Mathematics",
      "question": "যদি Logₓ4 = -2 হয়, তবে x = কত?",
      "options": ["1/2", "-1/2", "2", "-2"],
      "correct": "1/2"
    },
    {
      "id": 15,
      "category": "English Grammar",
      "question": "Identify the correct passive form, “People thought that the despot was corrupt”.",
      "options": ["The despot had been thought to be corrupt.", "It was thought that the despot was corrupt.", "The despot was the thought to be corrupt.", "The despot is thought to be corrupt."],
      "correct": "It was thought that the despot was corrupt."
    },
    {
      "id": 16,
      "category": "Mathematics",
      "question": "একটি গুণোত্তর ধারার পঞ্চম পদটি 32 ও অষ্টম পদটি 256 হলে উক্ত ধারার সাধারণ অনুপাত কত?",
      "options": ["8", "16", "2", "1/2"],
      "correct": "2"
    },
    {
      "id": 17,
      "category": "English Idioms",
      "question": "The idiom ‘icing on the cake’ means –",
      "options": ["a slice of the cake", "an attractive but unnecessary addition", "an attractive service", "an attractive and essential enhancement"],
      "correct": "an attractive but unnecessary addition"
    },
    {
      "id": 18,
      "category": "Bengali Grammar",
      "question": "‘পরিবার থেকে শিশুরা দূর’- এখানে ‘থেকে’ শব্দের সাথে যুক্ত ‘ই’-এর ব্যাকরণিক পরিচয় কী?",
      "options": ["উপসর্গ", "প্রত্যয়", "ধাতু", "বলক"],
      "correct": "বলক"
    },
    {
      "id": 19,
      "category": "English Grammar",
      "question": "‘We work every day except Friday’. In this sentence ‘except’ is a/an",
      "options": ["adjective", "noun", "preposition", "pronoun"],
      "correct": "preposition"
    },
    {
      "id": 20,
      "category": "Mathematics",
      "question": "1 জন লোক 1 টা কলা 1 মিনিটে খেতে পারে। তাহলে 5 জন লোকের 5 টা কলা খেতে কত মিনিট সময় লাগবে?",
      "options": ["5", "25", "1", "10"],
      "correct": "1"
    },
    {
      "id": 21,
      "category": "English Grammar",
      "question": "Identify the word that can be used as both singular and plural",
      "options": ["light", "shot", "criterion", "cannon"],
      "correct": "shot"
    },
    {
      "id": 22,
      "category": "History & World Affairs",
      "question": "প্রাচীন কালে কোন দেশে সিভিল সার্ভিসের ধারনা প্রথম উদ্ভূত হয়?",
      "options": ["মিশর", "গ্রীস", "চীন", "রোম"],
      "correct": "চীন"
    },
    {
      "id": 23,
      "category": "English Literature",
      "question": "The novel ‘Wuthering Heights’ was penned by the author under the penname",
      "options": ["Ellise Bellet", "Ellis Belle", "Ellis Bell", "Una Ellis"],
      "correct": "Ellis Bell"
    },
    {
      "id": 24,
      "category": "Bengali Literature",
      "question": "মধুসূদন দত্তের পূর্ববর্তী গুরুত্বপূর্ণ কবি কে?",
      "options": ["রবীন্দ্রনাথ ঠাকুর", "কায়কোবাদ", "ঈশ্বরচন্দ্র গুপ্ত", "ইসমাইল হোসেন সিরাজী"],
      "correct": "ঈশ্বরচন্দ্র গুপ্ত"
    },
    {
      "id": 25,
      "category": "History",
      "question": "লর্ড কর্নওয়ালিস ব্রিটিশ ভারতের গভর্নর জেনারেল হওয়ায় পূর্বে কোন ভূমিকায় ছিলেন?",
      "options": ["ব্রিটেনের পররাষ্ট্র মন্ত্রী", "ফ্রান্সে নিযুক্ত ব্রিটেনের রাষ্ট্রদূত", "যুক্তরাষ্ট্রের স্বাধীনতা যুদ্ধে ব্রিটিশ বাহিনীর প্রধান", "কেমব্রিজ বিশ্ববিদ্যালয়ের উপাচার্য"],
      "correct": "যুক্তরাষ্ট্রের স্বাধীনতা যুদ্ধে ব্রিটিশ বাহিনীর প্রধান"
    },
    {
      "id": 26,
      "category": "World History",
      "question": "প্রথম বিশ্বযুদ্ধে কোন চুক্তির মাধ্যমে সমাপ্ত হয়?",
      "options": ["প্যারিস চুক্তি", "ভার্সাই চুক্তি", "জেনেভা চুক্তি", "জেনেভা কনভেনশন"],
      "correct": "ভার্সাই চুক্তি"
    },
    {
      "id": 27,
      "category": "Bangladesh Constitution",
      "question": "সংবিধান অনুযায়ী জাতীয় সংসদের ইংরেজী নাম কী?",
      "options": ["Parliament", "National Parliament", "National Legislature", "The House of the Nation"],
      "correct": "The House of the Nation"
    },
    {
      "id": 28,
      "category": "Bengali Literature",
      "question": "কাজী নজরুল ইসলামের কোন্ উপন্যাসের কেন্দ্রীয় চরিত্র জাহাঙ্গীর?",
      "options": ["বাঁধন-হারা", "মৃত্যুক্ষুধা", "কুহেলিকা", "শিউলিমালা"],
      "correct": "কুহেলিকা"
    },
    {
      "id": 29,
      "category": "Bengali Grammar",
      "question": "‘স্বাধীন’ শব্দের ব্যুৎপত্তি কোনটি?",
      "options": ["স্বীয়-এর অধীন", "সবার অধীন", "স্ব-এর অধীন", "স্বত্তের-অধীন"],
      "correct": "স্ব-এর অধীন"
    },
    {
      "id": 30,
      "category": "Mathematics",
      "question": "একটি বই 10% ক্ষতিতে বিক্রি করা হইল। বিক্রয়মূল্য 60 টাকা বেশী হলে 5% লাভ হত। বইটির ক্রয়মূল্য কত টাকা?",
      "options": ["200", "300", "400", "500"],
      "correct": "400"
    },
    {
      "id": 31,
      "category": "Mathematics",
      "question": "একটা বাক্সে 4টা লাল, 3টা নীল, 2টা হলুদ ও 1টা সবুজ বল আছে। কমপক্ষে কয়টা বল উঠালে সেখানে অন্তত একটা লাল বল থাকবেই?",
      "options": ["5", "6", "7", "8"],
      "correct": "7"
    },
    {
      "id": 32,
      "category": "Bangladesh Geography",
      "question": "বাংলাদেশের সর্বোচ্চ সংখ্যক চা বাগান রয়েছে কোন জেলায়?",
      "options": ["সিলেট", "চট্টগ্রাম", "মৌলভীবাজার", "পঞ্চগড়"],
      "correct": "মৌলভীবাজার"
    },
    {
      "id": 33,
      "category": "World History",
      "question": "মার্কিন যুক্তরাষ্ট্রের কোন প্রেসিডেন্ট জাপানে পারমানবিক বোমা নিক্ষেপের অনুমোদন করেছিলেন?",
      "options": ["হ্যারি এস. ট্রুম্যান", "ফ্রাঙ্কলিন ডি. রুজভেল্ট", "রিচার্ড নিক্সন", "জর্জ ডাব্লিও বুশ"],
      "correct": "হ্যারি এস. ট্রুম্যান"
    },
    {
      "id": 34,
      "category": "English Vocabulary",
      "question": "Pick the correctly spelt word",
      "options": ["Conscintious", "Consientious", "Concientious", "Conscientious"],
      "correct": "Conscientious"
    },
    {
      "id": 35,
      "category": "World Affairs",
      "question": "নিম্নোক্ত কোন দেশটি ইউরোপিয়ান ইউনিয়নের (EU) সদস্য নয়?",
      "options": ["বুলগেরিয়া", "হাঙ্গেরি", "পোল্যান্ড", "সুইজারল্যান্ড"],
      "correct": "সুইজারল্যান্ড"
    },
    {
      "id": 36,
      "category": "Economics",
      "question": "Demographic Dividend বলতে কী বুঝায়?",
      "options": ["শিশু মৃত্যুর হার হ্রাস", "জন্মহার শূন্যের কোঠায় আনা", "জনসংখ্যার অধিকাং বেকার", "কর্মক্ষম বয়স গোষ্ঠীর অনুপাত বৃদ্ধি"],
      "correct": "কর্মক্ষম বয়স গোষ্ঠীর অনুপাত বৃদ্ধি"
    },
    {
      "id": 37,
      "category": "Bengali Vocabulary",
      "question": "‘এ কাজ করতে আমি বদ্ধ পরিকর’- এখানে ‘পরিকর’ শব্দের অর্থ কী?",
      "options": ["শ্বাস", "প্রতিজ্ঞা", "কোমর", "প্রতিশ্রুত"],
      "correct": "প্রতিশ্রুত"
    },
    {
      "id": 38,
      "category": "World Affairs",
      "question": "হ্যালিনা ইয়াকুব কোন দেশের রাষ্ট্রপতি ছিলেন?",
      "options": ["ব্রুনেই", "মালয়েশিয়া", "সিংগাপুর", "তানজানিয়া"],
      "correct": "সিংগাপুর"
    },
    {
      "id": 39,
      "category": "Anthropology",
      "question": "ভাষা-পরিবার অনুযায়ী সাঁওতাল জনগোষ্ঠী প্রধানত কোন পরিবার ভুক্ত?",
      "options": ["ইন্দো-আর্য", "দ্রাবিড়", "অস্ট্রিক-অস্ট্রো এশিয়াটিক (মুন্ডা)", "তিব্বত-বর্মী"],
      "correct": "অস্ট্রিক-অস্ট্রো এশিয়াটিক (মুন্ডা)"
    },
    {
      "id": 40,
      "category": "Bengali Grammar",
      "question": "কোন্ পদ্ধতি বিসর্গসন্ধির মাধ্যমে গঠিত?",
      "options": ["নীরব", "উজ্জ্বল", "মনোনীত", "সংগ্রাম"],
      "correct": "নীরব"
    },
    {
      "id": 41,
      "category": "Bangladesh History",
      "question": "১৯৫২ সালের ভাষা আন্দোলনে নেতৃত্বদানীয় ভূমিকা পালন করে সাংস্কৃতিক সংগঠন ‘তমদ্দুন মজলিস’। তমদ্দুন মজলিস-এর প্রতিষ্ঠাতা অধ্যাপক আবুল কাশেম ঢাকা বিশ্ব বিদ্যালয়ের কোন্ বিভাগের শিক্ষক ছিলেন?",
      "options": ["রসায়ন", "পদার্থ বিজ্ঞান", "অর্থনীতি", "ইসলামী শিক্ষা"],
      "correct": "পদার্থ বিজ্ঞান"
    },
    {
      "id": 42,
      "category": "Geography",
      "question": "নিম্নোক্ত কোন ভারতীয় রাজ্যের বাংলাদেশের সাথে কোন ভূমি সীমানা নাই?",
      "options": ["নাগাল্যান্ড", "মিজোরাম", "মেঘালয়", "আসাম"],
      "correct": "নাগাল্যান্ড"
    },
    {
      "id": 43,
      "category": "Geography",
      "question": "কেপ ভার্দে (Cape Verde) দ্বীপ রাষ্ট্রটি কোথায় অবস্থিত?",
      "options": ["পারস্য উপসাগর", "গ্রিন", "স্রেফ পলিদেশিয়া", "আফ্রিকা"],
      "correct": "আফ্রিকা"
    },
    {
      "id": 44,
      "category": "Mathematics",
      "question": "একটি লোহার গোলক গড়িয়ে একটি সমান আয়তনের গোলক তৈরী সম্ভব যাদের প্রত্যেকের ব্যাসার্ধ বড় গোলকটির অর্ধেক। নতুন গোলকের সংখ্যা কত?",
      "options": ["4", "8", "16", "2"],
      "correct": "8"
    },
    {
      "id": 45,
      "category": "English Literature",
      "question": "Who wrote “A Vindication of the Rights of Women”?",
      "options": ["Claire Clairmont", "Marry Wollstonecraft", "Mary Wollstonecraft Godwin", "Mary Shelley"],
      "correct": "Mary Wollstonecraft Godwin"
    },
    {
      "id": 46,
      "category": "Mathematics",
      "question": "যদি M = {a, b, 1, 2} এবং N = {1, 2} হয়, তবে N - M এর মান কত?",
      "options": ["{}", "{a,b}", "{0}", "{-a, -b}"],
      "correct": "{}"
    },
    {
      "id": 47,
      "category": "English Grammar",
      "question": "Fill in the blanks with appropriate words. ‘Selina knocked it ______ the park with her performance in culinary art’.",
      "options": ["outside", "out of", "inside", "off"],
      "correct": "out of"
    },
    {
      "id": 48,
      "category": "World History",
      "question": "ভারত পাকিস্তানের মধ্যে Indus ওয়াটার ট্রিটি (IWT) কোন সালে স্বাক্ষরিত হয়?",
      "options": ["১৯৪৮", "১৯৫৪", "১৯৫৫", "১৯৬০"],
      "correct": "১৯৬০"
    },
    {
      "id": 49,
      "category": "Mathematics",
      "question": "দুইটি সংখ্যার ল.সা.গু 4x² - 16x - 48, গ.সা.গু 2x + 4। একটি সংখ্যা 4x² + 20x + 24 হলে অপরটি –",
      "options": ["x² - 4", "2(x² - 4)", "4(x² - 4)", "x + 2"],
      "correct": "2(x² - 4)"
    },
    {
      "id": 50,
      "category": "Political Science",
      "question": "বাংলাদেশের রাজনীতি সম্পর্কে একজন আমেরিকান ঐতিহাসিক মন্তব্য করেছেন; ‘বাংলাদেশের রাজনীতি বড় প্রতিফলনকে কেন্দ্র করে নয়’ এই ঐতিহাসিকের নাম কি?",
      "options": ["এলভিন মাসকারেনহাস", "লরেন্স জিবিং", "নিক ফিল্ড", "হেনরি কিসিঞ্জার"],
      "correct": "লরেন্স জিবিং"
    },
    {
      "id": 51,
      "category": "Mathematics",
      "question": "একটি থলিতে 3 টি সবুজ এবং 2 টি লাল বল আছে। অপর একটি থলিতে 2 টি সবুজ এবং 5 টি লাল বল আছে। যদি প্রতিটি থলি থেকে 1 টি করে বল তোলা হয়। দুইটি বলের মধ্যে অন্তত একটি সবুজ হওয়ার সম্ভাবনা কত?",
      "options": ["5/7", "2/7", "5/12", "1/4"],
      "correct": "5/7"
    },
    {
      "id": 52,
      "category": "Bengali Literature",
      "question": "ফররুখ আহমদের গ্রন্থ কোনটি?",
      "options": ["হরফের ছড়া", "বর্ণশিক্ষা", "বর্ণপরিচয়", "সহজ ছড়া"],
      "correct": "হরফের ছড়া"
    },
    {
      "id": 53,
      "category": "Science & Technology",
      "question": "কোন যান্ত্রিক পিয়ারের চাকা ছোট হলে সংযুক্ত অবস্থায় বড়টির চেয়ে ছোট চাকাটি কিভাবে ঘুরবে?",
      "options": ["আগে", "জোরে", "একইভাবে", "কোনটিই নয়"],
      "correct": "জোরে"
    },
    {
      "id": 54,
      "category": "Mathematics",
      "question": "একটি ত্রিভুজের প্রথম কোণ দ্বিতীয় কোণের অর্ধেক। তৃতীয় কোণ প্রথম দুই কোণের বিয়োগফলের তিনগুণ। দ্বিতীয় কোণটি কত ডিগ্রী?",
      "options": ["30", "50", "60", "90"],
      "correct": "60"
    },
    {
      "id": 55,
      "category": "Bengali Grammar",
      "question": "কোন্ ধ্বনি পরিবর্তন যথাযথ নয়?",
      "options": ["ক্রন্দন > কাঁদা", "আঁজল > আঁজল", "সৎগীত > গীতিকা", "দন্ত > দাঁত"],
      "correct": "সৎগীত > গীতিকা"
    },
    {
      "id": 56,
      "category": "English Grammar",
      "question": "Which gender is the noun ‘neighbour’?",
      "options": ["Masculine", "Feminine", "Neuter", "Common"],
      "correct": "Common"
    },
    {
      "id": 57,
      "category": "English Vocabulary",
      "question": "A person who leaves his/her own country to settle permanently in another is called a/an",
      "options": ["immigrant", "emigrant", "migrant", "expatriate"],
      "correct": "emigrant"
    },
    {
      "id": 58,
      "category": "Economics",
      "question": "‘কেবল জ্ঞানের অভাব নয়, বরং সামর্থ্যের অভাবই দারিদ্রের মূল কারণ’- অর্থনীতিবিদ অমর্ত্য সেন কোন্ গ্রন্থে এই যুক্তি তুলে ধরেন?",
      "options": ["Development as Freedom", "Women and Human Development", "Development through Disposition", "Development, Environment and Power"],
      "correct": "Development as Freedom"
    },
    {
      "id": 59,
      "category": "English Grammar",
      "question": "Which sentence is correct?",
      "options": ["The picture was hanged on the wall", "The picture was hung on the wall", "The picture had hanged on the wall", "The picture had hunged on the wall"],
      "correct": "The picture was hung on the wall"
    },
    {
      "id": 60,
      "category": "Mathematics",
      "question": "একটি সমান্তর ধারার 4র্থ (চতুর্থ) এবং 12 তম পদের যোগফল 20। ঐ ধারার প্রথম 15 পদের যোগফল কত?",
      "options": ["100", "150", "200", "300"],
      "correct": "150"
    },
    {
      "id": 61,
      "category": "World Affairs",
      "question": "নর্থ আটলান্টিক ট্রিটি অরগানাইজেশন বা সামরিক জোট কত সালে স্বাক্ষরিত হয়?",
      "options": ["১৯৩৯", "১৯৪৫", "১৯৪৯", "১৯৫০"],
      "correct": "১৯৪৯"
    },
    {
      "id": 62,
      "category": "World Affairs",
      "question": "সম্প্রতি বাংলাদেশের সফর করে যাওয়া পাকিস্তানের উপ প্রধান মন্ত্রী ও পররাষ্ট্র মন্ত্রী, ইসহাক দার পাকিস্তানের কোন্ রাজনৈতিক দলের সঙ্গে সম্পৃক্ত?",
      "options": ["পাকিস্তান পিপলস পার্টি (PPP)", "পাকিস্তান তেহরিকে ইনসাফ (PTI)", "পাকিস্তান মুসলিম লীগ (নওয়াজ)", "জামায়াতে ইসলামী পাকিস্তান"],
      "correct": "পাকিস্তান মুসলিম লীগ (নওয়াজ)"
    },
    {
      "id": 63,
      "category": "English Literature",
      "question": "The play “Englishmen for My Money” was written by",
      "options": ["Christopher Marlowe", "Thomas Kyd", "William Haughton", "Ben Johnson"],
      "correct": "William Haughton"
    },
    {
      "id": 64,
      "category": "Bangladesh Affairs",
      "question": "বাংলাদেশের সবচেয়ে বড় গণমাধ্যম নিয়ন্ত্রক সংস্থা কোন্ টি?",
      "options": ["তথ্য মন্ত্রণালয়", "প্রেস কাউন্সিল", "বিটিআরসি", "বাংলাদেশ টেলিভিশন"],
      "correct": "তথ্য মন্ত্রণালয়"
    },
    {
      "id": 65,
      "category": "Mathematics",
      "question": "নীচের ধারার পরবর্তী সংখ্যা কোনটি? 1, √9, 5, √49, ...",
      "options": ["8", "9", "10", "12"],
      "correct": "9"
    },
    {
      "id": 66,
      "category": "Mathematics",
      "question": "যদি গতকাল শুক্রবার হতো, তাহলে আজ থেকে 81 তম দিন কি বার হবে?",
      "options": ["শুক্রবার", "বুধবার", "সোমবার", "রবিবার"],
      "correct": "বুধবার"
    },
    {
      "id": 67,
      "category": "Bengali Grammar",
      "question": "‘উৎক্ষেপণ’ শব্দের ‘উৎ’ উপসর্গ কোন অর্থে ধারণ করছে?",
      "options": ["জোর", "উর্ধ্ব", "আড়াল", "গতি"],
      "correct": "উর্ধ্ব"
    },
    {
      "id": 68,
      "category": "English Grammar",
      "question": "Select the sentence in which ‘better’ is an adverb",
      "options": ["We’re helping for better weather tomorrow", "Sound travels better in water than in air", "It’s hard to decide which one is better", "He joined the gym to better his health"],
      "correct": "Sound travels better in water than in air"
    },
    {
      "id": 69,
      "category": "English Grammar",
      "question": "‘Someone sneezed loudly at the back of the hall’. In this sentence the verb ‘sneezed’ is",
      "options": ["causative", "intransitive", "transitive", "factitive"],
      "correct": "intransitive"
    },
    {
      "id": 70,
      "category": "Bangladesh History",
      "question": "১৯১১ সালে বঙ্গভঙ্গ রদের পর ঢাকায় একটি বিশ্ববিদ্যালয় প্রতিষ্ঠার জন্য ব্রিটিশ সরকারের কাছে দেনদরবার করতে কোন্ নেতা অগ্রণী ভূমিকা পালন করেন?",
      "options": ["হাকিম আজমল খান", "শেরে বাংলা এ. কে. ফজলুল হক", "স্যার সলিমুল্লাহ", "স্যার আব্দুর রহিম"],
      "correct": "স্যার সলিমুল্লাহ"
    },
    {
      "id": 71,
      "category": "English Grammar",
      "question": "‘We know that the earth is a planet’ The underlined part is a/an",
      "options": ["noun clause", "adverbial clause", "adjective clause", "principal clause"],
      "correct": "noun clause"
    },
    {
      "id": 72,
      "category": "Pakistan History",
      "question": "পাকিস্তানের ১৯৭০ সালের সাধারণ নির্বাচনে প্রধান নির্বাচন কমিশনার কে ছিলেন?",
      "options": ["বিচারপতি সাত্তার", "বিচারপতি সায়েম", "বিচারপতি আবু সাঈদ চৌধুরী", "বিচারপতি হামুদুর রহমান"],
      "correct": "বিচারপতি সাত্তার"
    },
    {
      "id": 73,
      "category": "Bengali Grammar",
      "question": "কোন্ শব্দটি প্রত্যয়যোগে গঠিত?",
      "options": ["ডাক্তারখানা", "হাসপাতাল", "আকাশছোঁয়া", "গুণমান"],
      "correct": "ডাক্তারখানা"
    },
    {
      "id": 74,
      "category": "Bangladesh Affairs",
      "question": "আয়নাঘর কী?",
      "options": ["দুই কামরা", "পরিবেশ বান্ধব কৃষিকাজ", "গোপন কারাগার", "একটি হলিডে মুভি"],
      "correct": "গোপন কারাগার"
    },
    {
      "id": 75,
      "category": "World History",
      "question": "আফিম যুদ্ধ কোন দুইটি দেশের মধ্যে সংঘটিত হয়?",
      "options": ["চীন ও আফগানিস্তান", "চীন ও ইংল্যান্ড", "চীন ও রাশিয়া", "ইংল্যান্ড ও আফগানিস্তান"],
      "correct": "চীন ও ইংল্যান্ড"
    },
    {
      "id": 76,
      "category": "Mathematics",
      "question": "একটি ঘনকের সম্পূর্ণ পৃষ্ঠের ক্ষেত্রফল 48 বর্গমিটার। ঘনকটির কর্ণের দৈর্ঘ্য কত?",
      "options": ["2√2 মিটার", "2√3 মিটার", "2 মিটার", "2√6 মিটার"],
      "correct": "2√6 মিটার"
    },
    {
      "id": 77,
      "category": "World Affairs",
      "question": "নিম্নোক্ত কোন্ দেশ বা অঞ্চল জাতিসংঘের সদস্য দেশ নয়?",
      "options": ["তিমুর লিস্টি", "দক্ষিণ সুদান", "ওয়েস্টার্ন সাহারা", "সেন্ট্রাল আফ্রিকান রিপাবলিক"],
      "correct": "ওয়েস্টার্ন সাহারা"
    },
    {
      "id": 78,
      "category": "Bengali Grammar",
      "question": "রবীন্দ্রনাথ ঠাকুর শব্দের শুরুতে মাত্রাযুক্ত ও-কার ব্যবহার করতেন কেন?",
      "options": ["এ-কার মাত্র যুক্ত বলে", "‘এ’ ‘এ’ উচ্চারণ বোঝাতে", "‘আ’ উচ্চারণ বোঝাতে", "‘অ্যা’ উচ্চারণ বোঝাতে"],
      "correct": "‘অ্যা’ উচ্চারণ বোঝাতে"
    },
    {
      "id": 79,
      "category": "Mathematics",
      "question": "একটি ট্রেন প্রতি সেকেন্ডে 100 ফুট বেগে চলছে। এক ব্যক্তির বন্দুকের গুলির বেগ সেকেন্ডে 200 ফুট। উক্ত ব্যক্তি চলন্ত ট্রেনের 300 ফুট সামনে একটি স্তম্ভ লক্ষ্য করে গুলি ছুড়লে কত সেকেন্ড পর তা স্তম্ভকে আঘাত করবে?",
      "options": ["3", "1", "1.5", "0.5"],
      "correct": "3"
    },
    {
      "id": 80,
      "category": "Bangladesh Affairs",
      "question": "বাংলাদেশের জাতীয় দিবস কোনটি?",
      "options": ["২৬ মার্চ", "২১ ফেব্রুয়ারী", "১৬ ডিসেম্বর", "৫ আগষ্ট"],
      "correct": "২৬ মার্চ"
    },
    {
      "id": 81,
      "category": "Mathematics",
      "question": "ax + by = a², bx - ay = ab; এই সহ-সমীকরণের (x, y) এর সমাধান কোনটি?",
      "options": ["(a²,b²)", "(a,b)", "(0,a)", "(a, 0)"],
      "correct": "(a,0)"
    },
    {
      "id": 82,
      "category": "English Grammar",
      "question": "‘After lunch we went for a leisurely stroll’. Here ‘leisurely’ is a/ an",
      "options": ["adverb", "adjective", "noun", "conjunction"],
      "correct": "adjective"
    },
    {
      "id": 83,
      "category": "World Affairs",
      "question": "বিশ্বের প্রথম জাতিসংঘ শান্তিরক্ষী বাহিনী কোনটি?",
      "options": ["UNOSOM", "UNMOGIP", "UNTSO", "UNEF 1"],
      "correct": "UNTSO"
    },
    {
      "id": 84,
      "category": "Political Science",
      "question": "চব্বিশের গণঅভ্যুত্থানের পর বাংলাদেশের জাতীয় সংসদের সংস্কার বিষয়ে ঐক্যমতের অন্যতম প্রস্তাব কি?",
      "options": ["দ্বি স্তর বিশিষ্ট সংসদ", "সংসদের আসন বৃদ্ধি", "সংরক্ষিত নারী আসন বাতিল", "পি আর (PR) চালু করা"],
      "correct": "দ্বি স্তর বিশিষ্ট সংসদ"
    },
    {
      "id": 85,
      "category": "World Affairs",
      "question": "তুরস্কের বিচ্ছিন্নতাবাদী দল Kurdistan Workers’ Party বা PKK এর প্রতিষ্ঠাতা কে?",
      "options": ["জালাল তালাবানী", "মাসুদ বারজানী", "মাজলুম আবদি", "আবদুল্লাহ ওজালান"],
      "correct": "আবদুল্লাহ ওজালান"
    },
    {
      "id": 86,
      "category": "Bangladesh Constitution",
      "question": "বাংলাদেশের সংবিধানের আলোকে নিচের কোন্ অধিকারটি মৌলিক অধিকারের অন্তর্ভুক্ত নয়?",
      "options": ["বাক-স্বাধীনতার অধিকার", "শিক্ষার অধিকার", "সমাবেশের অধিকার", "ধর্মচর্চার অধিকার"],
      "correct": "শিক্ষার অধিকার"
    },
    {
      "id": 87,
      "category": "Mathematics",
      "question": "15 মিটার লম্বা একটি মইকে এমন ভাবে রাখা হয়েছে। একই প্রান্ত থেকে মইয়ের দৈর্ঘ্যের 3:2 অনুপাতে একটি পেরেক লাগানো আছে। অপর প্রান্তে কত কেজি ওজন দিলে মইয়ের ভারসাম্য আসবে? (এক প্রান্তে 4 কেজি ওজন আছে)",
      "options": ["45", "30", "15", "5"],
      "correct": "15"
    },
    {
      "id": 88,
      "category": "Bengali Grammar",
      "question": "পারিভাষিক শব্দ বলতে বুঝায়-",
      "options": ["ইংরেজি শব্দের বাংলা রূপান্তর", "বিদেশি শব্দের অনুবাদ", "বিষয়গত সুনির্দিষ্ট অর্থবোধক শব্দ", "ব্যবহারিক প্রয়োজনে নবনির্মিত শব্দ"],
      "correct": "বিষয়গত সুনির্দিষ্ট অর্থবোধক শব্দ"
    },
    {
      "id": 89,
      "category": "Economics",
      "question": "জিএসপি (GSP) এর পূর্ণ রূপ কী?",
      "options": ["Generalized System of Preference", "Global System of Positioning", "Global Strategic Partnership", "Government Support Program"],
      "correct": "Generalized System of Preference"
    },
    {
      "id": 90,
      "category": "World Affairs",
      "question": "নিম্নোক্ত কোন রাষ্ট্র সাংহাই কোঅপারেশন অরগানাইজেশন বা SCO এর সদস্য নয়?",
      "options": ["আজারবাইজান", "ভারত", "পাকিস্তান", "ইরান"],
      "correct": "আজারবাইজান"
    },
    {
      "id": 91,
      "category": "Bengali Literature",
      "question": "চর্যাপদের রচিত পদগুলো তিব্বতি থেকে বাংলায় রুপান্তর করেন-",
      "options": ["সুনীতিকুমার চট্টোপাধ্যায়", "হরপ্রসাদ শাস্ত্রী", "রাজেন্দ্রলাল মিত্র", "সুকুমার সেন"],
      "correct": "হরপ্রসাদ শাস্ত্রী"
    },
    {
      "id": 92,
      "category": "Bengali Grammar",
      "question": "‘তিনি কথা শুনে ঘুমাতে পারলেন না’- বাক্যটির অস্তিবাচক রূপ কী হবে?",
      "options": ["তিনি কথা না শুনে ঘুমাতে পারলেন", "তিনি কথা না শুনে ঘুমাতে পারলেন না", "তিনি কথা শুনে জেগে রইলেন", "তিনি কথা শুনে জেগে রইলেন"],
      "correct": "তিনি কথা শুনে জেগে রইলেন"
    },
    {
      "id": 93,
      "category": "Bengali Literature",
      "question": "আহমদ শরীফের মতে মধ্যযুগে চণ্ডীদাস কতজন কবি ছিলেন?",
      "options": ["2", "3", "4", "5"],
      "correct": "3"
    },
    {
      "id": 94,
      "category": "Geography",
      "question": "চীন, ভারত ও বাংলাদেশের প্রবাহিত নদী ব্রহ্মপুত্র, চীন বা তিব্বতে কী নামে পরিচিত?",
      "options": ["ইয়াংসি", "লিজিয়াং", "হুয়াইলি", "ইয়ারলুং সাংপো"],
      "correct": "ইয়ারলুং সাংপো"
    },
    {
      "id": 95,
      "category": "English Grammar",
      "question": "‘They talked about going on a vacation’. Here ‘going’ is a/an",
      "options": ["participle", "infinitive", "verbal noun", "gerund"],
      "correct": "gerund"
    },
    {
      "id": 96,
      "category": "World Affairs",
      "question": "নিম্নোক্ত কোন দেশটি ‘Five Eyes’ ভুক্ত নয়?",
      "options": ["অস্ট্রেলিয়া", "ফ্রান্স", "নিউজিল্যান্ড", "কানাডা"],
      "correct": "ফ্রান্স"
    },
    {
      "id": 97,
      "category": "Mathematics",
      "question": "x² + 6x - 27 ≤ 0 অসমতাটির সমাধান সেট নিচের কোনটি?",
      "options": ["[-9, 3]", "[3, ∞)", "(-9, 3)", "(-∞, -9]"],
      "correct": "[-9, 3]"
    },
    {
      "id": 98,
      "category": "Bengali Grammar",
      "question": "‘শিক্ষকে বুঝতে হবে শিক্ষার্থী কী চায়’- এই বাক্যে শিক্ষক ও শিক্ষার্থীর প্রয়োগ হয়েছে –",
      "options": ["একবচন বোঝাতে", "বহুবচন বোঝাতে", "একবচন ও বহুবচন উভয়ই বোঝাতে", "প্রথমটি একবচন ও পরেরটি বহুবচন বোঝাতে"],
      "correct": "বহুবচন বোঝাতে"
    },
    {
      "id": 99,
      "category": "World Affairs",
      "question": "বাংলাদেশের ICCPR এর স্বাক্ষরকারী দেশ। ICCPR এর পূর্ণরূপ কী?",
      "options": ["International Conference on Civil and Political Rights", "International Conference of Civil and Political Rights", "International Covenant on Civil and Political Rights", "International Covenant of Civil and Political Rights"],
      "correct": "International Covenant on Civil and Political Rights"
    },
    {
      "id": 100,
      "category": "Bangladesh Constitution",
      "question": "বাংলাদেশের ওয়ারেন্ট অব প্রেসিডেন্স অনুযায়ী সর্ব প্রথমে কে অবস্থান করেন?",
      "options": ["প্রধানমন্ত্রী", "রাষ্ট্রপতি", "প্রধান উপদেষ্টা", "প্রধান বিচারপতি"],
      "correct": "রাষ্ট্রপতি"
    }
  ]


export default AllQuestions;
