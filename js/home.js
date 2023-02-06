import postApi from './api/postApi'
import { initPagination, initSearch, renderPagination, renderPostList } from './utils'

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)

    // reset _page if needed
    if (filterName === 'title_like') {
      url.searchParams.set('_page', 1)
    }

    // update query params
    window.history.pushState({}, '', url)

    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

// Main
;(async () => {
  try {
    const url = new URL(window.location)

    // update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

    window.history.pushState({}, '', url)
    const queryParams = url.searchParams
    console.log('🚀 Init page ~ queryParams', queryParams.toString())

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    })

    // filter search
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    })

    // render post list based URL params
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList('postList', data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('Get all failed, ', error)
  }
})()
