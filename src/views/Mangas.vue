<template>
  <div class="card mangas">
    <h3>Manga</h3>
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

<script setup>
import { ref } from "vue";

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
.card {
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

      border-radius: .4rem;
      overflow: hidden;

      background-color: var(--bs-body-bg);
      box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
      transition: all 0.2s;
      cursor: pointer;

      text-decoration: none;


      &:hover {
        box-shadow: 0px 0px 7px rgba(0,0,0,0.8);
        transform: translateY(-2px);

        .img::after {
          background-color: #000;
          opacity: .5;
        }
      }
      
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
          background-color: transparent;
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
      }
    }
  }
}
</style>