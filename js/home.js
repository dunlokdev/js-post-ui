import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import postApi from './api/postApi';
import { setTextContent, truncateText } from './utils';

// to use fromNow function
dayjs.extend(relativeTime);

function createPostElement(post) {
  if (!post) return;

  // find and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  // update title, desc, author, thumbnail

  // Ver1
  // const titleElement = liElement.querySelector('[data-id=title]');
  // if (titleElement) titleElement.textContent = post.title
  // const descElement = liElement.querySelector('[data-id=description]');
  // if (descElement) descElement.textContent = post.description;

  // const authorElement = liElement.querySelector('[data-id=author]');
  // if (authorElement) authorElement.textContent = post.author;

  // Ver2
  setTextContent(liElement, '[data-id=title]', post.title);
  setTextContent(liElement, '[data-id=description]', truncateText(post.description, 100));
  setTextContent(liElement, '[data-id=author]', post.author);
  setTextContent(liElement, '[data-id=timeSpan]', ` - ${dayjs(post.updatedAt).fromNow()}`);

  const thumbnailElement = liElement.querySelector('[data-id=thumbnail]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=Thumbnail';
    });
  }

  // attach event
  return liElement;
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById('postList');
  if (!ulElement) return;

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);

  // update query params
  window.history.pushState({}, '', url);

  // fetch api

  // re-render post list
}

function handlePrevClick(e) {
  e.preventDefault();
  console.log('Prev click');
}

function handleNextClick(e) {
  e.preventDefault();
  console.log('Next click');
}

function initPagination() {
  // bind click event for prev/next link
  const ulPagination = document.getElementById('pagination');
  if (!ulPagination) return;

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick);
  }

  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick);
  }
}

function initUrl() {
  const url = new URL(window.location);

  // update search params if needed
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

  window.history.pushState({}, '', url);
}

(async () => {
  try {
    initPagination();
    initUrl(); // set default query param if not existed
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams.toString());

    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList(data);
  } catch (error) {
    console.log('Get all failed, ', error);
  }
})();