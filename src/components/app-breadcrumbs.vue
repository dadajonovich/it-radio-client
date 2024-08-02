<template>
  <div class="app__breadcrumbs breadcrumbs">
    <router-link v-for="(item, key) in breadcrumbs" :key="key" v-slot="{ href, navigate }" :to="item.route" custom>
      <div v-if="item.name" class="breadcrumbs__item">
        <a :href="href" class="breadcrumbs__item-link" @click="navigate">
          {{ item.name }}
        </a>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppBreadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
