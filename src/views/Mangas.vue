<template>
    <div class="mangas">
        <h2>Manga</h2>
        <div class="manga-grid">
            <router-link class="manga" v-for="(manga, id) in mangas" :key="id" :to="{name: 'Manga', params: {name: manga.url_friendly_name}}">
                <div class="img">
                    <img :src="manga.image">
                </div>
                <p>{{ manga.title }}</p>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const mangas = ref({
    0: {
        title: "Aiki-S",
        image: "https://kanjiku.net/public/manga_thumbnail/6.jpg",
        url_friendly_name: "aiki-s"
    },
    1: {
        title: "Chronos: Deep",
        image: "https://kanjiku.net/public/manga_thumbnail/8.jpg",
        url_friendly_name: "chronos_deep"
    },
    2: {
        title: "Flying Witch",
        image: "https://kanjiku.net/public/manga_thumbnail/9.jpg",
        url_friendly_name: "flying_witch"
    },
    3: {
        title: "Gun X Clover",
        image: "https://kanjiku.net/public/manga_thumbnail/10.jpg",
        url_friendly_name: "gun_x_clover"
    },
    4: {
        title: "Hero Waltz",
        image: "https://kanjiku.net/public/manga_thumbnail/11.jpg",
        url_friendly_name: "hero_waltz"
    }
});

const fetchManga = () => {
    // GET /mangas
}
fetchManga();

</script>

<style scoped lang="scss">
.mangas {
    width: 50vw;
    margin: auto;
    padding: 2rem;
    
    h3 {
        margin-bottom: 1.5rem;
    }
    
    .manga-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 1.5rem;
        row-gap: 2rem;

        .manga {
            position: relative;
            width: 100%;

            overflow: hidden;

            transition: all 0.2s;
            cursor: pointer;

            text-decoration: none;
            
            .img {
                position: relative;
                width: 100%;
                padding-bottom: calc(100% * 4 / 3);
                

                &::after {
                    content: "";
                    overflow-x: hidden;
                    box-shadow: inset 0px -20px 20px -20px #000;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    opacity: 0;
                    background-color: transparent;
                    transition: opacity .2s;

                }

                img {
                    overflow: visible;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    
                    z-index: 1;
                }
            }

            p {
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: left;
                font-size: 1rem;
                padding-left: 1rem;
                margin-bottom: 0;
                color: var(--bs-body-color);

                transition: color .5s;
            }

            &:hover {
                .img::after {
                    background-color: #000;
                    opacity: .5;
                }

                p {
                    color: var(--bs-primary);
                }
            }
        }
    }
}
</style>