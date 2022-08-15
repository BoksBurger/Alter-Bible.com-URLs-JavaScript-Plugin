Object.prototype.versionSelector = function (options = {}) {
  if (!options.versions) throw new Error("Vermis versvertalings...");
  const selectVersion = document.createElement("select");
  const heading = document.createElement(`h${options.headingSize}`);
  const placement = options.elementID
    ? document.getElementById(options.elementID)
    : this;
  const ui = document.createElement("div");

  placement.prepend(ui);

  let selected = "0";
  if (localStorage["version"]) {
    selected = localStorage["version"];
  } else localStorage.setItem("version", "0");

  function addOption(selectList, text, value, isSelected = false) {
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    option.selected = isSelected;
    selectList.add(option);
  }

  if (Array.isArray(options.versions)) {
    addOption(selectVersion, options.defaultOption + "...", "0");
    options.versions.forEach((option) => {
      let isSelected = option.code === localStorage["version"];
      addOption(selectVersion, option.version, option.code, isSelected);
    });
  }

  selectVersion.addEventListener("change", (e) => {
    if (selectVersion.selectedIndex === 0) {
      alterURL(null, true);
      localStorage.removeItem("version");
    } else {
      localStorage.setItem("version", e.target.value);
      alterURL(e.target.value);
    }
  });

  function alterURL(version, revert = false) {
    let ver = "";
    if (selectVersion.selectedIndex > 0) {
      ver = options.versions[selectVersion.selectedIndex - 1].ver;
      if (options.dynamicHeadings) {
        heading.innerText = `${selectVersion.options[
          selectVersion.selectedIndex
        ].text.replace("...", "")}${ver ? ` (${ver})` : ""}`;
      }
    }
    let anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
      if (a.href.includes("/bible/")) {
        if (revert) {
          a.innerText = a.innerText.replace(/\ \(.*/gm, "");
          a.href = a.data ? a.data : a.href;
          heading.innerText = options.headingText;
        }
        if (selectVersion.selectedIndex > 0) {
          if (!a.data) a.data = a.href;
          a.href = a.href.replace(/bible\/[0-9]+\//gm, `bible/${version}/`);
          if(options.dynamicURLText) {
              a.innerText = `${a.innerText.replace(/\ \(.*/gm, "")} (${ver})`;
          }
        }
      }
    });
  }

  if (options.showHeading) {
    heading.innerText = options.headingText;
    ui.appendChild(heading);
  }
  if (options.hoverText) {
    selectVersion.title = options.hoverText;
  }
  ui.appendChild(selectVersion);

  addEventListener("DOMContentLoaded", () => {
    alterURL(selected, true);
  });
};

//Inisialiseer versSkakelVertalingsInprop
let versionSelectorOptions = {
  elementID: "myElement",
  showHeading: true,
  dynamicHeadings: true,
  headingText: "Bible version:",
  headingSize: 1,
  dynamicURLText: true,
  hoverText:
    "Choose the Bible version to where 'Bible.com' links on this page will point.",
  defaultOption: "Original version",
  versions: [
    { version: "King James", ver: "KJV", code: "1" },
    { version: "Bybel vir almal", ver: "ABA", code: "2" },
    { version: "Afrikaans 1953", ver: "AFR 53", code: "5" },
    { version: "Afrikaans 1983", ver: "AFR 83", code: "6" },
    { version: "American Standard", ver: "ASV", code: "12" },
    { version: "Die Boodskap", ver: "DB", code: "50" },
    { version: "English Standard", ver: "ESV", code: "59" },
    { version: "New International", ver: "NIV", code: "111" },
    { version: "Nuwe lewende", ver: "NLV", code: "117" },
    { version: "Good News", ver: "GNB", code: "296" },
    { version: "Modern English", ver: "MEV", code: "1171" },
  ],
};

document.versionSelector(versionSelectorOptions);
