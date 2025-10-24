// جاهز لإضافة تفاعلات مستقبلية مثل تحقق من الحقول وتأثيرات على السلايدرات
console.log("JS جاهز للعمل");
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const cards = document.querySelectorAll(".card");

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            const section = card.closest("section");
            if (text.includes(query) || query === "") {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            performSearch();
        }
    });
});