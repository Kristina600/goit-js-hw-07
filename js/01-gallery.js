import { galleryItems } from './gallery-items.js';


const gallery = document.querySelector('.gallery')


const listImg = galleryItems
    .map(({ preview, original, description }) =>
    `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`).join(' ')

gallery.insertAdjacentHTML('beforeend', listImg)

// gallery.addEventListener('click', handlerClickGallery);

gallery.onclick = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }

    const instance = basicLightbox.create(
        `<img src="${evt.target.dataset.source}" width="800" height="600" >`,
        {
            onShow: () => {
                window.addEventListener('keydown', onEsc)
            },
            onClose: () => {
                window.removeEventListener('keydown', onEsc)
            }

        }
    );
    instance.show()


    function onEsc(evt) {
        if (evt.code === 'Escape') {
            instance.close();
        }
    }
}