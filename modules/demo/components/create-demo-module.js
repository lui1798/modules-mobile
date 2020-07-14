export default function(name = "", demos = []) {
  return {
    name: `${name}-demo`,
    data() {
      return {
        demos,
        nav: this.$route.query.nav,
        blob: "",
      };
    },
    moubted() {
      console.log("%c this.$route", "color:green;", this.$router);
    },
  };
}
