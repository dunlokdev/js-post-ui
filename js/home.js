import postApi from './api/postApi';
import { setTextContent } from './utils';

function createPostElement(post) {
  if (!post) return;

  // find and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  // update title, desc, author, thumbnail
  // const titleElement = liElement.querySelector('[data-id=title]');
  // if (titleElement) titleElement.textContent = post.title;
  setTextContent(liElement, '[data-id=title]', post.title);
  setTextContent(liElement, '[data-id=description]', post.description);
  setTextContent(liElement, '[data-id=author]', post.author);

  /*  const descElement = liElement.querySelector('[data-id=description]');
  if (descElement) descElement.textContent = post.description;

  const authorElement = liElement.querySelector('[data-id=author]');
  if (authorElement) authorElement.textContent = post.author; */

  const thumbnailElement = liElement.querySelector('[data-id=thumbnail]');
  if (thumbnailElement) thumbnailElement.src = post.imageUrl;

  // attach event
  return liElement;
}

function renderPostList(postList) {
  console.log('🚀 ~ file: home.js:4 ~ postList', { postList });

  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById('postList');
  if (!ulElement) return;

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

(async () => {
  console.log('Hello from home.js');
  try {
    const queryParam = {
      _page: 1,
      _limit: 6,
    };
    const { data, pagination } = await postApi.getAll(queryParam);
    renderPostList(data);
  } catch (error) {
    console.log('🚀 ~ file: main.js:17 ~ main ~ error', error);
  }
})();
