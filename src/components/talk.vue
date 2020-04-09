<template>
  <article class="post">
    <div class="post-content-wrapper">
      <div class="post-date">
        <span class="post-date-day">{{ getDay(talk.date) }}</span>
        <span class="post-date-month">{{ getMonth(talk.date) }}</span>
        <span class="post-date-year">{{ getYear(talk.date) }}</span>
      </div>
      <div class="post-titles">
        <p class="post-title">
          <a :href="talk.link" target="_blank" rel="noopener">{{ talk.title }}</a>
        </p>
        <p class="post-subject">{{ talk.subject }}</p>
      </div>
    </div>
    <p class="post-description"><span class="post-location">{{ talk.location }}</span> &mdash; {{ talk.description }}</p>
  </article>
</template>

<script>
export default {
  name: 'Talk',
  props: {
    talk: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    getDay(date) {
      const day = new Date(date).getDate().toString()
      return day.padStart(2, '0')
    },

    getMonth(date) {
      return new Date(date)
        .toLocaleString('en-us', { month: 'short' })
        .toString()
    },

    getYear(date) {
      return new Date(date).getFullYear().toString()
    }
  }
}
</script>
