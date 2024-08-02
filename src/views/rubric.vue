<template>
  <div class="app__content rubric">
    <AppBreadcrumbs
      :breadcrumbs="[
        { name: 'Главная', route: { name: 'home' } },
        { name: 'Рубрики', route: { name: 'rubric' } },
      ]"
    />
    <RubricBlock />
  </div>
</template>

<script>
import RubricBlock from '@/components/rubric-block.vue';
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';

export default {
  name: 'rubric',
  components: { AppBreadcrumbs, RubricBlock },
};
</script>
