async function loadComponent(selector, file, rootPath, callback) {
	const container = document.querySelector(selector);

	if (!container) {
		console.warn(`loadComponent: no element matches "${selector}" on ${location.pathname}`);
		return;
	}

	try {
		const response = await fetch(file);

		if (!response.ok) {
			throw new Error(`Fetch failed: ${file} (${response.status})`);
		}

		let html = await response.text();
		html = html.replaceAll("{root}", rootPath);
		container.innerHTML = html;

		processIconSpans(container);
		processResIcons(container);
		uniquifyAllSvgIds(container);

		if (typeof applyTranslations === "function") {
			applyTranslations();
		}

		if (callback) {
			callback();
		}

		requestAnimationFrame(rescrollToHash);
	} catch (error) {
		console.warn(
			"CORS/Fetch restriction hit for local file loading. Consider running a local server (e.g. Live Server).",
			error
		);
	}
}

/* SVG id uniquification */
function uniquifySvgIds(svgEl) {
	if (!svgEl) {
		return;
	}

	const idEls = svgEl.querySelectorAll("[id]");
	if (idEls.length === 0) {
		return;
	}

	const map = new Map();
	const suffix = "-" + Math.random().toString(36).slice(2, 8);

	idEls.forEach(el => {
		const oldId = el.id;
		const newId = oldId + suffix;
		map.set(oldId, newId);
		el.id = newId;
	});

	const urlRef = /url\(\s*#([^)\s]+)\s*\)/g;
	const rewriteValue = val => {
		if (typeof val !== "string" || !val.includes("url(")) {
			return val;
		}

		return val.replace(urlRef, (m, id) => {
			const r = map.get(id);
			return r ? `url(#${r})` : m;
		});
	};

	const all = [svgEl, ...svgEl.querySelectorAll("*")];
	all.forEach(el => {
		for (const attr of Array.from(el.attributes)) {
			if (attr.value && attr.value.includes("url(")) {
				const next = rewriteValue(attr.value);

				if (next !== attr.value) {
					el.setAttribute(attr.name, next);
				}
			}
		}
	});
}

function uniquifyAllSvgIds(root = document) {
	root.querySelectorAll("svg").forEach(svg => {
		if (svg.dataset.idsUniquified === "1") {
			return;
		}

		uniquifySvgIds(svg);
		svg.dataset.idsUniquified = "1";
	});
}


window.toggleMobileNav = function() {
	const controls = document.getElementsByClassName("nav-controls")[0];

	if (controls) {
		controls.classList.toggle("active");
	}
};

/* Icon shortcode cache - makes repeated renders instant, no flash */
const _iconSvgCache = new Map();

async function fetchIconSvg(iconId) {
	if (_iconSvgCache.has(iconId)) {
		return _iconSvgCache.get(iconId);
	}

	const [prefix, name] = iconId.split(":");
	if (!prefix || !name) {
		throw new Error(`Invalid icon id: ${iconId}`);
	}

	const res = await fetch(`https://api.iconify.design/${prefix}/${name}.svg`);
	if (!res.ok) {
		throw new Error(`Failed to load iconify ID: ${iconId}`);
	}

	const text = await res.text();
	_iconSvgCache.set(iconId, text);

	return text;
}

async function processIconSpans(root = document) {
	const iconSpans = root.querySelectorAll(
		".nav-link-icon, .res-icon, .social-icon, .theme-icon, .lang-icon, .toggle-icon"
	);

	for (const span of iconSpans) {
		if (span.querySelector("img, svg")) {
			continue;
		}

		const raw = span.textContent.trim();
		if (!raw.includes("|")) {
			continue;
		}

		const [iconId, fallbackGroup] = raw.split("|");
		const cleanIconId = iconId.trim();
		let success = false;

		if (cleanIconId) {
			try {
				const svgText = await fetchIconSvg(cleanIconId);
				span.innerHTML = svgText;
				success = true;
			} catch (err) {
				console.error(err);
			}
		}

		if (!success && fallbackGroup) {
			const emojis = fallbackGroup.replace(/[()]/g, "").split(",").map(e => e.trim()).filter(Boolean);

			if (emojis.length > 0) {
				const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
				const codepoints = Array.from(randomEmoji)
					.map(c => c.codePointAt(0).toString(16))
					.filter(cp => cp !== "fe0f")
					.join("-");

				const image = document.createElement("img");
				image.src = `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${codepoints}.svg`;
				image.alt = randomEmoji;
				image.style.width = "1.2em";
				image.style.height = "1.2em";
				image.style.verticalAlign = "-0.2em";
				image.loading = "lazy";

				image.onerror = () => { span.textContent = randomEmoji; };
				span.replaceChildren(image);
				success = true;
			}
		}

		if (!success) {
			span.textContent = raw;
		}
	}
}

function processResIcons(root = document) {
	if (typeof emojiToTwemojiUrl !== "function") return;
	root.querySelectorAll(".res-icon").forEach(span => {
		if (span.querySelector("img")) {
			return;
		}

		const emoji = span.textContent.trim();

		if (!emoji) {
			return;
		}

		const img = document.createElement("img");
		img.src = emojiToTwemojiUrl(emoji);
		img.alt = emoji;
		img.className = "res-icon-img";
		img.loading = "lazy";
		img.onerror = () => { span.textContent = emoji; };

		span.replaceChildren(img);
	});
}

// Theme handling

function getPreferredTheme() {
	const saved = localStorage.getItem("theme");

	if (saved) {
		return saved;
	}

	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

let currentTheme = getPreferredTheme();

function applyTheme(theme) {
	currentTheme = theme;

	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);

	updateThemeButtonLabel();
}

// Theme icon shortcodes - not translated, not page-scoped
const THEME_ICONS = {
	dark: "line-md:moon-filled-loop|🌙",
	light: "line-md:sunny-filled-loop|☀️",
};

function updateThemeButtonLabel() {
	const btn = document.getElementsByClassName("theme-toggle")[0];

	if (!btn) {
		return;
	}

	const span = btn.querySelector(".theme-icon") || btn;
	const shortcode = currentTheme === "dark" ? THEME_ICONS.light : THEME_ICONS.dark;

	span.replaceChildren();
	span.textContent = shortcode;
	span.classList.add("is-loading");
	processIconSpans(btn).finally(() => span.classList.remove("is-loading"));

	btn.title = currentTheme === "dark" ? "Switch to light" : "Switch to dark";
}

window.toggleTheme = function() {
	applyTheme(currentTheme === "dark" ? "light" : "dark");
};


function rescrollToHash() {
	if (!location.hash) {
		return;
	}

	const id = decodeURIComponent(location.hash.slice(1));
	const el = document.getElementById(id);

	if (!el) {
		return;
	}

	const navH = document.querySelector("nav")?.getBoundingClientRect().height || 0;

	window.scrollTo({
		top: el.getBoundingClientRect().top + window.scrollY - navH,
		behavior: "instant",
	});
}

window.addEventListener("hashchange", () => requestAnimationFrame(rescrollToHash));

// Bootstrap

document.addEventListener("DOMContentLoaded", () => {
	processIconSpans();
	processResIcons();
	uniquifyAllSvgIds();
	applyTheme(currentTheme);

	requestAnimationFrame(rescrollToHash);

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		if (!localStorage.getItem("theme")) {
			applyTheme(e.matches ? "dark" : "light");
		}
	});
});
