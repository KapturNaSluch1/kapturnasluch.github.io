// Shared strings - used by header/footer on every page

const TRANSLATIONS_SHARED = {
	en: {
		nav_home: "home",
		nav_resources: "resources",
		nav_about: "about",
		social_title: "Find me here",
		footer_copy: "Ⓛ All lefts reserved.",
		lang_label: ":flag_pl:"
	},
	pl: {
		nav_home: "strona główna",
		nav_resources: "zasoby",
		nav_about: "o mnie",
		social_title: "Tu mnie znajdziesz",
		footer_copy: "Ⓛ Wszystkie lewa zastrzeżone.",
		lang_label: ":flag_us:"
	},
};

// Index page

const TRANSLATIONS_INDEX = {
	en: {
		hero_tagline1: "Content creator",
		hero_tagline2: "Audio enthusiast",
		hero_desc: "The most controversial sound-related content creator in the Polish internet.",
		hero_cta: "Find me online",
		resources_link: "Resources",
	},

	pl: {
		hero_tagline1: "Twórca treści",
		hero_tagline2: "Pasjonat audio",
		hero_desc: "Najbardziej kontrowersyjny twórca treści związanych z dźwiękiem w Polskim internecie.",
		hero_cta: "Znajdź mnie online",
		resources_link: "Zasoby",
	},
};

/* ------------------------------------------------------------------ */
/* Resources page                                                     */
/*                                                                    */
/* Data model:                                                        */
/*   res_hero_title / res_hero_desc   -> page header                  */
/*   __order                          -> array of section slugs       */
/*   resources_section_<slug>         -> category heading             */
/*   resources_section_<slug>_<n>_*   -> card fields                  */
/*     _emote     -> emoji shown in the card header                   */
/*     _title     -> card title                                       */
/*     _subtitle  -> optional subtitle (smaller text under the title) */
/*     _desc      -> card description (may contain HTML)              */
/*     _href      -> card link target (anchor or URL)                 */
/*     _new       -> "1" to show the "New" badge                      */
/* ------------------------------------------------------------------ */

const TRANSLATIONS_RESOURCES = {
	en: {
		// Page header
		res_hero_desc: "Content authored by me, available for public reusage.",

		// Shared badge label
		res_new: "new",

		// Sections
		resources_section_1_name: "Main",
		resources_section_2_name: "Other",

		// Cards - 1
		resources_section_1_1_emote: "🎨",
		resources_section_1_1_title: "Movies materials",
		resources_section_1_1_desc: "A curated collection of resources that I've used in my work.",
		resources_section_1_1_href: "https://github.com/KapturNaSluch/resources",

		// Cards - 2
		resources_section_2_1_emote: "🖼️",
		resources_section_2_1_title: "Profile picture project",
		resources_section_2_1_desc: "",
		resources_section_2_1_href: "https://raw.githubusercontent.com/KapturNaSluch/resources/refs/heads/main/internal/visual/avatar.7z",

		resources_section_2_2_emote: "📚",
		resources_section_2_2_title: "External resources used",
		resources_section_2_2_desc: "A curated collection of resources from other creators that I rely on or refer to in my work.",
		resources_section_2_2_href: "https://github.com/KapturNaSluch/resources/blob/main/external/list.md",
	},

	pl: {
		// Page header
		res_hero_desc: "Treści mojego autorstwa udostępnione publicznie, do ponownego wykorzystania.",

		// Shared badge label
		res_new: "nowe",

		// Sections
		resources_section_1_name: "Główne",
		resources_section_2_name: "Inne",

		// Cards - 1
		resources_section_1_1_emote: "🎨",
		resources_section_1_1_title: "Materiały filmowe",
		resources_section_1_1_desc: "Wybrany zbiór zasobów, które zostały użyte w moich pracach.",
		resources_section_1_1_href: "https://github.com/KapturNaSluch/resources",

		// Cards - 2
		resources_section_2_1_emote: "🖼️",
		resources_section_2_1_title: "Projekt zdjęcia profilowego",
		resources_section_2_1_desc: "",
		resources_section_2_1_href: "https://raw.githubusercontent.com/KapturNaSluch/resources/refs/heads/main/internal/visual/avatar.7z",

		resources_section_2_2_emote: "📚",
		resources_section_2_2_title: "Użyte zasoby zewnętrzne",
		resources_section_2_2_desc: "Wybrany zbiór zasobów innych twórców, na których polegam bądź do których odnoszę się w swoich pracach.",
		resources_section_2_2_href: "https://github.com/KapturNaSluch/resources/blob/main/external/list.md",
	},
};

// About page

const TRANSLATIONS_ABOUT = {
	en: {
		// Page header
		about_page_desc: "Questions nobody asked, and answers nobody needed.",

		// Categories
		about_cat_1_name: "Beginnings",
		about_cat_1_desc: "",

		about_cat_2_name: "Profile",
		about_cat_2_desc: "",

		about_cat_3_name: "Content",
		about_cat_3_desc: "",

		// Questions - 1: Beginnings
		about_cat_1_1_q: "When did you start publishing your materials?",
		about_cat_1_1_a: "At the end of 2025 - I started publishing my content on one of the popular social platforms featuring vertical-format videos.",

		// Questions - 2: Profile
		about_cat_2_1_q: "Where did the username come from?",
		about_cat_2_1_a: "From a lack of creativity - the location where I started my public activity was cold, and given my innate tendency to catch various illnesses, a head covering didn't seem like a stupid idea.<br><br>The stupid idea was the covering itself - offering really very little protection against low temperatures. It was a <span class=\"logo\">Kaptur</span> (hood), and knowing the content I had decided to focus on at the time, the name <span class=\"logo\">Kaptur<span>Na</span>Słuch</span> wasn't hard to come up with.",

		// Questions - 3: Content
		about_cat_3_1_q: "Why do you make videos about this particular subject?",
		about_cat_3_1_a: "Sound accompanied me through half of my youth and will stay with me until the end of my life. Calling it a marriage would be inappropriate - not only because of the current state of musical art, but also because that union is mainly between people.<br><br>Throughout my existence I've produced very few tracks, and today I can be described as a person at rest.<br><br>After some time I decided that the only thing left for me, in a surge of uneducated, unrefined, and unsubordinated-to-the-standards-of-masterful-art rabble, was to join their ranks and then gradually inject my knowledge into them through exactly this kind of video.<br><br>Learning and text from unfamiliar authors long ago ceased to rule human mental sobriety and will reach absolutely no one.<br><br>In my works I try to be objective.",

		about_cat_3_2_q: "Why is it so hard to understand you?",
		about_cat_3_2_a: "A very long time ago I was involved in a certain accident. This accident was called education reform. Its consequence was completing all grades of primary school and, with that, acquiring the ability to 'beat around the bush', which in the eyes of simple people causes confusion, and among the young, disgust.<br><br>I dare say, however, that my vocabulary of the mother tongue is at the highest world level, which cannot be compared to the number of works of fine literature whose content I have ever become acquainted with. Those can be counted on the fingers of two hands.<br><br>The last school reading I read from cover to cover without the slightest grimace of discouragement was titled 'The Boys of Paul Street'. I was at most 13 years old at the time.<br><br>With the moment of my completing education, however, I began to appreciate my native language more, and I avoid ALL borrowings and(!) neologisms with a wide berth.<br><br>I think that's precisely why my content is hard to absorb - I can speak the language of an old man, while the dialect of the contemporary audience is a foreign concept to me.",

		about_cat_3_3_q: "How do you deal with unfair criticism?",
		about_cat_3_3_a: "Envy toward me is my daily bread. I am a person banned on at least five audiophile forums. So, as one might guess, expressing my own views comes all too easily to me.<br><br>The target audience environment of my content despises thinking people - its members consist of people who acquired their experience through practice, for which they had to prepare themselves through tedious study of theory.<br><br>My difference in views combined with the ability to think logically and flowery vocabulary is what people calling themselves with grand academic titles fear the most.<br><br>There exists a certain very interesting boundary in human reasoning, crossing which the ability to think logically turns into fear. One can compare it to debates between anti-theistic individuals and those marked by religion - the former have - for lack of better words - an 'emptied' certain fragment of memory in the brain, while in the latter it is occupied by a non-zero amount of data.<br><br>These radicals have at least one basic defense mechanism whose use depends on the degree of logic they encounter. The length of the fuse used to ignite it is regulated by the former.<br><br>This mechanism is called fury.<br><br>Guess which group I belong to.",

		about_cat_3_4_q: "How much do statistics influence what topics you choose for your next publications?",
		about_cat_3_4_a: "Numbers in the media space are merely values in databases and cannot really constitute for a person with a three-digit IQ a component determining either the quality of life or the work they are to prepare.<br><br>I dare say that - at least mine - the aforementioned IQ consists of at least three digits.",

		about_cat_3_5_q: "What does your typical day of work on a piece look like, and without which tool or app can you not imagine operating?",
		about_cat_3_5_a: "<ol><li>First I have to find an idea for the piece and then write a script.</li><li>After that I give it to six popular AI models to check.</li><li>After applying sometimes hundreds of manual corrections I try to find a free slot to step in front of the camera.</li><li>Once I have one, I have to prepare my characterisation.</li><li>Then plug in the right equipment and start recording.</li><li>Later comes the matter of transferring the material to the computer...</li><li>...and editing it.<br>This process can take even dozens of days.</li><li>In the meantime I work on audio processing<br>The only fully automated step.</li><li>After swapping the sound files it's time to export the video...</li><li>...and in the meantime I work on the thumbnail.<br>It's trivial and the most pleasant moment in the creative process - it takes no more than an hour.</li><li>After transferring the finished files to a mobile device, the final steps are:<li>adjusting styles, subtitle length, the description... and finally publishing.</li></li></ol><br>Narrowing down the set of tools I use during the creative process would be inappropriate, however it is publicly available.",

		about_cat_3_6_q: "Where do you draw inspiration on days when your mind is blank and you lack motivation?",
		about_cat_3_6_a: "<div class=\"blockquote\"><span>\"Sometimes a man thinks he has already seen the bottom of the well of human stupidity, but then meets someone thanks to whom he learns that this well has no bottom after all.\"</span><span>Stephen King</span></div><br>This quote is especially close to me, because it reminds me that there will ALWAYS be someone I can refer to.",

		about_cat_3_7_q: "Do you have a piece in your drawer that you put a ton of work into but ultimately never published?",
		about_cat_3_7_a: "Unpublished content is an inseparable consequence of self-criticism and development in art.<br><br>Projects whose publication has been suspended remain in that state solely and exclusively because of an insufficiently thought-out script.",

		about_cat_3_8_q: "In what direction would you like to develop your activity in two or three years?",
		about_cat_3_8_a: "I wouldn't like to.",

		about_cat_3_9_q: "If you could go back in time and give yourself one piece of advice before publishing your first post, what would it be?",
		about_cat_3_9_a: "Invest in a camera, good lighting, and adapters. Lots of adapters.",
	},

	pl: {
		// Page header
		about_page_desc: "Pytania, których nikt nie zadał, i odpowiedzi, których nikt nie potrzebował.",

		// Categories
		about_cat_1_name: "Początki",
		about_cat_1_desc: "",

		about_cat_2_name: "Profil",
		about_cat_2_desc: "",

		about_cat_3_name: "Treści",
		about_cat_3_desc: "",

		// Questions - 1: Początki
		about_cat_1_1_q: "Kiedy zacząłeś wstawiać materiały?",
		about_cat_1_1_a: "Pod koniec 2025 roku - rozpocząłem publikowanie swoich treści na jednej z popularnych platform społecznościowych zawierającej filmy w formacie pionowym.",

		// Questions - 2: Profil
		about_cat_2_1_q: "Skąd wzięła się nazwa użytkownika?",
		about_cat_2_1_a: "Z braku kreatywności - lokalizacja w okresie w którym rozpocząłem swoją publiczną działalność była chłodna, a z uwagi na moją wrodzoną skłonność do popadania w różnego rodzaju choroby, to nakrycie głowy nie wydawało się głupim pomysłem.<br><br>Głupim pomysłem było ono samo - zapewniające naprawdę niewielką ochronę przed niskimi temperaturami. Był nim <span class=\"logo\">Kaptur</span>, a znając zawartość treści, na których postanowiłem się wówczas skupić nazwa <span class=\"logo\">Kaptur<span>Na</span>Słuch</span> nie była trudna do wymyślenia.",

		// Questions - 3: Treści
		about_cat_3_1_q: "Dlaczego robisz filmy akurat o takiej tematyce?",
		about_cat_3_1_a: "Dźwięk towarzyszył mi przez połowę mojej młodości i pozostanie ze mną do końca życia. Natomiast nazwanie tego małżeństwem byłoby nieodpowiednie - nie tylko przez dzisiejszy stan sztuki muzycznej, ale też dlatego że ten związek zawiera się głównie pomiędzy ludźmi.<br><br>Przez cały okres mojego jestestwa wyprodukowałem mało utworów, a dziś można mnie określić jako osobę w stanie spoczynku.<br><br>Po jakimś czasie uznałem, że jedynym, co mi pozostaje w przypływie niewyedukowanego, niewysublimowanego oraz niepodporządkowanego wobec standardów arcymistrzowskiej sztuki barachła, będzie wstąpienie w ich szeregi, a następnie stopniowe wstrzykiwanie weń swojej wiedzy poprzez właśnie tego typu filmy.<br><br>Nauka oraz tekst od nieznajomych autorów już dawno przestały rządzić ludzką trzeźwością umysłu i nie dotrą do absolutnie nikogo.<br><br>W swoich pracach staram się być obiektywny.",

		about_cat_3_2_q: "Dlaczego tak ciężko Cię zrozumieć?",
		about_cat_3_2_a: "Bardzo dawno temu uczestniczyłem w pewnym wypadku. Wypadek ten nosił nazwę reformy szkolnictwa. Jego konsekwencją było ukończenie wszystkich klas szkoły podstawowej, a co za tym idzie nabycie umiejętności „lania wody”, która w oczach prostych osób powoduje zmieszanie, a wśród młodych wstręt.<br><br>Śmiem jednak twierdzić, że mój słownik języka ojczystego jest na najwyższym światowym poziomie, którego nie można przyrównać do ilości dzieł literatury pięknej, z których treścią kiedykolwiek się zapoznałem. Te można bowiem policzyć na palcach dwóch rąk.<br><br>Ostatnia lektura szkolna, którą przeczytałem od deski do deski bez najmniejszego grymasu zniechęcenia nosiła tytuł „Chłopcy z Placu Broni”. Miałem wówczas maksymalnie 13 lat.<br><br>Wraz z momentem ukończenia przeze mnie edukacji zacząłem jednak bardziej doceniać swój język ojczysty, a WSZELKIE zapożyczenia oraz(!) neologizmy omijam szerokim łukiem.<br><br>Myślę, że to jest właśnie powód, dla którego moje treści są trudne do przyswojenia - potrafię posługiwać się językiem starego człowieka, natomiast dialekt współczesnego odbiorcy jest dla mnie pojęciem obcym.",

		about_cat_3_3_q: "Jak radzisz sobie z niesprawiedliwą krytyką?",
		about_cat_3_3_a: "Zawiść wobec mnie jest dla mnie chlebem powszednim. Jestem osobą zbanowaną na co najmniej pięciu forach audiofilskich. Jak można się więc domyślić wyrażanie własnych poglądów przychodzi mi zbyt łatwo.<br><br>Docelowe środowisko odbiorców moich treści gardzi ludźmi myślącymi - jego członkowie składają się z osób, które swoje doświadczenie pozyskali w praktyce, co do której to musieli się przygotować poprzez żmudne studiowanie teorii.<br><br>Moja odmienność w poglądach połączona z umiejętnością logicznego myślenia oraz kwiecistym słownictwem jest tym, czego osoby określające się górnolotnymi tytułami naukowymi boją się najbardziej.<br><br>Istnieje pewna bardzo interesująca granica w ludzkim rozumowaniu, po przekroczeniu której umiejętność logicznego myślenia zamienia się w strach. Można to przyrównać do debat jednostek anty-teistycznych z tymi nacechowanymi religijnie - pierwsze mają - z braku lepszych słów - „opróżniony” pewien fragment pamięci w mózgu, zaś u drugich jest on zajęty przez niezerową ilość danych.<br><br>Radykałowie ci mają co najmniej jeden podstawowy mechanizm obronny, którego użycie jest uzależnione od stopnia logiki, z jaką się zetkną. Długość lontu, który służy do jego podpalenia jest zaś regulowana przeze tych pierwszych.<br><br>Mechanizm ten nosi nazwę furia.<br><br>Zgadnijcie, do której grupy należę.",

		about_cat_3_4_q: "Na ile statystyki wpływają na to, jakie tematy wybierasz do kolejnych publikacji?",
		about_cat_3_4_a: "Liczby w przestrzeni medialnej są jedynie wartościami w bazach danych i nie mogą raczej stanowić dla osoby o trzycyfrowym ilorazie inteligencji składowej określającej zarówno jakość życia, jak i pracę, którą ma opracować.<br><br>Śmiem twierdzić że - przynajmniej mój - wyżej wspomniany iloraz składa się właśnie z co najmniej trzech cyfer.",

		about_cat_3_5_q: "Jak wygląda Twój typowy dzień pracy nad materiałem i bez jakiego narzędzia lub aplikacji nie wyobrażasz sobie działania?",
		about_cat_3_5_a: "<ol><li>Najpierw muszę znaleźć pomysł na dany materiał a potem napisać scenariusz.</li><li>Po tym daje go sześciu popularnym modelom sztucznej inteligencji do sprawdzenia.</li><li>Po zastosowaniu nieraz setek ręcznych poprawek próbuję znaleźć wolny termin na wyjście przed kamerę.</li><li>Gdy już go mam, muszę przygotować swoją charakteryzację.</li><li>Dalej podłączyć odpowiedni sprzęt i zacząć nagrywać.</li><li>Później przychodzi kwestia przerzucenia materiału na komputer...</li><li>...oraz zmontowanie go.<br>Ten proces może zająć nawet kilkadziesiąt dni.</li><li>W międzyczasie zajmuję się obróbką audio<br>Jedyny proces w pełni zautomatyzowany.</li><li>Po zamianie plików dźwiękowych przychodzi czas na wyeksportowanie filmu...</li><li>...a w międzyczasie zajmuje się tworzeniem miniatury.<br>To błahostka i najprzyjemniejszy moment w procesie twórczym - nie zajmuje mi on więcej niż godziny.</li><li>Po transferze gotowych plików na urządzenie mobilne końcowymi czynnościami są:<li>dostosowanie styli, długości napisów, opisu... oraz wreszcie publikacja.</li></li></ol><br>Zawężenie zbioru narzędzi, z których korzystam podczas procesu twórczego byłoby nieodpowiednie, jednak jest on publicznie dostępny.",

		about_cat_3_6_q: "Skąd czerpiesz inspiracje w dniach, kiedy masz pustkę w głowie i brakuje Ci weny?",
		about_cat_3_6_a: "<div class=\"blockquote\"><span>„Czasami człowiek sądzi, że ujrzał już dno studni ludzkiej głupoty, ale spotyka kogoś, dzięki komu dowiaduje się, że ta studnia jednak nie ma dna”.</span><span>Stephen King</span></div><br>Ten cytat jest mi szczególnie bliski, bo przypomina mi, że ZAWSZE znajdzie się ktoś, do kogo mogę się odnieść.",

		about_cat_3_7_q: "Czy masz w szufladzie materiał, w który włożyłeś mnóstwo pracy, ale ostatecznie nigdy go nie opublikowałeś?",
		about_cat_3_7_a: "Nieopublikowane treści są w sztuce nierozłączną konsekwencją samokrytyki oraz rozwoju.<br><br>Projekty, których publikacja została wstrzymana trwają w tym stanie tylko i wyłącznie przez nieodpowiednio przemyślany scenariusz.",

		about_cat_3_8_q: "W jakim kierunku chciałbyś rozwinąć swoją działalność za dwa lub trzy lata?",
		about_cat_3_8_a: "Nie chciałbym.",

		about_cat_3_9_q: "Gdybyś mógł cofnąć się w czasie i dać sobie jedną radę przed publikacją pierwszego posta, co by to było?",
		about_cat_3_9_a: "Zainwestuj w kamerę, dobre światło i przejściówki. Dużo przejściówek.",
	},
};

// Scope resolution - which translation table is active

const TRANSLATIONS_BY_SCOPE = {
	index: TRANSLATIONS_INDEX,
	resources: TRANSLATIONS_RESOURCES,
	about: TRANSLATIONS_ABOUT,
};

function detectScope() {
	const htmlScope = document.documentElement.getAttribute("data-i18n-scope");

	if (htmlScope && TRANSLATIONS_BY_SCOPE[htmlScope]) {
		return htmlScope;
	}

	let retval = "index";

	if (/\/resources(\/|$)/i.test(window.location.pathname)) {
		retval = "resources";
	}
	if (/\/about(\/|$)/i.test(window.location.pathname)) {
		retval = "about";
	}

	return retval;
}

let currentScope = detectScope();

/* ------------------------------------------------------------------ */
/* Merge shared + page-scoped, then inject default page titles        */
/*                                                                    */
/* If a page-scoped table omits "<slug>_page_title", fall back to     */
/* the corresponding nav label:                                       */
/*   index_page_title      → nav_home                                 */
/*   resources_page_title  → nav_resources                            */
/*   about_page_title      → nav_about                                */
/*                                                                    */
/* If you explicitly add "<slug>_page_title" to a page table, it wins */
/* over the fallback.                                                 */
/* ------------------------------------------------------------------ */

function buildTranslations(lang) {
	const shared = TRANSLATIONS_SHARED[lang] || {};
	const scoped = (TRANSLATIONS_BY_SCOPE[currentScope] || {})[lang] || {};
	const merged = { ...shared, ...scoped };

	const pageTitleMap = {
		index: "nav_home",
		resources: "nav_resources",
		about: "nav_about",
	};

	for (const [slug, navKey] of Object.entries(pageTitleMap)) {
		const pageKey = `${slug}_page_title`;

		if (merged[pageKey] == null) {
			merged[pageKey] = merged[navKey] != null ? String(merged[navKey]) : "";
		}
	}

	return merged;
}

const TRANSLATIONS = {
	en: buildTranslations("en"),
	pl: buildTranslations("pl"),
};