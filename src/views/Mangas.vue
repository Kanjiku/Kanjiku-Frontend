<template>
    <div class="mangas container">
        <h2 class="mb-3">Manga</h2>
        <div class="manga-grid row gx-4 gy-4 p-2">
            <router-link class="manga h-100 col-6 col-sm-4 col-md-3 text-decoration-none"
            v-for="(manga, id) in mangas" :key="id" :to="{name: 'Manga', params: {name: manga.url_friendly_name}}">
                <div class="ratio"  style="--bs-aspect-ratio: 140%">
                    <img :src="manga.image" class="ratio">
                </div>
                <p class="mt-2 ps-3">{{ manga.title }}</p>
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
    .manga-grid {
        .manga {
            cursor: pointer;            
            .ratio::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000;
                opacity: 0;
                transition: opacity .2s;
            }

            p {
                color: var(--bs-body-color);
                transition: color .5s;
            }

            &:hover {
                .ratio::after {
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