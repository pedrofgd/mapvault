let currentUrl = window.location.href;
let keyForThisPage = `key`;

// Destacar texto selecionado 
document.addEventListener('keypress', 
  highlightAndStore);

function highlightAndStore() {
  // Highlight
  let selection = window.getSelection().getRangeAt(0);

  let content = document.createElement("span");
  content.setAttribute("style", 
    "background-color: yellow; " + 
    "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;");

  selection.surroundContents(content);

  // Store
  store(keyForThisPage, content.outerHTML); 
}

function store(key, value) {
  console.log("Storing highlights...");
  let data = [];
  data.push(value);
  chrome.storage.local.set({ key: data },
    function() {
      console.log(data);
    });
}

function load(key, callback) {
  console.log(key);
  chrome.storage.local.get(key, function(result) {
    console.log(result);
    let data = result[key] || [];
    callback(data);
  });
}

// Carregar highlights da página atual
console.log('Loading highlights in this page');
load(keyForThisPage, function(data) {
  let pageContent = document.body.innerHTML;

  data.forEach(function(html) {
    let tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    let content = tempElement.firstChild.innerHTML;

    let regex = new RegExp(content, 'g');
    pageContent = pageContent.replace(regex, html);
  });

  document.body.innerHTML = pageContent;
});

