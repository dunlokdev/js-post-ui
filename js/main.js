import postApi from './api/postApi'
import axiosClient from './api/postApi'

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
    console.log('🚀 ~ file: main.js:16 ~ main ~ data', data)
  } catch (error) {
    console.log(error)
  }
}

main()
