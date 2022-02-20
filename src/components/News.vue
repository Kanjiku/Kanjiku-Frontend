<template>
  <div class="news">
    <div class="card" v-for="(article, index) in articles" :key="index">
      <div class="card-body">
        <h4 class="card-title">{{ article.title }}</h4>
        <p style="white-space:pre-line;" class="card-text">{{ article.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
//import { ref } from "vue";

export default {
  name: "News",
  setup() {
    const articles = {
      0: {
        title: "New Website",
        text: "Like you probably noticed\n\n(epic pause)\n\nwe have done some work on our website!\nbyebye :)"
      },
      1: {
        title: "Test3",
        text: "Blablablablablablablablablablablablabla"
      }
    };
    var articleId = 1;

    const newArticle = (title, text) => {
      articleId++;
      articles[articleId] = {
        title: title,
        text: text
      };
    }

    return {
      articleId,
      articles,
      newArticle
    }
  }
}
</script>

<style scoped lang="scss">
.news {
  width: 50vw;
  margin: auto;

  .card {
    margin-bottom: 1rem;
  }
}

</style>