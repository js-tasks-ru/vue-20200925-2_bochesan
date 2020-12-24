<script>
export default {
  name: 'NodesPagination',

  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      defult: 3,
    },
  },

  computed: {
    viewSlots() {
      return {
        keyStart: this.page * this.perPage - this.perPage,
        keyEnd: this.page * this.perPage,
      };
    },
  },

  render: function (createElement) {
    return createElement(
      'div',
      this.$slots.default.filter(slot => slot.key > this.viewSlots.keyStart && slot.key <= this.viewSlots.keyEnd),
    );
  },
};
</script>

<style scoped></style>
