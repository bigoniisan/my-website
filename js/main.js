/**
 * 
 * @param {String} tag 
 * @returns {Array} projectsWithTag
 */
function filterByTag(tag) {
    const projects = document.getElementById("project-list").children;
    let projectsWithTag = [];
    for (let i = 0; i < projects.length; i++) {
        const hiddenDiv = projects[i].children[0];
        const projectTagList = [];
        // iterate through each <p> of <div hidden>
        for (let j = 0; j < hiddenDiv.children.length; j++) {
            const tag = hiddenDiv.children[j].textContent;
            projectTagList.push(tag)
        }
        if (projectTagList.includes(tag)) {
            projectsWithTag.push(projects[i]);
            showElement(projects[i]);
        } else {
            hideElement(projects[i]);
        }
    }
    adjustFilterNumber(projectsWithTag.length);
    return projectsWithTag;
}

function showElement(element) {
    element.style.display = "flex";

}

function hideElement(element) {
    element.style.display = "none";
}

function adjustFilterNumber(value) {
    const filteredByText = document.getElementById("filtered-by-text");
    if (value == 1) {
        filteredByText.textContent = `Showing ${value} project. Use the filter to list them by skill or technology.`;
    } else {
        filteredByText.textContent = `Showing ${value} projects. Use the filter to list them by skill or technology.`;
    }
}

function toggleDropdown() {
    const dropdownScreen = document.querySelector(".dropdown-screen");
    const linksContainer = document.querySelector(".dropdown-screen-links-container");
    const dropdownScreenLinks = document.getElementsByClassName("dropdown-screen-link");
    // toggle in reverse order just in case performance affects animation order lmao
    for (let i = 0; i < dropdownScreenLinks.length; i++) {
        dropdownScreenLinks[i].classList.toggle("dropdown-screen-link--show");
    }
    linksContainer.classList.toggle("dropdown-screen-links-container--show");
    dropdownScreen.classList.toggle("dropdown-screen--show");
}

function addButtonListeners() {
    // Show all button
    const showAllButton = document.getElementById("button-show-all");
    const projects = document.getElementById("project-list").children;
    showAllButton.addEventListener("click", () => {
        for (let i = 0; i < projects.length; i++) {
            showElement(projects[i]);
        }
        adjustFilterNumber(projects.length);
    });

    // Other buttons
    const buttons = document.getElementsByClassName("navbar-item-button");
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            filterByTag(buttons[i].textContent.toLocaleLowerCase());
        });
    }

    // Dropdown menu
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.addEventListener("click", () => { 
        toggleDropdown();
    });
}

function main() {
    addButtonListeners();
};

main();


