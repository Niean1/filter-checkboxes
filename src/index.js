import "./styles.css";
import products from "/src/products.json";

const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

const onRenderProducts = (data) => {
  const listItems = data.filter(Boolean).map(function (el) {
    return (
      "<li>" +
      `<h3 style = color:${el.color}>` +
      el.productName +
      "</h3>" +
      "<p>" +
      "🌆City: " +
      el.city +
      "</p>" +
      "</li>"
    );
  });
  document.getElementById("app").innerHTML = listItems.join(" ");
};

const onApplyFilter = (data = [], applyFilters = []) => {
  const colors = applyFilters
    .filter((value) => value.key === "color")
    .map((v) => v.value);
  let copy = [...data];

  data.forEach((value, index) => {
    if (colors && !colors.includes(value.color)) {
      delete copy[index];
    }
  });

  copy = [...copy].filter(Boolean);

  onRenderProducts(copy);
};

const onRenderFilterList = (data) => {
  const listItemsColor = [
    ...new Set(
      data.filter(Boolean).map((el) => {
        return `
        <label><input type='checkbox' name='settings' value='${el.color}'/>   ${el.color}</label>
        
      `;
      })
    ),
  ];

  document.getElementById("colors").innerHTML = listItemsColor.join(" ");

  const checkboxes = document.querySelectorAll(
    "input[type=checkbox][name=settings]"
  );
  let enabledSettings = [];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      enabledSettings = Array.from(checkboxes)
        .filter((i) => i.checked)
        .map((i) => {
          return { key: "color", value: i.value };
        });
      if (enabledSettings) {
        onApplyFilter(data, enabledSettings);
      }
    });
  });

  document.getElementById("test1").onclick = function toggle(source) {
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") checkboxes[i].checked = true;
    }
  };
};

const onInitialData = (data) => {
  onRenderFilterList(data);
};

const onProgram = () => {
  const data = getProducts().then((result) => {
    onInitialData(result.filter(Boolean));
  });
};
onProgram();
