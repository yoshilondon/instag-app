import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

// articles/new 投稿ボタン（Post）の設定
document.addEventListener('DOMContentLoaded', () => {
  $("#postBtn").on('click', () => {
    $('form').submit();
  });
});

// Likeのハートの表示切替

document.addEventListener('DOMContentLoaded', () => {
  $('.card#article-show').each(function (index, element){
    const dataset = $(element).data()
    const articleId = dataset.articleId

    axios.get(`/articles/${articleId}/like`)
      .then((response) => {
        console.log(response)
        const hasLiked = response.data.hasLiked
        if (hasLiked) {
          $(`#${articleId}.active-heart`).removeClass('hidden')
        } else {
          $(`#${articleId}.inactive-heart`).removeClass('hidden')
        }
      })
  })
  
  $('.card#article-show').each(function (index, element){
    const dataset = $(element).data()
    const articleId = dataset.articleId
    
    $(`#${articleId}.inactive-heart`).on('click', () => {
      axios.post(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'OK') {
            $(`#${articleId}.active-heart`).removeClass('hidden');
            $(`#${articleId}.inactive-heart`).addClass('hidden');
          }
        })
        .catch((e) => {
          window.alert('Error')
          console.log(e)
        })
    })

    $(`#${articleId}.active-heart`).on('click', () => {
      axios.delete(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'OK') {
            $(`#${articleId}.active-heart`).addClass('hidden')
            $(`#${articleId}.inactive-heart`).removeClass('hidden')
          }
        })
        .catch((e) => {
          window.alert('Error')
          console.log(e)
        })
    })  
  })
})
