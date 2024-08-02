<template>
  <div v-if="total && false" class="pagination">
    <router-link
      class="pagination__btn m--prev"
      :to="{
        path: url,
        query: Object.assign({}, query, { page: goPrev }),
        hash: hash,
      }"
    >
    </router-link>
    <ul class="pagination__list">
      <li v-for="page in pagesArray" :key="`page-${page.value}`">
        <router-link
          class="pagination__link"
          :class="[page.value === currentPage && 'm--current']"
          :to="{
            path: url,
            query: Object.assign({}, query, { page: page.value }),
            hash: hash,
          }"
          :event="page.value ? 'click' : ''"
        >
          {{ page.text }}
        </router-link>
      </li>
    </ul>
    <router-link
      class="pagination__btn m--next"
      :to="{
        path: url,
        query: Object.assign({}, query, { page: goForward }),
        hash: hash,
      }"
    >
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default() {
        return 0;
      },
    },
    limit: {
      type: Number,
      default() {
        return 10;
      },
    },
    currentPage: {
      type: Number,
      default() {
        return 1;
      },
    },
    query: {
      type: Object,
      default() {
        return {};
      },
    },
    hash: {
      type: String,
      default() {
        return '';
      },
    },
    url: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    step() {
      return 1;
    },
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit);
      return this.$helpers.range(1, pagesCount || 1);
    },
    pagesArray() {
      const count = Math.ceil(this.total / this.limit);
      let items = [];
      [...Array(count).keys()]
        .map((i) => i + 1)
        .forEach((item) => {
          if (count <= 4) {
            items.push({ text: item, value: item });
          } else {
            if (item === 1 && this.currentPage !== item && this.currentPage - 1 !== 1 && this.currentPage - 2 !== 1) {
              items.push({ text: '1', value: 1 });
              items.push({ text: '...', value: null });
            } else if (item === count && this.currentPage + 1 !== count && this.currentPage + 2 !== count) {
              items.push({ text: '...', value: null });
              items.push({ text: count, value: count });
            } else {
              let deltaPrev = count - this.currentPage <= 3 ? 3 : 2;
              let deltaAfter = this.currentPage <= 3 ? 4 - this.currentPage : 2;
              if (item > this.currentPage - deltaPrev && item < this.currentPage + deltaAfter) {
                console.log(item);
                items.push({ text: item, value: item });
              }
            }
          }
        });
      return items;
    },
    goForward() {
      return `${this.currentPage + this.step}`;
    },
    goPrev() {
      return `${this.currentPage - this.step}`;
    },
  },
  mounted() {},
  beforeUnmount() {},
  created() {},
  methods: {},
};
</script>
