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

// Comment追加のメソッド設定
const appendNewComment = (comment) => {
  $('.comments_container').append(
    `<div class="comment_user_detail">
      <div class="comment_user_image"><img src="${comment.user.profile.avatar_url}" ></div>
      <div class="article_comment"><h6>${comment.user.display_name}</h6><p>${comment.content}</p></div>
    </div>`
  )
}

// Likeのハートの表示切替

document.addEventListener('DOMContentLoaded', () => {
  $('.card#article-show').each(function (index, element){
    const dataset = $(element).data()
    const articleId = dataset.articleId

    axios.get(`/api/articles/${articleId}/like`)
      .then((response) => {
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
      axios.post(`/api/articles/${articleId}/like`)
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
      axios.delete(`/api/articles/${articleId}/like`)
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

  
  const dataset = $('#article-show').data()
  const articleId = dataset.articleId

  console.log(articleId)

  axios.get(`/api/articles/${articleId}/comments`)
    .then((response) => {
      console.log(response.data)
      const comments = response.data
      comments.forEach((comment) => {
        appendNewComment(comment)
      })
    })
    .catch(function(error) {
      console.log(error)
    })

  $('.add-comment-button').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('Please enter your comment')
    } else {
      axios.post(`/api/articles/${articleId}/comments`, {
        comment: {content: content}
      })
      .then((res) => {
        const comment = res.data
        appendNewComment(comment)
        $('#comment_content').val('')
      })
    }
  })
})
