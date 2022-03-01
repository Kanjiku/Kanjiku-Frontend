<template>
    <div class="news">
        <div class="card mb-3" v-for="(article, index) in articles" :key="index">
            <div class="card-body">
                <h4 class="card-title">{{ article.title }}</h4>
                <p style="white-space:pre-line;" class="card-text">{{ article.text }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

type Article = {
    title: string,
    text: string
}

const articles: { [key: number]: Article } = {
    0: {
        title: "New Website",
        text: "Like you probably noticed\n\n(epic pause)\n\nwe have done some work on our website!\nbyebye :)"
    },
    1: {
        title: "Test3",
        text: "Blablablablablablablablablablablablabla"
    }
};
let articleId = 1;

const newArticle = (title: string, text: string) => {
    articleId++;
    articles[articleId] = {
        title: title,
        text: text
    };
}

</script>

<style scoped lang="scss">
</style>