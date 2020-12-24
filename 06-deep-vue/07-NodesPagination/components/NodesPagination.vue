<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

  render(h) {
    const start = (this.page - 1) * this.perPage;
    const end = this.page * this.perPage;

    const content = this.$slots.default
      ? this.$slots.default.slice(start, end)
      : [];

    return h('div', content);
  },
};
</script>

<style scoped></style>
