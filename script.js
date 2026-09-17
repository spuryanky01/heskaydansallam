const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

const galleries = document.querySelectorAll('.gallery-modal');
const galleryTriggers = document.querySelectorAll('.service-card-clickable');
const teamGallery = document.getElementById('team-gallery');
const teamPhotoTriggers = document.querySelectorAll('.team-photo-trigger');

const closeGallery = (gallery) => {
  gallery.classList.remove('is-open');
  gallery.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const openGallery = (gallery) => {
  galleries.forEach((item) => closeGallery(item));
  gallery.classList.add('is-open');
  gallery.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  gallery.querySelector('.gallery-close')?.focus();
};

galleryTriggers.forEach((trigger) => {
  const gallery = document.getElementById(trigger.getAttribute('aria-controls'));
  trigger.addEventListener('click', () => openGallery(gallery));
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGallery(gallery);
    }
  });

  teamPhotoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openGallery(teamGallery));
  });
});

galleries.forEach((gallery) => {
  gallery.querySelectorAll('[data-gallery-close]').forEach((button) => {
    button.addEventListener('click', () => closeGallery(gallery));
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    galleries.forEach((gallery) => {
      if (gallery.classList.contains('is-open')) closeGallery(gallery);
    });
  }
});
