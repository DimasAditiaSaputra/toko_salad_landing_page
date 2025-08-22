function elementMenuCard(img, title, desc, price, aosAttr) {
  const card = `
    <div class="card-menu" data-aos="${aosAttr}" data-aos-duration="1000">
        <img src="${img}" alt="${title}" />
        <div class="container-text">
          <h2>${title}</h2>
          <p>${desc}</p>
          <div class="container-btn">
              <button class="order-item">Order</button>
              <button class="price">$${price}</button>
          </div>
        </div>
    </div>
  `;
  return card;
}

async function fetchDataMenu(url) {
  const loadingEl = document.querySelector(".loading");
  const containerMenu = document.querySelector(".container-menu");

  try {
    // tampilkan loading
    loadingEl.style.display = "block";
    containerMenu.innerHTML = "";

    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const resJson = await res.json();

    // render data
    resJson.forEach((item, i) => {
      const aosAttr = i % 2 === 0 ? "fade-right" : "fade-left";
      containerMenu.innerHTML += elementMenuCard(
        item.img,
        item.name,
        item.desc,
        item.price,
        aosAttr
      );
    });
  } catch (err) {
    containerMenu.innerHTML = `<p style="color:red">Gagal memuat menu</p>`;
    console.error(err);
  } finally {
    // sembunyikan loading
    loadingEl.style.display = "none";
  }
}

fetchDataMenu("javascript/data-menu.json");
