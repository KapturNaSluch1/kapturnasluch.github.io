/* ------------------------------------------------------------------ */
/* Resources page - dynamic DOM generation from TRANSLATIONS          */
/*                                                                    */
/* Data model:                                                        */
/*   res_hero_title / res_hero_desc     -> page header                */
/*   res_new                            -> shared "New" badge label   */
/*   resources_section_<i1>_name        -> category heading           */
/*   resources_section_<i1>_<i2>_*      -> card fields                */
/*     _emote     -> emoji shown in the card header                   */
/*     _title     -> card title                                       */
/*     _subtitle  -> optional subtitle (smaller text under the title) */
/*     _desc      -> card description (may contain HTML)              */
/*     _href      -> card link target (anchor or URL)                 */
/*     _new       -> "1" to show the "New" badge                      */
/*                                                                    */
/* Order is derived from the numeric prefixes of the keys.            */
/* ------------------------------------------------------------------ */

/* All section indices (i1) that have a "_name" key. */
function resourceSectionIndices() {
	const tables = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS) || {};
	const table = tables[currentLang] || tables.en || {};
	const re = /^resources_section_(\d+)_name$/;
	const idxs = new Set();

	for (const key of Object.keys(table)) {
		const m = key.match(re);

		if (m) {
			idxs.add(Number(m[1]));
		}
	}

	return [...idxs].sort((a, b) => a - b);
}

/* All card indices (i2) within a section (i1). */
function resourceCardIndices(sectionIdx) {
	const tables = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS) || {};
	const table = tables[currentLang] || tables.en || {};
	const re = new RegExp(`^resources_section_${sectionIdx}_(\\d+)_title$`);
	const idxs = new Set();

	for (const key of Object.keys(table)) {
		const m = key.match(re);

		if (m) {
			idxs.add(Number(m[1]));
		}
	}

	return [...idxs].sort((a, b) => a - b);
}

function buildResCard(sectionIdx, cardIdx) {
	const base = `resources_section_${sectionIdx}_${cardIdx}`;

	const href     = translate(`${base}_href`) || "#";
	const emote    = translate(`${base}_emote`) || "";
	const title    = translate(`${base}_title`) || "";
	const subtitle = translate(`${base}_subtitle`) || "";
	const desc     = translate(`${base}_desc`) || "";
	const isNew    = String(translate(`${base}_new`) || "") === "1";

	const card = document.createElement("a");
	card.href = href;
	card.className = "res-card";

	// Head
	const head = document.createElement("div");
	head.className = "res-card-head";

	const iconSpan = document.createElement("span");
	iconSpan.className = "res-icon";
	iconSpan.textContent = emote;
	head.appendChild(iconSpan);

	if (isNew) {
		const badge = document.createElement("span");
		badge.className = "badge-new";
		badge.setAttribute("data-i18n", "res_new");
		badge.textContent = "New";
		head.appendChild(badge);
	}
	card.appendChild(head);

	// Title
	if (title) {
		const titleEl = document.createElement("div");
		titleEl.className = "res-title";
		titleEl.textContent = title;
		card.appendChild(titleEl);
	}

	// Optional subtitle
	if (subtitle) {
		const subEl = document.createElement("div");
		subEl.className = "res-desc";
		subEl.style.opacity = "0.75";
		subEl.textContent = subtitle;
		card.appendChild(subEl);
	}

	// Description (may contain HTML)
	if (desc) {
		const descEl = document.createElement("div");
		descEl.className = "res-desc";

		if (/<[a-z][\s\S]*>/i.test(desc)) {
			descEl.innerHTML = desc;
		} else {
			descEl.textContent = desc;
		}

		card.appendChild(descEl);
	}

	return card;
}

function buildResSection(sectionIdx) {
	const section = document.createElement("section");
	section.className = "cat-section";

	// Visible label follows the current UI language
	const name = translate(`resources_section_${sectionIdx}_name`);

	// Anchor id is always derived from the English name → stable across languages
	const englishName = translate(`resources_section_${sectionIdx}_name`, "en");
	const slug = englishName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "") || `section-${sectionIdx}`;

	section.id = slug;

	// Self-linking label
	const label = document.createElement("a");
	label.className = "cat-label";
	label.href = `#${slug}`;
	label.textContent = name;
	section.appendChild(label);

	const grid = document.createElement("div");
	grid.className = "res-grid";

	for (const cardIdx of resourceCardIndices(sectionIdx)) {
		grid.appendChild(buildResCard(sectionIdx, cardIdx));
	}

	section.appendChild(grid);

	return section;
}

function populateResourcesPage() {
	const main = document.querySelector("main.content");
	if (!main) {
		return;
	}

	// Page header
	const h1 = document.querySelector(".page-header h1");
	if (h1) {
		h1.textContent = translate("res_hero_title");
	}

	const p = document.querySelector(".page-header p");
	if (p) {
		p.textContent = translate("res_hero_desc");
	}

	const sections = resourceSectionIndices();
	main.replaceChildren(...sections.map(buildResSection));

	if (typeof processIconSpans === "function") {
		processIconSpans(main);
	}

	if (typeof processResIcons === "function") {
		processResIcons(main);
	}

	if (typeof applyTranslations === "function") {
		applyTranslations();
	}
}

/* --------------------------------------------------------------------- */
/* About page - dynamic DOM generation from TRANSLATIONS                 */
/*                                                                       */
/* Data model:                                                           */
/*   about_page_title / about_page_desc     -> page header               */
/*   about_cat_<i1>_name                    -> category heading          */
/*   about_cat_<i1>_desc                    -> optional small subtitle   */
/*   about_cat_<i1>_<i2>_q                  -> question text             */
/*   about_cat_<i1>_<i2>_a                  -> answer (may contain HTML) */
/*                                                                       */
/* Order is derived from the numeric prefixes of the keys.               */
/* --------------------------------------------------------------------- */

function categoryIndices() {
	const tables = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS) || {};
	const table = tables[currentLang] || tables.en || {};
	const re = /^about_cat_(\d+)_name$/;
	const idxs = new Set();

	for (const key of Object.keys(table)) {
		const m = key.match(re);
		if (m) {
			idxs.add(Number(m[1]));
		}
	}

	return [...idxs].sort((a, b) => a - b);
}

function questionIndicesFor(categoryIdx) {
	const tables = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS) || {};
	const table = tables[currentLang] || tables.en || {};

	const re = new RegExp(`^about_cat_${categoryIdx}_(\\d+)_q$`);
	const idxs = new Set();

	for (const key of Object.keys(table)) {
		const m = key.match(re);

		if (m) {
			idxs.add(Number(m[1]));
		}
	}

	return [...idxs].sort((a, b) => a - b);
}

function buildQaArticle(categoryIdx, questionIdx) {
	const base = `about_cat_${categoryIdx}_${questionIdx}`;
	const q = translate(`${base}_q`);
	const a = translate(`${base}_a`);

	const details = document.createElement("details");
	details.className = "qa";
	/*
	if (opts.open) {
		details.open = true;
	}
	*/

	const summary = document.createElement("summary");
	summary.className = "qa-q";

	// Question text
	const text = document.createElement("span");
	text.className = "qa-q-text";
	text.textContent = q;
	summary.appendChild(text);

	details.appendChild(summary);

	// Answer body
	if (a) {
		const body = document.createElement("div");
		body.className = "qa-a";

		// <details> content can't be a bare text node and still keep indentation
		// of only the first line, so wrap in a <p> when the answer is plain text.
		if (/<[a-z][\s\S]*>/i.test(a)) {
			body.innerHTML = a;
		} else {
			const p = document.createElement("p");
			p.textContent = a;
			body.appendChild(p);
		}
		details.appendChild(body);
	}

	return details;
}

function buildAboutSection(categoryIdx) {
	const section = document.createElement("section");
	section.className = "cat-section";

	// Visible label follows the current UI language
	const name = translate(`about_cat_${categoryIdx}_name`);

	// Anchor id is always derived from the English name → stable across languages
	const englishName = translate(`about_cat_${categoryIdx}_name`, "en");
	const slug = englishName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "") || `section-${categoryIdx}`;

	section.id = slug;

	const label = document.createElement("a");
	label.className = "cat-label";
	label.href = `#${slug}`;
	label.textContent = name;
	section.appendChild(label);

	const desc = translate(`about_cat_${categoryIdx}_desc`);
	if (desc) {
		const p = document.createElement("p");
		p.className = "cat-desc";
		p.textContent = desc;
		section.appendChild(p);
	}

	const qIdxs = questionIndicesFor(categoryIdx);
	qIdxs.forEach((idx2, i) => {
		section.appendChild(buildQaArticle(categoryIdx, idx2, { open: i === 0 }));
	});

	return section;
}

function populateAboutPage() {
	const main = document.querySelector("main.content");

	if (!main) {
		return;
	}

	const h1 = document.querySelector(".page-header h1");
	if (h1) {
		h1.textContent = translate("about_page_title");
	}

	const p = document.querySelector(".page-header p");
	if (p) {
		p.textContent = translate("about_page_desc");
	}

	const cats = categoryIndices();
	main.replaceChildren(...cats.map(buildAboutSection));

	if (typeof processIconSpans === "function") {
		processIconSpans(main);
	}

	if (typeof processResIcons === "function") {
		processResIcons(main);
	}

	if (typeof applyTranslations === "function") {
		applyTranslations();
	}
}

// Bootstrap - dispatch by scope, refresh on language toggle

document.addEventListener("DOMContentLoaded", () => {
	const scope =
		document.documentElement.getAttribute("data-i18n-scope") ||
		(typeof currentScope !== "undefined" ? currentScope : "index");

	if (scope === "resources") {
		populateResourcesPage();
	}

	if (scope === "about") {
		populateAboutPage();
	}

	// Wrap toggleLang so the page rebuilds in the new language.
	const originalToggle = window.toggleLang;
	if (typeof originalToggle === "function") {
		window.toggleLang = function () {
			originalToggle();

			if (scope === "resources") {
				populateResourcesPage();
			}

			if (scope === "about") {
				populateAboutPage();
			}
		};
	}
});