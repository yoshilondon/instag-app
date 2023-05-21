import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleFollowing = (hasFollowed) => {
  if (hasFollowed) {
    $('.un_follow-button').removeClass('hidden')
  } else {
    $('.follow-button').removeClass('hidden')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('#account-show').data()
  const accountId = dataset.accountId
  const currentUserId = dataset.currentUserId

  axios.get(`/accounts/${accountId}/follows/${currentUserId}`)
    .then((response) => {
      const hasFollowed = response.data.hasFollowed
      handleFollowing(hasFollowed)
      console.log(response)
    })
  
  $('.un_follow-button').on('click', () => {
    axios.post(`/accounts/${accountId}/unfollows`)
      .then((response) => {
        console.log(response)
        if (response.data.status === 'ok') {
          $('.un_follow-button').addClass('hidden');
          $('.follow-button').removeClass('hidden');
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })

  $(`.follow-button`).on('click', () => {
    axios.post(`/accounts/${accountId}/follows`)
      .then((response) => {
        console.log(response)
        if (response.data.status === 'ok') {
          $(`.un_follow-button`).removeClass('hidden');
          $(`.follow-button`).addClass('hidden');
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
})
