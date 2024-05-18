// Template ini menggunakan REST Api The Meal DB
// Baca guide yang ada di
// https://docs.google.com/document/d/172svTmA86AyRK-wVwbIZMfo4JPGOL1-y9gJ4Na6EAg8/edit?usp=sharing

// Panduan disini hanya berupa arahan di bagian JavaScript
// maka dari itu, kamu harus membuat bagian HTML dan CSS sendiri

// Hint: Semua poin dapat dikerjakan dengan cara yang sama
//       pada saat sesi sebelumnya yang dapat kalian akses
//       di web PIBITI

// Note: Gunakan console.log() untuk melihat hasil dari data yang didapat
//       dari API untuk mengetahui pasti struktur data/objek yang didapat

// 1. Buatlah sebuah variabel bernama makananAcak
//    (hint: untuk menampung makanan acak yang didapat dari API)
let makananAcak;

// 2. Buatlah sebuah variabel bernama kategori berisi array kosong
//    (hint: untuk menampung kategori yang didapat dari API)
let kategori = [];

// 3. Buatlah sebuah variabel bernama makananKategori
//    (hint: untuk menampung makanan dari API berdasarkan kategori yang dipilih)
let makananKategori;

// 4. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan acak
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel makananAcak
//    - Tampilkan makanan acak tersebut ke dalam DOM
async function getMakananAcak(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    makananAcak = await response.json();
    makananAcakArr = makananAcak.meals;
    console.log(makananAcakArr);
    
    return makananAcak;
}

let modal = document.getElementById('exampleModal');

function changeModal(){
    // Hapus konten modal yang ada
    let newHtml = ``;

    makananAcakArr.forEach(element => {
        newHtml += `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${element.strMeal}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src="${element.strMealThumb}" class="d-block w-100" alt="Random food image">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>`;
    });
    modal.innerHTML = newHtml;
}


// 5. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan kategori makanan
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel kategori
//    - Tampilkan kategori tersebut ke dalam DOM
async function getKategori() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    kategori = await response.json();
    kategoriArr = kategori.categories;

    // Tampilkan kategori ke dalam dropdown
    let categorySelect = document.getElementById('categorySelect');
    kategoriArr.forEach(category => {
        let option = document.createElement('option');
        option.value = category.strCategory;
        option.text = category.strCategory;
        categorySelect.add(option);
    });

    console.log(kategoriArr);
}
// Panggil fungsi getKategori untuk mengisi dropdown kategori saat halaman dimuat
getKategori();

// 6. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan berdasarkan kategori
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel makananKategori
//    - Tampilkan makanan tersebut ke dalam DOM
async function getMakananByCategory(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    makananKategori = await response.json();
    makananKategoriArr = makananKategori.meals;

    // Tampilkan makanan berdasarkan kategori ke dalam daftar menu
    let menuList = document.getElementById('menu-list');
    menuList.innerHTML = ``; // Mengosongkan daftar menu sebelumnya

    makananKategoriArr.forEach(makanan => {
        let card = document.createElement('div');
        card.classList.add('col-4');

        card.innerHTML = `
        <div class="col-4 py-3">
        <div class="card" style="width: 18rem;">
            <img src="${makanan.strMealThumb}" class="card-img-top" alt="${makanan.strMealThumb}">
            <div class="card-body">
              <p class="card-text text-center">${makanan.strMeal}</p>
            </div>
        </div>
        </div>
        `;

        menuList.appendChild(card);
    });

    console.log(makananKategoriArr);
}


// 7. Buatlah sebuah event listener ketika <button> "Makanan Acak" diklik
//    - Panggil fungsi yang dibuat pada langkah 4
document.getElementById('btnSurprise').addEventListener('click', async function() {
    try {
        const makananAcak = await getMakananAcak();
        // Lakukan sesuatu dengan data makananAcak, mengganti modal.
        changeModal();
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
});

// 8. Buatlah sebuah event listener ketika <select> "Kategori" berubah
//    - Panggil fungsi yang dibuat pada langkah 5
document.getElementById('categorySelect').addEventListener('change', async function () {
    let categoryName = document.querySelector("#categorySelect").value;
    try {
        // Jangan lupa panggil fungsi getMakananByCategory yang sesuai
        await getMakananByCategory(categoryName);
        // Lakukan sesuatu dengan data makananKategoriArr, mengganti modal.
        changeModal();
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
});
