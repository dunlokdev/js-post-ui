import { getUlPaginationElement } from './selectors'

export function initPagination({ elementId, defaultParams, onChange }) {
  // bind click event for prev/next link
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  // TODO: set current active page

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()

      if (!ulPagination) return
      const page = Number.parseInt(ulPagination.dataset.page) || 1

      if (page > 2) onChange?.(page - 1)
    })
  }

  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()

      const page = Number.parseInt(ulPagination.dataset.page) || 1
      const totalPages = ulPagination.dataset.totalPages

      if (page < totalPages) onChange?.(page + 1)
    })
  }
}

export function renderPagination(elementId, pagination) {
  const ulElement = document.getElementById(elementId)
  if (!pagination || !ulElement) return

  // calc totalPages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // save page and totalPages to ul pagination
  ulElement.dataset.page = _page
  ulElement.dataset.totalPages = totalPages

  // check if enable or disable of prev/nextLink
  if (_page <= 1) {
    ulElement.firstElementChild?.classList.add('disabled')
  } else {
    ulElement.firstElementChild?.classList.remove('disabled')
  }

  if (_page >= totalPages) ulElement.lastElementChild?.classList.add('disabled')
  else ulElement.lastElementChild?.classList.remove('disabled')
}
