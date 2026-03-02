const inScreen = elm => {
  const y = elm.offsetTop - window.scrollY
  return (y + elm.clientHeight) > 0 && window.innerHeight > y
}

// Transition for buttons
window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('body > section')
  console.log(sections)
  window.document.addEventListener('scroll', () => {
    sections.forEach(section => {
      if (!inScreen(section)) return
      [...section.querySelectorAll('.link__button')].reduce((delay, button) => {
        setTimeout(() => button.classList.add('show'), delay)
        return delay + 200
      }, 0)
    })
  })
})
