<template>
  <article class="post speaking">
    <div class="post-date">
      <span class="post-date-day">{{ $prismic.asDay(talk.date) }}</span>
      <span class="post-date-month">{{ $prismic.asMonth(talk.date) }}</span>
      <span class="post-date-year">{{ $prismic.asYear(talk.date) }}</span>
    </div>
    <div class="post-content-wrapper">
      <div class="post-titles">
        <p class="post-title fancy-title red">
          <a
            :href="$prismic.asLink(talk.link_to_event)"
            target="_blank"
            rel="noopener"
          >
            {{ talk.title }}
          </a>
        </p>
        <p class="post-subject">
          <span class="post-location">{{ talk.location }}</span> &mdash;
          {{ talk.subject }}
        </p>
      </div>
    </div>
    <!-- <p class="post-description">
      <span class="post-location">{{ talk.location }}</span> &mdash;
      {{ $prismic.asText(talk.description) }}
    </p> -->
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

<style lang="scss">
.post.speaking {
  flex-direction: row;

  .post-date {
    flex: 1;
  }

  .post-content-wrapper {
    flex: 11;
  }
}
</style>
