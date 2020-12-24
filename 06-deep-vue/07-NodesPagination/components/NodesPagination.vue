<script>
export default {
  name: 'NodesPagination',

  props: {
    page: {
      type: Number,
      default: 1,
      validator: function (value) {
        return typeof value === 'number';
      },
    },
    perPage: {
      type: Number,
      default: 3,
      validator: function (value) {
        return typeof value === 'number';
      },
    },
  },

  render: function (createElement) {
    let keyStart = this.page * this.perPage - this.perPage;
    let keyEnd = this.page * this.perPage;
    return createElement(
      'div',
      Array.isArray(this.$slots.default)
        ? [...this.$slots.default].splice(keyStart, keyEnd)
        : null,
    );
  },
};
</script>

<style scoped></style>
