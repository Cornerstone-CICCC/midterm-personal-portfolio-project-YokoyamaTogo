const showSequentially = (parent, selector, delayStep) => {
  const animationKey = `animated${selector.replace(/[^a-z0-9]/gi, '')}`
  if (parent.dataset[animationKey] === 'true') return
  const targets = [...parent.querySelectorAll(selector)]
  if (!targets.length) return

  targets.reduce((delay, target) => {
    setTimeout(() => target.classList.add('show'), delay)
    return delay + delayStep
  }, 0)

  parent.dataset[animationKey] = 'true'
}

window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('body > section')
  const animateSection = section => {
    showSequentially(section, '.card-list__button', 200)
    showSequentially(section, '.skills__item', 160)
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        animateSection(entry.target)
      })
    }, {
      threshold: 0.2
    })

    sections.forEach(section => observer.observe(section))
    return
  }

  const inScreen = elm => {
    const rect = elm.getBoundingClientRect()
    return rect.top < window.innerHeight * 0.8 && rect.bottom > 0
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
