// Locale runtime - uses TRANSLATIONS from i18n.js

function detectLang() {
	const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
	return nav.startsWith("pl") ? "pl" : "en";
}

let currentLang = detectLang();

function translate(key, forceLang = null, fallback = "en", on_empty = "", on_undefined = "") {
	const table = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS) || {};
	const lang = forceLang || currentLang;
	const primary = table[lang];
	const backup = table[fallback];

	const inPrimary = primary && Object.prototype.hasOwnProperty.call(primary, key);
	const inBackup = backup && Object.prototype.hasOwnProperty.call(backup, key);

	if (!inPrimary && !inBackup) {
		if (typeof on_undefined === "function") return on_undefined(key, lang, fallback);
		return on_undefined;
	}

	const value = inPrimary ? primary[key] : backup[key];

	if (value == null || value === "") {
		if (typeof on_empty === "function") return on_empty(key, lang, fallback, value);
		return on_empty;
	}

	return value;
}

// Language button - flag emoji via Twemoji

function setLangButtonContent(btn) {
	if (!btn) {
		return;
	}

	const span = btn.querySelector(".lang-icon") || btn;
	let raw = translate("lang_label");

	if (typeof resolveShortcodes === "function") {
		raw = resolveShortcodes(raw);
	}

	if (
		typeof emojiToTwemojiUrl === "function" &&
		typeof isFlagEmoji === "function" &&
		isFlagEmoji(raw)
	) {
		const img = document.createElement("img");
		img.src = emojiToTwemojiUrl(raw);
		img.alt = raw;
		img.className = "btn-flag-icon";
		img.onerror = () => { span.textContent = raw; };
		span.replaceChildren(img);
		return;
	}

	span.replaceChildren();
	span.textContent = raw;

	if (typeof processIconSpans === "function") {
		processIconSpans(btn);
	}
}

// Apply translations to the page

function applyTranslations() {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		const value = translate(key);

		if (/<[a-z][\s\S]*>/i.test(value)) {
			el.innerHTML = value;
		} else {
			el.textContent = value;
		}
	});

	const langBtn = document.getElementsByClassName("lang-toggle")[0];

	if (langBtn) {
		setLangButtonContent(langBtn);
	}

	document.documentElement.lang = currentLang;

	if (typeof updateThemeButtonLabel === "function") {
		updateThemeButtonLabel();
	}
}

window.toggleLang = function() {
	currentLang = currentLang === "en" ? "pl" : "en";
	applyTranslations();
};

document.addEventListener("DOMContentLoaded", applyTranslations);