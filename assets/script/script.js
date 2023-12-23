$(document).ready(function () {
    $(".owl-carousel.varian-pertama").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        center: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        },
        autoplaySpeed: 4000,
    });

    $(".owl-carousel.varian-kedua").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        center: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        },
        autoplaySpeed: 4000,
    });
});

function changeColor() {
    var icon = document.getElementById("myIcon");
    var iconPath = document.getElementById("iconPath");
    if (!icon.classList.contains("clicked")) {
        icon.classList.add("clicked");
        iconPath.setAttribute("fill", "#4AB273");
    } else {
        icon.classList.remove("clicked");
        iconPath.setAttribute("fill", "rgba(0, 0, 0, 0.20);");
    }
}

const progressBar = document.getElementById('progress');
progressBar.style.width = '100%';

function resetProgressBar() {
    const progressBar = document.getElementById('progress');

    // Set lebar menjadi 0 tanpa transisi
    progressBar.style.transition = 'width 0s';
    progressBar.style.width = '0px';

    // Menerapkan transisi kembali ke 100% pada frame selanjutnya
    requestAnimationFrame(() => {
        progressBar.style.transition = 'width 30s linear';
        progressBar.style.width = '100%';
    });
}

let no = 0;
let benar = 0;
let hasil = 0
// Mendefinisikan fungsi checkAnswer dalam lingkup global
function checkAnswer(selectedOption) {
    const correctAnswer = 'c'; // Ubah ini sesuai jawaban yang benar
    no++;

    // Dapatkan semua kontainer jawaban dengan kelas "jawaban"
    const answerContainers = document.querySelectorAll('.jawaban');

    // Loop melalui setiap kontainer jawaban
    answerContainers.forEach(answerContainer => {
        const answerId = answerContainer.querySelector('.title1').getAttribute('id');

        // Ubah warna latar belakang berdasarkan jawaban
        if (answerId === selectedOption) {
            if(answerId === correctAnswer){
                benar++;
            }
            answerContainer.style.backgroundColor = answerId === correctAnswer ? 'green' : 'red';
        } else {
            answerContainer.style.backgroundColor = 'initial';
        }

        hasil = Math.round((benar / no) * 100);

        const akurasi = document.getElementById('akurasi');
        akurasi.textContent = hasil+'%';


        // Nonaktifkan fungsi klik setelah jawaban diberikan
        answerContainer.onclick = null;
    });

    // Aktifkan tombol "Lanjut"
    const btnSoal = document.getElementById('btn_soal');
    if (btnSoal) {
        btnSoal.disabled = false;
    }

    // Tampilkan status jawaban
    const keterangan = document.getElementById('keterangan');
    const icKeterangan = document.getElementById('ic_keterangan');
    const hasilJawaban = document.getElementById('hasil_jawaban');

    console.log("selectedOption:", selectedOption);
    console.log("correctAnswer:", correctAnswer);

    keterangan.style.visibility = 'visible';
    if (selectedOption === correctAnswer) {
        icKeterangan.src = 'assets/img/icon/jawaban_benar.svg';
        hasilJawaban.textContent = 'Jawaban Benar';
    } else {
        icKeterangan.src = 'assets/img/icon/jawaban_salah.svg'; // Tambahkan gambar untuk jawaban yang salah jika diperlukan
        hasilJawaban.textContent = 'Jawaban Salah';
    }
}

// Tambahkan event listener untuk memastikan script berjalan setelah DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Kode JavaScript lainnya di sini
});

function showResultModal(message) {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = message;

    // Membuka modal
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}

function redirectToKuis() {
    // Mengarahkan ke halaman kuis.html
    window.location.href = 'kuis.html';
}

let currentQuestionIndex = 0;
let soal = 1;
const questions = [
    {
        question: "Manakah dibawah ini yang merupakan seni tari dari Sumatera Barat?",
        options: ["Tari Kecak", "Tari Srimpi", "Tari Piring", "Tari Saman"]
    },
    {
        question: "Seni tari tradisional dari Jawa Timur yang seringkali menggambarkan cerita epik adalah?",
        options: ["Tari Jaipong", "Tari Reog Ponorogo", "Tari Topeng", "Tari Legong"]
    },
    {
        question: "Tarian yang berasal dari Bali dan umumnya menggambarkan cerita-cerita dari epik Ramayana dan Mahabharata disebut?",
        options: ["Tari Kecak", "Tari Piring", "Tari Saman", "Tari Topeng"]
    },
    {
        question: "Alat musik tradisional yang berasal dari Sulawesi Selatan dan dimainkan dengan cara dipetik disebut?",
        options: ["Gamelan", "Angklung", "Sasando", "Gendang"]
    },
    {
        question: "Tarian yang berasal dari suku Dayak di Kalimantan, umumnya dilakukan untuk menyambut tamu istimewa adalah?",
        options: ["Tari Piring", "Tari Saman", "Tari Ma'gong", "Tari Enggang"]
    },
];


function resetState() {
    console.log("Mereset state...");
    currentQuestionIndex++;
    soal++;

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        // Perbarui teks pertanyaan jika elemen pertanyaan ditemukan
        const questionElement = document.getElementById('question');
        if (questionElement) {
            questionElement.textContent = currentQuestion.question;
        }

        const keterangan = document.getElementById('keterangan');
        const noSoal = document.getElementById('no_soal');
        noSoal.textContent = soal+'/5';

        // Perbarui opsi jawaban
        const answerContainers = document.querySelectorAll('.jawaban');
        answerContainers.forEach((answerContainer, index) => {
            const optionId = String.fromCharCode(97 + index);
            const optionText = currentQuestion.options[index];

            // Perbarui teks dan properti lain pada jawaban
            answerContainer.querySelector('.title1').textContent = optionText;
            answerContainer.style.color = 'white';
            answerContainer.style.fontSize = '20px';
            answerContainer.setAttribute('id', optionId);
            answerContainer.style.backgroundColor = 'initial';

            // Aktifkan kembali fungsi klik
            answerContainer.onclick = () => checkAnswer(optionId);
        });

        // Reset progress bar (tambahkan logika resetProgressBar sesuai kebutuhan)
        resetProgressBar();
    } else {
        const icHasil = document.getElementById('ic_hasil');
        const akurasi = document.getElementById('akurasi_hasil');
        if(hasil > 70){
            icHasil.src = 'assets/img/icon/jawaban_benar.svg';
            akurasi.textContent = hasil+"%";
            showResultModal("Selamat Anda Lulus!");
        }else{
            icHasil.src = 'assets/img/icon/jawaban_salah.svg';
            showResultModal("Kamu belum Lulus, Coba lagi yah :)");
        }

    }
}