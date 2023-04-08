// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import $ from 'jquery'
import Rails from "@rails/ujs"
// import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

Rails.start()
// Turbolinks.start()
ActiveStorage.start()

//= require jquery3
//= require popper
//= require bootstrap

document.addEventListener('DOMContentLoaded', () => {
  const update = document.getElementById('profile_avatar')
  if (update) {
    update.addEventListener('change', (e) => {
      const file = update.files[0];   
      const reader = new FileReader(); 
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = reader.result;
        console.log(image);
        document.querySelector('.avatar-image').setAttribute('src', image);
      }
      $('.submit-btn').removeClass('hidden')

    });
  }
});

// articles/new 投稿ボタン（Post）の設定
document.addEventListener('DOMContentLoaded', () => {
  $("#postBtn").on('click', () => {
    $('form').submit();
  });
});

// Likeのハートの表示切替
const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('#article-show').data()
  const articleId = dataset.articleId
  axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  $('.inactive-heart').on('click', () => {
    axios.post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'OK') {
          $('.active-heart').removeClass('hidden');
          $('.inactive-heart').addClass('hidden');
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })

  $('.active-heart').on('click', () => {
    axios.delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'OK') {
          $('.active-heart').addClass('hidden')
          $('.inactive-heart').removeClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
})

// $('.profilePage_image').on('click', () => {
//   axios.get('/profile')
//     .then((response) => {
//       console.log(response)
//     })
// })

// document.addEventListener('turbolinks:load', function() {

//   $('.profile_usericon').on('click', () => {
//     if ($('.avatar_edit_form').removeClass('hidden')){
//       $('.avatar_edit_form').removeClass('hidden')
//     } else {
//        $('.avatar_edit_form').addClass('hidden')
//     }
//   })
// })