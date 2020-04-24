export function loadImages() {
  const images = [...document.querySelectorAll('img.twic')]

  images.forEach((image) => {
    const observer = new IntersectionObserver((changes) => {
      changes.forEach((change) => {
        if (change.isIntersecting) {
          if (!image.classList.contains('twic-done')) {
            image.srcset = image.getAttribute('data-srcset')
            image.sizes = image.getAttribute('data-sizes')
            image.classList.add('twic-done')
          }

          observer.unobserve(image)
        }
      })
    })

    observer.observe(image)
  })
}

export function getSrcSet(baseUrl, sizes) {
  let srcset = ''

  sizes.forEach((size) => {
    srcset += `${baseUrl}&w=${size} ${size}w, `
  })

  return srcset.slice(0, -1)
}
