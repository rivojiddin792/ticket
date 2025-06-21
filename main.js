const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const errorMsg = document.getElementById("errorMsg");

input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    errorMsg.textContent = "";
    preview.src = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        errorMsg.textContent = "❌ Please upload a valid image file.";
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        errorMsg.textContent = "❌ File too large! Max size: 2MB.";
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
    };
    reader.readAsDataURL(file);
});