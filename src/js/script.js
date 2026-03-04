const ANIMATION_INITIAL_DELAY = 0
const ANIMATION_DELAY_STEP = 180
const ANIMATION_RULES = [
  { selector: '.card-list__button' },
  { selector: '.skills__item' },
  { selector: '.cert__item' },
  { selector: '.scroll-reveal' }
]

const showSequentially = (parent, selector) => {
  const animationKey = `animated${selector.replace(/[^a-z0-9]/gi, '')}`
  if (parent.dataset[animationKey] === 'true') return

  const targets = [...parent.querySelectorAll(selector)]
  if (!targets.length) return

  targets.reduce((delay, target) => {
    setTimeout(() => target.classList.add('show'), delay)
    return delay + ANIMATION_DELAY_STEP
  }, ANIMATION_INITIAL_DELAY)

  parent.dataset[animationKey] = 'true'
}

const animateSection = section => {
  ANIMATION_RULES.forEach(({ selector }) => {
    showSequentially(section, selector)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('body > section')

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
})
