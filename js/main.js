import postApi from './api/postApi'

console.log('Hello from main.js')

async function main() {
  // const response = await axiosClient.get('/posts')
  // console.log(response)

  try {
    const queryParam = {
      _page: 1,
      _limit: 5,
    }
    const data = await postApi.getAll(queryParam)
  } catch (error) {
    console.log('🚀 ~ file: main.js:17 ~ main ~ error', error)
  }
}

main()
