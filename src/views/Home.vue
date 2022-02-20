<template>
  <div class="home">
    <HomeReleases />
    <News />
  </div>
</template>

<script>
import HomeReleases from "@/components/HomeReleases.vue"
import News from "@/components/News.vue"

export default {
  name: "Home",
  components: {
    HomeReleases,
    News
  }
}
</script>
