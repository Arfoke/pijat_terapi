document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileBtn.querySelector('i')) {
          mobileBtn.querySelector('i').className = 'fas fa-bars';
        }
      });
    });
  }

  // Sticky Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Interactive Package Estimator
  const checkboxes = document.querySelectorAll('.body-part-checkbox');
  const resultPkg = document.getElementById('resultPkg');
  const resultPrice = document.getElementById('resultPrice');
  const btnBookCustom = document.getElementById('btnBookCustom');

  function updateEstimator() {
    const selected = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const count = selected.length;
    let durationText = '';
    let priceText = '';
    let waMsg = '';

    if (count === 0) {
      durationText = 'Silakan pilih bagian tubuh yang diinginkan';
      priceText = 'Rp 0';
      waMsg = 'Halo Mas Ridwan, saya ingin berkonsultasi mengenai layanan pijat akupresur.';
    } else if (count === 1) {
      if (selected.includes('Kerokan')) {
        durationText = '30 MENIT (Kerokan)';
        priceText = '50k';
      } else {
        durationText = '30 MENIT - ' + selected[0];
        priceText = '50k';
      }
      waMsg = `Halo Mas Ridwan, saya ingin reservasi Terapi 30 Menit (${selected.join(', ')}) harga 50k.`;
    } else if (count === 2) {
      durationText = '1 JAM (2 Bagian Tubuh: ' + selected.join(' + ') + ')';
      priceText = '100k';
      waMsg = `Halo Mas Ridwan, saya ingin reservasi Terapi Paket 1 JAM (2 bagian: ${selected.join(' + ')}) harga 100k.`;
    } else if (count === 3) {
      durationText = '1,5 JAM (3 Bagian Tubuh: ' + selected.join(' + ') + ')';
      priceText = '135k';
      waMsg = `Halo Mas Ridwan, saya ingin reservasi Terapi Paket 1,5 JAM (3 bagian: ${selected.join(' + ')}) harga 135k.`;
    } else if (count === 4) {
      durationText = '2 JAM (4 Bagian Tubuh: ' + selected.join(' + ') + ')';
      priceText = '170k';
      waMsg = `Halo Mas Ridwan, saya ingin reservasi Terapi Paket 2 JAM (${selected.join(' + ')}) harga 170k.`;
    } else if (count >= 5) {
      durationText = 'AKUMULASI SELURUH PAKET (Seluruh Terapi + Kerokan)';
      priceText = '230k';
      waMsg = `Halo Mas Ridwan, saya ingin reservasi AKUMULASI SELURUH PAKET COMPLETE (Punggung + Kaki + Tangan + Wajah + Kerokan) harga 230k.`;
    }

    if (resultPkg) resultPkg.textContent = durationText;
    if (resultPrice) resultPrice.textContent = priceText;
    if (btnBookCustom) {
      btnBookCustom.href = `https://wa.me/6281333520177?text=${encodeURIComponent(waMsg)}`;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateEstimator);
  });
  updateEstimator();

  // Reservation Form WhatsApp Generator
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const address = document.getElementById('formAddress').value.trim();
      const service = document.getElementById('formService').value;
      const date = document.getElementById('formDate').value;
      const time = document.getElementById('formTime').value;
      const notes = document.getElementById('formNotes').value.trim();

      let text = `*RESERVASI LAYANAN HOMECARE TERAPI RIDWAN*\n\n`;
      text += `• *Nama*: ${name}\n`;
      text += `• *Alamat (Sidoarjo & Sekitarnya)*: ${address}\n`;
      text += `• *Paket Terapi*: ${service}\n`;
      text += `• *Jadwal*: ${date} - Jam ${time} WIB\n`;
      if (notes) {
        text += `• *Keluhan / Catatan*: ${notes}\n`;
      }
      text += `\nMohon konfirmasi ketersediaan kuota jadwal. Terima kasih!`;

      const targetUrl = `https://wa.me/6281333520177?text=${encodeURIComponent(text)}`;
      window.open(targetUrl, '_blank');
    });
  }

  // Check Real-Time Open Status
  const statusEl = document.getElementById('liveStatus');
  if (statusEl) {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, 2: Tuesday, etc.
    const hours = now.getHours();

    let isOpen = false;
    if (day === 2) {
      // Tuesday 08.00 - 22.00
      if (hours >= 8 && hours < 22) isOpen = true;
    } else {
      // Wednesday to Monday 20.00 - 22.00
      if (hours >= 20 && hours < 22) isOpen = true;
    }

    if (isOpen) {
      statusEl.innerHTML = `<span class="status-dot"></span> BUKA SEKARANG — Siap Menerima Reservasi Homecare`;
    } else {
      statusEl.innerHTML = `<span class="status-dot" style="background:#E5C158; box-shadow: 0 0 10px #E5C158;"></span> RESERVASI DIBUKA — Silakan Booking Jadwal Terapi Anda`;
    }
  }
});
