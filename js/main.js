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
    // element.style.animation = "fade-in 1s forwards";

}

function hideElement(element) {
    element.style.display = "none";
    // element.style.animation = "fade-out 2s forwards";
}

function adjustFilterNumber(value) {
    const filteredByText = document.getElementById("filtered-by-text");
    if (value == 1) {
        filteredByText.textContent = `Showing ${value} project. Use the filter to list them by skill or technology.`;
    } else {
        filteredByText.textContent = `Showing ${value} projects. Use the filter to list them by skill or technology.`;
    }
}

function addButtonListeners() {
    const buttons = document.getElementsByClassName("navbar-item-button");
    const projects = document.getElementById("project-list").children;
    // Show all button
    const showAllButton = document.getElementById("button-show-all");
    showAllButton.addEventListener("click", () => {
        for (let i = 0; i < projects.length; i++) {
            showElement(projects[i]);
        }
        adjustFilterNumber(projects.length);
    });

    // Other buttons
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            filterByTag(buttons[i].textContent.toLocaleLowerCase());
        });
    }
    return true;
}

function main() {
    addButtonListeners();
    adjustFilterNumber("all");
};

main();


