<template>
  <article class="post">
    <div class="post-content-wrapper">
      <div class="post-date">
        <span class="post-date-day">{{ $prismic.asDay(talk.date) }}</span>
        <span class="post-date-month">{{ $prismic.asMonth(talk.date) }}</span>
        <span class="post-date-year">{{ $prismic.asYear(talk.date) }}</span>
      </div>
      <div class="post-titles">
        <p class="post-title">
          <a
            :href="$prismic.asLink(talk.link_to_event)"
            target="_blank"
            rel="noopener"
          >
            {{ $prismic.asText(talk.title) }}
          </a>
        </p>
        <p class="post-subject">
          {{ talk.subject }}
        </p>
      </div>
    </div>
    <p class="post-description">
      <span class="post-location">{{ talk.location }}</span> &mdash;
      {{ $prismic.asText(talk.description) }}
    </p>
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
      },
    },
  },
}
</script>
