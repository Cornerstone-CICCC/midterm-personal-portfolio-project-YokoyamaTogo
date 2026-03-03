const showSequentially = (parent, selector, delayStep, initialDelay = 0) => {
  const animationKey = `animated${selector.replace(/[^a-z0-9]/gi, '')}`
  if (parent.dataset[animationKey] === 'true') return
  const targets = [...parent.querySelectorAll(selector)]
  if (!targets.length) return

  targets.reduce((delay, target) => {
    setTimeout(() => target.classList.add('show'), delay)
    return delay + delayStep
  }, initialDelay)

  parent.dataset[animationKey] = 'true'
}

window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('body > section')
  const animateSection = section => {
    showSequentially(section, '.card-list__button', 200)
    showSequentially(section, '.skills__item', 160)
    showSequentially(section, '.cert__item', 180)
    showSequentially(section, '.scroll-reveal', 220, 160)
  }

  const certModal = document.querySelector('.cert-modal')
  const certModalImage = certModal?.querySelector('.cert-modal__image')
  const certModalTitle = certModal?.querySelector('#cert-modal-title')
  const certModalCloseButtons = certModal?.querySelectorAll('.cert-modal__close, .cert-modal__overlay')

  const closeCertModal = () => {
    if (!certModal) return
    certModal.classList.remove('is-open')
    certModal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  document.querySelectorAll('.cert__button').forEach(button => {
    button.addEventListener('click', () => {
      if (!certModal || !certModalImage || !certModalTitle) return
      const certImage = button.dataset.certImage
      const certTitle = button.dataset.certTitle || 'Certification'
      if (!certImage) return

      certModalImage.src = certImage
      certModalImage.alt = certTitle
      certModalTitle.textContent = certTitle
      certModal.classList.add('is-open')
      certModal.setAttribute('aria-hidden', 'false')
      document.body.style.overflow = 'hidden'
    })
  })

  certModalCloseButtons?.forEach(button => {
    button.addEventListener('click', closeCertModal)
  })

  window.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return
    closeCertModal()
  })

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        animateSection(entry.target)
      })
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20% 0px'
    })

    sections.forEach(section => observer.observe(section))
    return
  }

  const inScreen = elm => {
    const rect = elm.getBoundingClientRect()
    return rect.top < window.innerHeight * 0.7 && rect.bottom > 0
  }

  const animateVisibleSections = () => {
    sections.forEach(section => {
      if (!inScreen(section)) return
      animateSection(section)
    })
  }

  window.addEventListener('scroll', animateVisibleSections)
  animateVisibleSections()
})
