export const deleteSearchResults = () => {
    const parentElement = document.getElementById("search-results");
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

export const buildSearchResults = (resultArray) => {
    resultArray.forEach((result) => {
        const resultItem = createResultItem(result);
        const resultContent = document.createElement("div");
        resultContent.classList.add("result-contents");

        if (result.img) {
            const resultImg = createResultImg(result);
            resultContent.append(resultImg);
        }
        const resultText = createResultText(result);
        resultContent.append(resultText);
        resultItem.append(resultContent);
        const searchResults = document.getElementById("search-results");
        searchResults.append(resultItem);
    });
};

const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("result-title");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
};

const createResultImg = (result) => {
    const resultImg = document.createElement("div");
    resultImg.classList.add("result-image");
    const img = document.createElement("img");
    img.src = result.img;
    img.alt = result.title;
    resultImg.append(img);
    return resultImg;
};

const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("result-text");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("result-description");
    resultDescription.textContent = result.text;
    resultText.append(resultDescription);
    return resultText;
};

export const clearStatsLine = () => {
    document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numberOfResults) => {
    const statsLine = document.getElementById("stats");
    if (numberOfResults) {
        statsLine.textContent = `Displaying ${numberOfResults} results.`;
    } else {
        statsLine.textContent = "no results.";
    }
};
