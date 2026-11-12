Object.defineProperty(String.prototype, "capitalize", {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false,
});

// --- //

function setDocumentTitle() {
	const titleEl = document.getElementsByTagName("title")[0];
	const base = titleEl && titleEl.innerHTML ? titleEl.innerHTML : "Webpage";

	let slug = document.documentElement.getAttribute("data-i18n-scope");

	if (!slug) {
		const path = window.location.pathname.replace(/\/+$/, "");
		const segments = path.split("/").filter(Boolean);
		let last = segments[segments.length - 1] || "";
		if (/^index\.html?$/i.test(last)) last = segments[segments.length - 2] || "";
		slug = last || "home";
	}

	const titleKey = (slug === "home" || slug === "index")
		? "index_page_title"
		: `${slug}_page_title`;

	const raw = typeof translate === "function"
		? translate(titleKey, null, "en")
		: "";

	const label = raw ? raw.capitalize() : "";

	const isHome = slug === "home" || slug === "index" || slug === "";

	document.title = isHome || !label
		? base
		: `${base} │ ${label}`;
}